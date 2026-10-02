import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  CheckCircle2, 
  DollarSign, 
  Package, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  Zap, 
  Truck, 
  MessageSquare,
  Activity,
  Bell
} from 'lucide-react';

interface StarshipPhoneMockupProps {
  onOpenContactModal?: () => void;
}

export const StarshipPhoneMockup: React.FC<StarshipPhoneMockupProps> = ({
  onOpenContactModal,
}) => {
  const [activeTab, setActiveTab] = useState<'payouts' | 'dispatch' | 'slack'>('payouts');

  return (
    <div
      className="starship-phone-wrapper"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 380,
        margin: '0 auto',
      }}
    >
      {/* Ambient Sci-Fi Zero-G Glow Behind Phone */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          right: '10%',
          bottom: '15%',
          background: 'radial-gradient(circle, rgba(255, 107, 0, 0.35) 0%, rgba(0, 229, 255, 0.15) 50%, transparent 75%)',
          filter: 'blur(45px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Floating Glass Satellite Badge: Real-time Payout (Top Right) */}
      <div
        className="satellite-badge-payout"
        style={{
          position: 'absolute',
          top: '-12px',
          right: '-24px',
          zIndex: 10,
          background: 'rgba(9, 14, 29, 0.94)',
          border: '1px solid rgba(52, 211, 153, 0.45)',
          borderRadius: '12px',
          padding: '0.65rem 0.95rem',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.7), 0 0 15px rgba(52, 211, 153, 0.25)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          animation: 'floatBadge1 5s ease-in-out infinite',
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            backgroundColor: 'rgba(52, 211, 153, 0.15)',
            border: '1px solid rgba(52, 211, 153, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#34D399',
          }}
        >
          <DollarSign size={18} />
        </div>
        <div>
          <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Auto-Deposited
          </div>
          <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            +$18,450.00
            <span style={{ fontSize: '0.68rem', color: '#34D399', fontWeight: 700 }}>✓ Cleared</span>
          </div>
        </div>
      </div>

      {/* Floating Glass Satellite Badge: Zero DIM Surcharges (Bottom Left) */}
      <div
        className="satellite-badge-dim"
        style={{
          position: 'absolute',
          bottom: '36px',
          left: '-32px',
          zIndex: 10,
          background: 'rgba(9, 14, 29, 0.94)',
          border: '1px solid rgba(255, 107, 0, 0.45)',
          borderRadius: '12px',
          padding: '0.65rem 0.95rem',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.7), 0 0 15px rgba(255, 107, 0, 0.25)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          animation: 'floatBadge2 6s ease-in-out infinite 1s',
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 107, 0, 0.15)',
            border: '1px solid rgba(255, 107, 0, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFA733',
          }}
        >
          <ShieldCheck size={18} />
        </div>
        <div>
          <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: '#FFA733', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Carrier DIM Arbitrage
          </div>
          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FFFFFF' }}>
            $4,290 Saved Today
          </div>
        </div>
      </div>

      {/* Titanium iPhone 16 Pro Hardware Chassis */}
      <div
        style={{
          position: 'relative',
          borderRadius: 48,
          padding: 10,
          background: 'linear-gradient(145deg, #2D3748 0%, #1A202C 40%, #0F172A 100%)',
          boxShadow: `
            0 25px 60px -10px rgba(0, 0, 0, 0.95),
            0 0 0 1px rgba(255, 255, 255, 0.15),
            0 0 35px rgba(255, 107, 0, 0.25),
            inset 0 0 3px rgba(255, 255, 255, 0.35)
          `,
          zIndex: 1,
        }}
      >
        {/* Screen Bezel & OLED Display */}
        <div
          style={{
            borderRadius: 38,
            overflow: 'hidden',
            backgroundColor: '#050811',
            border: '2px solid #0B0F19',
            position: 'relative',
            color: '#FFFFFF',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {/* iOS Dynamic Island & Status Bar */}
          <div
            style={{
              padding: '0.65rem 1.25rem 0.4rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.72rem',
              fontWeight: 700,
              color: '#FFFFFF',
              position: 'relative',
              zIndex: 5,
            }}
          >
            <span>9:41</span>

            {/* Dynamic Island Pill with Starship Live Radar */}
            <div
              style={{
                width: 96,
                height: 24,
                backgroundColor: '#000000',
                borderRadius: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 0.5rem',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: '#34D399',
                    boxShadow: '0 0 6px #34D399',
                    display: 'inline-block',
                  }}
                />
                <span style={{ fontSize: '0.58rem', fontFamily: 'var(--font-mono)', color: '#34D399', fontWeight: 800 }}>LIVE</span>
              </div>
              <Sparkles size={11} color="#FF8800" />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.68rem', opacity: 0.85 }}>
              <span>5G</span>
              <span style={{ fontSize: '0.65rem' }}>100%</span>
            </div>
          </div>

          {/* App Header Navigation */}
          <div
            style={{
              padding: '0.6rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              backgroundColor: 'rgba(9, 14, 29, 0.7)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <img
                src="/images/starshippp-rocket-logo.png"
                alt="Starship App"
                style={{ height: 24, width: 'auto', objectFit: 'contain' }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div
                style={{
                  padding: '0.2rem 0.5rem',
                  borderRadius: 4,
                  backgroundColor: 'rgba(52, 211, 153, 0.12)',
                  border: '1px solid rgba(52, 211, 153, 0.3)',
                  fontSize: '0.6rem',
                  color: '#34D399',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                <Activity size={10} />
                <span>CENTRAL HUB</span>
              </div>
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 107, 0, 0.2)',
                  border: '1px solid rgba(255, 107, 0, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFA733',
                  position: 'relative',
                }}
              >
                <Bell size={12} />
                <span
                  style={{
                    position: 'absolute',
                    top: 1,
                    right: 1,
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    backgroundColor: '#FF3B30',
                  }}
                />
              </div>
            </div>
          </div>

          {/* App Body Content */}
          <div style={{ padding: '0.85rem 1rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>

            {/* Quick Interactive View Switcher */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                padding: 3,
                borderRadius: 8,
                fontSize: '0.68rem',
                fontWeight: 700,
                textAlign: 'center',
              }}
            >
              <button
                onClick={() => setActiveTab('payouts')}
                style={{
                  padding: '0.35rem 0',
                  borderRadius: 6,
                  backgroundColor: activeTab === 'payouts' ? '#FF6B00' : 'transparent',
                  color: activeTab === 'payouts' ? '#FFFFFF' : 'var(--text-secondary)',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 800,
                  transition: 'all 0.2s ease',
                }}
              >
                Payouts
              </button>
              <button
                onClick={() => setActiveTab('dispatch')}
                style={{
                  padding: '0.35rem 0',
                  borderRadius: 6,
                  backgroundColor: activeTab === 'dispatch' ? '#FF6B00' : 'transparent',
                  color: activeTab === 'dispatch' ? '#FFFFFF' : 'var(--text-secondary)',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 800,
                  transition: 'all 0.2s ease',
                }}
              >
                Live Orders
              </button>
              <button
                onClick={() => setActiveTab('slack')}
                style={{
                  padding: '0.35rem 0',
                  borderRadius: 6,
                  backgroundColor: activeTab === 'slack' ? '#FF6B00' : 'transparent',
                  color: activeTab === 'slack' ? '#FFFFFF' : 'var(--text-secondary)',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 800,
                  transition: 'all 0.2s ease',
                }}
              >
                Floor Slack
              </button>
            </div>

            {/* HERO CARD 1: Automated Instant Payouts ("They Just Get Paid") */}
            {activeTab === 'payouts' && (
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(14, 22, 44, 0.95) 0%, rgba(9, 14, 29, 0.98) 100%)',
                  border: '1px solid rgba(255, 107, 0, 0.35)',
                  borderRadius: 14,
                  padding: '1rem',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: 70,
                    height: 70,
                    background: 'radial-gradient(circle, rgba(255, 107, 0, 0.25) 0%, transparent 70%)',
                    borderRadius: '50%',
                  }}
                />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: '#FFA733', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Net Merchant Balance
                  </span>
                  <span style={{ fontSize: '0.62rem', color: '#34D399', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <TrendingUp size={11} /> +32.4% vs last week
                  </span>
                </div>

                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '0.6rem' }}>
                  $48,920<span style={{ color: '#FFA733', fontSize: '1.2rem' }}>.80</span>
                </div>

                <div
                  style={{
                    backgroundColor: 'rgba(52, 211, 153, 0.1)',
                    border: '1px solid rgba(52, 211, 153, 0.25)',
                    borderRadius: 8,
                    padding: '0.45rem 0.65rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <CheckCircle2 size={13} color="#34D399" />
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#FFFFFF' }}>Next Auto-Payout: 4:00 PM Today</span>
                  </div>
                  <span style={{ fontSize: '0.64rem', fontFamily: 'var(--font-mono)', color: '#34D399', fontWeight: 700 }}>$18,450.00</span>
                </div>
              </div>
            )}

            {/* HERO CARD 2: Live Warehouse Orders & DIM Savings */}
            {activeTab === 'dispatch' && (
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(14, 22, 44, 0.95) 0%, rgba(9, 14, 29, 0.98) 100%)',
                  border: '1px solid rgba(56, 189, 248, 0.35)',
                  borderRadius: 14,
                  padding: '1rem',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: '#38BDF8', textTransform: 'uppercase' }}>
                    Floor Dispatch Feed
                  </span>
                  <span style={{ fontSize: '0.62rem', color: '#34D399', fontWeight: 700 }}>● 382/382 Shipped</span>
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#FFFFFF', marginBottom: '0.5rem' }}>
                  Zero DIM Penalties
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94A3B8', lineHeight: 1.4 }}>
                  Negotiated Tier-1 DIM factor applied to all FedEx & USPS Ground parcels over 18x14x12".
                </div>
              </div>
            )}

            {/* HERO CARD 3: Direct Floor Slack Access */}
            {activeTab === 'slack' && (
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(14, 22, 44, 0.95) 0%, rgba(9, 14, 29, 0.98) 100%)',
                  border: '1px solid rgba(255, 107, 0, 0.35)',
                  borderRadius: 14,
                  padding: '1rem',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.45rem' }}>
                  <MessageSquare size={13} color="#FFA733" />
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#FFFFFF' }}>#starshippp-ops-floor</span>
                </div>
                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    borderLeft: '2px solid #FF8800',
                    padding: '0.5rem 0.65rem',
                    borderRadius: '0 6px 6px 0',
                    fontSize: '0.72rem',
                    color: '#E2E8F0',
                  }}
                >
                  <strong style={{ color: '#FFA733' }}>Aurelien (Floor Lead):</strong> "Your custom luxury wax seals arrived! We have packed 140 bespoke gift sets for today's cutoff."
                </div>
              </div>
            )}

            {/* Live Order Micro-Queue Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <div
                style={{
                  fontSize: '0.64rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#94A3B8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span>Recent Live Shipments</span>
                <span style={{ color: '#38BDF8', cursor: 'pointer' }}>View All →</span>
              </div>

              {/* Order 1: Oversized Auto Panel */}
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 10,
                  padding: '0.55rem 0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      backgroundColor: 'rgba(255, 107, 0, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFA733',
                    }}
                  >
                    <Package size={14} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#FFFFFF' }}>Order #ST-9842</div>
                    <div style={{ fontSize: '0.62rem', color: '#94A3B8' }}>Carbon Fiber Spoiler (Bulky)</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '0.15rem 0.4rem',
                      borderRadius: 4,
                      backgroundColor: 'rgba(52, 211, 153, 0.15)',
                      color: '#34D399',
                      fontSize: '0.6rem',
                      fontWeight: 800,
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    DISPATCHED
                  </span>
                  <div style={{ fontSize: '0.62rem', color: '#38BDF8', marginTop: 2 }}>Saved $24.80 DIM</div>
                </div>
              </div>

              {/* Order 2: Custom Unboxing Skincare */}
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 10,
                  padding: '0.55rem 0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      backgroundColor: 'rgba(56, 189, 248, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#38BDF8',
                    }}
                  >
                    <Truck size={14} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#FFFFFF' }}>Order #ST-9841</div>
                    <div style={{ fontSize: '0.62rem', color: '#94A3B8' }}>Luxury Serum Kit (Custom Box)</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '0.15rem 0.4rem',
                      borderRadius: 4,
                      backgroundColor: 'rgba(52, 211, 153, 0.15)',
                      color: '#34D399',
                      fontSize: '0.6rem',
                      fontWeight: 800,
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    DELIVERED
                  </span>
                  <div style={{ fontSize: '0.62rem', color: '#94A3B8', marginTop: 2 }}>Hand-packed</div>
                </div>
              </div>
            </div>

            {/* Quick Action Button: Launch Quote / Join Floor */}
            <button
              onClick={onOpenContactModal}
              style={{
                width: '100%',
                padding: '0.65rem 0',
                borderRadius: 8,
                background: 'linear-gradient(135deg, #FF6B00 0%, #FF8800 100%)',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 800,
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem',
                boxShadow: '0 4px 14px rgba(255, 107, 0, 0.4)',
                marginTop: '0.2rem',
                transition: 'transform 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <span>Connect Your Store & Get Paid</span>
              <ArrowUpRight size={14} />
            </button>
          </div>

          {/* iOS Bottom Navigation Bar */}
          <div
            style={{
              padding: '0.5rem 1.5rem 0.8rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              backgroundColor: 'rgba(9, 14, 29, 0.95)',
              fontSize: '0.6rem',
              color: 'var(--text-secondary)',
            }}
          >
            <div style={{ color: '#FF8800', textAlign: 'center', fontWeight: 700 }}>
              <Zap size={14} style={{ margin: '0 auto 2px' }} />
              <span>Overview</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Package size={14} style={{ margin: '0 auto 2px' }} />
              <span>Inventory</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <DollarSign size={14} style={{ margin: '0 auto 2px' }} />
              <span>Payouts</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <MessageSquare size={14} style={{ margin: '0 auto 2px' }} />
              <span>Floor Slack</span>
            </div>
          </div>

          {/* iOS Home Indicator Bar */}
          <div
            style={{
              width: 100,
              height: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.35)',
              borderRadius: 2,
              margin: '0 auto 6px',
            }}
          />
        </div>
      </div>
    </div>
  );
};
