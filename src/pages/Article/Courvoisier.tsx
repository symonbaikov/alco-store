import React from 'react';
import { useTranslation } from 'react-i18next';
import './ArticlePage.css';

const Courvoisier: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="article-page">
      <h1 className="article-main-title">{t('article.courvoisier.title')}</h1>
      <div className="article-header-flex">
        <img src="/images/1oxjo496yfmiyc4wih6micguzx0joddr.jpg" alt="Courvoisier" className="article-main-image" />
        <div className="article-header-content">
          <div className="article-date">24 сентября 2020</div>
          <p>{t('article.courvoisier.desc')}</p>
        </div>
      </div>
      <h2>{t('article.courvoisier.intro_title')}</h2>
      <p>{t('article.courvoisier.intro')}</p>
      <h2>{t('article.courvoisier.varieties_title')}</h2>
      <ul>
        <li>{t('article.courvoisier.variety1')}</li>
        <li>{t('article.courvoisier.variety2')}</li>
        <li>{t('article.courvoisier.variety3')}</li>
      </ul>
      <h2>{t('article.courvoisier.facts_title')}</h2>
      <p>{t('article.courvoisier.facts')}</p>
      <h2>{t('article.courvoisier.conclusion_title')}</h2>
      <p>{t('article.courvoisier.conclusion')}</p>
    </div>
  );
};
export default Courvoisier; 