import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
import { authenticatedUser } from '../lib/lib';
import multer from 'multer';
import path from 'path';

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
      return res.status(400).json({
        error: err.message
      });
    }

    try {
      console.log('Reviews POST - session:', req.session);
      console.log('Reviews POST - user:', req.session.user);
      console.log('Reviews POST - request body:', req.body);
      console.log('Reviews POST - file:', req.file);
      
      const { name, email, message, rating } = req.body;

      // Проверяем наличие обязательных полей
      if (!name?.trim() || !email?.trim() || !message?.trim() || rating === undefined) {
        res.status(400).json({
          error: 'Отсутствуют обязательные поля'
        });
        return;
      }

      // Валидация email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({
          error: 'Некорректный формат email'
        });
        return;
      }

      // Валидация рейтинга
      const ratingNum = Number(rating);
      if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
        res.status(400).json({
          error: 'Рейтинг должен быть числом от 1 до 5'
        });
        return;
      }

      // Создаем отзыв в базе данных
      const savedReview = await prisma.review.create({
        data: {
          author: name.trim(),
          email: email.trim(),
          text: message.trim(),
          rating: ratingNum
        }
      });
      console.log('Отзыв сохранен в БД:', savedReview);

      // Формируем email сообщение
      const mailOptions: any = {
        from: {
          name: 'Alco Store',
          address: process.env.EMAIL_USER as string
        },
        to: process.env.EMAIL_USER as string,
        subject: 'Новый отзыв на сайте Alco Store',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Получен новый отзыв</h2>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
              <p><strong>Имя:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Сообщение:</strong> ${message}</p>
              <p><strong>Оценка:</strong> ${'⭐'.repeat(ratingNum)}</p>
            </div>
          </div>
        `
      };

      // Если есть прикрепленный файл, добавляем его к письму
      if (req.file) {
        mailOptions.attachments = [{
          filename: req.file.originalname,
          content: req.file.buffer,
          contentType: req.file.mimetype
        }];
      }

      try {
        console.log('Начинаем отправку email...');
        const mailResult = await transporter.sendMail(mailOptions);
        console.log('Email отправлен успешно:', mailResult);
        
        res.status(201).json({
          message: 'Отзыв успешно создан и уведомление отправлено',
          review: savedReview
        });
      } catch (emailError) {
        console.error('Ошибка отправки email:', emailError);
        res.status(201).json({
          message: 'Отзыв создан, но возникла проблема с отправкой уведомления',
          review: savedReview
        });
      }
    } catch (error) {
      console.error('Ошибка при обработке отзыва:', error);
      res.status(500).json({
        error: 'Произошла ошибка при сохранении отзыва'
      });
    }
  });
});

// GET /api/reviews - получение всех отзывов
router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    // Устанавливаем заголовок Content-Type
    res.setHeader('Content-Type', 'application/json');

    const reviews = await prisma.review.findMany({
      select: {
        id: true,
        author: true,
        text: true,
        text_key: true,
        rating: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

export default router;