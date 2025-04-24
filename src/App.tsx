import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
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

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isAuthOpen, setIsAuthOpen] = React.useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = React.useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = React.useState(false);

  const handleRegisterClick = () => {
    setIsAuthOpen(false);
    setIsRegisterOpen(true);
  };

  const handleLoginClick = () => {
    setIsRegisterOpen(false);
    setIsAuthOpen(true);
    setIsForgotPasswordOpen(false);
  };

  const handleForgotPasswordClick = () => {
    setIsAuthOpen(false);
    setIsForgotPasswordOpen(true);
  };

  return (
    <AuthProvider>
      <div className="app">
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
          </Routes>
        </main>
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <AuthPage
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
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
