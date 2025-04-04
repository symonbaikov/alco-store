import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.tsx";
import Cart from "./components/Cart/Cart";
import AuthPage from "./components/Auth/AuthPage";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <Router>
      <div className="app">
        <Navbar 
          onCartClick={() => setIsCartOpen(true)} 
          onAuthClick={() => setIsAuthOpen(true)}
        />
        <Routes>
          <Route path="/" element={<div>Главная страница</div>} />
          <Route path="/catalog" element={<div>Каталог</div>} />
          <Route path="/about" element={<div>О нас</div>} />
          <Route path="/contacts" element={<div>Контакты</div>} />
        </Routes>
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <AuthPage isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      </div>
    </Router>
  );
}

export default App;