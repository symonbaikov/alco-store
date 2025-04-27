import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Reviews.css';

interface Review {
  id: number;
  author: string;
  text: string;
  rating: number;
}

export const Reviews: React.FC = () => {
  const { t } = useTranslation();
  const [currentReview, setCurrentReview] = useState(0);

  const reviews: Review[] = [
    {
      id: 1,
      author: "Александр",
      text: "Очень доволен сотрудничеством с магазином! Оперативно созвонились, уточнили. Заказ получил на следующий день. Упаковка супер. Успехов и процветания.",
      rating: 5
    },
    {
        id: 2,
        author: "Александр",
        text: "Очень доволен сотрудничеством с магазином! Оперативно созвонились, уточнили. Заказ получил на следующий день. Упаковка супер. Успехов и процветания.",
        rating: 4
      },
    // Add more reviews as needed
  ];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  return (
    <section className="reviews-section">
      <div className="container">
        <div className="reviews-header">
          <h2>{t('reviews.title', 'О нас пишут')}</h2>
          <button className="leave-review-btn">
            {t('reviews.leaveReview', 'ОСТАВИТЬ ОТЗЫВ')}
          </button>
        </div>

        <div className="reviews-slider">
          <button 
            className="slider-arrow prev"
            onClick={() => setCurrentReview(prev => prev > 0 ? prev - 1 : reviews.length - 1)}
          >
            ‹
          </button>

          <div className="review-card">
            <div className="rating">
              {renderStars(reviews[currentReview].rating)}
            </div>
            <h3 className="review-author">{reviews[currentReview].author}</h3>
            <p className="review-text">{reviews[currentReview].text}</p>
          </div>

          <button 
            className="slider-arrow next"
            onClick={() => setCurrentReview(prev => (prev + 1) % reviews.length)}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};