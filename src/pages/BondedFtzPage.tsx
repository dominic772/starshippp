import React from 'react';
import { SectionVideoBackground } from '../components/video/SectionVideoBackground';
import { StructuredData } from '../components/seo/StructuredData';
import { Anchor, ShieldCheck, ArrowRight, DollarSign, Calendar, PackageCheck, Zap } from 'lucide-react';
import type { FaqItem } from '../types';

const FTZ_FAQS: FaqItem[] = [
  {
    question: 'What is the difference between a standard bonded warehouse and an FTZ (Foreign Trade Zone)?',
    answer:
      'In a conventional bonded warehouse, your imported goods can sit duty-free for up to 2 years, but customs regulations typically require you to clear and pay duties on the entire container or entry lot all at once. In an FTZ (Foreign Trade Zone), U.S. Customs allows micro-releases: you can release and clear customs duties pallet-by-pallet or carton-by-carton only as orders are sold, keeping the rest of the shipment legally outside U.S. customs territory.',
  },
  {
    question: 'How does carton-by-carton duty release benefit merchant cash flow?',
    answer:
      'If you import a 40-foot ocean container with $300,000 in goods and a 15% tariff ($45,000 duty), you would normally have to pay that $45,000 immediately at the port before goods clear. In our Pontiac FTZ facility, that $45,000 remains 100% deferred. When you sell 5 cartons this week, you pay only the $75 duty on those 5 cartons. Your working capital stays in your bank account.',
  },
  {
    question: 'What happens if goods in the FTZ are re-exported to Canada or internationally?',
    answer:
      'Goods in an FTZ that are re-exported never enter U.S. commerce, meaning ZERO U.S. customs duty is ever paid. With our strategic location 28 miles from the Detroit-Windsor Ambassador Bridge and Canadian border crossing, Starshippp is the ideal North American gateway for dual US-Canadian distribution.',
  },
  {
    question: 'How long can inventory sit in the Starshippp bonded facility before duty is due?',
    answer:
      'Inventory can remain in bond for up to 2 full years (and potentially longer in FTZ status) without incurring upfront customs duties, giving you ultimate flexibility for seasonal roadshows, flash sales, and long-term staging.',
  },
];

export const BondedFtzPage: React.FC<{
  onOpenAuditModal: () => void;
  onOpenSettings?: () => void;
  onOpenSandboxModal?: () => void;
}> = ({ onOpenAuditModal, onOpenSandboxModal }) => {
  return (
    <div style={{ paddingTop: '5.5rem' }}>
      <StructuredData
        pageTitle="Bonded FTZ Warehouse & Customs Duty Deferral 3PL | Starshippp"
        pageDescription="Michigan Foreign Trade Zone (FTZ) & bonded 3PL warehouse. Defer customs duties for up to 2 years and micro-release goods carton-by-carton as they sell. Unlock massive merchant cash flow."
        canonicalUrl="https://starshippp.com/bonded-ftz-fulfillment/"
        faqs={FTZ_FAQS}
        breadcrumbs={[
          { name: 'Home', url: 'https://starshippp.com/' },
          { name: 'Logistics Verticals', url: 'https://starshippp.com/#services' },
          { name: 'Bonded FTZ Fulfillment', url: 'https://starshippp.com/bonded-ftz-fulfillment/' },
        ]}
      />

      {/* Hero Section */}
      <section style={{ position: 'relative', minHeight: '80vh', display: 'flex', alignItems: 'center', padding: '5rem 0' }}>
        <SectionVideoBackground
          videoUrl="/videos/freight-semi-dock.mp4"
          posterUrl="/images/target-heavy-freight.jpg"
          overlayOpacity={0.7}
        />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 0.9rem',
              backgroundColor: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              borderRadius: '2px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: '#38BDF8',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
            }}
          >
            <Anchor size={14} color="#38BDF8" />
            <span>Michigan Foreign Trade Zone &middot; Metro Detroit Corridor</span>
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
            Bonded FTZ Fulfillment.{' '}
            <span
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, var(--text-white) 30%, #38BDF8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Pay Customs Duty Only As Items Sell.
            </span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)',
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
              maxWidth: 750,
              marginBottom: '2.5rem',
              fontWeight: 500,
            }}
          >
            Never drain your company’s cash reserves paying upfront import duties on overseas containers. Park your ocean freight inside our bonded Michigan FTZ facility for up to 2 years. Micro-release duty carton-by-carton or pallet-by-pallet only as orders leave the dock.
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
              <span>Calculate Your Duty Deferral</span>
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
                <Zap size={16} color="#38BDF8" />
                <span>Simulate FTZ Micro-Release</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* The Cash Flow Problem vs FTZ Solution */}
      <section style={{ padding: '5rem 0', backgroundColor: '#070C1B' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 750, margin: '0 auto 3.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>
              The Roadshow & Overseas Import Dilemma — Solved
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
              &ldquo;How are we going to come up with enough cash to buy all these widgets and pay customs for the upcoming season?&rdquo; Put them in Bond.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            {/* The Standard Trap */}
            <div
              className="glass-panel"
              style={{
                padding: '2rem',
                borderTop: '3px solid #FB7185',
                backgroundColor: 'rgba(25, 10, 15, 0.7)',
              }}
            >
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FB7185', marginBottom: '1rem' }}>
                Standard Customs Clearance (The Cash Crunch)
              </h3>
              <ul style={{ listStyle: 'none', display: 'grid', gap: '0.85rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: '#FB7185', fontWeight: 800 }}>&times;</span>
                  <span><strong>100% Upfront Duty:</strong> Customs tariff (5% - 25%+) is due the second the container unloads at port.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: '#FB7185', fontWeight: 800 }}>&times;</span>
                  <span><strong>Tied-Up Working Capital:</strong> $30,000 to $80,000+ in cash is locked into taxes for goods that won’t sell for months.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: '#FB7185', fontWeight: 800 }}>&times;</span>
                  <span><strong>All-or-Nothing Bond:</strong> Traditional bonded warehouses require clearing the whole lot simultaneously.</span>
                </li>
              </ul>
            </div>

            {/* The Starshippp FTZ Edge */}
            <div
              className="glass-panel"
              style={{
                padding: '2rem',
                borderTop: '3px solid #34D399',
                backgroundColor: 'rgba(10, 25, 20, 0.7)',
              }}
            >
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#34D399', marginBottom: '1rem' }}>
                Starshippp FTZ Micro-Release (Cash Flow Nirvana)
              </h3>
              <ul style={{ listStyle: 'none', display: 'grid', gap: '0.85rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <ShieldCheck size={18} color="#34D399" />
                  <span><strong>Up to 2-Year Duty Deferral:</strong> Keep containers safely stored with zero duty paid until items are sold.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <ShieldCheck size={18} color="#34D399" />
                  <span><strong>Carton-by-Carton Micro-Release:</strong> Only remit duty on the exact units packaged and shipped that afternoon.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <ShieldCheck size={18} color="#34D399" />
                  <span><strong>Zero U.S. Duty on Canadian Exports:</strong> Cross the Ambassador Bridge into Ontario duty-free.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Example */}
      <section style={{ padding: '5rem 0', backgroundColor: '#050811' }}>
        <div className="container">
          <div className="glass-panel" style={{ padding: '3rem', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
            <div style={{ maxWidth: 850, margin: '0 auto' }}>
              <span className="telemetry-badge" style={{ borderColor: '#38BDF8', color: '#38BDF8', marginBottom: '1rem', display: 'inline-block' }}>
                METRO DETROIT LOGISTICS CORRIDOR
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '1.25rem' }}>
                Real-World FTZ Mathematical Breakdown
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Consider an e-commerce brand importing 1 container of 4,000 custom motorcycle cylinder heads from overseas:
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: '2rem',
                }}
              >
                <div style={{ backgroundColor: '#090E20', padding: '1.25rem', borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-dim)', fontSize: '0.76rem', marginBottom: '0.4rem' }}>
                    <DollarSign size={14} />
                    <span>Declared Customs Value</span>
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>$340,000</div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>4,000 units @ $85/unit</span>
                </div>

                <div style={{ backgroundColor: '#090E20', padding: '1.25rem', borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-dim)', fontSize: '0.76rem', marginBottom: '0.4rem' }}>
                    <Calendar size={14} />
                    <span>Total Standard Duty Due</span>
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FB7185' }}>$22,100</div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>6.5% tariff rate payable upfront</span>
                </div>

                <div style={{ backgroundColor: '#090E20', padding: '1.25rem', borderRadius: 6, border: '1px solid rgba(52, 211, 153, 0.3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#34D399', fontSize: '0.76rem', marginBottom: '0.4rem' }}>
                    <PackageCheck size={14} />
                    <span>Duty Paid Today (Week 1)</span>
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#34D399' }}>$442</div>
                  <span style={{ fontSize: '0.72rem', color: '#A7F3D0' }}>Only 80 units sold & released</span>
                </div>

                <div style={{ backgroundColor: '#090E20', padding: '1.25rem', borderRadius: 6, border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#38BDF8', fontSize: '0.76rem', marginBottom: '0.4rem' }}>
                    <ShieldCheck size={14} />
                    <span>Working Capital Preserved</span>
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#38BDF8' }}>$21,658</div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Deferred in Bonded Status</span>
                </div>
              </div>

              <div
                style={{
                  padding: '1.25rem 1.5rem',
                  backgroundColor: 'rgba(56, 189, 248, 0.08)',
                  borderRadius: 6,
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  fontSize: '0.9rem',
                  color: '#E0F2FE',
                  lineHeight: 1.5,
                }}
              >
                <strong>The Result:</strong> Instead of spending $22,100 before making your first sale, you reinvest that $21,658 into ads, inventory, and operations. Duty is paid incrementally out of merchant sales revenue, never out of founder pockets.
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
            {FTZ_FAQS.map((faq, idx) => (
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
