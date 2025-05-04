import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { ROUTES, PHONE_NUMBERS } from "../../../server/config/routes";
import { useAuthContext } from "../../context/AuthContext";
import "./Navbar.css";
import Catalog from "../Catalog/Catalog";

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

  const changeLanguage = async (lng: string) => {
    try {
      setIsLanguageLoading(true);
      
      // Сохраняем выбранный язык в localStorage перед изменением
      localStorage.setItem('i18nextLng', lng);
      
      await i18n.changeLanguage(lng);
      
      setIsLanguageMenuOpen(false);
      handleMobileMenuClose();
      
      // Перезагружаем страницу для применения изменений
      window.location.reload();
    } catch (error) {
      setIsLanguageLoading(false);
    }
  };

  const handleAuthClick = () => {
    if (isLoggedIn) {
      navigate(ROUTES.PROFILE);
    } else {
      onAuthClick();
    }
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
    setIsLanguageMenuOpen(false);
  };

  const handleNavLinkClick = (path: string) => {
    navigate(path);
    handleMobileMenuClose();
  };

  const handlePhoneModalOpen = () => {
    setIsPhoneModalOpen(true);
    handleMobileMenuClose();
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    handleMobileMenuClose();
  };

  const handleAuthButtonClick = () => {
    if (isLoggedIn) {
      navigate(ROUTES.PROFILE);
    } else {
      onAuthClick();
    }
    handleMobileMenuClose();
  };

  const handleCartButtonClick = () => {
    onCartClick();
    handleMobileMenuClose();
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
        <Link to={ROUTES.HOME} className="navbar-logo" onClick={handleMobileMenuClose}>
          TRAMONTI
        </Link>
        <div className="mobile-icons">
          <button
            className="icon-button"
            onClick={handlePhoneModalOpen}
          >
            <i className="fas fa-phone"></i>
          </button>
          <button
            className="icon-button"
            onClick={handleSearchToggle}
          >
            <i className="fas fa-search"></i>
          </button>
          <button 
            className="icon-button profile-icon" 
            onClick={handleAuthButtonClick}
            title={isLoggedIn ? t('navbar.profile') : t('navbar.login')}
          >
            <i className="fas fa-user"></i>
          </button>
          <button 
            className="icon-button cart-icon" 
            onClick={handleCartButtonClick}
          >
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
            <i className={`fas ${isLanguageLoading ? 'fa-spinner fa-spin' : 'fa-globe'}`}></i>
          </div>
          <div className="language-content">
            <div className="language-title">{i18n.language === 'bg' ? 'Български' : 'English'}</div>
            <div className="language-subtitle">{t('navbar.language')}</div>
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
              onClick={() => !isLanguageLoading && changeLanguage('bg')}
            >
              <span>Български</span>
              {i18n.language === 'bg' && <i className="fas fa-check"></i>}
            </div>
            <div 
              className={`language-option ${i18n.language === 'en' ? 'active' : ''}`}
              onClick={() => !isLanguageLoading && changeLanguage('en')}
            >
              <span>English</span>
              {i18n.language === 'en' && <i className="fas fa-check"></i>}
            </div>
          </div>
        </div>

        <div className="mobile-catalog">
          <ul className="mobile-catalog-list">
            <li>
              <div className="mobile-catalog-item" onClick={() => handleNavLinkClick(ROUTES.WINE)}>{t('navbar.wine')}</div>
            </li>
            <li>
              <div className="mobile-catalog-item" onClick={() => handleNavLinkClick(ROUTES.STRONG)}>{t('navbar.strong')}</div>
            </li>
            <li>
              <div className="mobile-catalog-item" onClick={() => handleNavLinkClick(ROUTES.LIQUOR)}>{t('navbar.liquor')}</div>
            </li>
            <li>
              <div className="mobile-catalog-item" onClick={() => handleNavLinkClick(ROUTES.DRINKS)}>{t('navbar.drinks')}</div>
            </li>
            <li>
              <div className="mobile-footer-item" onClick={() => handleNavLinkClick(ROUTES.PROFILE)}>
                <i className="fas fa-user"></i>
                <span>{t('navbar.profile')}</span>
              </div>
            </li>
            <li>
              <div className="mobile-footer-item" onClick={() => { onCartClick(); handleMobileMenuClose(); }}>
                <i className="fas fa-shopping-cart"></i>
                <span>{t('navbar.cart')}</span>
                <span className="cart-badge">0</span>
              </div>
            </li>
            <li>
              <div className="mobile-footer-item" onClick={() => handleNavLinkClick(ROUTES.COMPARE)}>
                <i className="fas fa-chart-bar"></i>
                <span>{t('navbar.compare')}</span>
                <span className="compare-badge">0</span>
              </div>
            </li>
            <li>
              <div className="mobile-catalog-item" onClick={() => handleNavLinkClick(ROUTES.BEER)}>{t('navbar.beer')}</div>
            </li>
            <li>
              <div className="mobile-catalog-item" onClick={() => handleNavLinkClick(ROUTES.SNACKS)}>{t('navbar.snacks')}</div>
            </li>
            <li>
              <div className="mobile-catalog-item" onClick={() => handleNavLinkClick(ROUTES.CONFECTIONERY)}>{t('navbar.confectionery')}</div>
            </li>
            <li>
              <div className="mobile-catalog-item" onClick={() => handleNavLinkClick(ROUTES.SALES)}>{t('navbar.sales')}</div>
            </li>
            <li>
              <div className="mobile-catalog-item" onClick={() => handleNavLinkClick(ROUTES.CONTACTS)}>{t('navbar.contacts')}</div>
            </li>
          </ul>
        </div>
      </div>

      {/* Компактное меню */}
      <div className={`compact-nav ${isScrolled ? "show" : ""}`}>
        <div className="top-nav">
          <div className="nav-left">
            <Link to={ROUTES.HOME} className="navbar-logo">
              TRAMONTI
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
                    data-language="bg"
                  >
                    <div className="language-content">
                      <div className="language-title">Български</div>
                      <div className="language-subtitle">{t('navbar.language')}</div>
                    </div>
                  </div>
                  <div 
                    className={`language-option ${i18n.language === 'en' ? 'active' : ''}`}
                    onClick={() => !isLanguageLoading && changeLanguage('en')}
                    data-language="en"
                  >
                    <div className="language-content">
                      <div className="language-title">English</div>
                      <div className="language-subtitle">{t('navbar.language')}</div>
                    </div>
                  </div>
                </div>
              </div>
              <Link to={ROUTES.COMPARE} className="icon-button">
                <i className="fas fa-chart-bar"></i>
                <span className="compare-count">0</span>
              </Link>
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
              TRAMONTI
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
                    data-language="bg"
                  >
                    <div className="language-content">
                      <div className="language-title">Български</div>
                      <div className="language-subtitle">{t('navbar.language')}</div>
                    </div>
                  </div>
                  <div 
                    className={`language-option ${i18n.language === 'en' ? 'active' : ''}`}
                    onClick={() => !isLanguageLoading && changeLanguage('en')}
                    data-language="en"
                  >
                    <div className="language-content">
                      <div className="language-title">English</div>
                      <div className="language-subtitle">{t('navbar.language')}</div>
                    </div>
                  </div>
                </div>
              </div>
              <Link to={ROUTES.COMPARE} className="icon-button">
                <i className="fas fa-chart-bar"></i>
                <span className="compare-count">0</span>
              </Link>
              <button className="icon-button" onClick={onCartClick}>
                <i className="fas fa-shopping-cart"></i>
                <span className="cart-count">0</span>
              </button>
            </div>
          </div>
        </div>

        {/* Нижняя навигация */}
        <Catalog />
      </div>
    </nav>
  );
};

export default Navbar;
