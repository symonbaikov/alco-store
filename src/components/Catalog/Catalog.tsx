import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { ROUTES } from "../../../server/config/routes";
import "./Catalog.css";

interface CategoryDetails {
  manufacturer: string[];
  country: string[];
  volume: string[];
  strength: string[];
}

const categoryDetailsMap: Record<string, CategoryDetails> = {
  armanyak: {
    manufacturer: ["Clos Martin", "La Martiniquaise"],
    country: ["Франция"],
    volume: ["0,7 л"],
    strength: ["40%"]
  },
  whiskey: {
    manufacturer: ["Johnnie Walker", "Jack Daniel's"],
    country: ["Шотландия", "США"],
    volume: ["0,7 л", "1 л"],
    strength: ["40%", "43%"]
  },
  // Добавьте остальные категории по аналогии
};

const Catalog: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>("armanyak");

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const getCategoryDetails = (category: string): CategoryDetails => {
    return categoryDetailsMap[category] || categoryDetailsMap.armanyak;
  };

  const details = getCategoryDetails(selectedCategory);

  return (
    <div className="bottom-nav">
      <div className="bottom-nav-container">
        <ul className="catalog-menu">
          <li className="catalog-item catalog-dropdown">
            <Link to={ROUTES.CATALOG}>{t('navbar.fullCatalog')}</Link>
            <div className="catalog-dropdown-content">
              <div className="catalog-grid">
                <div className="catalog-column categories">
                  <Link to="/category/armanyak" onClick={() => handleCategoryClick("armanyak")}>Арманьяк</Link>
                  <Link to="/category/brendy" onClick={() => handleCategoryClick("brendy")}>Бренди</Link>
                  <Link to="/category/wine" onClick={() => handleCategoryClick("wine")}>Вино</Link>
                  <Link to="/category/vermut" onClick={() => handleCategoryClick("vermut")}>Вермут</Link>
                  <Link to="/category/whiskey" onClick={() => handleCategoryClick("whiskey")}>Виски</Link>
                  <Link to="/category/vodka" onClick={() => handleCategoryClick("vodka")}>Водка</Link>
                  <Link to="/category/grappa" onClick={() => handleCategoryClick("grappa")}>Граппа</Link>
                  <Link to="/category/gin" onClick={() => handleCategoryClick("gin")}>Джин</Link>
                  <Link to="/category/calvados" onClick={() => handleCategoryClick("calvados")}>Кальвадос</Link>
                  <Link to="/category/cognac" onClick={() => handleCategoryClick("cognac")}>Коньяк</Link>
                  <Link to="/category/liquor" onClick={() => handleCategoryClick("liquor")}>Ликер</Link>
                  <Link to="/category/drinks" onClick={() => handleCategoryClick("drinks")}>Напитки</Link>
                  <Link to="/category/beer" onClick={() => handleCategoryClick("beer")}>Пиво</Link>
                  <Link to="/category/rum" onClick={() => handleCategoryClick("rum")}>Ром</Link>
                  <Link to="/category/tequila" onClick={() => handleCategoryClick("tequila")}>Текила</Link>
                  <Link to="/category/chacha" onClick={() => handleCategoryClick("chacha")}>Чача</Link>
                  <Link to="/category/snacks" onClick={() => handleCategoryClick("snacks")}>Снеки</Link>
                  <Link to="/category/accessories" onClick={() => handleCategoryClick("accessories")}>Аксессуары</Link>
                  <Link to="/category/confectionery" onClick={() => handleCategoryClick("confectionery")}>Кондитерские изделия</Link>
                  <Link to="/category/gift-sets" onClick={() => handleCategoryClick("gift-sets")}>Подарочные наборы</Link>
                  <Link to="/category/miniatures" onClick={() => handleCategoryClick("miniatures")}>Миниатюры</Link>
                </div>
                <div className="catalog-details">
                  <div className="catalog-section">
                    <div className="catalog-header">Производитель</div>
                    <div className="catalog-values">
                      {details.manufacturer.map((manufacturer, index) => (
                        <div key={index} className="catalog-value">{manufacturer}</div>
                      ))}
                    </div>
                  </div>
                  <div className="catalog-section">
                    <div className="catalog-header">Страна</div>
                    <div className="catalog-values">
                      {details.country.map((country, index) => (
                        <div key={index} className="catalog-value">{country}</div>
                      ))}
                    </div>
                  </div>
                  <div className="catalog-section">
                    <div className="catalog-header">Объём</div>
                    <div className="catalog-values">
                      {details.volume.map((volume, index) => (
                        <div key={index} className="catalog-value">{volume}</div>
                      ))}
                    </div>
                  </div>
                  <div className="catalog-section">
                    <div className="catalog-header">Крепость</div>
                    <div className="catalog-values">
                      {details.strength.map((strength, index) => (
                        <div key={index} className="catalog-value">{strength}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="catalog-item">
            <Link to={ROUTES.WINE}>{t('navbar.wineCaps')}</Link>
          </li>
          <li className="catalog-item">
            <Link to={ROUTES.STRONG}>{t('navbar.strongCaps')}</Link>
          </li>
          <li className="catalog-item">
            <Link to={ROUTES.LIQUOR}>{t('navbar.liquorCaps')}</Link>
          </li>
          <li className="catalog-item">
            <Link to={ROUTES.DRINKS}>{t('navbar.drinksCaps')}</Link>
          </li>
          <li className="catalog-item">
            <Link to={ROUTES.BEER}>{t('navbar.beerCaps')}</Link>
          </li>
          <li className="catalog-item">
            <Link to={ROUTES.SNACKS}>{t('navbar.snacksCaps')}</Link>
          </li>
          <li className="catalog-item">
            <Link to={ROUTES.CONFECTIONERY}>{t('navbar.confectioneryCaps')}</Link>
          </li>
          <li className="catalog-item">
            <Link to={ROUTES.SALES}>
              <i className="fas fa-bolt"></i>
              {t('navbar.salesCaps')}
            </Link>
          </li>
        </ul>
        <div className="page-overlay"></div>
      </div>
    </div>
  );
};

export default Catalog; 