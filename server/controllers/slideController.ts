import type { Request, Response } from "express";
import prisma from "../lib/prisma.ts";

export const getSlides = async (req: Request, res: Response) => {
  try {
    const slides = await prisma.slide.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        order: "asc",
      },
    });
    res.json(slides);
  } catch (error) {
    console.error("Error fetching slides:", error);
    res.status(500).json({ error: "Failed to fetch slides" });
  }
  
};
