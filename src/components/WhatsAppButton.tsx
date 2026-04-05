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
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          textDecoration: 'none',
          transition: 'transform 0.2s, box-shadow 0.2s',
          filter: 'drop-shadow(0 4px 12px rgba(37,211,102,0.5))',
        }}
      >
        {/* Authentic WhatsApp logo SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 58 58"
          width="56"
          height="56"
        >
          {/* Green circle background */}
          <circle cx="29" cy="29" r="29" fill="#25D366" />

          {/* WhatsApp phone handset icon — official shape */}
          <path
            fill="#FFFFFF"
            d="M29 10.1C18.6 10.1 10.1 18.6 10.1 29c0 3.3.9 6.5 2.5 9.3L10 48l9.9-2.6c2.7 1.5 5.7 2.3 8.9 2.3 10.4 0 18.9-8.5 18.9-18.9C47.9 18.6 39.4 10.1 29 10.1zm9.4 26.9c-.4 1.1-2.1 2-3.1 2.1-1 .1-1.9.5-6.4-1.3-5.4-2.2-8.9-7.7-9.1-8.1-.3-.4-2.1-2.8-2.1-5.3s1.3-3.8 1.8-4.3c.5-.5 1.1-.7 1.4-.7h1c.3 0 .7-.1 1.1 1 .4 1.1 1.4 4 1.5 4.2.1.3.2.6 0 1-.2.4-.3.6-.6.9-.3.3-.6.7-.8.9-.3.3-.6.6-.3 1.2.4.6 1.6 2.6 3.4 4.2 2.3 2.1 4.3 2.7 4.9 3 .6.3 1 .2 1.3-.1.4-.5 1.6-1.9 2-2.5.4-.7.9-.5 1.5-.3.6.2 3.8 1.8 4.4 2.1.6.3 1.1.5 1.2.8.2.4.2 2-.2 3.1z"
          />
        </svg>
      </a>
    </>
  );
}