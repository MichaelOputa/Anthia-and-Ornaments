import { useState, useMemo } from 'react';

interface ClothingItemType {
  id: number;
  name: string;
  price: string | number;
  image: string;
  gender: 'men' | 'women';
  category: string;
  description: string;
}

type CategoryFilter = 'all' | 'men' | 'women';

import { ChevronDown, ChevronUp, ExternalLink, MessageCircle } from 'lucide-react';
import ImageModal from '../components/ImageModal';

const clothingItems: ClothingItemType[] = [
  {
    id: 1,
    name: "The Green Regal Poise Gown ✨",
    price: 25000,
    image: "/images/clothing_3.png",
    gender: 'women',
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
    gender: 'women',
    category: 'gown',
    description: `Statement kaftan-style gown made from brocade fabric 
perfect for cultural gatherings, elegant outings, and everyday luxury.
This isn’t just fashion.
It’s heritage in motion. 💛`,
  },
  {
    id: 3,
    name: "The Midnight Stud Denim Shorts ✨",
    price: 20000,
    image: "/images/shorts.jpg",
    gender: 'men',
    category: 'shorts',
    description: `A deep black wash with subtle stud detailing that catches light without screaming for attention. 
Relaxed fit, structured feel designed for comfort, styled for presence.`,
  },
  {
    id: 4,
    name: "UNDISPUTED LUXURY SHORTS ✨",
    price: 20000,
    image: "/images/shorts_2.jpg",
    gender: 'men',
    category: 'shorts',
    description: `UNDISPUTED LUXURY 📟📟
      BEST QUALITY 💯💯
      TOP NOTCH 🏞
      Available in different sizes`,
  },
  {
    id: 5,
    name: "UNDISPUTED LUXURY SHORTS ✨",
    price: 20000,
    image: "/images/shorts_3.jpg",
    gender: 'men',
    category: 'shorts',
    description: `UNDISPUTED LUXURY 📟📟
      BEST QUALITY 💯💯
      TOP NOTCH 🏞
      Available in different sizes`,
  },
  {
    id: 6,
    name: "The Classic Ivory Boubou 🤍",
    price: 16000,
    image: "/images/clothing_7.png",
    gender: 'women',
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
    gender: 'women',
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
    gender: 'women',
    category: 'boubou',
    description: 'Royal mustard gold with intricate woven embroidery along a deep V-neckline.\nA flowing, full-length silhouette designed for ease, grace, and undeniable presence.💛',
  },
  {
    id: 9,
    name: "Aurelia Flow 🤍",
    price: 16000,
    image: "/images/clothing_10.png",
    gender: 'women',
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
    gender: 'women',
    category: 'dresses',
    description: `A flowing, free-fit silhouette with a soft V-neck and delicate ribbon details.
      For the woman who leads with softness and shows up with presence.`,
  },
  {
    id: 11,
    name: "The Blue Regal Poise Gown ✨",
    price: 25000,
    image: "/images/clothing_12.png",
    gender: 'women',
    category: 'gown',
    description: `Brocade fabric\nperfect for cultural gatherings, elegant outings, and everyday luxury.\nThis isn’t just fashion.\nIt’s heritage in motion. 💛`,
  },
  {
    id: 12,
    name: "The Red Regal Poise Gown ✨",
    price: 25000,
    image: "/images/clothing_13.png",
    gender: 'women',
    category: 'gown',
    description: `Brocade fabric\nperfect for cultural gatherings, elegant outings, and everyday luxury.\nThis isn’t just fashion.\nIt’s heritage in motion. 💛`,
  },
  {
    id: 13,
    name: "UNDISPUTED LUXURY SHORTS ✨",
    price: 20000,
    image: "/images/shorts_3.jpg",
    gender: 'men',
    category: 'shorts',
    description: `UNDISPUTED LUXURY 📟📟
      BEST QUALITY 💯💯
      TOP NOTCH 🏞
      Available in different sizes`,
  },
  {
    id: 14,
   name: "UNDISPUTED LUXURY SHORTS ✨",
    price: 20000,
    image: "/images/shorts_4.jpg",
    gender: 'men',
    category: 'shorts',
    description: `UNDISPUTED LUXURY 📟📟
      BEST QUALITY 💯💯
      TOP NOTCH 🏞
      Available in different sizes`,
  },
  {
    id: 15,
   name: "UNDISPUTED LUXURY SHORTS ✨",
    price: 20000,
    image: "/images/shorts_5.jpg",
    gender: 'men',
    category: 'shorts',
    description: `UNDISPUTED LUXURY 📟📟
      BEST QUALITY 💯💯
      TOP NOTCH 🏞
      Available in different sizes`,
  },
  {
    id: 16,
   name: "UNDISPUTED LUXURY SHORTS ✨",
    price: 20000,
    image: "/images/shorts_6.jpg",
    gender: 'men',
    category: 'shorts',
    description: `UNDISPUTED LUXURY 📟📟
      BEST QUALITY 💯💯
      TOP NOTCH 🏞
      Available in different sizes`,
  },
  {
    id: 17,
   name: "UNDISPUTED LUXURY SHORTS ✨",
    price: 20000,
    image: "/images/shorts_7.jpg",
    gender: 'men',
    category: 'shorts',
    description: `UNDISPUTED LUXURY 📟📟
      BEST QUALITY 💯💯
      TOP NOTCH 🏞
      Available in different sizes`,
  },
  {
    id: 18,
   name: "UNDISPUTED LUXURY SHORTS ✨",
    price: 20000,
    image: "/images/shorts_8.jpg",
    gender: 'men',
    category: 'shorts',
    description: `UNDISPUTED LUXURY 📟📟
      BEST QUALITY 💯💯
      TOP NOTCH 🏞
      Available in different sizes`,
  },
  {
    id: 19,
   name: "The AXEPEAK 07 Polo Jersey ✨",
    price: 25000,
    image: "/images/shirt_1.jpg",
    gender: 'men',
    category: 'shirts',
    description: `Athletic codes with street confidence relaxed fit, bold graphics, and a structure that sits right without trying too hard.`,
  },
  {
    id: 20,
   name: "The AXEPEAK 07 Polo Jersey ✨",
    price: 25000,
    image: "/images/shirt_2.jpg",
    gender: 'men',
    category: 'shirts',
    description: `Athletic codes with street confidence relaxed fit, bold graphics, and a structure that sits right without trying too hard.`,
  },
  {
    id: 21,
   name: "The Riviera Crest Tee ✨",
    price: 25000,
    image: "/images/shirt_3.JPG",
    gender: 'men',
    category: 'shirts',
    description: `Classic European insignia with modern street ease. Relaxed fit, bold black base, and crisp white detailing that feels intentional, not loud.`,
  },
  {
    id: 22,
    name: "GATHER JOGGERS ✨",
    price: 26000,
    image: "/images/joggers_1.JPG",
    gender: "men",
    category: "joggers",
    description: `Comfort meets style in these premium joggers. Tailored fit with high-quality fabric for everyday elegance.`,
  },
  {
    id: 23,
    name: "GATHER JOGGERS ✨",
    price: 26000,
    image: "/images/joggers_2.JPG",
    gender: "men",
    category: "joggers",
    description: `Comfort meets style in these premium joggers. Tailored fit with high-quality fabric for everyday elegance.`,
  },
  {
    id: 24,
    name: "GATHER JOGGERS ✨",
    price: 26000,
    image: "/images/joggers_3.JPG",
    gender: "men",
    category: "joggers",
    description: `Comfort meets style in these premium joggers. Tailored fit with high-quality fabric for everyday elegance.`,
  },
  {
    id: 25,
    name: "GATHER JOGGERS ✨",
    price: 26000,
    image: "/images/joggers_4.JPG",
    gender: "men",
    category: "joggers",
    description: `Comfort meets style in these premium joggers. Tailored fit with high-quality fabric for everyday elegance.`,
  },
  {
    id: 26,
    name: "UPSPEED STUDIO ✨",
    price: 18000,
    image: "/images/armless_1.jpeg",
    gender: "men",
    category: "shirts",
    description: `Elevate your casual wardrobe with this premium armless shirt. Sleek design, comfortable fit, and versatile style for any occasion.`,
  },
  {
    id: 27,
    name: "Champion Saint",
    price: 18000,
    image: "/images/armless_2.jpeg",
    gender: "men",
    category: "shirts",
    description: `Elevate your casual wardrobe with this premium armless shirt. Sleek design, comfortable fit, and versatile style for any occasion.`,
  },
  {
    id: 28,
    name: "Balaclava Hoodie",
    price: 36000,
    image: "/images/hoodie_1.JPG",
    gender: "men",
    category: "hoodies",
    description: `Stay warm and stylish with this premium balaclava hoodie. Perfect for outdoor activities and casual wear.`,
  },
  {
    id: 29,
    name: "Balaclava Hoodie",
    price: 36000,
    image: "/images/hoodie_2.JPG",
    gender: "men",
    category: "hoodies",
    description: `Stay warm and stylish with this premium balaclava hoodie. Perfect for outdoor activities and casual wear.`,
  },
  {
    id: 30,
    name: "Balaclava Hoodie",
    price: 36000,
    image: "/images/hoodie_3.JPG",
    gender: "men",
    category: "hoodies",
    description: `Stay warm and stylish with this premium balaclava hoodie. Perfect for outdoor activities and casual wear.`,
  },
  {
    id: 31,
    name: "Balaclava Hoodie",
    price: 36000,
    image: "/images/hoodie_4.JPG",
    gender: "men",
    category: "hoodies",
    description: `Stay warm and stylish with this premium balaclava hoodie. Perfect for outdoor activities and casual wear.`,
  },
  {
    id: 34,
    name: "LUXURY TEE",
    price: 15000,
    image: "/images/tee_1.JPG",
    gender: "men",
    category: "tees",
    description: `Premium quality fabric with a sleek design for everyday elegance.`,
  },
  {
    id: 35,
    name: "LUXURY TEE",
    price: 15000,
    image: "/images/tee_2.JPG",
    gender: "men",
    category: "tees",
    description: `Premium quality fabric with a sleek design for everyday elegance.`,
  },
  {
    id: 36,
    name: "LUXURY TEE",
    price: 15000,
    image: "/images/tee_3.JPG",
    gender: "men",
    category: "tees",
    description: `Premium quality fabric with a sleek design for everyday elegance.`,
  },
  {
    id: 37,
    name: "LUXURY TEE",
    price: 15000,
    image: "/images/tee_4.JPG",
    gender: "men",
    category: "tees",
    description: `Premium quality fabric with a sleek design for everyday elegance.`,
  },
  {
    id: 38,
    name: "LUXURY TEE",
    price: 15000,
    image: "/images/tee_5.JPG",
    gender: "men",
    category: "tees",
    description: `Premium quality fabric with a sleek design for everyday elegance.`,
  },
  {
    id: 39,
    name: "Reebok Liverpool FC Jersey",
    price: 23000,
    image: "/images/retro_1.JPG",
    gender: "men",
    category: "retro",
    description: `Official Liverpool FC jersey by Reebok. Show your support in style with this premium quality football shirt.`,
  },
  {
    id: 40,
    name: 'Adidas Argentina Jersey',
    price: 23000,
    image: '/images/retro_2.JPG',
    gender: "men",
    category: "retro",
    description: `Classic Argentina football jersey by Adidas. A must-have for any football enthusiast.`,
  },
  {
    id: 41,
    name: "AC Milan Retro Jersey",
    price: 23000,
    image: "/images/retro_3.JPG",
    gender: "men",
    category: "retro",
    description: `Vintage AC Milan football jersey. Celebrate the legacy of one of football's greatest clubs with this retro shirt.`,
  },
  {
    id: 42,
    name: "Umbro England Retro Jersey",
    price: 23000,
    image: "/images/retro_4.JPG",
    gender: "men",
    category: "retro",
    description: `Classic England football jersey by Umbro. A timeless piece for fans of the Three Lions.`,
  },
  {
    id: 43,
    name: "Umbro Chelsea F.C. Vintage Jersey",
    price: 23000,
    image: "/images/retro_5.JPG",
    gender: "men",
    category: "retro",
    description: `Vintage Chelsea F.C. football jersey by Umbro. Show your Blues pride with this classic piece.`,
  },
  {
    id: 44,
    name: "Reebok Sporting CP Retro Jersey",
    price: 23000,
    image: "/images/retro_6.JPG",
    gender: "men",
    category: "retro",
    description: `Classic Sporting CP football jersey by Reebok. A must-have for fans of the Portuguese giants.`,
  },
  {
    id: 45,
    name: "IRON MAIDEN SPECIAL EDITION VINTAGE KIT",
    price: 22000,
    image: "/images/jersey.jpeg",
    gender: "men",
    category: "jersey",
    description: `Limited edition Iron Maiden vintage football kit. A unique blend of music and sport for true fans.`,
  },
  {
    id: 46,
    name: 'Manchester United 1998-2000 Retro Jersey',
    price: 22000,
    image: '/images/jersey_1.jpeg',
    gender: 'men',
    category: 'jersey',
    description: `Classic Manchester United football jersey from the 1998-2000 seasons. A nostalgic piece for Red Devils supporters.`,
  },
];

export default function ClothingCollection() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [showAll, setShowAll] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    title: string;
  } | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return clothingItems;
    return clothingItems.filter(item => item.gender === activeCategory);
  }, [activeCategory]);

  const displayedItems = showAll ? filteredItems : filteredItems.slice(0, 6);
  const hasMoreItems = filteredItems.length > 6;

  const getCategoryTitle = () => {
    switch (activeCategory) {
      case 'men':
        return "Men's Wear";
      case 'women':
        return "Women's Wear";
      default:
        return "All Collections";
    }
  };

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

        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-lg shadow-md p-1">
            <button
              onClick={() => {
                setActiveCategory('all');
                setShowAll(false);
              }}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeCategory === 'all'
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => {
                setActiveCategory('men');
                setShowAll(false);
              }}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeCategory === 'men'
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Men's Wear
            </button>
            <button
              onClick={() => {
                setActiveCategory('women');
                setShowAll(false);
              }}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeCategory === 'women'
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Women's Wear
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center">
            {getCategoryTitle()}
          </h2>
          <p className="text-center text-gray-600 mt-2">
            {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} available
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
                <h3 className='text-sm font-medium text-gray-600 mb-1'>
                    {item.description}
                </h3>
                <p className="text-lg font-semibold text-amber-600">₦{typeof item.price === 'number' ? item.price.toFixed(2) : item.price}</p>
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
