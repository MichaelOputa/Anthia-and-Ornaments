import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles } from 'lucide-react';

export default function Home() {
  const featuredItems = [
    {
      title: 'New Arrival',
      description: 'Our business is growing and we now we are introducing Perfumes, best fragrance for you and everyday elegance',
      image: '/images/perfume_1.JPG',
      link: '/perfumes',
    },
    {
      title: 'Exquisite Jewelry',
      description: 'Handcrafted pieces that tell your story',
      image: '/images/necklace_set.png',
      link: '/jewelry',
    },
    {
      title: 'Designer Eyeglasses',
      description: 'Premium frames for every style',
      image: '/images/prada_2.png',
      link: '/eyeglasses',
    },
    {
      title: 'Elegant Fashion',
      description: 'Premium clothing for the modern woman',
      image: '/images/clothing_1.jpg',
      link: '/clothing',
    },
    {
      title: 'Beautiful Fabrics',
      description: 'Luxurious textiles for every occasion',
      image: '/images/Chiffon Lace_9.jpg',
      link: '/fabrics',
    },
    {
      title: 'Luxury Wristwatches',
      description: 'Timeless designs to elevate your look',
      image: '/images/chanel_3.jpg',
      link: '/wristwatches',
    },
    {
      title: 'Stylish Slides',
      description: 'Comfort meets fashion in our slide collection',
      image: '/images/slide_9.jpg',
      link: '/slides',
    },
    {
      title: 'Chic Caps',
      description: 'Trendy caps to complete your outfit',
      image: '/images/cap_7.jpeg',
      link: '/caps',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-stone-50">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1927769/pexels-photo-1927769.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10"></div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-8 w-8 text-amber-600 animate-pulse" />
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6">
            Anthia & Ornaments
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 font-light">
            Jewelry • Wristwatches • Eyewear • Clothing • Fabrics • Slides
          </p>

          <p className="text-lg text-gray-600 mb-12">
            A unisex online store curating intentional pieces designed for everyday elegance and meaningful moments.
            ...occasions made better
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/jewelry"
              className="inline-flex items-center justify-center px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors shadow-lg hover:shadow-xl font-medium"
            >
              Shop Jewelry
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/clothing"
              className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-900 rounded-lg transition-colors font-medium"
            >
              Shop Clothing
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/eyeglasses"
              className="inline-flex items-center justify-center px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors shadow-lg hover:shadow-xl font-medium"
            >
              Shop Eyeglasses
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/wristwatches"
              className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-900 rounded-lg transition-colors font-medium"
            >
              Shop Wristwatches
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/fabrics"
              className="inline-flex items-center justify-center px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors shadow-lg hover:shadow-xl font-medium"
            >
              Shop Fabrics
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Featured Collections
            </h2>
            <p className="text-lg text-gray-600">
              Discover our curated selection of luxury pieces
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow"
              >
                <div className="aspect-[3/4] bg-gradient-to-br from-amber-100 to-stone-200 relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                    <h3 className="text-2xl font-serif font-bold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm opacity-90">{item.description}</p>
                    <div className="mt-4 flex items-center text-amber-300 group-hover:translate-x-2 transition-transform">
                      <span className="text-sm font-medium">Explore</span>
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-amber-50 to-stone-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Where Elegance Meets Tradition
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Each piece in our collection is carefully crafted to celebrate the beauty and richness of Nigerian culture.
            From stunning jewelry to elegant fashion, we bring you the finest in luxury accessories.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium"
          >
            Learn More About Us
            <ChevronRight className="ml-1 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
