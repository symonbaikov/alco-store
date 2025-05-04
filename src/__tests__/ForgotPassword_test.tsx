import { render, fireEvent, waitFor } from '@testing-library/react';
import ForgotPassword from '../components/Auth/ForgotPassword';

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

global.fetch = jest.fn();

describe('ForgotPassword', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    onLoginClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (fetch as jest.Mock).mockReset();
  });

  it('рендерится корректно', () => {
    const { getByPlaceholderText, getByText } = render(<ForgotPassword {...defaultProps} />);
    expect(getByPlaceholderText('forgotPassword.email')).toBeInTheDocument();
    expect(getByText('forgotPassword.submit')).toBeInTheDocument();
    expect(getByText('forgotPassword.login')).toBeInTheDocument();
  });

  it('успешная отправка формы', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({})
    });
    const { getByPlaceholderText, getByText } = render(<ForgotPassword {...defaultProps} />);
    fireEvent.change(getByPlaceholderText('forgotPassword.email'), { target: { value: 'test@mail.com' } });
    fireEvent.click(getByText('forgotPassword.submit'));
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/forgot-password/forgot-password'), expect.any(Object));
      expect(defaultProps.onClose).toHaveBeenCalled();
    });
  });

  it('ошибка отправки формы', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Not found' })
    });
    const { getByPlaceholderText, getByText } = render(<ForgotPassword {...defaultProps} />);
    fireEvent.change(getByPlaceholderText('forgotPassword.email'), { target: { value: 'test@mail.com' } });
    fireEvent.click(getByText('forgotPassword.submit'));
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
      expect(defaultProps.onClose).not.toHaveBeenCalled();
    });
  });

  it('клик по "Войти" вызывает onLoginClick', () => {
    const { getByText } = render(<ForgotPassword {...defaultProps} />);
    fireEvent.click(getByText('forgotPassword.login'));
    expect(defaultProps.onLoginClick).toHaveBeenCalled();
  });
}); 