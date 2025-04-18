import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import "./AuthPage.css";

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const token = searchParams.get("token");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Пароли не совпадают");
      return;
    }

    if (!token) {
      toast.error("Неверная ссылка для сброса пароля");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      if (res.ok) {
        toast.success("Пароль успешно изменен");
        // Перенаправляем на страницу входа
        window.location.href = "/login";
      } else {
        const err = await res.json();
        toast.error(err.error);
      }
    } catch (error) {
      toast.error("Произошла ошибка при сбросе пароля");
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="auth">
        <div className="auth-header">
          <h2 className="auth-title">Сброс пароля</h2>
        </div>

        <div className="auth-body">
          <form className="auth-form" onSubmit={handleResetPassword}>
            <div className="form-group">
              <input
                type="password"
                placeholder="Новый пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Подтвердите пароль"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Сбросить пароль
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword; 