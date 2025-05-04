import React from 'react';
import { useTranslation } from 'react-i18next';
import './ArticlePage.css';

const Kvint: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="article-page">
      <h1 className="article-main-title">{t('article.kvint.title')}</h1>
      <div className="article-header-flex">
        <img src="/images/5cv4mhwhzjwq02m6449mgqlu05g65e0p.jpg" alt="Kvint" className="article-main-image" />
        <div className="article-header-content">
          <div className="article-date">22 сентября 2020</div>
          <p>{t('article.kvint.desc')}</p>
        </div>
      </div>
      <h2>{t('article.kvint.intro_title')}</h2>
      <p>{t('article.kvint.intro')}</p>
      <h2>{t('article.kvint.production_title')}</h2>
      <p>{t('article.kvint.production')}</p>
      <h2>{t('article.kvint.varieties_title')}</h2>
      <ul>
        <li>{t('article.kvint.variety1')}</li>
        <li>{t('article.kvint.variety2')}</li>
        <li>{t('article.kvint.variety3')}</li>
      </ul>
      <h2>{t('article.kvint.conclusion_title')}</h2>
      <p>{t('article.kvint.conclusion')}</p>
    </div>
  );
};
export default Kvint; 