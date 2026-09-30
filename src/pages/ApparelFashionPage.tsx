import { SectionVideoBackground } from '../components/video/SectionVideoBackground';
import { StructuredData } from '../components/seo/StructuredData';
import { Shirt, RotateCcw, Barcode, ArrowRight } from 'lucide-react';
import type { FaqItem } from '../types';

const APPAREL_FAQS: FaqItem[] = [
  {
    question: 'How does Starshippp eliminate mis-picks across apparel size and color variant matrices?',
    answer:
      'We utilize multi-point 2D barcode matrix verification at every pick cart and packing station. An item cannot be packed into an outbound box unless the specific SKU, size (e.g. S vs XS), and colorway matches the digital order invoice, reducing pick error rates to 0.02%.',
  },
  {
    question: 'What is your standard apparel returns inspection and repackaging SOP?',
    answer:
      'Returned apparel items are unboxed within 24 hours of arrival, inspected for signs of wear, odor, makeup stains, or missing tags. Pristine garments are re-steamed, folded into fresh crystal polybags with new barcode tags, and returned to active inventory.',
  },
  {
    question: 'Does Starshippp support custom hangtags, branded polymailers, and folding guides?',
    answer:
      'Yes. Unlike rigid mega-3PLs that mandate standard brown boxes, our boutique kitting team executes custom folding protocols, attaches branded hangtags with safety pins or ribbons, and ships in your custom branded matte polymailers.',
  },
];

export const ApparelFashionPage: React.FC<{
  onOpenAuditModal: () => void;
  onOpenTourModal?: () => void;
  onOpenSettings: () => void;
}> = ({ onOpenAuditModal, onOpenTourModal: _onOpenTourModal, onOpenSettings: _onOpenSettings }) => {
  return (
    <div style={{ paddingTop: '5.5rem' }}>
      <StructuredData
        pageTitle="Apparel & Fashion Fulfillment 3PL | Boutique Clothing Logistics | starshippp.com"
        pageDescription="Boutique apparel 3PL fulfillment in Pontiac, MI. High-accuracy size/color variant matrix scanning, garment steaming, returns inspection, and custom branded polybagging."
        canonicalUrl="https://starshippp.com/apparel-fashion-fulfillment/"
        faqs={APPAREL_FAQS}
        breadcrumbs={[
          { name: 'Home', url: 'https://starshippp.com/' },
          { name: 'Logistics Verticals', url: 'https://starshippp.com/#services' },
          { name: 'Apparel & Fashion Fulfillment', url: 'https://starshippp.com/apparel-fashion-fulfillment/' },
        ]}
      />

      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '75vh', display: 'flex', alignItems: 'center', padding: '5rem 0' }}>
        <SectionVideoBackground
          videoUrl="/videos/apparel-folding-warehouse.mp4"
          posterUrl="/images/apparel-folding-poster.jpg"
          overlayOpacity={0.52}
        />
        
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>

          <h1 style={{ maxWidth: 840, marginBottom: '1.25rem' }}>
            Precision Variant Scanning & White-Glove Returns for Fashion Brands.
          </h1>

          <p style={{ fontSize: '1.2rem', color: 'var(--hero-subtitle-color)', maxWidth: 720, marginBottom: '2.25rem' }}>
            Starshippp delivers specialized apparel and fashion fulfillment with high-accuracy SKU variant matrix scanning, garment steaming, crystal polybagging, and same-day returns processing—eliminating wrong-size shipping errors for growing clothing brands.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <button onClick={onOpenAuditModal} className="btn-primary" style={{ padding: '0.9rem 1.75rem' }}>
              <span>Get Apparel Fulfillment Quote</span>
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
                <Barcode size={20} color="var(--brand-orange)" />
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Variant Matrix Verification</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Every SKU variant (Color, Size, Cut) is scanned at pick and pack. Zero confusion between similar hues or adjacent sizes.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', borderRadius: 0, borderLeft: '3px solid #10B981' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                <RotateCcw size={20} color="#10B981" />
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>24-Hour Return Inspection</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Returns don't sit in dead piles. We inspect, de-lint, fold, steam if needed, reseal in polybags, and replenish inventory within 24 hours.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', borderRadius: 0, borderLeft: '3px solid var(--status-cyan)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                <Shirt size={20} color="var(--status-cyan)" />
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Custom Unboxing & Inserts</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Delicate tissue paper folding, branded stickers, lookbooks, and thank-you cards inserted into each order without punitive kitting surcharges.
              </p>
            </div>
          </div>

          {/* Direct AEO Q&A */}
          <div style={{ maxWidth: 840, margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2.5rem', fontSize: '2rem' }}>
              Apparel Logistics: Direct Questions & Answers
            </h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {APPAREL_FAQS.map((faq) => (
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
