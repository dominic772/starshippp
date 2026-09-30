import React, { useState } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { TestimonialStrip } from '../components/home/TestimonialStrip';
import { TargetBrandsShowcase } from '../components/home/TargetBrandsShowcase';
import { ArbitrageGrid } from '../components/home/ArbitrageGrid';
import { DimCalculator } from '../components/home/DimCalculator';
import { InHouseVs3plCalculator } from '../components/home/InHouseVs3plCalculator';
import { PontiacTransitMap } from '../components/home/PontiacTransitMap';
import { WarehouseFloorSlackDemo } from '../components/home/WarehouseFloorSlackDemo';
import { AuditDropzoneSection } from '../components/home/AuditDropzoneSection';
import { ContactFormSection } from '../components/home/ContactFormSection';
import { FaqAccordion, STARSHIPPP_FAQS } from '../components/home/FaqAccordion';
import { StructuredData } from '../components/seo/StructuredData';
import { SectionVideoBackground } from '../components/video/SectionVideoBackground';
import { TrendingUp, Box } from 'lucide-react';

interface HomePageProps {
  onOpenAuditModal: () => void;
  onOpenTourModal?: () => void;
  onOpenSettings: () => void;
  onOpenContactModal?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenAuditModal,
  onOpenTourModal: _onOpenTourModal,
  onOpenSettings,
  onOpenContactModal,
}) => {
  const [activeCalculator, setActiveCalculator] = useState<'dim' | 'roi'>('dim');

  const scrollToCalculators = () => {
    document.getElementById('calculators')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* Schema Injection */}
      <StructuredData
        pageTitle="starshippp.com | Boutique 3PL & Fulfillment Hub | Pontiac, Michigan"
        pageDescription="The anti-mega-3PL located in Pontiac, Michigan. $0 monthly minimums, zero hidden receiving surcharges, direct warehouse-floor Slack access, and custom luxury unboxing for 300 to 3,000 orders/mo."
        canonicalUrl="https://starshippp.com"
        faqs={STARSHIPPP_FAQS}
        includeTools={true}
        rating={{ ratingValue: '4.98', reviewCount: '47' }}
      />

      {/* 1. Dynamic Hero Section with Multi-Scene Video Sequencer */}
      <HeroSection
        onOpenAuditModal={onOpenAuditModal}
        onOpenSettings={onOpenSettings}
        onScrollToCalculators={scrollToCalculators}
        onOpenContactModal={onOpenContactModal}
      />

      {/* 1.5 Real Founder Proof Bar (Anti-Mega-3PL Verified) */}
      <TestimonialStrip />

      {/* 2. Target Brands & Niche Sweet Spot Showcase (Revolving Target Products & Anti-Mega-3PL) */}
      <TargetBrandsShowcase
        onOpenContactModal={onOpenContactModal}
      />

      {/* 3. The Competitor Arbitrage Grid (Background Video 1) */}
      <ArbitrageGrid 
        onOpenAuditModal={onOpenAuditModal} 
        onOpenContactModal={onOpenContactModal}
      />

      {/* 3. Interactive Link-Magnet Tools: DIM & ROI Calculators (Background Video 2) */}
      <section
        id="calculators"
        style={{
          paddingTop: '6rem',
          paddingBottom: '6rem',
          backgroundColor: 'var(--bg-section-alt)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Video 2: Parcel Laser Scanning & Weight Verification */}
        <SectionVideoBackground
          videoUrl="/videos/package-scan-dispatch.mp4"
          posterUrl="/images/package-scan-poster.jpg"
          overlayOpacity={0.79}
        />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center', maxWidth: 780, margin: '0 auto 3rem' }}>
            <h2 style={{ marginBottom: '1.25rem' }}>
              Run the Math Before You Ship Another Parcel.
            </h2>
            <p style={{ fontSize: '1.15rem', color: '#FFFFFF', fontWeight: 600, lineHeight: 1.6, textShadow: '0 2px 10px rgba(0,0,0,0.85)' }}>
              See how our Tier-1 commercial volume discounts and zero-minimum fee structure outperform retail carrier counters and mega-3PL contracts.
            </p>

            {/* Calculator Tab Switcher - Sharp Cyber Industrial */}
            <div
              style={{
                display: 'inline-flex',
                background: 'var(--tab-bg)',
                padding: '0.25rem',
                borderRadius: 0,
                border: '1px solid var(--border-card)',
                borderLeft: '3px solid var(--brand-orange)',
                marginTop: '1.5rem',
                gap: '0.35rem',
              }}
            >
              <button
                type="button"
                onClick={() => setActiveCalculator('dim')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.85rem 1.6rem',
                  borderRadius: 0,
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: '1.02rem',
                  color: activeCalculator === 'dim' ? '#050811' : '#FFFFFF',
                  backgroundColor: activeCalculator === 'dim' ? 'var(--brand-orange)' : 'transparent',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
              >
                <Box size={18} />
                <span>Tool 1: Dimensional Weight (DIM) Calculator</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCalculator('roi')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.85rem 1.6rem',
                  borderRadius: 0,
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: '1.02rem',
                  color: activeCalculator === 'roi' ? '#050811' : '#FFFFFF',
                  backgroundColor: activeCalculator === 'roi' ? 'var(--brand-orange)' : 'transparent',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
              >
                <TrendingUp size={18} />
                <span>Tool 2: True Cost In-House vs. 3PL ROI</span>
              </button>
            </div>
          </div>

          {/* Active Calculator Component View */}
          <div style={{ maxWidth: 960, margin: '0 auto' }}>
            {activeCalculator === 'dim' ? (
              <DimCalculator onOpenAuditModal={onOpenAuditModal} />
            ) : (
              <InHouseVs3plCalculator onOpenAuditModal={onOpenAuditModal} />
            )}
          </div>
        </div>
      </section>

      {/* 4. Facility & Geographic Edge: Pontiac Transit Radius Map */}
      <PontiacTransitMap onOpenContactModal={onOpenContactModal} />

      {/* 5. Direct Warehouse Floor Slack Demo */}
      <WarehouseFloorSlackDemo />

      {/* 6. Free 30-Day Shipping Statement Audit */}
      <AuditDropzoneSection onOpenAuditModal={onOpenAuditModal} />

      {/* 7. Dedicated Pontiac Floor Contact & Rate Request Form */}
      <ContactFormSection />

      {/* 8. Comprehensive Direct AEO Q&A Section */}
      <FaqAccordion />
    </div>
  );
};
