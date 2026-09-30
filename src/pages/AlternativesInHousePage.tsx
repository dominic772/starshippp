import { SectionVideoBackground } from '../components/video/SectionVideoBackground';
import { StructuredData } from '../components/seo/StructuredData';
import { ArrowRight } from 'lucide-react';
import type { FaqItem } from '../types';

const IN_HOUSE_FAQS: FaqItem[] = [
  {
    question: 'How do I know when it is time to stop self-fulfilling orders in-house?',
    answer:
      'The inflection point occurs between 200 and 400 orders per month. At this threshold, founders typically spend 15 to 25 hours per week taping boxes, printing labels, and driving to post offices instead of marketing, product innovation, and customer acquisition. Furthermore, commercial postage volume discounts through a 3PL frequently offset fulfillment labor costs completely.',
  },
  {
    question: 'Will our custom unboxing experience suffer if we transition away from self-fulfillment?',
    answer:
      'No. At Starshippp, we pride ourselves on being boutique. We follow your exact packing checklist — including branded tissue folding, custom sticker placement, handwritten or printed insert cards, and wax seals. We treat your brand unboxing with the exact same craftsmanship you do yourself.',
  },
  {
    question: 'What is the minimum inventory required to start?',
    answer:
      'Zero minimums. Unlike mega-3PLs that demand 500+ units per SKU or enforce $1,500 monthly spend penalties, Starshippp welcomes emerging brands with 1 to 50 SKUs doing 300 to 3,000 orders/month. You can start with a few cartons or a single pallet.',
  },
  {
    question: 'How do we move inventory from our garage, office, or storage unit to Pontiac?',
    answer:
      'We coordinate a local freight or LTL pickup directly from your doorstep or storage facility straight to our Pontiac, Michigan loading docks. We check in, count, and barcode every unit within 24 hours so you are live and fulfilling immediately.',
  },
];

export const AlternativesInHousePage: React.FC<{
  onOpenAuditModal: () => void;
  onOpenTourModal?: () => void;
  onOpenSettings?: () => void;
}> = ({ onOpenAuditModal, onOpenTourModal: _onOpenTourModal }) => {
  return (
    <div style={{ paddingTop: '5.5rem' }}>
      <StructuredData
        pageTitle="Stop Self-Fulfilling: Transition to a Boutique 3PL | starshippp.com"
        pageDescription="Tired of packing boxes until 2 AM? Transition from garage or self-storage fulfillment to Starshippp in Pontiac, MI. White-glove unboxing, $0 minimums, and commercial carrier discounts."
        canonicalUrl="https://starshippp.com/alternatives/in-house-fulfillment/"
        faqs={IN_HOUSE_FAQS}
        breadcrumbs={[
          { name: 'Home', url: 'https://starshippp.com/' },
          { name: 'Alternatives', url: 'https://starshippp.com/#alternatives' },
          { name: 'In-House Fulfillment Alternative', url: 'https://starshippp.com/alternatives/in-house-fulfillment/' },
        ]}
        howTo={{
          name: 'The Founder Transition: From Self-Packing to Boutique 3PL in 3 Steps',
          description:
            'How DTC founders transition inventory from self-fulfillment (garage, office, or storage facility) to Starshippp with zero lost sales.',
          steps: [
            {
              name: 'Step 1: Unboxing Specification & SOP Hand-Off',
              text: 'You share your tissue wrap, sticker placement, and packaging protocol via video or photo sample. We create a standardized bench checklist.',
            },
            {
              name: 'Step 2: Freight Pickup from Your Location',
              text: 'We arrange LTL pallet or parcel pickup from your home, storage unit, or supplier directly to our Pontiac loading docks.',
            },
            {
              name: 'Step 3: Shopify Sync & Freedom Day',
              text: 'We scan your stock, connect your store in 60 seconds, and take over picking, packing, and carrier handoffs. You get 20+ hours back per week.',
            },
          ],
        }}
      />

      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '75vh', display: 'flex', alignItems: 'center', padding: '5rem 0' }}>
        <SectionVideoBackground
          videoUrl="/videos/apparel-folding-warehouse.mp4"
          posterUrl="/images/apparel-folding-poster.jpg"
          overlayOpacity={0.52}
        />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <h1 style={{ maxWidth: 880, marginBottom: '1.25rem' }}>
            Stop Packing Boxes Yourself. Reclaim 20 Hours a Week to Grow Your Brand.
          </h1>

          <p style={{ fontSize: '1.2rem', color: 'var(--hero-subtitle-color)', maxWidth: 740, marginBottom: '2.25rem' }}>
            Founder liberation: stop packing boxes at 2 AM. You started your business to build an iconic brand — not to become a tape-gun technician. Transition from self-fulfillment to a boutique Pontiac 3PL with $0 minimums and white-glove unboxing.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <button onClick={onOpenAuditModal} className="btn-primary" style={{ padding: '0.9rem 1.75rem' }}>
              <span>Calculate My Fulfillment Savings</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Comparison Grid: In-House Self-Fulfillment vs Starshippp */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-section-alt)' }}>
        <div className="container">
          <div style={{ maxWidth: 880, margin: '0 auto 4rem' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              Self-Fulfillment vs. starshippp.com
            </h2>

            <div className="glass-panel" style={{ borderRadius: 0, border: '1px solid rgba(255, 107, 0, 0.3)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--table-header-bg)', borderBottom: '1px solid var(--border-subtle)' }}>
                    <th style={{ padding: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>DIMENSION</th>
                    <th style={{ padding: '1.2rem', color: 'var(--brand-orange-light)', fontSize: '0.95rem', fontWeight: 800 }}>starshippp.com</th>
                    <th style={{ padding: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Self-Fulfilling In-House</th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: '0.9rem' }}>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '1.1rem', fontWeight: 600 }}>Founder Time Spent</td>
                    <td style={{ padding: '1.1rem', color: '#10B981', fontWeight: 700 }}>0 hours / week (Automated dispatch)</td>
                    <td style={{ padding: '1.1rem', color: '#F87171' }}>15 – 30 hours / week taped down</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '1.1rem', fontWeight: 600 }}>Carrier Shipping Discounts</td>
                    <td style={{ padding: '1.1rem', color: '#10B981', fontWeight: 700 }}>Commercial Plus Tier-1 volume rates</td>
                    <td style={{ padding: '1.1rem', color: '#F87171' }}>High retail counter / basic PirateShip rates</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '1.1rem', fontWeight: 600 }}>Warehouse Rent & Utilities</td>
                    <td style={{ padding: '1.1rem', color: '#10B981', fontWeight: 700 }}>$0 commercial leases or overhead</td>
                    <td style={{ padding: '1.1rem', color: '#F87171' }}>$1,500 – $4,000 / mo rent & security</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '1.1rem', fontWeight: 600 }}>Same-Day Dispatch Cutoff</td>
                    <td style={{ padding: '1.1rem', color: '#10B981', fontWeight: 700 }}>1:00 PM EST guaranteed daily SLA</td>
                    <td style={{ padding: '1.1rem', color: 'var(--text-secondary)' }}>Rushing to the post office before 5:00 PM</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '1.1rem', fontWeight: 600 }}>Unboxing Quality</td>
                    <td style={{ padding: '1.1rem', color: '#10B981', fontWeight: 700 }}>Meticulous tissue fold & custom seals</td>
                    <td style={{ padding: '1.1rem', color: '#10B981' }}>High touch, but drains founder energy</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 3 Steps To Transition */}
          <div style={{ maxWidth: 880, margin: '0 auto 4rem' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
              How to Transition in 3 Simple Steps
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: 0, borderLeft: '3px solid var(--brand-orange)' }}>
                <div style={{ color: 'var(--brand-orange)', fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                  STEP 01
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Unboxing SOP Hand-Off</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Show us exactly how you pack each order. We replicate your tissue folds, stickers, and cards down to the millimeter.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: 0, borderLeft: '3px solid var(--brand-orange)' }}>
                <div style={{ color: 'var(--brand-orange)', fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                  STEP 02
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Inventory Pickup to Pontiac</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  We coordinate freight pickup from your garage or storage unit directly to our Pontiac loading dock.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: 0, borderLeft: '3px solid #10B981' }}>
                <div style={{ color: '#10B981', fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                  STEP 03
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Freedom Day</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Orders flow directly from Shopify to our floor. You get your life back and focus 100% on sales and growth.
                </p>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div style={{ maxWidth: 840, margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2.5rem', fontSize: '2rem' }}>
              Common Questions About Stopping Self-Fulfillment
            </h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {IN_HOUSE_FAQS.map((faq) => (
                <div key={faq.question} className="glass-panel" style={{ padding: '1.5rem', borderRadius: 0, borderLeft: '2px solid rgba(255, 107, 0, 0.4)' }}>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--brand-orange-light)', marginBottom: '0.5rem' }}>
                    {faq.question}
                  </h3>
                  <p style={{ color: 'var(--text-primary)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
