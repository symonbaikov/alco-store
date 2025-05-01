// /Users/symonbaikov/Projects/alco-store/src/components/Reviews/Reviews.tsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useReviews } from "../../hooks/useReviews";
import ChatIcon from "@mui/icons-material/ChatOutlined";
import { Loader } from "lucide-react";
import Modal from "../Modal/Modal.tsx";
import { ReviewForm } from "./ReviewForm";
import toast from 'react-hot-toast';
import { useAuthContext } from "../../context/AuthContext";
import "./Reviews.css"; // Make sure to add styles for the new elements here
import { Link } from "react-router-dom";

export const Reviews: React.FC = () => {
  const { t } = useTranslation();
  const [currentReview, setCurrentReview] = useState(0);
  const { reviews, loading, error, fetchReviews } = useReviews();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const { isLoggedIn, user } = useAuthContext();

  const openReviewModal = () => {
    if (!isLoggedIn) {
      // Сохраняем состояние модального окна в localStorage
      localStorage.setItem('pendingReview', 'true');
      // Открываем модальное окно авторизации
      window.dispatchEvent(new CustomEvent('openAuth'));
      return;
    }
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => setIsReviewModalOpen(false);

  // Проверяем наличие сохраненного отзыва при монтировании компонента
  React.useEffect(() => {
    const pendingReview = localStorage.getItem('pendingReview');
    if (pendingReview === 'true' && isLoggedIn) {
      setIsReviewModalOpen(true);
      localStorage.removeItem('pendingReview');
    }
  }, [isLoggedIn]);

  // Добавляем эффект для отслеживания данных пользователя
  React.useEffect(() => {
    if (isReviewModalOpen) {
      console.log('Opening review modal with user data:', user);
    }
  }, [isReviewModalOpen, user]);

  const handleReviewSubmit = async (formData: {
    name: string;
    email: string;
    message: string;
    file: File | null;
    rating: number;
  }) => {
    try {
      const loadingToast = toast.loading(t('reviews.submitting'));

      // Создаем FormData для отправки файла
      const form = new FormData();
      form.append('name', formData.name.trim());
      form.append('email', formData.email.trim());
      form.append('message', formData.message.trim());
      form.append('rating', formData.rating.toString());
      if (formData.file) {
        form.append('file', formData.file);
      }

      const response = await fetch('http://localhost:3001/api/reviews', {
        method: 'POST',
        credentials: 'include',
        body: form // Отправляем FormData вместо JSON
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error: ${response.status}`);
        }
        throw new Error(`HTTP error: ${response.status}`);
      }

      console.log('Ответ сервера:', response);
      
      closeReviewModal();
      
      toast.success(t('reviews.submitSuccess'), {
        id: loadingToast,
        duration: 3000
      });
      
      await fetchReviews();
    } catch (error) {
      console.error("Ошибка при отправке отзыва:", error);
      toast.error(t('reviews.submitError'), {
        duration: 4000
      });
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={`star ${index < rating ? "filled" : ""}`}>
        ★
      </span>
    ));
  };

  // --- Loading, Error, No Reviews states (remain the same) ---
  if (loading) {
    return (
      <section className="reviews-section">
        <div className="container">
          <div className="loading">
            <Loader className="animate-spin" />
          </div>
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
              alt={t("common.error")}
              className="broken-bottle-image"
            />
            <p className="error-message">
              {t("common.error")}: {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!reviews.length) {
    return (
      <section className="reviews-section">
        <div className="container">
          <div className="no-reviews">{t("reviews.noReviews")}</div>
          {/* Optionally, still show the "Leave Review" button even if none exist yet */}
          <div className="reviews-actions only-leave-review">
            {" "}
            {/* Add specific class if needed */}
            <button
              type="button"
              className="leave-review-link"
              onClick={openReviewModal}
            >
              <ChatIcon className="chat-icon-btn" />
              {t("reviews.leaveFirstReview", "Be the first to leave a review")}
            </button>
          </div>
        </div>
      </section>
    );
  }
  // ---

  return (
    <>
      <section id="reviews" className="reviews-section">
        <div className="container">
          <div className="reviews-header">
            <h2 className="reviews-title">{t("reviews.title")}</h2>
            <div className="reviews-actions">
              <button
                type="button"
                className="leave-review-link"
                onClick={openReviewModal}
              >
                <ChatIcon className="chat-icon-btn" />
                {t("reviews.leaveReview")}
              </button>
              <Link to="/reviews" className="all-reviews-link">
                {t("reviews.allReviews")}
              </Link>
            </div>
          </div>

          <div className="reviews-slider">
            <button
              className="slider-arrow prev"
              onClick={() =>
                setCurrentReview((prev) =>
                  prev > 0 ? prev - 1 : reviews.length - 1
                )
              }
              aria-label={t("reviews.previous")}
            >
              ‹
            </button>

            <div className="review-card" role="article">
              <div
                className="rating"
                aria-label={`${t("reviews.rating")}: ${
                  reviews[currentReview].rating
                }/5`}
              >
                {renderStars(reviews[currentReview].rating)}
              </div>
              <h3 className="review-author">{reviews[currentReview].author}</h3>
              <p className="review-text">{reviews[currentReview].text}</p>
            </div>

            <button
              className="slider-arrow next"
              onClick={() =>
                setCurrentReview((prev) => (prev + 1) % reviews.length)
              }
              aria-label={t("reviews.next")}
            >
              ›
            </button>
          </div>
        </div>
      </section>

      <Modal isOpen={isReviewModalOpen} onClose={closeReviewModal}>
        <ReviewForm 
          onSubmit={handleReviewSubmit} 
          onClose={closeReviewModal}
          userData={user}
        />
      </Modal>
    </>
  );
};
