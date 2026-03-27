import { useSearchParams, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import ImageModal from '../components/ImageModal';
import ProductCard from '../components/ProductCard';

const gold = '#C9A84C';

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  price?: string;
  type: string;
}

// Compact product list — same data as before, truncated for brevity
const allProducts: Product[] = [
  { id: 1, name: 'Gift Box', category: 'Varieties', description: 'A beautifully packaged gift box.', image: '/images/gift box.jpeg', type: 'jewelry' },
  { id: 2, name: 'Gift Package', category: 'Varieties', description: 'A curated gift package of fine jewelry.', image: '/images/gift package.jpeg', type: 'jewelry' },
  { id: 3, name: 'The Cherry Bloom Necklace', category: 'Necklaces', description: 'Soft. Playful. Feminine.', image: '/images/necklace_3.png', price: '₦6,500', type: 'jewelry' },
  { id: 4, name: 'Gold Lock Necklace', category: 'Necklaces', description: 'Layered gold-tone chains with quiet confidence.', image: '/images/gold lock necklace_1.jpg', price: '₦22,000', type: 'jewelry' },
  { id: 5, name: 'The Faith & Form Cross Chain', category: 'Necklaces', description: 'Not loud. Just meaning and clean style.', image: '/images/necklace_1.jpg', price: '₦10,000', type: 'jewelry' },
  { id: 6, name: 'The Quiet Power Chain', category: 'Bracelets', description: 'Strong, subtle, very you.', image: '/images/bracelet_5.jpg', price: '₦8,500', type: 'jewelry' },
  { id: 7, name: 'The Quiet Power Chain (Silver)', category: 'Bracelets', description: 'Strong, subtle, very you.', image: '/images/bracelet_16.JPG', price: '₦8,500', type: 'jewelry' },
  { id: 8, name: 'The Silver Bar Duo', category: 'Sets', description: 'Cuff + Necklace combo.', image: '/images/bracelet & necklace_1.jpg', price: '₦22,500', type: 'jewelry' },
  { id: 9, name: 'Executive Chain Bracelets', category: 'Bracelets', description: 'For men who move with quiet authority.', image: '/images/bracelet_4.jpg', price: '₦15,000', type: 'jewelry' },
  { id: 16, name: 'Kaleia Aeris Earrings', category: 'Earrings', description: 'Delicate, yet impactful.', image: '/images/earring_1.jpeg', price: '₦4,599', type: 'jewelry' },
  { id: 32, name: 'Square Charm Necklace', category: 'Necklaces', description: 'Statement with a touch of glamour.', image: '/images/necklace-1.jpeg', price: '₦7,000', type: 'jewelry' },
  { id: 38, name: 'The Vita Ambita Kai Bracelet', category: 'Bracelets', description: 'Bold and unique.', image: '/images/gold bracelet.jpeg', price: '₦6,500 each', type: 'jewelry' },
  { id: 40, name: 'Jewelry Set', category: 'Sets', description: 'Necklace, bracelet & earrings.', image: '/images/jewelry set.jpeg', price: '₦15,000', type: 'jewelry' },
  { id: 101, name: 'The Green Regal Poise Gown', category: 'Gown', description: 'Brocade fabric. Heritage in motion.', image: '/images/clothing_3.png', price: '₦25,000', type: 'clothing' },
  { id: 103, name: 'The Classic Ivory Boubou', category: 'Boubou', description: 'Free-size, effortless elegance.', image: '/images/clothing_7.png', price: '₦16,000', type: 'clothing' },
  { id: 201, name: 'Unisex Cartier Medium', category: 'Wristwatches', description: 'Luxurious. Fully boxed.', image: '/images/Cartier_1.jpg', price: '₦140,000', type: 'wristwatch' },
  { id: 205, name: 'The Chanel Wristwatch', category: 'Wristwatches', description: 'Bold and sophisticated.', image: '/images/chanel_1.jpg', price: '₦180,000', type: 'wristwatch' },
  { id: 209, name: 'POEDAGAR Leather Wristwatch', category: 'Wristwatches', description: 'Waterproof, sapphire glass, boxed.', image: '/images/poedagar_1.jpg', price: '₦40,000', type: 'wristwatch' },
  { id: 219, name: 'Vacheron Constantin', category: 'Wristwatches', description: 'Refined presence and precision.', image: '/images/Vacheron_1.jpg', price: '₦125,000', type: 'wristwatch' },
  { id: 229, name: '✨ THE ROLEX EDIT ✨', category: 'Wristwatches', description: 'For legacy. For quiet authority.', image: '/images/rolex.jpeg', price: '₦22,000', type: 'wristwatch' },
  { id: 301, name: 'Pana Dora Swiss Oud', category: 'Perfumes', description: 'Captivate your senses.', image: '/images/pandora.jpeg', price: '₦125,000', type: 'perfume' },
  { id: 304, name: 'Club de Nuit Int', category: 'Perfumes', description: 'A lasting impression.', image: '/images/perfume_1.JPG', price: '₦65,000', type: 'perfume' },
  { id: 305, name: 'KHAMRAH Perfume', category: 'Perfumes', description: 'A captivating fragrance.', image: '/images/perfume_2.JPG', price: '₦12,000', type: 'perfume' },
  { id: 401, name: 'Designer Prada Eyeglasses', category: 'Eyeglasses', description: 'Stylish premium frames.', image: '/images/prada.png', price: '₦20,000', type: 'eyeglass' },
  { id: 402, name: 'Cartier Gradient Lens Eyeglasses', category: 'Eyeglasses', description: 'Luxury gradient frames.', image: '/images/cartier.png', price: '₦20,000', type: 'eyeglass' },
  { id: 403, name: 'Vintage Round Frame Eyeglasses', category: 'Eyeglasses', description: 'Timeless round frames.', image: '/images/prada_2.png', price: '₦22,000', type: 'eyeglass' },
];

export default function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; title: string } | null>(null);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allProducts.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.type.toLowerCase().includes(q)
    );
  }, [query]);

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
          {searchResults.length === 0 ? (
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
                    price={product.price}
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