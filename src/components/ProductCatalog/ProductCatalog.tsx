import React from 'react';
import { ProductCard } from './ProductCard';
import { mockProducts } from './mock';
import './ProductCatalog.css';

export function ProductCatalog() {
  return (
    <section className="catalogSection">
      <div className="container">
        <div className="catalog-header">
          <h2 className="title">Лучшие предложения</h2>
          <ul className="catalog-categories">
            <li className="catalog-category active">Акция</li>
            <li className="catalog-category">Советуем</li>
            <li className="catalog-category">Новинки</li>
          </ul>
        </div>
        <div className="grid">
          {mockProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
} 