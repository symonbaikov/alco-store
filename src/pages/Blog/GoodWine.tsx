import React from 'react';
import { BlogArticle } from './BlogArticle';
import { useTranslation } from 'react-i18next';

export default function GoodWine() {
  const { t } = useTranslation();
  return (
    <BlogArticle
      title={t('blog.goodWine.title')}
      date={t('blog.goodWine.date')}
      image="/images/Good-wine.jpg"
    >
      <p>{t('blog.goodWine.content1')}</p>
      <p>{t('blog.goodWine.content2')}</p>
      <ul>
        <li>{t('blog.goodWine.list.0')}</li>
        <li>{t('blog.goodWine.list.1')}</li>
        <li>{t('blog.goodWine.list.2')}</li>
        <li>{t('blog.goodWine.list.3')}</li>
        <li>{t('blog.goodWine.list.4')}</li>
      </ul>
      <p>{t('blog.goodWine.content3')}</p>
    </BlogArticle>
  );
} 