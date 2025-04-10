import React from "react";
import "./PopularCategories.css";

const PopularCategories: React.FC = () => {
  return (
    <section className="popular-categories">
      <h2 className="section-title">Популярни категории стоки</h2>
      <div className="categories-grid">
        <div className="category-item">
          <img
            src="/images/categories-wine.png"
            alt="Вино"
            className="category-image"
          />
          <span>Вино</span>
        </div>
        <div className="category-item">
          <img
            src="/images/categories-whiskey.jpg"
            alt="Високоалкохолни напитки"
            className="category-image"
          />
          <span>Високоалкохолни напитки</span>
        </div>
        <div className="category-item">
          <img
            src="/images/categories-liquor.jpg"
            alt="Ликьори, вермути"
            className="category-image"
          />
          <span>Ликьори, вермути</span>
        </div>
        <div className="category-item">
          <img
            src="/images/categories-drinks.jpg"
            alt="Напитки"
            className="category-image"
          />
          <span>Напитки</span>
        </div>
        <div className="category-item">
          <img
            src="/images/categories-beer.jpg"
            alt="Бира"
            className="category-image"
          />
          <span>Бира</span>
        </div>
        <div className="category-item">
          <img
            src="/images/categories-snacks.jpg"
            alt="Мезета"
            className="category-image"
          />
          <span>Мезета</span>
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
