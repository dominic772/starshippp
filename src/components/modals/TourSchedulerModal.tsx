import React, { useState } from 'react';
import { X, Calendar, MapPin, CheckCircle, Video, ArrowRight } from 'lucide-react';
import type { TourBooking } from '../../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TourSchedulerModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<TourBooking>({
    name: '',
    email: '',
    phone: '',
    brandName: '',
    monthlyOrders: '500-1,500 orders/mo',
    tourType: 'in-person',
    date: '2026-09-29',
    timeSlot: '11:00 AM EST',
    specialRequests: 'Inspect custom wax seal application and climate control storage bays.',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const timeSlots = [
    '09:30 AM EST (Morning Inbound)',
    '11:00 AM EST (Live Packing Peak)',
    '01:30 PM EST (Afternoon Sweep)',
    '03:30 PM EST (Carrier Trailer Loading)',
  ];

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
          maxWidth: 620,
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: 'var(--modal-bg)',
          border: '1px solid rgba(255, 107, 0, 0.4)',
          borderRadius: 0,
          padding: '2rem',
          position: 'relative',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
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
                <Calendar size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.35rem', margin: 0, color: 'var(--text-white)' }}>
                  Book a Pontiac Floor Walkthrough
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Meet the packing leads, inspect the cleanroom bays, and test the WMS integration
                </p>
              </div>
            </div>

            {/* Tour Type Selector */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, tourType: 'in-person' })}
                style={{
                  padding: '0.85rem',
                  borderRadius: 0,
                  border: formData.tourType === 'in-person' ? '2px solid var(--brand-orange)' : '1px solid var(--border-subtle)',
                  backgroundColor: formData.tourType === 'in-person' ? 'rgba(255, 107, 0, 0.15)' : 'var(--bg-surface)',
                  color: 'var(--text-white)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.65rem',
                }}
              >
                <MapPin size={20} color={formData.tourType === 'in-person' ? 'var(--brand-orange)' : 'var(--text-secondary)'} style={{ marginTop: 2, flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>In-Person Visit</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    391 E Wilson Ave, Pontiac, MI 48341
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, tourType: 'virtual' })}
                style={{
                  padding: '0.85rem',
                  borderRadius: 0,
                  border: formData.tourType === 'virtual' ? '2px solid var(--brand-orange)' : '1px solid var(--border-subtle)',
                  backgroundColor: formData.tourType === 'virtual' ? 'rgba(255, 107, 0, 0.15)' : 'var(--bg-surface)',
                  color: 'var(--text-white)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.65rem',
                }}
              >
                <Video size={20} color={formData.tourType === 'virtual' ? 'var(--brand-orange)' : 'var(--text-secondary)'} style={{ marginTop: 2, flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Virtual Video Tour</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    1-on-1 Zoom with Floor Lead
                  </div>
                </div>
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginBottom: '0.35rem' }}>
                    YOUR FULL NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jordan Hayes"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    WORK / BRAND EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jordan@brand.com"
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginBottom: '0.35rem' }}>
                    BRAND OR STORE NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lumina Apparel"
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
                    PHONE NUMBER
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(248) 555-0144"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginBottom: '0.35rem' }}>
                    PREFERRED DATE
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
                    TIME WINDOW
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      backgroundColor: 'var(--bg-input)',
                      border: '1px solid var(--border-card)',
                      borderRadius: 0,
                      color: 'var(--text-white)',
                    }}
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', padding: '1.15rem 1.5rem', fontSize: '1.1rem', fontWeight: 800, marginTop: '0.5rem' }}
              >
                <span>Confirm Warehouse Tour Booking</span>
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
              Tour Confirmed for {formData.date}!
            </h3>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: 460, margin: '0 auto 1.75rem' }}>
              {formData.tourType === 'in-person'
                ? 'We have reserved your slot at our Pontiac, Michigan facility. Gate access instructions and safety badge credentials have been dispatched to your email.'
                : 'A personalized calendar invite with high-definition video link has been emailed to you. Looking forward to showing you our floor setup!'}
            </p>

            <button
              onClick={onClose}
              className="btn-primary"
              style={{ padding: '0.75rem 2rem' }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
