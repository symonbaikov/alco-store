import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useReviews } from '../../hooks/useReviews';
import ChatIcon from '@mui/icons-material/ChatOutlined';
import { Loader } from 'lucide-react';
import './Reviews.css';

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
          <div className="loading"><Loader /></div>
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
              src="/images/broken-bottle.png"
              alt={t('common.error')}
              className="broken-bottle-image"
            />
            <p className="error-message">{t('common.error')}: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!reviews.length) {
    return (
      <section className="reviews-section">
        <div className="container">
          <div className="no-reviews">{t('reviews.noReviews')}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="reviews-section">
      <div className="container">
        <div className="reviews-header">
          <h2 className='reviews-title'>{t('reviews.title')}</h2>
          <div className="reviews-actions">
            <a href="#" className="leave-review-link">
              <ChatIcon className="chat-icon-btn" />
              {t('reviews.leaveReview')}
            </a>
            <a href="/reviews" className="all-reviews-link">
              {t('reviews.allReviews')}
            </a>
          </div>
        </div>

        <div className="reviews-slider">
          <button 
            className="slider-arrow prev"
            onClick={() => setCurrentReview(prev => prev > 0 ? prev - 1 : reviews.length - 1)}
            aria-label={t('reviews.previous')}
          >
            ‹
          </button>

          <div className="review-card" role="article">
            <div className="rating" aria-label={`${t('reviews.rating')}: ${reviews[currentReview].rating}/5`}>
              {renderStars(reviews[currentReview].rating)}
            </div>
            <h3 className="review-author">{reviews[currentReview].author}</h3>
            <p className="review-text">{reviews[currentReview].text}</p>
          </div>

          <button 
            className="slider-arrow next"
            onClick={() => setCurrentReview(prev => (prev + 1) % reviews.length)}
            aria-label={t('reviews.next')}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};