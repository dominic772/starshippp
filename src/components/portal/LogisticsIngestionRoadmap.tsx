import React from 'react';
import { 
  Truck, 
  CheckCircle2, 
  Clock, 
  Cpu, 
  Radio 
} from 'lucide-react';

export const LogisticsIngestionRoadmap: React.FC = () => {
  return (
    <div style={{ marginTop: '1rem', marginBottom: '3rem' }}>
      {/* Intro Header */}
      <div
        className="glass-panel"
        style={{
          padding: '1.25rem 1.75rem',
          borderLeft: '4px solid #F59E0B',
          marginBottom: '2rem',
          backgroundColor: 'rgba(20, 15, 10, 0.95)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
          <Truck size={20} color="#F59E0B" />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#fff' }}>
            EXISTING COMPANY LOGISTICS SOFTWARE INGESTION PIPELINE
          </h2>
        </div>
        <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
          Dedicated staging framework prepared for ingesting existing proprietary logistics software, WMS floor databases, pack station scanners, and carrier manifest engines into this central executive portal.
        </p>
      </div>

      {/* 3 Ingestion Phases */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2.5rem',
        }}
      >
        {/* Phase 1: Architecture Prepared */}
        <div
          className="glass-panel"
          style={{
            padding: '1.5rem',
            borderTop: '3px solid var(--status-emerald)',
            backgroundColor: 'rgba(14, 22, 44, 0.7)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span className="telemetry-badge badge-emerald" style={{ fontSize: '0.7rem' }}>
              STAGE 1 &middot; COMPLETED
            </span>
            <CheckCircle2 size={16} color="var(--status-emerald)" />
          </div>

          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
            Portal Telemetry & Staging Schema
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
            Executive portal endpoints, data models, authentication handlers, and rate limit telemetry are fully staged and ready to accept live feeds.
          </p>

          <ul style={{ listStyle: 'none', display: 'grid', gap: '0.5rem', fontSize: '0.76rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: '#10B981' }}>✓</span> Schema & REST routes defined
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: '#10B981' }}>✓</span> Twenty CRM webhook link established
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: '#10B981' }}>✓</span> Xero 3PL billing model synchronized
            </li>
          </ul>
        </div>

        {/* Phase 2: Software Ingestion & Data Migration */}
        <div
          className="glass-panel"
          style={{
            padding: '1.5rem',
            borderTop: '3px solid #F59E0B',
            backgroundColor: 'rgba(20, 15, 10, 0.7)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span className="telemetry-badge badge-amber" style={{ fontSize: '0.7rem' }}>
              STAGE 2 &middot; NEXT PRIORITY
            </span>
            <Clock size={16} color="#F59E0B" />
          </div>

          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
            Existing Software Ingestion
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
            Ingesting existing company software and logistics modules: historical order manifests, client SKU matrices, and inventory location databases.
          </p>

          <ul style={{ listStyle: 'none', display: 'grid', gap: '0.5rem', fontSize: '0.76rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: '#F59E0B' }}>➔</span> Ingest company logistics code & database
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: '#F59E0B' }}>➔</span> Map legacy order tables to Twenty CRM
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: '#F59E0B' }}>➔</span> Link carrier ledger to Xero bank feed
            </li>
          </ul>
        </div>

        {/* Phase 3: Warehouse Floor Live Integration */}
        <div
          className="glass-panel"
          style={{
            padding: '1.5rem',
            borderTop: '3px solid #38BDF8',
            backgroundColor: 'rgba(14, 22, 44, 0.7)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span className="telemetry-badge" style={{ fontSize: '0.7rem', borderColor: '#38BDF8', color: '#38BDF8' }}>
              STAGE 3 &middot; PRODUCTION GO-LIVE
            </span>
            <Radio size={16} color="#38BDF8" />
          </div>

          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
            Pontiac Pack Station Live Loop
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
            Live barcode scanners, real-time scale scales, direct thermal printer feeds, and 1:00 PM EST SLA cutoff automated monitoring.
          </p>

          <ul style={{ listStyle: 'none', display: 'grid', gap: '0.5rem', fontSize: '0.76rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: '#38BDF8' }}>○</span> Sub-second barcode scan ingestion
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: '#38BDF8' }}>○</span> Auto-alerts to #starshippp-ops-floor
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: '#38BDF8' }}>○</span> Executive SLA violation prevention
            </li>
          </ul>
        </div>
      </div>

      {/* Technical Ingestion Specification Table */}
      <div
        className="glass-panel"
        style={{
          padding: '1.75rem',
          backgroundColor: 'rgba(9, 14, 29, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Cpu size={16} color="var(--brand-orange)" />
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', margin: 0, fontFamily: 'var(--font-mono)' }}>
            TARGET LOGISTICS DATA STREAMS FOR INGESTION
          </h3>
        </div>

        <div style={{ display: 'grid', gap: '0.75rem' }}>
          <div
            style={{
              padding: '0.85rem 1rem',
              background: 'rgba(5, 8, 17, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <div>
              <strong style={{ color: '#fff', fontSize: '0.86rem' }}>Warehouse Bin & Pallet Matrix</strong>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Ingests active physical coordinates (Aisle, Rack, Shelf, Bin) for Pontiac facility.
              </div>
            </div>
            <span className="telemetry-badge" style={{ fontSize: '0.66rem' }}>READY FOR INGESTION</span>
          </div>

          <div
            style={{
              padding: '0.85rem 1rem',
              background: 'rgba(5, 8, 17, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <div>
              <strong style={{ color: '#fff', fontSize: '0.86rem' }}>Pack Station Barcode Verification Engine</strong>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Captures pick scan, item scan, and scale weight to enforce zero-mispack SLA.
              </div>
            </div>
            <span className="telemetry-badge" style={{ fontSize: '0.66rem' }}>BUFFER STAGED</span>
          </div>

          <div
            style={{
              padding: '0.85rem 1rem',
              background: 'rgba(5, 8, 17, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <div>
              <strong style={{ color: '#fff', fontSize: '0.86rem' }}>Carrier Manifest & Label Injection Bridge</strong>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Direct label purchasing via commercial bulk discount contracts (UPS, FedEx, USPS).
              </div>
            </div>
            <span className="telemetry-badge" style={{ fontSize: '0.66rem' }}>CARRIER LINKED</span>
          </div>
        </div>
      </div>
    </div>
  );
};
