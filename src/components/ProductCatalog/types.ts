export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  oldPrice?: number;
  image?: string;
  inStock: boolean;
  availableText: string;
  article: string;
  discountPercent?: number;
  economy?: number;
  isClub?: boolean;
  isPromo?: boolean;
  categoryId?: number;
} 