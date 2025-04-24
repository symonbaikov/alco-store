import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { authenticatedUser } from "../lib/lib.ts";
import type { Request, Response } from "express";

const prisma = new PrismaClient();
const router = Router();

router.post("/", authenticatedUser, async (req: Request, res: Response): Promise<void> => {
  console.log('Received change password request:', { body: req.body, session: req.session });
  const { currentPassword, newPassword } = req.body;
  const userId = req.session.user?.id;

  if (!currentPassword || !newPassword) {
    console.log('Missing required fields');
    res.status(400).json({ error: "Все поля обязательны" });
    return;
  }

  try {
    // Находим пользователя
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    console.log('Found user:', { userId, userExists: !!user });

    if (!user) {
      res.status(404).json({ error: "Пользователь не найден" });
      return;
    }

    // Проверяем текущий пароль
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    console.log('Password validation:', { isCurrentPasswordValid });
    
    if (!isCurrentPasswordValid) {
      res.status(400).json({ error: "INVALID_CURRENT_PASSWORD" });
      return;
    }

    // Проверяем требования к новому паролю
    if (newPassword.length < 8) {
      res.status(400).json({ error: "PASSWORD_REQUIREMENTS_NOT_MET" });
      return;
    }

    // Хешируем новый пароль
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Обновляем пароль
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    console.log('Password successfully updated');
    res.json({ message: "Пароль успешно изменен" });
  } catch (error) {
    console.error("Ошибка при смене пароля:", error);
    res.status(500).json({ error: "Ошибка при смене пароля" });
  }
});

export default router; 