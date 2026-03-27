import { Link } from 'react-router-dom';
import { ShoppingBag, MapPin } from 'lucide-react';

export default function Footer() {
  const gold = '#C9A84C';
  const border = '1px solid rgba(201,168,76,0.15)';

  return (
    <footer style={{ background: '#060400', borderTop: border }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <ShoppingBag size={20} style={{ color: gold }} />
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', fontWeight: 700, color: '#e8dfc0', letterSpacing: '0.04em' }}>
                Anthia & Ornaments
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#6b5e3a', lineHeight: 1.7 }}>
              Elegant Nigerian jewelry and fashion for the modern woman.
              Celebrating craftsmanship, quality, and timeless style.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px' }}>
              <MapPin size={14} style={{ color: gold }} />
              <span style={{ fontSize: '0.82rem', color: '#6b5e3a' }}>Nigeria</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem', fontWeight: 700, color: gold, marginBottom: '16px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Quick Links
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Jewelry Collection', to: '/jewelry' },
                { label: 'Clothing Collection', to: '/clothing' },
                { label: 'Wristwatches', to: '/wristwatches' },
                { label: 'Gallery', to: '/gallery' },
                { label: 'About Us', to: '/about' },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} style={{ fontSize: '0.85rem', color: '#6b5e3a', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = gold)}
                    onMouseLeave={e => (e.currentTarget.style.color = '#6b5e3a')}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem', fontWeight: 700, color: gold, marginBottom: '16px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Connect With Us
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#6b5e3a', marginBottom: '16px', lineHeight: 1.7 }}>
              Follow us on TikTok and reach out via WhatsApp for inquiries.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a
                href="https://www.tiktok.com/@anthia_ornaments?_r=1&_t=ZS-923oq25LO9V"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '42px', height: '42px', borderRadius: '8px',
                  background: 'rgba(201,168,76,0.08)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  color: gold, transition: 'all 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = gold; (e.currentTarget as HTMLElement).style.color = '#080808'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.08)'; (e.currentTarget as HTMLElement).style.color = gold; }}
                aria-label="TikTok"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/2348124238750?text=Hello! I am interested in your products."
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '42px', height: '42px', borderRadius: '8px',
                  background: 'rgba(201,168,76,0.08)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  color: gold, transition: 'all 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = gold; (e.currentTarget as HTMLElement).style.color = '#080808'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.08)'; (e.currentTarget as HTMLElement).style.color = gold; }}
                aria-label="WhatsApp"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <hr style={{ border: 'none', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)', margin: '40px 0 24px' }} />

        <p style={{ textAlign: 'center', fontSize: '0.78rem', color: '#4a3e22', letterSpacing: '0.04em' }}>
          © {new Date().getFullYear()} Anthia & Ornaments. All rights reserved.
        </p>
      </div>
    </footer>
  );
}