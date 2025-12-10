import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  cartItemCount: number;
}

export function Header({ currentPage, onNavigate, cartItemCount }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', page: 'home' as Page },
    { label: 'Products', page: 'products' as Page },
    { label: 'About', page: 'about' as Page },
    { label: 'Admin', page: 'admin' as Page },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <button
            onClick={() => onNavigate('home')}
            className="flex flex-col items-start hover:opacity-80 transition-opacity"
          >
            <h1 className="text-2xl md:text-3xl font-serif text-amber-900">
              A&O
            </h1>
            <p className="text-xs md:text-sm tracking-widest text-gray-600 mt-1">
              OCCASIONS MADE BETTER
            </p>
          </button>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map(({ label, page }) => (
              <button
                key={page}
                onClick={() => onNavigate(page)}
                className={`text-sm tracking-wider transition-colors ${
                  currentPage === page
                    ? 'text-amber-900 font-medium border-b-2 border-amber-900'
                    : 'text-gray-700 hover:text-amber-900'
                }`}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => onNavigate('cart')}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingCart className="h-5 w-5 text-gray-700" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </nav>

          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => onNavigate('cart')}
              className="relative p-2"
            >
              <ShoppingCart className="h-5 w-5 text-gray-700" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-gray-200 mt-2">
            {navItems.map(({ label, page }) => (
              <button
                key={page}
                onClick={() => {
                  onNavigate(page);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-3 px-4 transition-colors ${
                  currentPage === page
                    ? 'text-amber-900 font-medium bg-amber-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
