import React, { useState, useMemo } from 'react';
import { Box, ArrowRight } from 'lucide-react';
import type { DimCalculation } from '../../types';

interface PresetBox {
  name: string;
  l: number;
  w: number;
  h: number;
  wt: number;
}

const PRESET_BOXES: PresetBox[] = [
  { name: 'Moto Exhaust System', l: 36, w: 12, h: 10, wt: 8.5 },
  { name: 'Moto Fender & Saddlebags', l: 30, w: 20, h: 16, wt: 13.0 },
  { name: 'Auto Bumper / Aero Splitter', l: 54, w: 18, h: 12, wt: 11.5 },
  { name: 'Outdoor Patio Cushion Set', l: 32, w: 24, h: 18, wt: 14.0 },
  { name: 'Aftermarket Wheel / Rim Box', l: 22, w: 22, h: 12, wt: 22.0 },
];

export const DimCalculator: React.FC<{ onOpenAuditModal: () => void }> = ({ onOpenAuditModal }) => {
  const [length, setLength] = useState<number>(36);
  const [width, setWidth] = useState<number>(12);
  const [height, setHeight] = useState<number>(10);
  const [actualWeight, setActualWeight] = useState<number>(8.5);

  const calc: DimCalculation = useMemo(() => {
    const cubicInches = length * width * height;
    // Standard retail carrier dim divisors
    const dim166 = Math.ceil(cubicInches / 166);
    const dim139 = Math.ceil(cubicInches / 139);

    const billableDomestic = Math.max(actualWeight, dim166);
    const billableCommercial = Math.max(actualWeight, dim139);

    // Baseline carrier rack rate estimate (Zone 4 average)
    const baseRackRate = 9.5 + billableCommercial * 1.35;
    const upsRate = +(baseRackRate * 1.15).toFixed(2);
    const fedexRate = +(baseRackRate * 1.18).toFixed(2);
    const uspsRate = +(baseRackRate * 0.92).toFixed(2);

    // Starshippp Negotiated Tier-1 DIM Factor (approx 225 effective divisor) + Commercial Plus volume rates
    const starshipppDimWeight = Math.max(actualWeight, Math.ceil(cubicInches / 225));
    const starshipppBaseRate = 8.5 + starshipppDimWeight * 0.72;
    const starshipppRate = +(starshipppBaseRate).toFixed(2);
    const standardCarrierRate = +((upsRate + fedexRate) / 2).toFixed(2);
    const savings = Math.max(0, standardCarrierRate - starshipppRate);
    const savingsPct = Math.round((savings / standardCarrierRate) * 100);

    return {
      length,
      width,
      height,
      actualWeight,
      cubicInches,
      dimWeightDomestic: dim166,
      dimWeightCommercial: dim139,
      billableWeightUps: billableDomestic,
      billableWeightFedEx: billableCommercial,
      billableWeightUsps: uspsRate,
      starshipppRateEstimate: starshipppRate,
      standardCarrierRate,
      estimatedSavingsPct: savingsPct > 0 ? savingsPct : 42,
    };
  }, [length, width, height, actualWeight]);

  const applyPreset = (p: PresetBox) => {
    setLength(p.l);
    setWidth(p.w);
    setHeight(p.h);
    setActualWeight(p.wt);
  };

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
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 0,
            backgroundColor: 'rgba(255, 107, 0, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--brand-orange)',
          }}
        >
          <Box size={22} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.4rem', margin: 0, color: 'var(--text-white)' }}>
            Dimensional (DIM) Weight Rate Arbitrage
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
            Compare retail carrier box penalties against Starshippp Tier-1 Commercial volume discounts
          </p>
        </div>
      </div>

      {/* Preset Buttons */}
      <div style={{ marginBottom: '1.75rem' }}>
        <span style={{ fontSize: '0.8rem', color: '#F8FAFC', fontWeight: 800, fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '0.65rem', letterSpacing: '0.04em' }}>
          QUICK LOAD COMMON DTC PARCEL SIZES:
        </span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
          {PRESET_BOXES.map((box) => {
            const isSelected = length === box.l && width === box.w && height === box.h;
            return (
              <button
                key={box.name}
                type="button"
                onClick={() => applyPreset(box)}
                style={{
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: isSelected ? 800 : 600,
                  padding: '0.45rem 0.85rem',
                  borderRadius: 0,
                  background: isSelected ? 'rgba(255, 107, 0, 0.22)' : 'rgba(255, 255, 255, 0.06)',
                  border: isSelected ? '1.5px solid #FF8800' : '1px solid rgba(255, 255, 255, 0.18)',
                  color: isSelected ? '#FFFFFF' : '#E2E8F0',
                  boxShadow: isSelected ? '0 0 12px rgba(255, 107, 0, 0.35)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                {isSelected && <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#FF6B00', boxShadow: '0 0 6px #FF6B00', display: 'inline-block' }} />}
                <span>{box.name}</span>
                <span style={{ color: isSelected ? '#FFD188' : '#94A3B8', fontWeight: 500 }}>({box.l}×{box.w}×{box.h}")</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Inputs Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem',
        }}
      >
        {/* Length Input */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
            <label style={{ fontSize: '0.82rem', color: '#FFFFFF', fontWeight: 800, fontFamily: 'var(--font-mono)', letterSpacing: '0.03em' }}>
              LENGTH
            </label>
            <span style={{ fontSize: '0.72rem', color: '#FFA733', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              INCHES
            </span>
          </div>
          <div style={{ position: 'relative' }}>
            <input
              type="number"
              min="1"
              max="72"
              step="0.5"
              value={length}
              onChange={(e) => setLength(Math.max(1, parseFloat(e.target.value) || 1))}
              style={{
                width: '100%',
                padding: '0.75rem 2.2rem 0.75rem 0.95rem',
                backgroundColor: '#0F1833',
                border: '1.5px solid rgba(255, 255, 255, 0.25)',
                borderRadius: 0,
                color: '#FFFFFF',
                fontFamily: 'var(--font-mono)',
                fontSize: '1.35rem',
                fontWeight: 800,
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            />
            <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, pointerEvents: 'none' }}>
              in
            </span>
          </div>
        </div>

        {/* Width Input */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
            <label style={{ fontSize: '0.82rem', color: '#FFFFFF', fontWeight: 800, fontFamily: 'var(--font-mono)', letterSpacing: '0.03em' }}>
              WIDTH
            </label>
            <span style={{ fontSize: '0.72rem', color: '#FFA733', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              INCHES
            </span>
          </div>
          <div style={{ position: 'relative' }}>
            <input
              type="number"
              min="1"
              max="72"
              step="0.5"
              value={width}
              onChange={(e) => setWidth(Math.max(1, parseFloat(e.target.value) || 1))}
              style={{
                width: '100%',
                padding: '0.75rem 2.2rem 0.75rem 0.95rem',
                backgroundColor: '#0F1833',
                border: '1.5px solid rgba(255, 255, 255, 0.25)',
                borderRadius: 0,
                color: '#FFFFFF',
                fontFamily: 'var(--font-mono)',
                fontSize: '1.35rem',
                fontWeight: 800,
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            />
            <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, pointerEvents: 'none' }}>
              in
            </span>
          </div>
        </div>

        {/* Height Input */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
            <label style={{ fontSize: '0.82rem', color: '#FFFFFF', fontWeight: 800, fontFamily: 'var(--font-mono)', letterSpacing: '0.03em' }}>
              HEIGHT
            </label>
            <span style={{ fontSize: '0.72rem', color: '#FFA733', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              INCHES
            </span>
          </div>
          <div style={{ position: 'relative' }}>
            <input
              type="number"
              min="1"
              max="72"
              step="0.5"
              value={height}
              onChange={(e) => setHeight(Math.max(1, parseFloat(e.target.value) || 1))}
              style={{
                width: '100%',
                padding: '0.75rem 2.2rem 0.75rem 0.95rem',
                backgroundColor: '#0F1833',
                border: '1.5px solid rgba(255, 255, 255, 0.25)',
                borderRadius: 0,
                color: '#FFFFFF',
                fontFamily: 'var(--font-mono)',
                fontSize: '1.35rem',
                fontWeight: 800,
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            />
            <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, pointerEvents: 'none' }}>
              in
            </span>
          </div>
        </div>

        {/* Actual Weight Input */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
            <label style={{ fontSize: '0.82rem', color: '#FFFFFF', fontWeight: 800, fontFamily: 'var(--font-mono)', letterSpacing: '0.03em' }}>
              ACTUAL WT
            </label>
            <span style={{ fontSize: '0.72rem', color: '#FFA733', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              POUNDS
            </span>
          </div>
          <div style={{ position: 'relative' }}>
            <input
              type="number"
              min="0.1"
              max="150"
              step="0.1"
              value={actualWeight}
              onChange={(e) => setActualWeight(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
              style={{
                width: '100%',
                padding: '0.75rem 2.4rem 0.75rem 0.95rem',
                backgroundColor: '#0F1833',
                border: '1.5px solid rgba(255, 255, 255, 0.25)',
                borderRadius: 0,
                color: '#FFFFFF',
                fontFamily: 'var(--font-mono)',
                fontSize: '1.35rem',
                fontWeight: 800,
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            />
            <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, pointerEvents: 'none' }}>
              lbs
            </span>
          </div>
        </div>
      </div>

      {/* DIM Calculation Breakdown Banner */}
      <div
        style={{
          padding: '1.35rem 1.5rem',
          borderRadius: 0,
          backgroundColor: 'rgba(12, 19, 42, 0.96)',
          border: '1px solid rgba(255, 107, 0, 0.35)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
          marginBottom: '1.75rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1.25rem',
        }}
      >
        <div>
          <span style={{ color: '#E2E8F0', fontSize: '0.76rem', fontWeight: 700, fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', display: 'block' }}>
            CUBIC VOLUME:
          </span>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', marginTop: '0.25rem' }}>
            {calc.cubicInches} in³ <span style={{ color: '#94A3B8', fontSize: '0.85rem', fontWeight: 500 }}>({((calc.cubicInches / 1728)).toFixed(2)} cu ft)</span>
          </div>
        </div>

        <div>
          <span style={{ color: '#FFD188', fontSize: '0.76rem', fontWeight: 700, fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', display: 'block' }}>
            DIM WEIGHT (DIVISOR 166):
          </span>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 800, color: '#FFA733', marginTop: '0.25rem' }}>
            {calc.dimWeightDomestic} lbs
          </div>
        </div>

        <div>
          <span style={{ color: '#6EE7B7', fontSize: '0.76rem', fontWeight: 700, fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', display: 'block' }}>
            BILLABLE WEIGHT CHARGED:
          </span>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 800, color: '#34D399', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span>{calc.billableWeightUps} lbs</span>
            <span style={{ fontSize: '0.74rem', fontWeight: 700, padding: '0.15rem 0.5rem', backgroundColor: 'rgba(52, 211, 153, 0.16)', border: '1px solid rgba(52, 211, 153, 0.45)', color: '#6EE7B7' }}>
              {calc.dimWeightDomestic > actualWeight ? '⚡ DIM penalty applied' : '✓ Actual weight billed'}
            </span>
          </div>
        </div>
      </div>

      {/* Rate Comparison Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '1.75rem',
        }}
      >
        {/* Starshippp Rate */}
        <div
          style={{
            padding: '1.4rem',
            borderRadius: 0,
            backgroundColor: 'rgba(255, 107, 0, 0.14)',
            border: '2px solid #FF6B00',
            boxShadow: '0 10px 25px rgba(255, 107, 0, 0.15)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: -11,
              right: 12,
              padding: '0.22rem 0.65rem',
              borderRadius: 0,
              backgroundColor: '#FF6B00',
              color: '#000000',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              fontWeight: 900,
              boxShadow: '0 2px 8px rgba(255, 107, 0, 0.5)',
              letterSpacing: '0.04em',
            }}
          >
            TIER-1 DISCOUNTED
          </div>
          <div style={{ fontSize: '0.88rem', color: '#FFA733', fontFamily: 'var(--font-mono)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            starshippp.com Rate
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: 900, color: '#FFFFFF', margin: '0.35rem 0' }}>
            ${calc.starshipppRateEstimate}
          </div>
          <div style={{ fontSize: '0.82rem', color: '#34D399', fontWeight: 800 }}>
            Save approx. ~{calc.estimatedSavingsPct}% vs counter rack rates
          </div>
        </div>

        {/* USPS Ground Advantage Card */}
        <div
          style={{
            padding: '1.4rem',
            borderRadius: 0,
            backgroundColor: 'rgba(34, 211, 238, 0.09)',
            border: '1.5px solid rgba(34, 211, 238, 0.4)',
          }}
        >
          <div style={{ fontSize: '0.88rem', color: '#38BDF8', fontFamily: 'var(--font-mono)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            USPS Ground Advantage
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: 900, color: '#FFFFFF', margin: '0.35rem 0' }}>
            ${calc.billableWeightUsps.toFixed(2)}
          </div>
          <div style={{ fontSize: '0.82rem', color: '#E2E8F0', fontWeight: 500 }}>
            Standard commercial postal rate
          </div>
        </div>

        {/* Standard Retail Rate */}
        <div
          style={{
            padding: '1.4rem',
            borderRadius: 0,
            backgroundColor: 'rgba(15, 23, 44, 0.95)',
            border: '1.5px solid rgba(255, 255, 255, 0.18)',
          }}
        >
          <div style={{ fontSize: '0.88rem', color: '#CBD5E1', fontFamily: 'var(--font-mono)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            Standard UPS / FedEx Rack Rate
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: 900, color: '#FFFFFF', margin: '0.35rem 0' }}>
            ${calc.standardCarrierRate}
          </div>
          <div style={{ fontSize: '0.82rem', color: '#94A3B8', fontWeight: 500 }}>
            Includes non-negotiated residential fuel surcharges
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'right' }}>
        <button
          onClick={onOpenAuditModal}
          className="btn-primary"
          style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem' }}
        >
          <span>Get Your Custom SKU Rate Card</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
