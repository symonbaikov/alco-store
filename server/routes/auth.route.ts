import { Router } from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "test@test.com" && password === "123456") {
    req.session.user = { email };
    return res.json({ message: "Logged in!" });
  }

  return res.status(401).json({ error: "Invalid credentials" });
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out" });
  });
});

router.post("/register", async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }
  
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  
    req.session.user = { id: user.id, email: user.email };
    res.json({ message: "Registered", user: { email: user.email } });
  });

export default router;