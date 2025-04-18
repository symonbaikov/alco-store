import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import crypto from "crypto";

const prisma = new PrismaClient();
const router = Router();

// Настройка nodemailer с более безопасными параметрами
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true для 465 порта, false для других портов
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false // Только для разработки
  }
});

// Проверка соединения при запуске
transporter.verify(function(error, success) {
  if (error) {
    console.error("Ошибка при настройке почты:", error);
  } else {
    console.log("Сервер готов к отправке писем");
  }
});

// Востановяване на паролата
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ error: "Email required" });
    }

    console.log("Поиск пользователя с email:", email);
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Генерируем токен
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    console.log("Создание токена для сброса пароля");
    await prisma.resetToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt,
      },
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    console.log("Подготовка к отправке письма");
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Сброс пароля',
      html: `
        <h1>Сброс пароля</h1>
        <p>Вы запросили сброс пароля. Перейдите по ссылке ниже для установки нового пароля:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Ссылка действительна в течение 1 часа.</p>
        <p>Если вы не запрашивали сброс пароля, проигнорируйте это письмо.</p>
      `,
    };

    console.log("Отправка письма...");
    await transporter.sendMail(mailOptions);
    console.log("Письмо успешно отправлено");

    res.json({ message: "Письмо для сброса пароля отправлено" });
  } catch (error) {
    console.error("Подробная ошибка при отправке письма:", error);
    res.status(500).json({ 
      error: "Ошибка при отправке письма",
      details: error.message 
    });
  }
});

export default router;