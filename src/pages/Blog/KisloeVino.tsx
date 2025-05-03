import { BlogArticle } from './BlogArticle';
import { useTranslation } from 'react-i18next';

export default function KisloeVino() {
  const { t } = useTranslation();
  return (
    <BlogArticle
      title={t('blog.kisloeVino.title')}
      date={t('blog.kisloeVino.date')}
      image="/images/wine.jpg"
    >
      <p>{t('blog.kisloeVino.content1')}</p>
      <ol>
        <li>{t('blog.kisloeVino.list.0')}</li>
        <li>{t('blog.kisloeVino.list.1')}</li>
        <li>{t('blog.kisloeVino.list.2')}</li>
        <li>{t('blog.kisloeVino.list.3')}</li>
        <li>{t('blog.kisloeVino.list.4')}</li>
      </ol>
      <p>{t('blog.kisloeVino.content2')}</p>
    </BlogArticle>
  );
} 