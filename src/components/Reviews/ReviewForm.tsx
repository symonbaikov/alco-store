import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';

interface ReviewFormProps {
  onSubmit: (formData: {
    name: string;
    email: string;
    message: string;
    file: File | null;
    rating: number;
  }) => void;
  onClose: () => void;
  userData: {
    firstName?: string;
    lastName?: string;
    email: string;
    role?: string;
    googleId?: string;
  } | null;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit, onClose, userData }) => {
  const { t } = useTranslation();
  const [reviewerName, setReviewerName] = useState("");
  const [reviewerEmail, setReviewerEmail] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");
  const [reviewFile, setReviewFile] = useState<File | null>(null);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [errors, setErrors] = useState<{
    rating?: string;
    name?: string;
    email?: string;
    message?: string;
  }>({});

  // Инициализация формы при монтировании или изменении userData
  useEffect(() => {
    if (userData) {
      const fullName = [userData.firstName, userData.lastName]
        .filter(Boolean)
        .join(' ')
        .trim();
      setReviewerName(fullName);
      setReviewerEmail(userData.email);
    }
  }, [userData]);

  // Очистка формы при закрытии
  const handleClose = () => {
    setReviewerName("");
    setReviewerEmail("");
    setReviewMessage("");
    setReviewFile(null);
    setRating(0);
    setErrors({});
    onClose();
  };

  // Восстанавливаем данные формы из localStorage при монтировании
  useEffect(() => {
    if (userData) {
      const fullName = [userData.firstName, userData.lastName]
        .filter(Boolean)
        .join(' ')
        .trim();
      setReviewerName(fullName);
      setReviewerEmail(userData.email);
    }
  }, [userData]);

  // Сохраняем данные формы в localStorage при изменении
  useEffect(() => {
    const formData = {
      name: reviewerName,
      email: reviewerEmail,
      message: reviewMessage,
      rating
    };
    localStorage.setItem('reviewFormData', JSON.stringify(formData));
  }, [reviewerName, reviewerEmail, reviewMessage, rating]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setReviewFile(event.target.files[0]);
    } else {
      setReviewFile(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { 
      rating?: string;
      name?: string;
      email?: string;
      message?: string;
    } = {};
    
    // Проверяем все обязательные поля
    if (!reviewerName.trim()) {
      newErrors.name = t("reviews.form.errors.nameRequired");
    }
    
    if (!reviewerEmail.trim()) {
      newErrors.email = t("reviews.form.errors.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reviewerEmail)) {
      newErrors.email = t("reviews.form.errors.emailInvalid");
    }
    
    if (!reviewMessage.trim()) {
      newErrors.message = t("reviews.form.errors.messageRequired");
    }
    
    if (rating === 0) {
      newErrors.rating = t("reviews.form.errors.ratingRequired");
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Отправляем только нужные данные
    onSubmit({
      name: reviewerName.trim(),
      email: reviewerEmail.trim(),
      message: reviewMessage.trim(),
      file: reviewFile,
      rating,
    });

    // Очищаем localStorage после успешной отправки
    localStorage.removeItem('reviewFormData');

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
    <form className="review-form" onSubmit={handleSubmit} style={{borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.10)', background: '#fff', padding: 32, maxWidth: 500, margin: '0 auto'}}>
      <div className="modal-header">
        <h2 className="review-modal-title">{t("reviews.leaveReview")}</h2>
        <button
          type="button"
          className="modal-close-button"
          onClick={handleClose}
          aria-label={t("common.close")}
        >
          <CancelIcon />
        </button>
      </div>
      <div className="form-group">
        <label htmlFor="reviewerName">{t("reviews.form.name")} <span style={{color:'#d32f2f'}}>*</span>:</label>
        <input
          type="text"
          id="reviewerName"
          name="name"
          placeholder={t("reviews.form.namePlaceholder")}
          value={reviewerName}
          onChange={(e) => setReviewerName(e.target.value)}
          required
          className={errors.name ? 'input-error' : ''}
        />
        {errors.name && <div className="error-message">{errors.name}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="reviewerEmail">{t("reviews.form.email")} <span style={{color:'#d32f2f'}}>*</span>:</label>
        <input
          type="email"
          id="reviewerEmail"
          name="email"
          placeholder={t("reviews.form.emailPlaceholder")}
          value={reviewerEmail}
          onChange={(e) => setReviewerEmail(e.target.value)}
          required
          className={errors.email ? 'input-error' : ''}
        />
        {errors.email && <div className="error-message">{errors.email}</div>}
      </div>
      <div className="form-group rating-group">
        <label>{t("reviews.form.rating")} <span style={{color:'#d32f2f'}}>*</span>:</label>
        <div className="stars-container">
          {renderStars()}
        </div>
        {errors.rating && <div className="error-message">{errors.rating}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="reviewMessage">{t("reviews.form.yourReview")} <span style={{color:'#d32f2f'}}>*</span>:</label>
        <textarea
          id="reviewMessage"
          name="message"
          placeholder={t("reviews.form.reviewPlaceholder")}
          value={reviewMessage}
          onChange={(e) => setReviewMessage(e.target.value)}
          required
          rows={5}
          className={errors.message ? 'input-error' : ''}
        />
        {errors.message && <div className="error-message">{errors.message}</div>}
      </div>
      <div className="form-group">
        <label>{t("reviews.form.attachPhoto")}</label>
        <span className="optional-label">{t("reviews.form.photoOptional")}</span>
        <label className="file-upload-label" htmlFor="reviewFile">
          <AttachFileIcon className="attach-icon" />
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
        <button type="submit" className="submit-btn" style={{display:'flex',alignItems:'center',gap:8}}>
          <SendIcon style={{fontSize:20}} />
          {t("reviews.form.submit")}
        </button>
        <button type="button" className="cancel-btn" onClick={handleClose} style={{display:'flex',alignItems:'center',gap:8}}>
          <CancelIcon style={{fontSize:20}} />
          {t("reviews.form.cancel")}
        </button>
      </div>
    </form>
  );
}; 