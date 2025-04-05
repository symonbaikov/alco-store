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
    image: "/images/14.03-SHOK-CENA-DOMAINE-BOYAR-3l.webp",
    title: "Специално предложение",
    description: "Domaine Boyar 3L на шокова цена",
    link: "/promotions",
  },
  {
    id: 2,
    image: "/images/01.04-Shok-Cena-Jack-Daniels.webp",
    title: "Нови продукти",
    description: "Jack Daniel's на специална цена",
    link: "/new",
  },
  {
    id: 3,
    image: "/images/01.04-Shok-Cena-Beluga-1l.webp",
    title: "Промоция на седмицата",
    description: "Beluga 1L на изгодна цена",
    link: "/weekly",
  },
  {
    id: 4,
    image: "/images/01.04-Shok-Cena-Uzo-12.webp",
    title: "Специална оферта",
    description: "Узо 12 на промоционална цена",
    link: "/promotions",
  },
  {
    id: 5,
    image: "/images/01.04-Shok-Cena-Jim-Beam-Honey.webp",
    title: "Нова промоция",
    description: "Jim Beam Honey на специална цена",
    link: "/promotions",
  },
];

const Slider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 3000);
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
