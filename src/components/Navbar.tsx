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
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

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
    <>
      <nav style={{
        position: 'fixed', width: '100%', zIndex: 50,
        background: scrolled ? 'rgba(6,4,0,0.98)' : 'rgba(8,8,8,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(201,168,76,0.18)',
        boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.7)' : 'none',
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center',
            height: '68px',
          }}>
            {/* Logo */}
            <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
              <Logo />
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex lg:items-center lg:gap-4 lg:flex-1 lg:ml-8 lg:justify-center">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: isActive(link.path) ? '#C9A84C' : '#7a6840',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                    whiteSpace: 'nowrap',
                    padding: '4px 2px',
                    borderBottom: isActive(link.path) ? '1px solid rgba(201,168,76,0.5)' : '1px solid transparent',
                  }}
                  onMouseEnter={e => { if (!isActive(link.path)) (e.currentTarget as HTMLElement).style.color = '#E8C96A'; }}
                  onMouseLeave={e => { if (!isActive(link.path)) (e.currentTarget as HTMLElement).style.color = '#7a6840'; }}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop Search */}
            <form onSubmit={handleSearch} className="hidden md:flex" style={{ marginLeft: '16px', flexShrink: 0 }}>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  style={{
                    padding: '8px 36px 8px 14px',
                    fontSize: '0.78rem',
                    background: 'rgba(201,168,76,0.07)',
                    border: '1px solid rgba(201,168,76,0.2)',
                    borderRadius: '8px',
                    color: '#e8dfc0',
                    outline: 'none',
                    width: '150px',
                    fontFamily: 'Jost, sans-serif',
                    transition: 'border-color 0.2s, width 0.3s',
                  }}
                  onFocus={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.45)';
                    (e.currentTarget as HTMLElement).style.width = '180px';
                  }}
                  onBlur={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.2)';
                    (e.currentTarget as HTMLElement).style.width = '150px';
                  }}
                />
                <button type="submit" style={{
                  position: 'absolute', right: '10px', top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#C9A84C', background: 'none', border: 'none',
                  cursor: 'pointer', padding: 0, display: 'flex',
                }}>
                  <Search size={14} />
                </button>
              </div>
            </form>

            {/* Mobile: search icon + hamburger */}
            <div className="lg:hidden" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                  color: '#C9A84C', background: 'none', border: 'none',
                  cursor: 'pointer', padding: '10px',
                  borderRadius: '8px',
                  transition: 'background 0.2s',
                }}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 49,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
          }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile menu drawer */}
      <div style={{
        position: 'fixed',
        top: '68px', left: 0, right: 0, zIndex: 49,
        background: '#0a0800',
        borderBottom: '1px solid rgba(201,168,76,0.15)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
        transform: isOpen ? 'translateY(0)' : 'translateY(-110%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        maxHeight: 'calc(100svh - 68px)',
        overflowY: 'auto',
        pointerEvents: isOpen ? 'all' : 'none',
      }}>
        <div style={{ padding: '16px 16px 24px' }}>
          {/* Mobile search */}
          <form onSubmit={handleSearch} style={{ marginBottom: '16px' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                style={{
                  width: '100%',
                  padding: '12px 42px 12px 16px',
                  fontSize: '0.9rem',
                  background: 'rgba(201,168,76,0.07)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: '10px',
                  color: '#e8dfc0',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'Jost, sans-serif',
                }}
              />
              <button type="submit" style={{
                position: 'absolute', right: '14px', top: '50%',
                transform: 'translateY(-50%)',
                color: '#C9A84C', background: 'none', border: 'none', cursor: 'pointer',
              }}>
                <Search size={16} />
              </button>
            </div>
          </form>

          {/* Mobile nav links — larger touch targets */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '14px 16px',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  background: isActive(link.path) ? 'rgba(201,168,76,0.12)' : 'transparent',
                  color: isActive(link.path) ? '#C9A84C' : '#8a7a58',
                  borderLeft: isActive(link.path) ? '2px solid #C9A84C' : '2px solid transparent',
                  transition: 'all 0.15s',
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile CTA */}
          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
            <a
              href="https://wa.me/2348124238750?text=Hello! I am interested in your products."
              target="_blank" rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                padding: '14px', borderRadius: '10px',
                fontWeight: 600, fontSize: '0.88rem', letterSpacing: '0.06em',
                background: '#25d366', color: 'white', textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(37,211,102,0.2)',
              }}
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}