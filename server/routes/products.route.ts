import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

export default router; 