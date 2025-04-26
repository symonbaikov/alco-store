import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import "./AuthPage.css";

const isPasswordValid = (password: string, t: (key: string) => string) => {
  if (password.length < 8) {
    return { isValid: false, error: t('resetPassword.passwordErrors.length') };
  }
  if (!/\d/.test(password)) {
    return { isValid: false, error: t('resetPassword.passwordErrors.digit') };
  }
  return { isValid: true, error: "" };
};

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const token = searchParams.get("token");
  const { t } = useTranslation();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    const passwordValidation = isPasswordValid(password, t);
    if (!passwordValidation.isValid) {
      toast.error(passwordValidation.error);
      return;
    }

    if (password !== confirmPassword) {
      toast.error(t('resetPassword.passwordsNotMatch'));
      return;
    }

    if (!token) {
      toast.error(t('resetPassword.invalidLink'));
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      if (res.ok) {
        toast.success(t('resetPassword.success'));
        // Перенаправляем на главную страницу
        window.location.href = "/";
      } else {
        const err = await res.json();
        toast.error(err.error);
      }
    } catch (error) {
      toast.error(t('resetPassword.error'));
    }
  };

  return (
    <>
      <div className="auth">
        <div className="auth-header">
          <h2 className="auth-title">{t('resetPassword.title')}</h2>
        </div>

        <div className="auth-body">
          <form className="auth-form" onSubmit={handleResetPassword} noValidate>
            <div className="form-group">
              <input
                type="password"
                placeholder={t('resetPassword.newPassword')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                pattern=".*"
              />
              <small className="password-requirements">
                {t('resetPassword.passwordRequirements')}
              </small>
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder={t('resetPassword.confirmPassword')}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                pattern=".*"
              />
            </div>
            <button type="submit" className="submit-button">
              {t('resetPassword.submit')}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword; 