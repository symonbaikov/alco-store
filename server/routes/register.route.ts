import { Router } from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();
const router = Router();

// Функция для проверки валидности пароля
function isPasswordValid(password: string): { isValid: boolean; error: string } {
  if (password.length < 8) {
    return { 
      isValid: false, 
      error: "Пароль должен содержать минимум 8 символов" 
    };
  }
  
  if (!/[A-Za-z]/.test(password)) {
    return { 
      isValid: false, 
      error: "Пароль должен содержать хотя бы одну букву" 
    };
  }
  
  if (!/\d/.test(password)) {
    return { 
      isValid: false, 
      error: "Пароль должен содержать хотя бы одну цифру" 
    };
  }
  
  return { isValid: true, error: "" };
}

// Настройка nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Генерация случайного кода
function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Регистрация - шаг 1: отправка кода подтверждения
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email и пароль обязательны" });
  }

  // Проверяем валидность пароля
  const passwordValidation = isPasswordValid(password);
  if (!passwordValidation.isValid) {
    return res.status(400).json({ error: passwordValidation.error });
  }

  try {
    // Проверяем, не существует ли уже пользователь
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email уже зарегистрирован" });
    }

    // Генерируем код подтверждения
    const verificationCode = generateVerificationCode();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10); // Код действителен 10 минут

    // Сохраняем код в базе
    await prisma.emailVerification.create({
      data: {
        email,
        code: verificationCode,
        expiresAt,
      },
    });

    // Отправляем код на email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Подтверждение регистрации",
      html: `
        <h1>Подтверждение регистрации</h1>
        <p>Ваш код подтверждения: <strong>${verificationCode}</strong></p>
        <p>Код действителен в течение 10 минут.</p>
      `,
    });

    // Временно сохраняем захешированный пароль
    const hashedPassword = await bcrypt.hash(password, 10);
    
    res.json({ 
      message: "Код подтверждения отправлен",
      email,
      hashedPassword,
    });
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    res.status(500).json({ error: "Ошибка при регистрации" });
  }
});

// Регистрация - шаг 2: подтверждение кода и создание пользователя
router.post("/verify", async (req, res) => {
  const { email, code, hashedPassword } = req.body;

  try {
    // Ищем актуальный код подтверждения
    const verification = await prisma.emailVerification.findFirst({
      where: {
        email,
        code,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!verification) {
      return res.status(400).json({ error: "Неверный или устаревший код" });
    }

    // Создаем пользователя
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Удаляем использованный код
    await prisma.emailVerification.delete({
      where: { id: verification.id },
    });

    // Устанавливаем сессию
    req.session.user = { id: user.id, email: user.email };
    
    res.json({ 
      message: "Регистрация успешно завершена", 
      user: { email: user.email } 
    });
  } catch (error) {
    console.error("Ошибка при подтверждении:", error);
    res.status(500).json({ error: "Ошибка при подтверждении регистрации" });
  }
});

export default router;