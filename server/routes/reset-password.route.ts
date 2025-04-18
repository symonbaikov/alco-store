import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const router = Router();

router.post("/", async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ error: "Токен и пароль обязательны" });
  }

  // Находим токен в базе данных
  const resetToken = await prisma.resetToken.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!resetToken) {
    return res.status(400).json({ error: "Неверный токен" });
  }

  // Проверяем срок действия токена
  if (resetToken.expiresAt < new Date()) {
    return res.status(400).json({ error: "Срок действия токена истек" });
  }

  // Хешируем новый пароль
  const hashedPassword = await bcrypt.hash(password, 10);

  // Обновляем пароль пользователя
  await prisma.user.update({
    where: { id: resetToken.userId },
    data: { password: hashedPassword },
  });

  // Удаляем использованный токен
  await prisma.resetToken.delete({
    where: { id: resetToken.id },
  });

  res.json({ message: "Пароль успешно изменен" });
});

export default router; 