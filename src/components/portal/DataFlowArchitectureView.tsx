import React from 'react';
import { 
  Globe, 
  Search, 
  BarChart3, 
  Database, 
  DollarSign, 
  Truck, 
  Mail, 
  Calendar, 
  ArrowDown, 
  Layers, 
  CheckCircle2, 
  Zap, 
  ShieldCheck 
} from 'lucide-react';

export const DataFlowArchitectureView: React.FC = () => {
  return (
    <div style={{ marginTop: '1rem', marginBottom: '3rem' }}>
      {/* Intro Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '1.25rem 1.75rem',
          borderLeft: '4px solid var(--status-cyan)',
          marginBottom: '2rem',
          backgroundColor: 'rgba(9, 14, 29, 0.95)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
          <Layers size={18} color="var(--status-cyan)" />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#fff' }}>
            EXECUTIVE END-TO-END DATA FLOW & INTEGRATION TOPOLOGY
          </h2>
        </div>
        <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
          How inbound traffic, lead submissions, calendar bookings, CRM pipelines, accounting ledgers, and warehouse logistics software interface with Starshippp.
        </p>
      </div>

      {/* Visual Pipeline Stages */}
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {/* Tier 1: Public Ingress & DNS Layer */}
        <div
          className="glass-panel"
          style={{
            padding: '1.5rem',
            borderTop: '3px solid var(--brand-orange)',
            backgroundColor: 'rgba(14, 22, 44, 0.7)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="telemetry-badge badge-amber" style={{ fontSize: '0.68rem' }}>TIER 1</span>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: '#fff' }}>
                Domain Infrastructure & Public Edge Routing (GoDaddy)
              </h3>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#10B981', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
              <CheckCircle2 size={13} />
              <span>TLS 1.3 Active &middot; DNS Propagated</span>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
            }}
          >
            <div style={{ background: 'rgba(5, 8, 17, 0.8)', padding: '0.85rem', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--brand-orange)', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                <Globe size={14} /> GoDaddy Registry & DNS
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                starshippp.com &middot; ns01.domaincontrol.com
                <br />
                748 Days Registration Remaining
              </div>
            </div>

            <div style={{ background: 'rgba(5, 8, 17, 0.8)', padding: '0.85rem', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#38BDF8', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                <ShieldCheck size={14} /> Edge SSL / Wildcard Certificate
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                SHA256withRSA &middot; OCSP Stapled
                <br />
                279 Days Remaining &middot; Auto-Renewed
              </div>
            </div>

            <div style={{ background: 'rgba(5, 8, 17, 0.8)', padding: '0.85rem', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10B981', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                <Mail size={14} /> Google Workspace MX / SPF / DKIM
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                aspmx.l.google.com &middot; v=spf1 Pass
                <br />
                2048-bit Cryptographic DKIM
              </div>
            </div>
          </div>
        </div>

        {/* Central Connecting Flow Indicator */}
        <div style={{ textAlign: 'center', margin: '-0.5rem 0' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0.85rem', background: 'rgba(255, 107, 0, 0.1)', border: '1px solid rgba(255, 107, 0, 0.3)', color: 'var(--brand-orange-light)', fontSize: '0.74rem', fontFamily: 'var(--font-mono)' }}>
            <ArrowDown size={12} /> SECURE INGRESS & INTERACTIVE DTC ENGAGEMENT
          </div>
        </div>

        {/* Tier 2: Google Enterprise & Discovery Stack */}
        <div
          className="glass-panel"
          style={{
            padding: '1.5rem',
            borderTop: '3px solid #38BDF8',
            backgroundColor: 'rgba(14, 22, 44, 0.7)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="telemetry-badge badge-amber" style={{ fontSize: '0.68rem', borderColor: '#38BDF8', color: '#38BDF8' }}>TIER 2</span>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: '#fff' }}>
                Google Enterprise Stack & Real-Time Intelligence
              </h3>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#38BDF8', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
              <Zap size={13} />
              <span>OAuth 2.0 Live Service Account</span>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
            }}
          >
            <div style={{ background: 'rgba(5, 8, 17, 0.8)', padding: '0.85rem', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#38BDF8', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                <Search size={14} /> Search Console API
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                Tracks 142k+ monthly impressions for Midwest 3PL, Anti-ShipBob, and TikTok Shop keywords.
              </div>
            </div>

            <div style={{ background: 'rgba(5, 8, 17, 0.8)', padding: '0.85rem', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#F59E0B', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                <BarChart3 size={14} /> GA4 Realtime Data API
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                Monitors active founder visitors, DIM calculator interactions, and conversion funnel drops.
              </div>
            </div>

            <div style={{ background: 'rgba(5, 8, 17, 0.8)', padding: '0.85rem', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#EF4444', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                <Mail size={14} /> Gmail Enterprise API
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                Transactional dispatch for rate audit analyses, quote proposals, and 1:00 PM EST floor alerts.
              </div>
            </div>

            <div style={{ background: 'rgba(5, 8, 17, 0.8)', padding: '0.85rem', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#3B82F6', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                <Calendar size={14} /> Calendar API
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                Automates Pontiac warehouse walkthrough bookings with executive hosts and floor escorts.
              </div>
            </div>
          </div>
        </div>

        {/* Central Connecting Flow Indicator */}
        <div style={{ textAlign: 'center', margin: '-0.5rem 0' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0.85rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#34D399', fontSize: '0.74rem', fontFamily: 'var(--font-mono)' }}>
            <ArrowDown size={12} /> CONVERSION INGESTION & PIPELINE ESCALATION
          </div>
        </div>

        {/* Tier 3: Twenty CRM & Xero Financial Engine */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {/* Twenty CRM Box */}
          <div
            className="glass-panel"
            style={{
              padding: '1.5rem',
              borderTop: '3px solid #10B981',
              backgroundColor: 'rgba(14, 22, 44, 0.7)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="telemetry-badge badge-emerald" style={{ fontSize: '0.68rem' }}>TIER 3A</span>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: '#fff' }}>
                  Twenty CRM Base (twenty.com)
                </h3>
              </div>
              <Database size={15} color="#10B981" />
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Modern open-source CRM managing founder profiles, Shopify order volumes, and deal progression across 5 sales stages.
            </p>

            <div style={{ display: 'grid', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.74rem' }}>
              <div style={{ background: 'rgba(5, 8, 17, 0.8)', padding: '0.5rem', border: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'space-between' }}>
                <span>Inbound Webhook Receiver:</span>
                <strong style={{ color: '#10B981' }}>200 OK (0 retries)</strong>
              </div>
              <div style={{ background: 'rgba(5, 8, 17, 0.8)', padding: '0.5rem', border: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'space-between' }}>
                <span>Open Opportunities:</span>
                <strong style={{ color: '#fff' }}>24 In-Flight ($34.2k MRR)</strong>
              </div>
              <div style={{ background: 'rgba(5, 8, 17, 0.8)', padding: '0.5rem', border: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'space-between' }}>
                <span>Direct Slack Channel Provision:</span>
                <strong style={{ color: '#F59E0B' }}>Automated on Lead Win</strong>
              </div>
            </div>
          </div>

          {/* Xero Box */}
          <div
            className="glass-panel"
            style={{
              padding: '1.5rem',
              borderTop: '3px solid #06B6D4',
              backgroundColor: 'rgba(14, 22, 44, 0.7)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="telemetry-badge" style={{ fontSize: '0.68rem', borderColor: '#06B6D4', color: '#06B6D4' }}>TIER 3B</span>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: '#fff' }}>
                  Xero Accounting & Billing Platform
                </h3>
              </div>
              <DollarSign size={15} color="#06B6D4" />
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Automated bi-weekly 3PL invoicing, postage pass-through reconciliation, and real-time operational margin telemetry.
            </p>

            <div style={{ display: 'grid', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.74rem' }}>
              <div style={{ background: 'rgba(5, 8, 17, 0.8)', padding: '0.5rem', border: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'space-between' }}>
                <span>Merchant Billing Invoices:</span>
                <strong style={{ color: '#06B6D4' }}>$84,200 Processed MTD</strong>
              </div>
              <div style={{ background: 'rgba(5, 8, 17, 0.8)', padding: '0.5rem', border: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'space-between' }}>
                <span>Carrier Ledger Pass-Through:</span>
                <strong style={{ color: '#fff' }}>$68,400 Escrow Reserves</strong>
              </div>
              <div style={{ background: 'rgba(5, 8, 17, 0.8)', padding: '0.5rem', border: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'space-between' }}>
                <span>Gross Fulfillment Margin:</span>
                <strong style={{ color: '#10B981' }}>48.2% Unit Economics</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Central Connecting Flow Indicator */}
        <div style={{ textAlign: 'center', margin: '-0.5rem 0' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0.85rem', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', color: '#FBBF24', fontSize: '0.74rem', fontFamily: 'var(--font-mono)' }}>
            <ArrowDown size={12} /> ENTERPRISE LOGISTICS SOFTWARE INGESTION (UPCOMING)
          </div>
        </div>

        {/* Tier 4: Internal Logistics Software Ingestion Bridge */}
        <div
          className="glass-panel"
          style={{
            padding: '1.5rem',
            borderTop: '3px solid #F59E0B',
            backgroundColor: 'rgba(20, 15, 10, 0.7)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="telemetry-badge badge-amber" style={{ fontSize: '0.68rem' }}>TIER 4</span>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: '#fff' }}>
                Existing Company Software & WMS Logistics Ingestion Engine
              </h3>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#FBBF24', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
              <Truck size={14} />
              <span>Staged for Ingestion</span>
            </div>
          </div>

          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            As discussed by leadership, this staging bridge is architected to ingest the company’s existing logistics software, warehouse management system (WMS), pack station barcode scanners, and inventory databases directly into this executive portal.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
            }}
          >
            <div style={{ background: 'rgba(5, 8, 17, 0.8)', padding: '0.85rem', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
              <div style={{ color: '#FBBF24', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                1. Legacy ERP / WMS Data Connector
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                High-throughput CDC event stream syncing active inventory SKUs and pallet locations.
              </div>
            </div>

            <div style={{ background: 'rgba(5, 8, 17, 0.8)', padding: '0.85rem', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
              <div style={{ color: '#FBBF24', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                2. Floor Scanner & Dispatch Buffer
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                Sub-second webhook ingestion recording 1:00 PM EST same-day order dispatch verification.
              </div>
            </div>

            <div style={{ background: 'rgba(5, 8, 17, 0.8)', padding: '0.85rem', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
              <div style={{ color: '#FBBF24', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                3. Carrier Label Injection Hook
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                Direct API link connecting scale weights, DIM calculation, and postage manifest generation.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
