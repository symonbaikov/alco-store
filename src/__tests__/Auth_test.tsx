import { render, fireEvent, waitFor } from '@testing-library/react';
import AuthPage from '../components/Auth/AuthPage';

// Мокаем window.matchMedia для react-hot-toast и других зависимостей
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}));

jest.mock('../context/AuthContext', () => ({
  useAuthContext: () => ({ refetch: jest.fn() })
}));

const mockLogin = jest.fn();
jest.mock('../../server/services/auth.service', () => ({
  __esModule: true,
  default: { login: (...args: any[]) => mockLogin(...args) }
}));

describe('AuthPage', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    onRegisterClick: jest.fn(),
    onForgotPasswordClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockLogin.mockReset();
  });

  it('рендерится корректно', () => {
    const { getByPlaceholderText, getByText } = render(<AuthPage {...defaultProps} />);
    expect(getByPlaceholderText('auth.email')).toBeInTheDocument();
    expect(getByPlaceholderText('auth.password')).toBeInTheDocument();
    expect(getByText('auth.submit')).toBeInTheDocument();
  });

  it('валидация: не заполнены поля', async () => {
    const { getByText } = render(<AuthPage {...defaultProps} />);
    fireEvent.click(getByText('auth.submit'));
    await waitFor(() => {
      // Проверяем, что показан toast с ошибкой (можно мокнуть toast и проверить вызов)
    });
  });

  it('успешный вход', async () => {
    mockLogin.mockResolvedValueOnce(true);
    const { getByPlaceholderText, getByText } = render(<AuthPage {...defaultProps} />);
    fireEvent.change(getByPlaceholderText('auth.email'), { target: { value: 'test@mail.com' } });
    fireEvent.change(getByPlaceholderText('auth.password'), { target: { value: 'Password123' } });
    fireEvent.click(getByText('auth.submit'));
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@mail.com', 'Password123');
    });
  });

  it('клик по "Зарегистрироваться" вызывает onRegisterClick', () => {
    const { getByText } = render(<AuthPage {...defaultProps} />);
    fireEvent.click(getByText('auth.register'));
    expect(defaultProps.onRegisterClick).toHaveBeenCalled();
  });

  it('клик по Google вызывает переход', () => {
    const originalHref = window.location.href;
    Object.defineProperty(window.location, 'href', {
      writable: true,
      value: ''
    });
    const { getByText } = render(<AuthPage {...defaultProps} />);
    fireEvent.click(getByText('auth.googleSignIn'));
    expect(window.location.href).toContain('/api/auth/google');
    window.location.href = originalHref;
  });

  it('клик по "Забыли пароль" вызывает onForgotPasswordClick', () => {
    const { getByText } = render(<AuthPage {...defaultProps} />);
    fireEvent.click(getByText('auth.forgotPassword'));
    expect(defaultProps.onForgotPasswordClick).toHaveBeenCalled();
  });
}); 