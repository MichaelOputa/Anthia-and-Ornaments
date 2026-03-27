// ─── Clothing.tsx ────────────────────────────────────────────────────────────
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ImageModal from '../components/ImageModal';
import ProductCard from '../components/ProductCard';

const gold = '#C9A84C';

const clothingItems = [
  { id: 1, name: 'The Green Regal Poise Gown ✨', price: 25000, image: '/images/clothing_3.png', category: 'Gown', description: 'Statement kaftan-style gown from brocade fabric. Perfect for cultural gatherings and everyday luxury.' },
  { id: 2, name: 'The Orange Regal Poise Gown ✨', price: 25000, image: '/images/clothing_6.png', category: 'Gown', description: 'Statement kaftan-style gown from brocade fabric. Heritage in motion. 💛' },
  { id: 6, name: 'The Classic Ivory Boubou 🤍', price: 16000, image: '/images/clothing_7.png', category: 'Boubou', description: 'Soft luxury flowing, free-size boubou. Available in multiple colours. Perfect for outings and events.' },
  { id: 7, name: 'The Royal Violet Poise Gown ✨', price: 25000, image: '/images/clothing_8.png', category: 'Gown', description: 'Statement kaftan-style brocade gown for cultural gatherings and everyday luxury.' },
  { id: 8, name: 'The Aurelia Heritage Boubou ✨', price: 25000, image: '/images/clothing_9.png', category: 'Boubou', description: 'Royal mustard gold with intricate woven embroidery along a deep V-neckline. 💛' },
  { id: 9, name: 'Aurelia Flow 🤍', price: 16000, image: '/images/clothing_10.png', category: 'Gown', description: 'Soft V-neckline, adjustable tie sleeves, cinched waist. Where strength meets softness. ✨' },
  { id: 10, name: 'The Rosé Whisper Boubou 🎀', price: 16000, image: '/images/clothing_11.png', category: 'Dresses', description: 'Flowing free-fit silhouette with soft V-neck and delicate ribbon details.' },
  { id: 11, name: 'The Blue Regal Poise Gown ✨', price: 25000, image: '/images/clothing_12.png', category: 'Gown', description: 'Brocade fabric perfect for cultural gatherings and everyday luxury.' },
  { id: 12, name: 'The Red Regal Poise Gown ✨', price: 25000, image: '/images/clothing_13.png', category: 'Gown', description: 'Brocade fabric perfect for cultural gatherings and everyday luxury.' },
];

export function ClothingCollection() {
  const [showAll, setShowAll] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; title: string } | null>(null);

  const displayed = showAll ? clothingItems : clothingItems.slice(0, 6);

  const handleWhatsApp = (name: string) => {
    window.open(`https://wa.me/2348124238750?text=${encodeURIComponent(`Hello! I'm interested in the ${name}. Can you provide more details?`)}`, '_blank');
  };

  const viewMoreBtn: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '8px',
    padding: '13px 36px', borderRadius: '40px', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.08em',
    background: 'transparent', color: gold, border: `1px solid rgba(201,168,76,0.3)`, cursor: 'pointer',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#080808' }}>
      <section style={{ padding: '110px 16px 60px', background: 'linear-gradient(180deg, #0e0900 0%, #080808 100%)', borderBottom: '1px solid rgba(201,168,76,0.1)', textAlign: 'center' }}>
        <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: gold, marginBottom: '14px' }}>Women's Collection</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 300, color: '#e8dfc0', marginBottom: '16px' }}>Fashion Collection</h1>
        <p style={{ fontSize: '1rem', color: '#6b5e3a', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>Discover our curated selection of premium clothing for every style</p>
      </section>

      <section style={{ padding: '60px 16px' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ marginBottom: '48px' }}>
            {displayed.map((item) => (
              <ProductCard
                key={item.id}
                name={item.name}
                category={item.category}
                description={item.description}
                price={`₦${item.price.toLocaleString()}`}
                image={item.image}
                onView={() => setSelectedImage({ src: item.image, alt: item.name, title: item.name })}
                onInquire={() => handleWhatsApp(item.name)}
              />
            ))}
          </div>
          {clothingItems.length > 6 && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button onClick={() => setShowAll(!showAll)} style={viewMoreBtn}>
                {showAll ? (<>View Less <ChevronUp size={16} /></>) : (<>View More <ChevronDown size={16} /></>)}
              </button>
            </div>
          )}
        </div>
      </section>
      <ImageModal isOpen={selectedImage !== null} imageSrc={selectedImage?.src || ''} imageAlt={selectedImage?.alt || ''} imageTitle={selectedImage?.title || ''} onClose={() => setSelectedImage(null)} />
    </div>
  );
}

export default ClothingCollection;