import { useState } from 'react';
import { Image as ImageIcon, Video } from 'lucide-react';

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<'images' | 'videos'>('images');

  const galleryImages = [
    {
      url: '/images/Tomi_1.jpg',
      title: 'Luxury Packaged Wristwatch',
      description: 'Elegant wristwatch in premium packaging',
    },
    {
      url: '/images/bracelet_1.jpg',
      title: 'Chain Bracelet Set',
      description: 'Stylish chain design for everyday wear',
    },
    {
      url: '/images/bracelet_3.jpg',
      title: 'Gold Bracelet Set 2',
      description: 'Luxury design highlights',
    },
    {
      url: '/images/bracelet_4.jpg',
      title: 'Silver Bracelet',
      description: 'Modern elegance in silver',
    },
    {
      url: '/images/Organza_3.jpg',
      title: 'Organza Dress Collection',
      description: 'Flowy and elegant organza dresses for special occasions',
    },
    {
      url: '/images/wristwatch_1.jpg',
      title: 'Wristwatch Collection',
      description: 'Timeless wristwatches for every occasion',
    },
    {
      url: '/images/clothing_1.jpg',
      title: 'The Blue Regal Poise Gown ✨',
      description: 'Elegant gown perfect for special occasions',
    },
    {
      url: '/images/prada.png',
      title: 'Premium Black Frame Sunglasses',
      description: 'Sleek black frames with UV protection',
    },
    {
      url: '/images/rings_1.jpg',
      title: 'Statement Rings',
      description: 'Bold and sophisticated ring designs',
    },
  ];

  const galleryVideos = [
    {
      url: '/videos/bracelet-1.mp4',
      title: 'Collection Showcase 1',
      description: 'Highlighting our exquisite jewelry pieces',
    },
    {
      url: '/videos/clothing_1.mp4',
      title: 'Collection Showcase 2',
      description: 'Styling tips and fashion inspiration',
    },
    {
      url: '/videos/wristwatch_1.mp4',
      title: 'Collection Showcase 3',
      description: 'Timeless wristwatches for every occasion',
    },
    {
      url: '/videos/wristwatch_2.mp4',
      title: 'Collection Showcase 4',
      description: 'Explore our elegant wristwatch designs',
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 px-4 bg-gradient-to-br from-amber-50 to-stone-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
            Gallery
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our stunning collection of photos and videos showcasing the beauty and craftsmanship of our products.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-lg border border-gray-300 bg-white p-1">
              <button
                onClick={() => setActiveTab('images')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center ${
                  activeTab === 'images'
                    ? 'bg-amber-600 text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <ImageIcon className="h-5 w-5 mr-2" />
                Images
              </button>
              <button
                onClick={() => setActiveTab('videos')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center ${
                  activeTab === 'videos'
                    ? 'bg-amber-600 text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Video className="h-5 w-5 mr-2" />
                Videos
              </button>
            </div>
          </div>

          {activeTab === 'images' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => (
                <a
                  key={index}
                  href={image.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square bg-gradient-to-br from-amber-100 to-stone-200 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer block"
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-white font-semibold text-lg mb-1">{image.title}</h3>
                    <p className="text-gray-100 text-sm">{image.description}</p>
                  </div>
                </a>
              ))}
            </div>
          )}

          {activeTab === 'videos' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {galleryVideos.map((video, index) => (
                <a
                  key={index}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-video bg-gradient-to-br from-stone-100 to-amber-100 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer block"
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                    <div className="text-center p-4 z-10">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-white/90 rounded-full group-hover:bg-white transition-colors mb-3">
                        <Video className="h-8 w-8 text-amber-600" />
                      </div>
                      <h3 className="text-white font-semibold text-lg mb-1">{video.title}</h3>
                      <p className="text-gray-100 text-sm">{video.description}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-br from-amber-50 to-stone-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
            Follow Us on TikTok
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Stay updated with our latest collections, styling tips, and behind-the-scenes content.
          </p>
          <a
            href="https://www.tiktok.com/@anthia_ornaments?_r=1&_t=ZS-923oq25LO9V"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors shadow-lg font-medium"
          >
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
            Visit Our TikTok
          </a>
        </div>
      </section>
    </div>
  );
}
