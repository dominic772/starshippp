import React, { useState, useEffect } from 'react';
import { SectionVideoBackground } from '../video/SectionVideoBackground';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  MessageSquare, 
  DollarSign, 
  Box,
ChevronLeft, 
  ChevronRight,
  Send,
  Wrench,
  Shield,
  Sun,
  Disc,
  Printer,
  Anchor,
} from 'lucide-react';

interface TargetBrandsShowcaseProps {
  onOpenContactModal?: () => void;
  onOpenTourModal?: () => void;
}

interface ProductShowcaseItem {
  id: string;
  category: string;
  badge: string;
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  title: string;
  orderVolume: string;
  image: string;
  description: string;
  mega3plFlaw: string;
  starshipppEdge: string[];
  sopHighlight: string;
}

const TARGET_PRODUCTS: ProductShowcaseItem[] = [
  {
    id: 'motorcycle',
    category: 'Motorcycle & Powersports',
    badge: 'High DIM • Low Actual Weight',
    icon: Wrench,
    title: 'Exhaust Systems, Fenders & Saddlebag Kits',
    orderVolume: '300 to 3,500 Orders / Month',
    image: '/images/target-motorcycle-parts.jpg',
    description: 'Slip-on performance exhausts, extended touring fenders, fairings, and saddlebag kits that ship in large corrugated cartons with low actual weight, incurring severe retail carrier DIM penalties.',
    mega3plFlaw: 'Mega-3PLs apply default 139/166 dim factors, tripling the billable shipping weight on an 8 lb exhaust pipe to 32+ lbs, while slapping punitive oversized carton storage surcharges.',
    starshipppEdge: [
      'Aggressive negotiated carrier DIM divisor (250) delivering 35% to 55% postage savings',
      'High-density foam nesting and reinforced corners to prevent transit scratches and dents',
      'Huge high-bay storage footprint at our central facility at a fraction of coastal 3PL rates',
      'Zero customer return headaches: specialized parts verification before dock loading'
    ],
    sopHighlight: 'SOP-MOTO-01: Dual-point foam corner lock + dimensional carrier barcode scan'
  },
  {
    id: 'automotive',
    category: 'Automotive Body Panels & Aero',
    badge: 'Oversized Cartons • Zero Flex',
    icon: Shield,
    title: 'Bumpers, Carbon Spoilers & Aero Splitters',
    orderVolume: '250 to 2,000 Orders / Month',
    image: '/images/target-automotive-panels.jpg',
    description: 'Precision carbon fiber rear wings, front splitters, side skirts, and replacement bumper covers requiring large-format storage footprint and careful structural packaging.',
    mega3plFlaw: 'Mega-3PLs reject large automotive SKUs outright or charge astronomical $65+/pallet storage penalties with untrained pickers who snap delicate tabs and splitters.',
    starshipppEdge: [
      'Specialized wide-carton staging benches with rigid foam blocking and edge protectors',
      'Cost-effective offsite bulk storage accommodating 5,000 to 10,000+ sq ft automotive inventories',
      'Carrier trailer direct-load for FedEx Home Delivery & USPS Ground Advantage',
      'Experienced warehouse team familiar with automotive fitment and complex SKU lists'
    ],
    sopHighlight: 'SOP-AERO-03: Full-perimeter foam rail block + carbon weave surface barrier'
  },
  {
    id: 'pod',
    category: 'In-House Print-On-Demand (POD)',
    badge: 'Direct-to-Garment • Custom Packaging • Beats Printful',
    icon: Printer,
    title: 'Custom Merch, Heavy Vinyl Stickers & Luxury Packaging',
    orderVolume: '100 to 3,000 Items / Month',
    image: '/images/target-merch-pod.jpg',
    description: 'On-demand DTG t-shirts, hoodies, heavy-duty vinyl stickers, custom corrugated boxes, and wax-sealed unboxing inserts manufactured directly on the Pontiac warehouse floor.',
    mega3plFlaw: 'Traditional 3PLs cannot print; print brokers like Printful charge 60% markups and take 5 to 7 days before items even ship, preventing single-box order consolidation.',
    starshipppEdge: [
      'Zero split shipments: print on-demand items and merge into the same box as pre-stocked inventory',
      'Industrial dual-platen DTG presses and precision optical vinyl contour cutters on-site',
      'Direct wholesale garment pricing ($4.20 - $5.80/tee) saving $7 to $10+ per printed unit',
      'Same-day printing and dispatch for orders received before 1:00 PM EST'
    ],
    sopHighlight: 'SOP-POD-01: Optical contour calibration + 320°F wash-fast curing inspection'
  },
  {
    id: 'ftz',
    category: 'Bonded Foreign Trade Zone (FTZ)',
    badge: '2-Year Duty Deferral • Micro-Release',
    icon: Anchor,
    title: 'Overseas Containers & High-Value Imported Inventory',
    orderVolume: '1 to 20+ Containers / Year',
    image: '/images/target-heavy-freight.jpg',
    description: 'Container freight imported from China, Europe, or Asia requiring customs duty deferral. Release customs duties incrementally carton-by-carton only as products sell.',
    mega3plFlaw: 'Port customs demand 100% of tariff taxes ($20,000 - $80,000+) upfront upon container arrival, locking up founder cash reserves on unsold inventory.',
    starshipppEdge: [
      'Up to 2-year duty deferral: store imported containers legally outside U.S. customs territory',
      'Carton-by-carton micro-releases: pay customs duties only on the exact units shipped each day',
      'Eliminate upfront cash crunches for seasonal roadshows, new product lines, and flash drops',
      'Zero U.S. duty on Canadian cross-border exports via Ambassador Bridge corridor'
    ],
    sopHighlight: 'SOP-FTZ-02: Bonded intake tally + CBP Form 214/7501 automated micro-clearance'
  },
  {
    id: 'outdoor',
    category: 'Outdoor Furniture & Patio Gear',
    badge: 'High-Cube Storage • Near-Zero Returns',
    icon: Sun,
    title: 'Pre-Assembled Patio Sets, Cushions & Canopy Frames',
    orderVolume: '300 to 2,500 Orders / Month',
    image: '/images/target-outdoor-furniture.jpg',
    description: 'Lightweight aluminum outdoor chairs, commercial patio cushions, and canopy hardware. Bulky cubic volume with high consumer satisfaction and negligible return propensity.',
    mega3plFlaw: 'Mega-3PLs treat bulky outdoor products as warehouse clutter, penalizing cubic storage volume and misplacing multi-carton modular sets.',
    starshipppEdge: [
      'Strict exclusion of assemble-yourself flatpack returns, dedicated to low-return durable gear',
      'Economical bulk pallet racking with cost-effective warehouse floor space designed for high-cube goods',
      'Multi-carton matching barcode scans ensuring cushions and frames ship together',
      'Direct freight dock coordination for LTL replenishment and domestic parcel distribution'
    ],
    sopHighlight: 'SOP-OUT-02: Multi-box parent/child SKU barcode pairing + weather-seal wrap'
  },
  {
    id: 'wheels',
    category: 'Wheels, Rims & Bulky Lifestyle',
    badge: 'Heavy & Bulky Parcels • Multi-SKU',
    icon: Disc,
    title: 'Aftermarket Alloy Wheels, Rims & Hard Cases',
    orderVolume: '400 to 3,000 Orders / Month',
    image: '/images/target-wheels-tires.jpg',
    description: 'Custom forged alloy wheels, wheel-and-tire packages, and oversized equipment hard cases with extensive SKU variants across multiple bolt patterns and finishes.',
    mega3plFlaw: 'Mega-3PL automated sortation belts scratch machined rim faces and drop heavy wheel cartons, triggering costly damage claims and angry enthusiast reviews.',
    starshipppEdge: [
      'Precision face-cushion disc guards and reinforced double-wall corrugated boxing',
      'Open-API WMS with real-time barcode telemetry across 1,000+ complex SKUs',
      'USPS Ground Advantage & FedEx Home Delivery commercial discounted rates',
      'Seamless international shipping capabilities with pre-cleared customs documentation'
    ],
    sopHighlight: 'SOP-RIM-04: Non-scratch felt face wrap + heavy-duty reinforced box strap'
  }
];

export const TargetBrandsShowcase: React.FC<TargetBrandsShowcaseProps> = ({
  onOpenContactModal,
  onOpenTourModal: _onOpenTourModal,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  // Auto rotate carousel every 6.5 seconds unless user is hovering/interacting
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TARGET_PRODUCTS.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const currentItem = TARGET_PRODUCTS[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TARGET_PRODUCTS.length);
    setIsAutoPlaying(false);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TARGET_PRODUCTS.length) % TARGET_PRODUCTS.length);
    setIsAutoPlaying(false);
  };

  return (
    <section
      id="who-we-serve"
      style={{
        paddingTop: '6rem',
        paddingBottom: '6rem',
        backgroundColor: '#070C19',
        borderTop: '1px solid rgba(255, 107, 0, 0.25)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Video: Industrial Warehouse Floor & Pallet Freight Movement */}
      <SectionVideoBackground
        videoUrl="/videos/warehouse-pallet-pull.mp4"
        posterUrl="/images/warehouse-pallet-poster.jpg"
        overlayOpacity={0.78}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ maxWidth: 860, margin: '0 auto 3.5rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.9rem)', marginBottom: '1.25rem', lineHeight: 1.15 }}>
            Burned by the Mega-3PL Giants? <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #FFFFFF 40%, #FF8800 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Starshippp is Built for Your Sweet Spot.
            </span>
          </h2>

          <p style={{ fontSize: '1.15rem', color: '#FFFFFF', fontWeight: 600, lineHeight: 1.6, maxWidth: 760, margin: '0 auto', textShadow: '0 2px 10px rgba(0,0,0,0.85)' }}>
            Starshippp is engineered specifically for brands neglected by mega-warehouses. While multi-billion-dollar fulfillment conglomerates penalize bulky parcels, enforce $1,500 monthly dead fees, and refuse on-demand manufacturing, we provide <strong style={{ color: '#FFFFFF', fontWeight: 800 }}>negotiated 250 DIM relief, in-house print-on-demand, bonded FTZ duty deferrals</strong>, and direct floor access on dedicated Slack channels.
          </p>
        </div>

        {/* Unified Product Showcase Box */}
        <div
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          className="target-showcase-card"
          style={{
            background: 'var(--target-card-bg)',
            border: '1px solid rgba(255, 107, 0, 0.35)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 1px 1px rgba(255, 107, 0, 0.12)',
            position: 'relative',
            transition: 'background 0.25s ease',
          }}
        >
          {/* Integrated Category Tabs Bar Header */}
          <div className="target-showcase-tabs">
            {TARGET_PRODUCTS.map((prod, idx) => {
              const isActive = idx === activeIndex;
              const IconComp = prod.icon;
              return (
                <button
                  key={prod.id}
                  onClick={() => {
                    setActiveIndex(idx);
                    setIsAutoPlaying(false);
                  }}
                  className={`target-tab-btn ${isActive ? 'active' : ''}`}
                  type="button"
                >
                  <div className="target-tab-header">
                    <span className="target-tab-icon">
                      <IconComp size={16} />
                    </span>
                    <span className="target-tab-category">{prod.category}</span>
                  </div>
                  <span className="target-tab-badge">
                    <span className="target-tab-badge-dot" />
                    <span>{prod.badge}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Product Showcase Content Area */}
          <div className="target-showcase-content">
            {/* Left Column: Product Visual with Revolving Controls */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ position: 'relative', overflow: 'hidden', height: 475, border: '1px solid rgba(255,255,255,0.14)', boxShadow: '0 15px 35px rgba(0, 0, 0, 0.7)' }}>
                <img
                  src={currentItem.image}
                  alt={currentItem.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.4s ease',
                  }}
                />
                {/* Product Volume Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    backgroundColor: 'rgba(5, 9, 22, 0.94)',
                    border: '1px solid rgba(255, 107, 0, 0.55)',
                    padding: '0.55rem 0.95rem',
                    fontSize: '0.84rem',
                    fontFamily: 'var(--font-mono)',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                  }}
                >
                  <Box size={15} color="#FFA733" />
                  <span>SWEET SPOT: {currentItem.orderVolume}</span>
                </div>

                {/* SOP Tag at Bottom */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(5, 9, 20, 0.96)',
                    padding: '0.75rem 1.15rem',
                    fontSize: '0.82rem',
                    fontFamily: 'var(--font-mono)',
                    color: '#FFA733',
                    fontWeight: 700,
                    borderTop: '1px solid rgba(255, 107, 0, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 -4px 12px rgba(0,0,0,0.4)',
                  }}
                >
                  <span>{currentItem.sopHighlight}</span>
                  <span style={{ color: '#34D399', fontWeight: 800 }}>STARSHIP VERIFIED</span>
                </div>
              </div>

              {/* Revolving Navigation Dials */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '1.25rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  {TARGET_PRODUCTS.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => {
                        setActiveIndex(dotIdx);
                        setIsAutoPlaying(false);
                      }}
                      style={{
                        width: dotIdx === activeIndex ? 26 : 8,
                        height: 8,
                        backgroundColor: dotIdx === activeIndex ? 'var(--brand-orange)' : 'var(--border-card)',
                        borderRadius: 0,
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                        padding: 0,
                      }}
                      aria-label={`Slide ${dotIdx + 1}`}
                    />
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={handlePrev}
                    className="btn-solid-dark"
                    style={{ width: 38, height: 38, padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                    aria-label="Previous product"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="btn-solid-dark"
                    style={{ width: 38, height: 38, padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                    aria-label="Next product"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              {/* CTAs Placed Directly Below Image & Dials */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '0.75rem',
                  marginTop: '1.25rem',
                  paddingTop: '1.15rem',
                  borderTop: '1px solid var(--border-subtle)',
                }}
              >
                <button
                  onClick={onOpenContactModal}
                  className="btn-primary"
                  style={{
                    padding: '1.15rem 1.6rem',
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.65rem',
                    width: '100%',
                    letterSpacing: '0.01em',
                  }}
                >
                  <Send size={18} />
                  <span>Get a Migration Quote for Your Brand</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Right Column: Contrast vs The Mega-3PLs */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '0.6rem', color: '#FFFFFF', fontWeight: 800 }}>
                  {currentItem.title}
                </h3>

                <p style={{ color: '#FFFFFF', fontSize: '0.98rem', fontWeight: 500, lineHeight: 1.6, marginBottom: '1.25rem', textShadow: '0 1px 2px rgba(0,0,0,0.9)' }}>
                  {currentItem.description}
                </p>

                {/* The Edge: How Starshippp Solves It (GREEN BOX ON TOP) */}
                <div
                  style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid rgba(52, 211, 153, 0.35)',
                    borderLeft: '4px solid #34D399',
                    padding: '0.95rem 1.25rem',
                    marginBottom: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#34D399', fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.45rem' }}>
                    <CheckCircle2 size={16} />
                    <span>The Starshippp Boutique Fulfillment SOP:</span>
                  </div>
                  <div style={{ display: 'grid', gap: '0.4rem' }}>
                    {currentItem.starshipppEdge.map((edge, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem', color: '#FFFFFF', fontWeight: 500, lineHeight: 1.45, textShadow: '0 1px 2px rgba(0,0,0,0.9)' }}>
                        <span style={{ color: '#34D399', fontWeight: 900 }}>✓</span>
                        <span>{edge}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* The Flaw: Why The Big Guys Ruin It (RED BOX BELOW) */}
                <div
                  style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.08)',
                    border: '1px solid rgba(239, 68, 68, 0.35)',
                    borderLeft: '4px solid #EF4444',
                    padding: '0.9rem 1.25rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#F87171', fontWeight: 800, fontSize: '0.88rem', marginBottom: '0.35rem' }}>
                    <XCircle size={15} />
                    <span>The Mega-3PL Experience (ShipBob, Red Stag, Flexport, Amazon):</span>
                  </div>
                  <div style={{ fontSize: '0.88rem', color: '#FECACA', fontWeight: 500, lineHeight: 1.5, textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                    {currentItem.mega3plFlaw}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Callout Pillars: The Complete Starshippp Advantage */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
            marginTop: '3.5rem',
          }}
        >
          {/* Pillar 1 */}
          <div
            className="glass-panel"
            style={{
              padding: '1.75rem',
              backgroundColor: 'rgba(12, 18, 36, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderTop: '3px solid var(--brand-orange)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: 'rgba(255, 107, 0, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--brand-orange)',
                }}
              >
                <MessageSquare size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: 2 }}>Direct Floor Slack & App</h4>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--brand-orange-light)' }}>NO TICKET QUEUES</div>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#FFFFFF', fontWeight: 600, lineHeight: 1.55, textShadow: '0 1px 3px rgba(0,0,0,0.85)' }}>
              Tired of 72-hour email ticket queues with automated bots? Chat directly with our warehouse packing floor leads in dedicated Slack, or use our high-speed mobile app for automated daily payouts and real-time inventory telemetry.
            </p>
          </div>

          {/* Pillar 2 */}
          <div
            className="glass-panel"
            style={{
              padding: '1.75rem',
              backgroundColor: 'rgba(12, 18, 36, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderTop: '3px solid #34D399',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: 'rgba(52, 211, 153, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#34D399',
                }}
              >
                <DollarSign size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: 2 }}>$250 Minimum vs $1,500 Fines</h4>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#34D399' }}>ZERO VOLUME REQUIREMENTS</div>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#FFFFFF', fontWeight: 600, lineHeight: 1.55, textShadow: '0 1px 3px rgba(0,0,0,0.85)' }}>
              Mega-3PLs charge brutal $1,500 to $2,500/month penalties if volume drops. Starshippp welcomes startups and established brands with an honest $250/mo minimum. Even shipping 30 packages/month, you get full enterprise treatment.
            </p>
          </div>

          {/* Pillar 3 */}
          <div
            className="glass-panel"
            style={{
              padding: '1.75rem',
              backgroundColor: 'rgba(12, 18, 36, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderTop: '3px solid #FFA733',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: 'rgba(255, 167, 51, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFA733',
                }}
              >
                <Printer size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: 2 }}>In-House POD & Packaging</h4>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#FFA733' }}>WAY BETTER THAN PRINTFUL</div>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#FFFFFF', fontWeight: 600, lineHeight: 1.55, textShadow: '0 1px 3px rgba(0,0,0,0.85)' }}>
              On-demand t-shirts, outdoor stickers, and custom unboxing made directly in our Pontiac facility. Print, cure, and consolidate with stocked goods in 1 box with zero split-shipping fees and wholesale blank costs.
            </p>
          </div>

          {/* Pillar 4 */}
          <div
            className="glass-panel"
            style={{
              padding: '1.75rem',
              backgroundColor: 'rgba(12, 18, 36, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderTop: '3px solid #38BDF8',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: 'rgba(56, 189, 248, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#38BDF8',
                }}
              >
                <Anchor size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: 2 }}>Bonded FTZ Customs Deferral</h4>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#38BDF8' }}>MICRO-RELEASE DUTY PER CARTON</div>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#FFFFFF', fontWeight: 600, lineHeight: 1.55, textShadow: '0 1px 3px rgba(0,0,0,0.85)' }}>
              Import containers duty-free for up to 2 years in our Michigan FTZ zone. Pay customs tariffs incrementally carton-by-carton or pallet-by-pallet only as orders sell, preserving tens of thousands in operating cash.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

