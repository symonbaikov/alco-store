import { Router } from 'express';
import { getAllBlogs } from '../controllers/blogController';

const router = Router();

router.get('/', getAllBlogs);

// Новый роут для отдачи картинок статей из БД
router.get('/api/article-images/:id', async (req, res) => {
  // Здесь должна быть логика получения картинки из БД по id
  // Пока что возвращаем заглушку
  const { id } = req.params;
  // Например, res.contentType('image/jpeg').send(imageBuffer)
  res.status(200).sendFile(require('path').resolve(__dirname, '../../public/images/a7svkjdjilymj8d3gbw4syso5w1k9vcb.jpg'));
});

export default router; 