import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

interface NavbarProps {
  onCartClick: () => void;
  onAuthClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCartClick, onAuthClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Мобильная навигация */}
      <div className="mobile-nav">
        <button
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>
        <Link to="/" className="navbar-logo">
          ALCOMAG
        </Link>
        <div className="mobile-icons">
          <button
            className="icon-button"
            onClick={() => setIsPhoneModalOpen(true)}
          >
            <i className="fas fa-phone"></i>
          </button>
          <button
            className="icon-button"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <i className="fas fa-search"></i>
          </button>
          <button className="icon-button" onClick={onAuthClick}>
            <i className="fas fa-user"></i>
          </button>
          <button className="icon-button cart-icon" onClick={onCartClick}>
            <i className="fas fa-shopping-cart"></i>
            <span className="cart-count">0</span>
          </button>
        </div>
      </div>

      {/* Модальное окно с телефонами */}
      {isPhoneModalOpen && (
        <div className="phone-modal">
          <div className="phone-modal-header">
            <h2>Телефони</h2>
            <button
              className="close-button"
              onClick={() => setIsPhoneModalOpen(false)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="phone-list">
            <a href="tel:+380979740660" className="phone-item">
              <div className="phone-icon kyivstar">
                <i className="fas fa-phone"></i>
              </div>
              <div className="phone-info">
                <div className="phone-number">+38 (097) 974-06-60</div>
                <div className="phone-description">Отдел продажби</div>
              </div>
            </a>
            <a href="tel:+380509740660" className="phone-item">
              <div className="phone-icon vodafone">
                <i className="fas fa-phone"></i>
              </div>
              <div className="phone-info">
                <div className="phone-number">+38 (050) 974-06-60</div>
                <div className="phone-description">Обработка на поръчки</div>
              </div>
            </a>
            <a href="tel:+380938740660" className="phone-item">
              <div className="phone-icon lifecell">
                <i className="fas fa-phone"></i>
              </div>
              <div className="phone-info">
                <div className="phone-number">+38 (093) 874-06-60</div>
                <div className="phone-description">Обработка на желания</div>
              </div>
            </a>
          </div>
        </div>
      )}

      {isSearchOpen && (
        <div className="mobile-search">
          <div className="search-container">
            <input type="text" placeholder="Търсене" />
            <button onClick={() => setIsSearchOpen(false)}>
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}

      {/* Меню для мобильных */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <div
          className="language-selector"
          onClick={() => setIsLanguageMenuOpen(true)}
        >
          <div className="language-icon">
            <i className="fas fa-globe"></i>
          </div>
          <div className="language-content">
            <div className="language-title">Български</div>
            <div className="language-subtitle">Език на сайта</div>
          </div>
          <i className="fas fa-chevron-right"></i>
        </div>

        <div className={`language-menu ${isLanguageMenuOpen ? "open" : ""}`}>
          <div className="language-menu-header">
            <button
              className="back-button"
              onClick={() => setIsLanguageMenuOpen(false)}
            >
              <i className="fas fa-arrow-left"></i>
              Назад
            </button>
          </div>
          <div className="language-options">
            <div className="language-option active">
              <span>Български</span>
            </div>
            <div className="language-option">
              <span>English</span>
            </div>
          </div>
        </div>

        <div className="mobile-catalog">
          <ul className="mobile-catalog-list">
            <li>
              <Link to="/wine">Вино</Link>
            </li>
            <li>
              <Link to="/strong">Силни алкохоли</Link>
            </li>
            <li>
              <Link to="/liquor">Ликьори, вермути</Link>
            </li>
            <li>
              <Link to="/drinks">Напитки</Link>
            </li>
            <li>
              <Link to="/profile" className="mobile-footer-item">
                <i className="fas fa-user"></i>
                <span>Личен кабинет</span>
              </Link>
            </li>
            <li>
              <Link to="/cart" className="mobile-footer-item">
                <i className="fas fa-shopping-cart"></i>
                <span>Кошница</span>
                <span className="cart-badge">0</span>
              </Link>
            </li>
            <li>
              <Link to="/compare" className="mobile-footer-item">
                <i className="fas fa-chart-bar"></i>
                <span>Сравнение на продукти</span>
                <span className="compare-badge">0</span>
              </Link>
            </li>
            <li>
              <Link to="/beer">Бира</Link>
            </li>
            <li>
              <Link to="/snacks">Снаксове</Link>
            </li>
            <li>
              <Link to="/confectionery">Сладкиши</Link>
            </li>
            <li>
              <Link to="/sales">Промоции</Link>
            </li>
            <li>
              <Link to="/contacts">Контакти</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Десктоп навигация */}
      <div className="nav-content">
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
              <Link to="/contacts">Контакти</Link>
            </li>
          </ul>
          <div className="nav-right">
            <button className="icon-button" onClick={onAuthClick}>
              <i className="fas fa-user"></i>
              Вход
            </button>
          </div>
        </div>

        {/* Средняя секция */}
        <div className="top-nav">
          <div className="nav-left">
            <Link to="/" className="navbar-logo">
              ALCOMAG
            </Link>
            <div className="search-container">
              <input type="text" placeholder="Търсене" />
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
              <div className="language-selector desktop">
                <button className="icon-button">
                  <i className="fas fa-globe"></i>
                  BG
                </button>
                <div className="language-dropdown">
                  <div className="language-option active">
                    <div className="language-content">
                      <div className="language-title">Български</div>
                      <div className="language-subtitle">Език на сайта</div>
                    </div>
                  </div>
                  <div className="language-option">
                    <div className="language-content">
                      <div className="language-title">English</div>
                      <div className="language-subtitle">Site language</div>
                    </div>
                  </div>
                </div>
              </div>
              <button className="icon-button">
                <i className="fas fa-chart-bar"></i>
              </button>
              <button className="icon-button" onClick={onCartClick}>
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
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
