import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const categoryNames = {
  armanyak: "Арманьяк",
  brendy: "Бренди",
  wine: "Вино",
  vermut: "Вермут",
  whiskey: "Виски",
  vodka: "Водка",
  grappa: "Граппа",
  gin: "Джин",
  calvados: "Кальвадос",
  cognac: "Коньяк",
  liquor: "Ликер",
  drinks: "Напитки",
  beer: "Пиво",
  rum: "Ром",
  tequila: "Текила",
  chacha: "Чача",
  snacks: "Снеки",
  accessories: "Аксессуары",
  confectionery: "Кондитерские изделия",
  "gift-sets": "Подарочные наборы",
  miniatures: "Миниатюры"
} as const;

const categoryData = {
  armanyak: {
    manufacturer: ["Clos Martin", "La Martiniquaise", "Château de Laubade", "Baron de Lustrac", "Marquis de Montesquiou"],
    country: ["Франция"],
    volume: ["0,5 л", "0,7 л", "1 л"],
    strength: ["40%", "42%", "45%"]
  },
  brendy: {
    manufacturer: ["Torres", "Metaxa", "Ararat", "Sarajishvili", "Stock"],
    country: ["Испания", "Греция", "Армения", "Грузия", "Италия"],
    volume: ["0,5 л", "0,7 л", "1 л"],
    strength: ["36%", "38%", "40%"]
  },
  wine: {
    manufacturer: ["Domaine Boyar", "Château Margaux", "Castello Banfi", "Torres", "Antinori", "Masi", "Frescobaldi"],
    country: ["Франция", "Италия", "Испания", "Болгария", "Грузия", "Чили"],
    volume: ["0,75 л", "1,5 л", "3 л"],
    strength: ["11%", "12%", "13%", "14%", "15%"]
  },
  vermut: {
    manufacturer: ["Martini", "Cinzano", "Carpano", "Noilly Prat", "Dolin"],
    country: ["Италия", "Франция"],
    volume: ["0,5 л", "0,75 л", "1 л"],
    strength: ["14,4%", "15%", "16%", "18%"]
  },
  whiskey: {
    manufacturer: ["Johnnie Walker", "Jack Daniel's", "Jameson", "Chivas Regal", "Glenfiddich", "The Macallan", "Highland Park"],
    country: ["Шотландия", "США", "Ирландия", "Япония"],
    volume: ["0,5 л", "0,7 л", "1 л"],
    strength: ["40%", "43%", "46%", "48%"]
  },
  vodka: {
    manufacturer: ["Absolut", "Grey Goose", "Beluga", "Russian Standard", "Finlandia", "Stolichnaya", "Ketel One"],
    country: ["Швеция", "Франция", "Россия", "Финляндия", "Польша"],
    volume: ["0,5 л", "0,7 л", "1 л"],
    strength: ["37,5%", "40%", "45%"]
  },
  gin: {
    manufacturer: ["Bombay Sapphire", "Tanqueray", "Hendrick's", "Beefeater", "Plymouth", "The Botanist"],
    country: ["Великобритания", "Шотландия", "Нидерланды"],
    volume: ["0,5 л", "0,7 л", "1 л"],
    strength: ["37,5%", "40%", "43%", "47%"]
  },
  cognac: {
    manufacturer: ["Hennessy", "Rémy Martin", "Courvoisier", "Martell", "Camus", "Otard", "Delamain"],
    country: ["Франция"],
    volume: ["0,5 л", "0,7 л", "1 л"],
    strength: ["40%", "41%", "42%"]
  },
  liquor: {
    manufacturer: ["Baileys", "Kahlúa", "Cointreau", "Grand Marnier", "Jägermeister", "Drambuie"],
    country: ["Ирландия", "Мексика", "Франция", "Германия", "Италия"],
    volume: ["0,5 л", "0,7 л", "1 л"],
    strength: ["15%", "20%", "25%", "35%", "40%"]
  },
  rum: {
    manufacturer: ["Bacardi", "Captain Morgan", "Havana Club", "Mount Gay", "Zacapa", "Appleton Estate"],
    country: ["Куба", "Ямайка", "Барбадос", "Пуэрто-Рико", "Гватемала"],
    volume: ["0,5 л", "0,7 л", "1 л"],
    strength: ["37,5%", "40%", "43%", "45%"]
  },
  tequila: {
    manufacturer: ["Jose Cuervo", "Patrón", "Don Julio", "Olmeca", "Herradura", "El Jimador"],
    country: ["Мексика"],
    volume: ["0,5 л", "0,7 л", "1 л"],
    strength: ["38%", "40%", "45%"]
  },
  beer: {
    manufacturer: ["Heineken", "Carlsberg", "Guinness", "Corona", "Stella Artois", "Hoegaarden"],
    country: ["Нидерланды", "Дания", "Ирландия", "Мексика", "Бельгия", "Германия"],
    volume: ["0,33 л", "0,5 л", "0,75 л"],
    strength: ["4,1%", "4,6%", "5%", "5,2%", "8%"]
  },
  chacha: {
    manufacturer: ["Askaneli", "Sarajishvili", "Telavi", "Tbilvino"],
    country: ["Грузия"],
    volume: ["0,5 л", "0,7 л"],
    strength: ["40%", "45%", "50%"]
  },
  snacks: {
    manufacturer: ["Lay's", "Pringles", "Doritos", "Cheetos", "Lorenz"],
    country: ["США", "Германия", "Россия"],
    volume: ["40 г", "80 г", "150 г"],
    strength: ["0%"]
  },
  accessories: {
    manufacturer: ["Riedel", "Spiegelau", "Luigi Bormioli", "Schott Zwiesel"],
    country: ["Австрия", "Германия", "Италия"],
    volume: ["не применимо"],
    strength: ["не применимо"]
  },
  confectionery: {
    manufacturer: ["Lindt", "Godiva", "Ferrero", "Cadbury", "Toblerone"],
    country: ["Швейцария", "Бельгия", "Италия", "Великобритания"],
    volume: ["100 г", "200 г", "300 г"],
    strength: ["не применимо"]
  },
  "gift-sets": {
    manufacturer: ["Various Brands", "Premium Selection", "Luxury Collection"],
    country: ["Разные страны"],
    volume: ["разный объем"],
    strength: ["разная крепость"]
  },
  miniatures: {
    manufacturer: ["Various Brands", "Collector's Edition", "Travel Exclusive"],
    country: ["Разные страны"],
    volume: ["0,05 л", "0,1 л"],
    strength: ["разная крепость"]
  }
};



 // Создаем слайды
 const slides = [
  {
    image: '/images/14.03-SHOK-CENA-DOMAINE-BOYAR-3l.webp',
    title: 'Специално предложение',
    description: 'Domaine Boyar 3L на шокова цена',
    link: '/promotions',
    order: 1,
  },
  {
    image: '/images/01.04-Shok-Cena-Jack-Daniels.webp',
    title: 'Нови продукти',
    description: "Jack Daniel's на специална цена",
    link: '/new',
    order: 2,
  },
  {
    image: '/images/01.04-Shok-Cena-Uzo-12.webp',
    title: 'Специална оферта',
    description: 'Узо 12 на промоционална цена',
    link: '/promotions',
    order: 3,
  },
  {
    image: '/images/01.04-Shok-Cena-Jim-Beam-Honey.webp',
    title: 'Нова промоция',
    description: 'Jim Beam Honey на специална цена',
    link: '/promotions',
    order: 4,
  },
];

const reviews = [
  {
    author: "Александър",
    text: "Много съм доволен от сътрудничеството с магазина! Бързо се свързаха, уточниха всичко. Получих поръчката на следващия ден. Опаковката е перфектна. Успех и просперитет.",
    rating: 5,
    createdAt: new Date()
  },
  {
    author: "Михаил",
    text: "Отличен сервиз, бърза доставка. Стоката отговаря на описанието. Препоръчвам!",
    rating: 5,
    createdAt: new Date()
  },
  {
    author: "Елена",
    text: "Поръчах подаръчен комплект. Красива опаковка, бърза доставка. Много съм доволна!",
    rating: 5,
    createdAt: new Date()
  },
  {
    author: "Димитър",
    text: "Добър избор, приемливи цени. Доставка навреме. Ще поръчвам отново.",
    rating: 4,
    createdAt: new Date()
  }
];

async function main() {
  try {
    console.log('🚀 Starting seed...');
    
    // Очистка базы данных
    console.log('🧹 Clearing database...');
    await prisma.$transaction([
      prisma.review.deleteMany(),
      prisma.category.deleteMany(),
      prisma.user.deleteMany(),
      prisma.slide.deleteMany()
    ]);
    console.log('✅ Database cleared');

    // Создание слайдов
    console.log('🎯 Creating slides...');
    for (const slide of slides) {
      try {
        const created = await prisma.slide.create({
          data: slide
        });
        console.log(`✅ Created slide: ${created.title}`);
      } catch (error) {
        console.error('❌ Failed to create slide:', error);
      }
    }

    // Создание отзывов
    console.log('📝 Creating reviews...');
    for (const review of reviews) {
      try {
        const created = await prisma.review.create({
          data: review
        });
        console.log(`✅ Created review: ${created.id}`);
      } catch (error) {
        console.error('❌ Failed to create review:', error);
      }
    }

    // Создание категорий - исправляем обращение к переменной
    console.log('🗂 Creating categories...');
    for (const [name, displayName] of Object.entries(categoryNames)) {
      try {
        // Используем правильное имя переменной categoryData вместо categoryData2
        const data = categoryData[name as keyof typeof categoryData];
        if (data) {
          const created = await prisma.category.create({
            data: {
              name,
              displayName,
              manufacturer: data.manufacturer,
              country: data.country,
              volume: data.volume,
              strength: data.strength
            }
          });
          console.log(`✅ Created category: ${created.name}`);
        }
      } catch (error) {
        console.error(`❌ Failed to create category ${name}:`, error);
      }
    }

    // Создание админа
    console.log('👤 Creating admin user...');
    try {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const admin = await prisma.user.create({
        data: {
          email: 'admin@example.com',
          password: hashedPassword,
          role: Role.ADMIN,
          firstName: 'Admin',
          lastName: 'User'
        }
      });
      console.log('✅ Created admin user:', admin.email);
    } catch (error) {
      console.error('❌ Failed to create admin:', error);
    }

    console.log('✨ Seed finished successfully');
  } catch (error) {
    console.error('❌ Seed failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });