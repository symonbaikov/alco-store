import React from 'react';
import { useTranslation } from 'react-i18next';
import './BulgarianShowcase.css';

const BulgarianShowcase: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="bulgarian-showcase">
      <div className="bulgarian-showcase__container">
        <div className="bulgarian-showcase__content">
          <div className="bulgarian-showcase__label">{t('bulgarianShowcase.label')}</div>
          <h2 className="bulgarian-showcase__title">
            {t('bulgarianShowcase.title')}
          </h2>
          <p className="bulgarian-showcase__desc">
            {t('bulgarianShowcase.desc')}
          </p>
          <button className="bulgarian-showcase__button">
            {t('bulgarianShowcase.button')}
          </button>
        </div>
        <div className="bulgarian-showcase__image-wrapper">
          <img src="/images/880o7ikcklnlil10heao4xv7l2dkz7qd.png" alt="Българско вино" className="bulgarian-showcase__image" />
        </div>
      </div>
    </section>
  );
};

export default BulgarianShowcase; 