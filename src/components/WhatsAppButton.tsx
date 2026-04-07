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
          filter: 'drop-shadow(0 4px 16px rgba(37,211,102,0.45))',
        }}
      >
        {/* Authentic WhatsApp logo with semi-transparent green background */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 58 58"
          width="56"
          height="56"
        >
          <defs>
            {/* Radial gradient mimics the real WhatsApp icon's light-to-dark green */}
            <radialGradient id="wa-grad" cx="50%" cy="0%" r="100%" fx="50%" fy="0%">
              <stop offset="0%"  stopColor="#60D669" stopOpacity="0.88" />
              <stop offset="100%" stopColor="#1DA851" stopOpacity="0.88" />
            </radialGradient>
          </defs>

          {/* Semi-transparent green circle */}
          <circle cx="29" cy="29" r="29" fill="url(#wa-grad)" />

          {/* Official WhatsApp phone/speech-bubble outline */}
          <path
            fill="#FFFFFF"
            d="M29 10.5C18.8 10.5 10.5 18.8 10.5 29c0 3.4.9 6.6 2.6 9.4L10.5 47.5l9.4-2.5c2.7 1.5 5.8 2.4 9.1 2.4C39.2 47.5 47.5 39.2 47.5 29 47.5 18.8 39.2 10.5 29 10.5zM29 44.7c-3 0-5.9-.8-8.4-2.3l-.6-.4-6.2 1.6 1.7-6-.4-.6C14 34.6 13.3 31.8 13.3 29c0-8.7 7-15.7 15.7-15.7 8.7 0 15.7 7 15.7 15.7C44.7 37.7 37.7 44.7 29 44.7z"
          />

          {/* WhatsApp handset / telephone mark */}
          <path
            fill="#FFFFFF"
            d="M38.7 33.4c-.5-.2-2.8-1.4-3.2-1.5-.4-.2-.7-.2-1 .2-.3.5-1.2 1.5-1.5 1.8-.3.3-.5.4-1 .1-.5-.2-2-.7-3.8-2.3-1.4-1.3-2.4-2.8-2.6-3.3-.3-.5 0-.7.2-1 .2-.2.5-.6.7-.8.2-.3.3-.5.5-.8.2-.3.1-.6 0-.8-.1-.2-1-2.5-1.4-3.4-.4-.9-.7-.8-1-.8h-.9c-.3 0-.8.1-1.2.6-.4.5-1.6 1.5-1.6 3.7s1.6 4.3 1.9 4.6c.3.3 3.1 4.9 7.6 6.7 4.5 1.7 4.5 1.2 5.3 1.1.8-.1 2.6-1 3-2 .4-1 .4-1.8.3-2-.2-.2-.5-.3-1-.5z"
          />
        </svg>
      </a>
    </>
  );
}