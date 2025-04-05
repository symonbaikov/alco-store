import React from "react";
import "./Features.css";

const Features: React.FC = () => {
  return (
    <section className="features">
      <div className="features-container">
        <div className="feature-item">
          <div className="feature-icon">
            <i className="fas fa-certificate"></i>
          </div>
          <div className="feature-content">
            <h3>Гарантированно</h3>
            <p>100% оригинальная продукция</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-icon">
            <i className="fas fa-truck"></i>
          </div>
          <div className="feature-content">
            <h3>Быстрая доставка</h3>
            <p>Отправка заказов в течение 24 часов</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-icon">
            <i className="fas fa-headset"></i>
          </div>
          <div className="feature-content">
            <h3>Обратная связь</h3>
            <p>Менеджер свяжется с вами в течение 15 минут</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-icon">
            <i className="fas fa-wine-bottle"></i>
          </div>
          <div className="feature-content">
            <h3>Собственный импорт</h3>
            <p>Качественные алкогольные напитки из 37 стран мира</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
