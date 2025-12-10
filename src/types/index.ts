export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'jewelry' | 'clothing' | 'accessories';
  imageUrl: string;
  featured: boolean;
  order: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Page = 'home' | 'products' | 'product-detail' | 'admin' | 'about' | 'cart';
