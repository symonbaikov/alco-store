import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { ROUTES } from "../../../server/config/routes";
import "./Catalog.css";

const Catalog: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bottom-nav">
      <div className="bottom-nav-container">
        <ul className="catalog-menu">
          <li className="catalog-item catalog-dropdown">
            <Link to={ROUTES.CATALOG}>{t('navbar.fullCatalog')}</Link>
            <div className="catalog-dropdown-content">
              <div className="catalog-grid">
                <div className="catalog-column categories">
                  <Link to="/category/armanyak">Арманьяк</Link>
                  <Link to="/category/brendy">Бренди</Link>
                  <Link to="/category/wine">Вино</Link>
                  <Link to="/category/vermut">Вермут</Link>
                  <Link to="/category/whiskey">Виски</Link>
                  <Link to="/category/vodka">Водка</Link>
                  <Link to="/category/grappa">Граппа</Link>
                  <Link to="/category/gin">Джин</Link>
                  <Link to="/category/calvados">Кальвадос</Link>
                  <Link to="/category/cognac">Коньяк</Link>
                  <Link to="/category/liquor">Ликер</Link>
                  <Link to="/category/drinks">Напитки</Link>
                  <Link to="/category/beer">Пиво</Link>
                  <Link to="/category/rum">Ром</Link>
                  <Link to="/category/tequila">Текила</Link>
                  <Link to="/category/chacha">Чача</Link>
                  <Link to="/category/snacks">Снеки</Link>
                  <Link to="/category/accessories">Аксессуары</Link>
                  <Link to="/category/confectionery">Кондитерские изделия</Link>
                  <Link to="/category/gift-sets">Подарочные наборы</Link>
                  <Link to="/category/miniatures">Миниатюры</Link>
                </div>
                <div className="catalog-details">
                  <div className="catalog-section">
                    <div className="catalog-header">Производитель</div>
                    <div className="catalog-values">
                      <div className="catalog-value">Clos Martin</div>
                      <div className="catalog-value">La Martiniquaise</div>
                    </div>
                  </div>
                  <div className="catalog-section">
                    <div className="catalog-header">Страна</div>
                    <div className="catalog-values">
                      <div className="catalog-value">Франция</div>
                    </div>
                  </div>
                  <div className="catalog-section">
                    <div className="catalog-header">Объём</div>
                    <div className="catalog-values">
                      <div className="catalog-value">0,7 л</div>
                    </div>
                  </div>
                  <div className="catalog-section">
                    <div className="catalog-header">Крепость</div>
                    <div className="catalog-values">
                      <div className="catalog-value">40%</div>
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