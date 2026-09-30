import { SectionVideoBackground } from '../components/video/SectionVideoBackground';
import { StructuredData } from '../components/seo/StructuredData';
import { Zap, Clock, ShieldAlert, ArrowRight } from 'lucide-react';
import type { FaqItem } from '../types';

const TIKTOK_FAQS: FaqItem[] = [
  {
    question: 'How does Starshippp guarantee compliance with TikTok Shop 24-48 hour dispatch SLAs?',
    answer:
      'TikTok Shop penalizes merchants whose orders fail to receive a carrier scan within strict dispatch windows. At starshippp.com, all TikTok Shop orders received prior to our 1:00 PM EST cutoff are packed and scanned into carrier trailers the exact same day, safeguarding your Shop Health Score and avoiding late dispatch penalty points.',
  },
  {
    question: 'Can Starshippp handle viral surges from TikTok Shop flash sales or affiliate drops?',
    answer:
      'Yes. Our Pontiac warehouse floor features dynamic scaling pick carts and multi-station staging. Brands anticipating a viral TikTok creator campaign notify our floor leads in Slack, allowing us to pre-kit and pre-package high-velocity SKUs for instantaneous dispatch of 1,000+ orders in hours.',
  },
  {
    question: 'Does Starshippp integrate directly with the TikTok Shop Seller Center API?',
    answer:
      'Yes. We connect natively to TikTok Shop, syncing orders instantly upon checkout and automatically posting carrier tracking numbers and initial acceptance scan events back into TikTok within minutes of label creation.',
  },
];

export const TikTokShopPage: React.FC<{
  onOpenAuditModal: () => void;
  onOpenTourModal?: () => void;
  onOpenSettings: () => void;
}> = ({ onOpenAuditModal, onOpenTourModal: _onOpenTourModal, onOpenSettings: _onOpenSettings }) => {
  return (
    <div style={{ paddingTop: '5.5rem' }}>
      <StructuredData
        pageTitle="TikTok Shop 3PL Fulfillment | 24-Hour SLA Dispatch Engine | starshippp.com"
        pageDescription="Guaranteed 24-hour SLA TikTok Shop fulfillment center in Pontiac, MI. Prevent late dispatch rate penalties, integrate directly with TikTok Seller Center, and survive viral surges."
        canonicalUrl="https://starshippp.com/tiktok-shop-fulfillment/"
        faqs={TIKTOK_FAQS}
        breadcrumbs={[
          { name: 'Home', url: 'https://starshippp.com/' },
          { name: 'Logistics Verticals', url: 'https://starshippp.com/#services' },
          { name: 'TikTok Shop Fulfillment', url: 'https://starshippp.com/tiktok-shop-fulfillment/' },
        ]}
      />

      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '75vh', display: 'flex', alignItems: 'center', padding: '5rem 0' }}>
        <SectionVideoBackground
          videoUrl="/videos/tiktok-express-label.mp4"
          posterUrl="/images/tiktok-express-label-poster.jpg"
          overlayOpacity={0.52}
        />
        
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>

          <h1 style={{ maxWidth: 840, marginBottom: '1.25rem' }}>
            Protect Your Shop Rating with Guaranteed 24-Hour SLA Dispatch.
          </h1>

          <p style={{ fontSize: '1.2rem', color: 'var(--hero-subtitle-color)', maxWidth: 720, marginBottom: '2.25rem' }}>
            The TikTok Shop algorithm will throttle your sales if your Late Dispatch Rate (LDR) exceeds 4%. Starshippp is a dedicated TikTok Shop 3PL partner delivering guaranteed 24-hour SLA dispatch and same-day 1:00 PM EST carrier scans to keep your store in peak algorithmic standing.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <button onClick={onOpenAuditModal} className="btn-primary" style={{ padding: '0.9rem 1.75rem' }}>
              <span>Connect TikTok Shop Account</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* SLA Features Grid */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-section-alt)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            <div className="glass-panel" style={{ padding: '2rem', borderRadius: 0, borderLeft: '3px solid var(--brand-orange)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                <Clock size={20} color="var(--brand-orange)" />
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Same-Day 1:00 PM Cutoff</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Every TikTok order dropped before 1:00 PM EST is on carrier wheels before dusk, guaranteeing carrier scan events well before TikTok's countdown timer expires.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', borderRadius: 0, borderLeft: '3px solid #10B981' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                <ShieldAlert size={20} color="#10B981" />
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>0% Late Dispatch Rate Protection</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Our automated barcode verification generates valid carrier tracking numbers immediately and alerts our Pontiac floor if any label is within 3 hours of deadline.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', borderRadius: 0, borderLeft: '3px solid var(--status-cyan)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                <Zap size={20} color="var(--status-cyan)" />
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Viral Drop Pre-Staging</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Creator going live? Give our floor team a heads-up in Slack. We pre-assemble top bundle SKUs so you can fulfill 2,000 orders in a single afternoon without breaking a sweat.
              </p>
            </div>
          </div>

          {/* Direct AEO Q&A */}
          <div style={{ maxWidth: 840, margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2.5rem', fontSize: '2rem' }}>
              TikTok Shop Logistics: Direct Questions & Answers
            </h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {TIKTOK_FAQS.map((faq) => (
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
