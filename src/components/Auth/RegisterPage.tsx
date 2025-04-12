import React, { useState } from "react";
import Modal from "../Modal/Modal";
import GoogleIcon from "../Icons/GoogleIcon";
import "./AuthPage.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

const RegisterPage: React.FC<Props> = ({ isOpen, onClose, onLoginClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Пароли не совпадают");
      return;
    }

    const res = await fetch("http://localhost:3001/api/auth/register", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log("✅ Регистрация прошла:", data);
      onClose();
    } else {
      const err = await res.json();
      alert("Ошибка: " + err.error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
                placeholder="Имейл"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Парола"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Потвърди паролата"
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
  );
};

export default RegisterPage;
