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
        pageTitle="starshippp.com | Radical Transparency 3PL | Mobile App & Floor Slack"
        pageDescription="Fulfillment powered by radical transparency. Choose between our high-speed mobile app for automated payouts and live telemetry, or direct warehouse floor Slack access. Fair $250/mo minimum and negotiated carrier DIM factor relief."
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

            {/* Calculator Tab Switcher - High-Legibility Cockpit Controls */}
            <div className="calculator-tool-tabs">
              <button
                type="button"
                onClick={() => setActiveCalculator('dim')}
                className={`calc-tool-tab-btn ${activeCalculator === 'dim' ? 'active' : ''}`}
              >
                <Box size={19} className="calc-tool-tab-icon" />
                <span>Tool 1: Dimensional Weight (DIM) Calculator</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCalculator('roi')}
                className={`calc-tool-tab-btn ${activeCalculator === 'roi' ? 'active' : ''}`}
              >
                <TrendingUp size={19} className="calc-tool-tab-icon" />
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
