import { Router } from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = Router();

// Вход в аккаунт
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ error: "Incorrect password" });
  }

  // ✅ Всё хорошо — сохраняем юзера в сессию
  req.session.user = { id: user.id, email: user.email };

  res.json({ message: "Logged in", user: { email: user.email } });
});

export default router;
