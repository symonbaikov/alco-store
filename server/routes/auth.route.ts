import express from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import passport from "passport";
import { Session } from "express-session";

// Расширяем типы для Express.Session
declare module 'express-session' {
  interface SessionData {
    user?: {
      id: string;
      email: string;
      googleId?: string;
    };
  }
}

interface TypedRequestBody<T> extends Request {
  body: T;
}

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
type RequestHandler = express.RequestHandler;
type Request = express.Request;
type Response = express.Response;

// Получение данных текущего пользователя
const profileHandler: RequestHandler = async (req, res) => {
  if (!req.session.user) {
    res.status(401).json({ message: "auth.invalidCredentials" });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.session.user.id },
      select: {
        id: true,
        email: true,
        googleId: true,
        firstName: true,
        lastName: true
      }
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    console.log('Profile request - database user:', user);
    res.json({ user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: "Error fetching profile" });
  }
};

// Вход в аккаунт
const loginHandler: RequestHandler = async (req, res) => {
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
      googleId: user.googleId 
    };
    
    res.json({ message: "auth.success", user: { email: user.email } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "auth.somethingWentWrong" });
  }
};

// Регистрация
const registerHandler: RequestHandler = async (req, res) => {
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
const logoutHandler: RequestHandler = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "auth.somethingWentWrong" });
    }
    res.json({ message: "auth.success" });
  });
};

// Обновление имени пользователя
const updateNameHandler: RequestHandler = async (req, res) => {
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
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName
    };

    res.json({ user: updatedUser });
  } catch (error) {
    console.error('Error updating user name:', error);
    res.status(500).json({ message: "profile.nameUpdateError" });
  }
};

router.get("/profile", profileHandler);
router.post("/login", loginHandler);
router.post("/register", registerHandler);

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
    if (req.user) {
      console.log('Google auth callback - user data:', req.user);
      // Устанавливаем пользователя в сессию
      req.session.user = {
        id: req.user.id,
        email: req.user.email,
        googleId: req.user.googleId,
        firstName: req.user.firstName,
        lastName: req.user.lastName
      };
      req.session.save((err) => {
        if (err) {
          console.error('Ошибка сохранения сессии:', err);
          res.redirect("http://localhost:5173?auth=error");
        } else {
          res.redirect("http://localhost:5173?auth=success");
        }
      });
    } else {
      res.redirect("http://localhost:5173?auth=error");
    }
  }
);

router.post("/logout", logoutHandler);
router.post("/update-name", updateNameHandler);

export default router;
