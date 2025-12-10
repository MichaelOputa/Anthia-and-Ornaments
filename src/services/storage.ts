import { Product, CartItem } from '../types';

const PRODUCTS_KEY = 'anthia_products';
const CART_KEY = 'anthia_cart';

export const storageService = {
  getProducts(): Product[] {
    const data = localStorage.getItem(PRODUCTS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveProducts(products: Product[]): void {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  },

  addProduct(product: Product): void {
    const products = this.getProducts();
    products.push(product);
    this.saveProducts(products);
  },

  updateProduct(id: string, updates: Partial<Product>): void {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updates };
      this.saveProducts(products);
    }
  },

  deleteProduct(id: string): void {
    const products = this.getProducts().filter(p => p.id !== id);
    this.saveProducts(products);
  },

  reorderProducts(productIds: string[]): void {
    const products = this.getProducts();
    const reordered = productIds.map((id, index) => {
      const product = products.find(p => p.id === id);
      return product ? { ...product, order: index } : null;
    }).filter(Boolean) as Product[];

    this.saveProducts(reordered);
  },

  getCart(): CartItem[] {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveCart(cart: CartItem[]): void {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  },

  addToCart(product: Product, quantity: number = 1): void {
    const cart = this.getCart();
    const existingItem = cart.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }

    this.saveCart(cart);
  },

  updateCartQuantity(productId: string, quantity: number): void {
    const cart = this.getCart();
    const item = cart.find(item => item.product.id === productId);

    if (item) {
      item.quantity = quantity;
      this.saveCart(cart);
    }
  },

  removeFromCart(productId: string): void {
    const cart = this.getCart().filter(item => item.product.id !== productId);
    this.saveCart(cart);
  },

  clearCart(): void {
    localStorage.removeItem(CART_KEY);
  }
};
