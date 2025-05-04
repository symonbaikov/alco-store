import React, { useState } from "react";
import Modal from "../Modal/Modal";
import toast, { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import "./AuthPage.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

const ForgotPassword: React.FC<Props> = ({ isOpen, onClose, onLoginClick }) => {
  const [email, setEmail] = useState("");
  const { t } = useTranslation();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3001/api/forgot-password/forgot-password", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      const data = await res.json();
      toast.success(t('forgotPassword.success'));
      onClose();
    } else {
      const err = await res.json();
      toast.error(t('forgotPassword.error') + err.error);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="auth">
          <div className="auth-header">
            <h2 className="auth-title">{t('forgotPassword.title')}</h2>
            <button className="close-button" onClick={onClose}>
              &times;
            </button>
          </div>

          <div className="auth-body">
            <form className="auth-form" onSubmit={handleRegister}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder={t('forgotPassword.email')}
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button type="submit" className="submit-button">
                {t('forgotPassword.submit')}
              </button>
              <button
                type="button"
                className="register-button"
                onClick={onLoginClick}
              >
                {t('forgotPassword.login')}
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ForgotPassword;
