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

const prisma = new PrismaClient();
const router = express.Router();
type RequestHandler = express.RequestHandler;
type Request = express.Request;
type Response = express.Response;

// Получение данных текущего пользователя
const profileHandler: RequestHandler = (req, res) => {
  if (!req.session.user) {
    res.status(401).json({ message: "Не авторизован" });
    return;
  }
  res.json({ user: req.session.user });
};

// Вход в аккаунт
const loginHandler: RequestHandler = async (req, res) => {
  const { email, password } = req.body as LoginBody;

  if (!email || !password) {
    res.status(400).json({ message: "Email и пароль обязательны" });
    return;
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    res.status(401).json({ message: "Неверные учетные данные" });
    return;
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    res.status(401).json({ message: "Неверные учетные данные" });
    return;
  }

  req.session.user = { id: user.id, email: user.email };
  res.json({ message: "Успешный вход", user: { email: user.email } });
};

// Регистрация
const registerHandler: RequestHandler = async (req, res) => {
  const { email, password } = req.body as RegisterBody;

  if (!email || !password) {
    res.status(400).json({ message: "Email и пароль обязательны" });
    return;
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    res.status(400).json({ message: "Пользователь уже существует" });
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
  res.status(201).json({ message: "Пользователь создан", user: { email: user.email } });
};

// Выход из системы
const logoutHandler: RequestHandler = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Ошибка при выходе" });
    }
    res.json({ message: "Успешный выход" });
  });
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
      // Устанавливаем пользователя в сессию
      req.session.user = {
        id: req.user.id,
        email: req.user.email
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

export default router;
