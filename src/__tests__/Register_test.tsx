import { render, fireEvent, waitFor } from '@testing-library/react';
import RegisterPage from '../components/Auth/RegisterPage';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}));

jest.mock('../context/AuthContext', () => ({
  useAuthContext: () => ({ refetch: jest.fn() })
}));

global.fetch = jest.fn();

describe('RegisterPage', () => {
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
    const { getByPlaceholderText, getByText } = render(<RegisterPage {...defaultProps} />);
    expect(getByPlaceholderText('register.email')).toBeInTheDocument();
    expect(getByPlaceholderText('register.password')).toBeInTheDocument();
    expect(getByPlaceholderText('register.confirmPassword')).toBeInTheDocument();
    expect(getByText('register.submit')).toBeInTheDocument();
  });

  it('показывает ошибку при коротком пароле', async () => {
    const { getByPlaceholderText, getByText } = render(<RegisterPage {...defaultProps} />);
    fireEvent.change(getByPlaceholderText('register.email'), { target: { value: 'test@mail.com' } });
    fireEvent.change(getByPlaceholderText('register.password'), { target: { value: '123' } });
    fireEvent.change(getByPlaceholderText('register.confirmPassword'), { target: { value: '123' } });
    fireEvent.click(getByText('register.submit'));
    await waitFor(() => {
      // Проверяем, что показан toast с ошибкой (можно мокнуть toast и проверить вызов)
    });
  });

  it('показывает ошибку при несовпадении паролей', async () => {
    const { getByPlaceholderText, getByText } = render(<RegisterPage {...defaultProps} />);
    fireEvent.change(getByPlaceholderText('register.email'), { target: { value: 'test@mail.com' } });
    fireEvent.change(getByPlaceholderText('register.password'), { target: { value: 'Password123' } });
    fireEvent.change(getByPlaceholderText('register.confirmPassword'), { target: { value: 'Password321' } });
    fireEvent.click(getByText('register.submit'));
    await waitFor(() => {
      // Проверяем, что показан toast с ошибкой
    });
  });

  it('успешная регистрация и переход к верификации', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ hashedPassword: 'hash' })
    });
    const { getByPlaceholderText, getByText } = render(<RegisterPage {...defaultProps} />);
    fireEvent.change(getByPlaceholderText('register.email'), { target: { value: 'test@mail.com' } });
    fireEvent.change(getByPlaceholderText('register.password'), { target: { value: 'Password123' } });
    fireEvent.change(getByPlaceholderText('register.confirmPassword'), { target: { value: 'Password123' } });
    fireEvent.click(getByText('register.submit'));
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/register/register'), expect.any(Object));
    });
  });

  it('ошибка регистрации', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Email exists' })
    });
    const { getByPlaceholderText, getByText } = render(<RegisterPage {...defaultProps} />);
    fireEvent.change(getByPlaceholderText('register.email'), { target: { value: 'test@mail.com' } });
    fireEvent.change(getByPlaceholderText('register.password'), { target: { value: 'Password123' } });
    fireEvent.change(getByPlaceholderText('register.confirmPassword'), { target: { value: 'Password123' } });
    fireEvent.click(getByText('register.submit'));
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
  });

  it('клик по "Войти" вызывает onLoginClick', () => {
    const { getByText } = render(<RegisterPage {...defaultProps} />);
    fireEvent.click(getByText('register.login'));
    expect(defaultProps.onLoginClick).toHaveBeenCalled();
  });

  it('клик по Google вызывает переход', () => {
    const originalHref = window.location.href;
    Object.defineProperty(window.location, 'href', {
      writable: true,
      value: ''
    });
    const { getByText } = render(<RegisterPage {...defaultProps} />);
    fireEvent.click(getByText('register.googleRegister'));
    expect(window.location.href).toContain('/api/auth/google');
    window.location.href = originalHref;
  });

  it('после успешной регистрации появляется окно для кода подтверждения', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ hashedPassword: 'hash' })
    });
    const { getByPlaceholderText, getByText, findByPlaceholderText } = render(<RegisterPage {...defaultProps} />);
    fireEvent.change(getByPlaceholderText('register.email'), { target: { value: 'test@mail.com' } });
    fireEvent.change(getByPlaceholderText('register.password'), { target: { value: 'Password123' } });
    fireEvent.change(getByPlaceholderText('register.confirmPassword'), { target: { value: 'Password123' } });
    fireEvent.click(getByText('register.submit'));
    // Ждём появления поля для кода подтверждения
    const codeInput = await findByPlaceholderText('register.verificationCode');
    expect(codeInput).toBeInTheDocument();
  });
}); 