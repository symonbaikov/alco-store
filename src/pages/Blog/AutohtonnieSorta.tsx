import React from 'react';
import { BlogArticle } from './BlogArticle';
import { useTranslation } from 'react-i18next';

export default function AutohtonnieSorta() {
  const { t } = useTranslation();
  return (
    <BlogArticle
      title={t('blog.autohtonnieSorta.title')}
      date={t('blog.autohtonnieSorta.date')}
      image="/images/zg292c6yc7wsdt7uxyukv8klc6yxhvms.jpg"
    >
      <p>{t('blog.autohtonnieSorta.content1')}</p>
      <p>{t('blog.autohtonnieSorta.content2')}</p>
      <ul>
        <li>{t('blog.autohtonnieSorta.list.0')}</li>
        <li>{t('blog.autohtonnieSorta.list.1')}</li>
        <li>{t('blog.autohtonnieSorta.list.2')}</li>
        <li>{t('blog.autohtonnieSorta.list.3')}</li>
      </ul>
      <p>{t('blog.autohtonnieSorta.content3')}</p>
    </BlogArticle>
  );
} 