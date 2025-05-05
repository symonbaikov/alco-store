import { render } from '@testing-library/react';
import { Reviews } from '../components/Reviews/Reviews';

// --- Mock data and helpers ---
let mockReviews = [
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
];
let mockLoading = false;
let mockError: string | null = null;

jest.mock('../hooks/useReviews', () => ({
  useReviews: () => ({
    reviews: mockReviews,
    loading: mockLoading,
    error: mockError,
    fetchReviews: jest.fn(),
  })
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}));

jest.mock('../context/AuthContext', () => ({
  useAuthContext: () => ({ isLoggedIn: true, user: { firstName: 'Test', lastName: 'User', email: 'test@example.com' } })
}));

// --- Reset mocks before each test ---
beforeEach(() => {
  mockReviews = [
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
  ];
  mockLoading = false;
  mockError = null;
  jest.clearAllMocks();
});

// --- Tests ---
it('Reviews snapshot: renders with reviews', () => {
  const { asFragment } = render(<Reviews />);
  expect(asFragment()).toMatchSnapshot();
});

it('Reviews snapshot: renders with no reviews', () => {
  mockReviews = [];
  const { asFragment } = render(<Reviews />);
  expect(asFragment()).toMatchSnapshot();
});

it('Reviews snapshot: renders loading state', () => {
  mockReviews = [];
  mockLoading = true;
  const { asFragment } = render(<Reviews />);
  expect(asFragment()).toMatchSnapshot();
});

it('Reviews snapshot: renders error state', () => {
  mockReviews = [];
  mockError = 'Ошибка сервера';
  const { asFragment } = render(<Reviews />);
  expect(asFragment()).toMatchSnapshot();
}); 