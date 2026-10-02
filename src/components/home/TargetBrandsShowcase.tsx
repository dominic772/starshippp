import React, { useState, useEffect } from 'react';
import { SectionVideoBackground } from '../video/SectionVideoBackground';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  MessageSquare, 
  DollarSign, 
  Box, 
  Zap, 
  ChevronLeft, 
  ChevronRight,
  Send,
  Wrench,
  Shield,
  Sun,
  Disc,
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
      'Aggressive negotiated carrier DIM factor delivering 35% to 55% postage savings',
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
      'Cost-effective storage accommodating 5,000 to 10,000+ sq ft automotive inventories',
      'Carrier trailer direct-load for FedEx Home Delivery & USPS Ground Advantage',
      'Experienced warehouse team familiar with automotive fitment and complex SKU lists'
    ],
    sopHighlight: 'SOP-AERO-03: Full-perimeter foam rail block + carbon weave surface barrier'
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

  // Auto rotate carousel every 6 seconds unless user is hovering/interacting
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
            Starshippp is built specifically for brands neglected by mega-warehouses. While multi-billion-dollar fulfillment conglomerates are engineered for 50,000-order commodity accounts, brands shipping <strong style={{ color: '#FFFFFF', fontWeight: 800 }}>300 to 3,000 orders/month</strong> get relegated to offshore ticket queues, punitive idle fees, and careless packaging. With our mobile app and dedicated Slack floor channels, you get direct VIP access and radical transparency every day.
          </p>
        </div>

        {/* Unified Product Showcase Box (Merged Category Navigation + Active Detail in One Box) */}
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

        {/* 3 Callout Pillars: Why Brands Fire Mega-3PLs & Move to Starshippp */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
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
                <h4 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: 2 }}>App or Slack: Zero Ticket Queues</h4>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--brand-orange-light)' }}>YOUR CHOICE OF COMMUNICATION</div>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#FFFFFF', fontWeight: 600, lineHeight: 1.55, textShadow: '0 1px 3px rgba(0,0,0,0.85)' }}>
              Tired of 72-hour email ticket queues with automated bots? Choose how you stay connected. Use our mobile app for automated daily payouts and real-time order tracking, or hop into a shared Slack channel directly with our warehouse packing floor leads. Need to hold an order or swap an SKU? Ping us and get a confirmation photo in minutes.
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
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#34D399' }}>FAIR & TRANSPARENT</div>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#FFFFFF', fontWeight: 600, lineHeight: 1.55, textShadow: '0 1px 3px rgba(0,0,0,0.85)' }}>
              Mega-3PLs charge brutal $1,500 to $2,500/month "minimum spend" penalties if order volume dips. Starshippp has an accessible $250/mo minimum account commitment. We are fair partners who ensure your inventory is protected without extractive idle fees.
            </p>
          </div>

          {/* Pillar 3 */}
          <div
            className="glass-panel"
            style={{
              padding: '1.75rem',
              backgroundColor: 'rgba(12, 18, 36, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderTop: '3px solid var(--status-cyan)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: 'rgba(0, 240, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--status-cyan)',
                }}
              >
                <Zap size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: 2 }}>Negotiated Carrier DIM Relief</h4>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--status-cyan)' }}>CRUSH DIMENSIONAL RATES</div>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#FFFFFF', fontWeight: 600, lineHeight: 1.55, textShadow: '0 1px 3px rgba(0,0,0,0.85)' }}>
              Shipping big boxes doesn’t have to bankrupt your margins. We’ve negotiated Tier-1 carrier DIM divisors with USPS Ground Advantage and FedEx Home Delivery, cutting billable weight on bulky lightweight goods by up to 55%. Premium custom packaging and kitting are also available on demand.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
