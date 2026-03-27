import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ImageModal from '../components/ImageModal';
import ProductCard from '../components/ProductCard';

const gold = '#C9A84C';

const jewelryItems = [
  { name: 'Gift Box', category: 'Varieties', description: 'A beautifully packaged gift box for your special occasions.', image: '/images/gift box.jpeg' },
  { name: 'Gift Package', category: 'Varieties', description: 'A curated gift package including a selection of our finest jewelry pieces.', image: '/images/gift package.jpeg' },
  { name: 'The Cherry Bloom Necklace', category: 'Necklaces', description: 'Soft. Playful. Feminine. Memorable.\nSweet, but not childish 🍒', image: '/images/necklace_3.png', price: '₦6,500' },
  { name: 'Gold Lock Necklace', category: 'Necklaces', description: 'Layered gold-tone chains designed to rest softly and speak with quiet confidence.', image: '/images/gold lock necklace_1.jpg', price: '₦22,000' },
  { name: 'The Faith & Form Cross Chain', category: 'Necklaces', description: 'Not loud. Not forced. Just meaning… and clean style.', image: '/images/necklace_1.jpg', price: '₦10,000' },
  { name: 'The Quiet Power Chain', category: 'Bracelets', description: 'Strong, subtle, very you.', image: '/images/bracelet_5.jpg', price: '₦8,500' },
  { name: 'The Quiet Power Chain (Silver)', category: 'Bracelets', description: 'Strong, subtle, very you.', image: '/images/bracelet_16.JPG', price: '₦8,500' },
  { name: '🖤 The Silver Bar Duo', category: 'Sets', description: 'Cuff + Necklace combo. For the one who likes their jewelry clean and intentional.', image: '/images/bracelet & necklace_1.jpg', price: '₦22,500' },
  { name: 'Executive Chain Bracelets', category: 'Bracelets', description: 'Statement chains for men who move with confidence and quiet authority.', image: '/images/bracelet_4.jpg', price: '₦15,000' },
  { name: 'Executive Chain Bracelets', category: 'Bracelets', description: 'Statement chains for men who move with confidence and quiet authority.', image: '/images/bracelet_7.jpg', price: '₦15,000' },
  { name: 'Executive Chain Bracelets', category: 'Bracelets', description: 'Statement chains for men.', image: '/images/bracelet_10.jpeg', price: '₦15,000' },
  { name: 'Executive Chain Bracelets', category: 'Bracelets', description: 'Statement chains for men.', image: '/images/bracelet_12.jpeg', price: '₦15,000' },
  { name: 'Executive Chain Bracelets', category: 'Bracelets', description: 'Statement chains for men.', image: '/images/bracelet_13.jpeg', price: '₦15,000' },
  { name: 'Executive Chain Bracelets', category: 'Bracelets', description: 'Statement chains for men.', image: '/images/bracelet_14.jpeg', price: '₦15,000' },
  { name: 'Executive Chain Bracelets', category: 'Bracelets', description: 'Statement chains for men.', image: '/images/bracelet_15.jpeg', price: '₦15,000' },
  { name: 'Kaleia Aeris Earrings', category: 'Earrings', description: 'Delicate, yet impactful.', image: '/images/earring_1.jpeg', price: '₦4,599' },
  { name: 'Ice Cream Cone Dangle Earrings', category: 'Earrings', description: 'Fun and whimsical.', image: '/images/earring_2.jpeg', price: '₦4,599' },
  { name: 'Han Kou Earrings', category: 'Earrings', description: 'Bold and unique with a modern twist.', image: '/images/earring_3.jpeg', price: '₦4,599' },
  { name: 'Pearl Ear Studs', category: 'Earrings', description: 'Elegant and timeless.', image: '/images/earring_4.jpeg', price: '₦4,599' },
  { name: 'Gold-Toned Flower Earrings', category: 'Earrings', description: 'Delicate gold-toned flowers.', image: '/images/earring_5.jpeg', price: '₦4,599' },
  { name: 'Statement Dangle Earrings', category: 'Earrings', description: 'Bold and eye-catching.', image: '/images/earring_6.jpeg', price: '₦4,599' },
  { name: 'Twisted Hoop Pearl Earrings', category: 'Earrings', description: 'A modern twist on classic hoops.', image: '/images/earring_7.jpeg', price: '₦4,599' },
  { name: 'Gold-Plated Double Hoop Earrings', category: 'Earrings', description: 'Double hoop glamour.', image: '/images/earring_8.jpeg', price: '₦4,599' },
  { name: 'Gold-Plated Flower Stud Earrings', category: 'Earrings', description: 'Feminine and elegant.', image: '/images/earring_9.jpeg', price: '₦4,599' },
  { name: 'Sculptural Floral Earrings', category: 'Earrings', description: 'Gold-toned sculptural finish.', image: '/images/earring_10.jpeg', price: '₦4,599' },
  { name: 'Floral Gold-Toned Studs', category: 'Earrings', description: 'Everyday elegance.', image: '/images/earring_11.jpeg', price: '₦4,599' },
  { name: 'Vintage Tiered Flower Earrings', category: 'Earrings', description: 'Vintage tiered gold tone.', image: '/images/earring_12.jpeg', price: '₦4,599' },
  { name: 'Art Deco Swirl Dangle Earrings', category: 'Earrings', description: 'Gold-plated art deco.', image: '/images/earring_13.jpeg', price: '₦4,599' },
  { name: 'Gold Filigree Studs w/ Pearl', category: 'Earrings', description: 'Filigree with central faux pearl.', image: '/images/earring_14.jpeg', price: '₦4,599' },
  { name: 'Gold Wire Bow Earrings', category: 'Earrings', description: 'Delicate wire bow.', image: '/images/earring_15.jpeg', price: '₦4,599' },
  { name: 'Gold Flower Earrings', category: 'Earrings', description: 'Metallic floral design.', image: '/images/earring_16.jpeg', price: '₦4,599' },
  { name: 'Square Charm Necklace', category: 'Necklaces', description: 'Statement with a touch of glamour.', image: '/images/necklace-1.jpeg', price: '₦7,000' },
  { name: 'Golden Tanmaniya Necklace', category: 'Necklaces', description: 'Delicate gold pendant.', image: '/images/necklace-2.jpeg', price: '₦7,000' },
  { name: 'Dragonfly Dance Necklace', category: 'Necklaces', description: 'Whimsical golden dragonfly pendant.', image: '/images/necklace-3.jpeg', price: '₦7,000' },
  { name: 'Golden Hearts Layered Necklace', category: 'Necklaces', description: 'Layered delicate golden hearts.', image: '/images/necklace-4.jpeg', price: '₦7,000' },
  { name: 'Gold Necklace', category: 'Necklaces', description: 'Classic gold, timeless elegance.', image: '/images/necklace-5.jpeg', price: '₦7,000' },
  { name: 'Sparrow Gold Necklace', category: 'Necklaces', description: 'Charming sparrow pendant.', image: '/images/necklace-6.jpeg', price: '₦7,000' },
  { name: 'The Vita Ambita Kai Bracelet', category: 'Bracelets', description: 'Bold, unique, glamorous.', image: '/images/gold bracelet.jpeg', price: '₦6,500 each' },
  { name: 'Cartier Juste un Clou Bangle', category: 'Bracelets', description: 'Sleek, modern, sophisticated.', image: '/images/cartier bracelet.jpeg', price: '₦6,000' },
  { name: 'Jewelry Set', category: 'Sets', description: 'Necklace, bracelet & earrings set.', image: '/images/jewelry set.jpeg', price: '₦15,000' },
  { name: 'Gold-Plated Teardrop Set', category: 'Sets', description: 'Teardrop necklace, earring & bangle.', image: '/images/gold set.jpeg', price: '₦15,000' },
];

export default function Jewelry() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; title: string } | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayedItems = useMemo(() => showAll ? jewelryItems : jewelryItems.slice(0, 8), [showAll]);

  const handleWhatsApp = (name: string) => {
    window.open(`https://wa.me/2348124238750?text=${encodeURIComponent(`Hello! I'm interested in the ${name}. Can you provide more details?`)}`, '_blank');
  };

  const viewMoreBtn: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '8px',
    padding: '13px 36px', borderRadius: '40px', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.08em',
    background: 'transparent', color: gold, border: `1px solid rgba(201,168,76,0.3)`, cursor: 'pointer',
    transition: 'all 0.2s',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#080808' }}>
      {/* Hero */}
      <section style={{ padding: '110px 16px 60px', background: 'linear-gradient(180deg, #0e0900 0%, #080808 100%)', borderBottom: '1px solid rgba(201,168,76,0.1)', textAlign: 'center' }}>
        <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: gold, marginBottom: '14px' }}>Handpicked for You</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 300, color: '#e8dfc0', marginBottom: '16px' }}>Jewelry Collection</h1>
        <p style={{ fontSize: '1rem', color: '#6b5e3a', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
          Discover our exquisite range of handcrafted jewelry, each piece designed to add elegance and sparkle to your style.
        </p>
      </section>

      <section style={{ padding: '60px 16px' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" style={{ marginBottom: '48px' }}>
            {displayedItems.map((item, index) => (
              <ProductCard
                key={index}
                name={item.name}
                category={item.category}
                description={item.description}
                price={item.price}
                image={item.image}
                onView={() => setSelectedImage({ src: item.image, alt: item.name, title: item.name })}
                onInquire={() => handleWhatsApp(item.name)}
              />
            ))}
          </div>

          {jewelryItems.length > 8 && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button onClick={() => setShowAll(!showAll)} style={viewMoreBtn}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.1)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                {showAll ? (<>View Less <ChevronUp size={16} /></>) : (<>View More <ChevronDown size={16} /></>)}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '60px 16px', background: '#0e0900', borderTop: '1px solid rgba(201,168,76,0.1)', textAlign: 'center' }}>
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 400, color: '#e8dfc0', marginBottom: '14px' }}>Interested in Our Jewelry?</h2>
          <p style={{ fontSize: '0.9rem', color: '#6b5e3a', marginBottom: '28px' }}>Contact us on WhatsApp to inquire about availability, pricing, and custom orders.</p>
          <a href="https://wa.me/2348124238750?text=Hello! I'm interested in your jewelry collection."
            target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 28px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600, background: '#25d366', color: 'white', textDecoration: 'none', boxShadow: '0 4px 20px rgba(37,211,102,0.25)' }}>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            Chat on WhatsApp
          </a>
        </div>
      </section>

      <ImageModal isOpen={selectedImage !== null} imageSrc={selectedImage?.src || ''} imageAlt={selectedImage?.alt || ''} imageTitle={selectedImage?.title || ''} onClose={() => setSelectedImage(null)} />
    </div>
  );
}