import React from 'react';
import { useTranslation } from 'react-i18next';
import './ArticlePage.css';

const JohnnieWalker: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="article-page">
      <h1 className="article-main-title">{t('article.johnnie_walker.title')}</h1>
      <div className="article-header-flex">
        <img src="/images/a7svkjdjilymj8d3gbw4syso5w1k9vcb.jpg" alt="Johnnie Walker" className="article-main-image" />
        <div className="article-header-content">
          <div className="article-date">14 января 2021</div>
          <p>{t('article.johnnie_walker.desc')}</p>
        </div>
      </div>
      <h2>{t('article.johnnie_walker.history_title')}</h2>
      <p>{t('article.johnnie_walker.history')}</p>
      <h2>{t('article.johnnie_walker.legacy_title')}</h2>
      <p>{t('article.johnnie_walker.legacy')}</p>
      <h2>{t('article.johnnie_walker.facts_title')}</h2>
      <ul>
        <li>{t('article.johnnie_walker.fact1')}</li>
        <li>{t('article.johnnie_walker.fact2')}</li>
        <li>{t('article.johnnie_walker.fact3')}</li>
      </ul>
      <h2>{t('article.johnnie_walker.conclusion_title')}</h2>
      <p>{t('article.johnnie_walker.conclusion')}</p>
    </div>
  );
};
export default JohnnieWalker; 