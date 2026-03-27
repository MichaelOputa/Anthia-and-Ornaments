import { X } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  imageSrc: string;
  imageAlt: string;
  imageTitle: string;
  onClose: () => void;
}

export default function ImageModal({ isOpen, imageSrc, imageAlt, imageTitle, onClose }: ImageModalProps) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(0,0,0,0.92)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
        backdropFilter: 'blur(8px)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'relative', maxWidth: '900px', width: '100%',
          background: '#0e0900',
          borderRadius: '16px', overflow: 'hidden',
          border: '1px solid rgba(201,168,76,0.25)',
          boxShadow: '0 0 60px rgba(201,168,76,0.12), 0 24px 80px rgba(0,0,0,0.7)',
          maxHeight: '90vh',
          display: 'flex', flexDirection: 'column',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '14px', right: '14px', zIndex: 10,
            background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)',
            borderRadius: '50%', padding: '8px', cursor: 'pointer', color: '#C9A84C',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.3)')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.15)')}
        >
          <X size={20} />
        </button>

        <img
          src={imageSrc}
          alt={imageAlt}
          style={{ width: '100%', height: 'auto', objectFit: 'contain', maxHeight: '78vh', display: 'block' }}
        />

        <div style={{ padding: '18px 24px', borderTop: '1px solid rgba(201,168,76,0.15)' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: 600, color: '#e8dfc0', margin: 0 }}>
            {imageTitle}
          </h2>
        </div>
      </div>
    </div>
  );
}