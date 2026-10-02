import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  brand: string;
  metric: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'We ship slip-on exhausts and fender kits that standard carriers were dinging us 32 lbs DIM weight for. Starshippp’s negotiated DIM factor and cheap bulk warehouse storage cut our fulfillment bills by 40%, and we’ve literally had zero returns.',
    author: 'Brett M.',
    role: 'Founder',
    brand: 'Apex Moto Gear',
    metric: '1,400 orders/mo • 40% Carrier DIM Savings',
  },
  {
    quote:
      'Storing 350 large bumper and spoiler SKUs at our old 3PL triggered $2,000 monthly oversized storage penalties. Starshippp stores our parts across 6,500 sq ft affordably, and our daily orders hit FedEx Home Delivery without delay.',
    author: 'Tyler R.',
    role: 'Operations Director',
    brand: 'TrackCraft Aero',
    metric: '6,500 sq ft Storage • Multi-SKU Auto Parts',
  },
  {
    quote:
      'Pre-assembled patio furniture and cushion sets are bulky and low weight. The fair $250/mo minimum, transparent pallet receiving, and USPS Ground Advantage contract saved our business from mega-3PL gouging.',
    author: 'Sarah V.',
    role: 'Founder',
    brand: 'Timber & Sky Outdoor',
    metric: '850 orders/mo • $250 Fair Account Minimum',
  },
];

export const TestimonialStrip: React.FC = () => {
  return (
    <section
      style={{
        backgroundColor: '#050811',
        borderTop: '1px solid rgba(255, 107, 0, 0.25)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        paddingTop: '2.5rem',
        paddingBottom: '2.5rem',
        position: 'relative',
        zIndex: 15,
      }}
    >
      <div className="container">
        {/* Header Ribbon */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '1.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ display: 'flex', gap: '2px', color: '#FF8800' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#FF8800" strokeWidth={0} />
              ))}
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--text-white)',
                fontWeight: 700,
                letterSpacing: '0.04em',
              }}
            >
              4.98 / 5.0 FOUNDER RATING
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>&bull;</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
              Bulky parcel & multi-SKU brands doing 300 to 3,500 orders/month
            </span>
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: '#34D399',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              fontWeight: 600,
            }}
          >
            <ShieldCheck size={14} color="#34D399" />
            <span>$250 FAIR MINIMUM • NEGOTIATED DIM FACTOR</span>
          </div>
        </div>

        {/* 3 Testimonial Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                backgroundColor: 'rgba(10, 15, 29, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderLeft: '3px solid var(--brand-orange)',
                borderRadius: 0,
                padding: '1.4rem 1.35rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s ease, border-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 107, 0, 0.5)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.borderLeftColor = 'var(--brand-orange)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <p
                style={{
                  fontSize: '0.92rem',
                  lineHeight: 1.55,
                  color: 'var(--text-primary)',
                  fontStyle: 'normal',
                  marginBottom: '1.1rem',
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                  <span style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--text-white)' }}>
                    {t.author}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--brand-orange-light)',
                      fontWeight: 600,
                    }}
                  >
                    {t.brand}
                  </span>
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                  {t.role} &bull; <span dangerouslySetInnerHTML={{ __html: t.metric }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
