import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { ROUTES } from "../../../server/config/routes";
import { FaChevronRight } from 'react-icons/fa';
import "./Catalog.css";

interface Category {
  name: string;
  displayName: string;
  manufacturer: string[];
  country: string[];
  volume: string[];
  strength: string[];
}

const nonAlcoholCategories = ['accessories', 'confectionery', 'gift-sets', 'miniatures', 'snacks'];

const Catalog: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentDetails, setCurrentDetails] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  // Загрузка всех категорий при монтировании компонента
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/categories");
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
          // Устанавливаем первую категорию как выбранную
          if (data.length > 0 && !selectedCategory) {
            setSelectedCategory(data[0].name);
          }
        }
      } catch (error) {
        console.error("Ошибка при загрузке категорий:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [selectedCategory]);

  // Загрузка деталей выбранной категории
  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/categories/${selectedCategory}`);
        if (response.ok) {
          const data = await response.json();
          setCurrentDetails(data);
        }
      } catch (error) {
        console.error("Ошибка при загрузке деталей категории:", error);
      }
    };

    if (selectedCategory) {
      fetchCategoryDetails();
    }
  }, [selectedCategory]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="bottom-nav">
      <div className="bottom-nav-container">
        <ul className="catalog-menu">
          <li className="catalog-item catalog-dropdown">
            <div className="catalog-item-link">{t('navbar.fullCatalog')}</div>
            <div className="catalog-dropdown-content">
              <div className="catalog-grid">
                <div className="catalog-column categories">
                  {categories.map((category) => (
                    <div
                      key={category.name}
                      className="category-link"
                      onMouseEnter={() => handleCategoryClick(category.name)}
                    >
                      {category.displayName}
                      {!nonAlcoholCategories.includes(category.name) && (
                        <FaChevronRight className="arrow" />
                      )}
                    </div>
                  ))}
                </div>
                {currentDetails && (
                  <div className="catalog-details">
                    <div className="catalog-section">
                      <div className="catalog-header">Производитель</div>
                      <div className="catalog-values">
                        {currentDetails.manufacturer.map((manufacturer, index) => (
                          <div key={index} className="catalog-value">{manufacturer}</div>
                        ))}
                      </div>
                    </div>
                    <div className="catalog-section">
                      <div className="catalog-header">Страна</div>
                      <div className="catalog-values">
                        {currentDetails.country.map((country, index) => (
                          <div key={index} className="catalog-value">{country}</div>
                        ))}
                      </div>
                    </div>
                    <div className="catalog-section">
                      <div className="catalog-header">Объём</div>
                      <div className="catalog-values">
                        {currentDetails.volume.map((volume, index) => (
                          <div key={index} className="catalog-value">{volume}</div>
                        ))}
                      </div>
                    </div>
                    <div className="catalog-section">
                      <div className="catalog-header">Крепость</div>
                      <div className="catalog-values">
                        {currentDetails.strength.map((strength, index) => (
                          <div key={index} className="catalog-value">{strength}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
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