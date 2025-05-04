import React, { useEffect, useState } from 'react';
import './Blog.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Blog: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/blogs')
      .then(res => res.json())
      .then(data => {
        setBlogPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [i18n.language]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <section className="blog-section">
      <div className="container">
        <h2 className="blog-title">{t('blog.title')}</h2>
        <div className="blog-list">
          {blogPosts.map(post => (
            <Link className="blog-card" to={post.link} key={post.id}>
              <div className="blog-card-image-wrapper">
                <img src={post.image} alt={t(`blog.cards.${post.slug}.title`)} className="blog-card-image" />
              </div>
              <div className="blog-card-content">
                <div className="blog-card-date">
                  {t(`blog.cards.${post.slug}.date`).startsWith('blog.cards.')
                    ? new Date(post.date).toLocaleDateString()
                    : t(`blog.cards.${post.slug}.date`)}
                </div>
                <div className="blog-card-title">
                  {t(`blog.cards.${post.slug}.title`).startsWith('blog.cards.')
                    ? post.title
                    : t(`blog.cards.${post.slug}.title`)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}; 