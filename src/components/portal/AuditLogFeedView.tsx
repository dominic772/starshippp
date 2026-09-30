import React, { useState } from 'react';
import { 
  Radio, 
  CheckCircle2, 
  RefreshCw 
} from 'lucide-react';
import type { SystemAuditLog } from '../../types/portal';

interface AuditLogFeedViewProps {
  logs: SystemAuditLog[];
  onRefresh: () => void;
}

export const AuditLogFeedView: React.FC<AuditLogFeedViewProps> = ({ logs, onRefresh }) => {
  const [filterService, setFilterService] = useState<string>('all');

  const filteredLogs = filterService === 'all' 
    ? logs 
    : logs.filter((l) => l.service.toLowerCase().includes(filterService.toLowerCase()));

  return (
    <div style={{ marginTop: '1rem', marginBottom: '3rem' }}>
      {/* Intro Header */}
      <div
        className="glass-panel"
        style={{
          padding: '1.25rem 1.75rem',
          borderLeft: '4px solid var(--status-emerald)',
          marginBottom: '2rem',
          backgroundColor: 'rgba(9, 14, 29, 0.95)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
            <Radio size={18} color="var(--status-emerald)" />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#fff' }}>
              LIVE TELEMETRY & API AUDIT STREAM
            </h2>
          </div>
          <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
            Real-time streaming ledger of all inbound webhooks, outbound API polls, token refreshes, and SLA health checks.
          </p>
        </div>

        {/* Filter & Refresh */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <select
            value={filterService}
            onChange={(e) => setFilterService(e.target.value)}
            style={{
              padding: '0.45rem 0.85rem',
              background: 'rgba(14, 22, 44, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#fff',
              fontSize: '0.8rem',
              outline: 'none',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <option value="all">All Services</option>
            <option value="Google">Google Suite (GA4, GSC, Gmail, Cal)</option>
            <option value="Twenty">Twenty CRM</option>
            <option value="Xero">Xero Accounting</option>
            <option value="GoDaddy">GoDaddy DNS / SSL</option>
          </select>

          <button
            onClick={onRefresh}
            className="btn-solid-dark"
            style={{
              padding: '0.45rem 0.85rem',
              fontSize: '0.8rem',
              gap: '0.35rem',
            }}
          >
            <RefreshCw size={12} />
            <span>Poll Feed</span>
          </button>
        </div>
      </div>

      {/* Audit Log Table */}
      <div
        className="glass-panel"
        style={{
          overflowX: 'auto',
          backgroundColor: 'rgba(5, 8, 17, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(14, 22, 44, 0.6)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.75rem 1rem' }}>TIMESTAMP</th>
              <th style={{ padding: '0.75rem 1rem' }}>SERVICE</th>
              <th style={{ padding: '0.75rem 1rem' }}>ACTION / REQUEST</th>
              <th style={{ padding: '0.75rem 1rem' }}>STATUS</th>
              <th style={{ padding: '0.75rem 1rem' }}>ROUNDTRIP</th>
              <th style={{ padding: '0.75rem 1rem' }}>INITIATOR</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr
                key={log.id}
                style={{
                  borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                  transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>
                  {log.timestamp}
                </td>
                <td style={{ padding: '0.75rem 1rem', color: '#fff', fontWeight: 600 }}>
                  {log.service}
                </td>
                <td style={{ padding: '0.75rem 1rem', color: '#38BDF8', maxWidth: 380, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {log.action}
                </td>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      color: '#34D399',
                      background: 'rgba(16, 185, 129, 0.12)',
                      padding: '0.15rem 0.45rem',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                    }}
                  >
                    <CheckCircle2 size={11} />
                    <span>{log.status}</span>
                  </span>
                </td>
                <td style={{ padding: '0.75rem 1rem', color: log.latencyMs < 150 ? '#34D399' : '#FBBF24' }}>
                  {log.latencyMs}ms
                </td>
                <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>
                  {log.initiator}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
