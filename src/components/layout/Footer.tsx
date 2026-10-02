import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import { SlackIcon } from '../ui/Icons';
import { StarshipppLogo } from '../ui/StarshipppLogo';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenAuditModal: () => void;
  onOpenTourModal?: () => void;
  onOpenSettings: () => void;
  onOpenContactModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenAuditModal,
  onOpenTourModal: _onOpenTourModal,
  onOpenSettings,
  onOpenContactModal,
}) => {
  return (
    <footer
      style={{
        backgroundColor: 'var(--footer-bg)',
        borderTop: '1px solid var(--border-subtle)',
        position: 'relative',
        zIndex: 10,
        paddingTop: '4.5rem',
        paddingBottom: '2.5rem',
        transition: 'background-color 0.25s ease',
      }}
    >
      <div className="container">
        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem',
          }}
        >
          {/* Col 1: Brand & Pontiac Hub Overview */}
          <div>
            <div 
              style={{ marginBottom: '1.25rem', display: 'inline-block', cursor: 'pointer' }}
              onClick={() => onNavigate('/')}
            >
              <StarshipppLogo 
                variant="horizontal" 
                colorMode="dark" 
                height={71} 
                showTagline={true} 
                taglineText="3PL, WAREHOUSING & LOGISTICS"
                taglineColor="#FF8500"
              />
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              The anti-mega-3PL built for large boxes, low weights, and high-footprint catalogs. Fair $250/mo minimums, transparent pallet intake, negotiated carrier DIM factor relief, and radical transparency via our mobile app or warehouse floor Slack.
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 0.75rem',
                borderRadius: 0,
                background: 'rgba(52, 211, 153, 0.12)',
                border: '1px solid rgba(52, 211, 153, 0.35)',
                borderLeft: '3px solid #34D399',
                color: '#34D399',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
              }}
            >
              <span className="pulse-dot" style={{ color: '#34D399' }} />
              <span>SLA GUARANTEE: 1:00 PM EST DISPATCH</span>
            </div>
          </div>

          {/* Col 2: The Power 6 Vertical Landing Pages */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--brand-orange-light)',
                marginBottom: '1.25rem',
              }}
            >
              Logistics Verticals
            </h4>
            <ul style={{ listStyle: 'none', display: 'grid', gap: '0.65rem', fontSize: '0.88rem' }}>
              <li>
                <a
                  href="/motorcycle-powersports-fulfillment/"
                  onClick={(e) => { e.preventDefault(); onNavigate('/motorcycle-powersports-fulfillment/'); window.scrollTo(0,0); }}
                  style={{ color: 'var(--text-white)', fontWeight: 600 }}
                >
                  Motorcycle & Powersports
                </a>
              </li>
              <li>
                <a
                  href="/automotive-parts-fulfillment/"
                  onClick={(e) => { e.preventDefault(); onNavigate('/automotive-parts-fulfillment/'); window.scrollTo(0,0); }}
                  style={{ color: 'var(--text-white)', fontWeight: 600 }}
                >
                  Automotive Panels & Aero
                </a>
              </li>
              <li>
                <a
                  href="/bulky-oversized-fulfillment/"
                  onClick={(e) => { e.preventDefault(); onNavigate('/bulky-oversized-fulfillment/'); window.scrollTo(0,0); }}
                  style={{ color: 'var(--brand-orange-light)', fontWeight: 600 }}
                >
                  Bulky & DIM Weight Parcels
                </a>
              </li>
              <li>
                <a
                  href="/michigan-fulfillment/"
                  onClick={(e) => { e.preventDefault(); onNavigate('/michigan-fulfillment/'); window.scrollTo(0,0); }}
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Michigan & Midwest Hub
                </a>
              </li>
              <li>
                <a
                  href="/shopify-3pl-fulfillment/"
                  onClick={(e) => { e.preventDefault(); onNavigate('/shopify-3pl-fulfillment/'); window.scrollTo(0,0); }}
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Shopify 3PL Fulfillment
                </a>
              </li>
              <li>
                <a
                  href="/custom-unboxing-3pl/"
                  onClick={(e) => { e.preventDefault(); onNavigate('/custom-unboxing-3pl/'); window.scrollTo(0,0); }}
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Custom Packaging (Add-On)
                </a>
              </li>
              <li>
                <a
                  href="/alternatives/shipbob/"
                  onClick={(e) => { e.preventDefault(); onNavigate('/alternatives/shipbob/'); window.scrollTo(0,0); }}
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Anti-ShipBob Alternative
                </a>
              </li>
              <li>
                <a
                  href="/alternatives/shipmonk/"
                  onClick={(e) => { e.preventDefault(); onNavigate('/alternatives/shipmonk/'); window.scrollTo(0,0); }}
                  style={{ color: 'var(--text-secondary)' }}
                >
                  ShipMonk Alternative
                </a>
              </li>
              <li>
                <a
                  href="/alternatives/in-house-fulfillment/"
                  onClick={(e) => { e.preventDefault(); onNavigate('/alternatives/in-house-fulfillment/'); window.scrollTo(0,0); }}
                  style={{ color: 'var(--text-secondary)' }}
                >
                  In-House Transition (Stop Self-Packing)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Interactive Tools & Calculators */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--brand-orange-light)',
                marginBottom: '1.25rem',
              }}
            >
              Interactive Founder Tools
            </h4>
            <ul style={{ listStyle: 'none', display: 'grid', gap: '0.65rem', fontSize: '0.88rem' }}>
              <li>
                <a href="/#dim-calculator" style={{ color: 'var(--text-secondary)' }}>
                  Dimensional (DIM) Weight Calculator
                </a>
              </li>
              <li>
                <a href="/#roi-calculator" style={{ color: 'var(--text-secondary)' }}>
                  True Cost of In-House vs 3PL ROI
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenContactModal || onOpenAuditModal}
                  style={{ color: 'var(--brand-orange)', fontWeight: 700, textAlign: 'left', fontSize: '0.88rem' }}
                >
                  ⚡ Get Instant Quote & Floor Access
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAuditModal}
                  style={{ color: 'var(--text-secondary)', textAlign: 'left', fontSize: '0.88rem' }}
                >
                  30-Day Shipping Invoice Audit
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('/portal/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ color: '#38BDF8', fontWeight: 700, textAlign: 'left', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <span>⚡ Executive Management Portal (API Telemetry)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSettings}
                  style={{ color: 'var(--text-secondary)', textAlign: 'left', fontSize: '0.88rem' }}
                >
                  Pexels Video Engine Diagnostics
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Facility Physical Specs */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--brand-orange-light)',
                marginBottom: '1.25rem',
              }}
            >
              Pontiac Facility Specs
            </h4>
            <div style={{ display: 'grid', gap: '0.75rem', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <MapPin size={15} color="var(--brand-orange)" style={{ flexShrink: 0, marginTop: 3 }} />
                <span>
                  <strong>Pontiac Logistics Hub</strong>
                  <br />
                  391 E Wilson Ave
                  <br />
                  Pontiac, MI 48341
                  <br />
                  <code style={{ fontSize: '0.75rem', color: 'var(--status-cyan)' }}>
                    42.6305° N, 83.2801° W
                  </code>
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Clock size={15} color="var(--brand-orange)" style={{ flexShrink: 0 }} />
                <span>Fulfillment Floor: Mon-Fri 6:00 AM - 7:00 PM EST</span>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <SlackIcon size={15} color="#ECB22E" />
                <span>Direct Slack: #starshippp-ops-floor</span>
              </div>
            </div>
          </div>
        </div>

        {/* Carrier & Tech Badges */}
        <div
          style={{
            padding: '1.5rem',
            borderRadius: 0,
            backgroundColor: 'var(--footer-card-bg)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '2.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
            DIRECT NATIVE CARRIER INJECTIONS & API WEBHOOKS:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-white)' }}>
            <span style={{ padding: '0.2rem 0.6rem', background: 'var(--bg-surface-elevated)', borderRadius: 0, border: '1px solid var(--border-card)' }}>UPS Ground Commercial Plus</span>
            <span style={{ padding: '0.2rem 0.6rem', background: 'var(--bg-surface-elevated)', borderRadius: 0, border: '1px solid var(--border-card)' }}>FedEx Home Delivery Tier-1</span>
            <span style={{ padding: '0.2rem 0.6rem', background: 'var(--bg-surface-elevated)', borderRadius: 0, border: '1px solid var(--border-card)' }}>USPS Ground Advantage FastTrack</span>
            <span style={{ padding: '0.2rem 0.6rem', background: 'var(--bg-surface-elevated)', borderRadius: 0, border: '1px solid var(--border-card)' }}>Shopify Plus</span>
            <span style={{ padding: '0.2rem 0.6rem', background: 'var(--bg-surface-elevated)', borderRadius: 0, border: '1px solid var(--border-card)' }}>TikTok Shop Certified</span>
          </div>
        </div>

        {/* Bottom Copyright & SEO Schema Reference */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <div>
            © {new Date().getFullYear()} starshippp.com. All Rights Reserved. Pick, Pack, Perform.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>WCAG AAA Accessible</span>
            <span>AEO / Search Generative Indexed</span>
            <span>Pontiac, MI Commercial Hub</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
