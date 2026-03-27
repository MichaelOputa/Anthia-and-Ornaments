export default function Logo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
        <span
          style={{
            fontFamily: 'Pacifico, cursive',
            fontSize: 'clamp(1.4rem, 2.8vw, 1.9rem)',
            background: 'linear-gradient(135deg, #E8C96A 20%, #C9A84C 80%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1.1,
          }}
        >
          Anthia
        </span>
        <span style={{ fontSize: '0.58rem', fontWeight: 700, color: '#C9A84C', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
          ORNAMENTS
        </span>
      </div>
      <p style={{ fontSize: '0.58rem', color: 'rgba(201,168,76,0.5)', letterSpacing: '0.16em', textTransform: 'uppercase', marginTop: '4px', fontFamily: 'Jost, sans-serif' }}>
        ...Occasions made better
      </p>
    </div>
  );
}