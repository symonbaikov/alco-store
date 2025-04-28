import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface Review {
  id: number;
  author: string;
  text: string;
  text_key: string;
  rating: number;
  createdAt: string;
}

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { i18n } = useTranslation();

  const fetchReviews = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('http://localhost:3001/api/reviews');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('Expected array of reviews');
      }

      // Translate reviews based on current language
      const translatedReviews = data.map((review: Review) => ({
        ...review,
        author: i18n.language === 'bg' ? review.author : 
          review.author
            .replace('Александър', 'Alexander')
            .replace('Михаил', 'Michael')
            .replace('Елена', 'Elena')
            .replace('Димитър', 'Dimitar'),
        text: i18n.t(`reviews.texts.${review.text_key}`, review.text)
      }));

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

  // Fetch reviews when language changes
  useEffect(() => {
    fetchReviews();
  }, [i18n.language]);

  return { reviews, loading, error, fetchReviews };
}