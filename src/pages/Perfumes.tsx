import { useState } from 'react';
import ImageModal from '../components/ImageModal';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';

const gold = '#C9A84C';
const whatsappNumber = '2348124238750';

export default function Perfumes() {
  const { getProductsByType, loading } = useProducts();
  const perfumes = getProductsByType('perfume');
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; title: string } | null>(null);

  const handleWhatsApp = (name: string) => {
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hello! I'm interested in the ${name}. Can you provide more details?`)}`,
      '_blank'
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: '#080808' }}>
      <section style={{ padding: '110px 16px 60px', background: 'linear-gradient(180deg, #0e0900 0%, #080808 100%)', borderBottom: '1px solid rgba(201,168,76,0.1)', textAlign: 'center' }}>
        <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: gold, marginBottom: '14px' }}>
          Fragrance Collection
        </p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 300, color: '#e8dfc0', marginBottom: '16px' }}>
          Perfumes
        </h1>
        <p style={{ fontSize: '1rem', color: '#6b5e3a', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
          Discover fragrances selected to leave a lasting impression.
        </p>
      </section>

      <section style={{ padding: '60px 16px' }}>
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div style={{ textAlign: 'center', color: '#8c7d58', padding: '60px 0' }}>Loading perfumes...</div>
          ) : perfumes.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#8c7d58', padding: '60px 0' }}>No perfumes available right now. Check back soon!</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {perfumes.map((product) => (
                <ProductCard
                  key={product.id}
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
