import React from "react";
import { Slider } from "../../components/Slider/Slider";
import Features from "../../components/Features/Features";
import Categories from "../../components/Categories/Categories";
import PopularCategories from "../../components/PopularCategories/PopularCategories";
import { ProductCatalog } from "../../components/ProductCatalog/ProductCatalog";
import { DrinkCategories } from "../../components/DrinkCategories/DrinkCategories";
import { Reviews } from '../../components/Reviews/Reviews';
import { Blog } from '../../components/Blog/Blog';
import BulgarianShowcase from '../../components/BulgarianShowcase/BulgarianShowcase';
import ArticleList from '../../components/Article/Article';
import InfoSection from '../../components/InfoSection/InfoSection';
import "./Home.css";

const Home: React.FC = () => {
  return (
    <div className="home">
      <Slider />
      <Categories />
      <Features />
      <PopularCategories />
      <ProductCatalog />
      <DrinkCategories />
      <Reviews />
      <Blog />
      <BulgarianShowcase />
      <ArticleList />
      <InfoSection />
    </div>
  );
};
export default Home;
