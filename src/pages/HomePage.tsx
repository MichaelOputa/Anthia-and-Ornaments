import { Sparkles, TrendingUp, Award } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';

interface HomePageProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onNavigate: (page: 'products') => void;
}

export function HomePage({ products, onProductClick, onNavigate }: HomePageProps) {
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  const newArrivals = products.slice(0, 3);

  return (
    <div>
      <section className="relative h-[70vh] flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-gray-50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2Y1OWU0MiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>

        <div className="relative text-center px-4">
          <div className="inline-block mb-6 animate-fade-in">
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-gray-900 mb-4 animate-slide-up">
            ANTHIA & ORNAMENTS
          </h1>
          <p className="text-lg md:text-xl tracking-[0.3em] text-gray-600 mb-8 animate-slide-up">
            OCCASIONS MADE BETTER
          </p>
          <button
            onClick={() => onNavigate('products')}
            className="bg-amber-900 text-white px-8 py-4 rounded-lg hover:bg-amber-800 transition-all duration-300 transform hover:scale-105 tracking-wider animate-fade-in"
          >
            EXPLORE COLLECTION
          </button>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 hover:bg-amber-50 rounded-lg transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                <Sparkles className="h-8 w-8 text-amber-900" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Handcrafted Excellence
              </h3>
              <p className="text-gray-600">
                Each piece is carefully crafted with attention to detail
              </p>
            </div>

            <div className="p-6 hover:bg-amber-50 rounded-lg transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                <Award className="h-8 w-8 text-amber-900" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Premium Quality
              </h3>
              <p className="text-gray-600">
                Only the finest materials for lasting beauty
              </p>
            </div>

            <div className="p-6 hover:bg-amber-50 rounded-lg transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                <TrendingUp className="h-8 w-8 text-amber-900" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Timeless Designs
              </h3>
              <p className="text-gray-600">
                Classic styles that never go out of fashion
              </p>
            </div>
          </div>
        </div>
      </section>

      {featuredProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
                Featured Collection
              </h2>
              <p className="text-gray-600">
                Discover our most beloved pieces
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => onProductClick(product)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {newArrivals.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
                New Arrivals
              </h2>
              <p className="text-gray-600">
                Fresh additions to our collection
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {newArrivals.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => onProductClick(product)}
                />
              ))}
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() => onNavigate('products')}
                className="border-2 border-amber-900 text-amber-900 px-8 py-3 rounded-lg hover:bg-amber-900 hover:text-white transition-all duration-300 tracking-wider"
              >
                VIEW ALL PRODUCTS
              </button>
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-gradient-to-br from-amber-900 to-amber-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">
            Make Every Occasion Special
          </h2>
          <p className="text-lg mb-8 text-amber-100">
            Discover jewelry and fashion that celebrates life's beautiful moments
          </p>
          <button
            onClick={() => onNavigate('products')}
            className="bg-white text-amber-900 px-8 py-4 rounded-lg hover:bg-amber-50 transition-all duration-300 transform hover:scale-105 tracking-wider font-medium"
          >
            START SHOPPING
          </button>
        </div>
      </section>
    </div>
  );
}
