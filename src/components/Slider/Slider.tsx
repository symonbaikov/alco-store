import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getSlides } from "../../../server/services/slides-service";
import SliderSkeleton from "./SliderSkeleton";
import "./Slider.css";

interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
  link: string;
  order: number;
}

export const Slider = () => {
  const { t } = useTranslation();
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
      }, 5000);
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
      role="region"
      aria-label="slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="slider-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
            role="article"
            aria-label={`slide ${index + 1}`}
            aria-hidden={index !== currentSlide}
          >
            <div className="slide-content">
              <h2>{t(`slides.${slide.order}.title`)}</h2>
              <p>{t(`slides.${slide.order}.description`)}</p>
              <a href={slide.link} className="slide-button">
                {t('common.moreInfo')}
              </a>
            </div>
          </div>
        ))}
      </div>

      <button 
        className="slider-button prev" 
        onClick={prevSlide}
        aria-label="previous slide"
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      <button 
        className="slider-button next" 
        onClick={nextSlide}
        aria-label="next slide"
      >
        <i className="fas fa-chevron-right"></i>
      </button>

      <div className="slider-dots" role="tablist">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            role="tab"
            aria-selected={index === currentSlide}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};