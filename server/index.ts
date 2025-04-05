import express from "express";
import cors from "cors";
import prisma from "./lib/prisma.ts";

const app = express();
const port = 3001;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.get("/api/slides", async (req, res) => {
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
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
