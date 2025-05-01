import { useState, useEffect } from 'react';
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

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { i18n } = useTranslation();

  const translateReviewText = async (text: string, targetLang: string): Promise<string> => {
    try {
      const response = await fetch('http://localhost:3001/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, targetLang }),
      });

      if (!response.ok) {
        throw new Error('Translation failed');
      }

      const data = await response.json();
      return data.translation;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  };

  const getLocalizedText = async (review: Review): Promise<string> => {
    // Если текст уже есть в нужном языке, используем его
    if (i18n.language === 'en' && review.textEn) {
      return review.textEn;
    } else if (i18n.language === 'bg' && review.textBg) {
      return review.textBg;
    }

    // Если нет перевода, переводим на лету
    return await translateReviewText(review.text, i18n.language);
  };

  const fetchReviews = async () => {
    let timeoutId: NodeJS.Timeout | undefined;

    try {
      setLoading(true);
      
      const timeoutPromise = new Promise((_, reject) => {
        timeoutId = setTimeout(() => {
          reject(new Error('Timeout: Failed to fetch reviews'));
        }, 10000);
      });
      
      const fetchPromise = fetch('http://localhost:3001/api/reviews', {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      const response = await Promise.race([fetchPromise, timeoutPromise]) as Response;
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('Expected array of reviews');
      }

      if (data.length === 0) {
        setReviews([]);
        setError(null);
        return;
      }

      // Переводим все отзывы на текущий язык
      const translatedReviews = await Promise.all(
        data.map(async (review: Review) => ({
          ...review,
          text: await getLocalizedText(review)
        }))
      );

      setReviews(translatedReviews);
      setError(null);
    } catch (err) {
      console.error('[useReviews] Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch reviews');
      setReviews([]);
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      setLoading(false);
    }
  };

  // Загружаем отзывы при монтировании и при изменении языка
  useEffect(() => {
    console.log('[useReviews] Language changed to:', i18n.language);
    fetchReviews();
  }, [i18n.language]);

  return { reviews, loading, error, fetchReviews };
}