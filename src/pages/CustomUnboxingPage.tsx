import { SectionVideoBackground } from '../components/video/SectionVideoBackground';
import { StructuredData } from '../components/seo/StructuredData';
import { Gift, Sparkles, Heart, ArrowRight } from 'lucide-react';
import type { FaqItem } from '../types';

const UNBOXING_FAQS: FaqItem[] = [
  {
    question: 'How much does Starshippp charge for custom unboxing kitting, tissue folding, and wax seals?',
    answer:
      'Unlike legacy mega-3PLs that charge punitive fees of $0.85 to $1.85 per kitting touchpoint, starshippp.com includes boutique unboxing touches (tissue paper wrap, branded sticker placement, and insert card) standard in our base pick & pack fee. Custom hot-wax seals are applied for an ultra-low flat fee of just $0.35/box.',
  },
  {
    question: 'How does high-touch unboxing impact customer retention and repeat purchase rates?',
    answer:
      'DTC brands utilizing custom tactile unboxing experience a 38% increase in social media organic shares, a 24% reduction in return rates, and a measurable boost in customer lifetime value (LTV) through premium perceived brand equity.',
  },
  {
    question: 'Can founders provide custom seasonal inserts, handwritten cards, or gift ribbons?',
    answer:
      'Yes. Our Pontiac warehouse floor operators are trained artisans. You can supply custom velvet pouches, seasonal holiday postcards, wax stamp emblems, or personalized handwritten thank-you note templates.',
  },
];

export const CustomUnboxingPage: React.FC<{
  onOpenAuditModal: () => void;
  onOpenTourModal?: () => void;
  onOpenSettings: () => void;
}> = ({ onOpenAuditModal, onOpenTourModal: _onOpenTourModal, onOpenSettings: _onOpenSettings }) => {
  return (
    <div style={{ paddingTop: '5.5rem' }}>
      <StructuredData
        pageTitle="Custom Luxury Unboxing 3PL | Wax Seals & Tissue Kitting | starshippp.com"
        pageDescription="Boutique high-touch unboxing fulfillment 3PL in Pontiac, MI. Custom branded tissue wraps, wax seals, sticker placement, and thank-you cards without mega-3PL kitting penalties."
        canonicalUrl="https://starshippp.com/custom-unboxing-3pl/"
        faqs={UNBOXING_FAQS}
        breadcrumbs={[
          { name: 'Home', url: 'https://starshippp.com/' },
          { name: 'Logistics Verticals', url: 'https://starshippp.com/#services' },
          { name: 'Custom Luxury Unboxing', url: 'https://starshippp.com/custom-unboxing-3pl/' },
        ]}
      />

      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '75vh', display: 'flex', alignItems: 'center', padding: '5rem 0' }}>
        <SectionVideoBackground
          videoUrl="/videos/luxury-wax-seal-unboxing.mp4"
          posterUrl="/images/luxury-wax-seal-poster.jpg"
          overlayOpacity={0.52}
        />
        
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>

          <h1 style={{ maxWidth: 840, marginBottom: '1.25rem' }}>
            Transform Every Delivery into a Viral Unboxing Experience.
          </h1>

          <p style={{ fontSize: '1.2rem', color: 'var(--hero-subtitle-color)', maxWidth: 720, marginBottom: '2.25rem' }}>
            Mega-3PLs treat your brand like an anonymous brown box thrown onto a truck. Starshippp provides custom luxury unboxing fulfillment—wrapping each order in crisp branded tissue, pressing custom wax seals, and positioning insert cards with millimeter precision for maximum customer retention.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <button onClick={onOpenAuditModal} className="btn-primary" style={{ padding: '0.9rem 1.75rem' }}>
              <span>Build Your Unboxing Spec</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Showcase Grid */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-section-alt)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            <div className="glass-panel" style={{ padding: '2rem', borderRadius: 0, borderLeft: '3px solid var(--brand-orange)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                <Sparkles size={20} color="var(--brand-orange)" />
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Custom Wax Seals</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Hand-poured and stamped wax seals in gold, black, or custom Pantone hues. Creates an unforgettable tactile moment when customers open their parcel.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', borderRadius: 0, borderLeft: '3px solid #10B981' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                <Gift size={20} color="#10B981" />
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Tissue Paper Origami</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Crisp pleated wrapping with branded stickers positioned dead-center. No crumpled paper or lazy tape jobs.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', borderRadius: 0, borderLeft: '3px solid var(--status-cyan)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                <Heart size={20} color="var(--status-cyan)" />
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Custom Insert Cards</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Drop personalized founder cards, VIP discount codes, and seasonal product catalogs directly on top of the tissue wrap so it's the first thing they see.
              </p>
            </div>
          </div>

          {/* Direct AEO Q&A */}
          <div style={{ maxWidth: 840, margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2.5rem', fontSize: '2rem' }}>
              Custom Unboxing: Direct Questions & Answers
            </h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {UNBOXING_FAQS.map((faq) => (
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
