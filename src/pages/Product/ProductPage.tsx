import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Product } from '../../components/ProductCatalog/types';

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:3001/api/products/${id}`);
        if (!res.ok) throw new Error('Ошибка загрузки');
        const data = await res.json();
        setProduct(data);
      } catch (e) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (isLoading) return <div>Загрузка...</div>;
  if (hasError || !product) return <div>Товар не найден</div>;

  return (
    <div className="product-page-container" style={{ display: 'flex', gap: 40, marginTop: 40 }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img
          src={product.image || '/images/placeholder.png'}
          alt={product.name}
          style={{ maxHeight: 500, maxWidth: 400, objectFit: 'contain', marginBottom: 24 }}
        />
        {/* Миниатюры, если будут */}
      </div>
      <div style={{ flex: 2 }}>
        <h1 style={{ fontSize: 28, marginBottom: 16 }}>{product.name}</h1>
        <div style={{ marginBottom: 16, color: '#22c55e', fontWeight: 500 }}>В наличии</div>
        <div style={{ fontSize: 24, color: '#e11d48', fontWeight: 700, marginBottom: 8 }}>{product.price} грн</div>
        {product.oldPrice && (
          <div style={{ color: '#a3a3a3', textDecoration: 'line-through', marginBottom: 8 }}>{product.oldPrice} грн</div>
        )}
        {product.discountPercent && (
          <div style={{ color: '#b45309', marginBottom: 8 }}>Скидка: -{product.discountPercent}%</div>
        )}
        {product.economy && (
          <div style={{ color: '#374151', marginBottom: 8 }}>Экономия: {product.economy} грн</div>
        )}
        <div style={{ marginBottom: 16 }}>Артикул: <b>{product.article}</b></div>
        <button style={{ background: '#8b0000', color: '#fff', padding: '12px 32px', fontSize: 18, border: 'none', borderRadius: 4, cursor: 'pointer' }}>
          В корзину
        </button>
        {/* Характеристики, если есть */}
      </div>
    </div>
  );
} 