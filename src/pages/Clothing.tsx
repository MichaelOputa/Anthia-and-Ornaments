import { useState } from 'react';

export default function Clothing() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const clothingItems = [
    {
      name: 'Ankara Maxi Dress',
      category: 'Dresses',
      image: '/images/clothing/dress-1.jpg',
    },
    {
      name: 'Elegant Jumpsuit',
      category: 'Jumpsuits',
      image: '/images/clothing/jumpsuit-1.jpg',
    },
    {
      name: 'Traditional Gele Set',
      category: 'Accessories',
      image: '/images/clothing/gele-1.jpg',
    },
    {
      name: 'Evening Gown',
      category: 'Gowns',
      image: '/images/clothing/gown-1.jpg',
    },
    {
      name: 'Two-Piece Set',
      category: 'Sets',
      image: '/images/clothing/set-1.jpg',
    },
    {
      name: 'Lace Blouse',
      category: 'Tops',
      image: '/images/clothing/blouse-1.jpg',
    },
    {
      name: 'Aso Ebi Ensemble',
      category: 'Traditional',
      image: '/images/clothing/asoebi-1.jpg',
    },
    {
      name: 'Kaftan Dress',
      category: 'Dresses',
      image: '/images/clothing/kaftan-1.jpg',
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 px-4 bg-gradient-to-br from-stone-50 to-amber-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
            Clothing Collection
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Embrace elegance with our carefully curated collection of premium fashion pieces, designed for the modern Nigerian woman.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {clothingItems.map((item, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative aspect-[3/4] bg-gradient-to-br from-stone-100 to-amber-100 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                  <div
                    className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                      hoveredIndex === index ? 'opacity-20' : 'opacity-0'
                    }`}
                  ></div>

                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${
                      hoveredIndex === index ? 'scale-110' : 'scale-100'
                    }`}
                  >
                    <div className="text-center p-8">
                      <div className="w-32 h-40 mx-auto mb-4 bg-stone-200 rounded-lg opacity-50"></div>
                      <p className="text-sm text-gray-600 font-medium">
                        Image: {item.image}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-xs text-amber-600 font-medium uppercase tracking-wide mb-1">
                    {item.category}
                  </p>
                  <h3 className="text-lg font-serif font-semibold text-gray-900">
                    {item.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-br from-stone-50 to-amber-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
            Find Your Perfect Style
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Get in touch with us to learn more about our clothing collection, sizes, and custom tailoring options.
          </p>
          <a
            href="https://wa.me/2348124238750?text=Hello! I'm interested in your clothing collection."
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
    </div>
  );
}
