import React from 'react';
import { useTranslation } from 'react-i18next';
import './ArticlePage.css';

const WineAndChocolate: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="article-page">
      <h1 className="article-main-title">{t('article.wine_and_chocolate.title')}</h1>
      <div className="article-header-flex">
        <img src="/images/f0npxgt2j198vhcc6iyzlokeblismj5h.jpg" alt="Wine and Chocolate" className="article-main-image" />
        <div className="article-header-content">
          <div className="article-date">26 сентября 2020</div>
          <p>{t('article.wine_and_chocolate.desc')}</p>
        </div>
      </div>
      <h2>{t('article.wine_and_chocolate.intro_title')}</h2>
      <p>{t('article.wine_and_chocolate.intro')}</p>
      <h2>{t('article.wine_and_chocolate.pairing_title')}</h2>
      <ul>
        <li>{t('article.wine_and_chocolate.pair1')}</li>
        <li>{t('article.wine_and_chocolate.pair2')}</li>
        <li>{t('article.wine_and_chocolate.pair3')}</li>
      </ul>
      <h2>{t('article.wine_and_chocolate.tips_title')}</h2>
      <p>{t('article.wine_and_chocolate.tips')}</p>
      <h2>{t('article.wine_and_chocolate.conclusion_title')}</h2>
      <p>{t('article.wine_and_chocolate.conclusion')}</p>
    </div>
  );
};
export default WineAndChocolate; 