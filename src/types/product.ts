export type ProductType = 'jewelry' | 'clothing' | 'wristwatch' | 'eyeglass' | 'perfume';

export type Currency = 'NGN' | 'USD';

export interface Product {
  id: string;
  name: string;
  type: ProductType;
  category: string;
  description: string;
  sizes?: string[];
  price: number;
  currency: Currency;
  image: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProductFormData {
  name: string;
  type: ProductType;
  category: string;
  description: string;
  sizes: string[];
  price: number;
  currency: Currency;
  image: string;
}

export function formatPrice(price: number | string | undefined, currency: Currency = 'NGN'): string {
  if (price === undefined || price === null || price === '') return '';
  
  if (typeof price === 'string') {
    if (price.includes('₦') || price.includes('$')) return price;
    const cleaned = parseFloat(price.replace(/[^0-9.]/g, ''));
    if (isNaN(cleaned)) return price;
    price = cleaned;
  }

  const symbol = currency === 'USD' ? '$' : '₦';
  return `${symbol}${price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}
