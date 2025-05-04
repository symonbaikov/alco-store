import React from 'react';
import './Article.css';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export interface ArticleCardProps {
  id: string;
  title: string;
  date: string;
  image: string;
  description: string;
}

const articles: ArticleCardProps[] = [
  {
    id: 'johnnie-walker',
    title: 'article.johnnie_walker.title',
    date: '14 января 2021',
    image: '/images/a7svkjdjilymj8d3gbw4syso5w1k9vcb.jpg',
    description: 'article.johnnie_walker.desc',
  },
  {
    id: 'merlot-vs-cabernet',
    title: 'article.merlot_vs_cabernet.title',
    date: '30 сентября 2020',
    image: '/images/q09x5tclzqv9yhc5c5ow1kr943sw1yeu.jpg',
    description: 'article.merlot_vs_cabernet.desc',
  },
  {
    id: 'wine-and-chocolate',
    title: 'article.wine_and_chocolate.title',
    date: '26 сентября 2020',
    image: '/images/f0npxgt2j198vhcc6iyzlokeblismj5h.jpg',
    description: 'article.wine_and_chocolate.desc',
  },
  {
    id: 'courvoisier',
    title: 'article.courvoisier.title',
    date: '24 сентября 2020',
    image: '/images/1oxjo496yfmiyc4wih6micguzx0joddr.jpg',
    description: 'article.courvoisier.desc',
  },
  {
    id: 'kvint',
    title: 'article.kvint.title',
    date: '22 сентября 2020',
    image: '/images/5cv4mhwhzjwq02m6449mgqlu05g65e0p.jpg',
    description: 'article.kvint.desc',
  },
];

const ArticleCard: React.FC<ArticleCardProps> = ({ id, title, date, image, description }) => {
  const { t } = useTranslation();
  return (
    <div className="article-card">
      <Link to={`/article/${id}`}>
        <img src={image} alt={title} className="article-image" />
        <div className="article-info">
          <div className="article-date">{date}</div>
          <div className="article-title">{t(title)}</div>
          <div className="article-desc">{t(description)}</div>
        </div>
      </Link>
    </div>
  );
};

export const ArticleList: React.FC = () => (
  <div className="articles-wrapper">
    {articles.map(article => (
      <ArticleCard key={article.id} {...article} />
    ))}
  </div>
);

export default ArticleList; 