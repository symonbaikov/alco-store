import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

interface ReviewFormProps {
  onSubmit: (formData: {
    name: string;
    email: string;
    message: string;
    file: File | null;
    rating: number;
  }) => void;
  onClose: () => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit, onClose }) => {
  const { t } = useTranslation();
  const [reviewerName, setReviewerName] = useState("");
  const [reviewerEmail, setReviewerEmail] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");
  const [reviewFile, setReviewFile] = useState<File | null>(null);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [errors, setErrors] = useState<{
    rating?: string;
  }>({});

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setReviewFile(event.target.files[0]);
    } else {
      setReviewFile(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { rating?: string } = {};
    
    if (rating === 0) {
      newErrors.rating = t("reviews.form.errors.ratingRequired");
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      name: reviewerName,
      email: reviewerEmail,
      message: reviewMessage,
      file: reviewFile,
      rating,
    });

    // Reset form
    setReviewerName("");
    setReviewerEmail("");
    setReviewMessage("");
    setReviewFile(null);
    setRating(0);
    setErrors({});
  };

  const renderStars = () => {
    return [...Array(5)].map((_, index) => {
      const ratingValue = index + 1;
      return (
        <button
          type="button"
          key={ratingValue}
          className="star-button"
          onClick={() => setRating(ratingValue)}
          onMouseEnter={() => setHoveredRating(ratingValue)}
          onMouseLeave={() => setHoveredRating(0)}
        >
          {ratingValue <= (hoveredRating || rating) ? (
            <StarIcon className="star filled" />
          ) : (
            <StarBorderIcon className="star" />
          )}
        </button>
      );
    });
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <button
        type="button"
        className="modal-close-button"
        onClick={onClose}
        aria-label={t("common.close")}
      >
        <CloseIcon />
      </button>

      <h2 className="modal-title">{t("reviews.leaveReview")}</h2>

      <div className="form-group">
        <label htmlFor="reviewerName">{t("reviews.form.name")}:</label>
        <input
          type="text"
          id="reviewerName"
          name="name"
          placeholder={t("reviews.form.namePlaceholder")}
          value={reviewerName}
          onChange={(e) => setReviewerName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="reviewerEmail">{t("reviews.form.email")}:</label>
        <input
          type="email"
          id="reviewerEmail"
          name="email"
          placeholder={t("reviews.form.emailPlaceholder")}
          value={reviewerEmail}
          onChange={(e) => setReviewerEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-group rating-group">
        <label>{t("reviews.form.rating")}:</label>
        <div className="stars-container">
          {renderStars()}
        </div>
        {errors.rating && <div className="error-message">{errors.rating}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="reviewMessage">{t("reviews.form.yourReview")}:</label>
        <textarea
          id="reviewMessage"
          name="message"
          placeholder={t("reviews.form.reviewPlaceholder")}
          value={reviewMessage}
          onChange={(e) => setReviewMessage(e.target.value)}
          required
          rows={5}
        />
      </div>

      <div className="form-group">
        <label>{t("reviews.form.attachPhoto")}</label>
        <span className="optional-label">{t("reviews.form.photoOptional")}</span>
        <label className="file-upload-label" htmlFor="reviewFile">
          {t("reviews.form.fileUpload")}
        </label>
        <input
          type="file"
          id="reviewFile"
          name="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        {reviewFile ? (
          <span className="file-name-display">{reviewFile.name}</span>
        ) : (
          <span className="file-name-display">
            {t("reviews.form.noFileChosen")}
          </span>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn">
          {t("reviews.form.submit")}
        </button>
        <button type="button" className="cancel-btn" onClick={onClose}>
          {t("reviews.form.cancel")}
        </button>
      </div>
    </form>
  );
}; 