import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./components/Cart/Cart";
import AuthPage from "./components/Auth/AuthPage";
import RegisterPage from "./components/Auth/RegisterPage";
import Home from "./pages/Home/Home";
import Contacts from "./pages/Contacts/Contacts";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import ProfilePage from "./pages/Profile/ProfilePage";
import Footer from "./components/Footer/Footer";
import { AuthProvider } from "./context/AuthContext";
import { useAuthContext } from "./context/AuthContext";
import { useTranslation } from 'react-i18next';
import toast, { Toaster } from 'react-hot-toast';
import authService from "./services/auth.service";

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isAuthOpen, setIsAuthOpen] = React.useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = React.useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = React.useState(false);
  const [isAuthInProgress, setIsAuthInProgress] = React.useState(false);
  const navigate = useNavigate();
  const { refetch } = useAuthContext();
  const { t } = useTranslation();

  // Проверяем наличие сохраненного отзыва при загрузке приложения
  useEffect(() => {
    const pendingReview = localStorage.getItem('pendingReview');
    if (pendingReview === 'true') {
      setIsAuthOpen(true);
    }
  }, []);

  // Добавляем обработчик события для открытия модального окна авторизации
  useEffect(() => {
    const handleOpenAuth = () => {
      setIsAuthOpen(true);
    };

    window.addEventListener('openAuth', handleOpenAuth);
    return () => {
      window.removeEventListener('openAuth', handleOpenAuth);
    };
  }, []);

  // Добавляем обработку параметров URL для Google Auth
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authStatus = params.get('auth');
    
    if (authStatus === 'success' && !isAuthInProgress) {
      setIsAuthInProgress(true);
      (async () => {
        await refetch();
        toast.success(t('auth.success'));
        setIsAuthOpen(false);
        setIsRegisterOpen(false);
        
        // Проверяем, есть ли отложенный отзыв
        const pendingReview = localStorage.getItem('pendingReview');
        if (pendingReview === 'true') {
          // Перенаправляем на страницу с отзывами
          navigate('/#reviews', { replace: true });
        } else {
          // Если нет отложенного отзыва, просто очищаем URL
          navigate('/', { replace: true });
        }
        
        setIsAuthInProgress(false);
      })();
    } else if (authStatus === 'error') {
      toast.error(t('auth.googleError'));
      // Очищаем URL от параметров
      navigate('/', { replace: true });
    }
  }, [t, refetch, navigate, isAuthInProgress]);

  const handleAuthClose = () => {
    setIsAuthOpen(false);
    const pendingReview = localStorage.getItem('pendingReview');
    if (pendingReview === 'true') {
      localStorage.removeItem('pendingReview');
    }
  };

  const handleRegisterClick = () => {
    setIsAuthOpen(false);
    setIsRegisterOpen(true);
    setIsForgotPasswordOpen(false);
  };

  const handleLoginClick = () => {
    setIsRegisterOpen(false);
    setIsAuthOpen(true);
    setIsForgotPasswordOpen(false);
  };

  const handleForgotPasswordClick = () => {
    setIsAuthOpen(false);
    setIsRegisterOpen(false);
    setIsForgotPasswordOpen(true);
  };

  return (
    <AuthProvider>
      <div className="app">
        <Toaster position="top-center" />
        <Navbar
          onCartClick={() => setIsCartOpen(true)}
          onAuthClick={() => setIsAuthOpen(true)}
        />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<div>Каталог</div>} />
            <Route path="/about" element={<div>О нас</div>} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<Home />} />
            <Route path="/register" element={<Home />} />
          </Routes>
        </main>
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <AuthPage
          isOpen={isAuthOpen}
          onClose={handleAuthClose}
          onRegisterClick={handleRegisterClick}
          onForgotPasswordClick={handleForgotPasswordClick}
        />
        <RegisterPage
          isOpen={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
          onLoginClick={handleLoginClick}
        />
        <ForgotPassword
          isOpen={isForgotPasswordOpen}
          onClose={() => setIsForgotPasswordOpen(false)}
          onLoginClick={handleLoginClick}
        />
      </div>
      <Footer />
    </AuthProvider>
  );
};

export default App;
