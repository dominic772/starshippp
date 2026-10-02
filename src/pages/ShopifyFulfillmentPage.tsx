import { SectionVideoBackground } from '../components/video/SectionVideoBackground';
import { StructuredData } from '../components/seo/StructuredData';
import { Zap, RefreshCw, Box, ArrowRight } from 'lucide-react';
import type { FaqItem } from '../types';

const SHOPIFY_FAQS: FaqItem[] = [
  {
    question: 'How fast does Starshippp integrate with my Shopify store?',
    answer:
      'Integration takes under 60 seconds. Our native Shopify application connects securely via OAuth. Your entire product catalog, SKU barcodes, current inventory levels, and historical order profiles automatically sync in real-time with zero CSV uploads or custom developer code required.',
  },
  {
    question: 'How are Shopify order tracking numbers and fulfillment statuses updated?',
    answer:
      'The exact millisecond an outbound package is scanned and weighed at our warehouse dispatch bay, Starshippp writes back the carrier name (USPS, UPS, FedEx, DHL), tracking number, and marked-as-fulfilled status directly to your Shopify Admin. Automated customer dispatch notifications trigger instantaneously.',
  },
  {
    question: 'Do you support Shopify bundles, kitting, and multi-location inventory routing?',
    answer:
      'Yes. Starshippp natively handles virtual SKU bundle disassembly (e.g. promotional gift sets, buy-one-get-one kits) and multi-location inventory fulfillment rules. If you sell across Shopify POS, online store, or Shopify B2B wholesale, orders route dynamically to our floor.',
  },
  {
    question: 'Why choose Starshippp over legacy Shopify 3PL networks or ShipBob?',
    answer:
      'Mega-3PLs enforce $1,500 to $2,500 monthly spend penalties, charge steep receiving surcharges per pallet, and route support through impersonal Zendesk ticketing queues. Starshippp offers a fair $250 monthly minimum, direct floor Slack access, and transparent receiving for growing brands doing 300 to 3,500 orders/month.',
  },
];

export const ShopifyFulfillmentPage: React.FC<{
  onOpenAuditModal: () => void;
  onOpenTourModal?: () => void;
  onOpenSettings?: () => void;
}> = ({ onOpenAuditModal, onOpenTourModal: _onOpenTourModal }) => {
  return (
    <div style={{ paddingTop: '5.5rem' }}>
      <StructuredData
        pageTitle="Shopify 3PL Fulfillment Center | Real-Time Sync & $250 Minimum | starshippp.com"
        pageDescription="The premier Shopify 3PL fulfillment partner for DTC brands doing 300 to 3,500 orders/month. Instant 60-second Shopify integration, automated tracking writebacks, and direct floor Slack."
        canonicalUrl="https://starshippp.com/shopify-3pl-fulfillment/"
        faqs={SHOPIFY_FAQS}
        breadcrumbs={[
          { name: 'Home', url: 'https://starshippp.com/' },
          { name: 'Fulfillment Verticals', url: 'https://starshippp.com/#services' },
          { name: 'Shopify 3PL Fulfillment', url: 'https://starshippp.com/shopify-3pl-fulfillment/' },
        ]}
        howTo={{
          name: 'Connecting Your Shopify Store to Starshippp in 3 Simple Steps',
          description:
            'How to connect your Shopify store to Starshippp 3PL warehouse with zero downtime or developer assistance.',
          steps: [
            {
              name: 'Step 1: One-Click OAuth Store Connection',
              text: 'Authorize the Starshippp app in your Shopify admin. Product catalog and active SKUs mirror into our WMS within 60 seconds.',
            },
            {
              name: 'Step 2: Inventory Inbound to Freight Docks',
              text: 'Ship factory cartons or pallets to our Michigan facility. We barcode, check-in, and stow inventory within 24 hours with transparent pallet receiving fees.',
            },
            {
              name: 'Step 3: Automated Real-Time Fulfillment & Tracking Writebacks',
              text: 'Orders flow to our packing benches automatically. The second an order is packed, Starshippp updates Shopify tracking and triggers customer dispatch emails.',
            },
          ],
        }}
      />

      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '75vh', display: 'flex', alignItems: 'center', padding: '5rem 0' }}>
        <SectionVideoBackground
          videoUrl="/videos/shopify-fulfillment-sync.mp4"
          posterUrl="/images/shopify-fulfillment-poster.jpg"
          overlayOpacity={0.55}
        />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <h1 style={{ maxWidth: 880, marginBottom: '1.25rem' }}>
            The Boutique Shopify 3PL Built for Fast-Growing DTC Brands.
          </h1>

          <p style={{ fontSize: '1.2rem', color: 'var(--hero-subtitle-color)', maxWidth: 740, marginBottom: '2.25rem' }}>
            Native Shopify app integration with 60-second onboarding. Zero manual CSV exports, zero $1,500 monthly minimum penalties, direct two-way sync with Shopify, instant tracking writebacks, and direct warehouse-floor Slack access.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <button onClick={onOpenAuditModal} className="btn-primary" style={{ padding: '0.9rem 1.75rem' }}>
              <span>Connect Your Shopify Store</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Feature Architecture Grid */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-section-alt)' }}>
        <div className="container">
          <div style={{ maxWidth: 780, margin: '0 auto 3.5rem', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '1rem' }}>Engineered for Frictionless Shopify Operations</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Everything your brand needs to scale from 300 to 3,000 orders/month without adding headcount or dealing with mega-3PL red tape.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            <div className="glass-panel" style={{ padding: '2rem', borderRadius: 0, borderLeft: '3px solid var(--brand-orange)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                <Zap size={22} color="var(--brand-orange)" />
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Instant 60-Second Sync</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Connect your Shopify admin in one click. Inventory levels, variants, and product weights populate automatically across our WMS.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', borderRadius: 0, borderLeft: '3px solid #10B981' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                <RefreshCw size={22} color="#10B981" />
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Zero-Latency Tracking</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                When our floor scales scan a parcel, Shopify is instantly marked fulfilled with the live carrier tracking link. No delayed webhooks.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', borderRadius: 0, borderLeft: '3px solid var(--brand-orange)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                <Box size={22} color="var(--brand-orange)" />
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Bundle & Kit Disassembly</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Sell combo gift sets, BOGOs, or holiday bundles on Shopify. Our pick-and-pack stations dynamically pull the component items with zero manual SKU mapping.
              </p>
            </div>
          </div>

          {/* Shopify 3PL Comparison Table */}
          <div style={{ maxWidth: 880, margin: '0 auto 4rem' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              Why Shopify Founders Switch to Starshippp
            </h2>

            <div className="glass-panel" style={{ borderRadius: 0, border: '1px solid rgba(255, 107, 0, 0.3)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--table-header-bg)', borderBottom: '1px solid var(--border-subtle)' }}>
                    <th style={{ padding: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>FEATURE</th>
                    <th style={{ padding: '1.2rem', color: 'var(--brand-orange-light)', fontSize: '0.95rem', fontWeight: 800 }}>starshippp.com</th>
                    <th style={{ padding: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Mega-3PLs / ShipBob</th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: '0.9rem' }}>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '1.1rem', fontWeight: 600 }}>Monthly Spend Minimum</td>
                    <td style={{ padding: '1.1rem', color: '#34D399', fontWeight: 700 }}>$250 / mo (Fair & Sustainable)</td>
                    <td style={{ padding: '1.1rem', color: '#F87171' }}>$1,500 to $2,500 / mo penalty</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '1.1rem', fontWeight: 600 }}>Support Channel</td>
                    <td style={{ padding: '1.1rem', color: '#34D399', fontWeight: 700 }}>Direct Floor Slack Channel (&lt; 5 min)</td>
                    <td style={{ padding: '1.1rem', color: '#F87171' }}>Zendesk support queue (24-48 hr delay)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '1.1rem', fontWeight: 600 }}>Inbound Receiving Fees</td>
                    <td style={{ padding: '1.1rem', color: '#34D399', fontWeight: 700 }}>Transparent $25 to $35 / Pallet + SKU Audit</td>
                    <td style={{ padding: '1.1rem', color: '#F87171' }}>$35 to $45 / Pallet + SKU scan fees</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '1.1rem', fontWeight: 600 }}>Custom Packaging & Unboxing</td>
                    <td style={{ padding: '1.1rem', color: '#34D399', fontWeight: 700 }}>Available Premium Add-On</td>
                    <td style={{ padding: '1.1rem', color: '#F87171' }}>Standard brown boxes; expensive kitting fees</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '1.1rem', fontWeight: 600 }}>Same-Day Dispatch SLA</td>
                    <td style={{ padding: '1.1rem', color: '#34D399', fontWeight: 700 }}>1:00 PM EST Daily Cutoff</td>
                    <td style={{ padding: '1.1rem', color: 'var(--text-secondary)' }}>10:30 AM EST (Regular backlog delays)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Shopify FAQs */}
          <div style={{ maxWidth: 840, margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2.5rem', fontSize: '2rem' }}>
              Shopify Fulfillment: Frequently Asked Questions
            </h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {SHOPIFY_FAQS.map((faq) => (
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
