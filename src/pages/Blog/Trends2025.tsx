import { BlogArticle } from './BlogArticle';
import { useTranslation } from 'react-i18next';

export default function Trends2025() {
  const { t } = useTranslation();
  return (
    <BlogArticle
      title={t('blog.trends2025.title')}
      date={t('blog.trends2025.date')}
      image="/images/trends-2025.jpg"
    >
      <p>{t('blog.trends2025.content1')}</p>
      <ol>
        <li>{t('blog.trends2025.list.0')}</li>
        <li>{t('blog.trends2025.list.1')}</li>
        <li>{t('blog.trends2025.list.2')}</li>
        <li>{t('blog.trends2025.list.3')}</li>
        <li>{t('blog.trends2025.list.4')}</li>
      </ol>
      <p>{t('blog.trends2025.content2')}</p>
    </BlogArticle>
  );
} 