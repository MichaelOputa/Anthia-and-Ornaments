import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Jewelry', path: '/jewelry' },
    { name: 'Perfumes', path: '/perfumes' },
    { name: 'Clothing', path: '/clothing' },
    { name: 'Caps', path: '/caps' },
    {name: 'Slides', path: '/slides' },
    { name: 'Fabrics', path: '/fabrics' },
    {name: 'Wristwatches', path: '/wristwatches' },
    { name: 'Eyeglasses', path: '/eyeglasses' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex flex-col items-start">
            <h1 className="text-2xl md:text-3xl font-serif text-amber-900">
              A&O
            </h1>
            <p className="text-xs md:text-sm tracking-widest text-gray-600 mt-1">
              OCCASIONS MADE BETTER
            </p>
          </Link>

          <div className="hidden lg:flex items-center space-x-6 flex-1 ml-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-amber-600'
                    : 'text-gray-700 hover:text-amber-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="px-4 py-2 text-sm bg-gray-100 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-amber-600 w-48"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-amber-600"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            <form onSubmit={handleSearch} className="md:hidden mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-4 py-2 text-sm bg-gray-100 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-amber-600"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-amber-600"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </form>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-lg text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-amber-50 text-amber-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
