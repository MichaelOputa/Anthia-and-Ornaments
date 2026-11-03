import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ImageModal from '../components/ImageModal';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';

const gold = '#C9A84C';

export function ClothingCollection() {
  const { getProductsByType, loading } = useProducts();
  const clothingItems = getProductsByType('clothing');

  const [showAll, setShowAll] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; title: string } | null>(null);

  const displayed = useMemo(
    () => (showAll ? clothingItems : clothingItems.slice(0, 6)),
    [showAll, clothingItems]
  );

  const handleWhatsApp = (name: string) => {
    window.open(
      `https://wa.me/2348124238750?text=${encodeURIComponent(
        `Hello! I'm interested in the ${name}. Can you provide more details?`
      )}`,
      '_blank'
    );
  };

  const viewMoreBtn: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '13px 36px',
    borderRadius: '40px',
    fontWeight: 600,
    fontSize: '0.82rem',
    letterSpacing: '0.08em',
    background: 'transparent',
    color: gold,
    border: `1px solid rgba(201,168,76,0.3)`,
    cursor: 'pointer',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#080808' }}>
      <section
        style={{
          padding: '110px 16px 60px',
          background: 'linear-gradient(180deg, #0e0900 0%, #080808 100%)',
          borderBottom: '1px solid rgba(201,168,76,0.1)',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: gold,
            marginBottom: '14px',
          }}
        >
          Women's Collection
        </p>
        <h1
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            fontWeight: 300,
            color: '#e8dfc0',
            marginBottom: '16px',
          }}
        >
          Fashion Collection
        </h1>
        <p
          style={{
            fontSize: '1rem',
            color: '#6b5e3a',
            maxWidth: '480px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}
        >
          Discover our curated selection of premium clothing for every style
        </p>
      </section>

      <section style={{ padding: '60px 16px' }}>
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div style={{ textAlign: 'center', color: '#8c7d58', padding: '60px 0' }}>
              Loading fashion pieces...
            </div>
          ) : clothingItems.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#8c7d58', padding: '60px 0' }}>
              No clothing items available right now. Check back soon!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ marginBottom: '48px' }}>
              {displayed.map((item) => (
                <ProductCard
                  key={item.id}
                  name={item.name}
                  category={item.category}
                  description={item.description}
                  sizes={item.sizes}
                  price={item.price}
                  currency={item.currency}
                  image={item.image}
                  onView={() => setSelectedImage({ src: item.image, alt: item.name, title: item.name })}
                  onInquire={() => handleWhatsApp(item.name)}
                />
              ))}
            </div>
          )}

          {clothingItems.length > 6 && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button onClick={() => setShowAll(!showAll)} style={viewMoreBtn}>
                {showAll ? (
                  <>View Less <ChevronUp size={16} /></>
                ) : (
                  <>View More ({clothingItems.length - 6} more) <ChevronDown size={16} /></>
                )}
              </button>
            </div>
          )}
        </div>
      </section>
      <ImageModal
        isOpen={selectedImage !== null}
        imageSrc={selectedImage?.src || ''}
        imageAlt={selectedImage?.alt || ''}
        imageTitle={selectedImage?.title || ''}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
}

export default ClothingCollection;
