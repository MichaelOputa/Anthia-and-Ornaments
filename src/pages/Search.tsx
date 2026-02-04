import { useSearchParams, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { ExternalLink, MessageCircle, ArrowLeft } from 'lucide-react';
import ImageModal from '../components/ImageModal';

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  price?: string | number;
  type: 'jewelry' | 'clothing' | 'eyeglass' | 'fabric' | 'cap' | 'slide' | 'wristwatch' | 'perfume';
}

export default function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    title: string;
  } | null>(null);

  const allProducts: Product[] = [
    {
      id: 1,
      name: 'Gold Necklace Set',
      category: 'Necklaces',
      description: 'Elegant gold necklaces perfect for any occasion',
      image: '/images/necklace_1.jpg',
      type: 'jewelry',
      price: '10,000',
    },
    {
      id: 2,
      name: 'Silver Bracelet',
      category: 'Bracelets',
      description: 'Stylish silver bracelet with intricate design',
      image: '/images/bracelet_1.jpg',
      type: 'jewelry',
      price: '8,500',
    },
    {
      id: 3,
      name: 'Designer Eyeglasses',
      category: 'Eyeglasses',
      description: 'Premium designer eyeglasses for clear vision and style',
      image: '/images/prada.png',
      type: 'eyeglass',
      price: '22,000',
    },
    {
      id: 4,
      name: 'The Blue Regal Poise Gown ✨',
      category: 'Clothing',
      description: 'Comfortable cotton t-shirt for everyday wear',
      image: '/images/clothing_1.jpg',
      type: 'clothing',
      price: '25,000',
    },
    {
      id: 5,
      name: 'Pana Dora Swiss Oud',
      category: 'Perfumes',
      description: 'Experience the allure of our designer perfumes, crafted to captivate your senses and leave a lasting impression.',
      image: '/images/pandora.jpeg',
      type: 'perfume',
      price: '125,000',
    },
    {
      id: 6,
      name: 'Designer Cap',
      category: 'Caps',
      description: 'These caps are made for easy days and intentional fits clean embroidery, structured shape, and colors that slide effortlessly into your wardrobe.',
      image: '/images/cap_5.jpeg',
      type: 'cap',
      price: '15,000',
    },
    {
      id: 7,
      name: 'The Rosé Whisper Boubou 🎀',
      category: 'Gown',
      description: `A flowing, free-fit silhouette with a soft V-neck and delicate ribbon details.
      For the woman who leads with softness and shows up with presence.`,
      image: '/images/clothing_11.png',
      type: 'clothing',
      price: '16,000',
    },
    {
      id: 8,
      name: 'The Cherry Bloom Necklace',
      category: 'Jewelry',
      description: `Soft. Playful. Feminine. Memorable.

      Sweet, but not childish 🍒
      Because soft girls still like to be noticed.`,
      image: '/images/necklace_3.png',
      type: 'jewelry',
      price: '6,500',
    },
    {
      id: 9,
      name: 'SWISS voile lace WITH embroidery LACE',
      category: 'Lace',
      description: `NEW DESIGN
WITH SWAROVSKI GoldSTONES`,
      image: '/images/Swiss Chiffon_11.JPG',
      type: 'lace',
      price: '60,000',
    },
    {
      id: 10,
      name: 'ALDO Designer Slides',
      category: 'Slides',
      description: `Effortless comfort meets everyday luxury.
An every day essential with a luxury edge.
Designed for comfort, styled for confidence.`,
      image: '/images/slide_18.jpg',
      type: 'slides',
      price: '25,000',
    },
    {
      id: 11,
      name: 'The Tomi Signature Gentleman Set',
      category: 'Wristwatches',
      description: `For the man who likes his style clean, intentional, and timeless.
No noise.
Just class.`,
      image: '/images/Tomi_1.jpg',
      type: 'wristwatch',
      price: '40,000',
    },
    {
      id: 12,
      name: 'The Red Regal Poise Gown ✨',
      category: 'Gown',
      description: `Brocade fabric\nperfect for cultural gatherings, elegant outings, and everyday luxury.\nThis isn’t just fashion.\nIt’s heritage in motion. 💛`,
      image: '/images/clothing_13.png',
      type: 'clothing',
      price: '25,000',
    },
    {
      id: 13,
      name: 'The Aurelia Heritage Boubou ✨',
      category: 'Gown',
      description: 'Royal mustard gold with intricate woven embroidery along a deep V-neckline.\nA flowing, full-length silhouette designed for ease, grace, and undeniable presence.💛',
      image: '/images/clothing_9.png',
      type: 'clothing',
      price: '25,000',
    }
  ];

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  const handleWhatsAppClick = (itemName: string) => {
    const message = `Hello! I'm interested in the ${itemName}. Can you provide more details?`;
    window.open(`https://wa.me/2348124238750?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 px-4 bg-gradient-to-br from-amber-50 to-stone-50">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-6 font-medium"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </button>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-2">
            Search Results
          </h1>
          <p className="text-xl text-gray-600">
            {query ? `Results for "${query}"` : 'Enter a search query'}
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {searchResults.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-600 mb-4">
                {query ? 'No products found matching your search.' : 'Please enter a search term.'}
              </p>
              <button
                onClick={() => navigate('/')}
                className="inline-block px-8 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
              >
                Browse All Products
              </button>
            </div>
          ) : (
            <>
              <p className="text-lg text-gray-600 mb-8">
                Found {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {searchResults.map((product) => (
                  <div
                    key={`${product.type}-${product.id}`}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-square bg-gradient-to-br from-amber-100 to-stone-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 mb-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:brightness-105 transition-all"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

                      <div className="absolute inset-0 flex items-center justify-center gap-3 transition-transform duration-300 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100">
                        <button
                          onClick={() =>
                            setSelectedImage({
                              src: product.image,
                              alt: product.name,
                              title: product.name,
                            })
                          }
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-white/90 hover:bg-white text-gray-900 rounded-lg transition-all font-medium"
                        >
                          <ExternalLink className="h-4 w-4" />
                          View
                        </button>
                        <button
                          onClick={() => handleWhatsAppClick(product.name)}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all font-medium"
                        >
                          <MessageCircle className="h-4 w-4" />
                          Inquire
                        </button>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-amber-600 font-medium uppercase tracking-wide mb-1">
                        {product.category}
                      </p>
                      <h3 className="text-lg font-serif font-semibold text-gray-900 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600">{product.description}</p>
                      {product.price && (
                        <p className="text-lg font-semibold text-amber-600 mt-3">
                          ₦{typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
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
