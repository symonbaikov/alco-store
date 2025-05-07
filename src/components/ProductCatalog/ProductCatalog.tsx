import React from 'react';
import { ProductCard } from './ProductCard';
import { mockProducts } from './mock';
import './ProductCatalog.css';

export function ProductCatalog() {
  return (
    <section className="catalogSection">
      <div className="container">
        <h2 className="title">Лучшие предложения</h2>
        <div className="grid">
          {mockProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
} 