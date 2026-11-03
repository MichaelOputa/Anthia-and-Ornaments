import { useSearchParams, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import ImageModal from '../components/ImageModal';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';

const gold = '#C9A84C';

export default function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const query = searchParams.get('q') || '';
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; title: string } | null>(null);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.type.toLowerCase().includes(q) ||
      (p.sizes || []).some((size) => size.toLowerCase().includes(q))
    );
  }, [products, query]);

  const handleWhatsApp = (name: string) => {
    window.open(`https://wa.me/2348124238750?text=${encodeURIComponent(`Hello! I'm interested in the ${name}. Can you provide more details?`)}`, '_blank');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#080808' }}>
      <section style={{ padding: '110px 16px 60px', background: 'linear-gradient(180deg, #0e0900 0%, #080808 100%)', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
        <div className="max-w-7xl mx-auto">
          <button onClick={() => navigate(-1)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: gold, background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, marginBottom: '20px', padding: 0 }}>
            <ArrowLeft size={18} /> Back
          </button>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 300, color: '#e8dfc0', marginBottom: '10px' }}>
            Search Results
          </h1>
          <p style={{ fontSize: '1rem', color: '#6b5e3a' }}>
            {query ? `Results for "${query}"` : 'Enter a search query'}
          </p>
        </div>
      </section>

      <section style={{ padding: '60px 16px' }}>
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#6b5e3a' }}>
              Loading products...
            </div>
          ) : searchResults.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ fontSize: '1.2rem', color: '#6b5e3a', marginBottom: '28px' }}>
                {query ? 'No products found matching your search.' : 'Please enter a search term.'}
              </p>
              <button onClick={() => navigate('/')}
                style={{ padding: '13px 28px', borderRadius: '10px', fontSize: '0.88rem', fontWeight: 600, background: `linear-gradient(135deg, ${gold}, #E8C96A)`, color: '#080808', border: 'none', cursor: 'pointer' }}>
                Browse All Products
              </button>
            </div>
          ) : (
            <>
              <p style={{ fontSize: '0.9rem', color: '#6b5e3a', marginBottom: '32px' }}>
                Found {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {searchResults.map(product => (
                  <ProductCard
                    key={`${product.type}-${product.id}`}
                    name={product.name}
                    category={product.category}
                    description={product.description}
                    sizes={product.sizes}
                    price={product.price}
                    currency={product.currency}
                    image={product.image}
                    onView={() => setSelectedImage({ src: product.image, alt: product.name, title: product.name })}
                    onInquire={() => handleWhatsApp(product.name)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <ImageModal isOpen={selectedImage !== null} imageSrc={selectedImage?.src || ''} imageAlt={selectedImage?.alt || ''} imageTitle={selectedImage?.title || ''} onClose={() => setSelectedImage(null)} />
    </div>
  );
}