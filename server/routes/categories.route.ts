import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Получение всех категорий
router.get('/', async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    console.error('Ошибка при получении категорий:', error);
    res.status(500).json({ error: 'Ошибка при получении категорий' });
  }
});

// Получение конкретной категории по имени
router.get('/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const category = await prisma.category.findUnique({
      where: { name }
    });

    if (!category) {
      return res.status(404).json({ error: 'Категория не найдена' });
    }

    res.json(category);
  } catch (error) {
    console.error('Ошибка при получении категории:', error);
    res.status(500).json({ error: 'Ошибка при получении категории' });
  }
});

export default router; 