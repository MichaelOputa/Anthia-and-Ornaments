import { useState } from 'react';
import ImageModal from '../components/ImageModal';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';

const gold = '#C9A84C';

export default function Eyeglasses() {
  const { getProductsByType, loading } = useProducts();
  const eyeglassItems = getProductsByType('eyeglass');

  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; title: string } | null>(null);

  const handleWhatsApp = (name: string) => {
    window.open(
      `https://wa.me/2348124238750?text=${encodeURIComponent(
        `Hello! I'm interested in the ${name}. Can you provide more details?`
      )}`,
      '_blank'
    );
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
          Premium Frames
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
          Eyeglasses Collection
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
          Discover our premium selection of designer eyeglasses, crafted for style and comfort.
        </p>
      </section>

      <section style={{ padding: '60px 16px' }}>
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div style={{ textAlign: 'center', color: '#8c7d58', padding: '60px 0' }}>
              Loading eyeglasses...
            </div>
          ) : eyeglassItems.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#8c7d58', padding: '60px 0' }}>
              No eyeglasses available right now. Check back soon!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" style={{ marginBottom: '48px' }}>
              {eyeglassItems.map((item) => (
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
            More Styles Coming Soon
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#6b5e3a', marginBottom: '28px' }}>
            We're constantly adding new eyeglass styles. Contact us to be notified of new arrivals.
          </p>
          <a
            href="https://wa.me/2348124238750?text=I%20would%20like%20to%20know%20about%20new%20eyeglass%20collections%20coming%20soon."
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
            Contact Us on WhatsApp
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
