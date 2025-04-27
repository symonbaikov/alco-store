import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useReviews } from '../../hooks/useReviews';
import './Reviews.css';
import brokenBottleImage from '../../../public/images/broken-bottle.png'; // Ensure the file exists with this extension

export const Reviews: React.FC = () => {
  const { t } = useTranslation();
  const [currentReview, setCurrentReview] = useState(0);
  const { reviews, loading, error } = useReviews();

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  if (loading) {
    return (
      <section className="reviews-section">
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="reviews-section">
        <div className="container error-container">
          <div className="error">
            <img 
              src={brokenBottleImage} 
              alt="Error occurred" 
              className="broken-bottle-image"
            />
            <p className="error-message">{t('common.error', 'Ошибка')}: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!reviews.length) {
    return (
      <section className="reviews-section">
        <div className="container">
          <div className="no-reviews">{t('reviews.noReviews', 'Нет отзывов')}</div>
        </div>
      </section>
    );
  }

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