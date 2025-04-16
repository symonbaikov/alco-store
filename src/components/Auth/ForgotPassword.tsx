import React, { useState } from "react";
import Modal from "../Modal/Modal";
import toast, { Toaster } from 'react-hot-toast';
import "./AuthPage.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

const RegisterPage: React.FC<Props> = ({ isOpen, onClose, onLoginClick }) => {
  const [email, setEmail] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();


    const res = await fetch("http://localhost:3001/api/forgot-password/forgot-password", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email}),
    });

    if (res.ok) {
      const data = await res.json();
      console.log("✅ Востановяване на паролата е изпратено на имейла:", data);
      toast.success("Востановяване на паролата е изпратено на имейла");
      onClose();
    } else {
      const err = await res.json();
      toast.error("Ошибка: " + err.error);
    }
  };

  return (
    <>
    <Toaster position="top-center" />
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="auth">
        <div className="auth-header">
          <h2 className="auth-title">Восстановление на парола</h2>
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
            <button type="submit" className="submit-button">
              Востанови паролата
            </button>
            <button
              type="button"
              className="register-button"
              onClick={onLoginClick}
            >
              Вход в аккаунт
            </button>
          </form>
        </div>
      </div>
    </Modal>
    </>
  );
};

export default RegisterPage;
