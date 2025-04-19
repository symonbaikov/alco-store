import React from "react";
import { useTranslation } from "react-i18next";
import "./Categories.css";

interface CategoryCard {
  id: string;
  image: string;
  imageAlt: string;
}

const categoryCards: CategoryCard[] = [
  {
    id: "service",
    image: "/images/mir4hh1fc4wnc9c678752h2z6j0dpd8k.jpg",
    imageAlt: "wine-tasting"
  },
  {
    id: "blog",
    image: "/images/1usfz2uztycqbh8eupl35fb1xmlro1x4.jpg",
    imageAlt: "refreshing-drinks"
  },
  {
    id: "promotion",
    image: "/images/ygye22g21kty21m5vmrz24lqv97zqe2v.jpg",
    imageAlt: "special-offers"
  }
];

const Categories: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="categories">
      <div className="categories-container">
        {categoryCards.map((card) => (
          <div key={card.id} className="category-card">
            <span className="category-label">
              {t(`categoryCards.${card.id}.label`)}
            </span>
            <img
              src={card.image}
              alt={t(`categoryCards.${card.id}.title`)}
            />
            <div className="category-content">
              <h3>{t(`categoryCards.${card.id}.title`)}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
