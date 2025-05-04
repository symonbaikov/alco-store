import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { date: 'desc' }
    });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении блогов' });
  }
}; 