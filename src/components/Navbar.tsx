import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Jewelry', path: '/jewelry' },
    { name: 'Perfumes', path: '/perfumes' },
    { name: 'Clothing', path: '/clothing' },
    { name: 'Wristwatches', path: '/wristwatches' },
    { name: 'Eyeglasses', path: '/eyeglasses' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav style={{
      position: 'fixed', width: '100%', zIndex: 50,
      background: scrolled ? 'rgba(8,8,8,0.99)' : 'rgba(8,8,8,0.93)',
      backdropFilter: 'blur(18px)',
      borderBottom: '1px solid rgba(201,168,76,0.22)',
      boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.7)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '72px' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Logo />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex lg:items-center lg:gap-5 lg:flex-1 lg:ml-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: isActive(link.path) ? '#C9A84C' : '#9a8860',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#E8C96A')}
                onMouseLeave={e => { if (!isActive(link.path)) e.currentTarget.style.color = '#9a8860'; }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex" style={{ marginLeft: '16px' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search..."
                style={{
                  padding: '7px 32px 7px 12px',
                  fontSize: '0.78rem',
                  background: 'rgba(201,168,76,0.07)',
                  border: '1px solid rgba(201,168,76,0.22)',
                  borderRadius: '6px',
                  color: '#e8dfc0',
                  outline: 'none',
                  width: '140px',
                  fontFamily: 'Jost, sans-serif',
                }}
              />
              <button type="submit" style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', color: '#C9A84C', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
                <Search size={14} />
              </button>
            </div>
          </form>

          {/* Mobile toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden" style={{ color: '#C9A84C', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div style={{ background: '#0a0800', borderTop: '1px solid rgba(201,168,76,0.15)' }}>
          <div style={{ padding: '16px' }}>
            <form onSubmit={handleSearch} style={{ marginBottom: '12px' }}>
              <div style={{ position: 'relative' }}>
                <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search products..."
                  style={{ width: '100%', padding: '10px 36px 10px 12px', fontSize: '0.9rem', background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '8px', color: '#e8dfc0', outline: 'none', boxSizing: 'border-box' }} />
                <button type="submit" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#C9A84C', background: 'none', border: 'none', cursor: 'pointer' }}>
                  <Search size={15} />
                </button>
              </div>
            </form>
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}
                style={{
                  display: 'block', padding: '10px 12px', borderRadius: '6px', marginBottom: '2px',
                  fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                  textDecoration: 'none',
                  background: isActive(link.path) ? 'rgba(201,168,76,0.12)' : 'transparent',
                  color: isActive(link.path) ? '#C9A84C' : '#9a8860',
                }}
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