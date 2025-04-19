import React from "react";
import { useTranslation } from 'react-i18next';
import "./PopularCategories.css";

const PopularCategories: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="popular-categories">
      <h2 className="section-title">{t('popularCategories.title')}</h2>
      <div className="categories-grid">
        <div className="category-item">
          <img
            src="/images/categories-wine.png"
            alt={t('popularCategories.categories.wine')}
            className="category-image"
          />
          <span>{t('popularCategories.categories.wine')}</span>
        </div>
        <div className="category-item">
          <img
            src="/images/categories-whiskey.jpg"
            alt={t('popularCategories.categories.strongAlcohol')}
            className="category-image"
          />
          <span>{t('popularCategories.categories.strongAlcohol')}</span>
        </div>
        <div className="category-item">
          <img
            src="/images/categories-liquor.jpg"
            alt={t('popularCategories.categories.liquor')}
            className="category-image"
          />
          <span>{t('popularCategories.categories.liquor')}</span>
        </div>
        <div className="category-item">
          <img
            src="/images/categories-drinks.jpg"
            alt={t('popularCategories.categories.drinks')}
            className="category-image"
          />
          <span>{t('popularCategories.categories.drinks')}</span>
        </div>
        <div className="category-item">
          <img
            src="/images/categories-beer.jpg"
            alt={t('popularCategories.categories.beer')}
            className="category-image"
          />
          <span>{t('popularCategories.categories.beer')}</span>
        </div>
        <div className="category-item">
          <img
            src="/images/categories-snacks.jpg"
            alt={t('popularCategories.categories.snacks')}
            className="category-image"
          />
          <span>{t('popularCategories.categories.snacks')}</span>
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
