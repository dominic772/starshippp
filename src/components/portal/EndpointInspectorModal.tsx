import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  ExternalLink, 
  Play, 
  Key, 
  Clock, 
  Terminal 
} from 'lucide-react';
import type { ApiEndpoint } from '../../types/portal';

interface EndpointInspectorModalProps {
  endpoint: ApiEndpoint | null;
  onClose: () => void;
  onPing: (id: string) => Promise<void>;
}

export const EndpointInspectorModal: React.FC<EndpointInspectorModalProps> = ({
  endpoint,
  onClose,
  onPing,
}) => {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedResponse, setCopiedResponse] = useState(false);
  const [isPinging, setIsPinging] = useState(false);
  const [lastPingResult, setLastPingResult] = useState<{ status: string; latency: number } | null>(null);

  if (!endpoint) return null;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(endpoint.url);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleCopyResponse = () => {
    if (endpoint.sampleResponse) {
      navigator.clipboard.writeText(endpoint.sampleResponse);
      setCopiedResponse(true);
      setTimeout(() => setCopiedResponse(false), 2000);
    }
  };

  const handleExecutePing = async () => {
    setIsPinging(true);
    await onPing(endpoint.id);
    setIsPinging(false);
    setLastPingResult({
      status: endpoint.status === 'staged' ? '200 OK (Staged Sandbox)' : '200 OK',
      latency: endpoint.latencyMs,
    });
  };

  const methodColor = 
    endpoint.method === 'GET' ? '#38BDF8' :
    endpoint.method === 'POST' ? '#F59E0B' :
    endpoint.method === 'PUT' ? '#A855F7' : '#EF4444';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--modal-overlay)',
        backdropFilter: 'blur(12px)',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: 860,
          maxHeight: '92vh',
          overflowY: 'auto',
          backgroundColor: 'var(--modal-bg)',
          border: '1px solid var(--brand-orange)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
          position: 'relative',
          padding: '2rem',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            color: 'var(--text-secondary)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.4rem',
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                fontWeight: 800,
                color: methodColor,
                background: 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${methodColor}60`,
                padding: '0.2rem 0.6rem',
              }}
            >
              {endpoint.method}
            </span>
            <span className="telemetry-badge badge-amber" style={{ fontSize: '0.7rem' }}>
              {endpoint.categoryLabel}
            </span>
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
              Auth: {endpoint.authType}
            </span>
          </div>

          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
            {endpoint.name}
          </h2>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0 }}>
            {endpoint.description}
          </p>
        </div>

        {/* Live URL & Interactive Ping Bar */}
        <div
          style={{
            background: 'rgba(5, 8, 17, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '0.85rem 1.25rem',
            marginBottom: '1.75rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flex: 1, minWidth: 280 }}>
            <Terminal size={16} color="var(--brand-orange)" />
            <code
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                color: '#38BDF8',
                wordBreak: 'break-all',
              }}
            >
              {endpoint.url}
            </code>
            <button
              onClick={handleCopyUrl}
              title="Copy Endpoint URL"
              style={{ color: copiedUrl ? '#10B981' : 'var(--text-muted)', marginLeft: 4 }}
            >
              {copiedUrl ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {lastPingResult && (
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: '#34D399',
                  background: 'rgba(16, 185, 129, 0.15)',
                  padding: '0.3rem 0.65rem',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                }}
              >
                ✓ {lastPingResult.status} ({lastPingResult.latency}ms)
              </span>
            )}

            <button
              onClick={handleExecutePing}
              disabled={isPinging}
              className="btn-primary"
              style={{
                padding: '0.45rem 1rem',
                fontSize: '0.82rem',
                gap: '0.4rem',
              }}
            >
              <Play size={12} />
              <span>{isPinging ? 'Pinging Live...' : 'Send Test Ping'}</span>
            </button>
          </div>
        </div>

        {/* 2 Column Details: Environment Vars & Rate Quotas */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
            marginBottom: '1.75rem',
          }}
        >
          {/* Col 1: Security & Required Config */}
          <div
            style={{
              padding: '1rem',
              background: 'rgba(14, 22, 44, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.65rem' }}>
              <Key size={14} color="var(--brand-orange)" />
              <span style={{ fontSize: '0.78rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#fff', textTransform: 'uppercase' }}>
                Required Credentials & Env Vars
              </span>
            </div>
            <div style={{ display: 'grid', gap: '0.35rem' }}>
              {endpoint.envVarRequired.map((v) => (
                <div
                  key={v}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.74rem',
                    background: 'rgba(5, 8, 17, 0.6)',
                    padding: '0.25rem 0.5rem',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <span style={{ color: 'var(--brand-orange-light)' }}>{v}</span>
                  <span style={{ color: '#10B981', fontSize: '0.68rem' }}>✓ Configured</span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 2: Telemetry & SLA */}
          <div
            style={{
              padding: '1rem',
              background: 'rgba(14, 22, 44, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.65rem' }}>
              <Clock size={14} color="var(--status-cyan)" />
              <span style={{ fontSize: '0.78rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#fff', textTransform: 'uppercase' }}>
                SLA & Rate Limit Window
              </span>
            </div>
            <div style={{ display: 'grid', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Rolling 30-Day Uptime:</span>
                <strong style={{ color: '#34D399', fontFamily: 'var(--font-mono)' }}>{endpoint.uptimePct}%</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Current Hourly Quota:</span>
                <strong style={{ color: '#fff', fontFamily: 'var(--font-mono)' }}>{endpoint.rateLimit.current} of {endpoint.rateLimit.max} calls</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Window Reset:</span>
                <strong style={{ color: 'var(--brand-orange-light)', fontFamily: 'var(--font-mono)' }}>{endpoint.rateLimit.resetIn}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Request Headers Section */}
        {endpoint.headers && Object.keys(endpoint.headers).length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <h4
              style={{
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                color: 'var(--brand-orange-light)',
                marginBottom: '0.5rem',
              }}
            >
              Request Headers
            </h4>
            <div
              style={{
                background: 'rgba(5, 8, 17, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
              }}
            >
              {Object.entries(endpoint.headers).map(([k, v]) => (
                <div key={k} style={{ marginBottom: 4 }}>
                  <span style={{ color: '#F59E0B' }}>{k}:</span> <span style={{ color: 'var(--text-secondary)' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sample Payload (if present) */}
        {endpoint.samplePayload && (
          <div style={{ marginBottom: '1.5rem' }}>
            <h4
              style={{
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                color: 'var(--brand-orange-light)',
                marginBottom: '0.5rem',
              }}
            >
              Sample Request Payload
            </h4>
            <pre
              style={{
                background: 'rgba(5, 8, 17, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '0.85rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                color: '#E2E8F0',
                overflowX: 'auto',
                maxHeight: 180,
              }}
            >
              {endpoint.samplePayload}
            </pre>
          </div>
        )}

        {/* Sample Live Response */}
        {endpoint.sampleResponse && (
          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h4
                style={{
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                  color: 'var(--status-emerald)',
                  margin: 0,
                }}
              >
                Sample 200 OK Response Body
              </h4>
              <button
                onClick={handleCopyResponse}
                style={{
                  fontSize: '0.72rem',
                  color: copiedResponse ? '#10B981' : 'var(--text-muted)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                {copiedResponse ? <Check size={12} /> : <Copy size={12} />}
                <span>{copiedResponse ? 'Copied' : 'Copy Response'}</span>
              </button>
            </div>
            <pre
              style={{
                background: 'rgba(5, 8, 17, 0.95)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                padding: '0.85rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                color: '#34D399',
                overflowX: 'auto',
                maxHeight: 220,
              }}
            >
              {endpoint.sampleResponse}
            </pre>
          </div>
        )}

        {/* Footer Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1.25rem' }}>
          {endpoint.docUrl && endpoint.docUrl !== '#' ? (
            <a
              href={endpoint.docUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                color: 'var(--brand-orange-light)',
                fontSize: '0.82rem',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <span>View Official API Docs</span>
              <ExternalLink size={12} />
            </a>
          ) : (
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              Internal Starshippp Spec
            </span>
          )}

          <button
            onClick={onClose}
            className="btn-secondary"
            style={{
              padding: '0.5rem 1.25rem',
              fontSize: '0.84rem',
            }}
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
