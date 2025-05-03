import { render } from '@testing-library/react';
import { Reviews } from '../components/Reviews/Reviews';

// Мокаем useReviews
jest.mock('../hooks/useReviews', () => ({
  useReviews: () => ({
    reviews: [
      {
        id: 1,
        author: 'Иван Иванов',
        text: 'Отличный магазин!',
        rating: 5,
        createdAt: '2024-05-01T12:00:00Z',
      },
      {
        id: 2,
        author: 'Петр Петров',
        text: 'Быстрая доставка!',
        rating: 4,
        createdAt: '2024-05-02T12:00:00Z',
      },
    ],
    loading: false,
    error: null,
    fetchReviews: jest.fn(),
  })
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}));

jest.mock('../context/AuthContext', () => ({
  useAuthContext: () => ({ isLoggedIn: true, user: { firstName: 'Test', lastName: 'User', email: 'test@example.com' } })
}));

// Снапшот с отзывами
it('Reviews snapshot: renders with reviews', () => {
  const { asFragment } = render(<Reviews />);
  expect(asFragment()).toMatchSnapshot();
});

// Снапшот без отзывов
it('Reviews snapshot: renders with no reviews', () => {
  jest.mock('../hooks/useReviews', () => ({
    useReviews: () => ({
      reviews: [],
      loading: false,
      error: null,
      fetchReviews: jest.fn(),
    })
  }));
  const { asFragment } = render(<Reviews />);
  expect(asFragment()).toMatchSnapshot();
});

// Снапшот при загрузке
it('Reviews snapshot: renders loading state', () => {
  jest.mock('../hooks/useReviews', () => ({
    useReviews: () => ({
      reviews: [],
      loading: true,
      error: null,
      fetchReviews: jest.fn(),
    })
  }));
  const { asFragment } = render(<Reviews />);
  expect(asFragment()).toMatchSnapshot();
});

// Снапшот при ошибке
it('Reviews snapshot: renders error state', () => {
  jest.mock('../hooks/useReviews', () => ({
    useReviews: () => ({
      reviews: [],
      loading: false,
      error: 'Ошибка сервера',
      fetchReviews: jest.fn(),
    })
  }));
  const { asFragment } = render(<Reviews />);
  expect(asFragment()).toMatchSnapshot();
}); 