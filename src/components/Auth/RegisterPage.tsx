import React, { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import toast from 'react-hot-toast';
import GoogleIcon from "../Icons/GoogleIcon";
import { useTranslation } from 'react-i18next';
import { useAuthContext } from "../../context/AuthContext";
import "./AuthPage.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

// Функция для проверки валидности пароля
const isPasswordValid = (password: string, t: (key: string) => string): { isValid: boolean; error: string } => {
  if (password.length < 8) {
    return { 
      isValid: false, 
      error: t('register.passwordErrors.length')
    };
  }
  
  if (!/[A-Za-z]/.test(password)) {
    return { 
      isValid: false, 
      error: t('register.passwordErrors.letter')
    };
  }
  
  if (!/\d/.test(password)) {
    return { 
      isValid: false, 
      error: t('register.passwordErrors.digit')
    };
  }
  
  return { isValid: true, error: "" };
};

const RegisterPage: React.FC<Props> = ({ isOpen, onClose, onLoginClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [tempHashedPassword, setTempHashedPassword] = useState("");
  const { t } = useTranslation();
  const { refetch } = useAuthContext();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Проверяем валидность пароля
    const passwordValidation = isPasswordValid(password, t);
    if (!passwordValidation.isValid) {
      toast.error(passwordValidation.error);
      return;
    }

    if (password !== confirmPassword) {
      toast.error(t('register.passwordsNotMatch'));
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/register/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setTempHashedPassword(data.hashedPassword);
        toast.success(t('register.verificationSent'));
        setShowVerificationModal(true);
      } else {
        toast.error(t('register.registrationError') + ": " + data.error);
      }
    } catch (error) {
      toast.error(t('register.registrationError'));
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/api/register/verify", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          code: verificationCode,
          hashedPassword: tempHashedPassword,
        }),
      });

      if (res.ok) {
        await refetch();
        toast.success(t('register.registrationSuccess'));
        setShowVerificationModal(false);
        onClose();
        
        // Проверяем, есть ли отложенный отзыв
        const pendingReview = localStorage.getItem('pendingReview');
        if (pendingReview === 'true') {
          // Если есть отложенный отзыв, оставляем его в localStorage
          // Он будет обработан в компоненте Reviews
        } else {
          // Если нет отложенного отзыва, очищаем localStorage
          localStorage.removeItem('pendingReview');
        }
      } else {
        const err = await res.json();
        toast.error(t('register.verificationError') + ": " + err.error);
      }
    } catch (error) {
      toast.error(t('register.verificationError'));
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3001/api/auth/google';
  };

  return (
    <>
      <Modal isOpen={isOpen && !showVerificationModal} onClose={onClose}>
        <div className="auth">
          <div className="auth-header">
            <h2 className="auth-title">{t('register.title')}</h2>
            <button className="close-button" onClick={onClose}>
              &times;
            </button>
          </div>

          <div className="auth-body">
            <form className="auth-form" onSubmit={handleRegister}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder={t('register.email')}
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder={t('register.password')}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <small className="password-requirements">
                  {t('register.passwordRequirements')}
                </small>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder={t('register.confirmPassword')}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="submit-button">
                {t('register.submit')}
              </button>
              <button
                type="button"
                className="register-button"
                onClick={onLoginClick}
              >
                {t('register.login')}
              </button>
              <div className="divider">{t('auth.or')}</div>
              <button 
                type="button" 
                className="google-button"
                onClick={handleGoogleLogin}
              >
                <GoogleIcon />
                {t('register.googleRegister')}
              </button>
            </form>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showVerificationModal} onClose={() => setShowVerificationModal(false)}>
        <div className="auth">
          <div className="auth-header">
            <h2 className="auth-title">{t('register.verificationTitle')}</h2>
            <button className="close-button" onClick={() => setShowVerificationModal(false)}>
              &times;
            </button>
          </div>

          <div className="auth-body">
            <form className="auth-form" onSubmit={handleVerifyCode}>
              <p className="verification-text">
                {t('register.verificationText')} {email}
              </p>
              <div className="form-group">
                <input
                  type="text"
                  placeholder={t('register.verificationCode')}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  maxLength={6}
                />
              </div>
              <button type="submit" className="submit-button">
                {t('register.verify')}
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RegisterPage;
