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
import { ReviewForm } from '../../components/Reviews/ReviewForm';
import { useAuthAndReviewModal } from '../../hooks/useAuthAndReviewModal';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface Review {
  id: number;
  author: string;
  text: string;
  rating: number;
  createdAt: string;
  photo?: string | null;
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
  const reviewsPerPage = 5;
  const {
    user,
    isReviewFormOpen,
    openReviewModalWithAuth,
    closeReviewModal
  } = useAuthAndReviewModal();

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

  const handleReviewFormSubmit = async (formData: {
    name: string;
    email: string;
    message: string;
    file: File | null;
    rating: number;
  }) => {
    try {
      const loadingToast = toast.loading(t('reviews.submitting'));
      const form = new FormData();
      form.append('name', formData.name.trim());
      form.append('email', formData.email.trim());
      form.append('message', formData.message.trim());
      form.append('rating', formData.rating.toString());
      if (formData.file) form.append('file', formData.file);
      const response = await fetch('http://localhost:3001/api/reviews', {
        method: 'POST',
        credentials: 'include',
        body: form
      });
      if (!response.ok) throw new Error('Ошибка отправки');
      toast.success(t('reviews.submitSuccess'), { id: loadingToast, duration: 3000 });
      await fetchReviews();
    } catch (error) {
      toast.error(t('reviews.submitError'), { duration: 4000 });
    }
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
      <div className="reviews-header-bar">
        <div className="reviews-header-main">
          <h1 className="page-title">{t("reviews.title")}</h1>
          <button
            className="leave-review-btn-main"
            onClick={openReviewModalWithAuth}
          >
            {t('reviews.leaveReview')}
          </button>
        </div>
        <hr className="reviews-header-divider" />
      </div>
      <div className="reviews-layout reviews-layout-grid">
        <div className="reviews-main-content" style={{ gridColumn: '1 / -1' }}>
          <div className="container">
            <div className="reviews-grid">
              {currentReviews.map((review) => (
                <div key={review.id} style={{display: 'flex', alignItems: 'center'}}>
                  <div className="review-avatar desktop-only">
                    {(review as any).photo ? (
                      <img src={(review as any).photo} alt={review.author} className="avatar-img" />
                    ) : (
                      <AccountCircleIcon style={{ fontSize: 44, color: '#c1c1c1' }} />
                    )}
                  </div>
                  <div 
                    className="review-card"
                    onClick={() => handleReviewClick(review)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleReviewClick(review);
                      }
                    }}
                    style={{position: 'relative', flex: 1}}
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
                </div>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="pagination-button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ‹
                </button>
                <div className="pagination-current-red">{currentPage}</div>
                <button
                  className="pagination-button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  ›
                </button>
              </div>
            )}
            <ReviewModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              review={selectedReview}
            />
            <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
              <div className="modal-confirm-text">
                {t('reviews.deleteConfirm', 'Вы уверены, что хотите удалить этот отзыв?')}
              </div>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end' }}>
                <button className="cancel-btn" onClick={() => setDeleteModalOpen(false)}>{t('common.cancel')}</button>
                <button className="submit-btn" onClick={handleDeleteConfirm}>{t('common.delete', 'Удалить')}</button>
              </div>
            </Modal>
            {isReviewFormOpen && (
              <Modal isOpen={isReviewFormOpen} onClose={closeReviewModal}>
                <ReviewForm
                  onSubmit={handleReviewFormSubmit}
                  onClose={closeReviewModal}
                  userData={user}
                />
              </Modal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 