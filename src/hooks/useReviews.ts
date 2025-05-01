import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface Review {
  id: number;
  author: string;
  text: string;
  text_key?: string;
  rating: number;
  createdAt: string;
}

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { i18n, t } = useTranslation();

  const fetchReviews = async () => {
    try {
      setLoading(true);
      
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

      // Переводим отзывы в зависимости от текущего языка
      const translatedReviews = data.map((review: Review) => {
        let translatedText = review.text;
        let translatedAuthor = review.author;

        // Если язык не болгарский и есть text_key, используем перевод
        if (i18n.language !== 'bg' && review.text_key) {
          translatedText = t(`reviews.texts.${review.text_key}`);
          
          // Переводим имена только для не-болгарского языка
          translatedAuthor = review.author
            .replace('Александър', 'Alexander')
            .replace('Михаил', 'Michael')
            .replace('Елена', 'Elena')
            .replace('Димитър', 'Dimitar');
        }

        return {
          ...review,
          author: translatedAuthor,
          text: translatedText
        };
      });

      setReviews(translatedReviews);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
      setError(err instanceof Error ? err.message : 'Failed to load reviews');
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  // Обновляем отзывы при изменении языка
  useEffect(() => {
    fetchReviews();
  }, [i18n.language, t]);

  return { reviews, loading, error, fetchReviews };
}