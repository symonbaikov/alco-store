import React from "react";
import "./PopularCategories.css";
import WineBarIcon from "@mui/icons-material/WineBar";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import LiquorIcon from "@mui/icons-material/Liquor";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import RestaurantIcon from "@mui/icons-material/Restaurant";

const PopularCategories: React.FC = () => {
  return (
    <section className="popular-categories">
      <h2 className="section-title">Популярни категории</h2>
      <div className="categories-grid">
        <div className="category-item">
          <div className="icon-wrapper">
            <WineBarIcon className="category-icon" />
          </div>
          <span>Вино</span>
        </div>
        <div className="category-item">
          <div className="icon-wrapper">
            <LocalBarIcon className="category-icon" />
          </div>
          <span>Високоалкохолни напитки</span>
        </div>
        <div className="category-item">
          <div className="icon-wrapper">
            <LiquorIcon className="category-icon" />
          </div>
          <span>Ликьори</span>
        </div>
        <div className="category-item">
          <div className="icon-wrapper">
            <LocalDrinkIcon className="category-icon" />
          </div>
          <span>Напитки</span>
        </div>
        <div className="category-item">
          <div className="icon-wrapper">
            <SportsBarIcon className="category-icon" />
          </div>
          <span>Бира</span>
        </div>
        <div className="category-item">
          <div className="icon-wrapper">
            <RestaurantIcon className="category-icon" />
          </div>
          <span>Мезета</span>
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
