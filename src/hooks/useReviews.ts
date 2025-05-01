import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface Review {
  id: number;
  author: string;
  text: string;
  textBg?: string;
  textEn?: string;
  rating: number;
  createdAt: string;
}

const CACHE_KEY = 'reviews_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 минут

interface CacheData {
  reviews: Review[];
  timestamp: number;
}

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { i18n } = useTranslation();

  const getLocalizedText = useCallback((review: Review): string => {
    // Используем уже переведенный текст, если он есть
    if (i18n.language === 'en' && review.textEn) {
      return review.textEn;
    } else if (i18n.language === 'bg' && review.textBg) {
      return review.textBg;
    }
    return review.text;
  }, [i18n.language]);

  const getCachedReviews = useCallback((): Review[] | null => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const { reviews, timestamp }: CacheData = JSON.parse(cached);
    const isExpired = Date.now() - timestamp > CACHE_DURATION;

    if (isExpired) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return reviews;
  }, []);

  const setCachedReviews = useCallback((reviews: Review[]) => {
    const cacheData: CacheData = {
      reviews,
      timestamp: Date.now()
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  }, []);

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);

      // Проверяем кэш
      const cachedReviews = getCachedReviews();
      if (cachedReviews) {
        const localizedReviews = cachedReviews.map(review => ({
          ...review,
          text: getLocalizedText(review)
        }));
        setReviews(localizedReviews);
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:3001/api/reviews', {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error('Expected array of reviews');
      }

      // Локализуем отзывы
      const localizedReviews = data.map(review => ({
        ...review,
        text: getLocalizedText(review)
      }));

      setReviews(localizedReviews);
      setCachedReviews(data); // Кэшируем оригинальные данные
      setError(null);
    } catch (err) {
      console.error('[useReviews] Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch reviews');
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, [getLocalizedText, getCachedReviews, setCachedReviews]);

  // Загружаем отзывы при монтировании и при изменении языка
  useEffect(() => {
    fetchReviews();
  }, [i18n.language, fetchReviews]);

  return { reviews, loading, error, fetchReviews };
}