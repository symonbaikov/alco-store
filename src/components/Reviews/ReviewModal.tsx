import React from 'react';
import Modal from '../Modal/Modal';
import { useTranslation } from 'react-i18next';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="19" y1="5" x2="5" y2="19" />
            </svg>
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