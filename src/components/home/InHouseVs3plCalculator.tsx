import React, { useState, useMemo } from 'react';
import { TrendingUp, ArrowRight, Sparkles } from 'lucide-react';
import type { RoiCalculation } from '../../types';

export const InHouseVs3plCalculator: React.FC<{ onOpenAuditModal: () => void }> = ({ onOpenAuditModal }) => {
  const [monthlyOrders, setMonthlyOrders] = useState<number>(850);
  const [laborRatePerHour, setLaborRatePerHour] = useState<number>(35);
  const [packingMinutesPerOrder, setPackingMinutesPerOrder] = useState<number>(5);
  const [suppliesCostPerBox, setSuppliesCostPerBox] = useState<number>(1.25);
  const [monthlyStorageCost, setMonthlyStorageCost] = useState<number>(650);

  const roi: RoiCalculation = useMemo(() => {
    // In-house calculations
    const monthlyLaborHours = (monthlyOrders * packingMinutesPerOrder) / 60;
    const monthlyLaborCost = monthlyLaborHours * laborRatePerHour;
    const monthlySuppliesCost = monthlyOrders * suppliesCostPerBox;
    const totalInHouseCost = Math.round(monthlyLaborCost + monthlySuppliesCost + monthlyStorageCost);

    // Starshippp all-in cost (Boutique flat pick/pack $2.65 includes standard packaging supplies + bulk storage $0.40/pallet equivalent)
    const starshipppPickPack = monthlyOrders * 2.65;
    const starshipppStorage = Math.max(150, (monthlyOrders / 400) * 120);
    const starshipppAllInCost = Math.round(starshipppPickPack + starshipppStorage);

    const monthlySavings = Math.max(0, totalInHouseCost - starshipppAllInCost);
    const annualSavings = monthlySavings * 12;
    const reclaimedFounderHours = Math.round(monthlyLaborHours);
    const roiMultiplier = +(totalInHouseCost / Math.max(1, starshipppAllInCost)).toFixed(1);

    return {
      monthlyOrders,
      laborRatePerHour,
      packingMinutesPerOrder,
      suppliesCostPerBox,
      monthlyStorageCost,
      monthlyLaborHours,
      monthlyLaborCost,
      monthlySuppliesCost,
      totalInHouseCost,
      starshipppAllInCost,
      monthlySavings,
      annualSavings,
      reclaimedFounderHours,
      roiMultiplier,
    };
  }, [monthlyOrders, laborRatePerHour, packingMinutesPerOrder, suppliesCostPerBox, monthlyStorageCost]);

  return (
    <div
      className="glass-panel"
      style={{
        padding: '2.5rem',
        border: '1px solid var(--border-card)',
        borderRadius: 0,
        backgroundColor: 'var(--bg-card)',
        boxShadow: 'var(--card-shadow)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 0,
            backgroundColor: 'rgba(52, 211, 153, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#34D399',
          }}
        >
          <TrendingUp size={22} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.4rem', margin: 0 }}>
            True Cost of In-House DIY vs. Starshippp 3PL ROI
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
            Calculate the hidden costs of packing tape, lost founder hours, and garage/storage rent
          </p>
        </div>
      </div>

      {/* Sliders Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.75rem',
          marginBottom: '2.25rem',
        }}
      >
        {/* Slider 1: Monthly Orders */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.55rem' }}>
            <label style={{ fontSize: '0.84rem', fontFamily: 'var(--font-mono)', color: '#FFFFFF', fontWeight: 800, letterSpacing: '0.03em' }}>
              MONTHLY ORDER VOLUME
            </label>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#FFA733', fontSize: '1.05rem' }}>
              {monthlyOrders.toLocaleString()} orders/mo
            </span>
          </div>
          <input
            type="range"
            min="300"
            max="3500"
            step="50"
            value={monthlyOrders}
            onChange={(e) => setMonthlyOrders(parseInt(e.target.value, 10))}
            style={{ width: '100%', accentColor: 'var(--brand-orange)' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#CBD5E1', fontWeight: 600, marginTop: '0.35rem' }}>
            <span>300 (Boutique)</span>
            <span>1,500 (Scaling)</span>
            <span>3,500+ (High Growth)</span>
          </div>
        </div>

        {/* Slider 2: Founder / Labor Value per Hour */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.55rem' }}>
            <label style={{ fontSize: '0.84rem', fontFamily: 'var(--font-mono)', color: '#FFFFFF', fontWeight: 800, letterSpacing: '0.03em' }}>
              LABOR / FOUNDER TIME VALUE
            </label>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#FFA733', fontSize: '1.05rem' }}>
              ${laborRatePerHour}/hr
            </span>
          </div>
          <input
            type="range"
            min="15"
            max="120"
            step="5"
            value={laborRatePerHour}
            onChange={(e) => setLaborRatePerHour(parseInt(e.target.value, 10))}
            style={{ width: '100%', accentColor: 'var(--brand-orange)' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#CBD5E1', fontWeight: 600, marginTop: '0.35rem' }}>
            <span>$15/hr (Contract)</span>
            <span>$50/hr (Founder)</span>
            <span>$120/hr (Exec Time)</span>
          </div>
        </div>

        {/* Slider 3: Packing Time Per Order */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.55rem' }}>
            <label style={{ fontSize: '0.84rem', fontFamily: 'var(--font-mono)', color: '#FFFFFF', fontWeight: 800, letterSpacing: '0.03em' }}>
              TIME TO PACK & TAPE EACH BOX
            </label>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#FFA733', fontSize: '1.05rem' }}>
              {packingMinutesPerOrder} min / order
            </span>
          </div>
          <input
            type="range"
            min="2"
            max="15"
            step="1"
            value={packingMinutesPerOrder}
            onChange={(e) => setPackingMinutesPerOrder(parseInt(e.target.value, 10))}
            style={{ width: '100%', accentColor: 'var(--brand-orange)' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#CBD5E1', fontWeight: 600, marginTop: '0.35rem' }}>
            <span>2 min (Fast Poly)</span>
            <span>5 min (Standard Box)</span>
            <span>15 min (Kitting/Wrap)</span>
          </div>
        </div>

        {/* Slider 4: Packaging Supplies Cost per Box */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.55rem' }}>
            <label style={{ fontSize: '0.84rem', fontFamily: 'var(--font-mono)', color: '#FFFFFF', fontWeight: 800, letterSpacing: '0.03em' }}>
              BOX & PACKAGING COST / ORDER
            </label>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#FFA733', fontSize: '1.05rem' }}>
              ${suppliesCostPerBox.toFixed(2)} / box
            </span>
          </div>
          <input
            type="range"
            min="0.4"
            max="3.5"
            step="0.05"
            value={suppliesCostPerBox}
            onChange={(e) => setSuppliesCostPerBox(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--brand-orange)' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#CBD5E1', fontWeight: 600, marginTop: '0.35rem' }}>
            <span>$0.40 (Polymailer)</span>
            <span>$1.25 (Box + Tape)</span>
            <span>$3.50 (Custom Kit)</span>
          </div>
        </div>

        {/* Slider 5: Monthly Storage / Facility Overhead */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.55rem' }}>
            <label style={{ fontSize: '0.84rem', fontFamily: 'var(--font-mono)', color: '#FFFFFF', fontWeight: 800, letterSpacing: '0.03em' }}>
              STORAGE / GARAGE / SHELVING RENT
            </label>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#FFA733', fontSize: '1.05rem' }}>
              ${monthlyStorageCost} / month
            </span>
          </div>
          <input
            type="range"
            min="100"
            max="2500"
            step="50"
            value={monthlyStorageCost}
            onChange={(e) => setMonthlyStorageCost(parseInt(e.target.value, 10))}
            style={{ width: '100%', accentColor: 'var(--brand-orange)' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#CBD5E1', fontWeight: 600, marginTop: '0.35rem' }}>
            <span>$100 (Home room)</span>
            <span>$800 (Storage unit)</span>
            <span>$2,500 (Flex warehouse)</span>
          </div>
        </div>
      </div>

      {/* Results Comparison Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem',
        }}
      >
        {/* Metric 1: Monthly Cost In-House */}
        <div
          style={{
            padding: '1.35rem',
            borderRadius: 0,
            backgroundColor: 'rgba(239, 68, 68, 0.09)',
            border: '1.5px solid rgba(239, 68, 68, 0.35)',
          }}
        >
          <div style={{ fontSize: '0.82rem', color: '#F87171', fontFamily: 'var(--font-mono)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            In-House DIY Total Cost
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#FFFFFF', margin: '0.35rem 0' }}>
            ${roi.totalInHouseCost.toLocaleString()}
            <span style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 500 }}>/mo</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#FECACA', fontWeight: 500 }}>
            Includes ${roi.monthlyLaborCost.toLocaleString()} labor + ${roi.monthlySuppliesCost.toLocaleString()} packaging
          </div>
        </div>

        {/* Metric 2: Starshippp All-In Cost */}
        <div
          style={{
            padding: '1.35rem',
            borderRadius: 0,
            backgroundColor: 'rgba(52, 211, 153, 0.09)',
            border: '1.5px solid rgba(52, 211, 153, 0.4)',
          }}
        >
          <div style={{ fontSize: '0.82rem', color: '#34D399', fontFamily: 'var(--font-mono)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            Starshippp Pontiac All-In
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#FFFFFF', margin: '0.35rem 0' }}>
            ${roi.starshipppAllInCost.toLocaleString()}
            <span style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 500 }}>/mo</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#A7F3D0', fontWeight: 500 }}>
            Full pick, pack, custom tissue unboxing & dedicated floor Slack
          </div>
        </div>

        {/* Metric 3: Reclaimed Founder Time */}
        <div
          style={{
            padding: '1.35rem',
            borderRadius: 0,
            backgroundColor: 'rgba(34, 211, 238, 0.09)',
            border: '1.5px solid rgba(34, 211, 238, 0.4)',
          }}
        >
          <div style={{ fontSize: '0.82rem', color: '#22D3EE', fontFamily: 'var(--font-mono)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            Reclaimed Founder Hours
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#FFFFFF', margin: '0.35rem 0' }}>
            {roi.reclaimedFounderHours} hrs
            <span style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 500 }}>/mo</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#BAE6FD', fontWeight: 500 }}>
            Redirect {Math.round(roi.reclaimedFounderHours / 4)} full work days/mo to customer acquisition
          </div>
        </div>

        {/* Metric 4: Annual Net Savings */}
        <div
          style={{
            padding: '1.35rem',
            borderRadius: 0,
            backgroundColor: 'rgba(255, 107, 0, 0.14)',
            border: '2px solid #FF6B00',
            boxShadow: '0 8px 24px rgba(255, 107, 0, 0.15)',
          }}
        >
          <div style={{ fontSize: '0.82rem', color: '#FFA733', fontFamily: 'var(--font-mono)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            Estimated Net Annual ROI
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#FFFFFF', margin: '0.35rem 0' }}>
            +${roi.annualSavings.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.82rem', color: '#34D399', fontWeight: 800 }}>
            {roi.roiMultiplier}x Operational Efficiency Multiplier
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <Sparkles size={16} color="var(--brand-orange)" />
          <span>Zero onboarding fees & 30-day trial without vendor lock-in.</span>
        </div>

        <button
          onClick={onOpenAuditModal}
          className="btn-primary"
          style={{ padding: '0.75rem 1.5rem', fontSize: '0.92rem' }}
        >
          <span>Claim 30-Day Free Migration</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};
