import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useReviews } from '../../hooks/useReviews';
import { Loader } from 'lucide-react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';   
import { ReviewModal } from '../../components/Reviews/ReviewModal';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Modal from '../../components/Modal/Modal';
import { useAuthContext } from '../../context/AuthContext';
import './ReviewsPage.css';
import toast from 'react-hot-toast';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface Review {
  id: number;
  author: string;
  text: string;
  rating: number;
  createdAt: string;
}

const MAX_PREVIEW_LENGTH = 150;

export const ReviewsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { reviews, loading, error, fetchReviews } = useReviews();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<Review | null>(null);
  const { user } = useAuthContext();
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

  const handleDeleteClick = (review: Review) => {
    setReviewToDelete(review);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!reviewToDelete) return;
    try {
      const response = await fetch(`http://localhost:3001/api/reviews/${reviewToDelete.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Ошибка удаления');
      localStorage.removeItem('reviews_cache');
      await fetchReviews();
      // Показываем мультиязычный тост
      const lang = i18n.language;
      if (lang === 'bg') {
        toast.success('Отзивът беше успешно изтрит!');
      } else {
        toast.success('Review deleted successfully!');
      }
    } catch (e) {
      alert('Ошибка удаления отзыва');
    } finally {
      setDeleteModalOpen(false);
      setReviewToDelete(null);
    }
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
              style={{position: 'relative'}}
            >
              {user?.role === 'ADMIN' && (
                <div className="review-delete-btn-wrapper">
                  <button
                    className="delete-review-btn"
                    onClick={e => { e.stopPropagation(); handleDeleteClick(review); }}
                    aria-label={t('reviews.delete')}
                  >
                    <DeleteOutlineIcon style={{color: '#8b0000', fontSize: 24}} />
                  </button>
                </div>
              )}
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
        <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
          <div style={{padding: 32, minWidth: 320, textAlign: 'center', borderRadius: 12, background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.10)'}}>
            <WarningAmberIcon style={{color: '#d32f2f', fontSize: 48, marginBottom: 12}} />
            <p className="modal-confirm-text" style={{marginBottom: 32}}>
              {t('reviews.confirmDelete', i18n.language === 'bg' ? 'Наистина ли искате да изтриете този отзив?' : 'Are you sure you want to delete this review?')}
            </p>
            <div style={{display: 'flex', justifyContent: 'center', gap: 16}}>
              <button
                onClick={handleDeleteConfirm}
                style={{
                  background: '#d32f2f', color: 'white', border: 'none', padding: '12px 32px', borderRadius: 6, fontWeight: 600, fontSize: 16, display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 2px 8px rgba(211,47,47,0.08)', transition: 'background 0.2s', cursor: 'pointer'
                }}
              >
                <DeleteOutlineIcon style={{fontSize: 22}} />
                {i18n.language === 'bg' ? 'Да, изтрий' : 'Yes, delete'}
              </button>
              <button
                onClick={() => setDeleteModalOpen(false)}
                style={{
                  background: '#f5f5f5', color: '#333', border: 'none', padding: '12px 32px', borderRadius: 6, fontWeight: 500, fontSize: 16, transition: 'background 0.2s', cursor: 'pointer'
                }}
              >
                {i18n.language === 'bg' ? 'Не' : 'No'}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}; 