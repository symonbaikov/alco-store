import React from "react";
import "./DrinkCategories.css";

interface DrinkCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

const categories: DrinkCategory[] = [
  {
    id: "whiskey",
    title: "УИСКИ",
    subtitle: "ТВОЯТ ДОСТЪП ДО НОВО НИВО",
    description:
      "Ние представяме изключително лицензирана продукция от водещи марки, сред които Chivas Brothers, John Jameson & Son, Ballantine's, William Lawson's и много други производители, които",
    image: "/images/whiskey.png",
  },
  {
    id: "vodka",
    title: "ВОДКА",
    subtitle: "ИЗГОДНО ПРЕДЛОЖЕНИЕ",
    description:
      "Важна характеристика на тази напитка е нейното филтриране, благодарение на което напитката може да получи максимално чист вкус, отличаващ продуктите от елитния сегмент.",
    image: "/images/vodka.png",
  },
  {
    id: "liquor",
    title: "ЛИКЬОРИ И ВЕРМУТИ",
    subtitle: "ЗА ВКУСОВЕТЕ НЕ СЕ СПОРИ, ТЕ СЕ ИЗБИРАТ",
    description:
      "Ликьорът е алкохолна напитка, която има сладък вкус и се приготвя на базата на плодови, горски плодове, билкови настойки с добавяне на подправки, ядки, какао. В основата на всеки ликьор стои отлично",
    image: "/images/liquor.png",
  },
  {
    id: "wine",
    title: "ВИНО",
    subtitle: "ДОВЕРЕТЕ СЕ НА ЧУВСТВАТА СИ",
    description:
      "Вината са обширна и разнообразна категория алкохолни напитки. Разделят се на пенливи и тихи вина. Така първата категория съдържа въглероден диоксид, който причинява тяхната пенливост. Тихите вина биват:",
    image: "/images/wine.png",
  },
];

export const DrinkCategories = () => {
  return (
    <div className="drink-categories">
      {categories.map((category) => (
        <div key={category.id} className="drink-category">
          <div className="drink-category-content">
            <div className="drink-category-text">
              <p className="drink-category-subtitle">{category.subtitle}</p>
              <h2 className="drink-category-title">{category.title}</h2>
              <p className="drink-category-description">
                {category.description}
              </p>
            </div>
            <div className="drink-category-image">
              <img src={category.image} alt={category.title} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
