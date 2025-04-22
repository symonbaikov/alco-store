import { render, act, waitFor } from '@testing-library/react';
import { Slider } from '../components/Slider/Slider';

// Мокаем модуль сервиса слайдов
jest.mock('server/services/slides-service', () => ({
  getSlides: jest.fn(() => Promise.resolve([
    {
      id: 1,
      image: '/images/slide1.jpg',
      title: 'Slide Title 1',
      description: 'Slide Description 1',
      link: '/link1',
      order: 1
    },
    {
      id: 2,
      image: '/images/slide2.jpg',
      title: 'Slide Title 2',
      description: 'Slide Description 2',
      link: '/link2',
      order: 2
    }
  ]))
}));

describe('Slider Component', () => {
  // Снапшот-тест
  test('matches snapshot', async () => {
    const { container } = render(<Slider />);
    
    // Ждем загрузки слайдов
    await waitFor(() => {
      expect(container.querySelector('.MuiSkeleton-root')).not.toBeInTheDocument();
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  // Интеграционные тесты
  test('renders slider component and loads slides', async () => {
    const { container } = render(<Slider />);

    // Проверяем состояние загрузки
    expect(container.querySelector('.MuiSkeleton-root')).toBeInTheDocument();

    // Ждем загрузки слайдов
    await waitFor(() => {
      expect(container.querySelector('.MuiSkeleton-root')).not.toBeInTheDocument();
    });

    // Проверяем, что слайды загрузились
    const slides = container.querySelectorAll('.slide');
    expect(slides.length).toBe(2);

    // Проверяем навигационные кнопки
    const prevButton = container.querySelector('.slider-button.prev');
    const nextButton = container.querySelector('.slider-button.next');
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();

    // Проверяем точки навигации
    const dots = container.querySelectorAll('.dot');
    expect(dots.length).toBe(2);
  });

  test('handles slide navigation', async () => {
    const { container } = render(<Slider />);
    
    // Ждем загрузки слайдов
    await waitFor(() => {
      expect(container.querySelector('.MuiSkeleton-root')).not.toBeInTheDocument();
    });

    const nextButton = container.querySelector('.slider-button.next') as HTMLButtonElement;
    expect(nextButton).not.toBeNull();
    
    // Проверяем начальное состояние
    const slides = container.querySelectorAll('.slide');
    expect(slides[0].classList.contains('active')).toBe(true);
    expect(slides[1].classList.contains('active')).toBe(false);
    
    // Кликаем на следующий слайд
    await act(async () => {
      nextButton.click();
    });

    // Проверяем, что второй слайд стал активным
    expect(slides[1].classList.contains('active')).toBe(true);
    expect(slides[0].classList.contains('active')).toBe(false);
  });
});