import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Footer.css';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const [activeSections, setActiveSections] = useState<string[]>([]);
  const currentYear = new Date().getFullYear();

  const toggleSection = (section: string) => {
    setActiveSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const isSectionActive = (section: string) => activeSections.includes(section);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className={`footer-section ${isSectionActive('catalog') ? 'active' : ''}`}>
          <h3 onClick={() => toggleSection('catalog')}>{t('footer.catalog')}</h3>
          <ul>
            <li><Link to="/wine">{t('footer.links.wine')}</Link></li>
            <li><Link to="/champagne">{t('footer.links.champagne')}</Link></li>
            <li><Link to="/cognac">{t('footer.links.cognac')}</Link></li>
            <li><Link to="/whiskey">{t('footer.links.whiskey')}</Link></li>
            <li><Link to="/vodka">{t('footer.links.vodka')}</Link></li>
            <li><Link to="/liquor">{t('footer.links.liquor')}</Link></li>
            <li><Link to="/tequila">{t('footer.links.tequila')}</Link></li>
            <li><Link to="/brandy">{t('footer.links.brandy')}</Link></li>
            <li><Link to="/beer">{t('footer.links.beer')}</Link></li>
            <li><Link to="/vermouth">{t('footer.links.vermouth')}</Link></li>
            <li><Link to="/rum">{t('footer.links.rum')}</Link></li>
          </ul>
        </div>

        <div className={`footer-section ${isSectionActive('company') ? 'active' : ''}`}>
          <h3 onClick={() => toggleSection('company')}>{t('footer.company')}</h3>
          <ul>
            <li><Link to="/about">{t('footer.links.about')}</Link></li>
            <li><Link to="/cooperation">{t('footer.links.cooperation')}</Link></li>
            <li><Link to="/rent">{t('footer.links.rent')}</Link></li>
            <li><Link to="/reviews">{t('footer.links.reviews')}</Link></li>
            <li><Link to="/licenses">{t('footer.links.licenses')}</Link></li>
            <li><Link to="/documents">{t('footer.links.documents')}</Link></li>
            <li><Link to="/requisites">{t('footer.links.requisites')}</Link></li>
            <li><Link to="/contacts">{t('footer.links.contacts')}</Link></li>
          </ul>
        </div>

        <div className={`footer-section ${isSectionActive('publications') ? 'active' : ''}`}>
          <h3 onClick={() => toggleSection('publications')}>{t('footer.publications')}</h3>
          <ul>
            <li><Link to="/sommelier">{t('footer.links.sommelier')}</Link></li>
            <li><Link to="/events">{t('footer.links.events')}</Link></li>
            <li><Link to="/articles">{t('footer.links.articles')}</Link></li>
            <li><Link to="/cocktails">{t('footer.links.cocktails')}</Link></li>
          </ul>
        </div>

        <div className={`footer-section ${isSectionActive('help') ? 'active' : ''}`}>
          <h3 onClick={() => toggleSection('help')}>{t('footer.help')}</h3>
          <ul>
            <li><Link to="/payment-delivery">{t('footer.links.payment-delivery')}</Link></li>
            <li><Link to="/return-exchange">{t('footer.links.return-exchange')}</Link></li>
            <li><Link to="/public-offer">{t('footer.links.public-offer')}</Link></li>
            <li><Link to="/privacy-policy">{t('footer.links.privacy-policy')}</Link></li>
            <li><Link to="/loyalty">{t('footer.links.loyalty')}</Link></li>
          </ul>
        </div>

        <div className="contact-section">
          <div className="contact-info">
            <a href="tel:+380979740660" className="contact-item phone">
              <i className="fas fa-phone"></i>
              +38 (097) 974-06-60
            </a>
            <a href="mailto:info@tramonti.com.ua" className="contact-item email">
              <i className="fas fa-envelope"></i>
              info@tramonti.com.ua
            </a>
            <div className="contact-item address">
              <i className="fas fa-map-marker-alt"></i>
              г. Днепр, ул. Нижнеднепровская, 1/Ж
            </div>
            <div className="working-hours">
              <p>{t('footer.workingHours.title')}</p>
              <p>{t('footer.workingHours.weekdays')}</p>
              <p>{t('footer.workingHours.weekend')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="copyright">
            <p>{currentYear} {t('footer.copyright.rights')}</p>
            <p>{t('footer.copyright.ageRestriction')}</p>
            <p>{t('footer.copyright.copyright')}</p>
            <p>{t('footer.copyright.resale')}</p>
            <p>{t('footer.copyright.warning')}</p>
          </div>
          <div className="social-payment">
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="tel:+380979740660">
                <i className="fas fa-phone"></i>
              </a>
            </div>
            <div className="payment-methods">
              <span>{t('footer.paymentMethods.cash')}</span>
              <span>{t('footer.paymentMethods.mastercard')}</span>
              <span>{t('footer.paymentMethods.visa')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 