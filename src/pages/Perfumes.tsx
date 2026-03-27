// ─── Perfumes.tsx ─────────────────────────────────────────────────────────────
import { useState } from 'react';
import ImageModal from '../components/ImageModal';
import ProductCard from '../components/ProductCard';

const gold = '#C9A84C';

const perfumesItems = [
  { name: 'Pana Dora Swiss Oud', image: '/images/pandora.jpeg', price: '₦125,000', description: 'Experience the allure — captivate your senses and leave a lasting impression.' },
  { name: 'Qaed Al Fursan', image: '/images/perfume_12.jpeg', price: '₦40,000', description: 'A bold, refined fragrance for the distinguished individual.' },
  { name: 'Emporio Armani Stronger With You + Lattafa Pride Vintage Radio', image: '/images/perfume_13.jpeg', price: '₦140,000', description: 'Two iconic scents, one unforgettable statement.' },
  { name: 'Club de Nuit Int', image: '/images/perfume_1.JPG', price: '₦65,000', description: 'Crafted to captivate your senses and leave a lasting impression.' },
  { name: 'KHAMRAH Perfume', image: '/images/perfume_2.JPG', price: '₦12,000', description: 'Crafted to captivate your senses and leave a lasting impression.' },
  { name: 'SAHEB Perfume', image: '/images/perfume_3.JPG', price: '₦12,000', description: 'Crafted to captivate your senses and leave a lasting impression.' },
  { name: 'ASAD Lattafa Perfume', image: '/images/perfume_4.JPG', price: '₦47,000', description: 'Crafted to captivate your senses and leave a lasting impression.' },
  { name: 'The Official Crystal Intense', image: '/images/perfume_5.JPG', price: '₦12,000', description: 'Crafted to captivate your senses and leave a lasting impression.' },
  { name: 'AZZARO THE MOST WANTED', image: '/images/perfume_6.JPG', price: '₦38,000', description: 'Crafted to captivate your senses and leave a lasting impression.' },
  { name: 'Ard Al Zaafaran Mousuf EDP', image: '/images/perfume_7.JPG', price: '₦20,000', description: 'Crafted to captivate your senses and leave a lasting impression.' },
  { name: 'NOW (RAVE) Perfume', image: '/images/perfume_8.JPG', price: '₦19,000', description: 'Crafted to captivate your senses and leave a lasting impression.' },
  { name: 'SUPREMACY Perfume', image: '/images/perfume_9.JPG', price: '₦65,000', description: 'Crafted to captivate your senses and leave a lasting impression.' },
  { name: '9 PM Fragrance', image: '/images/perfume_11.JPG', price: '₦12,000', description: 'Crafted to captivate your senses and leave a lasting impression.' },
];

export function Perfumes() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; title: string } | null>(null);

  const handleWhatsApp = (name: string) => {
    window.open(`https://wa.me/2348124238750?text=${encodeURIComponent(`Hello! I'm interested in the ${name}. Can you provide more details?`)}`, '_blank');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#080808' }}>
      <section style={{ padding: '110px 16px 60px', background: 'linear-gradient(180deg, #0e0900 0%, #080808 100%)', borderBottom: '1px solid rgba(201,168,76,0.1)', textAlign: 'center' }}>
        <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: gold, marginBottom: '14px' }}>Signature Scents</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 300, color: '#e8dfc0', marginBottom: '16px' }}>Perfumes Collection</h1>
        <p style={{ fontSize: '1rem', color: '#6b5e3a', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>Discover our premium selection of designer fragrances, crafted to captivate your senses.</p>
      </section>

      <section style={{ padding: '60px 16px' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {perfumesItems.map((item, index) => (
              <ProductCard
                key={index}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                onView={() => setSelectedImage({ src: item.image, alt: item.name, title: item.name })}
                onInquire={() => handleWhatsApp(item.name)}
              />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 16px', background: '#0e0900', borderTop: '1px solid rgba(201,168,76,0.1)', textAlign: 'center' }}>
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 400, color: '#e8dfc0', marginBottom: '14px' }}>More Fragrances Coming Soon</h2>
          <p style={{ fontSize: '0.9rem', color: '#6b5e3a', marginBottom: '28px' }}>We're constantly adding new perfumes. Contact us to be notified.</p>
          <a href="https://wa.me/2348124238750?text=I%20would%20like%20to%20know%20about%20new%20perfumes%20coming%20soon."
            target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 28px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600, background: '#25d366', color: 'white', textDecoration: 'none' }}>
            Contact Us on WhatsApp
          </a>
        </div>
      </section>

      <ImageModal isOpen={selectedImage !== null} imageSrc={selectedImage?.src || ''} imageAlt={selectedImage?.alt || ''} imageTitle={selectedImage?.title || ''} onClose={() => setSelectedImage(null)} />
    </div>
  );
}

export default Perfumes;