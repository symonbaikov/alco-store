// 📁 src/components/Auth/AuthPage.tsx
import React from "react";
import Modal from "../Modal/Modal";
import GoogleIcon from "../Icons/GoogleIcon";
import toast, { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from "../../context/AuthContext";
import authService from "../../services/auth.service";
import "./AuthPage.css";

interface AuthPageProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterClick: () => void;
  onForgotPasswordClick: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({
  isOpen,
  onClose,
  onRegisterClick,
  onForgotPasswordClick,
}) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { t } = useTranslation();
  const { refetch } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error(t('auth.fillAllFields'));
      return;
    }

    const result = await authService.login(email, password);

    if (result) {
      await refetch();
      onClose();
      
      // Проверяем, есть ли отложенный отзыв
      const pendingReview = localStorage.getItem('pendingReview');
      if (pendingReview === 'true') {
        localStorage.removeItem('pendingReview');
      }
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3001/api/auth/google';
  };

  const handleClose = () => {
    onClose();
    const pendingReview = localStorage.getItem('pendingReview');
    if (pendingReview === 'true') {
      localStorage.removeItem('pendingReview');
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <Modal isOpen={isOpen} onClose={handleClose}>
        <div className="auth">
          <div className="auth-header">
            <h2 className="auth-title">{t('auth.title')}</h2>
            <button className="close-button" onClick={handleClose}>
              &times;
            </button>
          </div>

          <div className="auth-body">
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder={t('auth.email')}
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder={t('auth.password')}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-options">
                <label className="remember-label">
                  <input type="checkbox" name="remember" />
                  {t('auth.rememberMe')}
                </label>
                <a href="#"
                  onClick={onForgotPasswordClick}
                  className="forgot-link"
                >
                  {t('auth.forgotPassword')}
                </a>
              </div>
              <button type="submit" className="submit-button">
                {t('auth.submit')}
              </button>
              <button
                type="button"
                className="register-button"
                onClick={onRegisterClick}
              >
                {t('auth.register')}
              </button>
              <div className="divider">{t('auth.or')}</div>
              <button 
                type="button" 
                className="google-button"
                onClick={handleGoogleLogin}
              >
                <GoogleIcon />
                {t('auth.googleSignIn')}
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AuthPage;

