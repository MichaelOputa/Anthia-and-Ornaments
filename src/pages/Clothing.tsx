import { useState, useMemo } from 'react';

interface ClothingItemType {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

import { ChevronDown, ChevronUp, ExternalLink, MessageCircle } from 'lucide-react';
import ImageModal from '../components/ImageModal';

const clothingItems: ClothingItemType[] = [
  {
    id: 1,
    name: "The Green Regal Poise Gown ✨",
    price: 25000,
    image: "/images/clothing_3.png",
    category: 'gown',
    description: `Statement kaftan-style gown made from brocade fabric 
perfect for cultural gatherings, elegant outings, and everyday luxury.
This isn’t just fashion.
It’s heritage in motion. 💛`,
  },
  {
    id: 2,
    name: "The Orange Regal Poise Gown ✨",
    price: 25000,
    image: "/images/clothing_6.png",
    category: 'gown',
    description: `Statement kaftan-style gown made from brocade fabric 
perfect for cultural gatherings, elegant outings, and everyday luxury.
This isn’t just fashion.
It’s heritage in motion. 💛`,
  },
  {
    id: 6,
    name: "The Classic Ivory Boubou 🤍",
    price: 16000,
    image: "/images/clothing_7.png",
    category: 'gown',
    description: `Soft luxury flowing, free-size boubou designed for effortless elegance, featuring subtle front buttons and adjustable inner fitting for a perfect, graceful drape.
Available in multiple colours.
Perfect for outings, errands, events, or days you want for effortless class.`,
  },
  {
    id: 7,
    name: "The Royal Violet Poise Gown ✨",
    price: 25000,
    image: "/images/clothing_8.png",
    category: 'gown',
    description: `Statement kaftan-style gown made from brocade fabric 
      perfect for cultural gatherings, elegant outings, and everyday luxury.
      This isn’t just fashion.
      It’s heritage in motion. 💛`,
  },
  {
    id: 8,
    name: "The Aurelia Heritage Boubou ✨",
    price: 25000,
    image: "/images/clothing_9.png",
    category: 'boubou',
    description: 'Royal mustard gold with intricate woven embroidery along a deep V-neckline.\nA flowing, full-length silhouette designed for ease, grace, and undeniable presence.💛',
  },
  {
    id: 9,
    name: "Aurelia Flow 🤍",
    price: 16000,
    image: "/images/clothing_10.png",
    category: 'gown',
    description: `Soft V-neckline (front & back)
      Adjustable tie sleeves
      Flattering cinched waist
      Where strength meets softness.
      Designed to move with you, not against you. ✨💙`,
  },
  {
    id: 10,
    name: "The Rosé Whisper Boubou 🎀",
    price: 16000,
    image: "/images/clothing_11.png",
    category: 'dresses',
    description: `A flowing, free-fit silhouette with a soft V-neck and delicate ribbon details.
      For the woman who leads with softness and shows up with presence.`,
  },
  {
    id: 11,
    name: "The Blue Regal Poise Gown ✨",
    price: 25000,
    image: "/images/clothing_12.png",
    category: 'gown',
    description: `Brocade fabric\nperfect for cultural gatherings, elegant outings, and everyday luxury.\nThis isn’t just fashion.\nIt’s heritage in motion. 💛`,
  },
  {
    id: 12,
    name: "The Red Regal Poise Gown ✨",
    price: 25000,
    image: "/images/clothing_13.png",
    category: 'gown',
    description: `Brocade fabric\nperfect for cultural gatherings, elegant outings, and everyday luxury.\nThis isn’t just fashion.\nIt’s heritage in motion. 💛`,
  },
];

export default function ClothingCollection() {
  const [showAll, setShowAll] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    title: string;
  } | null>(null);

  const displayedItems = showAll ? clothingItems : clothingItems.slice(0, 6);
  const hasMoreItems = clothingItems.length > 6;

  const handleWhatsAppClick = (itemName: string) => {
    const message = `Hello! I'm interested in the ${itemName}. Can you provide more details?`;
    window.open(`https://wa.me/2348124238750?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Fashion Collection
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our curated selection of premium clothing for every style
          </p>
        </header>

        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center">
            Women's Collection
          </h2>
          <p className="text-center text-gray-600 mt-2">
            {clothingItems.length} {clothingItems.length === 1 ? 'item' : 'items'} available
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayedItems.map((item, index) => (
            <div
              key={item.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative aspect-square bg-gradient-to-br from-amber-100 to-stone-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:brightness-105 transition-all"
                  onClick={() =>
                    setSelectedImage({
                      src: item.image,
                      alt: item.name,
                      title: item.name,
                    })
                  }
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div
                  className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                    hoveredIndex === index ? 'opacity-20' : 'opacity-0'
                  }`}
                ></div>

                <div
                  className={`absolute inset-0 flex items-center justify-center gap-3 transition-transform duration-300 ${
                    hoveredIndex === index ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                  }`}
                >
                  <button
                    onClick={() =>
                      setSelectedImage({
                        src: item.image,
                        alt: item.name,
                        title: item.name,
                      })
                    }
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-white/90 hover:bg-white text-gray-900 rounded-lg transition-all font-medium"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View
                  </button>
                  <button
                    onClick={() => handleWhatsAppClick(item.name)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all font-medium"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Inquire
                  </button>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {item.name}
                </h3>
                <h3 className="text-sm text-gray-600 mb-2">{item.category}</h3>
                <h3 className="text-sm text-gray-900 mb-2 whitespace-pre-line">{item.description}</h3>
                <p className="text-lg font-semibold text-amber-600">₦{item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        {hasMoreItems && (
          <div className="flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-medium shadow-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
            >
              {showAll ? (
                <>
                  View Less
                  <ChevronUp className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
                </>
              ) : (
                <>
                  View More
                  <ChevronDown className="w-5 h-5 transition-transform group-hover:translate-y-1" />
                </>
              )}
            </button>
          </div>
        )}

        <ImageModal
          isOpen={selectedImage !== null}
          imageSrc={selectedImage?.src || ''}
          imageAlt={selectedImage?.alt || ''}
          imageTitle={selectedImage?.title || ''}
          onClose={() => setSelectedImage(null)}
        />
      </div>
    </div>
  );
}
