import { useState } from 'react';
import { ZoomIn, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export function ProductDetail({ product, onBack, onAddToCart }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    alert(`Added ${quantity} ${product.name} to cart!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-amber-900 mb-6 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Products
      </button>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="relative">
          <div
            className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-zoom-in"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
              style={
                isZoomed
                  ? {
                      transform: 'scale(2)',
                      transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                      transition: 'transform 0.1s ease-out',
                    }
                  : undefined
              }
            />
            {!isZoomed && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-10 transition-all">
                <ZoomIn className="h-8 w-8 text-white opacity-0 hover:opacity-100 transition-opacity" />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="mb-2">
            <span className="text-sm text-gray-500 tracking-wider uppercase">
              {product.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
            {product.name}
          </h1>

          <p className="text-3xl font-serif text-amber-900 mb-6">
            ${product.price.toFixed(2)}
          </p>

          <div className="prose prose-sm text-gray-600 mb-8">
            <p>{product.description}</p>
          </div>

          <div className="border-t border-gray-200 pt-6 mt-auto">
            <div className="flex items-center space-x-4 mb-6">
              <label className="text-sm text-gray-700 font-medium">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  -
                </button>
                <span className="px-6 py-2 border-x border-gray-300">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-amber-900 text-white py-4 rounded-lg hover:bg-amber-800 transition-colors flex items-center justify-center space-x-2 group"
            >
              <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="tracking-wider">ADD TO CART</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
