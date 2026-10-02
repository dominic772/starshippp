import React from 'react';
import { SectionVideoBackground } from '../components/video/SectionVideoBackground';
import { StructuredData } from '../components/seo/StructuredData';
import { Wrench, Shield, ArrowRight, CheckCircle2, Box, Scale } from 'lucide-react';
import type { FaqItem } from '../types';

const MOTORCYCLE_FAQS: FaqItem[] = [
  {
    question: 'How does Starshippp eliminate carrier dimensional weight penalties on motorcycle parts?',
    answer:
      'Motorcycle exhausts, fenders, and saddlebag kits ship in large, bulky cartons with low actual weight (e.g. an 8.5 lb exhaust in a 36x12x10" box). Standard carriers use a 139 or 166 DIM divisor, billing that box as 32+ lbs. Starshippp has an aggressive negotiated carrier DIM factor with USPS Ground Advantage and FedEx Home Delivery that slashes billable weight by 35% to 55%, saving $20 to $45+ per parcel.',
  },
  {
    question: 'Can you handle large multi-SKU catalogs with extensive storage requirements?',
    answer:
      'Yes. Our Midwest high-bay facility offers industrial bulk storage at a fraction of coastal 3PL rates. We easily accommodate brands requiring 3,000 to 10,000+ sq ft for complex SKU catalogs spanning hundreds of fitments, finishes, and model years.',
  },
  {
    question: 'How do you handle returns for powersports and motorcycle parts?',
    answer:
      'Motorcycle parts brands typically have a very low propensity for customer returns. We specialize in precision pre-shipment barcode scanning and heavy-duty foam corner protection, ensuring orders arrive right the first time with virtually zero damage claims.',
  },
  {
    question: 'What is your monthly account minimum?',
    answer:
      'We maintain an accessible, transparent $250/month minimum account commitment. Unlike mega-3PLs that enforce $1,500 to $2,500 monthly dead-minimum penalties, Starshippp is built to be a fair, sustainable partner for growing and established brands alike.',
  },
];

export const MotorcyclePowersportsPage: React.FC<{
  onOpenAuditModal: () => void;
  onOpenSettings?: () => void;
}> = ({ onOpenAuditModal }) => {
  return (
    <div style={{ paddingTop: '5.5rem' }}>
      <StructuredData
        pageTitle="Motorcycle & Powersports Parts 3PL Fulfillment | Starshippp"
        pageDescription="Dedicated 3PL fulfillment for motorcycle aftermarket parts, exhaust systems, fenders, and saddlebags. Negotiated carrier DIM factor relief, cheap bulk storage, and $250/mo minimums with dedicated floor Slack access."
        canonicalUrl="https://starshippp.com/motorcycle-powersports-fulfillment/"
        faqs={MOTORCYCLE_FAQS}
        breadcrumbs={[
          { name: 'Home', url: 'https://starshippp.com/' },
          { name: 'Logistics Verticals', url: 'https://starshippp.com/#services' },
          { name: 'Motorcycle & Powersports', url: 'https://starshippp.com/motorcycle-powersports-fulfillment/' },
        ]}
      />

      {/* Hero Section */}
      <section style={{ position: 'relative', minHeight: '80vh', display: 'flex', alignItems: 'center', padding: '5rem 0' }}>
        <SectionVideoBackground
          videoUrl="/videos/warehouse-pallet-pull.mp4"
          posterUrl="/images/target-motorcycle-parts.jpg"
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
            <Wrench size={14} color="#FFA733" />
            <span>Specialized Powersports & Aftermarket 3PL</span>
          </div>

          <h1 style={{ maxWidth: 880, marginBottom: '1.25rem' }}>
            Built for Big Boxes & Low Weight. Stop Overpaying on DIM Rates.
          </h1>

          <p style={{ fontSize: '1.2rem', color: '#FFFFFF', fontWeight: 600, maxWidth: 740, marginBottom: '2.5rem', textShadow: '0 2px 10px rgba(0,0,0,0.85)', lineHeight: 1.6 }}>
            Motorcycle exhaust systems, fenders, and saddlebag kits are notorious for triggering brutal carrier dimensional weight markups. Starshippp pairs an <strong style={{ color: '#FFA733' }}>aggressive negotiated DIM factor</strong> with low-cost central warehouse storage, cutting postage bills by 35% to 55%.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <button onClick={onOpenAuditModal} className="btn-primary" style={{ padding: '1.1rem 2.2rem', fontSize: '1.05rem', fontWeight: 800 }}>
              <span>Audit Your Carrier DIM Invoices</span>
              <ArrowRight size={18} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34D399', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 700 }}>
              <CheckCircle2 size={16} color="#34D399" />
              <span>USPS Ground Advantage & FedEx Home Delivery Optimized</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillars */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-section-alt)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 3.5rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>
              Why Powersports Brands Switch to Starshippp.
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
              Mega-3PLs hate large cartons and slap them with punitive fees. We built our fulfillment facility specifically to handle bulky parts catalogs with high precision.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            <div className="glass-panel" style={{ padding: '2.25rem', borderTop: '3px solid #FFA733' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <Scale size={24} color="#FFA733" />
                <h3 style={{ fontSize: '1.25rem', margin: 0, color: '#fff' }}>Negotiated DIM Divisor</h3>
              </div>
              <p style={{ color: '#CBD5E1', fontSize: '0.94rem', lineHeight: 1.6 }}>
                Carriers charge for cubic volume, not actual scale weight. Our high negotiated DIM divisor slashes billable weight on slip-on pipes and touring boxes by up to 55%.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '2.25rem', borderTop: '3px solid #34D399' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <Box size={24} color="#34D399" />
                <h3 style={{ fontSize: '1.25rem', margin: 0, color: '#fff' }}>Cheap High-Bay Storage</h3>
              </div>
              <p style={{ color: '#CBD5E1', fontSize: '0.94rem', lineHeight: 1.6 }}>
                Got 5,000 to 10,000 sq ft of bulky inventory? Our Midwest facility gives you cost-effective pallet and cantilever racking without California or East Coast rent penalties.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '2.25rem', borderTop: '3px solid #38BDF8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <Shield size={24} color="#38BDF8" />
                <h3 style={{ fontSize: '1.25rem', margin: 0, color: '#fff' }}>Near-Zero Returns Profile</h3>
              </div>
              <p style={{ color: '#CBD5E1', fontSize: '0.94rem', lineHeight: 1.6 }}>
                Unlike fast-fashion apparel or flimsy assemble-yourself flatpacks, serious powersports gear has low return rates. We ensure accurate barcode matching so every order is right the first time.
              </p>
            </div>
          </div>

          {/* Real Packing Station Demonstration */}
          <div className="glass-panel" style={{ padding: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#FFA733', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Warehouse SOP Spotlight
              </div>
              <h3 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '1rem' }}>
                Heavy-Duty Cushioning & Dual Barcode Verification
              </h3>
              <p style={{ color: '#CBD5E1', lineHeight: 1.6, marginBottom: '1.5rem', fontSize: '0.96rem' }}>
                Every exhaust, chrome slip-on, and painted fender is inspected for flawless surface finish, nested in high-density foam cradle blocks, and packed into heavy-duty double-wall corrugated cartons. Barcodes are scanned at the pick cart and verified again at the tape station before trailer loading.
              </p>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#fff', fontSize: '0.9rem' }}>
                  <CheckCircle2 size={16} color="#34D399" />
                  <span>Custom foam corner blocking to prevent transit ding claims</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#fff', fontSize: '0.9rem' }}>
                  <CheckCircle2 size={16} color="#34D399" />
                  <span>USPS Ground Advantage & FedEx Home Delivery daily trailer sweeps</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#fff', fontSize: '0.9rem' }}>
                  <CheckCircle2 size={16} color="#34D399" />
                  <span>Direct floor Slack channel for stock checks and order modifications</span>
                </div>
              </div>
            </div>

            <div>
              <img
                src="/images/target-motorcycle-parts.jpg"
                alt="Motorcycle exhaust and fender parts packaging station at Starshippp warehouse"
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
            Transparent $250/mo Account Minimum.
          </h2>
          <p style={{ color: '#CBD5E1', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            Never worry about seasonal valleys or getting hit with $1,500 monthly idle penalties. We charge an accessible $250/mo baseline to keep your account active and properly supported, with transparent receiving and standard pick & pack.
          </p>
          <button onClick={onOpenAuditModal} className="btn-primary" style={{ padding: '1.1rem 2.4rem', fontSize: '1.1rem', fontWeight: 800 }}>
            <span>Request Powersports 3PL Rates</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};
