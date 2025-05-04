import React from 'react';
import { useTranslation } from 'react-i18next';
import './ArticlePage.css';

const MerlotVsCabernet: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="article-page">
      <h1 className="article-main-title">{t('article.merlot_vs_cabernet.title')}</h1>
      <div className="article-header-flex">
        <img src="/images/q09x5tclzqv9yhc5c5ow1kr943sw1yeu.jpg" alt="Merlot vs Cabernet" className="article-main-image" />
        <div className="article-header-content">
          <div className="article-date">30 сентября 2020</div>
          <p>{t('article.merlot_vs_cabernet.desc')}</p>
        </div>
      </div>
      <h2>{t('article.merlot_vs_cabernet.intro_title')}</h2>
      <p>{t('article.merlot_vs_cabernet.intro')}</p>
      <h2>{t('article.merlot_vs_cabernet.taste_title')}</h2>
      <p>{t('article.merlot_vs_cabernet.taste')}</p>
      <h2>{t('article.merlot_vs_cabernet.aroma_title')}</h2>
      <p>{t('article.merlot_vs_cabernet.aroma')}</p>
      <h2>{t('article.merlot_vs_cabernet.food_title')}</h2>
      <ul>
        <li>{t('article.merlot_vs_cabernet.food1')}</li>
        <li>{t('article.merlot_vs_cabernet.food2')}</li>
        <li>{t('article.merlot_vs_cabernet.food3')}</li>
      </ul>
      <h2>{t('article.merlot_vs_cabernet.conclusion_title')}</h2>
      <p>{t('article.merlot_vs_cabernet.conclusion')}</p>
    </div>
  );
};
export default MerlotVsCabernet; 