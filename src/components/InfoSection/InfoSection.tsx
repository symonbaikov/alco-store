import React from 'react';
import { useTranslation } from 'react-i18next';
import './InfoSection.css';

const InfoSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="info-section">
      <h2 className="info-section-title">{t('info.title')}</h2>
      <div className="info-section-subtitle">{t('info.subtitle')}</div>
      <div className="info-section-content">
        <p>{t('info.p1')}</p>
        <p>{t('info.p2')}</p>
        <p>{t('info.p3')}</p>
        <p>{t('info.p4')}</p>
        <p>{t('info.p5')}</p>
        <p>{t('info.p6')}</p>
        <p>{t('info.p7')}</p>
        <p>{t('info.p8')}</p>
        <h3 className="info-section-h3">{t('info.how_title')}</h3>
        <p>{t('info.how_p1')}</p>
        <p>{t('info.how_p2')}</p>
        <p>{t('info.how_p3')}</p>
        <p>{t('info.how_p4')}</p>
      </div>
    </section>
  );
};
export default InfoSection; 