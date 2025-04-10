import React, { useState, useEffect } from "react";
import { getSlides } from "../../api/slides";
import SliderSkeleton from "./SliderSkeleton";
import "./Slider.css";

interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
  link: string;
}

export const Slider = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSlides = async () => {
      try {
        const data = await getSlides();
        setSlides(data);
      } catch (error) {
        console.error("Error loading slides:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadSlides();
  }, []);

  useEffect(() => {
    if (!isPaused && slides.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [isPaused, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (isLoading) {
    return <SliderSkeleton />;
  }

  if (slides.length === 0) {
    return null;
  }

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
                Повече информация
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
