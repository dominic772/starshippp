import React, { useState, useEffect } from 'react';
import { PexelsVideoService, THEME_QUERIES } from '../../services/pexelsService';
import { X, Key, RefreshCw, CheckCircle, ShieldCheck } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PexelsConfigModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [saveStatus, setSaveStatus] = useState<string>('');
  const [isDataSaver, setIsDataSaver] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setApiKey(PexelsVideoService.getApiKey() || '');
      setIsDataSaver(PexelsVideoService.isDataSaverActive() || PexelsVideoService.isMobileDevice());
      setSaveStatus('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    PexelsVideoService.setApiKey(apiKey);
    PexelsVideoService.clearCache();
    setSaveStatus('API key updated & cache revalidated!');
    setTimeout(() => {
      onClose();
    }, 900);
  };

  const handleClearCache = () => {
    PexelsVideoService.clearCache();
    setSaveStatus('Video cache cleared!');
    setTimeout(() => setSaveStatus(''), 2000);
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
        backgroundColor: 'rgba(5, 8, 17, 0.85)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: 580,
          background: 'rgba(12, 19, 38, 0.95)',
          border: '1px solid rgba(255, 107, 0, 0.35)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.85), 0 0 30px rgba(255, 107, 0, 0.15)',
          padding: '2rem',
          position: 'relative',
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
            background: 'rgba(255, 255, 255, 0.05)',
          }}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 0,
              backgroundColor: 'rgba(255, 107, 0, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--brand-orange)',
            }}
          >
            <Key size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Pexels Dynamic Video Engine</h3>
            <p style={{ fontSize: '0.82rem', margin: 0, color: 'var(--text-secondary)' }}>
              Cinematic ambient loops & real-time video query manager
            </p>
          </div>
        </div>

        <form onSubmit={handleSave}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label
              style={{
                display: 'block',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                marginBottom: '0.5rem',
              }}
            >
              Optional Pexels API Key (Bearer Token):
            </label>
            <input
              type="password"
              placeholder="e.g. 563492ad6f91700001000001..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                background: 'rgba(5, 8, 17, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: 0,
                color: '#fff',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
              }}
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.35rem' }}>
              *If left blank, Starshippp automatically streams our pre-cached high-definition video loops and photorealistic posters.
            </span>
          </div>

          <div
            style={{
              padding: '1rem',
              background: 'rgba(5, 8, 17, 0.5)',
              borderRadius: 0,
              border: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: '1.25rem',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--brand-orange-light)',
                marginBottom: '0.5rem',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              Active Video Query Registry:
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'grid', gap: '0.4rem' }}>
              <div>
                <strong style={{ color: '#fff' }}>Hero Automation:</strong>{' '}
                <code style={{ color: 'var(--status-cyan)', fontSize: '0.75rem' }}>
                  {THEME_QUERIES.hero}
                </code>
              </div>
              <div>
                <strong style={{ color: '#fff' }}>Boutique Unboxing:</strong>{' '}
                <code style={{ color: 'var(--status-cyan)', fontSize: '0.75rem' }}>
                  {THEME_QUERIES.unboxing}
                </code>
              </div>
              <div>
                <strong style={{ color: '#fff' }}>Pontiac Hub:</strong>{' '}
                <code style={{ color: 'var(--status-cyan)', fontSize: '0.75rem' }}>
                  {THEME_QUERIES.facility}
                </code>
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.25rem',
              fontSize: '0.8rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={16} color="#10B981" />
              <span style={{ color: 'var(--text-secondary)' }}>
                {isDataSaver ? 'Low-Bandwidth Mobile/Data-Saver Mode Detected' : 'Full HD/4K Video Streaming Enabled'}
              </span>
            </div>

            <button
              type="button"
              onClick={handleClearCache}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                color: 'var(--text-secondary)',
                fontSize: '0.78rem',
                padding: '0.3rem 0.6rem',
                borderRadius: 0,
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <RefreshCw size={12} /> Clear Cache
            </button>
          </div>

          {saveStatus && (
            <div
              style={{
                padding: '0.6rem',
                borderRadius: 0,
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                color: '#34D399',
                fontSize: '0.82rem',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <CheckCircle size={15} />
              {saveStatus}
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              style={{ padding: '0.65rem 1.45rem', fontSize: '0.88rem' }}
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
