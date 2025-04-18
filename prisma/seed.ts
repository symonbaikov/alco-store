import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Очищаем существующие данные
  await prisma.slide.deleteMany();

  // Создаем слайды
  const slides = [
    {
      image: '/slides/slide1.jpg',
      title: 'Премиальные вина',
      description: 'Широкий выбор вин из лучших виноделен мира',
      link: '/wines',
      order: 1,
    },
    {
      image: '/slides/slide2.jpg',
      title: 'Элитные крепкие напитки',
      description: 'Коллекция редких и эксклюзивных спиртных напитков',
      link: '/spirits',
      order: 2,
    },
    {
      image: '/slides/slide3.jpg',
      title: 'Подарочные наборы',
      description: 'Идеальные подарки для ценителей качественного алкоголя',
      link: '/gift-sets',
      order: 3,
    },
  ];

  for (const slide of slides) {
    await prisma.slide.create({
      data: slide,
    });
  }

  console.log('База данных успешно заполнена');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 