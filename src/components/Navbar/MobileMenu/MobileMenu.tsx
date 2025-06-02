import React from 'react';
import Footer from '../../Footer/Footer';
import './MobileMenu.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onCartClick: () => void;
  onAuthClick: () => void;
  isLanguageMenuOpen: boolean;
  setIsLanguageMenuOpen: (open: boolean) => void;
  isLanguageLoading: boolean;
  i18n: any;
  t: any;
  changeLanguage: (lng: string) => void;
  handleNavLinkClick: (path: string) => void;
  ROUTES: any;
}

export function MobileMenu({
  isOpen,
  onClose,
  onCartClick,
  onAuthClick,
  isLanguageMenuOpen,
  setIsLanguageMenuOpen,
  isLanguageLoading,
  i18n,
  t,
  changeLanguage,
  handleNavLinkClick,
  ROUTES
}: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100vw';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className="mobile-menu-overlay" onClick={onClose}>
      <div className="mobile-menu open" onClick={e => e.stopPropagation()}>
        <div className="mobile-menu-header">
          <Link to={ROUTES.HOME} className="mobile-menu-logo" onClick={onClose}>
            TRAMONTI
          </Link>
          <button className="mobile-menu-close" onClick={onClose} aria-label="Закрыть меню">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="language-selector" onClick={() => setIsLanguageMenuOpen(true)}>
          <div className="language-icon">
            <i className={`fas ${isLanguageLoading ? 'fa-spinner fa-spin' : 'fa-globe'}`}></i>
          </div>
          <div className="language-content">
            <div className="language-title">{i18n.language === 'bg' ? 'Български' : 'English'}</div>
            <div className="language-subtitle">{t('navbar.language')}</div>
          </div>
          <i className="fas fa-chevron-right"></i>
        </div>
        <div className={`language-menu ${isLanguageMenuOpen ? 'open' : ''}`}> 
          <div className="language-menu-header">
            <button className="back-button" onClick={() => setIsLanguageMenuOpen(false)}>
              <i className="fas fa-arrow-left"></i>
              {t('navbar.back')}
            </button>
          </div>
          <div className="language-options">
            <div className={`language-option ${i18n.language === 'bg' ? 'active' : ''}`} onClick={() => !isLanguageLoading && changeLanguage('bg')}>
              <span>Български</span>
              {i18n.language === 'bg' && <i className="fas fa-check"></i>}
            </div>
            <div className={`language-option ${i18n.language === 'en' ? 'active' : ''}`} onClick={() => !isLanguageLoading && changeLanguage('en')}>
              <span>English</span>
              {i18n.language === 'en' && <i className="fas fa-check"></i>}
            </div>
          </div>
        </div>
        <div className="mobile-catalog">
          <ul className="mobile-catalog-list">
            <li><div className="mobile-catalog-item" onClick={() => handleNavLinkClick(ROUTES.WINE)}>{t('navbar.wine')}</div></li>
            <li><div className="mobile-catalog-item" onClick={() => handleNavLinkClick(ROUTES.STRONG)}>{t('navbar.strong')}</div></li>
            <li><div className="mobile-catalog-item" onClick={() => handleNavLinkClick(ROUTES.LIQUOR)}>{t('navbar.liquor')}</div></li>
            <li><div className="mobile-catalog-item" onClick={() => handleNavLinkClick(ROUTES.DRINKS)}>{t('navbar.drinks')}</div></li>
            <li><div className="mobile-footer-item" onClick={() => handleNavLinkClick(ROUTES.PROFILE)}><i className="fas fa-user"></i><span>{t('navbar.profile')}</span></div></li>
            <li><div className="mobile-footer-item" onClick={() => { onCartClick(); onClose(); }}><i className="fas fa-shopping-cart"></i><span>{t('navbar.cart')}</span><span className="cart-badge">0</span></div></li>
            <li><div className="mobile-footer-item" onClick={() => handleNavLinkClick(ROUTES.COMPARE)}><i className="fas fa-chart-bar"></i><span>{t('navbar.compare')}</span><span className="compare-badge">0</span></div></li>
            <li><div className="mobile-catalog-item" onClick={() => handleNavLinkClick(ROUTES.BEER)}>{t('navbar.beer')}</div></li>
            <li><div className="mobile-catalog-item" onClick={() => handleNavLinkClick(ROUTES.SNACKS)}>{t('navbar.snacks')}</div></li>
            <li><div className="mobile-catalog-item" onClick={() => handleNavLinkClick(ROUTES.CONFECTIONERY)}>{t('navbar.confectionery')}</div></li>
            <li><div className="mobile-catalog-item" onClick={() => handleNavLinkClick(ROUTES.SALES)}>{t('navbar.sales')}</div></li>
            <li><div className="mobile-catalog-item" onClick={() => handleNavLinkClick(ROUTES.CONTACTS)}>{t('navbar.contacts')}</div></li>
          </ul>
        </div>
        <Footer />
      </div>
    </div>
  );
} 