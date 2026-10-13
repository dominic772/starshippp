import React from 'react';
import { SectionVideoBackground } from '../components/video/SectionVideoBackground';
import { StructuredData } from '../components/seo/StructuredData';
import { Printer, Sparkles, CheckCircle2, ArrowRight, Zap, Shield, Layers } from 'lucide-react';
import type { FaqItem } from '../types';

const POD_FAQS: FaqItem[] = [
  {
    question: 'How is Starshippp in-house Print on Demand different from Printful or Printify?',
    answer:
      'Printful and Printify are print brokers or third-party networks with heavy software markups, high per-unit costs, and 4 to 7 business day production backlogs. Starshippp owns and operates industrial Direct-to-Garment (DTG) apparel presses, vinyl contour cutters, and UV flatbed printers directly inside our Pontiac fulfillment center. Your apparel and stickers are printed, cured, merged with your inventory, and packed in the same facility with 0 transit days between printing and shipping.',
  },
  {
    question: 'Can you combine pre-stocked inventory with on-demand printed merchandise in a single box?',
    answer:
      'Yes! That is our signature advantage. If a customer orders a pre-stocked motorcycle exhaust pipe and an on-demand custom club t-shirt, our WMS synchronizes the print queue directly with the pack bench. Both items are consolidated into a single parcel with zero split-shipment shipping fees.',
  },
  {
    question: 'What items can you print on-demand in Pontiac?',
    answer:
      'We print high-density DTG t-shirts and hoodies (Gildan Hammer, Comfort Colors, Bella+Canvas, Next Level), heavy-duty outdoor UV-resistant vinyl stickers, custom corrugated box graphics, branded tissue paper, personalized packing slips, and wax-sealed certificate inserts.',
  },
  {
    question: 'What is your turnaround SLA for print-on-demand fulfillment?',
    answer:
      'Standard on-demand apparel and stickers are printed and packed within 24 hours of order receipt. Orders placed before our daily 1:00 PM EST cutoff can be printed and dispatched the same day for rush campaigns.',
  },
];

export const PrintOnDemandPage: React.FC<{
  onOpenAuditModal: () => void;
  onOpenSettings?: () => void;
  onOpenSandboxModal?: () => void;
}> = ({ onOpenAuditModal, onOpenSandboxModal }) => {
  return (
    <div style={{ paddingTop: '5.5rem' }}>
      <StructuredData
        pageTitle="In-House Print-On-Demand (POD) & Custom Unboxing Fulfillment | Starshippp"
        pageDescription="Direct-to-garment apparel printing, outdoor vinyl stickers, and luxury custom unboxing manufactured directly inside our Pontiac, MI fulfillment center. Faster and higher margin than Printful."
        canonicalUrl="https://starshippp.com/print-on-demand-fulfillment/"
        faqs={POD_FAQS}
        breadcrumbs={[
          { name: 'Home', url: 'https://starshippp.com/' },
          { name: 'Logistics Verticals', url: 'https://starshippp.com/#services' },
          { name: 'Print on Demand', url: 'https://starshippp.com/print-on-demand-fulfillment/' },
        ]}
      />

      {/* Hero Section */}
      <section style={{ position: 'relative', minHeight: '80vh', display: 'flex', alignItems: 'center', padding: '5rem 0' }}>
        <SectionVideoBackground
          videoUrl="/videos/boutique-hand-packing.mp4"
          posterUrl="/images/target-merch-pod.jpg"
          overlayOpacity={0.68}
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
            <Printer size={14} color="#FF6B00" />
            <span>In-House Production &middot; Pontiac, Michigan</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.4rem, 4.5vw, 4.2rem)',
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              maxWidth: 880,
              marginBottom: '1.5rem',
              color: '#fff',
            }}
          >
            Print-On-Demand Integrated Directly On The Warehouse Floor.{' '}
            <span
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, var(--text-white) 30%, #FF8800 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Way Better Than Printful.
            </span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)',
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
              maxWidth: 720,
              marginBottom: '2.5rem',
              fontWeight: 500,
            }}
          >
            Stop paying broker markups and waiting 7 days for Printful or Printify. We operate high-speed DTG industrial textile printers, die-cut vinyl sticker cutters, and luxury unboxing kitting directly inside our Pontiac fulfillment center. Print, merge with physical inventory, and ship in 24 hours.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <button
              onClick={onOpenAuditModal}
              className="btn btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.9rem 2rem',
                fontSize: '1rem',
                fontWeight: 800,
              }}
            >
              <span>Get Wholesale POD Quote</span>
              <ArrowRight size={18} />
            </button>

            {onOpenSandboxModal && (
              <button
                onClick={onOpenSandboxModal}
                className="btn btn-secondary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.9rem 1.8rem',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                }}
              >
                <Zap size={16} color="#FF8500" />
                <span>Test POD API Route</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Comparison Grid: Starshippp vs Printful */}
      <section style={{ padding: '5rem 0', backgroundColor: '#070C1B' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 3.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>
              Why Brands Fire Printful For Starshippp
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
              See why direct warehouse-integrated production beats decentralized print networks every single time.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {/* Feature 1 */}
            <div className="glass-panel" style={{ padding: '2rem', borderTop: '3px solid #FF6B00' }}>
              <div style={{ width: 44, height: 44, borderRadius: 6, backgroundColor: 'rgba(255, 107, 0, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Zap size={22} color="#FF8500" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>
                Zero-Split Order Merging
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                Printful can’t pack a custom t-shirt into the same box as your motorcycle parts or skincare inventory. Starshippp prints on-demand right on the floor and packs everything into a single parcel, eliminating duplicate shipping costs.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-panel" style={{ padding: '2rem', borderTop: '3px solid #34D399' }}>
              <div style={{ width: 44, height: 44, borderRadius: 6, backgroundColor: 'rgba(52, 211, 153, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Sparkles size={22} color="#34D399" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>
                Wholesale Garment Pricing
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                Instead of paying $13.50+ for a basic blank tee through Printful, access direct wholesale catalog pricing ($4.20 - $5.80) with transparent production kitting. Keep an extra 40% to 55% gross margin on every merchandise sale.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-panel" style={{ padding: '2rem', borderTop: '3px solid #38BDF8' }}>
              <div style={{ width: 44, height: 44, borderRadius: 6, backgroundColor: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Layers size={22} color="#38BDF8" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>
                Custom Die-Cut Stickers & Packaging
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                Add heavy UV-coated outdoor stickers to every order automatically. Print customized thank-you notes, custom tape, or branded tissue inserts on demand with zero advance batch print waste.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Production Specs & Machinery */}
      <section style={{ padding: '5rem 0', backgroundColor: '#050811' }}>
        <div className="container">
          <div className="glass-panel" style={{ padding: '3rem', border: '1px solid rgba(255, 107, 0, 0.3)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
              <div>
                <span className="telemetry-badge badge-amber" style={{ marginBottom: '1rem', display: 'inline-block' }}>
                  INDUSTRIAL FLEET SPECS
                </span>
                <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#fff', marginBottom: '1rem', lineHeight: 1.2 }}>
                  Commercial-Grade Print Technology In Metro Detroit
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Our facility is equipped with industrial dual-platen DTG engines, wide-format Japanese cutting plotters, and precision heat-tunnel curing systems calibrated for wash-tested longevity.
                </p>

                <ul style={{ listStyle: 'none', display: 'grid', gap: '0.75rem', fontSize: '0.88rem', color: '#fff' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={16} color="#34D399" />
                    <span>300+ DPI photographic resolution with vibrant CMYK + UltraChrome White</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={16} color="#34D399" />
                    <span>Wash-tested to 50+ commercial laundry cycles with zero cracking or peel</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={16} color="#34D399" />
                    <span>Weatherproof 6 mil thick vinyl outdoor decals with UV laminate coating</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={16} color="#34D399" />
                    <span>Native Shopify, WooCommerce & TikTok Shop automated artwork ingestion</span>
                  </li>
                </ul>
              </div>

              <div
                style={{
                  backgroundColor: '#090E20',
                  borderRadius: 8,
                  padding: '2rem',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FF8500', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Shield size={18} />
                  <span>The Starshippp POD Economics Guarantee</span>
                </h3>

                <div style={{ display: 'grid', gap: '1rem', fontSize: '0.86rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Average Printful DTG Shirt:</span>
                    <strong style={{ color: '#FB7185' }}>$13.95 + $4.99 ship</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Starshippp In-House Blank + Print:</span>
                    <strong style={{ color: '#34D399' }}>$5.80 (In-House)</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Transit from Print to Pack Bench:</span>
                    <strong style={{ color: '#38BDF8' }}>0 Days (Direct Conveyor)</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem' }}>
                    <span style={{ color: '#fff', fontWeight: 700 }}>Your Gross Margin Advantage:</span>
                    <strong style={{ color: '#FFA733', fontSize: '1rem' }}>+$8.15 / Item</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '5rem 0', backgroundColor: '#070C1B' }}>
        <div className="container" style={{ maxWidth: 880 }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '2rem', textAlign: 'center' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {POD_FAQS.map((faq, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
                  {faq.question}
                </h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
