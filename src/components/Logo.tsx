/**
 * Logo — matches the physical Anthia Ornaments business card exactly:
 *
 *  ┌──────────────────────────────┐
 *  │  Anthia                      │  ← Great Vibes (flowing script, A flourish)
 *  │  ORNAMENTS                   │  ← Cinzel spaced small caps
 *  │  ─────────────────           │  ← thin gold rule
 *  │  ...Occasions made better    │  ← Cormorant Garamond italic
 *  └──────────────────────────────┘
 *
 * Google Fonts used (add to index.css @import):
 *   Great Vibes       — the flowing cursive
 *   Cinzel            — classical small caps for ORNAMENTS
 *   Cormorant Garamond — italic tagline (already imported)
 */
export default function Logo() {
  return (
    <>
      {/* Inject font imports inline so Logo is self-contained */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cinzel:wght@400;500&display=swap');
      `}</style>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        lineHeight: 1,
        userSelect: 'none',
      }}>
        {/* ── "Anthia" in flowing script ──────────────────────────── */}
        <span style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 'clamp(1.9rem, 3.2vw, 2.6rem)',
          fontWeight: 400,
          lineHeight: 0.95,
          /* Gold gradient matching the card's white-on-purple → gold-on-black */
          background: 'linear-gradient(135deg, #F0D97A 0%, #C9A84C 55%, #E8C96A 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          /* Subtle text shadow recreates the card's embossed feel */
          filter: 'drop-shadow(0 1px 3px rgba(201,168,76,0.35))',
          display: 'block',
        }}>
          Anthia
        </span>

        {/* ── "ORNAMENTS" spaced small caps ───────────────────────── */}
        <span style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 'clamp(0.48rem, 0.85vw, 0.65rem)',
          fontWeight: 500,
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: '#C9A84C',
          display: 'block',
          marginTop: '-2px',
          paddingLeft: '2px', /* visually align under Anthia's body */
        }}>
          Ornaments
        </span>

        {/* ── thin gold rule (matches the card's divider) ─────────── */}
        <div style={{
          height: '1px',
          width: '100%',
          background: 'linear-gradient(90deg, rgba(201,168,76,0.7), rgba(201,168,76,0.15))',
          marginTop: '4px',
          marginBottom: '4px',
        }} />

        {/* ── "...Occasions made better" italic tagline ─────────── */}
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: 'clamp(0.52rem, 0.8vw, 0.62rem)',
          fontWeight: 400,
          color: 'rgba(201,168,76,0.55)',
          letterSpacing: '0.04em',
          display: 'block',
          whiteSpace: 'nowrap',
        }}>
          ...Occasions made better
        </span>
      </div>
    </>
  );
}