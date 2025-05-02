import express from 'express';
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import passport from "passport";
import { SessionUser } from "../types/session";

interface LoginBody {
  email: string;
  password: string;
}

interface RegisterBody extends LoginBody {
}

interface UpdateNameBody {
  firstName: string;
  lastName: string;
}

const prisma = new PrismaClient();
const router = express.Router();

const asyncHandler = (fn: Function) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => Promise.resolve(fn(req, res, next)).catch(next);

const profileHandler = asyncHandler(async (req: express.Request, res: express.Response) => {
  console.log('Profile request - session:', req.session);
  
  if (!req.session.user) {
    console.log('Profile request - no user in session');
    res.status(401).json({ message: "auth.invalidCredentials" });
    return;
  }

  const user = await prisma.user.findUnique({
    where: { id: req.session.user.id },
    select: {
      id: true,
      email: true,
      googleId: true,
      firstName: true,
      lastName: true,
      role: true
    }
  });

  if (!user) {
    console.log('Profile request - user not found in database');
    res.status(404).json({ message: "User not found" });
    return;
  }

  console.log('Profile request - database user:', user);
  res.json({ user });
});

// Вход в аккаунт
const loginHandler = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { email, password } = req.body as LoginBody;

    if (!email || !password) {
      return res.status(400).json({ message: "auth.allFieldsRequired" });
    }

    const user = await prisma.user.findUnique({ 
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        googleId: true
      }
    });

    if (!user) {
      return res.status(401).json({ message: "auth.invalidCredentials" });
    }

    // Сначала проверяем пароль
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "auth.invalidCredentials" });
    }

    // Только после проверки пароля проверяем тип аккаунта
    if (user.googleId) {
      return res.status(400).json({ message: "auth.googleAccount" });
    }

    req.session.user = { 
      id: user.id, 
      email: user.email,
      googleId: user.googleId ?? undefined
    };
    
    res.json({ message: "auth.success", user: { email: user.email } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "auth.somethingWentWrong" });
  }
};

// Регистрация
const registerHandler = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { email, password } = req.body as RegisterBody;

  if (!email || !password) {
    res.status(400).json({ message: "auth.allFieldsRequired" });
    return;
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    res.status(400).json({ message: "register.registrationError" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  req.session.user = { id: user.id, email: user.email };
  res.status(201).json({ message: "register.registrationSuccess", user: { email: user.email } });
};

// Выход из системы
const logoutHandler = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "auth.somethingWentWrong" });
    }
    res.json({ message: "auth.success" });
  });
};

// Обновление имени пользователя
const updateNameHandler = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (!req.session.user) {
    res.status(401).json({ message: "auth.unauthorized" });
    return;
  }

  const { firstName, lastName } = req.body as UpdateNameBody;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.session.user.id },
      data: { firstName, lastName },
      select: {
        id: true,
        email: true,
        googleId: true,
        firstName: true,
        lastName: true
      }
    });

    // Обновляем данные в сессии
    req.session.user = {
      ...req.session.user,
      firstName: updatedUser.firstName ?? undefined,
      lastName: updatedUser.lastName ?? undefined
    };

    res.json({ user: updatedUser });
  } catch (error) {
    console.error('Error updating user name:', error);
    res.status(500).json({ message: "profile.nameUpdateError" });
  }
};

router.get("/profile", profileHandler);
router.post("/login", asyncHandler(loginHandler));
router.post("/register", asyncHandler(registerHandler));

// Google OAuth маршруты
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req: any, res) => {
    // После успешной аутентификации через Google
    console.log('Google callback - req.user:', req.user);
    console.log('Google callback - req.session before:', req.session);
    
    if (req.user) {
      console.log('Google auth callback - user data:', req.user);
      // Устанавливаем пользователя в сессию
      req.session.user = {
        id: req.user.id,
        email: req.user.email,
        googleId: req.user.googleId,
        firstName: req.user.firstName || '',
        lastName: req.user.lastName || ''
      };
      
      console.log('Google callback - req.session after:', req.session);
      
      req.session.save((err) => {
        if (err) {
          console.error('Ошибка сохранения сессии:', err);
          res.redirect("http://localhost:5173?auth=error");
        } else {
          console.log('Session saved successfully');
          res.redirect("http://localhost:5173?auth=success");
        }
      });
    } else {
      console.log('No user data in request');
      res.redirect("http://localhost:5173?auth=error");
    }
  }
);

router.post("/logout", logoutHandler);
router.post("/update-name", asyncHandler(updateNameHandler));

export default router;
