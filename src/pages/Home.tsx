import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles } from 'lucide-react';
import LazyImage from '../components/LazyImage';

const gold = '#C9A84C';
const goldLight = '#E8C96A';

export default function Home() {
  const featuredItems = [
    { title: 'New Arrival', description: 'Perfumes — best fragrance for everyday elegance', image: '/images/perfume_1.JPG', link: '/perfumes' },
    { title: 'Exquisite Jewelry', description: 'Handcrafted pieces that tell your story', image: '/images/jewelry set.jpeg', link: '/jewelry' },
    { title: 'Designer Eyeglasses', description: 'Premium frames for every style', image: '/images/prada_2.png', link: '/eyeglasses' },
    { title: 'Elegant Fashion', description: 'Premium clothing for the modern woman', image: '/images/clothing_1.jpg', link: '/clothing' },
    { title: 'Luxury Wristwatches', description: 'Timeless designs to elevate your look', image: '/images/chanel_3.jpg', link: '/wristwatches' },
  ];

  const btnGold: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    padding: '13px 28px', borderRadius: '8px', fontWeight: 600, fontSize: '0.88rem',
    letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none',
    background: `linear-gradient(135deg, ${gold}, ${goldLight})`,
    color: '#080808', transition: 'all 0.2s', boxShadow: '0 0 24px rgba(201,168,76,0.3)',
  };

  const btnOutline: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    padding: '13px 28px', borderRadius: '8px', fontWeight: 600, fontSize: '0.88rem',
    letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none',
    background: 'transparent', color: gold,
    border: `1px solid rgba(201,168,76,0.4)`, transition: 'all 0.2s',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#080808' }}>
      {/* Hero */}
      <section style={{
        position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.12) 0%, #080808 65%)',
        overflow: 'hidden',
      }}>
        {/* Decorative gold lines */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 60L60 0M0 0l60 60' stroke='rgba(201,168,76,0.04)' stroke-width='1'/%3E%3C/svg%3E")`, backgroundSize: '60px 60px', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 16px', maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <Sparkles style={{ color: gold, width: 32, height: 32, animation: 'pulse 2s infinite' }} />
          </div>

          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 300, lineHeight: 1.05, marginBottom: '20px',
            background: `linear-gradient(135deg, #e8dfc0 30%, ${gold} 60%, ${goldLight} 100%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            Anthia & Ornaments
          </h1>

          <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', color: '#6b5e3a', marginBottom: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500 }}>
            Jewelry · Wristwatches · Eyewear · Clothing
          </p>
          <p style={{ fontSize: '1rem', color: '#4a3e22', marginBottom: '44px', lineHeight: 1.8, maxWidth: '520px', margin: '0 auto 44px' }}>
            A unisex online store curating intentional pieces designed for everyday elegance and meaningful moments. <em style={{ color: gold }}>...occasions made better</em>
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
            <Link to="/jewelry" style={btnGold}>Shop Jewelry <ChevronRight size={16} style={{ marginLeft: 6 }} /></Link>
            <Link to="/clothing" style={btnOutline}>Shop Clothing <ChevronRight size={16} style={{ marginLeft: 6 }} /></Link>
            <Link to="/wristwatches" style={btnOutline}>Wristwatches <ChevronRight size={16} style={{ marginLeft: 6 }} /></Link>
            <Link to="/eyeglasses" style={btnGold}>Eyeglasses <ChevronRight size={16} style={{ marginLeft: 6 }} /></Link>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section style={{ padding: '100px 16px', background: '#080808' }}>
        <div className="max-w-7xl mx-auto">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: gold, marginBottom: '12px' }}>
              Curated for You
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 400, color: '#e8dfc0', marginBottom: '0' }}>
              Featured Collections
            </h2>
            <hr style={{ border: 'none', height: '1px', background: `linear-gradient(90deg, transparent, ${gold}, transparent)`, opacity: 0.3, maxWidth: '300px', margin: '20px auto 0' }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                style={{ textDecoration: 'none', display: 'block', borderRadius: '16px', overflow: 'hidden', position: 'relative', border: '1px solid rgba(201,168,76,0.1)', transition: 'border-color 0.3s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.1)')}
                className="group"
              >
                <div style={{ aspectRatio: '3/4', position: 'relative', overflow: 'hidden', background: '#111' }}>
                  <LazyImage
                    src={item.image}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', transition: 'transform 0.5s ease' }}
                    className="group-hover:scale-105"
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.1) 60%)', zIndex: 1 }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px', zIndex: 2 }}>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 600, color: '#e8dfc0', marginBottom: '6px' }}>{item.title}</h3>
                    <p style={{ fontSize: '0.82rem', color: '#9a8860', marginBottom: '12px' }}>{item.description}</p>
                    <div style={{ display: 'flex', alignItems: 'center', color: gold, fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      Explore <ChevronRight size={14} style={{ marginLeft: 4, transition: 'transform 0.2s' }} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand story strip */}
      <section style={{ padding: '80px 16px', background: 'linear-gradient(135deg, #0e0900 0%, #080808 100%)', borderTop: '1px solid rgba(201,168,76,0.1)', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
        <div className="max-w-4xl mx-auto" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 300, color: '#e8dfc0', marginBottom: '20px' }}>
            Where Elegance Meets Tradition
          </h2>
          <p style={{ fontSize: '1rem', color: '#6b5e3a', lineHeight: 1.9, maxWidth: '600px', margin: '0 auto 28px' }}>
            Each piece in our collection is carefully curated to celebrate beauty, quality, and Nigerian culture — from stunning jewelry to elegant fashion.
          </p>
          <Link to="/about" style={{ display: 'inline-flex', alignItems: 'center', color: gold, fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}>
            Learn More About Us <ChevronRight size={15} style={{ marginLeft: 4 }} />
          </Link>
        </div>
      </section>
    </div>
  );
}