import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./components/Cart/Cart";
import AuthPage from "./components/Auth/AuthPage";
import Home from "./pages/Home/Home";

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isAuthOpen, setIsAuthOpen] = React.useState(false);

  return (
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
          <Route path="/contacts" element={<div>Контакты</div>} />
        </Routes>
      </main>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <AuthPage isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
};

export default App;
