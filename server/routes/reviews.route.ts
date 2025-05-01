import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
import { authenticatedUser } from '../lib/lib';
import multer from 'multer';
import path from 'path';
import translateService from '../services/translate.service';

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

const router = express.Router();
const prisma = new PrismaClient();

// Настройка multer для загрузки файлов
const storage = multer.memoryStorage(); // Храним файл в памяти для отправки по email
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // Увеличиваем ограничение размера файла до 10MB
  },
  fileFilter: (_req, file, cb) => {
    // Разрешаем только определенные типы файлов
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Неподдерживаемый тип файла'));
    }
  }
}).single('file');

// Проверка наличия необходимых переменных окружения
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
  console.error('Ошибка: EMAIL_USER и EMAIL_PASSWORD должны быть установлены в .env файле');
  process.exit(1);
}

// Настройка транспорта для nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: true,
    minVersion: "TLSv1.2"
  },
  debug: true,
  logger: true
});

// Проверяем подключение при старте
transporter.verify()
  .then(() => {
    console.log('Сервер готов к отправке писем');
  })
  .catch((error) => {
    console.error('Ошибка подключения к почтовому серверу:', error);
  });

interface ReviewRequest {
  name: string;
  email: string;
  message: string;
  rating: number;
}

// POST /api/reviews - создание нового отзыва
router.post('/', authenticatedUser, (req: MulterRequest, res: Response, next: NextFunction) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          error: 'Файл слишком большой. Максимальный размер: 10MB'
        });
      }
      return res.status(400).json({
        error: 'Ошибка при загрузке файла'
      });
    } else if (err) {
      return res.status(500).json({ error: err.message });
    }

    try {
      console.log('[Reviews POST] Starting review creation...');
      console.log('[Reviews POST] Request body:', req.body);
      
      const { name, email, message, rating } = req.body;
      const ratingNum = parseInt(rating);

      if (!name || !email || !message || !rating) {
        console.log('[Reviews POST] Validation failed - missing required fields');
        return res.status(400).json({ error: 'Все поля обязательны для заполнения' });
      }

      // Переводим текст отзыва
      console.log('[Reviews POST] Starting translation process for message:', message);
      const translations = await translateService.translateReview(message);
      console.log('[Reviews POST] Translation results:', translations);

      // Создаем отзыв в базе данных с переводами
      const savedReview = await prisma.review.create({
        data: {
          author: name.trim(),
          email: email.trim(),
          text: message.trim(),
          textBg: translations.bg,
          textEn: translations.en,
          rating: ratingNum
        }
      });

      console.log('[Reviews POST] Review saved successfully:', savedReview);
      res.status(201).json(savedReview);
    } catch (error) {
      console.error('[Reviews POST] Error creating review:', error);
      res.status(500).json({ error: 'Failed to create review' });
    }
  });
});

// GET /api/reviews - получение всех отзывов
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Устанавливаем заголовки кэширования
    res.setHeader('Cache-Control', 'public, max-age=300'); // 5 минут
    res.setHeader('Content-Type', 'application/json');

    // Получаем общее количество отзывов
    const totalReviews = await prisma.review.count();

    // Получаем отзывы с пагинацией
    const reviews = await prisma.review.findMany({
      select: {
        id: true,
        author: true,
        text: true,
        textBg: true,
        textEn: true,
        rating: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: limit
    });

    res.json({
      reviews,
      pagination: {
        total: totalReviews,
        pages: Math.ceil(totalReviews / limit),
        currentPage: page,
        perPage: limit
      }
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

export default router;