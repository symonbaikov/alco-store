import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import "./AuthPage.css";

const isPasswordValid = (password: string) => {
  if (password.length < 8) {
    return { isValid: false, error: "Пароль должен содержать минимум 8 символов" };
  }
  if (!/\d/.test(password)) {
    return { isValid: false, error: "Пароль должен содержать хотя бы одну цифру" };
  }
  return { isValid: true, error: "" };
};

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const token = searchParams.get("token");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    const passwordValidation = isPasswordValid(password);
    if (!passwordValidation.isValid) {
      toast.error(passwordValidation.error);
      return;
    }

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
        // Перенаправляем на главную страницу
        window.location.href = "/";
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
      <div className="auth">
        <div className="auth-header">
          <h2 className="auth-title">Сброс пароля</h2>
        </div>

        <div className="auth-body">
          <form className="auth-form" onSubmit={handleResetPassword} noValidate>
            <div className="form-group">
              <input
                type="password"
                placeholder="Новый пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                pattern=".*"
              />
              <small className="password-requirements">
                Пароль должен содержать минимум 8 символов и хотя бы одну цифру
              </small>
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Подтвердите пароль"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                pattern=".*"
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