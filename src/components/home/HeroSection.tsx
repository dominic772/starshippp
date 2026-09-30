import React, { useState, useEffect } from 'react';
import { HeroVideoSequencer } from '../video/HeroVideoSequencer';
import {
  ArrowRight,
  Calculator,
  Send,
  TrendingUp,
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
  const [orderCounter, setOrderCounter] = useState<number>(1842);

  // Subtle live order increment simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setOrderCounter((prev) => prev + 1);
    }, 18000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '6.5rem',
        paddingBottom: '5rem',
        overflow: 'hidden',
      }}
    >
      {/* Multi-Scene Dynamic Video Sequencer (Robotics -> Boutique Hand-Packing -> Freight Dispatch) */}
      <HeroVideoSequencer overlayOpacity={0.72} />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>

        {/* Main Hero Header */}
        <div style={{ maxWidth: 920 }}>

          <h1
            style={{
              marginBottom: '1.25rem',
              lineHeight: 1.08,
              fontSize: 'clamp(2.1rem, 4.4vw, 3.8rem)',
              letterSpacing: '-0.02em',
            }}
          >
            Boutique 3PL Fulfillment for DTC Brands.{' '}
            <span
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, var(--text-white) 30%, #FF8800 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              $0 Monthly Minimums.
            </span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.15rem, 2vw, 1.38rem)',
              lineHeight: 1.6,
              color: '#FFFFFF',
              fontWeight: 600,
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.95)',
              marginBottom: '2.5rem',
              maxWidth: 760,
            }}
          >
            Logistics built for the next generation of DTC brands. Located in the Metro Detroit freight corridor with{' '}
            <strong style={{ color: '#FFFFFF', fontWeight: 800 }}>$0 monthly minimum penalties</strong>,{' '}
            zero hidden intake surcharges, high-touch custom unboxing (tissue, wax seals, custom inserts),{' '}
            and a shared Slack channel directly to our Pontiac warehouse floor.
          </p>

          {/* Primary High-Contrast Solid CTAs (Zero Transparent Buttons) */}
          {/* Streamlined Call to Action Row (Single-Line Fit) */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '3rem',
            }}
          >
            {/* Pop-up Contact & Quote Form Trigger */}
            <button
              onClick={onOpenContactModal}
              className="btn-primary"
              style={{
                padding: '1.25rem 2.6rem',
                fontSize: '1.18rem',
                fontWeight: 800,
                letterSpacing: '0.01em',
              }}
            >
              <Send size={20} />
              <span>Get Instant Quote</span>
              <ArrowRight size={18} />
            </button>

            {/* Rate Calculator Anchor */}
            <button
              onClick={onScrollToCalculators}
              className="btn-secondary"
              style={{
                padding: '1.25rem 2.4rem',
                fontSize: '1.15rem',
                fontWeight: 800,
                letterSpacing: '0.01em',
              }}
            >
              <Calculator size={20} color="var(--brand-orange)" />
              <span>Calculate Your Rates</span>
            </button>
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
          {/* Metric 1: Monthly Minimums */}
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
              Monthly Spend Minimum
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
                $0
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
                (Never pay $1,500 penalty)
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
              Scale from 300 to 3,000+ orders without punitive idle fees.
            </div>
          </div>

          {/* Metric 2: Live Daily Orders */}
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
              Today's Orders Dispatched
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
                {orderCounter.toLocaleString()}
              </span>
              <span
                style={{
                  fontSize: '0.8rem',
                  color: '#34D399',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  letterSpacing: '0.01em',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)',
                }}
              >
                <TrendingUp size={14} strokeWidth={2.5} style={{ marginRight: 3, flexShrink: 0, color: '#34D399' }} /> 99.98% SLA
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
              Live sweep synced to UPS, FedEx & USPS trailers.
            </div>
          </div>

          {/* Metric 3: Same-Day Cutoff */}
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
              Same-Day Cutoff
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
                1:00 PM
              </span>
              <span
                style={{
                  fontSize: '0.82rem',
                  color: '#CBD5E1',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                }}
              >
                EST
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
              Orders sync via API and get on wheels before dusk.
            </div>
          </div>

          {/* Metric 4: Floor Access */}
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
              Talk directly with packing leads, not 48-hr support bots.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
