import React from 'react';
import './Blog.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Blog: React.FC = () => {
  const { t } = useTranslation();
  const blogPosts = [
    {
      id: 1,
      title: t('blog.cards.trends2025.title'),
      date: t('blog.cards.trends2025.date'),
      image: '/images/trends-2025.jpg',
      link: '/blog/5-trendov-2025',
    },
    {
      id: 2,
      title: t('blog.cards.goodWine.title'),
      date: t('blog.cards.goodWine.date'),
      image: '/images/Good-wine.jpg',
      link: '/blog/skolko-dolzhno-stoit-vino',
    },
    {
      id: 3,
      title: t('blog.cards.kisloeVino.title'),
      date: t('blog.cards.kisloeVino.date'),
      image: '/images/wine.jpg',
      link: '/blog/kak-polyubit-kisloe-vino',
    },
    {
      id: 4,
      title: t('blog.cards.autohtonnieSorta.title'),
      date: t('blog.cards.autohtonnieSorta.date'),
      image: '/images/zg292c6yc7wsdt7uxyukv8klc6yxhvms.jpg',
      link: '/blog/autohtonnie-sorta',
    },
  ];
  return (
    <section className="blog-section">
      <div className="container">
        <h2 className="blog-title">{t('blog.title')}</h2>
        <div className="blog-list">
          {blogPosts.map(post => (
            <Link className="blog-card" to={post.link} key={post.id}>
              <div className="blog-card-image-wrapper">
                <img src={post.image} alt={post.title} className="blog-card-image" />
              </div>
              <div className="blog-card-content">
                <div className="blog-card-date">{post.date}</div>
                <div className="blog-card-title">{post.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}; 