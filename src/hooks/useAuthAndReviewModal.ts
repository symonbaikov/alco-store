import { useState, useCallback } from 'react';
import { useAuthContext } from '../context/AuthContext';

export function useAuthAndReviewModal() {
  const { user } = useAuthContext();
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Универсальный метод для открытия формы отзыва с проверкой авторизации
  const openReviewModalWithAuth = useCallback(() => {
    if (!user) {
      window.dispatchEvent(new CustomEvent('openAuth'));
      setIsAuthModalOpen(true);
      return false;
    }
    setIsReviewFormOpen(true);
    return true;
  }, [user]);

  const openReviewModal = useCallback(() => setIsReviewFormOpen(true), []);
  const closeReviewModal = useCallback(() => setIsReviewFormOpen(false), []);

  // Можно расширить для управления модалкой авторизации, если потребуется
  const openAuthModal = useCallback(() => {
    window.dispatchEvent(new CustomEvent('openAuth'));
    setIsAuthModalOpen(true);
  }, []);
  const closeAuthModal = useCallback(() => setIsAuthModalOpen(false), []);

  return {
    user,
    isReviewFormOpen,
    openReviewModalWithAuth,
    openReviewModal,
    closeReviewModal,
    isAuthModalOpen,
    openAuthModal,
    closeAuthModal,
  };
} 