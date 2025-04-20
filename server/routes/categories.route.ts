import express from "express";
import { PrismaClient } from '@prisma/client';
import type { Request, Response } from "express";

const router = express.Router();
const prisma = new PrismaClient();

// Получение всех категорий
router.get("/", async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Получение категории по имени
router.get("/:name", async (req: Request, res: Response) => {
  try {
    const category = await prisma.category.findFirst({
      where: {
        name: req.params.name
      }
    });
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router; 