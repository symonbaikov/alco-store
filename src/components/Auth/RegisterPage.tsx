import React, { useState } from "react";
import Modal from "../Modal/Modal";
import toast, { Toaster } from 'react-hot-toast';
import GoogleIcon from "../Icons/GoogleIcon";
import "./AuthPage.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

// Функция для проверки валидности пароля
const isPasswordValid = (password: string): { isValid: boolean; error: string } => {
  if (password.length < 8) {
    return { 
      isValid: false, 
      error: "Пароль должен содержать минимум 8 символов" 
    };
  }
  
  if (!/[A-Za-z]/.test(password)) {
    return { 
      isValid: false, 
      error: "Пароль должен содержать хотя бы одну букву" 
    };
  }
  
  if (!/\d/.test(password)) {
    return { 
      isValid: false, 
      error: "Пароль должен содержать хотя бы одну цифру" 
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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Проверяем валидность пароля
    const passwordValidation = isPasswordValid(password);
    if (!passwordValidation.isValid) {
      toast.error(passwordValidation.error);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Пароли не совпадают");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/register/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setTempHashedPassword(data.hashedPassword);
        setShowVerificationModal(true);
        toast.success("Код подтверждения отправлен на ваш email");
      } else {
        const err = await res.json();
        toast.error("Ошибка: " + err.error);
      }
    } catch (error) {
      toast.error("Ошибка при регистрации");
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
        toast.success("Регистрация успешно завершена");
        setShowVerificationModal(false);
        onClose();
      } else {
        const err = await res.json();
        toast.error("Ошибка: " + err.error);
      }
    } catch (error) {
      toast.error("Ошибка при подтверждении кода");
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <Modal isOpen={isOpen && !showVerificationModal} onClose={onClose}>
        <div className="auth">
          <div className="auth-header">
            <h2 className="auth-title">Регистрация</h2>
            <button className="close-button" onClick={onClose}>
              &times;
            </button>
          </div>

          <div className="auth-body">
            <form className="auth-form" onSubmit={handleRegister}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Пароль"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <small className="password-requirements">
                  Пароль должен содержать минимум 8 символов, буквы и хотя бы одну цифру
                </small>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Подтвердите пароль"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="submit-button">
                Регистрация
              </button>
              <button
                type="button"
                className="register-button"
                onClick={onLoginClick}
              >
                Вход в аккаунт
              </button>
              <div className="divider">или</div>
              <button type="button" className="google-button">
                <GoogleIcon />
                Регистрация с Google
              </button>
            </form>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showVerificationModal} onClose={() => setShowVerificationModal(false)}>
        <div className="auth">
          <div className="auth-header">
            <h2 className="auth-title">Подтверждение email</h2>
            <button className="close-button" onClick={() => setShowVerificationModal(false)}>
              &times;
            </button>
          </div>

          <div className="auth-body">
            <form className="auth-form" onSubmit={handleVerifyCode}>
              <p className="verification-text">
                Мы отправили код подтверждения на ваш email: {email}
              </p>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Введите код"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  maxLength={6}
                />
              </div>
              <button type="submit" className="submit-button">
                Подтвердить
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RegisterPage;
