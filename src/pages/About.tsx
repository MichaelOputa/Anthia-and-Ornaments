import { Heart, Sparkles, Award, Users } from 'lucide-react';
import { useState } from 'react';
import ImageModal from '../components/ImageModal';
import LazyImage from '../components/LazyImage';

const gold = '#C9A84C';

export default function About() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; title: string } | null>(null);

  const values = [
    { icon: Heart, title: 'Craftsmanship', description: 'Every piece is carefully selected with attention to detail and quality that lasts.' },
    { icon: Sparkles, title: 'Elegance', description: 'We celebrate timeless beauty and sophistication in every design we curate.' },
    { icon: Award, title: 'Quality', description: 'Only the finest materials and techniques are represented in our collections.' },
    { icon: Users, title: 'Community', description: 'Supporting local artisans and celebrating Nigerian culture with pride.' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#080808' }}>
      {/* Page hero */}
      <section style={{ padding: '110px 16px 60px', background: 'linear-gradient(180deg, #0e0900 0%, #080808 100%)', borderBottom: '1px solid rgba(201,168,76,0.1)', textAlign: 'center' }}>
        <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: gold, marginBottom: '14px' }}>Our Story</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 300, color: '#e8dfc0', marginBottom: '16px' }}>
          About Anthia & Ornaments
        </h1>
        <p style={{ fontSize: '1rem', color: '#6b5e3a' }}>Where Nigerian elegance meets timeless sophistication</p>
      </section>

      <section style={{ padding: '80px 16px' }}>
        <div className="max-w-6xl mx-auto">

          {/* Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" style={{ marginBottom: '80px' }}>
            <div
              style={{ aspectRatio: '4/3', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(201,168,76,0.15)', cursor: 'pointer', background: '#111' }}
              onClick={() => setSelectedImage({ src: '/images/anthia_and_ornaments.PNG', alt: 'Anthia and Ornaments', title: 'Founder — Anthia & Ornaments' })}
            >
              <LazyImage src="/images/anthia_and_ornaments.PNG" alt="Anthia and Ornaments" style={{ width: '100%', height: '100%', transition: 'transform 0.5s' }} />
            </div>
            <div>
              <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: gold, marginBottom: '14px' }}>Who We Are</p>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.7rem, 4vw, 2.6rem)', fontWeight: 400, color: '#e8dfc0', marginBottom: '24px' }}>Our Story</h2>
              <p style={{ fontSize: '0.95rem', color: '#6b5e3a', lineHeight: 1.85, marginBottom: '16px' }}>
                Anthia & Ornaments is a unisex online store offering thoughtfully curated jewelry, wristwatches, eyewear, and clothing. Our pieces are selected with balance, individuality, and presence in mind — created to complement different styles without limitation.
              </p>
              <p style={{ fontSize: '0.95rem', color: '#4a3e22', lineHeight: 1.85, fontStyle: 'italic' }}>
                This is luxury without noise. Style without pressure. Pieces that move with you.
              </p>
            </div>
          </div>

          {/* Values */}
          <div style={{ marginBottom: '80px' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: gold, marginBottom: '12px' }}>What We Stand For</p>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', fontWeight: 400, color: '#e8dfc0' }}>Our Values</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '32px 20px', background: '#0e0900', borderRadius: '14px', border: '1px solid rgba(201,168,76,0.1)', transition: 'border-color 0.3s, box-shadow 0.3s' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(201,168,76,0.3)'; el.style.boxShadow = '0 8px 32px rgba(201,168,76,0.08)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(201,168,76,0.1)'; el.style.boxShadow = 'none'; }}
                >
                  <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(201,168,76,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <value.icon style={{ color: gold, width: 22, height: 22 }} />
                  </div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: 600, color: '#e8dfc0', marginBottom: '10px' }}>{value.title}</h3>
                  <p style={{ fontSize: '0.8rem', color: '#6b5e3a', lineHeight: 1.7 }}>{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why Us */}
          <div style={{ background: '#0e0900', borderRadius: '20px', padding: '48px', border: '1px solid rgba(201,168,76,0.12)', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 400, color: '#e8dfc0', marginBottom: '24px' }}>Why Choose Us?</h2>
            <p style={{ fontSize: '0.95rem', color: '#6b5e3a', lineHeight: 1.85, maxWidth: '580px', margin: '0 auto 16px' }}>
              At Anthia & Ornaments, we're not just selling jewelry and clothing — we're sharing stories, celebrating culture, and creating lasting memories.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#6b5e3a', lineHeight: 1.85, maxWidth: '580px', margin: '0 auto 16px' }}>
              Every purchase supports local Nigerian artisans and helps preserve traditional craftsmanship techniques for future generations.
            </p>
            <p style={{ fontSize: '1rem', fontWeight: 600, color: gold }}>Experience the perfect blend of tradition, quality, and contemporary elegance.</p>
          </div>
        </div>
      </section>

      <ImageModal isOpen={selectedImage !== null} imageSrc={selectedImage?.src || ''} imageAlt={selectedImage?.alt || ''} imageTitle={selectedImage?.title || ''} onClose={() => setSelectedImage(null)} />
    </div>
  );
}