import React, { useState } from 'react';
import { 
  Key, 
  Copy, 
  Check, 
  Lock, 
  Info 
} from 'lucide-react';
import type { ApiCredentialSummary } from '../../types/portal';

interface CredentialsVaultViewProps {
  credentials: ApiCredentialSummary[];
}

export const CredentialsVaultView: React.FC<CredentialsVaultViewProps> = ({ credentials }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (envVar: string) => {
    navigator.clipboard.writeText(envVar);
    setCopiedKey(envVar);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div style={{ marginTop: '1rem', marginBottom: '3rem' }}>
      {/* Intro Header */}
      <div
        className="glass-panel"
        style={{
          padding: '1.25rem 1.75rem',
          borderLeft: '4px solid var(--brand-orange)',
          marginBottom: '2rem',
          backgroundColor: 'rgba(9, 14, 29, 0.95)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
          <Lock size={18} color="var(--brand-orange)" />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#fff' }}>
            EXECUTIVE CREDENTIALS & API SECRET VAULT
          </h2>
        </div>
        <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
          Environment secrets, OAuth 2.0 token health, webhook signing keys, and permission scopes across all integrated services.
        </p>
      </div>

      {/* Grid of Credentials */}
      <div style={{ display: 'grid', gap: '1rem', marginBottom: '2.5rem' }}>
        {credentials.map((cred) => (
          <div
            key={cred.envVar}
            className="glass-panel"
            style={{
              padding: '1.25rem 1.5rem',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.25rem',
              backgroundColor: 'rgba(14, 22, 44, 0.6)',
              borderLeft: cred.status === 'configured' 
                ? '3px solid var(--status-emerald)' 
                : '3px solid #F59E0B',
            }}
          >
            {/* Left Col: Name & Service */}
            <div style={{ minWidth: 260, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <Key size={14} color="var(--brand-orange)" />
                <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff' }}>
                  {cred.name}
                </span>
                {cred.status === 'configured' ? (
                  <span
                    style={{
                      fontSize: '0.66rem',
                      fontFamily: 'var(--font-mono)',
                      color: '#34D399',
                      background: 'rgba(16, 185, 129, 0.1)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      padding: '0.1rem 0.4rem',
                    }}
                  >
                    CONFIGURED
                  </span>
                ) : (
                  <span
                    style={{
                      fontSize: '0.66rem',
                      fontFamily: 'var(--font-mono)',
                      color: '#FBBF24',
                      background: 'rgba(245, 158, 11, 0.1)',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                      padding: '0.1rem 0.4rem',
                    }}
                  >
                    PENDING INGESTION
                  </span>
                )}
              </div>

              <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                Target Service: <strong style={{ color: '#fff' }}>{cred.service}</strong>
              </div>

              <div style={{ marginTop: '0.35rem', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                Scope: {cred.scope}
              </div>
            </div>

            {/* Middle Col: Env Var & Masked Key */}
            <div style={{ minWidth: 240, flex: 1 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(5, 8, 17, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '0.35rem 0.75rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.76rem',
                  color: 'var(--brand-orange-light)',
                  marginBottom: '0.35rem',
                }}
              >
                <span>{cred.envVar}</span>
                <button
                  onClick={() => handleCopy(cred.envVar)}
                  title="Copy Env Var Name"
                  style={{ color: copiedKey === cred.envVar ? '#10B981' : 'var(--text-muted)' }}
                >
                  {copiedKey === cred.envVar ? <Check size={12} /> : <Copy size={12} />}
                </button>
              </div>

              <div style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                Fingerprint: <code style={{ color: '#94A3B8' }}>{cred.maskedKey}</code>
              </div>
            </div>

            {/* Right Col: Expiry & Rotation */}
            <div style={{ textAlign: 'right', minWidth: 160 }}>
              <div style={{ fontSize: '0.76rem', color: '#fff', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                {cred.expiresIn}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 2 }}>
                Rotated: {cred.lastRotated}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Deployment & Environment Setup Guide */}
      <div
        className="glass-panel"
        style={{
          padding: '1.5rem',
          backgroundColor: 'rgba(9, 14, 28, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
          <Info size={16} color="var(--brand-orange)" />
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0, color: '#fff', fontFamily: 'var(--font-mono)' }}>
            LOCAL & CLOUD ENVIRONMENT SETUP (PRODUCTION RUNTIME)
          </h3>
        </div>

        <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          To connect the live endpoints, copy these environment keys into your local <code style={{ color: 'var(--brand-orange-light)' }}>.env.local</code> or enterprise Cloud deployment settings:
        </p>

        <pre
          style={{
            background: 'rgba(5, 8, 17, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '1rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.76rem',
            color: '#38BDF8',
            overflowX: 'auto',
            lineHeight: 1.6,
          }}
        >
{`# --- GODADDY DOMAINS & DNS ---
VITE_GODADDY_PAT=gd_pat_your_token_here
VITE_GODADDY_API_KEY=your_godaddy_key_here
VITE_GODADDY_API_SECRET=your_godaddy_secret_here

# --- GOOGLE ENTERPRISE SUITE (SEARCH CONSOLE, GA4, GMAIL, CALENDAR) ---
VITE_GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
VITE_GOOGLE_CLIENT_SECRET=your_gcp_client_secret
VITE_GOOGLE_SERVICE_ACCOUNT_KEY=path_or_json_string
VITE_GA4_PROPERTY_ID=384910244
VITE_GOOGLE_CALENDAR_ID=primary

# --- TWENTY CRM (twenty.com) ---
VITE_TWENTY_API_URL=https://api.twenty.com
VITE_TWENTY_API_KEY=20_live_sec_...
VITE_TWENTY_WEBHOOK_SECRET=whsec_...

# --- XERO ACCOUNTING & BILLING ---
VITE_XERO_CLIENT_ID=your_xero_client_id
VITE_XERO_CLIENT_SECRET=your_xero_client_secret
VITE_XERO_TENANT_ID=your_xero_tenant_guid

# --- LOGISTICS SOFTWARE INGESTION (UPCOMING) ---
VITE_INTERNAL_INGESTION_KEY=your_internal_staging_key`}
        </pre>
      </div>
    </div>
  );
};
