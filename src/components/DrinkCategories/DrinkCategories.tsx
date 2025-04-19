import "./DrinkCategories.css";
import { useTranslation } from 'react-i18next';

interface DrinkCategory {
  id: string;
  image: string;
}

const categories: DrinkCategory[] = [
  {
    id: "whiskey",
    image: "/images/whiskey.png",
  },
  {
    id: "vodka",
    image: "/images/vodka.png",
  },
  {
    id: "liquor",
    image: "/images/liquor.png",
  },
  {
    id: "wine",
    image: "/images/wine.png",
  },
];

export const DrinkCategories = () => {
  const { t } = useTranslation();

  return (
    <div className="drink-categories">
      {categories.map((category) => (
        <div key={category.id} className="drink-category">
          <div className="drink-category-content">
            <div className="drink-category-text">
              <p className="drink-category-subtitle">
                {t(`categories.${category.id}.subtitle`)}
              </p>
              <h2 className="drink-category-title">
                {t(`categories.${category.id}.title`)}
              </h2>
              <p className="drink-category-description">
                {t(`categories.${category.id}.description`)}
              </p>
            </div>
            <div className="drink-category-image">
              <img src={category.image} alt={t(`categories.${category.id}.title`)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
