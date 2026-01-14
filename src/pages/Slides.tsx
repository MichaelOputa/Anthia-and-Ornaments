import { useState } from 'react';
import { ExternalLink, MessageCircle } from 'lucide-react';
import ImageModal from '../components/ImageModal';

export default function Slides() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    title: string;
  } | null>(null);

  const slidesItems = [
    {
      name: 'DSQUARED2 Designer Slides',
      description: `Effortless comfort meets everyday luxury.
An every day essential with a luxury edge.
Designed for comfort, styled for confidence.`,
      image: '/images/slide_1.jpg',
      price: '₦25,000',
    },
    {
      name: 'Nike Air Slides',
      description: `Effortless comfort meets everyday luxury.
An every day essential with a luxury edge.
Designed for comfort, styled for confidence.`,
      image: '/images/slide_3.jpg',
      price: '₦25,000',
    },
    {
      name: 'Rainbow Designer Slides',
      description: `Effortless comfort meets everyday luxury.
An every day essential with a luxury edge.
Designed for comfort, styled for confidence.`,
      image: '/images/slide_4.jpg',
      price: '₦25,000',
    },
    {
      name: 'Louis Vuitton Designer Slides',
      description: `Effortless comfort meets everyday luxury.
An every day essential with a luxury edge.
Designed for comfort, styled for confidence.`,
      image: '/images/slide_5.jpg',
      price: '₦25,000',
    },
    {
      name: 'AMIRI Designer Slides',
      description: `Effortless comfort meets everyday luxury.
An every day essential with a luxury edge.
Designed for comfort, styled for confidence.`,
      image: '/images/slide_7.jpg',
      price: '₦25,000',
    },
    {
      name: 'FENDI Designer Slides',
      description: `Effortless comfort meets everyday luxury.
An every day essential with a luxury edge.
Designed for comfort, styled for confidence.`,
      image: '/images/slide_8.jpg',
      price: '₦25,000',
    },
    {
      name: 'MONCLER 1987 Designer Slides',
      description: `Effortless comfort meets everyday luxury.
An every day essential with a luxury edge.
Designed for comfort, styled for confidence.`,
      image: '/images/slide_9.jpg',
      price: '₦25,000',
    },
    {
      name: 'Black MONCLER 1987 Designer Slides',
      description: `Effortless comfort meets everyday luxury.
An every day essential with a luxury edge.
Designed for comfort, styled for confidence.`,
      image: '/images/slide_10.jpg',
      price: '₦25,000',
    },
    {
      name: 'Givenchy Designer Slides',
      description: `Effortless comfort meets everyday luxury.
An every day essential with a luxury edge.
Designed for comfort, styled for confidence.`,
      image: '/images/slide_11.jpg',
      price: '₦25,000',
    },
    {
      name: 'Philipp Plein Designer Slides',
      description: `Effortless comfort meets everyday luxury.
An every day essential with a luxury edge.
Designed for comfort, styled for confidence.`,
      image: '/images/slide_12.jpg',
      price: '₦25,000',
    },
    {
      name: 'High Fashion Designer Slides',
      description: `Effortless comfort meets everyday luxury.
An every day essential with a luxury edge.
Designed for comfort, styled for confidence.`,
      image: '/images/slide_13.jpg',
      price: '₦25,000',
    },
    {
      name: 'Cortez Designer Slides',
      description: `Effortless comfort meets everyday luxury.
An every day essential with a luxury edge.
Designed for comfort, styled for confidence.`,
      image: '/images/slide_15.jpg',
      price: '₦25,000',
    },
    {
      name: 'D&G (Dolce & Gabbana) Designer Slides',
      description: `Effortless comfort meets everyday luxury.
An every day essential with a luxury edge.
Designed for comfort, styled for confidence.`,
      image: '/images/slide_16.jpg',
      price: '₦25,000',
    },
    {
      name: 'BALMAIN Designer Slides',
      description: `Effortless comfort meets everyday luxury.
An every day essential with a luxury edge.
Designed for comfort, styled for confidence.`,
      image: '/images/slide_17.jpg',
      price: '₦25,000',
    },
    {
      name: 'ALDO Designer Slides',
      description: `Effortless comfort meets everyday luxury.
An every day essential with a luxury edge.
Designed for comfort, styled for confidence.`,
      image: '/images/slide_18.jpg',
      price: '₦25,000',
    },
  ];

  const handleWhatsAppClick = (itemName: string) => {
    const message = `Hello! I'm interested in the ${itemName}. Can you provide more details?`;
    window.open(`https://wa.me/2348124238750?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 px-4 bg-gradient-to-br from-amber-50 to-stone-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
            Slides Collection
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our premium selection of designer slides, crafted for style and comfort with premium materials.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {slidesItems.map((item, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-stone-200 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 mb-4">
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
                      hoveredIndex === index ? 'opacity-30' : 'opacity-0'
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

                <div className="space-y-2">
                  <h3 className="text-xl font-serif font-bold text-gray-900">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                  <p className="text-lg font-semibold text-amber-600">
                    {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-br from-amber-50 to-stone-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
            More Styles Coming Soon
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            We're constantly adding new slides to our collection. Subscribe or contact us to be notified of new arrivals.
          </p>
          <a
            href="https://wa.me/2348124238750?text=I%20would%20like%20to%20know%20about%20new%20slides%20collections%20coming%20soon."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors shadow-lg font-medium"
          >
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Contact Us on WhatsApp
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
