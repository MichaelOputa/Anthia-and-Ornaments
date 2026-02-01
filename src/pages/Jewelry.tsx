import { useState, useMemo } from 'react';
import { ExternalLink, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import ImageModal from '../components/ImageModal';

export default function Jewelry() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    title: string;
  } | null>(null);
  const [showAll, setShowAll] = useState(false);

  const jewelryItems = [
    {
      name: 'Pearl Blossom Set',
      category: 'Necklaces',
      description: `Delicate florals, kissed with subtle shimmer.
      Light, graceful, and quietly feminine.
      The kind of piece that feels like summer on the skin.
      Earrings and necklace.`,
      image: '/images/pearl necklace_8.jpg',
      price: '₦28,000',
    },
    {
      name: 'Necklace Set',
      category: 'Necklaces',
      description: `Delicate gold-tone necklaces, each designed to sit softly and speak quietly.
      Timeless symbols, refined finishes, and effortless layering perfect for everyday elegance or subtle statements.`,
      image: '/images/necklace_set.png',
      price: '₦15,000 each',
    },
    {
      name: 'Rose Necklace Set',
      category: 'Necklaces',
      description: `Delicate floral earrings and necklace set.
      Light, graceful, and softly radiant designed to complement effortlessly and elevate every look.

      Available in different colors.`,
      image: '/images/rose necklace_14.jpg',
      price: '₦18,000',
    },
    {
      name: 'The Cherry Bloom Necklace',
      category: 'Necklaces',
      description: `Soft. Playful. Feminine. Memorable.

      Sweet, but not childish 🍒
      Because soft girls still like to be noticed.`,
      image: '/images/necklace_3.png',
      price: '₦6,500',
    },
    {
      name: 'Gold Lock Necklace',
      category: 'Necklaces',
      description: `Layered gold-tone chains designed to rest softly and speak with quiet confidence.
      Refined, balanced, and effortless.
      The kind of piece that completes a calm, clean presence.`,
      image: '/images/gold lock necklace_1.jpg',
      price: '₦22,000',
    },
    {
      name: 'The Faith & Form Cross Chain',
      category: 'Necklaces',
      description: `Not loud.
Not forced.
Just meaning… and clean style.`,
      image: '/images/necklace_1.jpg',
      price: '₦10,000',
    },
    {
      name: 'The Quiet Power Chain',
      category: 'Bracelets',
      description: `Strong, subtle, very you.`,
      image: '/images/bracelet_5.jpg',
      price: '₦8,500',
    },
    {
      name: 'The Quiet Power Chain (Silver)',
      category: 'Bracelets',
      description: `Strong, subtle, very you.`,
      image: '/images/bracelet_16.JPG',
      price: '₦8,500',
    },
    {
      name: '🖤 The Silver Bar Duo (Cuff + Necklace combo)',
      category: 'Bracelet & Necklace Sets',
      description: `For the one who likes their jewelry clean and intentional.`,
      image: '/images/bracelet & necklace_1.jpg',
      price: '₦22,500',
    },
    {
      name: 'The Executive Chain Bracelets Collection',
      category: 'Bracelets',
      description: `These are statement chain bracelets designed for men who move with confidence and quiet authority.
	•	Material: High-quality stainless steel
	•	Finish: Polished silver-tone shine
	•	Design: Thick interlocked chain with engraved statement plates
	•	Fit: Adjustable clasp for comfort and ease
	•	Durability: Tarnish-resistant & long-lasting`,
      image: '/images/bracelet_4.jpg',
      price: '₦15,000',
    },
    {
      name: 'The Executive Chain Bracelets Collection',
      category: 'Bracelets',
      description: `These are statement chain bracelets designed for men who move with confidence and quiet authority.
	•	Material: High-quality stainless steel
	•	Finish: Polished silver-tone shine
	•	Design: Thick interlocked chain with engraved statement plates
	•	Fit: Adjustable clasp for comfort and ease
	•	Durability: Tarnish-resistant & long-lasting`,
      image: '/images/bracelet_7.jpg',
      price: '₦15,000',
    },
    {
      name: 'The Executive Chain Bracelets Collection',
      category: 'Bracelets',
      description: `These are statement chain bracelets designed for men who move with confidence and quiet authority.
	•	Material: High-quality stainless steel
	•	Finish: Polished silver-tone shine
	•	Design: Thick interlocked chain with engraved statement plates
	•	Fit: Adjustable clasp for comfort and ease
	•	Durability: Tarnish-resistant & long-lasting`,
      image: '/images/bracelet_8.jpeg',
      price: '₦15,000',
    },
    {
      name: 'The Executive Chain Bracelets Collection',
      category: 'Bracelets',
      description: `These are statement chain bracelets designed for men who move with confidence and quiet authority.
	•	Material: High-quality stainless steel
	•	Finish: Polished silver-tone shine
	•	Design: Thick interlocked chain with engraved statement plates
	•	Fit: Adjustable clasp for comfort and ease
	•	Durability: Tarnish-resistant & long-lasting`,
      image: '/images/bracelet_9.jpeg',
      price: '₦15,000',
    },
    {
      name: 'The Executive Chain Bracelets Collection',
      category: 'Bracelets',
      description: `These are statement chain bracelets designed for men who move with confidence and quiet authority.
	•	Material: High-quality stainless steel
	•	Finish: Polished silver-tone shine
	•	Design: Thick interlocked chain with engraved statement plates
	•	Fit: Adjustable clasp for comfort and ease
	•	Durability: Tarnish-resistant & long-lasting`,
      image: '/images/bracelet_10.jpeg',
      price: '₦15,000',
    },
    {
      name: 'The Executive Chain Bracelets Collection',
      category: 'Bracelets',
      description: `These are statement chain bracelets designed for men who move with confidence and quiet authority.
	•	Material: High-quality stainless steel
	•	Finish: Polished silver-tone shine
	•	Design: Thick interlocked chain with engraved statement plates
	•	Fit: Adjustable clasp for comfort and ease
	•	Durability: Tarnish-resistant & long-lasting`,
      image: '/images/bracelet_11.jpeg',
      price: '₦15,000',
    },
    {
      name: 'The Executive Chain Bracelets Collection',
      category: 'Bracelets',
      description: `These are statement chain bracelets designed for men who move with confidence and quiet authority.
	•	Material: High-quality stainless steel
	•	Finish: Polished silver-tone shine
	•	Design: Thick interlocked chain with engraved statement plates
	•	Fit: Adjustable clasp for comfort and ease
	•	Durability: Tarnish-resistant & long-lasting`,
      image: '/images/bracelet_12.jpeg',
      price: '₦15,000',
    },
    {
      name: 'The Executive Chain Bracelets Collection',
      category: 'Bracelets',
      description: `These are statement chain bracelets designed for men who move with confidence and quiet authority.
	•	Material: High-quality stainless steel
	•	Finish: Polished silver-tone shine
	•	Design: Thick interlocked chain with engraved statement plates
	•	Fit: Adjustable clasp for comfort and ease
	•	Durability: Tarnish-resistant & long-lasting`,
      image: '/images/bracelet_13.jpeg',
      price: '₦15,000',
    },
    {
      name: 'The Executive Chain Bracelets Collection',
      category: 'Bracelets',
      description: `These are statement chain bracelets designed for men who move with confidence and quiet authority.
	•	Material: High-quality stainless steel
	•	Finish: Polished silver-tone shine
	•	Design: Thick interlocked chain with engraved statement plates
	•	Fit: Adjustable clasp for comfort and ease
	•	Durability: Tarnish-resistant & long-lasting`,
      image: '/images/bracelet_14.jpeg',
      price: '₦15,000',
    },
    {
      name: 'The Executive Chain Bracelets Collection',
      category: 'Bracelets',
      description: `These are statement chain bracelets designed for men who move with confidence and quiet authority.
	•	Material: High-quality stainless steel
	•	Finish: Polished silver-tone shine
	•	Design: Thick interlocked chain with engraved statement plates
	•	Fit: Adjustable clasp for comfort and ease
	•	Durability: Tarnish-resistant & long-lasting`,
      image: '/images/bracelet_15.jpeg',
      price: '₦15,000',
    },
    {
      name: 'Bare Intent Waist Chain',
      category: 'Waist Chains',
      description: `A quiet detail that transforms the simplest look into something intentional`,
      image: '/images/chain_1.jpg',
      price: '₦15,000',
    },
    {
      name: 'Bare Intent Waist Chain',
      category: 'Waist Chains',
      description: `A quiet detail that transforms the simplest look into something intentional.`,
      image: '/images/chain_2.jpg',
      price: '₦15,000',
    },
    {
      name: 'Bare Intent Waist Chain',
      category: 'Waist Chains',
      description: `A quiet detail that transforms the simplest look into something intentional.`,
      image: '/images/chain_3.jpg',
      price: '₦15,000',
    },
    {
      name: 'Bare Intent Waist Chain',
      category: 'Waist Chains',
      description: `A quiet detail that transforms the simplest look into something intentional.`,
      image: '/images/chain_4.jpg',
      price: '₦15,000',
    },
    {
      name: 'Bare Intent Waist Chain',
      category: 'Waist Chains',
      description: `A quiet detail that transforms the simplest look into something intentional.`,
      image: '/images/chain_5.jpg',
      price: '₦15,000',
    },
    {
      name: 'Bare Intent Waist Chain',
      category: 'Waist Chains',
      description: `A quiet detail that transforms the simplest look into something intentional.`,
      image: '/images/chain_6.jpg',
      price: '₦15,000',
    },
  ];

  const displayedItems = useMemo(() => {
    return showAll ? jewelryItems : jewelryItems.slice(0, 8);
  }, [showAll]);

  const hasMoreItems = jewelryItems.length > 8;

  const handleWhatsAppClick = (itemName: string) => {
    const message = `Hello! I'm interested in the ${itemName}. Can you provide more details?`;
    window.open(`https://wa.me/2348124238750?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 px-4 bg-gradient-to-br from-amber-50 to-stone-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
            Jewelry Collection
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our exquisite range of handcrafted jewelry, each piece designed to add elegance and sparkle to your style.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {displayedItems.map((item, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative aspect-square bg-gradient-to-br from-amber-100 to-stone-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover cursor-pointer hover:brightness-105 transition-all"
                    onClick={() => setSelectedImage({ src: item.image, alt: item.name, title: item.name })}
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
                      onClick={() => setSelectedImage({ src: item.image, alt: item.name, title: item.name })}
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

                <div className="mt-4 text-center">
                  <p className="text-xs text-amber-600 font-medium uppercase tracking-wide mb-1">
                    {item.category}
                  </p>
                  <h3 className="text-lg font-serif font-semibold text-gray-900 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {item.description}
                  </p>
                  <p className="text-lg font-semibold text-amber-600">
                    {item.price}
                  </p>
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
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-br from-amber-50 to-stone-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
            Interested in Our Jewelry?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Contact us on WhatsApp to inquire about availability, pricing, and custom orders.
          </p>
          <a
            href="https://wa.me/2348124238750?text=Hello! I'm interested in your jewelry collection."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors shadow-lg font-medium"
          >
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Chat on WhatsApp
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
