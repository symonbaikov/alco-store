import React from "react";
import Modal from "../Modal/Modal";
import "./Cart.css";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="cart">
        <div className="cart-header">
          <h2>Корзина</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="cart-body">
          <div className="cart-empty">
            <img
              src="/images/box.png"
              alt="Пустая корзина"
              className="cart-empty-image"
              style={{ width: 120, margin: '0 auto 16px', display: 'block', opacity: 0.85 }}
            />
            <div className="cart-empty-message" style={{ marginBottom: 12, color: '#666', fontSize: 18 }}>
              Корзина пуста
            </div>
            <button className="cart-continue-button" onClick={onClose} style={{ color: '#8b0000', textDecoration: 'underline', fontWeight: 500, background: 'none', border: 'none', fontSize: 16, cursor: 'pointer' }}>
              Продолжить выбор товаров
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Cart;
