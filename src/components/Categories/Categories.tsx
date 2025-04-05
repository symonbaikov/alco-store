import React from "react";
import "./Categories.css";

const Categories: React.FC = () => {
  return (
    <section className="categories">
      <div className="categories-container">
        <div className="category-card">
          <span className="category-label">УСЛУГА</span>
          <img src="/images/categories/wine-tasting.jpg" alt="Дегустация вин" />
          <div className="category-content">
            <h3>Дегустация вин и сыров Италии</h3>
          </div>
        </div>

        <div className="category-card">
          <span className="category-label">БЛОГ</span>
          <img
            src="/images/categories/cocktails.jpg"
            alt="Освежающие напитки"
          />
          <div className="category-content">
            <h3>Освежающие и прохладные напитки</h3>
          </div>
        </div>

        <div className="category-card">
          <span className="category-label">АКЦИЯ</span>
          <img
            src="/images/categories/special-offer.jpg"
            alt="Спецпредложения"
          />
          <div className="category-content">
            <h3>Актуальные спецпредложения на любимые напитки</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
