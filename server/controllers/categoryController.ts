import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Не удалось получить категории' });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
    });
    
    if (!category) {
      return res.status(404).json({ error: 'Категория не найдена' });
    }
    
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Не удалось получить категорию' });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, displayName, manufacturer, country, volume, strength } = req.body;
    const category = await prisma.category.create({
      data: {
        name,
        displayName,
        manufacturer,
        country,
        volume,
        strength,
      },
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Не удалось создать категорию' });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, manufacturer, country, volume, strength } = req.body;
    
    const category = await prisma.category.update({
      where: { id: Number(id) },
      data: {
        name,
        manufacturer,
        country,
        volume,
        strength,
      },
    });
    
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Не удалось обновить категорию' });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.category.delete({
      where: { id: Number(id) },
    });
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Не удалось удалить категорию' });
  }
}; 