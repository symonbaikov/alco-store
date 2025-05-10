import { useEffect, useState } from 'react';
import { ProductCard } from './ProductCard';
// import { mockProducts } from './mock';
import './ProductCatalog.css';
import type { Product } from './types';

export function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        const res = await fetch('http://localhost:3001/api/products');
        if (!res.ok) throw new Error('Ошибка загрузки');
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (isLoading) return <div>Загрузка...</div>;
  if (hasError) return <div>Ошибка загрузки товаров</div>;

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
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
} 