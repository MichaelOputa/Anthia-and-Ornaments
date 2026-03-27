import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const whatsappNumber = '2348124238750';
  const message = 'Hello! I am interested in your products.';

  return (
    <>
      <style>{`
        @keyframes wa-float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-6px); }
        }
        .wa-btn { animation: wa-float 3s ease-in-out infinite; }
        .wa-btn:hover { animation: none; transform: scale(1.1); }
      `}</style>
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        className="wa-btn"
        style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 50,
          width: '56px', height: '56px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #25d366, #128c7e)',
          boxShadow: '0 4px 24px rgba(37,211,102,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', textDecoration: 'none',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
      >
        <MessageCircle size={26} />
      </a>
    </>
  );
}