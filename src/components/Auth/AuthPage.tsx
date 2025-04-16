// 📁 src/components/Auth/AuthPage.tsx
import React from "react";
import Modal from "../Modal/Modal";
import GoogleIcon from "../Icons/GoogleIcon";
import toast, { Toaster } from 'react-hot-toast';
import "./AuthPage.css";

interface AuthPageProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterClick: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({
  isOpen,
  onClose,
  onRegisterClick,
}) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("✅ Вход успешен:", data);
        toast.success("Вход выполнен успешно");
        onClose();
      } else {
        const error = await res.json();
        alert("Ошибка входа: " + error.error);
        toast.error("Ошибка входа: " + error.error);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Что-то пошло не так");
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="auth">
          <div className="auth-header">
            <h2 className="auth-title">Вход в аккаунт</h2>
            <button className="close-button" onClick={onClose}>
              &times;
            </button>
          </div>

          <div className="auth-body">
            <form className="auth-form" onSubmit={handleLogin}>
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
              <div className="form-options">
                <label className="remember-label">
                  <input type="checkbox" name="remember" />
                  Запомни ме
                </label>
                <a href="#" className="forgot-link">
                  Забравена парола?
                </a>
              </div>
              <button type="submit" className="submit-button">
                Вход
              </button>
              <button
                type="button"
                className="register-button"
                onClick={onRegisterClick}
              >
                Регистрация
              </button>
              <div className="divider">или</div>
              <button type="button" className="google-button">
                <GoogleIcon />
                Влизане с Google
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AuthPage;
