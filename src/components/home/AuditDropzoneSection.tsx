import React from 'react';
import { SectionVideoBackground } from '../video/SectionVideoBackground';
import { FileUp, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AuditDropzoneSectionProps {
  onOpenAuditModal: () => void;
}

export const AuditDropzoneSection: React.FC<AuditDropzoneSectionProps> = ({ onOpenAuditModal }) => {
  return (
    <section
      id="shipping-audit"
      style={{
        paddingTop: '6rem',
        paddingBottom: '6rem',
        position: 'relative',
        backgroundColor: 'var(--bg-darkest)',
        overflow: 'hidden',
      }}
    >
      {/* Background Video: Rapid Express Delivery Labeling & Scan */}
      <SectionVideoBackground
        videoUrl="/videos/tiktok-express-label.mp4"
        posterUrl="/images/tiktok-express-label-poster.jpg"
        overlayOpacity={0.76}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div
          className="glass-panel"
          style={{
            padding: '3.5rem 2.5rem',
            borderRadius: 0,
            backgroundColor: 'var(--bg-card)',
            border: '2px solid rgba(255, 107, 0, 0.4)',
            boxShadow: 'var(--card-shadow)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background Ambient Glow */}
          <div
            style={{
              position: 'absolute',
              top: -80,
              right: -80,
              width: 320,
              height: 320,
              backgroundColor: 'rgba(255, 107, 0, 0.15)',
              filter: 'blur(70px)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3rem',
              alignItems: 'center',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Left Content */}
            <div>

              <h2 style={{ marginBottom: '1.25rem', color: 'var(--text-white)' }}>
                Claim Your Free 30-Day Shipping Statement Audit.
              </h2>

              <p style={{ fontSize: '1.12rem', color: '#FFFFFF', fontWeight: 600, marginBottom: '1.75rem', lineHeight: 1.6, textShadow: '0 1px 3px rgba(0,0,0,0.95)' }}>
                Mega-3PLs bury margin in dimensional weight adjustments, zone 5+ padding, and punitive receiving intake fees. Drop your latest UPS, FedEx, or 3PL invoice into our secure engine. We’ll show you exactly how much cash Starshippp keeps in your bank account.
              </p>

              <div style={{ display: 'grid', gap: '0.85rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="#34D399" strokeWidth={2.5} />
                  <span style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.94rem' }}>
                    Zero monthly minimum commitments during your 30-day pilot
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="#34D399" strokeWidth={2.5} />
                  <span style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.94rem' }}>
                    Zero receiving surcharges on incoming pallets or factory shipments
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="#34D399" strokeWidth={2.5} />
                  <span style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.94rem' }}>
                    Direct warehouse floor Slack channel live on Day 1
                  </span>
                </div>
              </div>

              {/* What You'll Receive In Your Audit Report */}
              <div
                style={{
                  backgroundColor: 'rgba(255, 107, 0, 0.07)',
                  border: '1px solid rgba(255, 107, 0, 0.3)',
                  borderLeft: '3px solid var(--brand-orange)',
                  padding: '1.25rem 1.4rem',
                  marginBottom: '1.75rem',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.76rem',
                    color: 'var(--brand-orange-light)',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginBottom: '0.65rem',
                  }}
                >
                  WHAT YOUR CONFIDENTIAL AUDIT REPORT DELIVERS:
                </div>
                <ul
                  style={{
                    listStyle: 'none',
                    display: 'grid',
                    gap: '0.5rem',
                    margin: 0,
                    padding: 0,
                    fontSize: '0.86rem',
                    color: 'var(--text-primary)',
                  }}
                >
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--brand-orange)', fontWeight: 800 }}>&bull;</span>
                    <span><strong>Line-by-line hidden fee audit:</strong> DIM weight padding, carrier fuel creep, and receiving surcharges.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <span style={{ color: '#34D399', fontWeight: 800 }}>&bull;</span>
                    <span><strong>Projected net cash savings:</strong> Verified dollar delta comparing your current 3PL vs Starshippp flat rates.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--brand-orange)', fontWeight: 800 }}>&bull;</span>
                    <span><strong>Custom Zero-Downtime Transition Map:</strong> Step-by-step roadmap to switch with zero sales blackout.</span>
                  </li>
                </ul>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                <ShieldCheck size={16} color="#34D399" />
                <span>Strict commercial non-disclosure confidentiality guaranteed. 100% free with no sales calls required.</span>
              </div>
            </div>

            {/* Right Action Dropzone Box */}
            <div
              onClick={onOpenAuditModal}
              style={{
                border: '2px dashed rgba(255, 107, 0, 0.45)',
                borderRadius: 0,
                padding: '2.5rem 2rem',
                textAlign: 'center',
                backgroundColor: 'var(--bg-surface-elevated)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--brand-orange)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 107, 0, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 107, 0, 0.45)';
                e.currentTarget.style.backgroundColor = 'var(--bg-surface-elevated)';
              }}
            >
              <div
                style={{
                  width: 68,
                  height: 68,
                  borderRadius: 0,
                  backgroundColor: 'rgba(255, 107, 0, 0.15)',
                  color: 'var(--brand-orange)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                  boxShadow: '0 0 25px rgba(255, 107, 0, 0.3)',
                }}
              >
                <FileUp size={32} />
              </div>

              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', color: 'var(--text-white)' }}>
                Upload Carrier Invoice or 3PL Statement
              </h3>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>
                Supports PDF, CSV, Excel, or billing exports. Instant automated rate analysis.
              </p>

              <button
                type="button"
                className="btn-primary"
                style={{ width: '100%', padding: '0.9rem', fontSize: '0.98rem', justifyContent: 'center' }}
              >
                <span>Launch Invoice Audit Scanner</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
