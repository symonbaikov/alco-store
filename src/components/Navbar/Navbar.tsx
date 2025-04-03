import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      {/* Верхняя навигация */}
      <div className="top-nav">
        <ul className="top-menu">
          <li className="top-menu-item">
            <Link to="/">Начало</Link>
          </li>
          <li className="top-menu-item">
            <Link to="/manufacturers">Производители</Link>
          </li>
          <li className="top-menu-item">
            <Link to="/about">За нас</Link>
          </li>
          <li className="top-menu-item">
            <Link to="/delivery">Плащане и доставка</Link>
          </li>
          <li className="top-menu-item">
            <Link to="/reviews">Отзиви</Link>
          </li>
          <li className="top-menu-item">
            <Link to="/cooperation">Сътрудничество</Link>
          </li>
          <li className="top-menu-item">
            <Link to="/rent">Контакти</Link>
          </li>
        </ul>

        <div className="nav-right">
          <Link to="/login" className="icon-button">
            <i className="fas fa-user"></i>
            Вход
          </Link>
        </div>
      </div>

      {/* Средняя секция */}
      <div className="top-nav">
        <div className="nav-left">
          <Link to="/" className="navbar-logo">
            ALCOMAG
          </Link>
          <div className="search-container">
            <input type="text" placeholder="Търсене на продукти" />
            <button>
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>

        <div className="nav-right">
          <a href="tel:+380979740660" className="phone-number">
            <i className="fas fa-phone"></i>
            +38 (097) 974-06-60
          </a>
          <div className="icons-container">
            <button className="icon-button">
              <i className="fas fa-globe"></i>
              BG
            </button>
            <button className="icon-button">
              <i className="fas fa-chart-bar"></i>
            </button>
            <button className="icon-button">
              <i className="fas fa-shopping-cart"></i>
              <span className="cart-count">0</span>
            </button>
          </div>
        </div>
      </div>

      {/* Нижняя навигация */}
      <div className="bottom-nav">
        <div className="bottom-nav-container">
          <ul className="catalog-menu">
            <li className="catalog-item">
              <Link to="/catalog">
                <i className="fas fa-bars"></i> ЦЯЛ КАТАЛОГ
              </Link>
            </li>
            <li className="catalog-item">
              <Link to="/wine">ВИНА</Link>
            </li>
            <li className="catalog-item">
              <Link to="/strong">СИЛНИ АЛКОХОЛИ</Link>
            </li>
            <li className="catalog-item">
              <Link to="/liquor">ЛИКЬОРИ, ВЕРМУТИ</Link>
            </li>
            <li className="catalog-item">
              <Link to="/drinks">НАПИТКИ</Link>
            </li>
            <li className="catalog-item">
              <Link to="/beer">БИРА</Link>
            </li>
            <li className="catalog-item">
              <Link to="/snacks">СНАКСОВЕ</Link>
            </li>
            <li className="catalog-item">
              <Link to="/confectionery">СЛАДКИШИ</Link>
            </li>
            <li className="catalog-item">
              <Link to="/sales">ПРОМОЦИИ</Link>
            </li>
            <li className="catalog-item">
              <Link to="/contacts">КОНТАКТИ</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
