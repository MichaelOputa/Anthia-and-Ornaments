import { useState } from 'react';
import { ExternalLink, MessageCircle } from 'lucide-react';
import LazyImage from './LazyImage';

interface ProductCardProps {
  name: string;
  category?: string;
  description?: string;
  price?: string | number;
  image: string;
  onView: () => void;
  onInquire: () => void;
}

const gold = '#C9A84C';

export default function ProductCard({ name, category, description, price, image, onView, onInquire }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#0e0900',
        border: `1px solid ${hovered ? 'rgba(201,168,76,0.35)' : 'rgba(201,168,76,0.1)'}`,
        borderRadius: '14px',
        overflow: 'hidden',
        transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 16px 48px rgba(0,0,0,0.5), 0 0 20px rgba(201,168,76,0.1)' : '0 2px 12px rgba(0,0,0,0.3)',
        cursor: 'pointer',
      }}
    >
      {/* Image area */}
      <div style={{ position: 'relative', aspectRatio: '1/1', background: '#111008', overflow: 'hidden' }}>
        <LazyImage
          src={image}
          alt={name}
          style={{
            width: '100%',
            height: '100%',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.5s ease',
          }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />

        {/* Hover overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(8,8,8,0.55)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
        }}>
          <button
            onClick={e => { e.stopPropagation(); onView(); }}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '9px 16px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em',
              background: 'rgba(255,255,255,0.92)', color: '#080808', border: 'none', cursor: 'pointer',
              transform: hovered ? 'scale(1)' : 'scale(0.85)',
              transition: 'transform 0.3s',
            }}
          >
            <ExternalLink size={13} /> View
          </button>
          <button
            onClick={e => { e.stopPropagation(); onInquire(); }}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '9px 16px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em',
              background: `linear-gradient(135deg, ${gold}, #E8C96A)`, color: '#080808', border: 'none', cursor: 'pointer',
              transform: hovered ? 'scale(1)' : 'scale(0.85)',
              transition: 'transform 0.3s 0.04s',
            }}
          >
            <MessageCircle size={13} /> Inquire
          </button>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '16px 18px 20px' }}>
        {category && (
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: gold, marginBottom: '6px' }}>
            {category}
          </p>
        )}
        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', fontWeight: 600, color: '#e8dfc0', marginBottom: description ? '8px' : '0', lineHeight: 1.3 }}>
          {name}
        </h3>
        {description && (
          <p style={{ fontSize: '0.78rem', color: '#6b5e3a', lineHeight: 1.6, whiteSpace: 'pre-line', marginBottom: price ? '10px' : '0' }}>
            {description.length > 120 ? description.slice(0, 120) + '…' : description}
          </p>
        )}
        {price && (
          <p style={{ fontSize: '1rem', fontWeight: 700, color: gold, marginTop: '8px' }}>
            {price}
          </p>
        )}
      </div>
    </div>
  );
}