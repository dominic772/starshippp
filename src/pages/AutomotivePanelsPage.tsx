import React from 'react';
import { SectionVideoBackground } from '../components/video/SectionVideoBackground';
import { StructuredData } from '../components/seo/StructuredData';
import { Shield, ArrowRight, CheckCircle2, Box, Scale, Layers } from 'lucide-react';
import type { FaqItem } from '../types';

const AUTO_FAQS: FaqItem[] = [
  {
    question: 'How do you prevent shipping damage on oversized automotive body panels and carbon wings?',
    answer:
      'We use full-perimeter rigid foam rail blocking, corner edge protectors, and double-wall heavy corrugated boxing. Delicate carbon fiber surfaces receive an anti-scratch protective wrap, ensuring tabs and delicate aero edges survive carrier handling.',
  },
  {
    question: 'Can Starshippp accommodate 5,000 to 10,000+ square feet of automotive storage?',
    answer:
      'Yes. Located in the automotive logistics corridor of Metro Detroit, our high-bay facility features industrial racking and floor storage specifically configured for oversized cartons, palletized bumper covers, and multi-SKU aftermarket aero catalogs.',
  },
  {
    question: 'How does Starshippp cut dimensional shipping rates on bulky aero parts?',
    answer:
      'A 54x18x12" spoiler box weighing only 11.5 lbs is billed at 84+ lbs under standard carrier retail formulas. Starshippp’s aggressive negotiated DIM divisor with USPS Ground Advantage and FedEx Home Delivery cuts billable dimensional weight in half, saving dozens of dollars per box.',
  },
  {
    question: 'Do you offer international shipping for high-end automotive brands?',
    answer:
      'Yes. We handle daily worldwide export dispatches with pre-cleared electronic customs documentation and commercial carrier rates for Canada, Europe, Australia, and Asia.',
  },
];

export const AutomotivePanelsPage: React.FC<{
  onOpenAuditModal: () => void;
  onOpenSettings?: () => void;
}> = ({ onOpenAuditModal }) => {
  return (
    <div style={{ paddingTop: '5.5rem' }}>
      <StructuredData
        pageTitle="Automotive Body Panels & Aero Parts 3PL | Starshippp"
        pageDescription="Specialized 3PL fulfillment for automotive body panels, bumpers, carbon fiber wings, and splitters. Negotiated carrier DIM factor, low-cost bulk warehouse storage, and transparent $250/mo minimum."
        canonicalUrl="https://starshippp.com/automotive-parts-fulfillment/"
        faqs={AUTO_FAQS}
        breadcrumbs={[
          { name: 'Home', url: 'https://starshippp.com/' },
          { name: 'Logistics Verticals', url: 'https://starshippp.com/#services' },
          { name: 'Automotive Body Panels', url: 'https://starshippp.com/automotive-parts-fulfillment/' },
        ]}
      />

      {/* Hero Section */}
      <section style={{ position: 'relative', minHeight: '80vh', display: 'flex', alignItems: 'center', padding: '5rem 0' }}>
        <SectionVideoBackground
          videoUrl="/videos/warehouse-pallet-pull.mp4"
          posterUrl="/images/target-automotive-panels.jpg"
          overlayOpacity={0.65}
        />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 0.9rem',
              backgroundColor: 'rgba(255, 107, 0, 0.15)',
              border: '1px solid rgba(255, 107, 0, 0.4)',
              borderRadius: '2px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: '#FFA733',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
            }}
          >
            <Shield size={14} color="#FFA733" />
            <span>Automotive & Aftermarket Aero 3PL</span>
          </div>

          <h1 style={{ maxWidth: 880, marginBottom: '1.25rem' }}>
            High-Cube Automotive Body Panel & Aero Fulfillment.
          </h1>

          <p style={{ fontSize: '1.2rem', color: '#FFFFFF', fontWeight: 600, maxWidth: 740, marginBottom: '2.5rem', textShadow: '0 2px 10px rgba(0,0,0,0.85)', lineHeight: 1.6 }}>
            Bumper covers, carbon fiber splitters, diffusers, and wings require specialized oversized handling that automated mega-3PLs refuse to touch. Starshippp delivers <strong style={{ color: '#FFA733' }}>carrier DIM factor relief</strong>, affordable high-bay square footage, and white-glove packaging right from Metro Detroit.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <button onClick={onOpenAuditModal} className="btn-primary" style={{ padding: '1.1rem 2.2rem', fontSize: '1.05rem', fontWeight: 800 }}>
              <span>Compare Automotive 3PL Rates</span>
              <ArrowRight size={18} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34D399', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 700 }}>
              <CheckCircle2 size={16} color="#34D399" />
              <span>FedEx Home Delivery & USPS Ground Advantage Sweeps</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillars */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-section-alt)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 3.5rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>
              Built in the Motor City Freight Corridor.
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
              Located in Pontiac, Michigan, our warehouse team understands vehicle fitment, delicate mounting tabs, and high-cube parcel economics.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            <div className="glass-panel" style={{ padding: '2.25rem', borderTop: '3px solid #FFA733' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <Scale size={24} color="#FFA733" />
                <h3 style={{ fontSize: '1.25rem', margin: 0, color: '#fff' }}>Aggressive DIM Divisors</h3>
              </div>
              <p style={{ color: '#CBD5E1', fontSize: '0.94rem', lineHeight: 1.6 }}>
                Large spoiler and bumper cartons incur massive retail dimensional penalties. Our negotiated carrier contracts cut billable dimensional weight by 35% to 55%.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '2.25rem', borderTop: '3px solid #34D399' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <Box size={24} color="#34D399" />
                <h3 style={{ fontSize: '1.25rem', margin: 0, color: '#fff' }}>Oversized Footprint (7,000+ sq ft)</h3>
              </div>
              <p style={{ color: '#CBD5E1', fontSize: '0.94rem', lineHeight: 1.6 }}>
                Store hundreds of vehicle body panel SKUs without exorbitant cubic-foot storage surcharges. Our Midwest high-bay space is engineered for large inventory volumes.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '2.25rem', borderTop: '3px solid #38BDF8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <Layers size={24} color="#38BDF8" />
                <h3 style={{ fontSize: '1.25rem', margin: 0, color: '#fff' }}>Multi-SKU Fitment Precision</h3>
              </div>
              <p style={{ color: '#CBD5E1', fontSize: '0.94rem', lineHeight: 1.6 }}>
                Left vs right side skirts, matte vs gloss carbon weave, and model year variations are scanned and matched through our WMS to eliminate wrong-part dispatch errors.
              </p>
            </div>
          </div>

          {/* SOP Showcase */}
          <div className="glass-panel" style={{ padding: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#FFA733', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Automotive SOP Spotlight
              </div>
              <h3 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '1rem' }}>
                Zero-Flex Rigid Rail Packaging & Tab Protection
              </h3>
              <p style={{ color: '#CBD5E1', lineHeight: 1.6, marginBottom: '1.5rem', fontSize: '0.96rem' }}>
                Body panels and spoilers are staged on padded wide-span benches. Mounting clips and tabs are protected with dense EPE foam blocks, while aero profiles are cradled to prevent flex and cracking during transit.
              </p>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#fff', fontSize: '0.9rem' }}>
                  <CheckCircle2 size={16} color="#34D399" />
                  <span>Double-wall corrugated boxing for structural box rigidity</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#fff', fontSize: '0.9rem' }}>
                  <CheckCircle2 size={16} color="#34D399" />
                  <span>Direct trailer injection for FedEx Home Delivery & USPS Ground Advantage</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#fff', fontSize: '0.9rem' }}>
                  <CheckCircle2 size={16} color="#34D399" />
                  <span>Dedicated floor Slack channel for instant fitment and photo confirmations</span>
                </div>
              </div>
            </div>

            <div>
              <img
                src="/images/target-automotive-panels.jpg"
                alt="Automotive body panels and spoiler packaging bench at Starshippp warehouse"
                style={{ width: '100%', borderRadius: '4px', border: '1px solid rgba(255, 107, 0, 0.35)', boxShadow: '0 12px 35px rgba(0,0,0,0.6)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Commitment */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-darkest)' }}>
        <div className="container" style={{ maxWidth: 840, textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1.25rem' }}>
            Fair $250/mo Minimum. Transparent Receiving.
          </h2>
          <p style={{ color: '#CBD5E1', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            No predatory $2,000 monthly minimum penalties. Just an honest $250 baseline, transparent pallet receiving fees ($25 to $35 per pallet), and deep commercial carrier rate discounts.
          </p>
          <button onClick={onOpenAuditModal} className="btn-primary" style={{ padding: '1.1rem 2.4rem', fontSize: '1.1rem', fontWeight: 800 }}>
            <span>Get Automotive 3PL Rates</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};
