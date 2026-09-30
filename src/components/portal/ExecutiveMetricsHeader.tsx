import React from 'react';
import { 
  Activity, 
  Server, 
  Clock, 
  Radio, 
  RefreshCw, 
  CheckCircle2, 
  Zap, 
  Layers, 
  Key, 
  Network, 
  Truck 
} from 'lucide-react';
import type { ServiceCategory } from '../../types/portal';

interface ExecutiveMetricsHeaderProps {
  totalEndpoints: number;
  healthyCount: number;
  warningCount: number;
  stagedCount: number;
  avgLatency: number;
  isPingingAll: boolean;
  onPingAll: () => void;
  activeTab: 'endpoints' | 'architecture' | 'credentials' | 'audit' | 'ingestion';
  setActiveTab: (tab: 'endpoints' | 'architecture' | 'credentials' | 'audit' | 'ingestion') => void;
  selectedCategory: 'all' | ServiceCategory;
  setSelectedCategory: (cat: 'all' | ServiceCategory) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const ExecutiveMetricsHeader: React.FC<ExecutiveMetricsHeaderProps> = ({
  totalEndpoints,
  healthyCount,
  avgLatency,
  stagedCount,
  isPingingAll,
  onPingAll,
  activeTab,
  setActiveTab,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
}) => {
  const categories: { id: 'all' | ServiceCategory; label: string; count?: number }[] = [
    { id: 'all', label: 'All Stacks' },
    { id: 'domain-infra', label: 'GoDaddy Infra (3)' },
    { id: 'google-suite', label: 'Google Suite (7)' },
    { id: 'crm', label: 'Twenty CRM (3)' },
    { id: 'accounting', label: 'Xero Billing (3)' },
    { id: 'logistics-ingestion', label: 'Logistics Staged (2)' },
  ];

  return (
    <div style={{ marginBottom: '2.5rem' }}>
      {/* Executive Command Strip */}
      <div
        className="glass-panel"
        style={{
          padding: '1.25rem 1.75rem',
          borderLeft: '4px solid var(--brand-orange)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          marginBottom: '1.5rem',
          backgroundColor: 'rgba(9, 14, 29, 0.95)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              width: 44,
              height: 44,
              background: 'rgba(255, 107, 0, 0.15)',
              border: '1px solid var(--brand-orange)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--brand-orange)',
            }}
          >
            <Server size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
                EXECUTIVE MANAGEMENT PORTAL
              </h1>
              <span className="telemetry-badge badge-amber" style={{ fontSize: '0.68rem', padding: '0.2rem 0.6rem' }}>
                MISSION CONTROL
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
              Unified API Telemetry &middot; GoDaddy DNS &middot; Google Full Stack &middot; Twenty CRM &middot; Xero Platform &middot; Ingestion Engine
            </p>
          </div>
        </div>

        {/* Global Action: Trigger Health Probe */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              padding: '0.4rem 0.85rem',
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              borderLeft: '3px solid var(--status-emerald)',
              color: '#34D399',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.76rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span className="pulse-dot" style={{ color: 'var(--status-emerald)' }} />
            <span>GLOBAL STATUS: ALL INTEGRATIONS ACTIVE</span>
          </div>

          <button
            onClick={onPingAll}
            disabled={isPingingAll}
            className="btn-primary"
            style={{
              padding: '0.65rem 1.25rem',
              fontSize: '0.86rem',
              gap: '0.45rem',
              cursor: isPingingAll ? 'wait' : 'pointer',
              opacity: isPingingAll ? 0.85 : 1,
            }}
          >
            <RefreshCw size={14} className={isPingingAll ? 'animate-spin' : ''} style={{ animation: isPingingAll ? 'spin 1s linear infinite' : 'none' }} />
            <span>{isPingingAll ? 'Pinging Endpoints...' : 'Run Global Diagnostic'}</span>
          </button>
        </div>
      </div>

      {/* 4 Executive KPI Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        {/* KPI 1: Monitored Endpoints */}
        <div
          className="glass-panel"
          style={{
            padding: '1.2rem',
            borderTop: '3px solid var(--brand-orange)',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Monitored Endpoints
            </span>
            <Activity size={16} color="var(--brand-orange)" />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-white)', fontFamily: 'var(--font-mono)' }}>
            {totalEndpoints} <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Endpoints</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#10B981', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <CheckCircle2 size={12} />
            <span>{healthyCount} Active / {stagedCount} Staged Pipeline</span>
          </div>
        </div>

        {/* KPI 2: Global Fleet Uptime */}
        <div
          className="glass-panel"
          style={{
            padding: '1.2rem',
            borderTop: '3px solid var(--status-emerald)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Fleet Availability
            </span>
            <Radio size={16} color="var(--status-emerald)" />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#34D399', fontFamily: 'var(--font-mono)' }}>
            99.98%
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
            Rolling 30-Day SLA &middot; 0 Outages
          </div>
        </div>

        {/* KPI 3: Fleet Latency */}
        <div
          className="glass-panel"
          style={{
            padding: '1.2rem',
            borderTop: '3px solid var(--status-cyan)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Average Response Time
            </span>
            <Clock size={16} color="var(--status-cyan)" />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#38BDF8', fontFamily: 'var(--font-mono)' }}>
            {avgLatency} <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>ms</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
            Fastest: GoDaddy SSL (76ms)
          </div>
        </div>

        {/* KPI 4: 24h Telemetry Volume */}
        <div
          className="glass-panel"
          style={{
            padding: '1.2rem',
            borderTop: '3px solid #A855F7',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Daily Sync Volume
            </span>
            <Zap size={16} color="#A855F7" />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-white)', fontFamily: 'var(--font-mono)' }}>
            38,420
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--brand-orange-light)', marginTop: '0.35rem' }}>
            +18.4% weekly throughput
          </div>
        </div>
      </div>

      {/* Main Navigation Views / Tabs */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          paddingBottom: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          <button
            onClick={() => setActiveTab('endpoints')}
            style={{
              padding: '0.55rem 1.1rem',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.88rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: activeTab === 'endpoints' ? 'var(--brand-orange)' : 'rgba(255, 255, 255, 0.05)',
              color: activeTab === 'endpoints' ? '#050811' : 'var(--text-secondary)',
              border: `1px solid ${activeTab === 'endpoints' ? 'var(--brand-orange)' : 'rgba(255, 255, 255, 0.1)'}`,
              transition: 'all 0.15s ease',
            }}
          >
            <Layers size={14} />
            <span>Endpoint Matrix ({totalEndpoints})</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            style={{
              padding: '0.55rem 1.1rem',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.88rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: activeTab === 'architecture' ? 'var(--brand-orange)' : 'rgba(255, 255, 255, 0.05)',
              color: activeTab === 'architecture' ? '#050811' : 'var(--text-secondary)',
              border: `1px solid ${activeTab === 'architecture' ? 'var(--brand-orange)' : 'rgba(255, 255, 255, 0.1)'}`,
              transition: 'all 0.15s ease',
            }}
          >
            <Network size={14} />
            <span>Data Flow Architecture</span>
          </button>

          <button
            onClick={() => setActiveTab('credentials')}
            style={{
              padding: '0.55rem 1.1rem',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.88rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: activeTab === 'credentials' ? 'var(--brand-orange)' : 'rgba(255, 255, 255, 0.05)',
              color: activeTab === 'credentials' ? '#050811' : 'var(--text-secondary)',
              border: `1px solid ${activeTab === 'credentials' ? 'var(--brand-orange)' : 'rgba(255, 255, 255, 0.1)'}`,
              transition: 'all 0.15s ease',
            }}
          >
            <Key size={14} />
            <span>API Credentials Vault</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            style={{
              padding: '0.55rem 1.1rem',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.88rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: activeTab === 'audit' ? 'var(--brand-orange)' : 'rgba(255, 255, 255, 0.05)',
              color: activeTab === 'audit' ? '#050811' : 'var(--text-secondary)',
              border: `1px solid ${activeTab === 'audit' ? 'var(--brand-orange)' : 'rgba(255, 255, 255, 0.1)'}`,
              transition: 'all 0.15s ease',
            }}
          >
            <Radio size={14} />
            <span>Live Audit Stream</span>
          </button>

          <button
            onClick={() => setActiveTab('ingestion')}
            style={{
              padding: '0.55rem 1.1rem',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.88rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: activeTab === 'ingestion' ? 'var(--brand-orange)' : 'rgba(255, 107, 0, 0.1)',
              color: activeTab === 'ingestion' ? '#050811' : 'var(--brand-orange-light)',
              border: '1px solid rgba(255, 107, 0, 0.35)',
              transition: 'all 0.15s ease',
            }}
          >
            <Truck size={14} />
            <span>Logistics Ingestion Bridge</span>
            <span
              style={{
                fontSize: '0.62rem',
                padding: '0.1rem 0.35rem',
                background: 'rgba(255, 107, 0, 0.3)',
                color: '#fff',
                fontFamily: 'var(--font-mono)',
              }}
            >
              UPCOMING
            </span>
          </button>
        </div>

        {/* Search Filter for Matrix View */}
        {activeTab === 'endpoints' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="text"
              placeholder="Filter by endpoint, URL, or method..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '0.5rem 0.85rem',
                background: 'rgba(14, 22, 44, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#fff',
                fontSize: '0.82rem',
                width: 260,
                outline: 'none',
              }}
            />
          </div>
        )}
      </div>

      {/* Category Pills (Visible when in Endpoints view) */}
      {activeTab === 'endpoints' && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.4rem',
            marginTop: '0.85rem',
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: '0.35rem 0.75rem',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                background: selectedCategory === cat.id ? 'rgba(255, 107, 0, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                color: selectedCategory === cat.id ? 'var(--brand-orange-light)' : 'var(--text-secondary)',
                border: `1px solid ${selectedCategory === cat.id ? 'var(--brand-orange)' : 'rgba(255, 255, 255, 0.08)'}`,
                borderLeft: selectedCategory === cat.id ? '3px solid var(--brand-orange)' : '1px solid rgba(255, 255, 255, 0.08)',
                transition: 'all 0.15s ease',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
