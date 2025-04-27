import React from "react";
import { Slider } from "../../components/Slider/Slider";
import Features from "../../components/Features/Features";
import Categories from "../../components/Categories/Categories";
import PopularCategories from "../../components/PopularCategories/PopularCategories";
import { DrinkCategories } from "../../components/DrinkCategories/DrinkCategories";
import { Reviews } from '../../components/Reviews/Reviews';
import "./Home.css";

const Home: React.FC = () => {
  return (
    <div className="home">
      <Slider />
      <Categories />
      <Features />
      <PopularCategories />
      <DrinkCategories />
      <Reviews />
    </div>
  );
};
export default Home;
