import { SectionVideoBackground } from '../components/video/SectionVideoBackground';
import { StructuredData } from '../components/seo/StructuredData';
import { ArrowRight } from 'lucide-react';
import type { FaqItem } from '../types';

const SHIPBOB_FAQS: FaqItem[] = [
  {
    question: 'How do I migrate inventory from ShipBob to Starshippp without interrupting Shopify sales?',
    answer:
      'We execute a Zero-Downtime Migration Protocol. First, we mirror your Shopify SKUs and catalog in Starshippp. Next, you issue a freight removal order from ShipBob directly to our loading docks. During transit, ShipBob continues fulfilling orders from remaining units. The second your pallets are scanned into Starshippp (within 24 hours of arrival), order routing automatically shifts to our warehouse with zero sales blackout.',
  },
  {
    question: 'Why do DTC brands switch from ShipBob to starshippp.com?',
    answer:
      'Brands switch because ShipBob enforces $1,500+ monthly spend minimums, inflates rates on large cartons with default 139 DIM divisors, penalizes custom unboxing with excessive kitting markups, and forces founders into 48-hour Zendesk ticketing delays. Starshippp offers an accessible $250 per month minimum, aggressive carrier DIM factor relief, transparent pallet receiving, and radical transparency through our real-time mobile app and direct warehouse floor Slack.',
  },
  {
    question: 'Does Starshippp charge hidden carrier fuel surcharges or invoice markups like legacy 3PLs?',
    answer:
      'No. Starshippp passes through true discounted Commercial Plus carrier rates with completely transparent itemized line items. We never pad residential delivery surcharges or tack on surprise quarterly fuel fee adjustments.',
  },
];

export const AlternativesShipbobPage: React.FC<{
  onOpenAuditModal: () => void;
  onOpenTourModal?: () => void;
  onOpenSettings: () => void;
}> = ({ onOpenAuditModal, onOpenTourModal: _onOpenTourModal, onOpenSettings: _onOpenSettings }) => {
  return (
    <div style={{ paddingTop: '5.5rem' }}>
      <StructuredData
        pageTitle="The Anti-ShipBob 3PL Alternative | Negotiated DIM Relief & $250 Minimum | starshippp.com"
        pageDescription="Looking for a ShipBob alternative? Starshippp provides aggressive carrier DIM factor relief, fair $250/mo minimum commitment, automated payouts via our mobile app, and direct warehouse floor Slack access."
        canonicalUrl="https://starshippp.com/alternatives/shipbob/"
        faqs={SHIPBOB_FAQS}
        breadcrumbs={[
          { name: 'Home', url: 'https://starshippp.com/' },
          { name: 'Alternatives', url: 'https://starshippp.com/#alternatives' },
          { name: 'ShipBob Alternative', url: 'https://starshippp.com/alternatives/shipbob/' },
        ]}
        howTo={{
          name: 'The 3-Step Zero-Downtime 3PL Migration Protocol',
          description:
            'How to safely migrate e-commerce inventory from ShipBob to Starshippp without disrupting live Shopify customer orders or suffering stockouts.',
          steps: [
            {
              name: 'Step 1: Shopify SKU Catalog Mirroring',
              text: 'We clone your product catalog and barcode registry into Starshippp WMS in one click. Zero disruption to active frontends.',
            },
            {
              name: 'Step 2: Coordinated Freight Transfer to Midwest Hub',
              text: 'ShipBob pallets ship to our loading dock. ShipBob fulfills buffer inventory orders while freight is in transit.',
            },
            {
              name: 'Step 3: 24-Hour Scan Check-In & Live Cutover',
              text: 'Units are scanned and stowed within 24 hours of arrival. Fulfillment order routing switches seamlessly to Starshippp.',
            },
          ],
        }}
      />

      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '75vh', display: 'flex', alignItems: 'center', padding: '5rem 0' }}>
        <SectionVideoBackground
          videoUrl="/videos/warehouse-pallet-pull.mp4"
          posterUrl="/images/warehouse-pallet-poster.jpg"
          overlayOpacity={0.52}
        />
        
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>

          <h1 style={{ maxWidth: 840, marginBottom: '1.25rem' }}>
            Escape $1,500/Month Minimums & Punitive DIM Penalties.
          </h1>

          <p style={{ fontSize: '1.2rem', color: 'var(--hero-subtitle-color)', maxWidth: 720, marginBottom: '2.25rem' }}>
            ShipBob is designed for venture-backed conglomerates. If you ship bulky boxes or products that hit dimensional weight, you are subsidizing their mega-warehouses. Starshippp is the boutique 3PL alternative, offering aggressive carrier DIM factor relief, cheap bulk storage, transparent pallet receiving, a fair $250 per month minimum, and your choice of mobile app telemetry or direct warehouse floor Slack.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <button onClick={onOpenAuditModal} className="btn-primary" style={{ padding: '0.9rem 1.75rem' }}>
              <span>Start 30-Day Zero-Downtime Migration</span>
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
              Head-to-Head: starshippp.com vs. ShipBob
            </h2>

            <div className="glass-panel" style={{ borderRadius: 0, border: '1px solid rgba(255, 107, 0, 0.3)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--table-header-bg)', borderBottom: '1px solid var(--border-subtle)' }}>
                    <th style={{ padding: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>METRIC</th>
                    <th style={{ padding: '1.2rem', color: 'var(--brand-orange-light)', fontSize: '0.95rem', fontWeight: 800 }}>starshippp.com</th>
                    <th style={{ padding: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>ShipBob</th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: '0.9rem' }}>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '1.1rem', fontWeight: 600 }}>Monthly Minimum Spend</td>
                    <td style={{ padding: '1.1rem', color: '#10B981', fontWeight: 700 }}>$250 / mo (Fair & Sustainable)</td>
                    <td style={{ padding: '1.1rem', color: '#F87171' }}>$1,500 to $2,500 / mo penalty</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '1.1rem', fontWeight: 600 }}>Carrier DIM Weight Factor</td>
                    <td style={{ padding: '1.1rem', color: '#10B981', fontWeight: 700 }}>Aggressive Negotiated Divisor</td>
                    <td style={{ padding: '1.1rem', color: '#F87171' }}>Standard 139/166 (Punitive rate hikes)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '1.1rem', fontWeight: 600 }}>Communication Channel</td>
                    <td style={{ padding: '1.1rem', color: '#10B981', fontWeight: 700 }}>Starship App + Floor Slack (&lt; 5 min)</td>
                    <td style={{ padding: '1.1rem', color: '#F87171' }}>Ticketing portal (24 to 48 hr delay)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '1.1rem', fontWeight: 600 }}>Receiving Intake Surcharge</td>
                    <td style={{ padding: '1.1rem', color: '#10B981', fontWeight: 700 }}>Transparent $25 to $35 / Pallet + SKU Audit</td>
                    <td style={{ padding: '1.1rem', color: '#F87171' }}>$35 to $45 / Pallet + SKU scan gouging</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '1.1rem', fontWeight: 600 }}>Custom Packaging & Kitting</td>
                    <td style={{ padding: '1.1rem', color: '#10B981', fontWeight: 700 }}>Available Premium Add-On</td>
                    <td style={{ padding: '1.1rem', color: '#F87171' }}>$0.75 to $1.85 / item markup</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '1.1rem', fontWeight: 600 }}>Same-Day Dispatch Cutoff</td>
                    <td style={{ padding: '1.1rem', color: '#10B981', fontWeight: 700 }}>1:00 PM EST (Guaranteed)</td>
                    <td style={{ padding: '1.1rem', color: 'var(--text-secondary)' }}>10:30 AM EST (Frequent backlogs)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 3-Step Zero-Downtime Migration Protocol */}
          <div style={{ maxWidth: 880, margin: '0 auto 4rem' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
              The 3-Step Zero-Downtime Migration Protocol
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: 0, borderLeft: '3px solid var(--brand-orange)' }}>
                <div style={{ color: 'var(--brand-orange)', fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                  STEP 01
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Shopify SKU Mirroring</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  We clone your product catalog into our WMS in 1 click. Zero disruptions to live sales or store frontends.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: 0, borderLeft: '3px solid var(--brand-orange)' }}>
                <div style={{ color: 'var(--brand-orange)', fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                  STEP 02
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Freight Transfer to Midwest Hub</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  ShipBob pallets ship to our freight docks. ShipBob fulfills the buffer while freight is in transit.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: 0, borderLeft: '3px solid #10B981' }}>
                <div style={{ color: '#10B981', fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                  STEP 03
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>24-Hr Check-In & Flip</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Pallets scanned into active stock within 24 hours. Order routing seamlessly switches to Starshippp.
                </p>
              </div>
            </div>
          </div>

          {/* Direct AEO Q&A */}
          <div style={{ maxWidth: 840, margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2.5rem', fontSize: '2rem' }}>
              ShipBob Migration: Direct Questions & Answers
            </h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {SHIPBOB_FAQS.map((faq) => (
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
