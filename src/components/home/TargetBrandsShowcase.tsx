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
  Sparkles,
  Shirt,
  Crown,
  Flame,
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
    id: 'skincare',
    category: 'Cosmetics & Skincare',
    badge: 'Fragile Glass & Serums',
    icon: Sparkles,
    title: 'Clean Beauty & Amber Glass Unboxing',
    orderVolume: '300 to 2,500 Orders / Month',
    image: '/images/target-skincare-unboxing.jpg',
    description: 'Boutique organic skincare, delicate serum droppers, and facial crèmes requiring climate-monitored storage, batch lot tracking, and zero-breakage cushioning.',
    mega3plFlaw: 'Mega-3PLs toss glass bottles into oversized brown boxes with a single deflated air pillow, leading to a 4.2% breakage rate, customer refunds, and a $1.25/unit "fragile surcharge".',
    starshipppEdge: [
      'Snug corrugated mailers nested with custom zig-zag crinkle paper bed',
      'Batch lot & expiration date scanning for 100% FDA compliance',
      'Printed brand insert & thank-you note placed precisely on top of contents',
      'Zero broken glass guarantee with precision bubble wrap wraps'
    ],
    sopHighlight: 'SOP-CS-04: Dual-point dropper seal inspection + cushioned mailer nesting'
  },
  {
    id: 'apparel',
    category: 'Apparel & Streetwear',
    badge: 'Multi-SKU & Drops',
    icon: Shirt,
    title: 'Curated Streetwear & High-End Fashion',
    orderVolume: '400 to 3,000 Orders / Month',
    image: '/images/target-apparel-packaging.jpg',
    description: 'Designer hoodies, cut-and-sew tees, and capsule collections requiring precise variant barcode verification, garment steaming, and premium presentation.',
    mega3plFlaw: 'Mega-3PLs stuff garments into flimsy grey polybags wrinkled and uninspected. Barcode misses cause 12% wrong-size dispatch errors that ruin customer trust.',
    starshipppEdge: [
      'Crisp fold & slide into premium frosted matte zip-lock polybags',
      'Double optical barcode scan (Hangtag + SKU polybag label) on every unit',
      'Branded vinyl sticker pack and lookbook card carefully staged on top',
      'Same-day returns inspection, re-folding, and inventory restock'
    ],
    sopHighlight: 'SOP-AP-02: Precision fold to 12x15" footprint + sticker bundle inclusion'
  },
  {
    id: 'unboxing',
    category: 'Custom Luxury Goods',
    badge: 'Wax Seals & Tissue Wrap',
    icon: Crown,
    title: 'Artisan Goods & High-AOV Keepsakes',
    orderVolume: '300 to 1,800 Orders / Month',
    image: '/images/target-luxury-waxseal.jpg',
    description: 'Artisan leather goods, hand-poured luxury candles, and personalized artisan gifts where the packaging is the product.',
    mega3plFlaw: 'Mega-3PLs outright refuse custom unboxing SOPs, or charge an exorbitant $2.50+ fee only to haphazardly smash tissue paper and miss personalized inserts.',
    starshipppEdge: [
      'Custom burnt orange tissue wrap hand-folded with crisp geometric creases',
      'Embossed metallic gold wax seal stamp applied to each gift envelope',
      'Personalized handwritten/printed calligraphic recipient cards inserted',
      'White-glove placement: every unboxing looks like an influencer PR package'
    ],
    sopHighlight: 'SOP-LUX-09: Embossed wax seal alignment + tissue origami fold'
  },
  {
    id: 'tiktok',
    category: 'TikTok Shop & Viral DTC',
    badge: '24-Hour Dispatch SLA',
    icon: Flame,
    title: 'Fast-Paced Social Commerce & Tumblers',
    orderVolume: '500 to 3,000 Orders / Month',
    image: '/images/target-tiktok-viral.jpg',
    description: 'Trendy insulated drinkware, viral creator accessories, and lifestyle drops experiencing dramatic flash-sale volume spikes.',
    mega3plFlaw: 'Mega-3PLs take 48 to 72 hours just to acknowledge sudden flash-sale spikes, triggering immediate TikTok Shop Late Dispatch Rate (LDR) violations and account bans.',
    starshipppEdge: [
      'Same-day 1:00 PM EST fulfillment guarantee synchronized to TikTok Shop API',
      'Vibrant branded box tape, bubble-sleeve tumbler protection, and QR review inserts',
      'Elastic burst capacity: we scale up pickers instantly during viral weekend spikes',
      'Zero penalties for order spikes or post-drop volume fluctuations'
    ],
    sopHighlight: 'SOP-TTS-01: Auto-ingest orders via webhook + 24hr carrier dock dispatch'
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
            Starshippp is built specifically for brands neglected by mega-warehouses. While multi-billion-dollar fulfillment conglomerates are engineered for 50,000-order commodity accounts, brands shipping <strong style={{ color: '#FFFFFF', fontWeight: 800 }}>300 to 3,000 orders/month</strong> get relegated to offshore ticket queues, punitive idle fees, and careless packaging. In Pontiac, Michigan, you are our VIP tier.
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
              <div style={{ position: 'relative', overflow: 'hidden', height: 380, border: '1px solid rgba(255,255,255,0.1)' }}>
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
                    top: 14,
                    left: 14,
                    backgroundColor: 'rgba(5, 9, 22, 0.94)',
                    border: '1px solid rgba(255, 107, 0, 0.5)',
                    padding: '0.45rem 0.85rem',
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-mono)',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                  }}
                >
                  <Box size={13} color="#FFA733" />
                  <span>SWEET SPOT: {currentItem.orderVolume}</span>
                </div>

                {/* SOP Tag at Bottom */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(5, 9, 20, 0.95)',
                    padding: '0.6rem 1rem',
                    fontSize: '0.74rem',
                    fontFamily: 'var(--font-mono)',
                    color: '#FFA733',
                    fontWeight: 600,
                    borderTop: '1px solid rgba(255, 107, 0, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{currentItem.sopHighlight}</span>
                  <span style={{ color: '#34D399', fontWeight: 800 }}>PONTIAC VERIFIED</span>
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
                <h4 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: 2 }}>Direct Slack vs Ticket #49281</h4>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--brand-orange-light)' }}>NO CALL-CENTERS</div>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#FFFFFF', fontWeight: 600, lineHeight: 1.55, textShadow: '0 1px 3px rgba(0,0,0,0.85)' }}>
              Tired of 72-hour email ticket queues with automated bots? Starshippp puts your team in a shared Slack channel directly with our warehouse floor leads in Pontiac. Need to hold an order or swap an SKU? Ping us and get a confirmation photo in minutes.
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
                <h4 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: 2 }}>$0 Penalties vs $1,500 Fines</h4>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#34D399' }}>ZERO MINIMUM PENALTIES</div>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#FFFFFF', fontWeight: 600, lineHeight: 1.55, textShadow: '0 1px 3px rgba(0,0,0,0.85)' }}>
              Mega-3PLs charge brutal $1,500/month "minimum spend" penalties if your monthly order count dips. Starshippp has $0 monthly minimums. Grow at your own cadence, navigate seasonal valleys, and never pay a penalty for shipping fewer units.
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
                <h4 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: 2 }}>High-Touch Custom Unboxing</h4>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--status-cyan)' }}>CUSTOM UNBOXING SOPS</div>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#FFFFFF', fontWeight: 600, lineHeight: 1.55, textShadow: '0 1px 3px rgba(0,0,0,0.85)' }}>
              Your brand is not an Amazon brown box. We follow your custom unboxing manual to the millimeter: stamped wax seals, crisp tissue folds, sticker packs, and handwritten cards. Turn every delivery into an organic unboxing video for TikTok & Instagram.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
