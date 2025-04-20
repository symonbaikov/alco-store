import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { ROUTES, PHONE_NUMBERS } from "../../../server/config/routes";
import { useAuthContext } from "../../context/AuthContext";
import "./Navbar.css";

interface NavbarProps {
  onCartClick: () => void;
  onAuthClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCartClick, onAuthClick }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLanguageLoading, setIsLanguageLoading] = useState(false);
  const { isLoggedIn } = useAuthContext();

  const changeLanguage = async (lng: string) => {
    try {
      setIsLanguageLoading(true);
      await i18n.changeLanguage(lng);
      setIsLanguageMenuOpen(false);
      const currentPath = window.location.pathname;
      window.location.href = currentPath;
    } catch (error) {
      console.error('Failed to load language:', error);
      setIsLanguageLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsScrolled(scrolled);

      // Вычисляем прогресс прокрутки 
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled_progress = (window.scrollY / windowHeight) * 100;
      setScrollProgress(scrolled_progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      navigate(ROUTES.PROFILE);
    } else {
      onAuthClick();
    }
  };

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
        <Link to={ROUTES.HOME} className="navbar-logo">
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
          <button className="icon-button" onClick={handleAuthClick}>
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
            <h2>{t('navbar.phones')}</h2>
            <button
              className="close-button"
              onClick={() => setIsPhoneModalOpen(false)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="phone-list">
            <a href={`tel:${PHONE_NUMBERS.KYIVSTAR}`} className="phone-item">
              <div className="phone-icon kyivstar">
                <i className="fas fa-phone"></i>
              </div>
              <div className="phone-info">
                <div className="phone-number">{PHONE_NUMBERS.KYIVSTAR}</div>
                <div className="phone-description">{t('navbar.salesDepartment')}</div>
              </div>
            </a>
            <a href={`tel:${PHONE_NUMBERS.VODAFONE}`} className="phone-item">
              <div className="phone-icon vodafone">
                <i className="fas fa-phone"></i>
              </div>
              <div className="phone-info">
                <div className="phone-number">{PHONE_NUMBERS.VODAFONE}</div>
                <div className="phone-description">{t('navbar.orderProcessing')}</div>
              </div>
            </a>
            <a href={`tel:${PHONE_NUMBERS.LIFECELL}`} className="phone-item">
              <div className="phone-icon lifecell">
                <i className="fas fa-phone"></i>
              </div>
              <div className="phone-info">
                <div className="phone-number">{PHONE_NUMBERS.LIFECELL}</div>
                <div className="phone-description">{t('navbar.inquiryProcessing')}</div>
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
              {t('navbar.back')}
            </button>
          </div>
          <div className="language-options">
            <div 
              className={`language-option ${i18n.language === 'bg' ? 'active' : ''}`}
              onClick={() => changeLanguage('bg')}
            >
              <span>Български</span>
            </div>
            <div 
              className={`language-option ${i18n.language === 'en' ? 'active' : ''}`}
              onClick={() => changeLanguage('en')}
            >
              <span>English</span>
            </div>
          </div>
        </div>

        <div className="mobile-catalog">
          <ul className="mobile-catalog-list">
            <li>
              <Link to={ROUTES.WINE}>{t('navbar.wine')}</Link>
            </li>
            <li>
              <Link to={ROUTES.STRONG}>{t('navbar.strong')}</Link>
            </li>
            <li>
              <Link to={ROUTES.LIQUOR}>{t('navbar.liquor')}</Link>
            </li>
            <li>
              <Link to={ROUTES.DRINKS}>{t('navbar.drinks')}</Link>
            </li>
            <li>
              <Link to={ROUTES.PROFILE} className="mobile-footer-item">
                <i className="fas fa-user"></i>
                <span>{t('navbar.profile')}</span>
              </Link>
            </li>
            <li>
              <Link to={ROUTES.CART} className="mobile-footer-item">
                <i className="fas fa-shopping-cart"></i>
                <span>{t('navbar.cart')}</span>
                <span className="cart-badge">0</span>
              </Link>
            </li>
            <li>
              <Link to={ROUTES.COMPARE} className="mobile-footer-item">
                <i className="fas fa-chart-bar"></i>
                <span>{t('navbar.compare')}</span>
                <span className="compare-badge">0</span>
              </Link>
            </li>
            <li>
              <Link to={ROUTES.BEER}>{t('navbar.beer')}</Link>
            </li>
            <li>
              <Link to={ROUTES.SNACKS}>{t('navbar.snacks')}</Link>
            </li>
            <li>
              <Link to={ROUTES.CONFECTIONERY}>{t('navbar.confectionery')}</Link>
            </li>
            <li>
              <Link to={ROUTES.SALES}>{t('navbar.sales')}</Link>
            </li>
            <li>
              <Link to={ROUTES.CONTACTS}>{t('navbar.contacts')}</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Компактное меню */}
      <div className={`compact-nav ${isScrolled ? "show" : ""}`}>
        <div className="top-nav">
          <div className="nav-left">
            <Link to={ROUTES.HOME} className="navbar-logo">
              ALCOMAG
            </Link>
            <div className="search-container">
              <input type="text" placeholder={t('navbar.search')} />
              <button>
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>

          <div className="nav-right">
            <a href={`tel:${PHONE_NUMBERS.KYIVSTAR}`} className="phone-number">
              <i className="fas fa-phone"></i>
              {PHONE_NUMBERS.KYIVSTAR}
            </a>
            <div className="icons-container">
              <div className="language-selector desktop">
                <button className="icon-button" disabled={isLanguageLoading}>
                  <i className={`fas ${isLanguageLoading ? 'fa-spinner fa-spin' : 'fa-globe'}`}></i>
                  {i18n.language.toUpperCase()}
                </button>
                <div className="language-dropdown">
                  <div 
                    className={`language-option ${i18n.language === 'bg' ? 'active' : ''}`}
                    onClick={() => !isLanguageLoading && changeLanguage('bg')}
                  >
                    <div className="language-content">
                      <div className="language-title">Български</div>
                      <div className="language-subtitle">{t('navbar.language')}</div>
                    </div>
                  </div>
                  <div 
                    className={`language-option ${i18n.language === 'en' ? 'active' : ''}`}
                    onClick={() => !isLanguageLoading && changeLanguage('en')}
                  >
                    <div className="language-content">
                      <div className="language-title">English</div>
                      <div className="language-subtitle">{t('navbar.language')}</div>
                    </div>
                  </div>
                </div>
              </div>
              <button className="icon-button" onClick={handleAuthClick}>
                <i className="fas fa-user"></i>
              </button>
              <button className="icon-button" onClick={onCartClick}>
                <i className="fas fa-shopping-cart"></i>
                <span className="cart-count">0</span>
              </button>
            </div>
          </div>
        </div>
        <div
          className="scroll-indicator"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Десктоп навигация */}
      <div className="nav-content">
        {/* Верхняя навигация */}
        <div className="top-nav">
          <ul className="top-menu">
            <li className="top-menu-item">
              <Link to={ROUTES.HOME}>{t('navbar.home')}</Link>
            </li>
            <li className="top-menu-item">
              <Link to={ROUTES.MANUFACTURERS}>{t('navbar.manufacturers')}</Link>
            </li>
            <li className="top-menu-item">
              <Link to={ROUTES.ABOUT}>{t('navbar.about')}</Link>
            </li>
            <li className="top-menu-item">
              <Link to={ROUTES.DELIVERY}>{t('navbar.delivery')}</Link>
            </li>
            <li className="top-menu-item">
              <Link to={ROUTES.REVIEWS}>{t('navbar.reviews')}</Link>
            </li>
            <li className="top-menu-item">
              <Link to={ROUTES.COOPERATION}>{t('navbar.cooperation')}</Link>
            </li>
            <li className="top-menu-item">
              <Link to={ROUTES.CONTACTS}>{t('navbar.contacts')}</Link>
            </li>
          </ul>
          <div className="nav-right">
            <button className="icon-button" onClick={handleAuthClick}>
              <i className="fas fa-user"></i>
              {isLoggedIn ? t('navbar.profile') : t('navbar.login')}
            </button>
          </div>
        </div>

        {/* Средняя секция */}
        <div className="top-nav">
          <div className="nav-left">
            <Link to={ROUTES.HOME} className="navbar-logo">
              ALCOMAG
            </Link>
            <div className="search-container">
              <input type="text" placeholder={t('navbar.search')} />
              <button>
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>

          <div className="nav-right">
            <a href={`tel:${PHONE_NUMBERS.KYIVSTAR}`} className="phone-number">
              <i className="fas fa-phone"></i>
              {PHONE_NUMBERS.KYIVSTAR}
            </a>
            <div className="icons-container">
              <div className="language-selector desktop">
                <button className="icon-button" disabled={isLanguageLoading}>
                  <i className={`fas ${isLanguageLoading ? 'fa-spinner fa-spin' : 'fa-globe'}`}></i>
                  {i18n.language.toUpperCase()}
                </button>
                <div className="language-dropdown">
                  <div 
                    className={`language-option ${i18n.language === 'bg' ? 'active' : ''}`}
                    onClick={() => !isLanguageLoading && changeLanguage('bg')}
                  >
                    <div className="language-content">
                      <div className="language-title">Български</div>
                      <div className="language-subtitle">{t('navbar.language')}</div>
                    </div>
                  </div>
                  <div 
                    className={`language-option ${i18n.language === 'en' ? 'active' : ''}`}
                    onClick={() => !isLanguageLoading && changeLanguage('en')}
                  >
                    <div className="language-content">
                      <div className="language-title">English</div>
                      <div className="language-subtitle">{t('navbar.language')}</div>
                    </div>
                  </div>
                </div>
              </div>
              <button className="icon-button" onClick={handleAuthClick}>
                <i className="fas fa-user"></i>
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
                <Link to={ROUTES.CATALOG}>{t('navbar.fullCatalog')}</Link>
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
                <Link to={ROUTES.SALES}><i className="fas fa-bolt"></i>{t('navbar.salesCaps')}</Link>
              </li>
            </ul>
            <div className="page-overlay"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
