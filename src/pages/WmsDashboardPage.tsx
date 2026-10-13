import React, { useState } from 'react';
import { 
  Box, 
  Printer, 
  Anchor, 
  CreditCard, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Zap, 
  Plus, 
  ShieldCheck
} from 'lucide-react';
import { StarshipppLogo } from '../components/ui/StarshipppLogo';
import { DimEngine } from '../services/dimEngine';
import { BillingEngine } from '../services/billingEngine';
import { FtzEngine } from '../services/ftzEngine';
import { PodEngine } from '../services/podEngine';

interface WmsDashboardPageProps {
  onBackToWebsite: () => void;
}

type UserRole = 'merchant' | 'floor' | 'executive';

interface OrderItem {
  id: string;
  orderNumber: string;
  customerName: string;
  sku: string;
  itemDescription: string;
  dimensions: { l: number; w: number; h: number; weight: number };
  podRequired: boolean;
  ftzBonded: boolean;
  status: 'PENDING_PICK' | 'PROCESSING_POD' | 'PACKED_READY' | 'DISPATCHED';
  carrierTracking?: string;
  postageCost?: number;
  savingsUsd?: number;
}

export const WmsDashboardPage: React.FC<WmsDashboardPageProps> = ({ onBackToWebsite }) => {
  const [role, setRole] = useState<UserRole>('merchant');
  const [activeTab, setActiveTab] = useState<'orders' | 'dim' | 'pod' | 'ftz' | 'wallet' | 'sprint'>('orders');

  // Interactive Live State
  const [walletBalance, setWalletBalance] = useState<number>(1420.50);
  const [autoRechargeTriggered, setAutoRechargeTriggered] = useState<boolean>(false);
  const [ftzDeferredBalance, setFtzDeferredBalance] = useState<number>(92862.50);
  const [ftzCartonsRemaining, setFtzCartonsRemaining] = useState<number>(1150);
  const [totalArbitrageSaved, setTotalArbitrageSaved] = useState<number>(1894.20);
  const [notification, setNotification] = useState<string | null>(null);

  // Orders State
  const [orders, setOrders] = useState<OrderItem[]>([
    {
      id: 'ord_1',
      orderNumber: 'NH-98421',
      customerName: 'Marcus Vance (Phoenix, AZ)',
      sku: 'NH-FAIRING-GLOSS-BLK',
      itemDescription: 'Batwing Outer Fairing Kit (Bulky Lightweight)',
      dimensions: { l: 28, w: 22, h: 14, weight: 4.2 },
      podRequired: false,
      ftzBonded: true,
      status: 'PENDING_PICK'
    },
    {
      id: 'ord_2',
      orderNumber: 'NH-98422',
      customerName: 'Devon Miller (Austin, TX)',
      sku: 'NH-HOODIE-SKULL-XL',
      itemDescription: 'Comfort Colors 1717 Heavyweight DTG Hoodie (Black, XL)',
      dimensions: { l: 14, w: 12, h: 4, weight: 1.8 },
      podRequired: true,
      ftzBonded: false,
      status: 'PROCESSING_POD'
    },
    {
      id: 'ord_3',
      orderNumber: 'NH-98423',
      customerName: 'Chloe Bennett (Denver, CO)',
      sku: 'NH-EXHAUST-HEAT-SHIELD',
      itemDescription: 'Dual Curved Header Shields (Cantilever Oversize)',
      dimensions: { l: 34, w: 10, h: 8, weight: 5.5 },
      podRequired: false,
      ftzBonded: true,
      status: 'PENDING_PICK'
    },
    {
      id: 'ord_4',
      orderNumber: 'NH-98418',
      customerName: 'Travis Scott (Miami, FL)',
      sku: 'NH-SADDLEBAG-LIDS-PR',
      itemDescription: 'Stretched Hard Bag Lids (Pair)',
      dimensions: { l: 26, w: 16, h: 12, weight: 6.0 },
      podRequired: false,
      ftzBonded: true,
      status: 'DISPATCHED',
      carrierTracking: 'STARSHIP-USPS-9400109202381029381',
      postageCost: 24.80,
      savingsUsd: 18.25
    }
  ]);

  // POD Print Queue State
  const [podJobs, setPodJobs] = useState<any[]>([
    {
      id: 'pod_8102',
      garment: 'Comfort Colors 1717 (Pepper, XL)',
      artwork: 'NH Skull & Pistons Front Chest + Full Back',
      status: 'PRINTING_BROTHER_GTX_01',
      progress: 68,
      inHouseCost: 5.80,
      printfulCost: 13.95,
      savings: 8.15
    },
    {
      id: 'pod_8103',
      garment: 'Bella+Canvas 3001 (Dark Grey, L)',
      artwork: 'Starshippp Speed Logo Left Chest',
      status: 'QUEUED',
      progress: 0,
      inHouseCost: 5.80,
      printfulCost: 13.95,
      savings: 8.15
    },
    {
      id: 'pod_8104',
      garment: 'Die-Cut Vinyl Decal (3x3 Gloss)',
      artwork: 'High-Tack Motorcycle Helmet Decal Pack (5ct)',
      status: 'CONVEYOR_CURING',
      progress: 92,
      inHouseCost: 0.28,
      printfulCost: 1.65,
      savings: 1.37
    }
  ]);

  // Live DIM Calculator Playground State
  const [dimInput, setDimInput] = useState({ length: 28, width: 22, height: 14, scaleWeight: 4.2 });
  const liveDimResult = DimEngine.calculate({
    lengthInches: dimInput.length,
    widthInches: dimInput.width,
    heightInches: dimInput.height,
    scaleWeightLbs: dimInput.scaleWeight
  });

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // Handler: Dispatch Order with DIM Arbitrage
  const handleDispatchOrder = (orderId: string) => {
    const targetOrder = orders.find(o => o.id === orderId);
    if (!targetOrder) return;

    const calc = DimEngine.calculate({
      lengthInches: targetOrder.dimensions.l,
      widthInches: targetOrder.dimensions.w,
      heightInches: targetOrder.dimensions.h,
      scaleWeightLbs: targetOrder.dimensions.weight
    });

    const pickPack = BillingEngine.calculatePickPack({ unitsCount: 1, skusCount: 1 });
    const postage = Number((calc.arbitrage.starshipppCommercialCostUsd + pickPack.totalFulfillmentFee).toFixed(2));
    const savings = calc.arbitrage.netSavingsUsd;

    // Deduct from wallet
    const newBal = Number((walletBalance - postage).toFixed(2));
    setWalletBalance(newBal);
    setTotalArbitrageSaved(prev => Number((prev + savings).toFixed(2)));

    // Update order
    const tracking = `STARSHIP-USPS-${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    setOrders(prev => prev.map(o => o.id === orderId ? {
      ...o,
      status: 'DISPATCHED',
      carrierTracking: tracking,
      postageCost: postage,
      savingsUsd: savings
    } : o));

    showToast(`🚀 Dispatched ${targetOrder.orderNumber}! Divisor 250 saved $${savings.toFixed(2)} in billable postage. Tracking: ${tracking}`);

    // Auto recharge check
    if (newBal < 200) {
      setTimeout(() => {
        setAutoRechargeTriggered(true);
        setWalletBalance(b => Number((b + 1000).toFixed(2)));
        showToast('⚡ AUTO-RECHARGE TRIGGERED: Wallet dropped below $200 threshold. Placed $1,000 ACH replenishment via Stripe Connect.');
      }, 1200);
    }
  };

  // Handler: Queue POD Job
  const handleQueuePodJob = () => {
    const arbitrage = PodEngine.calculateCostArbitrage('DTG_APPAREL');
    const newJob = {
      id: `pod_${Math.floor(1000 + Math.random() * 9000)}`,
      garment: 'Comfort Colors 1717 (Vintage Black, L)',
      artwork: 'Custom High-Res DTG Direct Print',
      status: 'QUEUED',
      progress: 0,
      inHouseCost: arbitrage.starshipppInHouseCostUsd,
      printfulCost: arbitrage.printfulBrokerCostUsd,
      savings: arbitrage.netMarginSavingsPerUnitUsd
    };
    setPodJobs(prev => [newJob, ...prev]);
    showToast('🖨️ Queued new DTG print job straight to Brother GTX Pro on Pontiac warehouse floor. Zero transit days to pack bench.');
  };

  // Handler: Trigger FTZ Micro-Release
  const handleFtzMicroRelease = () => {
    if (ftzCartonsRemaining < 25) {
      showToast('⚠️ Insufficient bonded cartons remaining.');
      return;
    }
    const dummyState = FtzEngine.admitContainer({
      merchantId: 'merch_nasty_hawgs_01',
      containerNumber: 'MSCU7829104',
      sealNumber: 'SL-994821',
      bolNumber: 'MEDU88219034',
      portOfEntry: 'Port of Detroit / Subzone 70',
      totalCartons: 1200,
      unitsPerCarton: 4,
      declaredValueUsd: 340000.00,
      htsCode: '8714.10.0050',
      dutyRatePercent: 28.5,
      merchandiseDescription: 'Motorcycle parts'
    });
    const { releaseResult } = FtzEngine.executeMicroRelease(dummyState, {
      containerId: dummyState.containerId,
      merchantId: dummyState.merchantId,
      cartonsToRelease: 25,
      authorizedOfficer: 'Customs Officer #412'
    }, 28.5, 4);
    const dutySettled = releaseResult.cbp7501DutyPayableUsd;
    setFtzCartonsRemaining(c => c - 25);
    setFtzDeferredBalance(d => Number((d - dutySettled).toFixed(2)));
    showToast(`🚢 CBP Form 7501 Micro-Release Approved! Released 25 cartons. Settled $${dutySettled.toFixed(2)} duty. Remaining container reserve: $${(ftzDeferredBalance - dutySettled).toFixed(2)}.`);
  };

  // Handler: Simulate Wallet Auto Recharge
  const handleSimulateWalletDrain = () => {
    setWalletBalance(185.20);
    showToast('⚠️ Simulated heavy order dispatch: Wallet balance dropped to $185.20 (< $200 threshold).');
    setTimeout(() => {
      setAutoRechargeTriggered(true);
      setWalletBalance(1185.20);
      showToast('✅ Automated Stripe ACH Replenishment Executed: +$1,000.00 deposited. Merchant operations uninterrupted.');
    }, 1200);
  };

  return (
    <div style={{ backgroundColor: '#050811', minHeight: '100vh', color: '#F8FAFC', paddingBottom: '4rem' }}>
      {/* Toast Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          backgroundColor: '#0F172A',
          border: '1px solid #FF6B00',
          boxShadow: '0 10px 30px rgba(255, 107, 0, 0.35)',
          padding: '1rem 1.5rem',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          maxWidth: '480px',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <Zap size={20} color="#FF6B00" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: '0.9rem', color: '#F1F5F9', lineHeight: 1.4 }}>{notification}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <div style={{
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        backgroundColor: 'rgba(5, 8, 17, 0.95)',
        backdropFilter: 'blur(12px)',
        padding: '0.85rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <button
            onClick={onBackToWebsite}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#94A3B8',
              padding: '0.4rem 0.85rem',
              borderRadius: '6px',
              fontSize: '0.82rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#FFF')}
            onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}
          >
            <ArrowLeft size={14} />
            <span>Website</span>
          </button>

          <StarshipppLogo variant="horizontal" colorMode="dark" height={44} showTagline={false} />

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.75rem',
            borderRadius: '20px',
            backgroundColor: 'rgba(255, 107, 0, 0.12)',
            border: '1px solid rgba(255, 107, 0, 0.35)',
            fontSize: '0.78rem',
            fontWeight: 700,
            color: '#FF8500',
            letterSpacing: '0.04em'
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FF6B00', boxShadow: '0 0 8px #FF6B00' }} />
            STAGE 1 WMS ACTIVE • 4-WEEK HYPER SPRINT
          </div>
        </div>

        {/* Role Persona Switcher */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#0F172A',
          padding: '0.25rem',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <button
            onClick={() => setRole('merchant')}
            style={{
              padding: '0.45rem 0.9rem',
              borderRadius: '6px',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              backgroundColor: role === 'merchant' ? '#FF6B00' : 'transparent',
              color: role === 'merchant' ? '#FFF' : '#94A3B8',
              transition: 'all 0.15s ease'
            }}
          >
            🏢 Merchant (Nasty Hawgs)
          </button>
          <button
            onClick={() => setRole('floor')}
            style={{
              padding: '0.45rem 0.9rem',
              borderRadius: '6px',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              backgroundColor: role === 'floor' ? '#FF6B00' : 'transparent',
              color: role === 'floor' ? '#FFF' : '#94A3B8',
              transition: 'all 0.15s ease'
            }}
          >
            🏭 Pontiac Floor Ops
          </button>
          <button
            onClick={() => setRole('executive')}
            style={{
              padding: '0.45rem 0.9rem',
              borderRadius: '6px',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              backgroundColor: role === 'executive' ? '#FF6B00' : 'transparent',
              color: role === 'executive' ? '#FFF' : '#94A3B8',
              transition: 'all 0.15s ease'
            }}
          >
            💼 Executive & Xero
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '1.5rem 2rem' }}>
        {/* Top 4 Pillar Telemetry Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}>
          {/* Card 1: Prepaid Postage Wallet */}
          <div style={{
            backgroundColor: '#0A0F1D',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '1.25rem',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600 }}>PREPAID POSTAGE WALLET</span>
              <CreditCard size={18} color="#38BDF8" />
            </div>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#38BDF8', fontFamily: 'var(--font-heading)' }}>
              ${walletBalance.toFixed(2)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.78rem', color: '#64748B' }}>
              <span>Auto-Replenish: <b>$200 ACH Threshold</b></span>
              <span style={{ color: '#34D399' }}>● Connected (Chase ****8129)</span>
            </div>
            {autoRechargeTriggered && (
              <div style={{ marginTop: '0.4rem', fontSize: '0.75rem', color: '#34D399', fontWeight: 600 }}>
                ⚡ Stripe ACH Replenishment Executed (+$1,000.00)
              </div>
            )}
          </div>

          {/* Card 2: Fair $250/mo Commitment Meter */}
          <div style={{
            backgroundColor: '#0A0F1D',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600 }}>MONTHLY $250 MINIMUM AUDIT</span>
              <ShieldCheck size={18} color="#34D399" />
            </div>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#34D399', fontFamily: 'var(--font-heading)' }}>
              $384.50 <span style={{ fontSize: '1rem', color: '#64748B', fontWeight: 500 }}>/ $250.00</span>
            </div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: '#34D399', fontWeight: 600 }}>
              ✓ Threshold Met — $0 Top-Up Penalty (Pillar 1)
            </div>
          </div>

          {/* Card 3: DIM Divisor 250 Arbitrage Saved */}
          <div style={{
            backgroundColor: '#0A0F1D',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600 }}>DIM DIVISOR 250 POSTAGE RELIEF</span>
              <Zap size={18} color="#FF8500" />
            </div>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#FF8500', fontFamily: 'var(--font-heading)' }}>
              ${totalArbitrageSaved.toFixed(2)}
            </div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: '#94A3B8' }}>
              Saved 44.4% billable weight vs Standard 139 (Pillar 2)
            </div>
          </div>

          {/* Card 4: Bonded FTZ Working Capital Preserved */}
          <div style={{
            backgroundColor: '#0A0F1D',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600 }}>FTZ SUBZONE 70 CAPITAL IN BOND</span>
              <Anchor size={18} color="#A78BFA" />
            </div>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#A78BFA', fontFamily: 'var(--font-heading)' }}>
              ${ftzDeferredBalance.toFixed(2)}
            </div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: '#94A3B8' }}>
              {ftzCartonsRemaining} Cartons in Bond (545 days remaining)
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '0.75rem',
          marginBottom: '1.5rem',
          overflowX: 'auto'
        }}>
          <button
            onClick={() => setActiveTab('orders')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.55rem 1rem',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: activeTab === 'orders' ? 'rgba(255, 107, 0, 0.15)' : 'transparent',
              color: activeTab === 'orders' ? '#FF8500' : '#94A3B8',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
          >
            <Box size={16} />
            <span>Live Dispatch Bench ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('dim')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.55rem 1rem',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: activeTab === 'dim' ? 'rgba(255, 107, 0, 0.15)' : 'transparent',
              color: activeTab === 'dim' ? '#FF8500' : '#94A3B8',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
          >
            <Zap size={16} />
            <span>DIM 250 Live Engine</span>
          </button>

          <button
            onClick={() => setActiveTab('pod')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.55rem 1rem',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: activeTab === 'pod' ? 'rgba(255, 107, 0, 0.15)' : 'transparent',
              color: activeTab === 'pod' ? '#FF8500' : '#94A3B8',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
          >
            <Printer size={16} />
            <span>Brother GTX Floor POD ({podJobs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('ftz')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.55rem 1rem',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: activeTab === 'ftz' ? 'rgba(255, 107, 0, 0.15)' : 'transparent',
              color: activeTab === 'ftz' ? '#FF8500' : '#94A3B8',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
          >
            <Anchor size={16} />
            <span>Bonded FTZ Subzone 70</span>
          </button>

          <button
            onClick={() => setActiveTab('wallet')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.55rem 1rem',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: activeTab === 'wallet' ? 'rgba(255, 107, 0, 0.15)' : 'transparent',
              color: activeTab === 'wallet' ? '#FF8500' : '#94A3B8',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
          >
            <CreditCard size={16} />
            <span>Wallet & Xero Sync</span>
          </button>

          <button
            onClick={() => setActiveTab('sprint')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.55rem 1rem',
              borderRadius: '8px',
              border: '1px solid rgba(52, 211, 153, 0.3)',
              backgroundColor: activeTab === 'sprint' ? 'rgba(52, 211, 153, 0.15)' : 'rgba(52, 211, 153, 0.05)',
              color: activeTab === 'sprint' ? '#34D399' : '#34D399',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              marginLeft: 'auto'
            }}
          >
            <Clock size={16} />
            <span>4-Week Sprint Plan ⚡</span>
          </button>
        </div>

        {/* TAB 1: LIVE ORDERS & DISPATCH BENCH */}
        {activeTab === 'orders' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0 }}>Pack Bench 04 Dispatch Queue</h2>
                <p style={{ fontSize: '0.85rem', color: '#94A3B8', margin: '0.25rem 0 0 0' }}>
                  Orders automatically rate-shopped with Starshippp negotiated Divisor 250 ground contract.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => {
                    const newOrd: OrderItem = {
                      id: `ord_${Date.now()}`,
                      orderNumber: `NH-${Math.floor(10000 + Math.random() * 90000)}`,
                      customerName: 'Hunter Ray (Nashville, TN)',
                      sku: 'NH-CHOPPER-BARS-16',
                      itemDescription: '16" Ape Hanger Handlebars (Oversize Cart)',
                      dimensions: { l: 32, w: 18, h: 8, weight: 6.8 },
                      podRequired: false,
                      ftzBonded: true,
                      status: 'PENDING_PICK'
                    };
                    setOrders(prev => [newOrd, ...prev]);
                    showToast('📥 New Shopify Order Ingested: 16" Ape Hangers staged for Pack Bench.');
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#F8FAFC',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  <Plus size={16} />
                  <span>Simulate Shopify Order</span>
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {orders.map((ord) => {
                const calc = DimEngine.calculate({
                  lengthInches: ord.dimensions.l,
                  widthInches: ord.dimensions.w,
                  heightInches: ord.dimensions.h,
                  scaleWeightLbs: ord.dimensions.weight
                });

                return (
                  <div key={ord.id} style={{
                    backgroundColor: '#0A0F1D',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    padding: '1.25rem 1.5rem',
                    display: 'grid',
                    gridTemplateColumns: '1.8fr 1.4fr 1.2fr 1fr',
                    alignItems: 'center',
                    gap: '1.5rem'
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                        <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F1F5F9' }}>{ord.orderNumber}</span>
                        <span style={{
                          fontSize: '0.72rem',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px',
                          backgroundColor: ord.status === 'DISPATCHED' ? 'rgba(52, 211, 153, 0.15)' : 'rgba(255, 107, 0, 0.15)',
                          color: ord.status === 'DISPATCHED' ? '#34D399' : '#FF8500',
                          fontWeight: 700
                        }}>
                          {ord.status.replace(/_/g, ' ')}
                        </span>
                        {ord.ftzBonded && (
                          <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem', borderRadius: '4px', backgroundColor: 'rgba(167, 139, 250, 0.15)', color: '#A78BFA' }}>
                            FTZ BONDED
                          </span>
                        )}
                        {ord.podRequired && (
                          <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem', borderRadius: '4px', backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8' }}>
                            POD IN-HOUSE
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '0.2rem' }}>
                        <b>{ord.sku}</b> — {ord.itemDescription}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                        Customer: {ord.customerName}
                      </div>
                    </div>

                    {/* Volumetric Rating Breakdown */}
                    <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <div style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: '0.2rem' }}>DIM WEIGHT ARBITRAGE</div>
                      <div style={{ fontSize: '0.82rem', color: '#CBD5E1' }}>
                        Size: {ord.dimensions.l}"×{ord.dimensions.w}"×{ord.dimensions.h}" ({ord.dimensions.weight} lbs)
                      </div>
                      <div style={{ fontSize: '0.8rem', marginTop: '0.25rem', display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#EF4444' }}>Div 139: <b>{calc.weights.carrierStandardBillableLbs} lbs</b></span>
                        <span style={{ color: '#34D399' }}>Div 250: <b>{calc.weights.starshipppContractBillableLbs} lbs</b></span>
                      </div>
                    </div>

                    {/* Financial Savings */}
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: '0.2rem' }}>POSTAGE ARBITRAGE</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#34D399' }}>
                        +${calc.arbitrage.netSavingsUsd.toFixed(2)} saved
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                        Starshippp: ${calc.arbitrage.starshipppCommercialCostUsd} (vs ${calc.arbitrage.standardEstimatedCostUsd})
                      </div>
                    </div>

                    {/* Actions */}
                    <div style={{ textAlign: 'right' }}>
                      {ord.status === 'DISPATCHED' ? (
                        <div>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#34D399', fontSize: '0.82rem', fontWeight: 600 }}>
                            <CheckCircle2 size={16} /> Dispatched
                          </span>
                          <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.25rem' }}>
                            {ord.carrierTracking}
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleDispatchOrder(ord.id)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            backgroundColor: '#FF6B00',
                            color: '#FFF',
                            border: 'none',
                            padding: '0.65rem 1.15rem',
                            borderRadius: '8px',
                            fontWeight: 700,
                            fontSize: '0.82rem',
                            cursor: 'pointer',
                            boxShadow: '0 4px 14px rgba(255, 107, 0, 0.4)',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <Zap size={14} />
                          <span>Dispatch & Print</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: LIVE DIM 250 CALCULATOR ENGINE */}
        {activeTab === 'dim' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '2rem',
            backgroundColor: '#0A0F1D',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '2rem'
          }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>
                Proprietary DIM Divisor 250 Arbitrage Engine
              </h2>
              <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                Standard carriers divide cubic inches by <b>139</b> or <b>166</b>. Starshippp's negotiated ground contract divides by <b>250</b>. Test any bulky parcel below:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#94A3B8', display: 'block', marginBottom: '0.35rem' }}>Length (in)</label>
                  <input
                    type="number"
                    value={dimInput.length}
                    onChange={e => setDimInput({ ...dimInput, length: Number(e.target.value) })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.1)', backgroundColor: '#050811', color: '#FFF' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#94A3B8', display: 'block', marginBottom: '0.35rem' }}>Width (in)</label>
                  <input
                    type="number"
                    value={dimInput.width}
                    onChange={e => setDimInput({ ...dimInput, width: Number(e.target.value) })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.1)', backgroundColor: '#050811', color: '#FFF' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#94A3B8', display: 'block', marginBottom: '0.35rem' }}>Height (in)</label>
                  <input
                    type="number"
                    value={dimInput.height}
                    onChange={e => setDimInput({ ...dimInput, height: Number(e.target.value) })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.1)', backgroundColor: '#050811', color: '#FFF' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#94A3B8', display: 'block', marginBottom: '0.35rem' }}>Scale Weight (lbs)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={dimInput.scaleWeight}
                    onChange={e => setDimInput({ ...dimInput, scaleWeight: Number(e.target.value) })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.1)', backgroundColor: '#050811', color: '#FFF' }}
                  />
                </div>
              </div>

              <div style={{
                backgroundColor: 'rgba(255, 107, 0, 0.08)',
                border: '1px solid rgba(255, 107, 0, 0.25)',
                borderRadius: '8px',
                padding: '1rem',
                fontSize: '0.85rem',
                color: '#CBD5E1'
              }}>
                💡 <b>Floor Staging Directive:</b> {liveDimResult.recommendation}
              </div>
            </div>

            {/* Results Display */}
            <div style={{
              backgroundColor: '#050811',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600, marginBottom: '0.75rem' }}>
                  VOLUMETRIC ARBITRAGE SUMMARY
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ padding: '1rem', borderRadius: '8px', backgroundColor: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
                    <div style={{ fontSize: '0.75rem', color: '#EF4444' }}>STANDARD DIVISOR 139</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#EF4444' }}>
                      {liveDimResult.weights.carrierStandardBillableLbs} <span style={{ fontSize: '0.9rem' }}>lbs</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '0.25rem' }}>
                      Postage: ${liveDimResult.arbitrage.standardEstimatedCostUsd}
                    </div>
                  </div>

                  <div style={{ padding: '1rem', borderRadius: '8px', backgroundColor: 'rgba(52, 211, 153, 0.08)', border: '1px solid rgba(52, 211, 153, 0.25)' }}>
                    <div style={{ fontSize: '0.75rem', color: '#34D399' }}>STARSHIPPP DIVISOR 250</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#34D399' }}>
                      {liveDimResult.weights.starshipppContractBillableLbs} <span style={{ fontSize: '0.9rem' }}>lbs</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '0.25rem' }}>
                      Postage: ${liveDimResult.arbitrage.starshipppCommercialCostUsd}
                    </div>
                  </div>
                </div>

                <div style={{ padding: '1.25rem', borderRadius: '8px', backgroundColor: '#0F172A', border: '1px solid rgba(255, 107, 0, 0.3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>NET POSTAGE ARBITRAGE SAVINGS</div>
                      <div style={{ fontSize: '2rem', fontWeight: 800, color: '#FF8500', fontFamily: 'var(--font-heading)' }}>
                        +${liveDimResult.arbitrage.netSavingsUsd.toFixed(2)}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>BILLABLE RELIEF</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#38BDF8' }}>
                        -{liveDimResult.weights.weightReliefLbs} lbs ({liveDimResult.arbitrage.savingsPercentage})
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '1.5rem', textAlign: 'center' }}>
                Negotiated Starshippp Commercial Contract • Automatically injected into ShipStation & carrier manifests.
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: IN-HOUSE POD QUEUE & PRINTFUL ARBITRAGE */}
        {activeTab === 'pod' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0 }}>
                  Brother GTX Pro Direct-to-Garment & Vinyl Station
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#94A3B8', margin: '0.25rem 0 0 0' }}>
                  Floor print queue operating directly beside Pack Bench 02. Zero transit days between printing and packaging.
                </p>
              </div>

              <button
                onClick={handleQueuePodJob}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backgroundColor: '#FF6B00',
                  color: '#FFF',
                  border: 'none',
                  padding: '0.55rem 1.15rem',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Plus size={16} />
                <span>Queue DTG Print Job</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
              {podJobs.map(job => (
                <div key={job.id} style={{
                  backgroundColor: '#0A0F1D',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '1.25rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.78rem', color: '#38BDF8', fontWeight: 700 }}>{job.id}</span>
                    <span style={{
                      fontSize: '0.72rem',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      backgroundColor: 'rgba(56, 189, 248, 0.15)',
                      color: '#38BDF8',
                      fontWeight: 700
                    }}>
                      {job.status.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFF', marginBottom: '0.25rem' }}>
                    {job.garment}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#94A3B8', marginBottom: '1rem' }}>
                    Artwork: {job.artwork}
                  </div>

                  {/* Economics Comparison vs Printful */}
                  <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: '8px',
                    padding: '0.75rem',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#94A3B8', marginBottom: '0.25rem' }}>
                      <span>Starshippp In-House Cost:</span>
                      <b style={{ color: '#34D399' }}>${job.inHouseCost.toFixed(2)}</b>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#94A3B8', marginBottom: '0.25rem' }}>
                      <span>Printful Broker Cost:</span>
                      <span style={{ color: '#EF4444', textDecoration: 'line-through' }}>${job.printfulCost.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, color: '#34D399', paddingTop: '0.35rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <span>Merchant Margin Advantage:</span>
                      <span>+${job.savings.toFixed(2)} / unit</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748B', marginBottom: '0.35rem' }}>
                      <span>Curing & Consolidation</span>
                      <span>{job.progress}%</span>
                    </div>
                    <div style={{ height: '6px', borderRadius: '3px', backgroundColor: 'rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}>
                      <div style={{ width: `${job.progress}%`, height: '100%', backgroundColor: '#FF6B00', transition: 'width 0.3s ease' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: BONDED FTZ SUBZONE 70 */}
        {activeTab === 'ftz' && (
          <div style={{
            backgroundColor: '#0A0F1D',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '2rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <Anchor size={20} color="#A78BFA" />
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0 }}>
                    Bonded FTZ Subzone 70 • Detroit Port of Entry Intake
                  </h2>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#94A3B8', margin: 0 }}>
                  Container <b>MSCU7829104</b> admitted under CBP Form 214. 2-Year Duty Deferral Ledger.
                </p>
              </div>

              <button
                onClick={handleFtzMicroRelease}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backgroundColor: '#A78BFA',
                  color: '#050811',
                  border: 'none',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <Zap size={16} />
                <span>Execute CBP 7501 Micro-Release (25 Cartons)</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div style={{ backgroundColor: '#050811', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>TOTAL DECLARED VALUE</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#FFF' }}>$340,000.00</div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>HTS 8714.10.0050 (28.5% Tariff)</div>
              </div>

              <div style={{ backgroundColor: '#050811', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>CURRENT DEFERRED DUTY</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#A78BFA' }}>${ftzDeferredBalance.toFixed(2)}</div>
                <div style={{ fontSize: '0.75rem', color: '#34D399' }}>Preserved in Merchant Cash Flow</div>
              </div>

              <div style={{ backgroundColor: '#050811', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>REMAINING IN BOND</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#38BDF8' }}>{ftzCartonsRemaining} Cartons</div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{ftzCartonsRemaining * 4} individual units</div>
              </div>

              <div style={{ backgroundColor: '#050811', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>STATUTORY CLOCK</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#34D399' }}>545 Days</div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Expires April 10, 2028</div>
              </div>
            </div>

            <div style={{
              backgroundColor: 'rgba(167, 139, 250, 0.06)',
              border: '1px solid rgba(167, 139, 250, 0.2)',
              borderRadius: '8px',
              padding: '1rem',
              fontSize: '0.85rem',
              color: '#CBD5E1',
              lineHeight: 1.5
            }}>
              <b>How Micro-Release Works:</b> Standard 3PLs force you to pay 100% of container customs duties ($96,900.00) the day it arrives at port. In Starshippp's Pontiac Subzone 70 facility, you pay duty <i>carton-by-carton</i> only when items sell. The remaining working capital stays in your bank.
            </div>
          </div>
        )}

        {/* TAB 5: WALLET, $250 MINIMUM & XERO SYNC */}
        {activeTab === 'wallet' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '2rem'
          }}>
            <div style={{
              backgroundColor: '#0A0F1D',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '2rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>Prepaid Postage Wallet & ACH</h3>
                <button
                  onClick={handleSimulateWalletDrain}
                  style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#EF4444',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Simulate Drain (&lt; $200)
                </button>
              </div>

              <div style={{
                backgroundColor: '#050811',
                borderRadius: '10px',
                padding: '1.25rem',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                marginBottom: '1.5rem'
              }}>
                <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>ACTIVE BALANCE</div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#38BDF8', fontFamily: 'var(--font-heading)' }}>
                  ${walletBalance.toFixed(2)}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '0.35rem' }}>
                  Threshold: $200.00 • Auto-Replenishment Amount: $1,000.00
                </div>
              </div>

              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#F1F5F9', marginBottom: '0.75rem' }}>
                Recent Wallet Ledger
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem 0.85rem', borderRadius: '6px', backgroundColor: '#050811', fontSize: '0.82rem' }}>
                  <span style={{ color: '#94A3B8' }}>Divisor 250 Ground Advantage (Hawg Fairing)</span>
                  <b style={{ color: '#EF4444' }}>-$16.92</b>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem 0.85rem', borderRadius: '6px', backgroundColor: '#050811', fontSize: '0.82rem' }}>
                  <span style={{ color: '#94A3B8' }}>Automated ACH Top-Up (Chase ****8129)</span>
                  <b style={{ color: '#34D399' }}>+$1,000.00</b>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem 0.85rem', borderRadius: '6px', backgroundColor: '#050811', fontSize: '0.82rem' }}>
                  <span style={{ color: '#94A3B8' }}>Pick/Pack 3PL Handling Fee (Order NH-98418)</span>
                  <b style={{ color: '#EF4444' }}>-$3.50</b>
                </div>
              </div>
            </div>

            {/* Xero Bi-Directional Accounting Sync */}
            <div style={{
              backgroundColor: '#0A0F1D',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>Bi-Directional Xero General Ledger</h3>
                <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', backgroundColor: 'rgba(52, 211, 153, 0.15)', color: '#34D399', fontWeight: 700 }}>
                  CONNECTED
                </span>
              </div>

              <p style={{ fontSize: '0.82rem', color: '#94A3B8', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                Starshippp automatically pushes itemized fulfillment invoices and reconciles carrier postage against merchant wallet balances nightly.
              </p>

              <div style={{
                backgroundColor: '#050811',
                padding: '1rem',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                color: '#CBD5E1',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                marginBottom: '1.25rem',
                maxHeight: '180px',
                overflowY: 'auto'
              }}>
                <div>POST /api.xro/2.0/Invoices HTTP/1.1</div>
                <div>AccountCode: 200 (Pick & Pack Revenue): $140.00</div>
                <div>AccountCode: 205 (High-Bay Storage): $54.00</div>
                <div>AccountCode: 215 (DTG POD Production): $45.00</div>
                <div>AccountCode: 220 (Monthly Commitment Adj): $0.00</div>
                <div style={{ color: '#34D399' }}>✓ Status: AUTHORISED (Sync ID: XR-99482)</div>
              </div>

              <button
                onClick={() => showToast('📑 Real-time Xero Sync Completed: Invoices reconciled with zero discrepancies.')}
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#FFF',
                  padding: '0.65rem',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Run Manual Xero Reconciliation Now
              </button>
            </div>
          </div>
        )}

        {/* TAB 6: 4-WEEK SPRINT PLAN (DOMINIC'S COMPRESSED TIMELINE) */}
        {activeTab === 'sprint' && (
          <div style={{
            backgroundColor: '#0A0F1D',
            border: '1px solid rgba(52, 211, 153, 0.3)',
            borderRadius: '16px',
            padding: '2rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <Zap size={22} color="#34D399" />
                  <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: 0 }}>
                    Target 4-Week Hyper-Sprint Master Plan
                  </h2>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#94A3B8', margin: 0 }}>
                  Compressed from traditional 20 weeks down to 30 days to full operational commercial launch.
                </p>
              </div>

              <div style={{
                backgroundColor: 'rgba(52, 211, 153, 0.15)',
                border: '1px solid #34D399',
                color: '#34D399',
                padding: '0.45rem 1rem',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: 700
              }}>
                WEEK 1 DELIVERED TODAY (100%)
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {/* Week 1 */}
              <div style={{
                backgroundColor: 'rgba(52, 211, 153, 0.05)',
                border: '1px solid #34D399',
                borderRadius: '12px',
                padding: '1.25rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#34D399' }}>WEEK 1 (DAYS 1-7)</span>
                  <span style={{ fontSize: '0.75rem', backgroundColor: '#34D399', color: '#050811', fontWeight: 800, padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                    DONE
                  </span>
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#FFF', marginBottom: '0.5rem' }}>
                  Core Engines & Stage 1 Dashboard
                </div>
                <ul style={{ fontSize: '0.8rem', color: '#CBD5E1', paddingLeft: '1.1rem', margin: 0, lineHeight: 1.6 }}>
                  <li>DIM Divisor 250 Volumetric Engine</li>
                  <li>Billing Engine ($250/mo minimum audit)</li>
                  <li>Bonded FTZ CBP 214/7501 Micro-Releases</li>
                  <li>In-House Brother GTX POD Queue</li>
                  <li>Interactive Live WMS Dashboard Console</li>
                </ul>
              </div>

              {/* Week 2 */}
              <div style={{
                backgroundColor: '#050811',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '1.25rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FF8500' }}>WEEK 2 (DAYS 8-14)</span>
                  <span style={{ fontSize: '0.75rem', backgroundColor: 'rgba(255, 107, 0, 0.2)', color: '#FF8500', fontWeight: 800, padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                    IN PROGRESS
                  </span>
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#FFF', marginBottom: '0.5rem' }}>
                  Carrier APIs & Stripe ACH
                </div>
                <ul style={{ fontSize: '0.8rem', color: '#94A3B8', paddingLeft: '1.1rem', margin: 0, lineHeight: 1.6 }}>
                  <li>ShipStation / Carrier rate shopping link</li>
                  <li>Stripe Connect ACH auto-recharge webhook</li>
                  <li>Bi-directional Xero OAuth sync execution</li>
                  <li>Automated thermal label printing service</li>
                </ul>
              </div>

              {/* Week 3 */}
              <div style={{
                backgroundColor: '#050811',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                padding: '1.25rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#94A3B8' }}>WEEK 3 (DAYS 15-21)</span>
                  <span style={{ fontSize: '0.75rem', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#94A3B8', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                    SCHEDULED
                  </span>
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#FFF', marginBottom: '0.5rem' }}>
                  Floor Hardware & Brother GTX Spooler
                </div>
                <ul style={{ fontSize: '0.8rem', color: '#94A3B8', paddingLeft: '1.1rem', margin: 0, lineHeight: 1.6 }}>
                  <li>Zebra TC57 RF handheld scanner PWA</li>
                  <li>Brother GTX RIP print spooler listener</li>
                  <li>Cantilever & high-bay barcode bin tags</li>
                  <li>Automated scale weight verification</li>
                </ul>
              </div>

              {/* Week 4 */}
              <div style={{
                backgroundColor: '#050811',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                padding: '1.25rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#94A3B8' }}>WEEK 4 (DAYS 22-30)</span>
                  <span style={{ fontSize: '0.75rem', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#94A3B8', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                    GO-LIVE
                  </span>
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#FFF', marginBottom: '0.5rem' }}>
                  Pilot Merchant Live & Scale
                </div>
                <ul style={{ fontSize: '0.8rem', color: '#94A3B8', paddingLeft: '1.1rem', margin: 0, lineHeight: 1.6 }}>
                  <li>Live pilot fulfillment with Nasty Hawgs</li>
                  <li>CBP Subzone 70 bonded audit sign-off</li>
                  <li>Public merchant self-service onboarding</li>
                  <li>Standalone enterprise SaaS packaging</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
