import { Router } from "express";
import { PrismaClient } from "@prisma/client";

import bcrypt from "bcrypt";
const prisma = new PrismaClient();

const router = Router();


// Востановяване на паролата
router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).json({ error: "Email required" });
    }
  
    const user = await prisma.user.findUnique({ where: { email } });
  
    if (!user) {  
      return res.status(400).json({ error: "User not found" });
    }
  
    const token = await prisma.token.create({
      data: {
        userId: user.id,
      },
    });
  
    res.json({ message: "Token created", token: token.id });
  });
  
  export default router;