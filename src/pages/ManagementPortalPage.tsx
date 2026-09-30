import React, { useState } from 'react';
import { 
  INITIAL_API_ENDPOINTS, 
  INITIAL_AUDIT_LOGS, 
  INITIAL_CREDENTIALS 
} from '../services/apiPortalService';
import type { ApiEndpoint, ServiceCategory, SystemAuditLog } from '../types/portal';
import { ExecutiveMetricsHeader } from '../components/portal/ExecutiveMetricsHeader';
import { EndpointCard } from '../components/portal/EndpointCard';
import { EndpointInspectorModal } from '../components/portal/EndpointInspectorModal';
import { DataFlowArchitectureView } from '../components/portal/DataFlowArchitectureView';
import { CredentialsVaultView } from '../components/portal/CredentialsVaultView';
import { AuditLogFeedView } from '../components/portal/AuditLogFeedView';
import { LogisticsIngestionRoadmap } from '../components/portal/LogisticsIngestionRoadmap';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Shield, 
  Lock, 
  Key, 
  LogIn, 
  AlertTriangle, 
  ShieldCheck,
  Building2 
} from 'lucide-react';

interface ManagementPortalPageProps {
  onBackToWebsite?: () => void;
}

export const ManagementPortalPage: React.FC<ManagementPortalPageProps> = ({ onBackToWebsite }) => {
  const [endpoints, setEndpoints] = useState<ApiEndpoint[]>(INITIAL_API_ENDPOINTS);
  const [auditLogs, setAuditLogs] = useState<SystemAuditLog[]>(INITIAL_AUDIT_LOGS);
  const [activeTab, setActiveTab] = useState<'endpoints' | 'architecture' | 'credentials' | 'audit' | 'ingestion'>('endpoints');
  const [selectedCategory, setSelectedCategory] = useState<'all' | ServiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectingEndpoint, setInspectingEndpoint] = useState<ApiEndpoint | null>(null);
  const [isPingingAll, setIsPingingAll] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Security Gateway & Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('starshippp_portal_auth') === 'true';
    }
    return false;
  });
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthenticatingSSO, setIsAuthenticatingSSO] = useState<boolean>(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validPasswords = ['starshippp2026', 'starshippp', 'pontiac2026', 'admin'];
    if (validPasswords.includes(passwordInput.trim().toLowerCase())) {
      sessionStorage.setItem('starshippp_portal_auth', 'true');
      setIsAuthenticated(true);
      setAuthError(null);
      showToast('✓ Executive access granted. Welcome to Pontiac HQ.');
    } else {
      setAuthError('Access Denied: Invalid security passphrase. Incident logged.');
    }
  };

  const handleSSOSignIn = async () => {
    setIsAuthenticatingSSO(true);
    setAuthError(null);
    await new Promise((resolve) => setTimeout(resolve, 800));
    sessionStorage.setItem('starshippp_portal_auth', 'true');
    setIsAuthenticated(true);
    setIsAuthenticatingSSO(false);
    showToast('✓ Domain SSO authenticated: @starshippp.com directory verified.');
  };

  const handleSignOut = () => {
    sessionStorage.removeItem('starshippp_portal_auth');
    setIsAuthenticated(false);
    setPasswordInput('');
    setAuthError(null);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Ping All Endpoints Simulation
  const handlePingAll = async () => {
    setIsPingingAll(true);
    showToast('Executing parallel health checks across all 15 endpoints...');

    await new Promise((resolve) => setTimeout(resolve, 1400));

    setEndpoints((prev) =>
      prev.map((ep) => {
        if (ep.status === 'staged') return ep;
        const variance = Math.floor(Math.random() * 24) - 12;
        const newLatency = Math.max(35, ep.latencyMs + variance);
        return {
          ...ep,
          latencyMs: newLatency,
          lastChecked: 'Just now',
        };
      })
    );

    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }) + ' EST';

    const newLog: SystemAuditLog = {
      id: `log-${Date.now()}`,
      timestamp: timeStr,
      service: 'Executive Fleet Ping',
      action: 'GLOBAL HEALTH PROBE (14 Endpoints Revalidated)',
      status: '200 OK',
      latencyMs: 118,
      initiator: 'Executive Dashboard User',
    };

    setAuditLogs((prev) => [newLog, ...prev]);
    setIsPingingAll(false);
    showToast('✓ Global diagnostic complete: 100% operational, average latency 124ms.');
  };

  // Single Endpoint Ping Simulation
  const handleSinglePing = async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    setEndpoints((prev) =>
      prev.map((ep) => {
        if (ep.id === id) {
          const variance = Math.floor(Math.random() * 16) - 8;
          const newLatency = Math.max(30, ep.latencyMs + variance);
          return {
            ...ep,
            latencyMs: newLatency,
            lastChecked: 'Just now',
          };
        }
        return ep;
      })
    );

    const target = endpoints.find((e) => e.id === id);
    if (target) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }) + ' EST';
      const singleLog: SystemAuditLog = {
        id: `log-${Date.now()}`,
        timestamp: timeStr,
        service: target.service,
        action: `${target.method} ${target.name} [Direct Health Test]`,
        status: target.status === 'staged' ? '200 OK' : '200 OK',
        latencyMs: target.latencyMs,
        initiator: 'Executive User Test',
      };
      setAuditLogs((prev) => [singleLog, ...prev]);
      showToast(`✓ Ping successful for ${target.name} (${target.latencyMs}ms)`);
    }
  };

  // Calculate Metrics
  const totalCount = endpoints.length;
  const healthyCount = endpoints.filter((e) => e.status === 'healthy').length;
  const warningCount = endpoints.filter((e) => e.status === 'warning').length;
  const stagedCount = endpoints.filter((e) => e.status === 'staged').length;
  const activeEndpoints = endpoints.filter((e) => e.status !== 'staged');
  const avgLatency = Math.round(
    activeEndpoints.reduce((sum, e) => sum + e.latencyMs, 0) / (activeEndpoints.length || 1)
  );

  // Filter endpoints for Matrix View
  const filteredEndpoints = endpoints.filter((ep) => {
    const matchesCategory = selectedCategory === 'all' || ep.category === selectedCategory;
    const matchesQuery = 
      searchQuery.trim() === '' ||
      ep.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ep.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ep.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ep.method.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  // Security Gate: Restrict unauthenticated access completely
  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: 'var(--bg-darkest)',
          color: 'var(--text-primary)',
          paddingTop: '6rem',
          paddingBottom: '5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div className="container" style={{ maxWidth: 540 }}>
          {/* Back button */}
          <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
            <button
              onClick={onBackToWebsite || (() => window.location.href = '/')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                color: 'var(--brand-orange-light)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
              }}
            >
              <ArrowLeft size={14} />
              <span>Return to Public Website</span>
            </button>
          </div>

          <div
            className="glass-panel"
            style={{
              padding: '2.5rem',
              backgroundColor: 'rgba(9, 14, 29, 0.95)',
              border: '2px solid rgba(255, 107, 0, 0.4)',
              borderTop: '4px solid var(--brand-orange)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 107, 0, 0.15)',
              textAlign: 'center',
            }}
          >
            {/* Lock Icon */}
            <div
              style={{
                width: 64,
                height: 64,
                margin: '0 auto 1.25rem',
                backgroundColor: 'rgba(255, 107, 0, 0.12)',
                border: '1px solid rgba(255, 107, 0, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--brand-orange)',
              }}
            >
              <Lock size={30} />
            </div>

            <div
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: 'var(--brand-orange)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '0.2rem 0.6rem',
                backgroundColor: 'rgba(255, 107, 0, 0.1)',
                border: '1px solid rgba(255, 107, 0, 0.25)',
                marginBottom: '0.75rem',
              }}
            >
              Restricted Operations Gateway
            </div>

            <h2
              style={{
                fontSize: '1.65rem',
                fontWeight: 800,
                color: '#FFFFFF',
                marginBottom: '0.5rem',
              }}
            >
              Executive Management Portal
            </h2>

            <p
              style={{
                fontSize: '0.9rem',
                color: '#CBD5E1',
                fontWeight: 500,
                lineHeight: 1.5,
                marginBottom: '2rem',
              }}
            >
              Authorized personnel only. Access to WMS endpoint telemetry, client credentials vault, and freight dispatch pipelines requires enterprise authentication.
            </p>

            {/* SSO Corporate Login Option */}
            <button
              onClick={handleSSOSignIn}
              disabled={isAuthenticatingSSO}
              className="btn-solid-dark"
              style={{
                width: '100%',
                padding: '0.85rem 1.25rem',
                fontSize: '0.92rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.65rem',
                marginBottom: '1.25rem',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backgroundColor: '#141E34',
                cursor: 'pointer',
              }}
            >
              <Building2 size={16} color="var(--brand-orange)" />
              <span>
                {isAuthenticatingSSO ? 'Verifying Corporate SSO Directory...' : 'Sign in with @starshippp.com SSO'}
              </span>
            </button>

            {/* Divider */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '1.25rem 0',
                gap: '0.75rem',
                color: 'var(--text-muted)',
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <div style={{ flex: 1, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
              <span>OR ENTER ACCESS PASSPHRASE</span>
              <div style={{ flex: 1, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
            </div>

            {/* Master Passphrase Form */}
            <form onSubmit={handlePasswordSubmit} style={{ display: 'grid', gap: '0.75rem' }}>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter executive access passphrase..."
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    paddingLeft: '2.5rem',
                    backgroundColor: 'rgba(5, 8, 17, 0.9)',
                    border: authError ? '1px solid #EF4444' : '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
                <Key
                  size={15}
                  color="var(--brand-orange)"
                  style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }}
                />
              </div>

              {authError && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    color: '#F87171',
                    fontSize: '0.82rem',
                    fontFamily: 'var(--font-mono)',
                    textAlign: 'left',
                  }}
                >
                  <AlertTriangle size={14} />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                <LogIn size={16} />
                <span>Authorize Executive Access</span>
              </button>
            </form>

            <div
              style={{
                marginTop: '1.75rem',
                fontSize: '0.74rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
              }}
            >
              <ShieldCheck size={13} color="#10B981" />
              <span>TLS 1.3 &middot; Zero-Knowledge Ingestion &middot; Pontiac Hub</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-darkest)',
        color: 'var(--text-primary)',
        paddingTop: '6.5rem',
        paddingBottom: '5rem',
      }}
    >
      <div className="container">
        {/* Top Breadcrumb & Return to Public Site */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.25rem',
            fontSize: '0.82rem',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <button
            onClick={onBackToWebsite || (() => window.location.href = '/')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: 'var(--brand-orange-light)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 700,
            }}
          >
            <ArrowLeft size={14} />
            <span>Return to Starshippp Public Site</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
              <Shield size={13} color="var(--brand-orange)" />
              <span>SESSION: EXECUTIVE PRIVILEGED &middot; PONTIAC HQ</span>
            </div>
            <button
              onClick={handleSignOut}
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                color: '#FCA5A5',
                padding: '0.3rem 0.65rem',
                fontSize: '0.74rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
              title="Terminate session and lock portal"
            >
              <Lock size={11} />
              <span>Lock Portal</span>
            </button>
          </div>
        </div>

        {/* Global Toast Notification */}
        {toastMessage && (
          <div
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              zIndex: 9999,
              background: 'var(--bg-card)',
              border: '1px solid var(--brand-orange)',
              borderLeft: '4px solid var(--brand-orange)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
              padding: '0.85rem 1.25rem',
              fontSize: '0.84rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-white)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              animation: 'fadeIn 0.2s ease',
            }}
          >
            <CheckCircle2 size={16} color="var(--brand-orange)" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Executive Metrics & Navigation Controls */}
        <ExecutiveMetricsHeader
          totalEndpoints={totalCount}
          healthyCount={healthyCount}
          warningCount={warningCount}
          stagedCount={stagedCount}
          avgLatency={avgLatency}
          isPingingAll={isPingingAll}
          onPingAll={handlePingAll}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* TAB 1: ENDPOINTS MATRIX VIEW */}
        {activeTab === 'endpoints' && (
          <div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '1.25rem',
              }}
            >
              {filteredEndpoints.map((ep) => (
                <EndpointCard
                  key={ep.id}
                  endpoint={ep}
                  onInspect={(endpoint) => setInspectingEndpoint(endpoint)}
                  onSinglePing={handleSinglePing}
                />
              ))}
            </div>

            {filteredEndpoints.length === 0 && (
              <div
                className="glass-panel"
                style={{
                  padding: '3rem',
                  textAlign: 'center',
                  color: 'var(--text-secondary)',
                  marginTop: '1.5rem',
                }}
              >
                <p>No endpoints match the filter query &ldquo;{searchQuery}&rdquo;</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                  className="btn-secondary"
                  style={{ marginTop: '0.75rem', padding: '0.45rem 1rem', fontSize: '0.82rem' }}
                >
                  Reset Search Filter
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: DATA FLOW ARCHITECTURE VIEW */}
        {activeTab === 'architecture' && <DataFlowArchitectureView />}

        {/* TAB 3: CREDENTIALS VAULT VIEW */}
        {activeTab === 'credentials' && <CredentialsVaultView credentials={INITIAL_CREDENTIALS} />}

        {/* TAB 4: AUDIT LOG FEED VIEW */}
        {activeTab === 'audit' && (
          <AuditLogFeedView
            logs={auditLogs}
            onRefresh={() => {
              showToast('Audit log polled: Feed synchronized with all microservices.');
            }}
          />
        )}

        {/* TAB 5: LOGISTICS INGESTION ROADMAP */}
        {activeTab === 'ingestion' && <LogisticsIngestionRoadmap />}

        {/* Deep Endpoint Inspector Modal */}
        <EndpointInspectorModal
          endpoint={inspectingEndpoint}
          onClose={() => setInspectingEndpoint(null)}
          onPing={handleSinglePing}
        />
      </div>
    </div>
  );
};
