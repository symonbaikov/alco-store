import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateReviews() {
  try {
    // Обновляем болгарские отзывы
    await prisma.review.updateMany({
      where: {
        author: {
          in: ['Александър', 'Михаил', 'Елена', 'Димитър']
        }
      },
      data: {
        text_key: 'review1'
      }
    });

    // Обновляем английские отзывы
    await prisma.review.updateMany({
      where: {
        author: {
          in: ['Alexander', 'Michael', 'Elena', 'Dimitar']
        }
      },
      data: {
        text_key: 'review1'
      }
    });

    console.log('Reviews updated successfully');
  } catch (error) {
    console.error('Error updating reviews:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateReviews(); 