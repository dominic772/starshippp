import React, { useState } from 'react';
import { 
  Globe, 
  Search, 
  BarChart3, 
  Mail, 
  Calendar, 
  Database, 
  DollarSign, 
  Truck, 
  Copy, 
  Check, 
  ExternalLink, 
  Play, 
  Activity 
} from 'lucide-react';
import type { ApiEndpoint } from '../../types/portal';

interface EndpointCardProps {
  endpoint: ApiEndpoint;
  onInspect: (endpoint: ApiEndpoint) => void;
  onSinglePing: (id: string) => Promise<void>;
}

export const EndpointCard: React.FC<EndpointCardProps> = ({
  endpoint,
  onInspect,
  onSinglePing,
}) => {
  const [copied, setCopied] = useState(false);
  const [isPinging, setIsPinging] = useState(false);
  const [pingSuccessPingMs, setPingSuccessPingMs] = useState<number | null>(null);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(endpoint.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePing = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPinging(true);
    await onSinglePing(endpoint.id);
    setIsPinging(false);
    setPingSuccessPingMs(endpoint.latencyMs);
    setTimeout(() => setPingSuccessPingMs(null), 3000);
  };

  const renderServiceIcon = () => {
    switch (endpoint.serviceIconName) {
      case 'globe': return <Globe size={16} color="var(--brand-orange)" />;
      case 'search': return <Search size={16} color="#38BDF8" />;
      case 'bar-chart': return <BarChart3 size={16} color="#F59E0B" />;
      case 'mail': return <Mail size={16} color="#EF4444" />;
      case 'calendar': return <Calendar size={16} color="#3B82F6" />;
      case 'database': return <Database size={16} color="#10B981" />;
      case 'dollar': return <DollarSign size={16} color="#06B6D4" />;
      case 'truck': return <Truck size={16} color="var(--brand-orange-light)" />;
      default: return <Activity size={16} color="var(--brand-orange)" />;
    }
  };

  const methodColor = 
    endpoint.method === 'GET' ? '#38BDF8' :
    endpoint.method === 'POST' ? '#F59E0B' :
    endpoint.method === 'PUT' ? '#A855F7' : '#EF4444';

  const rateLimitPct = Math.min(100, Math.round((endpoint.rateLimit.current / endpoint.rateLimit.max) * 100));

  return (
    <div
      className="glass-panel glass-panel-interactive"
      style={{
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        position: 'relative',
        borderLeft: endpoint.status === 'staged' 
          ? '3px solid #F59E0B' 
          : '3px solid var(--status-emerald)',
        background: 'rgba(9, 14, 29, 0.85)',
      }}
      onClick={() => onInspect(endpoint)}
    >
      <div>
        {/* Top Header: Stack Badge & HTTP Method */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div
              style={{
                width: 28,
                height: 28,
                background: 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              {renderServiceIcon()}
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                {endpoint.service}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                fontWeight: 800,
                color: methodColor,
                background: 'rgba(255, 255, 255, 0.04)',
                border: `1px solid ${methodColor}40`,
                padding: '0.15rem 0.45rem',
              }}
            >
              {endpoint.method}
            </span>

            {endpoint.status === 'healthy' ? (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#34D399',
                  background: 'rgba(16, 185, 129, 0.1)',
                  padding: '0.15rem 0.45rem',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                }}
              >
                <span className="pulse-dot" style={{ color: 'var(--status-emerald)' }} />
                <span>{endpoint.uptimePct}%</span>
              </span>
            ) : (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#FBBF24',
                  background: 'rgba(245, 158, 11, 0.1)',
                  padding: '0.15rem 0.45rem',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                }}
              >
                <span>STAGED</span>
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: '1rem',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '0.45rem',
            lineHeight: 1.3,
          }}
        >
          {endpoint.name}
        </h3>

        {/* URL Pill / Snippet */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(5, 8, 17, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '0.35rem 0.6rem',
            marginBottom: '0.85rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--text-secondary)',
          }}
        >
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '85%' }}>
            {endpoint.url}
          </span>
          <button
            onClick={handleCopy}
            title="Copy URL"
            style={{ color: copied ? '#10B981' : 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
          </button>
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: '0.79rem',
            color: 'var(--text-secondary)',
            marginBottom: '1rem',
            lineHeight: 1.45,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {endpoint.description}
        </p>

        {/* Telemetry Metrics Row */}
        {endpoint.metrics && endpoint.metrics.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.4rem',
              background: 'rgba(14, 22, 44, 0.5)',
              padding: '0.5rem',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              marginBottom: '0.85rem',
            }}
          >
            {endpoint.metrics.map((m, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.64rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  {m.label}
                </div>
                <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono)' }}>
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Controls & Stats */}
      <div>
        {/* Rate Limit & Latency Bar */}
        <div style={{ marginBottom: '0.85rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
            <span>Rate Quota: {endpoint.rateLimit.current} / {endpoint.rateLimit.max}</span>
            <span style={{ color: endpoint.latencyMs < 150 ? '#34D399' : '#FBBF24' }}>
              {pingSuccessPingMs ? `✓ ${pingSuccessPingMs}ms` : `${endpoint.latencyMs}ms`}
            </span>
          </div>
          <div style={{ width: '100%', height: 4, background: 'rgba(255, 255, 255, 0.1)' }}>
            <div
              style={{
                width: `${rateLimitPct}%`,
                height: '100%',
                background: rateLimitPct > 80 ? '#EF4444' : 'var(--brand-orange)',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>

        {/* Action Buttons: Ping & Inspect */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={handlePing}
            disabled={isPinging}
            style={{
              flex: 1,
              padding: '0.45rem',
              background: isPinging ? 'rgba(255, 107, 0, 0.2)' : 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#fff',
              fontSize: '0.76rem',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 107, 0, 0.15)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = isPinging ? 'rgba(255, 107, 0, 0.2)' : 'rgba(255, 255, 255, 0.06)')}
          >
            <Play size={11} color="var(--brand-orange)" />
            <span>{isPinging ? 'Pinging...' : 'Test Ping'}</span>
          </button>

          <button
            onClick={() => onInspect(endpoint)}
            style={{
              flex: 1,
              padding: '0.45rem',
              background: 'rgba(255, 107, 0, 0.15)',
              border: '1px solid var(--brand-orange)',
              color: 'var(--brand-orange-light)',
              fontSize: '0.76rem',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
            }}
          >
            <ExternalLink size={11} />
            <span>Inspect Spec</span>
          </button>
        </div>
      </div>
    </div>
  );
};
