import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useReviews } from '../../hooks/useReviews';
import { Loader } from 'lucide-react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ReviewModal } from '../../components/Reviews/ReviewModal';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import './ReviewsPage.css';

interface Review {
  id: number;
  author: string;
  text: string;
  rating: number;
  createdAt: string;
}

const MAX_PREVIEW_LENGTH = 150;

export const ReviewsPage: React.FC = () => {
  const { t } = useTranslation();
  const { reviews, loading, error } = useReviews();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const reviewsPerPage = 6;

  const truncateText = (text: string) => {
    if (text.length <= MAX_PREVIEW_LENGTH) return text;
    return text.substring(0, MAX_PREVIEW_LENGTH) + '...';
  };

  const handleReviewClick = (review: Review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  // Вычисляем отзывы для текущей страницы
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <span key={index}>
        {index < rating ? (
          <StarIcon className="star filled" />
        ) : (
          <StarBorderIcon className="star" />
        )}
      </span>
    ));
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="reviews-page">
        <div className="container">
          <div className="loading">
            <Loader className="animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="reviews-page">
        <div className="container error-container">
          <div className="error">
            <img
              src="/images/broken-bottle.png"
              alt={t("common.error")}
              className="broken-bottle-image"
            />
            <p className="error-message">{t("common.error")}: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reviews-page">
      <div className="breadcrumbs-container">
        <div className="content-wrapper">
          <Breadcrumbs />
          <h1 className="page-title">{t("reviews.title")}</h1>
        </div>
      </div>

      <div className="container">
        <div className="reviews-grid">
          {currentReviews.map((review) => (
            <div 
              key={review.id} 
              className="review-card"
              onClick={() => handleReviewClick(review)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleReviewClick(review);
                }
              }}
            >
              <div className="review-header">
                <h3 className="review-author">{review.author}</h3>
                <div className="review-rating">
                  {renderStars(review.rating)}
                </div>
              </div>
              <p className="review-text">{truncateText(review.text)}</p>
              <div className="review-footer">
                <span className="review-date">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}

        <ReviewModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          review={selectedReview}
        />
      </div>
    </div>
  );
}; 