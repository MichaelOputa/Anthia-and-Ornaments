import { MapPin, MessageCircle, Clock } from 'lucide-react';

const gold = '#C9A84C';

const card: React.CSSProperties = {
  display: 'flex', alignItems: 'flex-start', gap: '16px',
  padding: '24px', background: '#0e0900',
  borderRadius: '14px', border: '1px solid rgba(201,168,76,0.12)',
};

export default function Contact() {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/2348124238750?text=Hello! I would like to get in touch with Anthia & Ornaments.', '_blank');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#080808' }}>
      {/* Hero */}
      <section style={{ padding: '110px 16px 60px', background: 'linear-gradient(180deg, #0e0900 0%, #080808 100%)', borderBottom: '1px solid rgba(201,168,76,0.1)', textAlign: 'center' }}>
        <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: gold, marginBottom: '14px' }}>Reach Out</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 300, color: '#e8dfc0', marginBottom: '16px' }}>
          Get In Touch
        </h1>
        <p style={{ fontSize: '1rem', color: '#6b5e3a', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
          Reach out via WhatsApp for inquiries, custom orders, or any questions.
        </p>
      </section>

      <section style={{ padding: '80px 16px' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Contact info */}
            <div>
              <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: gold, marginBottom: '24px' }}>Contact Information</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

                <div style={card}>
                  <MapPin style={{ color: gold, flexShrink: 0, marginTop: 2 }} size={20} />
                  <div>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontWeight: 600, color: '#e8dfc0', marginBottom: '6px' }}>Location</h3>
                    <p style={{ fontSize: '0.85rem', color: '#6b5e3a' }}>Nigeria</p>
                  </div>
                </div>

                <div style={card}>
                  <MessageCircle style={{ color: '#25d366', flexShrink: 0, marginTop: 2 }} size={20} />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontWeight: 600, color: '#e8dfc0', marginBottom: '6px' }}>WhatsApp</h3>
                    <p style={{ fontSize: '0.85rem', color: '#6b5e3a', marginBottom: '14px' }}>Chat with us directly for quick responses</p>
                    <button
                      onClick={handleWhatsAppClick}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        padding: '10px 20px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 600,
                        background: '#25d366', color: 'white', border: 'none', cursor: 'pointer',
                        transition: 'opacity 0.2s',
                      }}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
                    >
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                      Open WhatsApp
                    </button>
                  </div>
                </div>

                <div style={card}>
                  <Clock style={{ color: gold, flexShrink: 0, marginTop: 2 }} size={20} />
                  <div>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontWeight: 600, color: '#e8dfc0', marginBottom: '6px' }}>Response Time</h3>
                    <p style={{ fontSize: '0.85rem', color: '#6b5e3a' }}>We typically respond within 24 hours on business days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* How can we help */}
            <div style={{ background: '#0e0900', borderRadius: '20px', padding: '36px', border: '1px solid rgba(201,168,76,0.12)' }}>
              <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: gold, marginBottom: '20px' }}>How Can We Help?</p>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 400, color: '#e8dfc0', marginBottom: '28px' }}>We're Here for You</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { title: 'Product Inquiries', body: 'Questions about jewelry, watches or clothing collections? We provide detailed info on materials, sizing, and availability.' },
                  { title: 'Custom Orders', body: 'Looking for something special? We offer custom jewelry and tailoring services to bring your vision to life.' },
                  { title: 'Pricing & Payment', body: 'Contact us for current pricing, payment options, and delivery information.' },
                  { title: 'Business Partnerships', body: 'Interested in collaborating or wholesale opportunities? Let\'s discuss how we can work together.' },
                ].map(({ title, body }) => (
                  <div key={title} style={{ paddingBottom: '18px', borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#e8dfc0', marginBottom: '6px', letterSpacing: '0.02em' }}>{title}</h3>
                    <p style={{ fontSize: '0.82rem', color: '#6b5e3a', lineHeight: 1.65 }}>{body}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={handleWhatsAppClick}
                style={{
                  marginTop: '28px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  padding: '14px', borderRadius: '10px', fontSize: '0.88rem', fontWeight: 600, letterSpacing: '0.06em',
                  background: '#25d366', color: 'white', border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(37,211,102,0.25)', transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                Start a Conversation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TikTok strip */}
      <section style={{ padding: '60px 16px', background: '#0e0900', borderTop: '1px solid rgba(201,168,76,0.1)', textAlign: 'center' }}>
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 400, color: '#e8dfc0', marginBottom: '14px' }}>Follow Our Journey</h2>
          <p style={{ fontSize: '0.9rem', color: '#6b5e3a', marginBottom: '28px', lineHeight: 1.7 }}>
            Stay connected on TikTok for the latest updates, styling tips, and exclusive content.
          </p>
          <a
            href="https://www.tiktok.com/@anthia_ornaments?_r=1&_t=ZS-923oq25LO9V"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '13px 28px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.06em',
              background: `linear-gradient(135deg, ${gold}, #E8C96A)`, color: '#080808', textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(201,168,76,0.25)',
            }}
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
            Visit Our TikTok
          </a>
        </div>
      </section>
    </div>
  );
}