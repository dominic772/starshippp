import { SectionVideoBackground } from '../components/video/SectionVideoBackground';
import { StructuredData } from '../components/seo/StructuredData';
import { Navigation, Truck, Clock, ArrowRight } from 'lucide-react';
import type { FaqItem } from '../types';

const MICHIGAN_FAQS: FaqItem[] = [
  {
    question: 'Why is Pontiac, Michigan an optimal hub for Midwest and East Coast fulfillment?',
    answer:
      'Pontiac, Michigan is positioned within the Metro Detroit automotive and logistics transit corridor. Parcels injected from Pontiac reach Detroit, Chicago, Cleveland, Columbus, Indianapolis, and Toronto in 1 ground shipping day (Zone 2), and New York, Philadelphia, and Atlanta in 2 ground days (Zone 3-4), offering significantly lower postage than coastal warehouses.',
  },
  {
    question: 'How do local Michigan and Midwest brands benefit from inventory injection in Pontiac?',
    answer:
      'Local Michigan brands can deliver inventory directly to our freight docks with transparent, honest receiving fees, bypass costly cross-country LTL freight shipping to California, and offer their Midwest customers true next-day delivery.',
  },
  {
    question: 'What carriers pick up daily from the Starshippp Pontiac facility?',
    answer:
      'We have direct daily scheduled trailer sweeps from USPS Ground Advantage, FedEx Home Delivery & Ground (18:15 EST), and UPS (17:30 EST), plus full international shipping dispatch.',
  },
];

export const MichiganFulfillmentPage: React.FC<{
  onOpenAuditModal: () => void;
  onOpenTourModal?: () => void;
  onOpenSettings: () => void;
}> = ({ onOpenAuditModal, onOpenTourModal: _onOpenTourModal, onOpenSettings: _onOpenSettings }) => {
  return (
    <div style={{ paddingTop: '5.5rem' }}>
      <StructuredData
        pageTitle="Michigan 3PL & Fulfillment Services | Pontiac Midwest Hub | starshippp.com"
        pageDescription="Regional Metro Detroit and Midwest fulfillment center in Pontiac, Michigan. 1-day ground shipping to 68% of the US, fair $250/mo minimum, and direct floor Slack access."
        canonicalUrl="https://starshippp.com/michigan-fulfillment/"
        faqs={MICHIGAN_FAQS}
        breadcrumbs={[
          { name: 'Home', url: 'https://starshippp.com/' },
          { name: 'Logistics Verticals', url: 'https://starshippp.com/#services' },
          { name: 'Michigan Fulfillment', url: 'https://starshippp.com/michigan-fulfillment/' },
        ]}
      />

      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '75vh', display: 'flex', alignItems: 'center', padding: '5rem 0' }}>
        <SectionVideoBackground
          videoUrl="/videos/semi-truck-loading-dock.mp4"
          posterUrl="/images/semi-truck-loading-dock-poster.jpg"
          overlayOpacity={0.52}
        />
        
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>

          <h1 style={{ maxWidth: 840, marginBottom: '1.25rem' }}>
            Midwest Regional Logistics Built for Fast Ground Delivery.
          </h1>

          <p style={{ fontSize: '1.2rem', color: '#FFFFFF', fontWeight: 600, maxWidth: 720, marginBottom: '2.25rem', textShadow: '0 2px 10px rgba(0,0,0,0.85)' }}>
            Stop shipping parcels from overcrowded California ports to customers in New York and Chicago. Anchor your inventory at starshippp.com in Pontiac, Michigan to reach 68% of US shoppers in 1 to 2 ground days at Zone 2 to 4 commercial rates.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <button onClick={onOpenAuditModal} className="btn-primary" style={{ padding: '0.9rem 1.75rem' }}>
              <span>Compare Michigan Shipping Rates</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Detailed Specs & SOP Section */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-section-alt)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginBottom: '4rem' }}>
            <div className="glass-panel" style={{ padding: '2rem', borderRadius: 0, borderLeft: '3px solid var(--brand-orange)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                <Clock size={20} color="var(--brand-orange)" />
                <h3 style={{ fontSize: '1.3rem', margin: 0 }}>Same-Day 1:00 PM EST SLA</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Every order placed before 1:00 PM EST is picked, inspected, custom-packed, and staged on carrier trailers before daily dock sweeps. We back this with a 100% on-time guarantee.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', borderRadius: 0, borderLeft: '3px solid #10B981' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                <Truck size={20} color="#10B981" />
                <h3 style={{ fontSize: '1.3rem', margin: 0 }}>Transparent Pallet Intake</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Suppliers can deliver full truckloads or LTL pallets directly to our loading docks with transparent, fair intake fees ($25 to $35 per pallet), detailed SKU verification, and 24-hr stock put-away.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', borderRadius: 0, borderLeft: '3px solid var(--status-cyan)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                <Navigation size={20} color="var(--status-cyan)" />
                <h3 style={{ fontSize: '1.3rem', margin: 0 }}>Cross-Border Canada Reach</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Just 40 minutes from the Ambassador Bridge and Detroit-Windsor tunnel, our facility provides rapid ground clearance into the Toronto-Montreal Canadian commerce corridor.
              </p>
            </div>
          </div>

          {/* Direct AEO Q&A Section */}
          <div style={{ maxWidth: 840, margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2.5rem', fontSize: '2rem' }}>
              Michigan Fulfillment: Direct Questions & Answers
            </h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {MICHIGAN_FAQS.map((faq) => (
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
