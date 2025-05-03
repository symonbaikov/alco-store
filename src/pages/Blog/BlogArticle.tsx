import React from 'react';
import './BlogArticle.css';

interface BlogArticleProps {
  title: string;
  date: string;
  image: string;
  children: React.ReactNode;
}

export const BlogArticle: React.FC<BlogArticleProps> = ({ title, date, image, children }) => (
  <section className="blog-article-section">
    <div className="container">
      <h1 className="blog-article-title">{title}</h1>
      <div className="blog-article-date">{date}</div>
      <div className="blog-article-image-wrapper">
        <img src={image} alt={title} className="blog-article-image" />
      </div>
      <div className="blog-article-content">
        {children}
      </div>
    </div>
  </section>
); 