import { Product } from '../components/ProductCatalog/types';

export function isValidProduct(product: Product): boolean {
  return (
    !!product.name &&
    !!product.article &&
    typeof product.price === 'number' &&
    product.price > 0 &&
    !isNaN(product.price)
  );
}

export function incrementCount(count: number): number {
  return count + 1;
}

export function decrementCount(count: number): number {
  return count > 1 ? count - 1 : 1;
} 