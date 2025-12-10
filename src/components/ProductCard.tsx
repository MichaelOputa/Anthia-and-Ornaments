import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.featured && (
          <div className="absolute top-3 right-3 bg-amber-900 text-white px-3 py-1 text-xs tracking-wider rounded">
            FEATURED
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500 tracking-wider uppercase mb-1">
          {product.category}
        </p>
        <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        <p className="text-xl font-serif text-amber-900">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
