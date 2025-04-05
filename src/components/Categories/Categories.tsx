import React from "react";
import "./Categories.css";

const Categories: React.FC = () => {
  return (
    <section className="categories">
      <div className="categories-container">
        <div className="category-card">
          <span className="category-label">УСЛУГА</span>
          <img
            src="/images/mir4hh1fc4wnc9c678752h2z6j0dpd8k.jpg"
            alt="Дегустация на вина"
          />
          <div className="category-content">
            <h3>Дегустация на вина и сирена от Италия</h3>
          </div>
        </div>

        <div className="category-card">
          <span className="category-label">БЛОГ</span>
          <img
            src="/images/1usfz2uztycqbh8eupl35fb1xmlro1x4.jpg"
            alt="Освежаващи напитки"
          />
          <div className="category-content">
            <h3>Освежаващи и студени напитки</h3>
          </div>
        </div>

        <div className="category-card">
          <span className="category-label">ПРОМОЦИЯ</span>
          <img
            src="/images/ygye22g21kty21m5vmrz24lqv97zqe2v.jpg"
            alt="Специални предложения"
          />
          <div className="category-content">
            <h3>Актуални специални предложения за любими напитки</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
