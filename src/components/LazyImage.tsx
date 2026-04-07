import { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  /** Set to true for above-the-fold images — skips IntersectionObserver */
  eager?: boolean;
}

/**
 * LazyImage — optimized for fast perceived load:
 * 1. eager=true skips IO entirely (for hero/above-fold images)
 * 2. 400px rootMargin — starts loading well before entering viewport
 * 3. Blur-up fade on load
 * 4. decoding="async" — non-blocking decode
 */
export default function LazyImage({ src, alt, className = '', style, onError, eager = false }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(eager);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (eager) return; // skip IO for eager images
    const el = ref.current;
    if (!el) return;

    // Check if already in viewport synchronously
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 400) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' } // aggressive prefetch
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [eager]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} style={style}>
      {/* Shimmer placeholder */}
      {!loaded && (
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(110deg, #150f00 25%, #231900 50%, #150f00 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.6s infinite linear',
          }}
        />
      )}
      {inView && (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={eager ? 'high' : 'auto'}
          onLoad={() => setLoaded(true)}
          onError={onError}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.35s ease',
            display: 'block',
          }}
        />
      )}
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}