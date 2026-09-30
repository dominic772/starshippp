import React, { useState } from 'react';
import { X, FileUp, CheckCircle, ShieldCheck, ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import type { AuditSubmission } from '../../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditUploadModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<AuditSubmission>({
    brandName: '',
    email: '',
    monthlyVolume: '500-1,500 orders/mo',
    currentCarrierOr3pl: 'ShipBob',
    storeUrl: '',
    fileName: '',
  });

  const [dragOver, setDragOver] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    setFormData((prev) => ({
      ...prev,
      fileName: file.name,
      fileSize: `${(file.size / 1024).toFixed(1)} KB`,
    }));

    // Trigger instant mock analysis simulation
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({
        detectedOrders: '1,120 orders analyzed',
        dimLeakage: '$840 / mo (Oversized box penalty)',
        hiddenSurcharges: '$430 / mo (Receiving & fuel padding)',
        starshipppSavingsEst: '$1,270 / mo',
        annualSavingsEst: '$15,240 / yr',
      });
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--modal-overlay)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: 640,
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: 'var(--modal-bg)',
          border: '1px solid rgba(255, 107, 0, 0.4)',
          borderRadius: 0,
          padding: '2rem',
          position: 'relative',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4), 0 0 35px rgba(255, 107, 0, 0.2)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            color: 'var(--text-secondary)',
            padding: '0.4rem',
            borderRadius: 0,
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            cursor: 'pointer',
          }}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <div>
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
                <FileUp size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.35rem', margin: 0, color: 'var(--text-white)' }}>
                  Free 30-Day Shipping Invoice Audit
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Upload your recent 3PL invoice or carrier statement for instant rate-shopping arbitrage
                </p>
              </div>
            </div>

            {/* Drag & Drop Area */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleFileDrop}
              style={{
                border: `2px dashed ${dragOver ? 'var(--brand-orange)' : formData.fileName ? '#34D399' : 'var(--border-card)'}`,
                borderRadius: 0,
                padding: '2rem 1.5rem',
                textAlign: 'center',
                backgroundColor: dragOver ? 'rgba(255, 107, 0, 0.08)' : 'var(--bg-surface)',
                marginBottom: '1.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onClick={() => document.getElementById('audit-file-input')?.click()}
            >
              <input
                id="audit-file-input"
                type="file"
                accept=".pdf,.csv,.xlsx,.xls"
                style={{ display: 'none' }}
                onChange={handleFileInput}
              />

              {formData.fileName ? (
                <div>
                  <CheckCircle size={36} color="#34D399" style={{ margin: '0 auto 0.5rem' }} />
                  <div style={{ fontWeight: 700, color: 'var(--text-white)', fontSize: '0.95rem' }}>
                    {formData.fileName}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {formData.fileSize} • File loaded for audit scan
                  </div>
                </div>
              ) : (
                <div>
                  <FileUp size={36} color="var(--brand-orange)" style={{ margin: '0 auto 0.5rem' }} />
                  <div style={{ fontWeight: 700, color: 'var(--text-white)', fontSize: '1rem', marginBottom: '0.25rem' }}>
                    Drag & Drop Your Invoice (PDF, CSV, Excel)
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Or click to browse from computer. Confidential NDA protected.
                  </div>
                </div>
              )}
            </div>

            {/* Simulated Rate Scanner Progress */}
            {isAnalyzing && (
              <div
                style={{
                  padding: '1.25rem',
                  borderRadius: 0,
                  backgroundColor: 'rgba(255, 107, 0, 0.1)',
                  border: '1px solid var(--brand-orange)',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <Loader2 size={24} color="var(--brand-orange)" className="animate-spin" />
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-white)' }}>
                    Scanning Billing Surcharges & DIM Weights...
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--brand-orange-light)' }}>
                    Benchmarking against Starshippp Commercial Plus rates & $0 minimums
                  </div>
                </div>
              </div>
            )}

            {/* Instant Scan Analysis Preview */}
            {analysisResult && (
              <div
                style={{
                  padding: '1.25rem',
                  borderRadius: 0,
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  marginBottom: '1.5rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34D399', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.5rem' }}>
                  <Sparkles size={16} />
                  <span>PRELIMINARY ARBITRAGE SCAN COMPLETE</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', fontSize: '0.82rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-secondary)' }}>DIM Weight Penalty Leakage:</span>
                    <div style={{ color: '#F87171', fontWeight: 700 }}>{analysisResult.dimLeakage}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-secondary)' }}>Hidden Intake & Fuel Markup:</span>
                    <div style={{ color: '#F87171', fontWeight: 700 }}>{analysisResult.hiddenSurcharges}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-secondary)' }}>Projected Monthly Net Savings:</span>
                    <div style={{ color: '#34D399', fontWeight: 800, fontSize: '1.05rem' }}>{analysisResult.starshipppSavingsEst}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-secondary)' }}>Projected Annual Cash Reclaimed:</span>
                    <div style={{ color: '#34D399', fontWeight: 800, fontSize: '1.05rem' }}>{analysisResult.annualSavingsEst}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Founder Form Fields */}
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginBottom: '0.35rem' }}>
                    BRAND NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aurélien Studio"
                    value={formData.brandName}
                    onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      backgroundColor: 'var(--bg-input)',
                      border: '1px solid var(--border-card)',
                      borderRadius: 0,
                      color: 'var(--text-white)',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginBottom: '0.35rem' }}>
                    FOUNDER EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="founder@yourbrand.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      backgroundColor: 'var(--bg-input)',
                      border: '1px solid var(--border-card)',
                      borderRadius: 0,
                      color: 'var(--text-white)',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginBottom: '0.35rem' }}>
                    MONTHLY ORDER VOLUME
                  </label>
                  <select
                    value={formData.monthlyVolume}
                    onChange={(e) => setFormData({ ...formData, monthlyVolume: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      backgroundColor: 'var(--bg-input)',
                      border: '1px solid var(--border-card)',
                      borderRadius: 0,
                      color: 'var(--text-white)',
                    }}
                  >
                    <option value="300-500 orders/mo">300 to 500 orders/mo (Boutique Launch)</option>
                    <option value="500-1,500 orders/mo">500 to 1,500 orders/mo (Scaling DTC)</option>
                    <option value="1,500-3,000 orders/mo">1,500 to 3,000 orders/mo (High Velocity)</option>
                    <option value="3,000+ orders/mo">3,000+ orders/mo (Omnichannel Enterprise)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginBottom: '0.35rem' }}>
                    CURRENT FULFILLMENT METHOD
                  </label>
                  <select
                    value={formData.currentCarrierOr3pl}
                    onChange={(e) => setFormData({ ...formData, currentCarrierOr3pl: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      backgroundColor: 'var(--bg-input)',
                      border: '1px solid var(--border-card)',
                      borderRadius: 0,
                      color: 'var(--text-white)',
                    }}
                  >
                    <option value="ShipBob">ShipBob ($1,500 min / tickets)</option>
                    <option value="Red Stag">Red Stag / Freight 3PL</option>
                    <option value="Other Mega-3PL">Other Legacy Mega-3PL</option>
                    <option value="In-House Self-Fulfillment">In-House (Founder packing at garage)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginBottom: '0.35rem' }}>
                  SHOPIFY / STORE URL (OPTIONAL FOR CATALOG SCAN)
                </label>
                <input
                  type="text"
                  placeholder="https://yourbrand.com"
                  value={formData.storeUrl}
                  onChange={(e) => setFormData({ ...formData, storeUrl: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    backgroundColor: 'var(--bg-input)',
                    border: '1px solid var(--border-card)',
                    borderRadius: 0,
                    color: 'var(--text-white)',
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <ShieldCheck size={14} color="#34D399" />
                <span>Zero spam, zero sales pressure. Full NDA protection on your commercial invoices.</span>
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', padding: '1.15rem 1.5rem', fontSize: '1.1rem', fontWeight: 800, marginTop: '0.5rem' }}
              >
                <span>Request My Full 30-Day Rate Audit & Migration Plan</span>
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 0,
                backgroundColor: 'rgba(52, 211, 153, 0.15)',
                color: '#34D399',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
              }}
            >
              <CheckCircle size={32} />
            </div>

            <h3 style={{ fontSize: '1.6rem', marginBottom: '0.75rem', color: 'var(--text-white)' }}>
              Audit Received! Your Pontiac Rate Analysis is Underway.
            </h3>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: 460, margin: '0 auto 1.75rem' }}>
              Our operations lead Marcus is reviewing your statement line-by-line. We will email your custom rate card and invite you to our private onboarding Slack channel within 2 hours.
            </p>

            <button
              onClick={onClose}
              className="btn-primary"
              style={{ padding: '0.75rem 2rem' }}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
