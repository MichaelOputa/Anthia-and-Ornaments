import { useState } from 'react';
import { Filter } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';

interface ProductsPageProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

export function ProductsPage({ products, onProductClick }: ProductsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');

  const filteredProducts = products.filter(
    product => selectedCategory === 'all' || product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'featured':
      default:
        return b.featured ? 1 : -1;
    }
  });

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'jewelry', label: 'Jewelry' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'accessories', label: 'Accessories' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mb-2">
            Our Collection
          </h1>
          <p className="text-gray-600">
            Explore our curated selection of jewelry, clothing, and accessories
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    selectedCategory === category.value
                      ? 'bg-amber-900 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">Sort by:</label>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-900 focus:border-transparent"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {sortedProducts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => onProductClick(product)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No products found in this category.
            </p>
          </div>
        )}

        {sortedProducts.length > 0 && (
          <div className="mt-8 text-center text-sm text-gray-500">
            Showing {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
          </div>
        )}
      </div>
    </div>
  );
}
