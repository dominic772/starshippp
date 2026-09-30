import React from 'react';
import {
  Check,
  X,
  AlertTriangle,
  ArrowRight,
  MessageSquare,
  CircleDollarSign,
  MessagesSquare,
  Sparkles,
  Boxes,
  Code2,
  Timer,
  Scale,
  SlidersHorizontal,
  Building2,
  Truck,
} from 'lucide-react';
import type { ArbitrageFeature } from '../../types';
import { SectionVideoBackground } from '../video/SectionVideoBackground';

interface ArbitrageGridProps {
  onOpenAuditModal: () => void;
  onOpenContactModal?: () => void;
}

interface FeatureRowItem extends ArbitrageFeature {
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  iconBorder: string;
}

export const ArbitrageGrid: React.FC<ArbitrageGridProps> = ({ 
  onOpenAuditModal,
  onOpenContactModal,
}) => {
  const comparisonData: FeatureRowItem[] = [
    {
      category: 'Financial Commitments',
      metric: 'Monthly Spend Minimum',
      icon: CircleDollarSign,
      iconColor: '#FFA733',
      iconBg: 'rgba(255, 107, 0, 0.12)',
      iconBorder: 'rgba(255, 167, 51, 0.35)',
      starshippp: '$0 / Month (Zero Penalties)',
      starshipppHoverNote: 'Never penalizes growing brands during seasonal fluctuations.',
      shipbob: '$1,500 - $2,500 / Month',
      redstag: '$2,000 / Month',
      inHouseDiy: 'Fixed overhead (Rent & Equipment)',
      isSuperior: true,
    },
    {
      category: 'Customer Support',
      metric: 'Warehouse Support Channel',
      icon: MessagesSquare,
      iconColor: '#38BDF8',
      iconBg: 'rgba(56, 189, 248, 0.12)',
      iconBorder: 'rgba(56, 189, 248, 0.35)',
      starshippp: 'Direct Floor Slack (< 5 Min)',
      starshipppHoverNote: 'Direct live chat with Pontiac pick/pack operators, not tier-1 ticket bots.',
      shipbob: 'Ticketing Portal (24-48 hr delay)',
      redstag: 'Email / Account Rep queue',
      inHouseDiy: 'You are the only support',
      isSuperior: true,
    },
    {
      category: 'Packaging Craft',
      metric: 'Custom Unboxing & Kitting',
      icon: Sparkles,
      iconColor: '#F59E0B',
      iconBg: 'rgba(245, 158, 11, 0.12)',
      iconBorder: 'rgba(245, 158, 11, 0.35)',
      starshippp: 'Included Standard (Tissue, Wax Seal, Inserts)',
      starshipppHoverNote: 'We specialize in luxury tactile presentation without punitive line-item gouging.',
      shipbob: '$0.75 - $1.85 / item markup',
      redstag: 'Strict uniform box mandate',
      inHouseDiy: 'Manual packaging by founder',
      isSuperior: true,
    },
    {
      category: 'Intake Fees',
      metric: 'Receiving & Inbound Surcharges',
      icon: Boxes,
      iconColor: '#34D399',
      iconBg: 'rgba(52, 211, 153, 0.12)',
      iconBorder: 'rgba(52, 211, 153, 0.35)',
      starshippp: '$0 Receiving Surcharge',
      starshipppHoverNote: 'Zero pallet intake fees or per-box check-in penalties.',
      shipbob: '$35 - $45 / Pallet + per-SKU fees',
      redstag: 'Hourly dock labor surcharges',
      inHouseDiy: 'Manual heavy lifting',
      isSuperior: true,
    },
    {
      category: 'Technology & Sync',
      metric: 'WMS & API Architecture',
      icon: Code2,
      iconColor: '#A78BFA',
      iconBg: 'rgba(167, 139, 250, 0.12)',
      iconBorder: 'rgba(167, 139, 250, 0.35)',
      starshippp: 'Modern Open-API, Webhooks & Real-time Telemetry',
      starshipppHoverNote: 'Instant webhook dispatch, open REST endpoints, and custom ERP integration.',
      shipbob: 'Proprietary portal with rate delays',
      redstag: 'Legacy third-party WMS',
      inHouseDiy: 'Spreadsheets & manual CSV imports',
      isSuperior: true,
    },
    {
      category: 'Execution Velocity',
      metric: 'Same-Day Dispatch SLA Cutoff',
      icon: Timer,
      iconColor: '#FB923C',
      iconBg: 'rgba(251, 146, 60, 0.12)',
      iconBorder: 'rgba(251, 146, 60, 0.35)',
      starshippp: '1:00 PM EST (Guaranteed 100%)',
      starshipppHoverNote: 'All orders in by 1 PM EST are staged on carrier trailers that afternoon.',
      shipbob: '10:30 AM EST (Frequent backlogs)',
      redstag: '12:00 PM EST',
      inHouseDiy: 'Late night packing marathons',
      isSuperior: true,
    },
    {
      category: 'Billing Honesty',
      metric: 'Carrier Rate Audit Transparency',
      icon: Scale,
      iconColor: '#2DD4BF',
      iconBg: 'rgba(45, 212, 191, 0.12)',
      iconBorder: 'rgba(45, 212, 191, 0.35)',
      starshippp: 'True Cost Pass-Through + Clear Flat Pick/Pack',
      starshipppHoverNote: 'Transparent itemized invoices with zero hidden residential fuel padding.',
      shipbob: 'Blended markup zones with opaque fees',
      redstag: 'Heavy freight markups',
      inHouseDiy: 'Non-discounted retail carrier counter rates',
      isSuperior: true,
    },
  ];

  return (
    <section
      id="arbitrage-grid"
      style={{
        paddingTop: '6rem',
        paddingBottom: '6rem',
        position: 'relative',
        backgroundColor: 'var(--bg-darkest)',
        overflow: 'hidden',
      }}
    >
      {/* Background Video 1: Autonomous High-Bay Sortation Flythrough */}
      <SectionVideoBackground
        videoUrl="/videos/warehouse-flythrough.mp4"
        posterUrl="/images/warehouse-flythrough-poster.jpg"
        overlayOpacity={0.76}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 3.5rem' }}>
          <h2 style={{ marginBottom: '1.25rem' }}>
            Why Boutique DTC Brands Escape Legacy Mega-3PLs.
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#FFFFFF', fontWeight: 600, lineHeight: 1.6, textShadow: '0 2px 10px rgba(0,0,0,0.85)' }}>
            Mega-3PLs are optimized for 50,000 orders/month conglomerates. If you do 300 to 3,000 orders/month, you get ignored, penalized with monthly minimums, and buried under customer support tickets. Starshippp is engineered specifically for you.
          </p>
        </div>

        {/* Comparison Table Container */}
        <div
          className="glass-panel"
          style={{
            overflowX: 'auto',
            border: '1px solid rgba(255, 107, 0, 0.35)',
            borderLeft: '4px solid var(--brand-orange)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 1px 1px rgba(255, 107, 0, 0.12)',
            borderRadius: 0,
            backgroundColor: 'rgba(6, 10, 24, 0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          <table
            style={{
              width: '100%',
              minWidth: '820px',
              borderCollapse: 'collapse',
              textAlign: 'left',
              fontFamily: 'var(--font-sans)',
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: '2px solid rgba(255, 107, 0, 0.3)',
                  backgroundColor: 'rgba(4, 7, 18, 0.96)',
                }}
              >
                <th
                  style={{
                    padding: '1.35rem 1.5rem',
                    width: '28%',
                    color: '#CBD5E1',
                    fontSize: '0.82rem',
                    fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                    <SlidersHorizontal size={15} color="var(--brand-orange)" />
                    <span style={{ fontWeight: 800 }}>Core Logistics Feature</span>
                  </div>
                </th>
                <th
                  style={{
                    padding: '1.35rem 1.5rem',
                    width: '32%',
                    backgroundColor: 'rgba(255, 107, 0, 0.14)',
                    borderLeft: '2px solid var(--brand-orange)',
                    borderRight: '2px solid var(--brand-orange)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.6rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <img
                        src="/images/starshippp-mark.png"
                        alt="Starshippp Mark"
                        style={{
                          width: 24,
                          height: 24,
                          objectFit: 'contain',
                          filter: 'drop-shadow(0 0 8px rgba(255, 107, 0, 0.5))',
                        }}
                      />
                      <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
                        starshippp.com
                      </span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: '0.2rem 0.6rem',
                        backgroundColor: 'rgba(16, 185, 129, 0.16)',
                        border: '1px solid rgba(52, 211, 153, 0.45)',
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        color: '#34D399',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                      }}
                    >
                      <Sparkles size={11} color="#34D399" />
                      <span>RECOMMENDED</span>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#FFA733', fontFamily: 'var(--font-mono)', fontWeight: 700, marginTop: 4, letterSpacing: '0.04em' }}>
                    Pontiac Boutique Hub
                  </div>
                </th>
                <th style={{ padding: '1.35rem 1.5rem', width: '20%', color: '#CBD5E1', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Building2 size={16} color="#94A3B8" />
                    <span style={{ fontWeight: 800, color: '#FFFFFF', fontSize: '0.96rem' }}>ShipBob</span>
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#94A3B8', fontFamily: 'var(--font-mono)', fontWeight: 600, marginTop: 3 }}>
                    Legacy Mega-3PL
                  </div>
                </th>
                <th style={{ padding: '1.35rem 1.5rem', width: '20%', color: '#CBD5E1', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Truck size={16} color="#94A3B8" />
                    <span style={{ fontWeight: 800, color: '#FFFFFF', fontSize: '0.96rem' }}>Red Stag / Others</span>
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#94A3B8', fontFamily: 'var(--font-mono)', fontWeight: 600, marginTop: 3 }}>
                    Heavy Freight Focus
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, idx) => (
                <tr
                  key={row.metric}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    backgroundColor: idx % 2 === 0 ? 'rgba(7, 12, 26, 0.4)' : 'rgba(12, 19, 38, 0.6)',
                    transition: 'background-color 0.15s ease',
                  }}
                >
                  {/* Column 1: Feature with Icon Maxx Badge */}
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          backgroundColor: row.iconBg,
                          border: `1px solid ${row.iconBorder}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <row.icon size={18} color={row.iconColor} strokeWidth={2.2} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, color: '#FFFFFF', fontSize: '0.96rem', letterSpacing: '-0.01em', lineHeight: 1.25 }}>
                          {row.metric}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: '#94A3B8', fontFamily: 'var(--font-mono)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: 3 }}>
                          {row.category}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Column 2: Starshippp column (Highlighted Winner) */}
                  <td
                    style={{
                      padding: '1.25rem 1.5rem',
                      backgroundColor: 'rgba(255, 107, 0, 0.08)',
                      borderLeft: '2px solid rgba(255, 107, 0, 0.65)',
                      borderRight: '2px solid rgba(255, 107, 0, 0.65)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          backgroundColor: 'rgba(16, 185, 129, 0.18)',
                          border: '1px solid rgba(52, 211, 153, 0.5)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Check size={14} strokeWidth={3} color="#34D399" />
                      </div>
                      <span style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '0.98rem', letterSpacing: '-0.01em' }}>
                        {row.starshippp}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#E2E8F0', fontWeight: 500, lineHeight: 1.4, marginTop: 6, paddingLeft: '2rem' }}>
                      {row.starshipppHoverNote}
                    </div>
                  </td>

                  {/* Column 3: ShipBob column (Flaws) */}
                  <td style={{ padding: '1.25rem 1.5rem', verticalAlign: 'middle' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          backgroundColor: 'rgba(239, 68, 68, 0.15)',
                          border: '1px solid rgba(239, 68, 68, 0.38)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <X size={13} strokeWidth={2.8} color="#F87171" />
                      </div>
                      <span style={{ color: '#FCA5A5', fontWeight: 700, fontSize: '0.92rem', letterSpacing: '-0.01em' }}>
                        {row.shipbob}
                      </span>
                    </div>
                  </td>

                  {/* Column 4: Red Stag column (Flaws / Warnings) */}
                  <td style={{ padding: '1.25rem 1.5rem', verticalAlign: 'middle' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          backgroundColor: 'rgba(245, 158, 11, 0.15)',
                          border: '1px solid rgba(245, 158, 11, 0.38)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <AlertTriangle size={12} strokeWidth={2.5} color="#FBBF24" />
                      </div>
                      <span style={{ color: '#E2E8F0', fontWeight: 600, fontSize: '0.92rem' }}>
                        {row.redstag}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Callout banner - Sharp Cyber Panel */}
        <div
          style={{
            marginTop: '2.5rem',
            padding: '1.5rem 2rem',
            borderRadius: 0,
            borderLeft: '4px solid var(--brand-orange)',
            backgroundColor: 'rgba(255, 107, 0, 0.08)',
            borderTop: '1px solid rgba(255, 107, 0, 0.25)',
            borderRight: '1px solid rgba(255, 107, 0, 0.25)',
            borderBottom: '1px solid rgba(255, 107, 0, 0.25)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
          }}
        >
          <div>
            <h4 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '0.25rem' }}>
              Tired of $1,500/month idle fees and unanswered support tickets?
            </h4>
            <p style={{ fontSize: '0.94rem', color: '#FFFFFF', fontWeight: 600, margin: 0, textShadow: '0 1px 3px rgba(0,0,0,0.85)' }}>
              Send us your last shipping statement. We’ll show you line-by-line where your 3PL is taking margin.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <button
              onClick={onOpenContactModal}
              className="btn-primary"
              style={{ padding: '1.15rem 2.2rem', fontSize: '1.1rem', fontWeight: 800, letterSpacing: '0.01em' }}
            >
              <MessageSquare size={18} />
              <span>Speak with Warehouse Lead</span>
            </button>
            <button
              onClick={onOpenAuditModal}
              className="btn-secondary"
              style={{ padding: '1.15rem 2.2rem', fontSize: '1.1rem', fontWeight: 800, letterSpacing: '0.01em' }}
            >
              <span>Run Free Invoice Audit</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
