import { SectionVideoBackground } from '../components/video/SectionVideoBackground';
import { StructuredData } from '../components/seo/StructuredData';
import { ArrowRight } from 'lucide-react';
import type { FaqItem } from '../types';

const SHIPMONK_FAQS: FaqItem[] = [
  {
    question: 'Why do DTC brands switch from ShipMonk to Starshippp?',
    answer:
      'Brands leave ShipMonk due to steep software platform subscription fees, hidden account management charges, punitive $2,000+ monthly minimum invoice penalties, and delayed ticketing support. Starshippp offers $0 software fees, an accessible $250/mo minimum, and direct Slack access to our warehouse floor.',
  },
  {
    question: 'How do you transfer inventory from ShipMonk without pausing sales?',
    answer:
      'We execute a 3-step Zero-Downtime Migration Protocol. We duplicate your SKU catalog into Starshippp, arrange freight pickup directly from ShipMonk fulfillment centers, and maintain fulfillment buffer until units arrive at our facility. Orders switch seamlessly upon our 24-hour scan check-in.',
  },
  {
    question: 'Does Starshippp charge separate monthly software or portal access fees?',
    answer:
      'No. Access to the Starshippp merchant portal, live SKU inventory telemetry, Shopify integration, and direct floor Slack communication is 100% free and included with every account.',
  },
  {
    question: 'How does Starshippp pricing compare to ShipMonk for custom unboxing?',
    answer:
      'ShipMonk penalizes custom unboxing with multi-tier kitting fees and strict packaging guidelines. Starshippp offers premium unboxing and custom packaging at flat, predictable rates.',
  },
];

export const AlternativesShipmonkPage: React.FC<{
  onOpenAuditModal: () => void;
  onOpenTourModal?: () => void;
  onOpenSettings?: () => void;
}> = ({ onOpenAuditModal, onOpenTourModal: _onOpenTourModal }) => {
  return (
    <div style={{ paddingTop: '5.5rem' }}>
      <StructuredData
        pageTitle="The ShipMonk Alternative | Zero Software Fees & $250 Minimum | starshippp.com"
        pageDescription="Looking for a ShipMonk alternative? Starshippp eliminates monthly software fees, invoice minimum penalties, and support ticket delays with direct floor Slack access."
        canonicalUrl="https://starshippp.com/alternatives/shipmonk/"
        faqs={SHIPMONK_FAQS}
        breadcrumbs={[
          { name: 'Home', url: 'https://starshippp.com/' },
          { name: 'Alternatives', url: 'https://starshippp.com/#alternatives' },
          { name: 'ShipMonk Alternative', url: 'https://starshippp.com/alternatives/shipmonk/' },
        ]}
        howTo={{
          name: 'How to Migrate from ShipMonk to Starshippp with Zero Downtime',
          description:
            'A proven step-by-step protocol to transfer your e-commerce stock from ShipMonk to Starshippp with zero shipping interruption or inventory blackout.',
          steps: [
            {
              name: 'Step 1: SKU & Barcode Catalog Sync',
              text: 'We map your active store SKUs directly into Starshippp WMS within minutes.',
            },
            {
              name: 'Step 2: Coordinated Freight Relocation',
              text: 'Issue an inventory extraction request from ShipMonk routed straight to our loading bay.',
            },
            {
              name: 'Step 3: 24-Hour Inbound Check-In',
              text: 'Our team verifies, inspects, and scans your units into live inventory within 24 hours of arrival, flipping your order stream effortlessly.',
            },
          ],
        }}
      />

      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '75vh', display: 'flex', alignItems: 'center', padding: '5rem 0' }}>
        <SectionVideoBackground
          videoUrl="/videos/warehouse-pallet-pull.mp4"
          posterUrl="/images/warehouse-pallet-poster.jpg"
          overlayOpacity={0.55}
        />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <h1 style={{ maxWidth: 840, marginBottom: '1.25rem' }}>
            Tired of ShipMonk Software Markups & Monthly Minimum Penalties?
          </h1>

          <p style={{ fontSize: '1.2rem', color: 'var(--hero-subtitle-color)', maxWidth: 740, marginBottom: '2.25rem' }}>
            The boutique 3PL alternative to ShipMonk. Stop paying monthly software platform subscriptions and $2,000 minimum spend fees. Starshippp delivers high-touch boutique fulfillment with direct warehouse Slack access and $0 platform fees.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <button onClick={onOpenAuditModal} className="btn-primary" style={{ padding: '0.9rem 1.75rem' }}>
              <span>Compare My ShipMonk Invoice</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Head-to-Head Comparison */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-section-alt)' }}>
        <div className="container">
          <div style={{ maxWidth: 880, margin: '0 auto 4rem' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              Head-to-Head: starshippp.com vs. ShipMonk
            </h2>

            <div className="glass-panel" style={{ borderRadius: 0, border: '1px solid rgba(255, 107, 0, 0.3)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--table-header-bg)', borderBottom: '1px solid var(--border-subtle)' }}>
                    <th style={{ padding: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>METRIC</th>
                    <th style={{ padding: '1.2rem', color: 'var(--brand-orange-light)', fontSize: '0.95rem', fontWeight: 800 }}>starshippp.com</th>
                    <th style={{ padding: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>ShipMonk</th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: '0.9rem' }}>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '1.1rem', fontWeight: 600 }}>Monthly Spend Minimum</td>
                    <td style={{ padding: '1.1rem', color: '#10B981', fontWeight: 700 }}>$250 / mo (Fair & Sustainable)</td>
                    <td style={{ padding: '1.1rem', color: '#F87171' }}>$1,500 to $2,500 / mo penalty</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '1.1rem', fontWeight: 600 }}>Software & Platform Fees</td>
                    <td style={{ padding: '1.1rem', color: '#10B981', fontWeight: 700 }}>$0 / mo (Free portal & API access)</td>
                    <td style={{ padding: '1.1rem', color: '#F87171' }}>Platform license & tech surcharge fees</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '1.1rem', fontWeight: 600 }}>Support Access</td>
                    <td style={{ padding: '1.1rem', color: '#10B981', fontWeight: 700 }}>Direct Floor Slack Channel (&lt; 5 min)</td>
                    <td style={{ padding: '1.1rem', color: '#F87171' }}>Ticketing queue & Happiness Engineers</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '1.1rem', fontWeight: 600 }}>Custom Packaging & Inserts</td>
                    <td style={{ padding: '1.1rem', color: '#10B981', fontWeight: 700 }}>Available Premium Add-On</td>
                    <td style={{ padding: '1.1rem', color: '#F87171' }}>Strict kitting markups per touchpoint</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '1.1rem', fontWeight: 600 }}>Midwest Ground Reach</td>
                    <td style={{ padding: '1.1rem', color: '#10B981', fontWeight: 700 }}>1 to 2 days to 68% of US population</td>
                    <td style={{ padding: '1.1rem', color: 'var(--text-secondary)' }}>Multi-node inventory splitting required</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 3-Step Zero-Downtime Migration */}
          <div style={{ maxWidth: 880, margin: '0 auto 4rem' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
              The 3-Step Zero-Downtime Migration Protocol
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: 0, borderLeft: '3px solid var(--brand-orange)' }}>
                <div style={{ color: 'var(--brand-orange)', fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                  STEP 01
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Catalog & Barcode Setup</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  We import and map your SKUs directly into our warehouse system with zero disruption to your store.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: 0, borderLeft: '3px solid var(--brand-orange)' }}>
                <div style={{ color: 'var(--brand-orange)', fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                  STEP 02
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Freight Transfer to Midwest Hub</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Pallets roll from ShipMonk to our Michigan facility while buffer stock covers active orders.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: 0, borderLeft: '3px solid #10B981' }}>
                <div style={{ color: '#10B981', fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                  STEP 03
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>24-Hr Check-In & Flip</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Stock verified and stowed within 24 hours. Routing flips instantly to Starshippp with zero lost revenue.
                </p>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div style={{ maxWidth: 840, margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2.5rem', fontSize: '2rem' }}>
              Frequently Asked Questions: Switching from ShipMonk
            </h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {SHIPMONK_FAQS.map((faq) => (
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
