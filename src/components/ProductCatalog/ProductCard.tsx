import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from './types';
import { isValidProduct, incrementCount, decrementCount } from '../../utils/cardValidation';
import './ProductCard.css';
import { useTranslation } from 'react-i18next';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { t } = useTranslation();
  if (!isValidProduct(product)) {
    return null;
  }

  const [count, setCount] = useState(1);

  const displayName =
    product.name.length > 60
      ? product.name.slice(0, 57) + '...'
      : product.name;

  return (
    <Link to={`/${product.slug}/`} className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
      {/* Бейджи */}
      <div className="badges">
        {product.isClub && (
          <span className="badgeClub">CLUB CARD</span>
        )}
        {product.isPromo && (
          <span className="badgePromo">Акция</span>
        )}
      </div>
      {/* Картинка */}
      <div className="imageWrap">
        <img
          src={product.image || '/images/placeholder.png'}
          alt={displayName}
          className="image"
          loading="lazy"
          width={180}
          height={180}
          onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/placeholder.png'; }}
        />
      </div>
      {/* Название */}
      <div className="name" title={product.name}>
        {product.slug
          ? t(`product.${product.slug}.name`)
          : product.translationKey
            ? t(`product.${product.translationKey}.name`)
            : product.name}
      </div>
      {/* Наличие, артикул */}
      <div className="meta">
        <span className={product.inStock ? "inStock" : "outStock"}>{product.availableText}</span>
        <span className="article">Арт: {product.article}</span>
      </div>
      {/* Цена */}
      <div className="priceRow">
        <span className="price">{product.price} лв.</span>
        {product.oldPrice && (
          <span className="oldPrice">{product.oldPrice} лв.</span>
        )}
      </div>
      {/* Экономия и скидка */}
      {(product.discountPercent || product.economy) && (
        <div className="discountRow">
          {product.discountPercent && (
            <span className="discount">-{product.discountPercent}%</span>
          )}
          {product.economy && (
            <span className="economy">Экономия {product.economy} грн</span>
          )}
        </div>
      )}
      {/* Счетчик и кнопка */}
      <div className="actions" onClick={e => e.preventDefault()}>
        <div className="counter">
          <button
            className="counterBtn"
            aria-label="Уменьшить"
            onClick={() => setCount(c => decrementCount(c))}
            disabled={count === 1}
          >
            -
          </button>
          <span className="counterValue">{count}</span>
          <button
            className="counterBtn"
            aria-label="Увеличить"
            onClick={() => setCount(c => incrementCount(c))}
          >
            +
          </button>
        </div>
        <button
          disabled={!product.inStock}
          className="button"
        >
          {product.inStock ? 'В корзину' : 'Нет в наличии'}
        </button>
      </div>
    </Link>
  );
} 