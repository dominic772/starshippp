import React from 'react';
import { SectionVideoBackground } from '../components/video/SectionVideoBackground';
import { StructuredData } from '../components/seo/StructuredData';
import { Box, Scale, ArrowRight, CheckCircle2, Shield, Sun, Disc } from 'lucide-react';
import type { FaqItem } from '../types';

const BULKY_FAQS: FaqItem[] = [
  {
    question: 'What is dimensional (DIM) weight and why does it inflate shipping costs?',
    answer:
      'Carriers calculate shipping costs based on the greater of actual scale weight vs dimensional weight (Length x Width x Height ÷ DIM Divisor). With retail divisors like 139 or 166, large lightweight boxes (e.g. outdoor cushions, wheel boxes, exhaust pipes) are billed at 2 to 3 times their actual weight. Starshippp’s negotiated high DIM divisor restores billable weight closer to actual weight.',
  },
  {
    question: 'Why do you avoid assemble-yourself flatpack furniture?',
    answer:
      'Flatpack assemble-yourself furniture suffers from high customer return rates (15% to 25%), missing hardware parts, and frequent transit damage. Starshippp focuses exclusively on durable, pre-assembled outdoor gear, automotive/powersports parts, and high-spec bulky products with low return propensity (under 1%).',
  },
  {
    question: 'How do you handle bulk storage for brands needing 5,000 to 10,000+ sq ft?',
    answer:
      'Unlike coastal 3PLs that charge $45 to $75+ per pallet per month and penalize bulky boxes, our Midwest high-bay facility offers cost-effective industrial storage specifically designed for large carton footprints.',
  },
  {
    question: 'What are your monthly account minimums and inbound fees?',
    answer:
      'We charge a fair, transparent $250/month minimum account commitment (never $1,500+ predatory fees) and transparent pallet intake fees ($25 to $35 per pallet + carton SKU audit) without hidden dock surcharges.',
  },
];

export const BulkyDimWeightPage: React.FC<{
  onOpenAuditModal: () => void;
  onOpenSettings?: () => void;
}> = ({ onOpenAuditModal }) => {
  return (
    <div style={{ paddingTop: '5.5rem' }}>
      <StructuredData
        pageTitle="Bulky & DIM-Weight Parcel 3PL Fulfillment | Starshippp"
        pageDescription="The specialized 3PL for large boxes and low weight. Negotiated carrier DIM factor relief, cheap Pontiac bulk storage, low returns, and $250/mo minimums."
        canonicalUrl="https://starshippp.com/bulky-oversized-fulfillment/"
        faqs={BULKY_FAQS}
        breadcrumbs={[
          { name: 'Home', url: 'https://starshippp.com/' },
          { name: 'Logistics Verticals', url: 'https://starshippp.com/#services' },
          { name: 'Bulky & DIM Fulfillment', url: 'https://starshippp.com/bulky-oversized-fulfillment/' },
        ]}
      />

      {/* Hero Section */}
      <section style={{ position: 'relative', minHeight: '80vh', display: 'flex', alignItems: 'center', padding: '5rem 0' }}>
        <SectionVideoBackground
          videoUrl="/videos/warehouse-pallet-pull.mp4"
          posterUrl="/images/target-outdoor-furniture.jpg"
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
            <Scale size={14} color="#FFA733" />
            <span>High-Cube & Low-Density Freight Specialist</span>
          </div>

          <h1 style={{ maxWidth: 880, marginBottom: '1.25rem' }}>
            Large Boxes. Low Weight. Cut Carrier DIM Rates by 35% to 55%.
          </h1>

          <p style={{ fontSize: '1.2rem', color: '#FFFFFF', fontWeight: 600, maxWidth: 740, marginBottom: '2.5rem', textShadow: '0 2px 10px rgba(0,0,0,0.85)', lineHeight: 1.6 }}>
            If your products ship in big boxes that carriers penalize for cubic volume, standard 3PLs are draining your margins. Starshippp provides an <strong style={{ color: '#FFA733' }}>aggressive negotiated carrier DIM factor</strong>, low-cost central warehouse storage, and transparent $250/mo minimums.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <button onClick={onOpenAuditModal} className="btn-primary" style={{ padding: '1.1rem 2.2rem', fontSize: '1.05rem', fontWeight: 800 }}>
              <span>Run a DIM Rate Audit</span>
              <ArrowRight size={18} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34D399', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 700 }}>
              <CheckCircle2 size={16} color="#34D399" />
              <span>USPS Ground Advantage & FedEx Home Delivery Optimized</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-section-alt)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 3.5rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>
              The 3PL Engineered for Oversized Parcels.
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
              We solved the two biggest headaches for bulky brands: punitive carrier dimensional divisors and expensive warehouse storage.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            <div className="glass-panel" style={{ padding: '2.25rem', borderTop: '3px solid #FFA733' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <Scale size={24} color="#FFA733" />
                <h3 style={{ fontSize: '1.25rem', margin: 0, color: '#fff' }}>Negotiated DIM Divisors</h3>
              </div>
              <p style={{ color: '#CBD5E1', fontSize: '0.94rem', lineHeight: 1.6 }}>
                Our Tier-1 carrier agreements provide a generous dimensional factor, preventing bulky 14 lb packages from being billed as 50+ lb freight.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '2.25rem', borderTop: '3px solid #34D399' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <Box size={24} color="#34D399" />
                <h3 style={{ fontSize: '1.25rem', margin: 0, color: '#fff' }}>Low-Cost High-Bay Space</h3>
              </div>
              <p style={{ color: '#CBD5E1', fontSize: '0.94rem', lineHeight: 1.6 }}>
                Store 3,000 to 10,000 sq ft of bulky inventory in Pontiac, MI without coastal rent markups. Perfect for outdoor cushions, wheels, and recreation gear.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '2.25rem', borderTop: '3px solid #38BDF8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <Shield size={24} color="#38BDF8" />
                <h3 style={{ fontSize: '1.25rem', margin: 0, color: '#fff' }}>Low-Return Focus</h3>
              </div>
              <p style={{ color: '#CBD5E1', fontSize: '0.94rem', lineHeight: 1.6 }}>
                We actively decline assemble-yourself flatpack furniture. We focus on durable, precision items where customer return rates are virtually zero.
              </p>
            </div>
          </div>

          {/* Dual Category Showcase Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <img
                src="/images/target-outdoor-furniture.jpg"
                alt="High-bay outdoor furniture and patio cushion storage at Starshippp warehouse"
                style={{ width: '100%', height: '230px', objectFit: 'cover', borderRadius: '4px', marginBottom: '1.25rem', border: '1px solid rgba(255, 107, 0, 0.3)' }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Sun size={18} color="#FFA733" />
                <h3 style={{ fontSize: '1.3rem', margin: 0, color: '#fff' }}>Outdoor Patio Furniture & Cushions</h3>
              </div>
              <p style={{ color: '#CBD5E1', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Pre-assembled outdoor seating, lightweight aluminum frames, and patio cushion sets. Bulky cubic volume with near-zero returns and parent/child SKU barcode pairing.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '2rem' }}>
              <img
                src="/images/target-wheels-tires.jpg"
                alt="Aftermarket wheel and rim packaging station at Starshippp warehouse"
                style={{ width: '100%', height: '230px', objectFit: 'cover', borderRadius: '4px', marginBottom: '1.25rem', border: '1px solid rgba(255, 107, 0, 0.3)' }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Disc size={18} color="#38BDF8" />
                <h3 style={{ fontSize: '1.3rem', margin: 0, color: '#fff' }}>Wheels, Rims & Bulky Hard Cases</h3>
              </div>
              <p style={{ color: '#CBD5E1', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Heavy-duty cartons with face-guard protective foam discs and corner guards. Seamless integration with FedEx Home Delivery and USPS Ground Advantage sweeps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Commitment */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-darkest)' }}>
        <div className="container" style={{ maxWidth: 840, textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1.25rem' }}>
            Accessible $250/mo Minimum. Transparent Billing.
          </h2>
          <p style={{ color: '#CBD5E1', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            We protect your margins with a reasonable $250/month account commitment, transparent pallet receiving fees ($25 to $35 per pallet), and deep commercial carrier rate discounts.
          </p>
          <button onClick={onOpenAuditModal} className="btn-primary" style={{ padding: '1.1rem 2.4rem', fontSize: '1.1rem', fontWeight: 800 }}>
            <span>Calculate Your Bulky Parcel Savings</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};
