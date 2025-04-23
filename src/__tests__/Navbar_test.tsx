import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { AuthProvider } from '../context/AuthContext';

// Создаем мок для changeLanguage
const mockChangeLanguage = jest.fn();

// Мокаем i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: mockChangeLanguage,
      language: 'bg'
    }
  })
}));

// Мокаем i18n
jest.mock('../i18n', () => ({
  changeLanguage: mockChangeLanguage,
  language: 'bg',
  use: () => ({
    use: () => ({
      use: () => ({
        init: () => Promise.resolve()
      })
    })
  })
}));

// Мокаем сервисы
jest.mock('../../server/services/categories-service');
jest.mock('../../server/services/auth-service');

describe('Navbar Component', () => {
  const mockProps = {
    onCartClick: jest.fn(),
    onAuthClick: jest.fn()
  };

  beforeEach(() => {
    // Очищаем моки перед каждым тестом
    jest.clearAllMocks();
  });

  test('changes language when language option is clicked', async () => {
    const { container } = render(
      <AuthProvider>
        <BrowserRouter>
          <Navbar {...mockProps} />
        </BrowserRouter>
      </AuthProvider>
    );

    // Находим кнопку переключения языка в десктопной версии
    const languageButton = container.querySelector('.language-selector.desktop .icon-button');
    expect(languageButton).toBeInTheDocument();

    // Находим опцию английского языка
    const englishOption = container.querySelector('.language-option[data-language="en"]');
    expect(englishOption).toBeInTheDocument();

    // Кликаем по опции английского языка
    fireEvent.click(englishOption!);

    // Проверяем, что был вызван метод смены языка
    await waitFor(() => {
      expect(mockChangeLanguage).toHaveBeenCalledWith('en');
    });
  });

  test('shows loading state when changing language', async () => {
    // Делаем mockChangeLanguage асинхронным
    mockChangeLanguage.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    const { container } = render(
      <AuthProvider>
        <BrowserRouter>
          <Navbar {...mockProps} />
        </BrowserRouter>
      </AuthProvider>
    );

    // Находим кнопку переключения языка
    const languageButton = container.querySelector('.language-selector.desktop .icon-button');
    expect(languageButton).toBeInTheDocument();

    // Находим иконку загрузки
    const loadingIcon = languageButton?.querySelector('.fa-spinner');
    expect(loadingIcon).not.toBeInTheDocument();

    // Кликаем по опции смены языка
    const englishOption = container.querySelector('.language-option[data-language="en"]');
    fireEvent.click(englishOption!);

    // Проверяем, что появился индикатор загрузки
    await waitFor(() => {
      const loadingIconAfterClick = languageButton?.querySelector('.fa-spinner');
      expect(loadingIconAfterClick).toBeInTheDocument();
    });
  });
}); 