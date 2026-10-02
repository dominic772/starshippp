import React, { useState } from 'react';
import { SectionVideoBackground } from '../video/SectionVideoBackground';
import { ChevronDown } from 'lucide-react';
import type { FaqItem } from '../../types';

export const STARSHIPPP_FAQS: FaqItem[] = [
  {
    question: 'How does Starshippp save brands money on dimensional (DIM) weight for big boxes?',
    answer:
      'Standard carriers use punitive 139 or 166 dimensional divisors, meaning a lightweight 8.5 lb motorcycle exhaust or automotive body panel in a large box is billed as 32+ lbs. Starshippp has an aggressive negotiated carrier DIM factor with USPS Ground Advantage and FedEx Home Delivery that slashes billable dimensional weight by 35% to 55%. Combined with our low-cost central warehouse storage, brands save thousands every month on shipping.',
    category: 'DIM Shipping',
  },
  {
    question: 'What types of products and clients are ideal for Starshippp?',
    answer:
      'We specialize in brands that ship large boxes with low actual weight, including motorcycle parts (exhausts, fenders, saddlebag kits), automotive body panels & aero, outdoor patio furniture, tires, and bulky lifestyle gear. We excel with complex, multi-SKU catalogs requiring extensive high-bay storage (3,000 to 10,000+ sq ft) and near-zero customer return rates. We intentionally avoid small parcel fast-fashion and assemble-yourself flatpack furniture.',
    category: 'Clients & SKUs',
  },
  {
    question: 'What is the monthly minimum account commitment?',
    answer:
      'We maintain an accessible, transparent $250/month minimum account commitment. This protects our warehouse team while ensuring emerging and seasonal brands never face predatory $1,500 to $2,500 monthly dead-minimum penalties common at legacy mega-3PLs.',
    category: 'Pricing',
  },
  {
    question: 'How do inbound receiving and pallet fees work?',
    answer:
      'We charge a fair, transparent receiving fee (typically $25 to $35 per pallet plus standard carton SKU breakdown). Multi-SKU pallets require rigorous counting, inspection, and barcoded bin staging. We bill honestly for the actual physical labor required without hidden dock surcharges or surprise penalty invoices.',
    category: 'Receiving',
  },
  {
    question: 'Why choose a Pontiac, Michigan fulfillment center over coastal 3PLs?',
    answer:
      'Located in Pontiac, Michigan within the Metro Detroit logistics corridor, starshippp.com reaches over 68% of the United States consumer population in 1 to 2 ground shipping days via USPS Ground Advantage and FedEx Home Delivery. This provides lower postage costs than coastal California or New York warehouses while offering vastly cheaper square footage for bulky inventory storage.',
    category: 'Geography',
  },
  {
    question: 'Can Starshippp execute custom packaging, unboxing, or reinforced boxing?',
    answer:
      'Yes. While our standard pick and pack covers heavy-duty corrugated cartons and protective void fill, we offer premium custom packaging, structural foam corner cradling, branded tape, and white-glove unboxing as transparent add-on services tailored to your exact brand SOPs.',
    category: 'Packaging',
  },
  {
    question: 'How does direct warehouse-floor Slack access work?',
    answer:
      'Upon onboarding, your team is given a private Slack channel connected directly to our Pontiac warehouse floor supervisors and packing benches. Founders can request real-time address modifications, inventory count verification, or photo proofs of large carton packaging in under 5 minutes without ever waiting 48 hours for a support ticket.',
    category: 'Support',
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
