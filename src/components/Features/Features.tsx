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
            <h3>Гарантирано</h3>
            <p>100% оригинални продукти</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-icon">
            <i className="fas fa-truck"></i>
          </div>
          <div className="feature-content">
            <h3>Бърза доставка</h3>
            <p>Изпращане на поръчки в рамките на 24 часа</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-icon">
            <i className="fas fa-headset"></i>
          </div>
          <div className="feature-content">
            <h3>Обратна връзка</h3>
            <p>Мениджър ще се свърже с вас до 15 минути</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-icon">
            <i className="fas fa-wine-bottle"></i>
          </div>
          <div className="feature-content">
            <h3>Собствен внос</h3>
            <p>Качествени алкохолни напитки от 37 държави по света</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
