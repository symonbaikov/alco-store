import React, { useState, useEffect } from "react";
import "./Slider.css";

interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
  link: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: "/images/slides/slide1.jpg",
    title: "Специальное предложение",
    description: "Скидка 20% на все вина",
    link: "/promotions",
  },
  {
    id: 2,
    image: "/images/slides/slide2.jpg",
    title: "Новые поступления",
    description: "Свежие напитки уже в продаже",
    link: "/new",
  },
  {
    id: 3,
    image: "/images/slides/slide3.jpg",
    title: "Акция недели",
    description: "Покупайте 2 бутылки по цене 1",
    link: "/weekly",
  },
];

const Slider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isPaused]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div
      className="slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="slider-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
              <a href={slide.link} className="slide-button">
                Подробнее
              </a>
            </div>
          </div>
        ))}
      </div>

      <button className="slider-button prev" onClick={prevSlide}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <button className="slider-button next" onClick={nextSlide}>
        <i className="fas fa-chevron-right"></i>
      </button>

      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
