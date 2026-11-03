import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ImageModal from '../components/ImageModal';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';

const gold = '#C9A84C';
const INITIAL_COUNT = 8;

export default function Wristwatches() {
  const { getProductsByType, loading } = useProducts();
  const wristwatchItems = getProductsByType('wristwatch');

  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; title: string } | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayedItems = useMemo(
    () => (showAll ? wristwatchItems : wristwatchItems.slice(0, INITIAL_COUNT)),
    [showAll, wristwatchItems]
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
    transition: 'background 0.2s',
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
          Time Elevated
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
          Wristwatch Collection
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
          Each piece designed to add elegance and sparkle to your style.
        </p>
      </section>

      <section style={{ padding: '60px 16px' }}>
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div style={{ textAlign: 'center', color: '#8c7d58', padding: '60px 0' }}>
              Loading wristwatches...
            </div>
          ) : wristwatchItems.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#8c7d58', padding: '60px 0' }}>
              No wristwatches available right now. Check back soon!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" style={{ marginBottom: '40px' }}>
              {displayedItems.map((item) => (
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

          {wristwatchItems.length > INITIAL_COUNT && (
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <button
                onClick={() => setShowAll(!showAll)}
                style={viewMoreBtn}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.1)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
              >
                {showAll ? (
                  <>View Less <ChevronUp size={16} /></>
                ) : (
                  <>View More ({wristwatchItems.length - INITIAL_COUNT} more) <ChevronDown size={16} /></>
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      <section
        style={{
          padding: '60px 16px',
          background: '#0e0900',
          borderTop: '1px solid rgba(201,168,76,0.1)',
          textAlign: 'center',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h2
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
              fontWeight: 400,
              color: '#e8dfc0',
              marginBottom: '14px',
            }}
          >
            Interested in Our Wristwatches?
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#6b5e3a', marginBottom: '28px' }}>
            Contact us on WhatsApp to inquire about availability, pricing, and custom orders.
          </p>
          <a
            href="https://wa.me/2348124238750?text=Hello! I'm interested in your wristwatch collection."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '13px 28px',
              borderRadius: '10px',
              fontSize: '0.85rem',
              fontWeight: 600,
              background: '#25d366',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            Chat on WhatsApp
          </a>
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
