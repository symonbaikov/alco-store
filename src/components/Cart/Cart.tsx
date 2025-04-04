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
            <div className="cart-empty-message">Корзина пуста</div>
            <button className="cart-continue-button" onClick={onClose}>
              Продолжить выбор товаров
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Cart;