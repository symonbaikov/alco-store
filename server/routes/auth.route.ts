import { Router } from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import passport from "passport";

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
  (req, res) => {
    // Успешная аутентификация
    res.redirect("http://localhost:5173");
  }
);

// Выход из системы
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Could not log out" });
    }
    res.json({ message: "Logged out successfully" });
  });
});

export default router;
