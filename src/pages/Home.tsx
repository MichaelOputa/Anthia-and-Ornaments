import { Link } from 'react-router-dom';
import { ChevronRight, ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import LazyImage from '../components/LazyImage';

const gold = '#C9A84C';
const goldLight = '#E8C96A';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger entrance animations after mount
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const featuredItems = [
    { title: 'Jewelry', description: 'Handcrafted pieces that tell your story', image: '/images/jewelry set.jpeg', link: '/jewelry' },
    { title: 'Wristwatches', description: 'Timeless designs to elevate your look', image: '/images/chanel_3.jpg', link: '/wristwatches' },
    { title: 'Fashion', description: 'Premium clothing for the modern woman', image: '/images/clothing_1.jpg', link: '/clothing' },
    { title: 'Eyeglasses', description: 'Premium frames for every style', image: '/images/prada_2.png', link: '/eyeglasses' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#080808', overflowX: 'hidden' }}>

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#080808',
      }}>

        {/* Ambient gold glow — CSS only, no SVG pattern */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(201,168,76,0.18) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
          background: 'linear-gradient(to top, #080808 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Subtle noise texture overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }} />

        {/* Content */}
        <div style={{
          position: 'relative', zIndex: 10,
          textAlign: 'center',
          padding: '100px 20px 60px',
          maxWidth: '780px',
          margin: '0 auto',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}>

          {/* Eyebrow label */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            marginBottom: '28px',
            padding: '7px 18px',
            borderRadius: '40px',
            border: '1px solid rgba(201,168,76,0.3)',
            background: 'rgba(201,168,76,0.06)',
          }}>
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: gold, display: 'inline-block',
              boxShadow: '0 0 8px rgba(201,168,76,0.8)',
              animation: 'pulse-dot 2s ease-in-out infinite',
            }} />
            <span style={{
              fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: gold,
            }}>
              Nigeria's Finest — Jewelry · Fashion · Fragrance
            </span>
          </div>

          {/* Main headline */}
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2.8rem, 10vw, 6rem)',
            fontWeight: 300,
            lineHeight: 1.0,
            marginBottom: '10px',
            letterSpacing: '-0.01em',
            color: '#e8dfc0',
          }}>
            Anthia &amp;
          </h1>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2.8rem, 10vw, 6rem)',
            fontWeight: 600,
            lineHeight: 1.0,
            marginBottom: '28px',
            letterSpacing: '-0.01em',
            background: `linear-gradient(135deg, #F0D97A 0%, ${gold} 50%, ${goldLight} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Ornaments
          </h1>

          {/* Subtext — clear brand promise */}
          <p style={{
            fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
            color: '#8a7a58',
            lineHeight: 1.75,
            maxWidth: '500px',
            margin: '0 auto 44px',
            fontWeight: 400,
          }}>
            Curated jewelry, designer watches, signature fragrances &amp; elegant fashion — for the modern Nigerian woman and man who wears their identity with pride.
          </p>

          {/* Primary CTA — bold and unmissable */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
            <Link to="/jewelry" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              padding: '16px 40px',
              borderRadius: '60px',
              fontWeight: 700,
              fontSize: '0.9rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              background: `linear-gradient(135deg, ${gold} 0%, ${goldLight} 100%)`,
              color: '#080808',
              boxShadow: '0 0 40px rgba(201,168,76,0.4), 0 8px 32px rgba(0,0,0,0.4)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 60px rgba(201,168,76,0.55), 0 12px 40px rgba(0,0,0,0.5)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(201,168,76,0.4), 0 8px 32px rgba(0,0,0,0.4)';
              }}
            >
              Explore Collection <ChevronRight size={18} />
            </Link>

            {/* Secondary CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
              {[
                { label: 'Wristwatches', to: '/wristwatches' },
                { label: 'Clothing', to: '/clothing' },
              ].map(({ label, to }) => (
                <Link key={to} to={to} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '10px 22px', borderRadius: '40px',
                  fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.08em',
                  textTransform: 'uppercase', textDecoration: 'none',
                  color: '#9a8860',
                  border: '1px solid rgba(201,168,76,0.2)',
                  background: 'rgba(201,168,76,0.04)',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = gold;
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.4)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.08)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = '#9a8860';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.2)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.04)';
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: '28px', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
          opacity: mounted ? 0.5 : 0,
          transition: 'opacity 1.2s ease 0.6s',
          animation: 'bounce-down 2s ease-in-out infinite',
        }}>
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6b5e3a' }}>Scroll</span>
          <ArrowDown size={14} style={{ color: gold }} />
        </div>
      </section>

      {/* ─── TRUST BAR ────────────────────────────────────────────────────── */}
      <section style={{
        padding: '20px 16px',
        background: 'linear-gradient(90deg, #0a0800, #0e0900, #0a0800)',
        borderTop: '1px solid rgba(201,168,76,0.12)',
        borderBottom: '1px solid rgba(201,168,76,0.12)',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexWrap: 'wrap', gap: '0',
        }}>
          {[
            '✦ Handpicked Collections',
            '✦ Nationwide Delivery',
            '✦ WhatsApp Support',
            '✦ Quality Guaranteed',
            '✦ Occasions Made Better',
          ].map((item, i) => (
            <span key={i} style={{
              fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: '#6b5e3a',
              padding: '4px 20px',
              whiteSpace: 'nowrap',
            }}>
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* ─── FEATURED COLLECTIONS ─────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(60px, 10vw, 100px) 16px', background: '#080808' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(36px, 6vw, 60px)' }}>
            <p style={{
              fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: gold, marginBottom: '14px',
            }}>
              Shop by Category
            </p>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(1.8rem, 5vw, 3.2rem)',
              fontWeight: 400, color: '#e8dfc0', marginBottom: '0',
              lineHeight: 1.2,
            }}>
              Featured Collections
            </h2>
            <div style={{
              height: '1px', maxWidth: '200px', margin: '20px auto 0',
              background: `linear-gradient(90deg, transparent, ${gold}, transparent)`,
              opacity: 0.4,
            }} />
          </div>

          {/* Collection grid — responsive */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
            gap: '16px',
          }}>
            {featuredItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                style={{
                  textDecoration: 'none', display: 'block',
                  borderRadius: '16px', overflow: 'hidden',
                  position: 'relative',
                  border: '1px solid rgba(201,168,76,0.1)',
                  transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
                  background: '#111008',
                  // First item spans 2 cols on large screens for visual hierarchy
                  ...(index === 0 ? {
                    gridColumn: 'span 2',
                  } : {}),
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.35)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(201,168,76,0.1)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.1)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <div style={{
                  aspectRatio: index === 0 ? '16/9' : '3/4',
                  position: 'relative', overflow: 'hidden',
                }}>
                  <LazyImage
                    src={item.image}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', transition: 'transform 0.6s ease' }}
                    className="collection-img"
                  />
                  {/* Dark gradient overlay */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(8,8,8,0.88) 0%, rgba(8,8,8,0.15) 50%, transparent 100%)',
                  }} />

                  {/* Text overlay */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    padding: 'clamp(20px, 4vw, 28px)',
                  }}>
                    <p style={{
                      fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em',
                      textTransform: 'uppercase', color: gold, marginBottom: '8px',
                    }}>
                      Shop {item.title}
                    </p>
                    <h3 style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: index === 0 ? 'clamp(1.5rem, 4vw, 2.2rem)' : '1.4rem',
                      fontWeight: 600, color: '#e8dfc0', marginBottom: '6px', lineHeight: 1.2,
                    }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: '#9a8860', marginBottom: '14px' }}>
                      {item.description}
                    </p>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.1em',
                      textTransform: 'uppercase', color: gold,
                    }}>
                      Explore <ChevronRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BRAND STORY STRIP ────────────────────────────────────────────── */}
      <section style={{
        padding: 'clamp(60px, 10vw, 90px) 16px',
        background: 'linear-gradient(135deg, #0e0900 0%, #080808 100%)',
        borderTop: '1px solid rgba(201,168,76,0.1)',
        borderBottom: '1px solid rgba(201,168,76,0.1)',
      }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
          {/* Decorative accent */}
          <div style={{
            width: '40px', height: '1px', background: gold,
            margin: '0 auto 24px', opacity: 0.6,
          }} />
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(1.6rem, 5vw, 2.8rem)',
            fontWeight: 300, color: '#e8dfc0',
            marginBottom: '20px', lineHeight: 1.3,
          }}>
            Where Elegance Meets{' '}
            <em style={{ color: gold, fontStyle: 'italic' }}>Nigerian Soul</em>
          </h2>
          <p style={{
            fontSize: 'clamp(0.88rem, 2vw, 1rem)',
            color: '#6b5e3a', lineHeight: 1.9,
            marginBottom: '32px',
          }}>
            Every piece in our collection is carefully curated to celebrate beauty, quality, and Nigerian culture — from stunning jewelry to elegant fashion. We believe style is personal, and luxury shouldn't come with noise.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/about" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '12px 28px', borderRadius: '8px',
              fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.08em',
              textTransform: 'uppercase', textDecoration: 'none',
              color: gold, border: '1px solid rgba(201,168,76,0.3)',
              background: 'rgba(201,168,76,0.05)',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.12)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.05)'; }}
            >
              Our Story <ChevronRight size={14} />
            </Link>
            <a
              href="https://wa.me/2348124238750?text=Hello! I am interested in your products."
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '12px 28px', borderRadius: '8px',
                fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.08em',
                textTransform: 'uppercase', textDecoration: 'none',
                background: '#25d366', color: 'white',
                boxShadow: '0 4px 20px rgba(37,211,102,0.2)',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.88'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
            >
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Animations */}
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
        @keyframes bounce-down {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }
        .collection-img { object-fit: cover; }
        a:hover .collection-img { transform: scale(1.06); }

        /* Mobile overrides */
        @media (max-width: 640px) {
          /* Force first featured item to single col on mobile */
          a[style*="span 2"] {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </div>
  );
}