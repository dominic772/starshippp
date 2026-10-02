import React, { useState } from 'react';
import { X, Send, CheckCircle2, Clock, Phone } from 'lucide-react';
import { SlackIcon } from '../ui/Icons';

interface InstantContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstantContactModal: React.FC<InstantContactModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [brandName, setBrandName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [orderVolume, setOrderVolume] = useState('300 - 1,000 / mo');
  const [channels, setChannels] = useState<string[]>(['Shopify']);
  const [customPackaging, setCustomPackaging] = useState(true);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const toggleChannel = (channel: string) => {
    setChannels((prev) =>
      prev.includes(channel) ? prev.filter((c) => c !== channel) : [...prev, channel]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 850);
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
        padding: '1.25rem',
        backgroundColor: 'var(--modal-overlay)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: 680,
          maxHeight: '92vh',
          overflowY: 'auto',
          backgroundColor: 'var(--modal-bg)',
          border: '2px solid var(--brand-orange)',
          borderRadius: 0,
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.45), 0 0 30px rgba(255, 107, 0, 0.25)',
          padding: '2.5rem',
          position: 'relative',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-white)',
            padding: '0.45rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--brand-orange)';
            e.currentTarget.style.color = '#050811';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--bg-surface-elevated)';
            e.currentTarget.style.color = 'var(--text-white)';
          }}
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {!isSuccess ? (
          <div>
            {/* Header */}
            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                <SlackIcon size={18} color="#ECB22E" />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--brand-orange)',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    letterSpacing: '0.08em',
                  }}
                >
                  DIRECT WAREHOUSE-FLOOR ACCESS • PONTIAC, MI
                </span>
              </div>
              <h2 style={{ fontSize: '1.85rem', marginBottom: '0.5rem', color: 'var(--text-white)' }}>
                Start Fulfillment or Request Rates
              </h2>
              <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Speak straight with the operations team running our Pontiac warehouse. Zero pushy enterprise sales reps. Under 15-minute response SLA.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Row 1: Brand & Contact Name */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      color: 'var(--text-secondary)',
                      marginBottom: '0.4rem',
                      fontWeight: 600,
                    }}
                  >
                    BRAND / COMPANY NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aurelien Goods"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      backgroundColor: 'var(--bg-input)',
                      border: '1px solid var(--border-card)',
                      color: 'var(--text-white)',
                      borderRadius: 0,
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      color: 'var(--text-secondary)',
                      marginBottom: '0.4rem',
                      fontWeight: 600,
                    }}
                  >
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="First and Last Name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      backgroundColor: 'var(--bg-input)',
                      border: '1px solid var(--border-card)',
                      color: 'var(--text-white)',
                      borderRadius: 0,
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Row 2: Work Email & Phone / Slack */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      color: 'var(--text-secondary)',
                      marginBottom: '0.4rem',
                      fontWeight: 600,
                    }}
                  >
                    WORK EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="founder@yourbrand.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      backgroundColor: 'var(--bg-input)',
                      border: '1px solid var(--border-card)',
                      color: 'var(--text-white)',
                      borderRadius: 0,
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      color: 'var(--text-secondary)',
                      marginBottom: '0.4rem',
                      fontWeight: 600,
                    }}
                  >
                    PHONE / SLACK HANDLE *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(248) 555-0100"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      backgroundColor: 'var(--bg-input)',
                      border: '1px solid var(--border-card)',
                      color: 'var(--text-white)',
                      borderRadius: 0,
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Monthly Volume Selection */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '0.5rem',
                    fontWeight: 600,
                  }}
                >
                  ESTIMATED MONTHLY ORDER VOLUME
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.5rem' }}>
                  {[
                    '300 - 800 / mo',
                    '800 - 1,500 / mo',
                    '1,500 - 3,000 / mo',
                    '3,000+ / mo',
                  ].map((vol) => (
                    <button
                      key={vol}
                      type="button"
                      onClick={() => setOrderVolume(vol)}
                      style={{
                        padding: '0.75rem 0.5rem',
                        fontSize: '0.85rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        borderRadius: 0,
                        backgroundColor: orderVolume === vol ? 'var(--brand-orange)' : 'var(--bg-surface-elevated)',
                        color: orderVolume === vol ? '#050811' : 'var(--text-primary)',
                        border: orderVolume === vol ? '2px solid #FF8800' : '1px solid var(--border-subtle)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {vol}
                    </button>
                  ))}
                </div>
              </div>

              {/* Channels Selection */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '0.5rem',
                    fontWeight: 600,
                  }}
                >
                  PRIMARY SALES CHANNELS (SELECT ALL THAT APPLY)
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {['Shopify', 'TikTok Shop', 'WooCommerce', 'Amazon FBM', 'Wholesale B2B', 'Custom API'].map((ch) => {
                    const isSelected = channels.includes(ch);
                    return (
                      <button
                        key={ch}
                        type="button"
                        onClick={() => toggleChannel(ch)}
                        style={{
                          padding: '0.55rem 0.9rem',
                          fontSize: '0.82rem',
                          fontFamily: 'var(--font-heading)',
                          fontWeight: 600,
                          borderRadius: 0,
                          backgroundColor: isSelected ? 'rgba(255, 107, 0, 0.15)' : 'var(--bg-surface-elevated)',
                          color: isSelected ? 'var(--brand-orange)' : 'var(--text-secondary)',
                          border: isSelected ? '1px solid var(--brand-orange)' : '1px solid var(--border-subtle)',
                          cursor: 'pointer',
                        }}
                      >
                        {isSelected ? '✓ ' : '+ '} {ch}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Unboxing Toggle */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.85rem 1rem',
                  backgroundColor: 'var(--bg-surface-elevated)',
                  border: '1px solid rgba(255, 107, 0, 0.3)',
                }}
              >
                <input
                  type="checkbox"
                  id="customUnboxingCheckbox"
                  checked={customPackaging}
                  onChange={(e) => setCustomPackaging(e.target.checked)}
                  style={{ width: 18, height: 18, accentColor: 'var(--brand-orange)', cursor: 'pointer' }}
                />
                <label htmlFor="customUnboxingCheckbox" style={{ fontSize: '0.88rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
                  <strong style={{ color: 'var(--text-white)' }}>Custom Packaging / Specialized Protective Kitting (Add-On):</strong> Foam corner blocks, custom corrugated inserts, branded tape, or high-touch unboxing.
                </label>
              </div>

              {/* Notes */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '0.4rem',
                    fontWeight: 600,
                  }}
                >
                  ADDITIONAL NOTES / SKU PROFILES (OPTIONAL)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Motorcycle slip-on exhausts & fairings, 85 SKUs, ~4,000 sq ft storage, looking to cut carrier DIM penalties."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    backgroundColor: 'var(--bg-input)',
                    border: '1px solid var(--border-card)',
                    color: 'var(--text-white)',
                    borderRadius: 0,
                    outline: 'none',
                    fontSize: '0.9rem',
                  }}
                />
              </div>

              {/* SLA Guarantee Strip */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.82rem',
                  color: '#34D399',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <Clock size={14} />
                <span>Average floor response time: <strong>under 15 minutes</strong> during warehouse business hours.</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '1.1rem',
                  fontSize: '1.05rem',
                  fontWeight: 800,
                }}
              >
                {isSubmitting ? (
                  <span>Connecting to Pontiac Floor...</span>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Connect with Pontiac Floor Lead & Get Rates</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: 0,
                background: 'linear-gradient(135deg, #FF7700 0%, #FF4400 100%)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#050811',
                marginBottom: '1.5rem',
                boxShadow: '0 0 25px rgba(255, 107, 0, 0.6)',
              }}
            >
              <CheckCircle2 size={36} strokeWidth={2.5} />
            </div>

            <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem', color: 'var(--text-white)' }}>
              Floor Request Transmitted!
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto 1.75rem', lineHeight: 1.6 }}>
              Thank you, <strong>{contactName}</strong>. Our Pontiac warehouse dispatch lead is reviewing <strong>{brandName}</strong>'s specifications right now.
            </p>

            <div
              style={{
                maxWidth: 440,
                margin: '0 auto 2rem',
                padding: '1.25rem',
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid rgba(255, 107, 0, 0.3)',
                borderLeft: '4px solid var(--brand-orange)',
                textAlign: 'left',
              }}
            >
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                DIRECT WAREHOUSE ASSIGNMENT:
              </div>
              <div style={{ fontSize: '1rem', color: 'var(--text-white)', fontWeight: 700, marginBottom: '0.2rem' }}>
                Starshippp Pontiac Logistics Hub #1
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                391 E Wilson Ave, Pontiac, MI 48341
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Floor Lead: Sarah / Pontiac Operations Desk
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--brand-orange)', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Phone size={14} /> +1 (248) 555-0199 • Shared Slack Invite dispatched to {email}
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="btn-primary"
              style={{
                padding: '0.85rem 2rem',
                fontSize: '1rem',
              }}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
