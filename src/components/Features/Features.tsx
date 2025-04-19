import React from "react";
import { useTranslation } from 'react-i18next';
import "./Features.css";

const Features: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="features">
      <div className="features-container">
        <div className="feature-item">
          <div className="feature-icon">
            <i className="fas fa-certificate"></i>
          </div>
          <div className="feature-content">
            <h3>{t('features.guaranteed.title')}</h3>
            <p>{t('features.guaranteed.description')}</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-icon">
            <i className="fas fa-truck"></i>
          </div>
          <div className="feature-content">
            <h3>{t('features.fastDelivery.title')}</h3>
            <p>{t('features.fastDelivery.description')}</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-icon">
            <i className="fas fa-headset"></i>
          </div>
          <div className="feature-content">
            <h3>{t('features.feedback.title')}</h3>
            <p>{t('features.feedback.description')}</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-icon">
            <i className="fas fa-wine-bottle"></i>
          </div>
          <div className="feature-content">
            <h3>{t('features.import.title')}</h3>
            <p>{t('features.import.description')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
