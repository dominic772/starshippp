import { SectionVideoBackground } from '../components/video/SectionVideoBackground';
import { StructuredData } from '../components/seo/StructuredData';
import { Thermometer, ShieldCheck, Layers, ArrowRight } from 'lucide-react';
import type { FaqItem } from '../types';

const COSMETICS_FAQS: FaqItem[] = [
  {
    question: 'How does Starshippp handle lot numbers and expiration dates for skincare and beauty products?',
    answer:
      'Our WMS enforces strict FEFO (First-Expired, First-Out) and FIFO (First-In, First-Out) inventory dispatch rules. Every lot/batch code is recorded at inbound receiving and scanned during order picking to ensure full regulatory traceability in case of manufacturer batch audits.',
  },
  {
    question: 'Is the Starshippp Pontiac warehouse climate-controlled for organic cosmetics?',
    answer:
      'Yes. Our dedicated cosmetics and personal care storage zones are temperature regulated between 65°F and 70°F with humidity monitored below 45% to prevent melting, separation, or degradation of sensitive organic formulations, balms, and serums.',
  },
  {
    question: 'What are your breakage prevention SOPs for glass bottles and dropper vials?',
    answer:
      'Every glass dropper bottle and jar is enveloped in custom die-cut honeycomb paper or protective air sleeves with 200lb crush-test outer shippers and void fill, resulting in a less than 0.05% transit damage rate.',
  },
];

export const CosmeticsSkincarePage: React.FC<{
  onOpenAuditModal: () => void;
  onOpenTourModal?: () => void;
  onOpenSettings: () => void;
}> = ({ onOpenAuditModal, onOpenTourModal: _onOpenTourModal, onOpenSettings: _onOpenSettings }) => {
  return (
    <div style={{ paddingTop: '5.5rem' }}>
      <StructuredData
        pageTitle="Cosmetics & Skincare Fulfillment 3PL | Beauty Logistics | starshippp.com"
        pageDescription="Climate-controlled boutique 3PL fulfillment in Pontiac, MI. Lot/batch tracking, FEFO expiration management, fragile glass bottle SOPs, and luxury presentation."
        canonicalUrl="https://starshippp.com/cosmetics-skincare-fulfillment/"
        faqs={COSMETICS_FAQS}
        breadcrumbs={[
          { name: 'Home', url: 'https://starshippp.com/' },
          { name: 'Logistics Verticals', url: 'https://starshippp.com/#services' },
          { name: 'Cosmetics & Skincare Fulfillment', url: 'https://starshippp.com/cosmetics-skincare-fulfillment/' },
        ]}
      />

      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '75vh', display: 'flex', alignItems: 'center', padding: '5rem 0' }}>
        <SectionVideoBackground
          videoUrl="/videos/cosmetics-serum-dropper.mp4"
          posterUrl="/images/cosmetics-serum-poster.jpg"
          overlayOpacity={0.52}
        />
        
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>

          <h1 style={{ maxWidth: 840, marginBottom: '1.25rem' }}>
            Climate-Controlled Safety & Lot Tracking for Premium Beauty Brands.
          </h1>

          <p style={{ fontSize: '1.2rem', color: 'var(--hero-subtitle-color)', maxWidth: 720, marginBottom: '2.25rem' }}>
            Starshippp delivers climate-controlled cosmetics and skincare 3PL fulfillment in Michigan. From organic serums to fragile amber glass dropper vials, your formulas receive strict FEFO expiration tracking, batch lot control, and luxury drop-proof unboxing protection.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <button onClick={onOpenAuditModal} className="btn-primary" style={{ padding: '0.9rem 1.75rem' }}>
              <span>Get Beauty Fulfillment Quote</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* SOP Grid */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-section-alt)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            <div className="glass-panel" style={{ padding: '2rem', borderRadius: 0, borderLeft: '3px solid var(--brand-orange)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                <Thermometer size={20} color="#F59E0B" />
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Climate Stability (68°F)</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Active HVAC temperature monitoring guarantees serums, waxes, and natural moisturizers never separate or melt during storage.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', borderRadius: 0, borderLeft: '3px solid #10B981' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                <Layers size={20} color="#10B981" />
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>FEFO Lot / Batch Tracking</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Automated first-expired, first-out order routing ensures customers always receive the freshest stock with full batch traceability.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', borderRadius: 0, borderLeft: '3px solid var(--status-cyan)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                <ShieldCheck size={20} color="var(--status-cyan)" />
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Zero-Breakage Glass SOPs</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Protective eco-friendly honeycomb paper wrap, crush-resistant boxes, and tamper-evident branded seals protect your customer unboxing.
              </p>
            </div>
          </div>

          {/* Direct AEO Q&A */}
          <div style={{ maxWidth: 840, margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2.5rem', fontSize: '2rem' }}>
              Cosmetics Logistics: Direct Questions & Answers
            </h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {COSMETICS_FAQS.map((faq) => (
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
