import React, { useState } from 'react';
import { SectionVideoBackground } from '../video/SectionVideoBackground';
import { Send, CheckCircle2, Clock, Zap } from 'lucide-react';

export const ContactFormSection: React.FC = () => {
  const [brandName, setBrandName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [volume, setVolume] = useState('300 - 1,000 / mo');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quickEmail, setQuickEmail] = useState('');
  const [quickSubmitting, setQuickSubmitting] = useState(false);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickEmail) return;
    setQuickSubmitting(true);
    setTimeout(() => {
      setQuickSubmitting(false);
      setEmail(quickEmail);
      setBrandName('Brand Partner');
      setContactName('Founder');
      setIsSubmitted(true);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <section
      id="contact"
      style={{
        paddingTop: '6rem',
        paddingBottom: '6rem',
        backgroundColor: 'var(--bg-darkest)',
        borderTop: '1px solid var(--border-subtle)',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 10,
      }}
    >
      {/* Background Video: Semi-Truck Loading Dock Freight Operations */}
      <SectionVideoBackground
        videoUrl="/videos/semi-truck-loading-dock.mp4"
        posterUrl="/images/semi-truck-loading-dock-poster.jpg"
        overlayOpacity={0.80}
      />

      <div className="container" style={{ maxWidth: 860, position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ marginBottom: '1rem', color: 'var(--text-white)' }}>
            Ready to Stop Paying Idle Penalties? Connect Straight to the Floor.
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#FFFFFF', fontWeight: 600, maxWidth: 680, margin: '0 auto', lineHeight: 1.6, textShadow: '0 2px 10px rgba(0,0,0,0.85)' }}>
            No corporate gatekeepers or 48-hour Zendesk queues. Request custom volume rates and direct Pontiac warehouse Slack access below.
          </p>
        </div>

        {/* Form Container */}
        <div
          className="glass-panel"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '2px solid rgba(255, 107, 0, 0.4)',
            borderLeft: '4px solid var(--brand-orange)',
            borderRadius: 0,
            padding: '2.5rem',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)',
          }}
        >
          {!isSubmitted ? (
            <div>
              {/* Quick-Start Express Option */}
              <div
                style={{
                  padding: '1.25rem',
                  marginBottom: '2rem',
                  backgroundColor: 'rgba(255, 107, 0, 0.08)',
                  border: '1px solid rgba(255, 107, 0, 0.3)',
                  borderLeft: '4px solid var(--brand-orange)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Zap size={16} color="var(--brand-orange)" />
                    <span style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--text-white)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Express Quote (15-Minute Response)
                    </span>
                  </div>
                  <span style={{ fontSize: '0.74rem', color: '#34D399', fontFamily: 'var(--font-mono)' }}>
                    ⚡ ZERO SALES REPS &bull; DIRECT FLOOR LEAD
                  </span>
                </div>

                <form onSubmit={handleQuickSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                  <input
                    type="email"
                    required
                    placeholder="Enter your brand email (e.g. founder@yourbrand.com)"
                    value={quickEmail}
                    onChange={(e) => setQuickEmail(e.target.value)}
                    style={{
                      flex: '1 1 260px',
                      padding: '0.85rem 1rem',
                      backgroundColor: 'var(--bg-input)',
                      border: '1px solid var(--border-card)',
                      color: 'var(--text-white)',
                      fontSize: '0.92rem',
                      outline: 'none',
                    }}
                  />
                  <button
                    type="submit"
                    disabled={quickSubmitting}
                    className="btn-primary"
                    style={{
                      padding: '0.85rem 1.6rem',
                      fontSize: '0.92rem',
                      fontWeight: 800,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {quickSubmitting ? 'Transmitting...' : 'Get Rates in 15 Min →'}
                  </button>
                </form>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                  We'll evaluate your monthly order volume and send transparent flat-rate pricing directly from the Pontiac floor.
                </div>
              </div>

              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem' }}>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-subtle)' }} />
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Or Submit Full Brand Specifications
                </span>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-subtle)' }} />
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
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
                    placeholder="e.g. Apex Apparel"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.9rem 1rem',
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
                    placeholder="First & Last Name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.9rem 1rem',
                      backgroundColor: 'var(--bg-input)',
                      border: '1px solid var(--border-card)',
                      color: 'var(--text-white)',
                      borderRadius: 0,
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
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
                      padding: '0.9rem 1rem',
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
                    PHONE / DIRECT SLACK *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(248) 555-0100"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.9rem 1rem',
                      backgroundColor: 'var(--bg-input)',
                      border: '1px solid var(--border-card)',
                      color: 'var(--text-white)',
                      borderRadius: 0,
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Monthly Order Volume */}
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
                  ESTIMATED MONTHLY PARCEL VOLUME
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.5rem' }}>
                  {['300 - 800 / mo', '800 - 1,500 / mo', '1,500 - 3,000 / mo', '3,000+ / mo'].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setVolume(v)}
                      style={{
                        padding: '0.8rem 0.5rem',
                        fontSize: '0.85rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        borderRadius: 0,
                        backgroundColor: volume === v ? 'var(--brand-orange)' : 'var(--bg-surface-elevated)',
                        color: volume === v ? '#050811' : 'var(--text-primary)',
                        border: volume === v ? '2px solid #FF8800' : '1px solid var(--border-subtle)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {v}
                    </button>
                  ))}
                </div>
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
                  PRODUCT TYPES & PACKAGING REQUIREMENTS (OPTIONAL)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g., Apparel items, custom tissue wrap & sticker seal. Need to migrate before next quarter."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    backgroundColor: 'var(--bg-input)',
                    border: '1px solid var(--border-card)',
                    color: 'var(--text-white)',
                    borderRadius: 0,
                    outline: 'none',
                    fontSize: '0.9rem',
                  }}
                />
              </div>

              {/* Floor Guarantee Line */}
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
                <Clock size={15} />
                <span>Pontiac Floor SLA: Inquiries sent during operating hours receive custom rates in under 15 minutes.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '1.15rem',
                  fontSize: '1.08rem',
                  fontWeight: 800,
                }}
              >
                {isSubmitting ? (
                  <span>Transmitting to Pontiac Dispatch Desk...</span>
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
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 0,
                  background: 'linear-gradient(135deg, #FF7700 0%, #FF4400 100%)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#050811',
                  marginBottom: '1.25rem',
                  boxShadow: '0 0 25px rgba(255, 107, 0, 0.6)',
                }}
              >
                <CheckCircle2 size={34} strokeWidth={2.5} />
              </div>
              <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: 'var(--text-white)' }}>
                Floor Lead Connected!
              </h3>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto 1.5rem', lineHeight: 1.5 }}>
                Thanks <strong>{contactName}</strong>. Our Pontiac operations lead has received <strong>{brandName}</strong>'s request and will reach out to <strong>{email}</strong> within 15 minutes.
              </p>
              <div
                style={{
                  maxWidth: 420,
                  margin: '0 auto',
                  padding: '1rem',
                  backgroundColor: 'var(--bg-surface-elevated)',
                  border: '1px solid rgba(255, 107, 0, 0.3)',
                  borderLeft: '4px solid var(--brand-orange)',
                  textAlign: 'left',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                }}
              >
                <div style={{ color: 'var(--text-white)', fontWeight: 700, marginBottom: '0.2rem' }}>
                  Pontiac Logistics Center Hub #1
                </div>
                <div>391 E Wilson Ave, Pontiac, MI 48341</div>
                <div style={{ color: 'var(--brand-orange)', marginTop: '0.3rem' }}>
                  Floor Desk: (248) 555-0199
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
