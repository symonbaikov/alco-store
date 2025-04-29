// /Users/symonbaikov/Projects/alco-store/src/components/Reviews/Reviews.tsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useReviews } from "../../hooks/useReviews";
import ChatIcon from "@mui/icons-material/ChatOutlined";
import { Loader } from "lucide-react";
import Modal from "../Modal/Modal.tsx";
import { ReviewForm } from "./ReviewForm";
import "./Reviews.css"; // Make sure to add styles for the new elements here

export const Reviews: React.FC = () => {
  const { t } = useTranslation();
  const [currentReview, setCurrentReview] = useState(0);
  const { reviews, loading, error } = useReviews();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const openReviewModal = () => setIsReviewModalOpen(true);
  const closeReviewModal = () => setIsReviewModalOpen(false);

  const handleReviewSubmit = async (formData: {
    name: string;
    email: string;
    message: string;
    file: File | null;
  }) => {
    // Логика отправки отзыва
    console.log("Отзыв отправляется с данными:", formData);

    // --- Placeholder for actual API call ---
    // const formDataObj = new FormData();
    // formDataObj.append('name', formData.name);
    // formDataObj.append('email', formData.email);
    // formDataObj.append('message', formData.message);
    // if (formData.file) {
    //   formDataObj.append('attachment', formData.file);
    // }
    // try {
    //   // await submitReviewApi(formDataObj);
    //   alert(t('reviews.submitSuccess'));
    closeReviewModal();
    // } catch (apiError) {
    //   console.error("Failed to submit review:", apiError);
    //   alert(t('reviews.submitError'));
    // }
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
            <Loader />
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
      <section className="reviews-section">
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
              <a href="/reviews" className="all-reviews-link">
                {t("reviews.allReviews")}
              </a>
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
        <ReviewForm onSubmit={handleReviewSubmit} onClose={closeReviewModal} />
      </Modal>
    </>
  );
};
