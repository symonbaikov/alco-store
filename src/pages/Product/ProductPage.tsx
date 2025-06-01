import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Product } from '../../components/ProductCatalog/types';

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!slug) {
      setHasError(true);
      setIsLoading(false);
      return;
    }
    async function fetchProduct() {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:3001/api/products/slug/${slug}`);
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
  }, [slug]);

  if (isLoading) return <div>{t('common.loading')}</div>;
  if (hasError || !product) return <div>{t('common.error')}</div>;

  return (
    <div className="product-page-container" style={{ display: 'flex', gap: 40, marginTop: 40 }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img
          src={product.image || '/images/placeholder.png'}
          alt={t(`product.${product.slug}.name`)}
          style={{ maxHeight: 500, maxWidth: 400, objectFit: 'contain', marginBottom: 24 }}
        />
      </div>
      <div style={{ flex: 2 }}>
        <h1 style={{ fontSize: 28, marginBottom: 16 }}>{t(`product.${product.slug}.name`)}</h1>
        <div style={{ marginBottom: 16, color: '#22c55e', fontWeight: 500 }}>{t('inStock')}</div>
        <div style={{ fontSize: 24, color: '#e11d48', fontWeight: 700, marginBottom: 8 }}>{product.price} лв.</div>
        {product.oldPrice && (
          <div style={{ color: '#a3a3a3', textDecoration: 'line-through', marginBottom: 8 }}>{product.oldPrice} лв.</div>
        )}
        {product.discountPercent && (
          <div style={{ color: '#b45309', marginBottom: 8 }}>{t('discount')}: -{product.discountPercent}%</div>
        )}
        {product.economy && (
          <div style={{ color: '#374151', marginBottom: 8 }}>{t('economy')}: {product.economy} грн</div>
        )}
        <div style={{ marginBottom: 16 }}>{t('article')}: <b>{product.article}</b></div>
        <button style={{ background: '#8b0000', color: '#fff', padding: '12px 32px', fontSize: 18, border: 'none', borderRadius: 4, cursor: 'pointer' }}>
          {t('addToCart')}
        </button>
        <div style={{ marginTop: 32, background: '#f9fafb', borderRadius: 8, padding: 24, maxWidth: 420 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>{t('description')}</h2>
          <div style={{ color: '#444', marginBottom: 12 }}>{t(`product.${product.slug}.description`)}</div>
        </div>
      </div>
    </div>
  );
} 