import { useState, useMemo } from 'react';
import { Image as ImageIcon, Video, ChevronDown, ChevronUp } from 'lucide-react';
import LazyImage from '../components/LazyImage';

const gold = '#C9A84C';

const galleryImages = [
  { url: '/images/bracelet_2.jpg', title: 'Silver Bracelet Collection', description: 'Elegant silver bracelets with premium craftsmanship' },
  { url: '/images/clothing_2.png', title: 'Boubou Collection', description: 'Flowing, free-size boubou designed for effortless elegance' },
  { url: '/images/perfume_2.JPG', title: 'Perfume Collection', description: 'Best fragrances for everyday elegance' },
  { url: '/images/poedagar_1.jpg', title: 'Poedagar Collection', description: 'Luxurious poeders for a radiant glow' },
];

const galleryVideos = [
  { url: '/videos/wristwatch_1.mp4', title: 'Collection Showcase 1', description: 'Behind-the-scenes look at our craftsmanship' },
  { url: '/videos/clothing_1.mp4', title: 'Collection Showcase 2', description: 'Styling tips and fashion inspiration' },
  { url: '/videos/bracelet-1.mp4', title: 'Collection Showcase 3', description: 'Product highlights and details' },
  { url: '/videos/wristwatch_2.mp4', title: 'Collection Showcase 4', description: 'Customer testimonials and reviews' },
];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<'images' | 'videos'>('images');
  const [showAllImages, setShowAllImages] = useState(false);
  const [showAllVideos, setShowAllVideos] = useState(false);

  const displayedImages = useMemo(() => showAllImages ? galleryImages : galleryImages.slice(0, 6), [showAllImages]);
  const displayedVideos = useMemo(() => showAllVideos ? galleryVideos : galleryVideos.slice(0, 2), [showAllVideos]);

  const tabActive: React.CSSProperties = {
    padding: '10px 24px', borderRadius: '8px', fontWeight: 600, fontSize: '0.82rem',
    letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '8px', border: 'none', cursor: 'pointer',
    background: `linear-gradient(135deg, ${gold}, #E8C96A)`, color: '#080808', transition: 'all 0.2s',
  };
  const tabInactive: React.CSSProperties = {
    ...tabActive,
    background: 'transparent', color: '#6b5e3a',
    border: '1px solid rgba(201,168,76,0.2)',
  };

  const viewMoreBtn: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '8px',
    padding: '12px 32px', borderRadius: '40px', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.08em',
    background: 'transparent', color: gold, border: `1px solid rgba(201,168,76,0.3)`, cursor: 'pointer',
    transition: 'all 0.2s',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#080808' }}>
      {/* Hero */}
      <section style={{ padding: '110px 16px 60px', background: 'linear-gradient(180deg, #0e0900 0%, #080808 100%)', borderBottom: '1px solid rgba(201,168,76,0.1)', textAlign: 'center' }}>
        <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: gold, marginBottom: '14px' }}>Visual Stories</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 300, color: '#e8dfc0', marginBottom: '16px' }}>Gallery</h1>
        <p style={{ fontSize: '1rem', color: '#6b5e3a', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
          Explore our stunning collection of photos and videos showcasing the beauty of our products.
        </p>
      </section>

      <section style={{ padding: '60px 16px' }}>
        <div className="max-w-7xl mx-auto">
          {/* Tab toggle */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '48px' }}>
            <div style={{ display: 'flex', gap: '10px', padding: '6px', background: '#0e0900', borderRadius: '12px', border: '1px solid rgba(201,168,76,0.12)' }}>
              <button onClick={() => setActiveTab('images')} style={activeTab === 'images' ? tabActive : tabInactive}>
                <ImageIcon size={15} /> Images
              </button>
              <button onClick={() => setActiveTab('videos')} style={activeTab === 'videos' ? tabActive : tabInactive}>
                <Video size={15} /> Videos
              </button>
            </div>
          </div>

          {/* Images */}
          {activeTab === 'images' && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ marginBottom: '40px' }}>
                {displayedImages.map((image, index) => (
                  <a key={index} href={image.url} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'block', aspectRatio: '1/1', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(201,168,76,0.1)', position: 'relative', textDecoration: 'none', transition: 'border-color 0.3s' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.1)')}
                    className="group"
                  >
                    <LazyImage src={image.url} alt={image.title} style={{ width: '100%', height: '100%', transition: 'transform 0.5s' }} className="group-hover:scale-110" />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,0.85) 0%, transparent 55%)', opacity: 0, transition: 'opacity 0.3s' }} className="group-hover:opacity-100" />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', transform: 'translateY(8px)', transition: 'transform 0.3s', opacity: 0 }} className="group-hover:opacity-100 group-hover:translate-y-0">
                      <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontWeight: 600, color: '#e8dfc0', marginBottom: '4px' }}>{image.title}</h3>
                      <p style={{ fontSize: '0.75rem', color: '#9a8860' }}>{image.description}</p>
                    </div>
                  </a>
                ))}
              </div>
              {galleryImages.length > 6 && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button onClick={() => setShowAllImages(!showAllImages)} style={viewMoreBtn}>
                    {showAllImages ? (<>View Less <ChevronUp size={16} /></>) : (<>View More <ChevronDown size={16} /></>)}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Videos */}
          {activeTab === 'videos' && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" style={{ marginBottom: '40px' }}>
                {displayedVideos.map((video, index) => (
                  <a key={index} href={video.url} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'block', aspectRatio: '16/9', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(201,168,76,0.12)', position: 'relative', textDecoration: 'none', background: '#0e0900', transition: 'border-color 0.3s' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.12)')}
                    className="group"
                  >
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }} className="group-hover:bg-amber-500/30">
                        <Video style={{ color: gold }} size={28} />
                      </div>
                      <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.15rem', fontWeight: 600, color: '#e8dfc0', textAlign: 'center' }}>{video.title}</h3>
                      <p style={{ fontSize: '0.78rem', color: '#6b5e3a', textAlign: 'center' }}>{video.description}</p>
                    </div>
                  </a>
                ))}
              </div>
              {galleryVideos.length > 2 && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button onClick={() => setShowAllVideos(!showAllVideos)} style={viewMoreBtn}>
                    {showAllVideos ? (<>View Less <ChevronUp size={16} /></>) : (<>View More <ChevronDown size={16} /></>)}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* TikTok strip */}
      <section style={{ padding: '60px 16px', background: '#0e0900', borderTop: '1px solid rgba(201,168,76,0.1)', textAlign: 'center' }}>
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 400, color: '#e8dfc0', marginBottom: '14px' }}>Follow Us on TikTok</h2>
          <p style={{ fontSize: '0.9rem', color: '#6b5e3a', marginBottom: '28px' }}>Stay updated with our latest collections, styling tips, and behind-the-scenes content.</p>
          <a href="https://www.tiktok.com/@anthia_ornaments?_r=1&_t=ZS-923oq25LO9V" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 28px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.06em', background: `linear-gradient(135deg, ${gold}, #E8C96A)`, color: '#080808', textDecoration: 'none', boxShadow: '0 4px 20px rgba(201,168,76,0.25)' }}>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
            Visit Our TikTok
          </a>
        </div>
      </section>
    </div>
  );
}