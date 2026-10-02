import React from 'react';
import { HeroVideoSequencer } from '../video/HeroVideoSequencer';
import { StarshipPhoneMockup } from './StarshipPhoneMockup';
import {
  ArrowRight,
  Calculator,
  Send,
} from 'lucide-react';

interface HeroSectionProps {
  onOpenAuditModal: () => void;
  onOpenTourModal?: () => void;
  onOpenSettings: () => void;
  onScrollToCalculators: () => void;
  onOpenContactModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenAuditModal: _onOpenAuditModal,
  onOpenTourModal: _onOpenTourModal,
  onOpenSettings: _onOpenSettings,
  onScrollToCalculators,
  onOpenContactModal,
}) => {

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '9.25rem',
        paddingBottom: '5rem',
        overflow: 'hidden',
      }}
    >
      {/* Multi-Scene Dynamic Video Sequencer (Robotics -> Boutique Hand-Packing -> Freight Dispatch) */}
      <HeroVideoSequencer overlayOpacity={0.72} />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>

        {/* Main Hero 2-Column Grid: Copy + Starship iPhone Mockup */}
        <div
          className="hero-grid-responsive"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)',
            alignItems: 'center',
            gap: '3rem',
            marginBottom: '3.5rem',
          }}
        >
          {/* Left Column: Mission Narrative & CTAs */}
          <div style={{ maxWidth: 720 }}>
            <h1
              style={{
                marginBottom: '1.25rem',
                lineHeight: 1.08,
                fontSize: 'clamp(2.1rem, 3.8vw, 3.6rem)',
                letterSpacing: '-0.02em',
              }}
            >
              Fulfillment Built for Big Boxes & Low Weight.{' '}
              <span
                style={{
                  display: 'inline-block',
                  background: 'linear-gradient(135deg, var(--text-white) 30%, #FF8800 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Crush Carrier DIM Penalties.
              </span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)',
                lineHeight: 1.6,
                color: '#FFFFFF',
                fontWeight: 600,
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.95)',
                marginBottom: '2.5rem',
                maxWidth: 680,
              }}
            >
              The dedicated 3PL for brands shipping bulky, lightweight freight, from motorcycle exhaust systems and fenders to automotive body panels, wheels, and outdoor gear. Leverage our <strong style={{ color: '#FFA733' }}>aggressive negotiated carrier DIM factor</strong>, low-cost central warehouse storage, and transparent <strong style={{ color: '#FFFFFF' }}>$250/mo minimum</strong> with USPS Ground Advantage, FedEx Home Delivery, and direct warehouse-floor Slack access.
            </p>

            {/* Primary High-Contrast Solid CTAs */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              {/* Pop-up Contact & Quote Form Trigger */}
              <button
                onClick={onOpenContactModal}
                className="btn-primary"
                style={{
                  padding: '1.2rem 2.4rem',
                  fontSize: '1.14rem',
                  fontWeight: 800,
                  letterSpacing: '0.01em',
                }}
              >
                <Send size={20} />
                <span>Get DIM-Relieved Quote</span>
                <ArrowRight size={18} />
              </button>

              {/* Rate Calculator Anchor */}
              <button
                onClick={onScrollToCalculators}
                className="btn-secondary"
                style={{
                  padding: '1.2rem 2.2rem',
                  fontSize: '1.12rem',
                  fontWeight: 800,
                  letterSpacing: '0.01em',
                }}
              >
                <Calculator size={20} color="var(--brand-orange)" />
                <span>Calculate DIM Savings</span>
              </button>
            </div>
          </div>

          {/* Right Column: Starship Mobile App on iPhone 16 Pro */}
          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <StarshipPhoneMockup onOpenContactModal={onOpenContactModal} />
          </div>
        </div>

        {/* Live Metrics & Operational HUD Bar */}
        <div
          className="glass-panel"
          style={{
            padding: '1.5rem 2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '1.75rem',
            background: 'rgba(5, 9, 22, 0.94)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 107, 0, 0.32)',
            boxShadow: '0 16px 40px -8px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* Metric 1: DIM Factor Arbitrage */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: '#FFA733',
                letterSpacing: '0.08em',
                marginBottom: '0.35rem',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)',
              }}
            >
              Carrier DIM Factor
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', lineHeight: 1.1 }}>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2.1rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                }}
              >
                Tier-1
              </span>
              <span
                style={{
                  fontSize: '0.8rem',
                  color: '#34D399',
                  fontWeight: 700,
                  letterSpacing: '0.01em',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)',
                }}
              >
                (Low-Density Relief)
              </span>
            </div>
            <div
              style={{
                fontSize: '0.82rem',
                color: '#FFFFFF',
                fontWeight: 500,
                lineHeight: 1.42,
                marginTop: '0.25rem',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.9)',
              }}
            >
              Slash billable dimensional weight on large boxes by 30% to 55%.
            </div>
          </div>

          {/* Metric 2: Transparent Minimum */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: '#FFA733',
                letterSpacing: '0.08em',
                marginBottom: '0.35rem',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)',
              }}
            >
              Monthly Account Commitment
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', lineHeight: 1.1 }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '2.1rem',
                  fontWeight: 800,
                  color: '#22D3EE',
                  letterSpacing: '-0.02em',
                  textShadow: '0 2px 10px rgba(34, 211, 238, 0.25)',
                }}
              >
                $250
              </span>
              <span
                style={{
                  fontSize: '0.8rem',
                  color: '#34D399',
                  fontWeight: 700,
                  letterSpacing: '0.01em',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)',
                }}
              >
                (Fair & Honest)
              </span>
            </div>
            <div
              style={{
                fontSize: '0.82rem',
                color: '#FFFFFF',
                fontWeight: 500,
                lineHeight: 1.42,
                marginTop: '0.25rem',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.9)',
              }}
            >
              Accessible entry floor with no predatory $1,500+ dead fees.
            </div>
          </div>

          {/* Metric 3: Bulky Storage & Multi-SKU Capacity */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: '#FFA733',
                letterSpacing: '0.08em',
                marginBottom: '0.35rem',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)',
              }}
            >
              Bulk Storage & SKUs
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', lineHeight: 1.1 }}>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2.1rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                }}
              >
                7,000+
              </span>
              <span
                style={{
                  fontSize: '0.82rem',
                  color: '#CBD5E1',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                }}
              >
                SQ FT
              </span>
            </div>
            <div
              style={{
                fontSize: '0.82rem',
                color: '#FFFFFF',
                fontWeight: 500,
                lineHeight: 1.42,
                marginTop: '0.25rem',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.9)',
              }}
            >
              Low-cost Michigan high-bay space for complex parts catalogs.
            </div>
          </div>

          {/* Metric 4: Floor Access & Carrier Trailers */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: '#FFA733',
                letterSpacing: '0.08em',
                marginBottom: '0.35rem',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)',
              }}
            >
              Dedicated Floor Slack
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', lineHeight: 1.1 }}>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2.1rem',
                  fontWeight: 800,
                  color: '#34D399',
                  letterSpacing: '-0.02em',
                  textShadow: '0 2px 10px rgba(52, 211, 153, 0.25)',
                }}
              >
                &lt; 5 Min
              </span>
            </div>
            <div
              style={{
                fontSize: '0.82rem',
                color: '#FFFFFF',
                fontWeight: 500,
                lineHeight: 1.42,
                marginTop: '0.25rem',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.9)',
              }}
            >
              Daily USPS Ground Advantage & FedEx Home Delivery sweeps.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
