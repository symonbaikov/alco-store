// /Users/symonbaikov/Projects/alco-store/src/components/Reviews/Reviews.tsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useReviews } from "../../hooks/useReviews";
import ChatIcon from "@mui/icons-material/ChatOutlined";
import CloseIcon from "@mui/icons-material/Close"; // Import Close icon
import { Loader } from "lucide-react";
import Modal from "../Modal/Modal.tsx";
import "./Reviews.css"; // Make sure to add styles for the new elements here

export const Reviews: React.FC = () => {
  const { t } = useTranslation();
  const [currentReview, setCurrentReview] = useState(0);
  const { reviews, loading, error } = useReviews();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // --- State for Form Inputs ---
  const [reviewerName, setReviewerName] = useState("");
  const [reviewerEmail, setReviewerEmail] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");
  const [reviewFile, setReviewFile] = useState<File | null>(null);
  // ---

  const openReviewModal = () => setIsReviewModalOpen(true);
  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
    // Reset form fields on close
    setReviewerName("");
    setReviewerEmail("");
    setReviewMessage("");
    setReviewFile(null);
    // Reset file input visually if needed
    const fileInput = document.getElementById("reviewFile") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setReviewFile(event.target.files[0]);
    } else {
      setReviewFile(null);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Логика отправки отзыва
    console.log("Отзыв отправляется с данными:", {
      name: reviewerName,
      email: reviewerEmail,
      message: reviewMessage,
      file: reviewFile,
      // Add rating if you collect it in the form too
    });

    // --- Placeholder for actual API call ---
    // const formData = new FormData();
    // formData.append('name', reviewerName);
    // formData.append('email', reviewerEmail);
    // formData.append('message', reviewMessage);
    // if (reviewFile) {
    //   formData.append('attachment', reviewFile);
    // }
    // try {
    //   // await submitReviewApi(formData);
    //   alert(t('reviews.submitSuccess', 'Review submitted successfully!'));
    closeReviewModal(); // Закрываем модалку после "отправки"
    // } catch (apiError) {
    //   console.error("Failed to submit review:", apiError);
    //   alert(t('reviews.submitError', 'Failed to submit review. Please try again.'));
    // }
    // --- End Placeholder ---

    // For now, just log and close
    closeReviewModal();
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

      {/* --- Updated Modal with Form --- */}
      <Modal isOpen={isReviewModalOpen} onClose={closeReviewModal}>
        {/* Close Button (X) */}
        <button
          type="button"
          className="modal-close-button" // Add styles for this class in Reviews.css
          onClick={closeReviewModal}
          aria-label={t("common.close", "Close")}
        >
          <CloseIcon /> {/* Use the imported icon */}
        </button>

        <h2>{t("reviews.leaveReviewTitle", "Оставить отзыв")}</h2>

        {/* --- Updated Form --- */}
        <form className="review-form" onSubmit={handleReviewSubmit}>
          {" "}
          {/* Add class for styling */}
          {/* Name Input */}
          <div className="form-group">
            <label htmlFor="reviewerName">
              {t("reviews.form.nameLabel", "Name")}:
            </label>
            <input
              type="text"
              id="reviewerName"
              name="name"
              placeholder={t("reviews.form.namePlaceholder", "Your Name")}
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              required
            />
          </div>
          {/* Email Input */}
          <div className="form-group">
            <label htmlFor="reviewerEmail">
              {t("reviews.form.emailLabel", "Email")}:
            </label>
            <input
              type="email"
              id="reviewerEmail"
              name="email"
              placeholder={t(
                "reviews.form.emailPlaceholder",
                "your.email@example.com"
              )}
              value={reviewerEmail}
              onChange={(e) => setReviewerEmail(e.target.value)}
              required
            />
          </div>
          {/* Message Textarea */}
          <div className="form-group">
            <label htmlFor="reviewMessage">
              {t("reviews.form.messageLabel", "Your Review")}:
            </label>
            <textarea
              id="reviewMessage"
              name="message"
              placeholder={t(
                "reviews.form.messagePlaceholder",
                "Write your review here..."
              )}
              value={reviewMessage}
              onChange={(e) => setReviewMessage(e.target.value)}
              required
              rows={5} // Adjust rows as needed
            />
          </div>
          {/* File Input */}
          <div className="form-group">
            <label htmlFor="reviewFile">
              {t("reviews.form.fileLabel", "Attach Photo (Optional)")}:
            </label>
            <input
              type="file"
              id="reviewFile" // ID added for resetting
              name="file"
              accept="image/*" // Example: accept only images
              onChange={handleFileChange}
            />
            {reviewFile && (
              <span className="file-name-display">{reviewFile.name}</span>
            )}{" "}
            {/* Optional: display selected file name */}
          </div>
          {/* Action Buttons */}
          <div className="form-actions">
            <button type="submit" className="submit-btn">
              {t("common.send", "Отправить")}
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={closeReviewModal}
              // style removed, prefer classes
            >
              {t("common.cancel", "Отмена")}
            </button>
          </div>
        </form>
        {/* --- End Updated Form --- */}
      </Modal>
      {/* --- */}
    </>
  );
};
