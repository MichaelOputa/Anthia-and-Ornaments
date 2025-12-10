import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProductDetail } from './components/ProductDetail';
import { AdminPanel } from './components/AdminPanel';
import { Cart } from './components/Cart';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductPage';
import { AboutPage } from './pages/AboutPage';
import { Page, Product } from './types';
import { storageService } from './services/storage';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>(storageService.getProducts());
  const [cartItems, setCartItems] = useState(storageService.getCart());

  useEffect(() => {
    const handleProductsChange = () => {
      setProducts(storageService.getProducts());
    };

    window.addEventListener('storage', handleProductsChange);
    return () => window.removeEventListener('storage', handleProductsChange);
  }, []);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddProduct = (productData: Omit<Product, 'id' | 'order'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      order: products.length,
    };
    storageService.addProduct(newProduct);
    setProducts(storageService.getProducts());
  };

  const handleUpdateProduct = (id: string, updates: Partial<Product>) => {
    storageService.updateProduct(id, updates);
    setProducts(storageService.getProducts());
    if (selectedProduct?.id === id) {
      setSelectedProduct({ ...selectedProduct, ...updates });
    }
  };

  const handleDeleteProduct = (id: string) => {
    storageService.deleteProduct(id);
    setProducts(storageService.getProducts());
    if (selectedProduct?.id === id) {
      setSelectedProduct(null);
      handleNavigate('admin');
    }
  };

  const handleReorderProducts = (productIds: string[]) => {
    storageService.reorderProducts(productIds);
    setProducts(storageService.getProducts());
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    storageService.addToCart(product, quantity);
    setCartItems(storageService.getCart());
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    storageService.updateCartQuantity(productId, quantity);
    setCartItems(storageService.getCart());
  };

  const handleRemoveFromCart = (productId: string) => {
    storageService.removeFromCart(productId);
    setCartItems(storageService.getCart());
  };

  const handleClearCart = () => {
    storageService.clearCart();
    setCartItems([]);
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            products={products}
            onProductClick={handleProductClick}
            onNavigate={handleNavigate}
          />
        );
      case 'products':
        return <ProductsPage products={products} onProductClick={handleProductClick} />;
      case 'product-detail':
        return selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            onBack={() => handleNavigate('products')}
            onAddToCart={handleAddToCart}
          />
        ) : (
          <ProductsPage products={products} onProductClick={handleProductClick} />
        );
      case 'admin':
        return (
          <AdminPanel
            products={products}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onReorder={handleReorderProducts}
          />
        );
      case 'about':
        return <AboutPage />;
      case 'cart':
        return (
          <Cart
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveFromCart}
            onClearCart={handleClearCart}
          />
        );
      default:
        return <HomePage products={products} onProductClick={handleProductClick} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartItemCount={totalCartItems}
      />
      <main>{renderPage()}</main>
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-serif mb-4">ANTHIA & ORNAMENTS</h3>
              <p className="text-gray-400 text-sm">
                Making occasions better with elegance and style.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button onClick={() => handleNavigate('home')} className="hover:text-white transition-colors">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('products')} className="hover:text-white transition-colors">
                    Products
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('about')} className="hover:text-white transition-colors">
                    About
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>info@anthiaornaments.com</li>
                <li>+1 (555) 123-4567</li>
                <li>New York, NY 10001</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Anthia & Ornaments. All rights reserved.</p>
            <p className="mt-2">This is a demo e-commerce website.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
