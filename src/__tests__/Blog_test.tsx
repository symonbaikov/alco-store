import { render, waitFor } from '@testing-library/react';
import { Blog } from '../components/Blog/Blog';
import { MemoryRouter } from 'react-router-dom';

// Мокаем i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'bg',
      changeLanguage: jest.fn()
    }
  })
}));

// Мокаем fetch
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([
        {
          id: 1,
          slug: '5-trendov-2025',
          image: '/images/trends-2025.jpg',
          link: '/blog/5-trendov-2025',
          title: '5 Main Trends in the Wine Industry in 2025',
          date: '2025-03-17T00:00:00.000Z'
        }
      ])
    })
  ) as jest.Mock;
});

afterAll(() => {
  jest.resetAllMocks();
});

describe('Blog component', () => {
  it('рендерится корректно (snapshot)', async () => {
    const { asFragment, getByText } = render(
      <MemoryRouter>
        <Blog />
      </MemoryRouter>
    );
    await waitFor(() => {
      // Проверяем, что заголовок появился (ключ перевода)
      expect(getByText('blog.title')).toBeInTheDocument();
    });
    expect(asFragment()).toMatchSnapshot();
  });
}); 