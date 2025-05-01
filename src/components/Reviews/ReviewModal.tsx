import React from 'react';
import Modal from '../Modal/Modal';
import { useTranslation } from 'react-i18next';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CloseIcon from '@mui/icons-material/Close';
import './ReviewModal.css';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  review: {
    author: string;
    text: string;
    rating: number;
    createdAt: string;
  } | null;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, review }) => {
  const { t } = useTranslation();

  if (!review) return null;

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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="review-modal">
        <div className="review-modal-header">
          <h2 className="review-modal-author">{review.author}</h2>
          <div className="review-modal-rating">
            {renderStars(review.rating)}
          </div>
          <button className="modal-close-button" onClick={onClose} aria-label={t('common.close')}>
            <CloseIcon />
          </button>
        </div>
        <div className="review-modal-content">
          <div className="review-modal-text">
            {review.text}
          </div>
          <div className="review-modal-date">
            {new Date(review.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </Modal>
  );
}; 