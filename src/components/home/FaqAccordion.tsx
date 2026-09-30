import React, { useState } from 'react';
import { SectionVideoBackground } from '../video/SectionVideoBackground';
import { ChevronDown } from 'lucide-react';
import type { FaqItem } from '../../types';

export const STARSHIPPP_FAQS: FaqItem[] = [
  {
    question: 'What is the average pick and pack fee for a boutique 3PL?',
    answer:
      'At starshippp.com, our transparent flat pick and pack fee starts at $2.65 for the primary pick (which includes standard mailer/box packaging, tape, shipping label, and void fill), plus $0.45 per additional item. Unlike mega-3PLs, we charge $0 monthly minimum penalties, $0 receiving dock surcharges, and include custom tissue folding without extra line-item gouging.',
    category: 'Pricing',
  },
  {
    question: 'How does starshippp.com handle TikTok Shop fulfillment SLAs?',
    answer:
      'TikTok Shop mandates strict 24-to-48 hour ship-by-date dispatch requirements to protect seller health ratings. starshippp.com maintains a guaranteed same-day 1:00 PM EST SLA cutoff with direct native TikTok Shop API integrations. Orders automatically sync and generate carrier dispatch scans within hours, eliminating late dispatch penalty points.',
    category: 'Operations',
  },
  {
    question: 'Why choose a Pontiac, Michigan fulfillment center over coastal 3PLs?',
    answer:
      'Located in Pontiac, Michigan within the Metro Detroit logistics corridor, starshippp.com reaches over 68% of the United States consumer population in 1 to 2 ground shipping days via USPS, UPS, and FedEx Zone 2 to 4. This provides lower postage costs than coastal California or New York warehouses while avoiding coastal port congestion and high warehouse labor overhead.',
    category: 'Geography',
  },
  {
    question: 'What is the minimum order volume to work with starshippp.com?',
    answer:
      'Our boutique fulfillment hub is specifically optimized for brands shipping between 300 and 3,000 orders per month. We enforce zero monthly minimum order spend penalties, so emerging founders never receive punitive $1,500 monthly idle invoices during off-peak seasonal cycles.',
    category: 'Onboarding',
  },
  {
    question: 'How does direct warehouse-floor Slack access work?',
    answer:
      'Upon onboarding, your brand is given a private Slack channel connected directly to our Pontiac warehouse floor supervisors and packing benches. Founders can request real-time address modifications, inventory count verification, or photo proofs of custom unboxing setups in under 5 minutes without ever waiting 48 hours for a support ticket.',
    category: 'Support',
  },
  {
    question: 'Can starshippp.com execute custom luxury unboxing with wax seals and tissue?',
    answer:
      'Yes. High-touch unboxing is our specialty. Our Pontiac cleanroom packing bays handle custom branded tissue wrapping, hand-stamped wax seals, branded sticker application, handwritten thank-you inserts, and delicate glass cosmetics cushioning standard with precision SOPs.',
    category: 'Unboxing',
  },
  {
    question: 'How does zero-downtime migration from ShipBob or in-house work?',
    answer:
      'Our 30-Day Zero-Downtime Migration protocol mirrors your Shopify product catalog and SKUs into our open-API WMS before physical inventory arrives. Once bulk pallets arrive at our Pontiac docks, inventory is verified within 24 hours, and Shopify order routing switches seamlessly with zero order cutoff blackout.',
    category: 'Migration',
  },
];

export const FaqAccordion: React.FC<{ faqs?: FaqItem[] }> = ({ faqs = STARSHIPPP_FAQS }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faqs"
      style={{
        paddingTop: '6rem',
        paddingBottom: '6rem',
        position: 'relative',
        backgroundColor: 'var(--bg-darkest)',
        overflow: 'hidden',
      }}
    >
      {/* Background Video: Multimodal Freight Telemetry & Transit */}
      <SectionVideoBackground
        videoUrl="/videos/freight-ocean-digital.mp4"
        posterUrl="/images/freight-ocean-poster.jpg"
        overlayOpacity={0.80}
      />

      <div className="container" style={{ maxWidth: 840, position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>
            Frequently Answered Logistics Questions.
          </h2>
          <p style={{ fontSize: '1.12rem', color: '#FFFFFF', fontWeight: 600, textShadow: '0 1px 3px rgba(0,0,0,0.95)' }}>
            Direct answers on pricing, SLAs, custom unboxing, and the Pontiac advantage.
          </p>
        </div>

        {/* Accordion List */}
        <div style={{ display: 'grid', gap: '0.85rem' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={faq.question}
                className="glass-panel"
                style={{
                  borderRadius: 0,
                  backgroundColor: isOpen ? 'var(--bg-surface-elevated)' : 'var(--bg-card)',
                  border: `1px solid ${isOpen ? 'rgba(255, 107, 0, 0.35)' : 'var(--border-subtle)'}`,
                  borderLeft: isOpen ? '3px solid var(--brand-orange)' : '3px solid var(--border-subtle)',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: isOpen ? 'var(--brand-orange-light)' : 'var(--text-white)',
                    }}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    color={isOpen ? 'var(--brand-orange)' : 'var(--text-secondary)'}
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.25s ease',
                      flexShrink: 0,
                    }}
                  />
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 1.5rem 1.35rem',
                      color: '#F1F5F9',
                      fontWeight: 500,
                      fontSize: '0.96rem',
                      lineHeight: 1.65,
                      borderTop: '1px solid var(--border-subtle)',
                      paddingTop: '1rem',
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
