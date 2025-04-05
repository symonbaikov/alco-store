import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const slides = [
    {
      image: "/images/14.03-SHOK-CENA-DOMAINE-BOYAR-3l.webp",
      title: "Специално предложение",
      description: "Domaine Boyar 3L на шокова цена",
      link: "/promotions",
      order: 1,
    },
    {
      image: "/images/01.04-Shok-Cena-Jack-Daniels.webp",
      title: "Нови продукти",
      description: "Jack Daniel's на специална цена",
      link: "/new",
      order: 2,
    },
    {
      image: "/images/01.04-Shok-Cena-Beluga-1l.webp",
      title: "Промоция на седмицата",
      description: "Beluga 1L на изгодна цена",
      link: "/weekly",
      order: 3,
    },
    {
      image: "/images/01.04-Shok-Cena-Uzo-12.webp",
      title: "Специална оферта",
      description: "Узо 12 на промоционална цена",
      link: "/promotions",
      order: 4,
    },
    {
      image: "/images/01.04-Shok-Cena-Jim-Beam-Honey.webp",
      title: "Нова промоция",
      description: "Jim Beam Honey на специална цена",
      link: "/promotions",
      order: 5,
    },
  ];

  for (const slide of slides) {
    await prisma.slide.create({
      data: slide,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
