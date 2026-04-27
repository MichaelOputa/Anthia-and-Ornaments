import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ImageModal from '../components/ImageModal';
import ProductCard from '../components/ProductCard';

const gold = '#C9A84C';
const INITIAL_COUNT = 8;

const wristwatchItems = [
  { name: 'Audemars Piguet Royal Oak', category: 'Audemars Piguet', description: 'Iconic design with a distinctive octagonal case.', image: '/images/wristwatch_3.jpeg', price: '₦120,000' },
  { name: 'Audemars Piguet Royal Oak Green Dial Luxury Automatic Watch', category: 'Audemars Piguet', description: 'Green dial with luxury automatic movement.', image: '/images/wristwatch_4.jpeg', price: '₦120,000' },
  { name: 'Audemars Piguet Royal Oak Selfwinding', category: 'Audemars Piguet', description: 'Features a blue dial with the signature Grande Tapisserie pattern', image: '/images/wristwatch_5.jpeg', price: '₦120,000' },
  { name: 'Audemars Piguet Royal Oak Offshore', category: 'Audemars Piguet', description: 'Sporty and robust design with a larger case size.', image: '/images/wristwatch_6.jpeg', price: '₦120,000' },
  { name: 'Audemars Piguet Royal Oak', category: 'Audemars Piguet', description: 'Iconic design with a distinctive octagonal case.', image: '/images/wristwatch_7.jpeg', price: '₦120,000' },
  { name: 'Audemars Piguet Royal Oak Green', category: 'Audemars Piguet', description: 'Green dial with luxury automatic movement.', image: '/images/wristwatch_8.jpeg', price: '₦120,000' },
  { name: 'Audemars Piguet Royal Oak "Jumbo"', category: 'Audemars Piguet', description: 'Designed by Gérald Genta, integrated stainless steel bracelet, and a blue dial with a "Petite Tapisserie" pattern. ', image: '/images/wristwatch_9.jpeg', price: '₦120,000' },
  { name: 'Audemars Piguet Royal Oak Chronograph', category: 'Audemars Piguet', description: 'Chronograph function with a sporty design.', image: '/images/wristwatch_10.jpeg', price: '₦120,000' },
  { name: 'Audemars Piguet Royal Oak 15500ST', category: 'Audemars Piguet', description: 'Features a 41mm case and the latest in-house movement.', image: '/images/wristwatch_11.jpeg', price: '₦120,000' },
  { name: 'Audemars Piguet Royal Oak Selfwinding 41mm', category: 'Audemars Piguet', description: '41mm case with a self-winding movement.', image: '/images/wristwatch_12.jpeg', price: '₦120,000' },
  { name: 'Unisex Cartier Medium', category: 'Cartier', description: 'Luxurious presence on the wrist. Soft noise. Fully boxed.', image: '/images/Cartier_1.jpg', price: '₦140,000' },
  { name: 'Unisex Cartier Medium', category: 'Cartier', description: 'Luxurious presence on the wrist. Soft noise. Fully boxed.', image: '/images/Cartier_2.jpg', price: '₦140,000' },
  { name: 'Unisex Cartier Medium', category: 'Cartier', description: 'Luxurious presence on the wrist. Soft noise. Fully boxed.', image: '/images/cartier_3.jpg', price: '₦140,000' },
  { name: 'Unisex Cartier Medium', category: 'Cartier', description: 'Luxurious presence on the wrist. Soft noise. Fully boxed.', image: '/images/cartier_4.jpg', price: '₦140,000' },
  { name: 'Tissot PRX Quartz', category: 'Tissot', description: 'Sleek and modern design with a stainless steel case and bracelet.', image: '/images/Tissot_1.jpeg', price: '₦65,000' },
  { name: 'Tissot PRX Swiss Quartz', category: 'Tissot', description: 'Sleek and modern design with a stainless steel case and bracelet.', image: '/images/Tissot_2.jpeg', price: '₦65,000' },
  { name: 'Tissot PRX', category: 'Tissot', description: 'Sleek and modern design with a stainless steel case and bracelet.', image: '/images/Tissot_3.jpeg', price: '₦65,000' },
  { name: 'Tissot PRX', category: 'Tissot', description: 'Sleek and modern design with a stainless steel case and bracelet.', image: '/images/Tissot_4.jpeg', price: '₦65,000' },
  { name: 'High Quality T5 Watch', category: 'T5', description: `CHRONOGRAPH
WATER RESISTANCE
COMES IN A BRANDED BAG
LEATHER AND CHAIN STRAP`, image: '/images/t_1.jpeg', price: '₦65,000' },
  { name: 'High Quality T5 Watch', category: 'T5', description: `CHRONOGRAPH
WATER RESISTANCE
COMES IN A BRANDED BAG
LEATHER AND CHAIN STRAP`, image: '/images/t_2.jpeg', price: '₦65,000' },
  { name: 'High Quality T5 Watch', category: 'T5', description: `CHRONOGRAPH
WATER RESISTANCE
COMES IN A BRANDED BAG
LEATHER AND CHAIN STRAP`, image: '/images/t_3.jpeg', price: '₦65,000' },
  { name: 'High Quality T5 Watch', category: 'T5', description: `CHRONOGRAPH
WATER RESISTANCE
COMES IN A BRANDED BAG
LEATHER AND CHAIN STRAP`, image: '/images/t_4.jpeg', price: '₦65,000' },
  { name: 'High Quality T5 Watch', category: 'T5', description: `CHRONOGRAPH
WATER RESISTANCE
COMES IN A BRANDED BAG
LEATHER AND CHAIN STRAP`, image: '/images/t_5.jpeg', price: '₦65,000' },
  {name: 'High Quality T5 Watch', category: 'T5', description: `CHRONOGRAPH
WATER RESISTANCE
COMES IN A BRANDED BAG
LEATHER AND CHAIN STRAP`, image: '/images/t_6.jpeg', price: '₦65,000' },
  {name: 'High Quality T5 Watch', category: 'T5', description: `CHRONOGRAPH
    WATER RESISTANCE
    COMES IN A BRANDED BAG
    LEATHER AND CHAIN STRAP`, image: '/images/t_7.jpeg', price: '₦65,000' },
    {name: 'High Quality T5 Watch', category: 'T5', description: `CHRONOGRAPH
    WATER RESISTANCE
    COMES IN A BRANDED BAG
    LEATHER AND CHAIN STRAP`, image: '/images/t_8.jpeg', price: '₦65,000' },
  { name: 'The Chanel Wristwatch', category: 'Chanel', description: 'Bold and sophisticated wristwatch design.', image: '/images/chanel_1.jpg', price: '₦180,000' },
  { name: 'The Chanel Wristwatch', category: 'Chanel', description: 'Bold and sophisticated wristwatch design.', image: '/images/chanel_2.jpg', price: '₦180,000' },
  { name: 'The Chanel Wristwatch', category: 'Chanel', description: 'Bold and sophisticated wristwatch design.', image: '/images/chanel_3.jpg', price: '₦180,000' },
  { name: 'Daniel Wellington Wristwatch', category: 'Daniel Wellington', description: 'Classic and versatile for everyday elegance.', image: '/images/DW.jpg', price: '₦25,000' },
  { name: 'The Tomi Signature Gentleman Set', category: 'Tomi', description: 'For the man who likes his style clean, intentional, and timeless. No noise. Just class.', image: '/images/Tomi_1.jpg', price: '₦40,000' },
  { name: 'Vacheron Constantin', category: 'Vacheron', description: 'Sleek design with a refined finish that speaks presence and precision.', image: '/images/Vacheron_1.jpg', price: '₦125,000' },
  { name: 'Vacheron Constantin', category: 'Vacheron', description: 'Sleek design with a refined finish that speaks presence and precision.', image: '/images/Vacheron_2.jpg', price: '₦125,000' },
  { name: 'Vacheron Constantin', category: 'Vacheron', description: 'Sleek design with a refined finish that speaks presence and precision.', image: '/images/Vacheron_3.jpg', price: '₦125,000' },
  { name: 'Vacheron Constantin', category: 'Vacheron', description: 'Sleek design with a refined finish.', image: '/images/Vacheron_4.jpg', price: '₦125,000' },
  { name: 'Vacheron Constantin', category: 'Vacheron', description: 'Sleek design with a refined finish.', image: '/images/Vacheron_5.jpg', price: '₦125,000' },
  { name: 'Vacheron Constantin', category: 'Vacheron', description: 'Sleek design with a refined finish.', image: '/images/Vacheron_6.jpg', price: '₦125,000' },
  { name: 'Vacheron Constantin', category: 'Vacheron', description: 'Sleek design with a refined finish.', image: '/images/Vacheron_7.jpg', price: '₦125,000' },
  { name: 'Vacheron Constantin', category: 'Vacheron', description: 'Sleek design with a refined finish.', image: '/images/Vacheron_8.jpg', price: '₦125,000' },
  { name: 'Vacheron Constantin', category: 'Vacheron', description: 'Sleek design with a refined finish.', image: '/images/Vacheron_9.jpg', price: '₦125,000' },
  { name: 'Vacheron Constantin', category: 'Vacheron', description: 'Sleek design with a refined finish.', image: '/images/Vacheron_10.jpg', price: '₦125,000' },
  { name: '✨ THE ROLEX EDIT ✨', category: 'Rolex', description: 'For legacy. For presence. For quiet authority. A Rolex doesn\'t chase attention — it arrives with it.', image: '/images/rolex.jpeg', price: '₦22,000' },
  { name: 'Rolex Oyster Perpetual Day-Date', category: 'Rolex', description: 'A timeless masterpiece combining elegance with precision.', image: '/images/rolex-1.jpeg', price: '₦45,000 box inclusive' },
];

export default function Wristwatches() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; title: string } | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayedItems = useMemo(
    () => showAll ? wristwatchItems : wristwatchItems.slice(0, INITIAL_COUNT),
    [showAll]
  );

  const handleWhatsApp = (name: string) => {
    window.open(`https://wa.me/2348124238750?text=${encodeURIComponent(`Hello! I'm interested in the ${name}. Can you provide more details?`)}`, '_blank');
  };

  const viewMoreBtn: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '8px',
    padding: '13px 36px', borderRadius: '40px', fontWeight: 600,
    fontSize: '0.82rem', letterSpacing: '0.08em',
    background: 'transparent', color: gold,
    border: `1px solid rgba(201,168,76,0.3)`, cursor: 'pointer',
    transition: 'background 0.2s',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#080808' }}>
      <section style={{ padding: '110px 16px 60px', background: 'linear-gradient(180deg, #0e0900 0%, #080808 100%)', borderBottom: '1px solid rgba(201,168,76,0.1)', textAlign: 'center' }}>
        <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: gold, marginBottom: '14px' }}>Time Elevated</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 300, color: '#e8dfc0', marginBottom: '16px' }}>Wristwatch Collection</h1>
        <p style={{ fontSize: '1rem', color: '#6b5e3a', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>Each piece designed to add elegance and sparkle to your style.</p>
      </section>

      <section style={{ padding: '60px 16px' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" style={{ marginBottom: '40px' }}>
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

          {wristwatchItems.length > INITIAL_COUNT && (
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <button
                onClick={() => setShowAll(!showAll)}
                style={viewMoreBtn}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.1)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
              >
                {showAll ? (<>View Less <ChevronUp size={16} /></>) : (<>View More ({wristwatchItems.length - INITIAL_COUNT} more) <ChevronDown size={16} /></>)}
              </button>
            </div>
          )}
        </div>
      </section>

      <section style={{ padding: '60px 16px', background: '#0e0900', borderTop: '1px solid rgba(201,168,76,0.1)', textAlign: 'center' }}>
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 400, color: '#e8dfc0', marginBottom: '14px' }}>Interested in Our Wristwatches?</h2>
          <p style={{ fontSize: '0.9rem', color: '#6b5e3a', marginBottom: '28px' }}>Contact us on WhatsApp to inquire about availability, pricing, and custom orders.</p>
          <a href="https://wa.me/2348124238750?text=Hello! I'm interested in your wristwatch collection."
            target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 28px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600, background: '#25d366', color: 'white', textDecoration: 'none' }}>
            Chat on WhatsApp
          </a>
        </div>
      </section>

      <ImageModal isOpen={selectedImage !== null} imageSrc={selectedImage?.src || ''} imageAlt={selectedImage?.alt || ''} imageTitle={selectedImage?.title || ''} onClose={() => setSelectedImage(null)} />
    </div>
  );
}