export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  inStock: boolean;
  article: string;
  isClub: boolean;
  isPromo: boolean;
  discountPercent?: number;
  economy?: number;
  availableText?: string;
} 