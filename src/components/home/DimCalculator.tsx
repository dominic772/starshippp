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
  { name: 'Polymailer (Apparel)', l: 12, w: 9, h: 2, wt: 0.8 },
  { name: '6x6x6 Candle/Jar Box', l: 6, w: 6, h: 6, wt: 1.5 },
  { name: '10x8x4 Skincare/Beauty Kit', l: 10, w: 8, h: 4, wt: 2.2 },
  { name: '14x10x6 Footwear / Hoodie', l: 14, w: 10, h: 6, wt: 3.5 },
  { name: '18x14x8 Multi-Item Bundle', l: 18, w: 14, h: 8, wt: 6.0 },
];

export const DimCalculator: React.FC<{ onOpenAuditModal: () => void }> = ({ onOpenAuditModal }) => {
  const [length, setLength] = useState<number>(10);
  const [width, setWidth] = useState<number>(8);
  const [height, setHeight] = useState<number>(4);
  const [actualWeight, setActualWeight] = useState<number>(2.0);

  const calc: DimCalculation = useMemo(() => {
    const cubicInches = length * width * height;
    const dim166 = Math.ceil(cubicInches / 166);
    const dim139 = Math.ceil(cubicInches / 139);

    const billableDomestic = Math.max(actualWeight, dim166);
    const billableCommercial = Math.max(actualWeight, dim139);

    // Baseline carrier rack rate estimate (Zone 4 average)
    const baseRackRate = 7.5 + billableDomestic * 1.45;
    const upsRate = +(baseRackRate * 1.15).toFixed(2);
    const fedexRate = +(baseRackRate * 1.18).toFixed(2);
    const uspsRate = +(baseRackRate * 0.92).toFixed(2);

    // Starshippp Commercial Plus Tier 1 negotiated rate
    const starshipppRate = +(baseRackRate * 0.65).toFixed(2);
    const standardCarrierRate = +((upsRate + fedexRate) / 2).toFixed(2);
    const savings = standardCarrierRate - starshipppRate;
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
      billableWeightUsps: uspsRate, // using rate for display
      starshipppRateEstimate: starshipppRate,
      standardCarrierRate,
      estimatedSavingsPct: savingsPct > 0 ? savingsPct : 35,
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
      <div style={{ marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '0.5rem' }}>
          QUICK LOAD COMMON DTC PARCEL SIZES:
        </span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {PRESET_BOXES.map((box) => (
            <button
              key={box.name}
              type="button"
              onClick={() => applyPreset(box)}
              style={{
                fontSize: '0.76rem',
                fontFamily: 'var(--font-mono)',
                padding: '0.35rem 0.65rem',
                borderRadius: 0,
                background: length === box.l && width === box.w && height === box.h ? 'rgba(255, 107, 0, 0.25)' : 'var(--bg-surface-elevated)',
                border: length === box.l && width === box.w && height === box.h ? '1px solid var(--brand-orange)' : '1px solid var(--border-card)',
                color: length === box.l && width === box.w && height === box.h ? 'var(--brand-orange)' : 'var(--text-secondary)',
                transition: 'all 0.15s ease',
              }}
            >
              {box.name} ({box.l}×{box.w}×{box.h}")
            </button>
          ))}
        </div>
      </div>

      {/* Inputs Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginBottom: '0.35rem' }}>
            LENGTH (IN)
          </label>
          <input
            type="number"
            min="1"
            max="48"
            step="0.5"
            value={length}
            onChange={(e) => setLength(Math.max(1, parseFloat(e.target.value) || 1))}
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem',
              backgroundColor: 'var(--bg-input)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 0,
              color: 'var(--text-white)',
              fontFamily: 'var(--font-mono)',
              fontSize: '1.05rem',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginBottom: '0.35rem' }}>
            WIDTH (IN)
          </label>
          <input
            type="number"
            min="1"
            max="48"
            step="0.5"
            value={width}
            onChange={(e) => setWidth(Math.max(1, parseFloat(e.target.value) || 1))}
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem',
              backgroundColor: 'var(--bg-input)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 0,
              color: 'var(--text-white)',
              fontFamily: 'var(--font-mono)',
              fontSize: '1.05rem',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginBottom: '0.35rem' }}>
            HEIGHT (IN)
          </label>
          <input
            type="number"
            min="1"
            max="48"
            step="0.5"
            value={height}
            onChange={(e) => setHeight(Math.max(1, parseFloat(e.target.value) || 1))}
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem',
              backgroundColor: 'var(--bg-input)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 0,
              color: 'var(--text-white)',
              fontFamily: 'var(--font-mono)',
              fontSize: '1.05rem',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginBottom: '0.35rem' }}>
            ACTUAL WT (LBS)
          </label>
          <input
            type="number"
            min="0.1"
            max="150"
            step="0.1"
            value={actualWeight}
            onChange={(e) => setActualWeight(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem',
              backgroundColor: 'var(--bg-input)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 0,
              color: 'var(--text-white)',
              fontFamily: 'var(--font-mono)',
              fontSize: '1.05rem',
            }}
          />
        </div>
      </div>

      {/* DIM Calculation Breakdown Banner */}
      <div
        style={{
          padding: '1.25rem',
          borderRadius: 0,
          backgroundColor: 'var(--bg-surface-elevated)',
          border: '1px solid var(--border-subtle)',
          marginBottom: '1.75rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '1rem',
          fontSize: '0.85rem',
        }}
      >
        <div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', display: 'block' }}>
            CUBIC VOLUME:
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-white)' }}>
            {calc.cubicInches} in³ ({((calc.cubicInches / 1728)).toFixed(2)} cu ft)
          </span>
        </div>

        <div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', display: 'block' }}>
            DIM WEIGHT (DIVISOR 166):
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--brand-orange-light)' }}>
            {calc.dimWeightDomestic} lbs
          </span>
        </div>

        <div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', display: 'block' }}>
            BILLABLE WEIGHT CHARGED:
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#34D399' }}>
            {calc.billableWeightUps} lbs
          </span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginLeft: 4 }}>
            ({calc.dimWeightDomestic > actualWeight ? 'DIM penalty applied' : 'Actual weight billed'})
          </span>
        </div>
      </div>

      {/* Rate Comparison Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        {/* Starshippp Rate */}
        <div
          style={{
            padding: '1.25rem',
            borderRadius: 0,
            backgroundColor: 'rgba(255, 107, 0, 0.12)',
            border: '2px solid var(--brand-orange)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: -10,
              right: 12,
              padding: '0.2rem 0.5rem',
              borderRadius: 0,
              backgroundColor: 'var(--brand-orange)',
              color: '#000',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              fontWeight: 800,
            }}
          >
            TIER-1 DISCOUNTED
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--brand-orange-light)', fontFamily: 'var(--font-mono)' }}>
            starshippp.com Rate
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-white)', margin: '0.35rem 0' }}>
            ${calc.starshipppRateEstimate}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#34D399', fontWeight: 700 }}>
            Save approx. ~{calc.estimatedSavingsPct}% vs counter rack rates
          </div>
        </div>

        {/* USPS Ground Advantage Card */}
        <div
          style={{
            padding: '1.25rem',
            borderRadius: 0,
            backgroundColor: 'rgba(34, 211, 238, 0.08)',
            border: '1px solid rgba(34, 211, 238, 0.3)',
          }}
        >
          <div style={{ fontSize: '0.8rem', color: 'var(--status-cyan)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
            USPS Ground Advantage
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-white)', margin: '0.35rem 0' }}>
            ${calc.billableWeightUsps.toFixed(2)}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Standard commercial postal rate
          </div>
        </div>

        {/* Standard Retail Rate */}
        <div
          style={{
            padding: '1.25rem',
            borderRadius: 0,
            backgroundColor: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-card)',
          }}
        >
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
            Standard UPS / FedEx Rack Rate
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#E2E8F0', margin: '0.35rem 0' }}>
            ${calc.standardCarrierRate}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
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
