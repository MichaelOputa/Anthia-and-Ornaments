import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-serif font-semibold text-white">
                Anthia & Ornaments
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Elegant Nigerian jewelry and fashion for the modern woman.
              Celebrating craftsmanship, quality, and timeless style.
            </p>
            <div className="flex items-center space-x-2 mt-4">
              <MapPin className="h-4 w-4 text-amber-500" />
              <span className="text-sm">Nigeria</span>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/jewelry" className="text-sm hover:text-amber-500 transition-colors">
                  Jewelry Collection
                </Link>
              </li>
              <li>
                <Link to="/clothing" className="text-sm hover:text-amber-500 transition-colors">
                  Clothing Collection
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-sm hover:text-amber-500 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-amber-500 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
            <p className="text-sm text-gray-400 mb-4">
              Follow us on TikTok and reach out via WhatsApp for inquiries.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.tiktok.com/@anthia_ornaments?_r=1&_t=ZS-923oq25LO9V"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-amber-600 transition-colors p-3 rounded-lg"
                aria-label="TikTok"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Anthia & Ornaments. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
