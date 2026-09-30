import React, { useState } from 'react';
import { Navigation, Thermometer, Droplets, Radio, MapPin } from 'lucide-react';
import { SectionVideoBackground } from '../video/SectionVideoBackground';

interface CityMarker {
  name: string;
  state: string;
  x: number; // percentage in SVG coordinate space
  y: number;
  transitDays: 1 | 2;
  pop: string;
}

const CITIES: CityMarker[] = [
  // 1-Day Ground Zone
  { name: 'Pontiac (Hub)', state: 'MI', x: 58, y: 38, transitDays: 1, pop: '391 E Wilson Ave' },
  { name: 'Detroit', state: 'MI', x: 59, y: 41, transitDays: 1, pop: '4.3M Metro' },
  { name: 'Chicago', state: 'IL', x: 44, y: 42, transitDays: 1, pop: '9.5M Metro' },
  { name: 'Cleveland', state: 'OH', x: 67, y: 43, transitDays: 1, pop: '2.1M Metro' },
  { name: 'Columbus', state: 'OH', x: 62, y: 50, transitDays: 1, pop: '2.2M Metro' },
  { name: 'Indianapolis', state: 'IN', x: 50, y: 52, transitDays: 1, pop: '2.1M Metro' },
  { name: 'Grand Rapids', state: 'MI', x: 52, y: 36, transitDays: 1, pop: '1.1M Metro' },
  { name: 'Toronto', state: 'ON', x: 74, y: 33, transitDays: 1, pop: '6.3M Metro' },
  { name: 'Milwaukee', state: 'WI', x: 43, y: 35, transitDays: 1, pop: '1.6M Metro' },

  // 2-Day Ground Zone
  { name: 'New York City', state: 'NY', x: 88, y: 42, transitDays: 2, pop: '19.8M Metro' },
  { name: 'Philadelphia', state: 'PA', x: 84, y: 46, transitDays: 2, pop: '6.2M Metro' },
  { name: 'Washington D.C.', state: 'DC', x: 80, y: 51, transitDays: 2, pop: '6.3M Metro' },
  { name: 'Boston', state: 'MA', x: 93, y: 33, transitDays: 2, pop: '4.9M Metro' },
  { name: 'Pittsburgh', state: 'PA', x: 73, y: 46, transitDays: 2, pop: '2.3M Metro' },
  { name: 'Atlanta', state: 'GA', x: 64, y: 78, transitDays: 2, pop: '6.1M Metro' },
  { name: 'Nashville', state: 'TN', x: 54, y: 66, transitDays: 2, pop: '2.0M Metro' },
  { name: 'St. Louis', state: 'MO', x: 38, y: 56, transitDays: 2, pop: '2.8M Metro' },
  { name: 'Minneapolis', state: 'MN', x: 28, y: 28, transitDays: 2, pop: '3.7M Metro' },
  { name: 'Charlotte', state: 'NC', x: 74, y: 69, transitDays: 2, pop: '2.7M Metro' },
];

export const PontiacTransitMap: React.FC<{ onOpenTourModal?: () => void; onOpenContactModal?: () => void }> = ({ onOpenContactModal }) => {
  const [selectedRadius, setSelectedRadius] = useState<'all' | '1day' | '2day'>('all');
  const [hoveredCity, setHoveredCity] = useState<CityMarker | null>(null);

  const filteredCities = CITIES.filter((c) => {
    if (selectedRadius === 'all') return true;
    if (selectedRadius === '1day') return c.transitDays === 1;
    if (selectedRadius === '2day') return c.transitDays === 2;
    return true;
  });

  return (
    <section
      id="transit-map"
      style={{
        paddingTop: '6rem',
        paddingBottom: '6rem',
        position: 'relative',
        backgroundColor: 'var(--bg-darkest)',
        overflow: 'hidden',
      }}
    >
      {/* Background Video 3: Multimodal Freight Telemetry & Transit Corridor */}
      <SectionVideoBackground
        videoUrl="/videos/freight-ocean-digital.mp4"
        posterUrl="/images/freight-ocean-poster.jpg"
        overlayOpacity={0.76}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: 820, margin: '0 auto 3.5rem' }}>
          <h2 style={{ marginBottom: '1.25rem' }}>
            Reach 68% of the US Population in 1 to 2 Ground Shipping Days.
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#FFFFFF', fontWeight: 600, lineHeight: 1.6, textShadow: '0 1px 3px rgba(0,0,0,0.95)' }}>
            Strategically anchored in Oakland County, Michigan. Starshippp bypasses coastal congestion to deliver lightning-fast regional carrier sweeps across the Midwest, Mid-Atlantic, and East Coast at lowest Zone 2 to 4 commercial rates.
          </p>
        </div>

        {/* Main Map + Live Telemetry Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            alignItems: 'stretch',
          }}
        >
          {/* Interactive SVG Transit Radius Radar */}
          <div
            className="glass-panel"
            style={{
              padding: '1.75rem',
              borderRadius: 0,
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              boxShadow: 'var(--card-shadow)',
              position: 'relative',
              overflow: 'hidden',
              minHeight: 480,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* Top Filter Buttons */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '0.75rem',
                position: 'relative',
                zIndex: 5,
                marginBottom: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Navigation size={18} color="var(--brand-orange)" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-white)' }}>
                  GROUND TRANSIT RADIUS
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.35rem', background: 'var(--bg-surface-elevated)', padding: 3, borderRadius: 0, border: '1px solid var(--border-card)' }}>
                <button
                  type="button"
                  onClick={() => setSelectedRadius('all')}
                  style={{
                    padding: '0.3rem 0.65rem',
                    borderRadius: 0,
                    fontSize: '0.74rem',
                    fontFamily: 'var(--font-mono)',
                    color: selectedRadius === 'all' ? '#000' : 'var(--text-secondary)',
                    backgroundColor: selectedRadius === 'all' ? 'var(--brand-orange)' : 'transparent',
                    fontWeight: 700,
                  }}
                >
                  All Zones (68%)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRadius('1day')}
                  style={{
                    padding: '0.3rem 0.65rem',
                    borderRadius: 0,
                    fontSize: '0.74rem',
                    fontFamily: 'var(--font-mono)',
                    color: selectedRadius === '1day' ? '#050811' : 'var(--text-secondary)',
                    backgroundColor: selectedRadius === '1day' ? '#34D399' : 'transparent',
                    fontWeight: 700,
                  }}
                >
                  1-Day Ground
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRadius('2day')}
                  style={{
                    padding: '0.3rem 0.65rem',
                    borderRadius: 0,
                    fontSize: '0.74rem',
                    fontFamily: 'var(--font-mono)',
                    color: selectedRadius === '2day' ? '#050811' : 'var(--text-secondary)',
                    backgroundColor: selectedRadius === '2day' ? '#22D3EE' : 'transparent',
                    fontWeight: 700,
                  }}
                >
                  2-Day Ground
                </button>
              </div>
            </div>

            {/* Radar Visual Canvas Area */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: 380,
                backgroundColor: 'var(--radar-bg)',
                borderRadius: 0,
                border: '1px solid var(--border-subtle)',
                overflow: 'hidden',
              }}
            >
              {/* Radar Grid Lines */}
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
                <defs>
                  <radialGradient id="ringGlow" cx="58%" cy="38%" r="50%">
                    <stop offset="0%" stopColor="rgba(255, 107, 0, 0.25)" />
                    <stop offset="35%" stopColor="rgba(16, 185, 129, 0.12)" />
                    <stop offset="70%" stopColor="rgba(6, 182, 212, 0.08)" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                </defs>

                {/* Ambient Radar fill */}
                <rect width="100" height="100" fill="url(#ringGlow)" />

                {/* 1-Day Ground Ring (Approx 350 mile radius from Pontiac) */}
                {(selectedRadius === 'all' || selectedRadius === '1day') && (
                  <ellipse
                    cx="58"
                    cy="38"
                    rx="22"
                    ry="20"
                    fill="rgba(52, 211, 153, 0.08)"
                    stroke="#34D399"
                    strokeWidth="0.8"
                    strokeDasharray="2,2"
                  />
                )}

                {/* 2-Day Ground Ring (Approx 750 mile radius from Pontiac) */}
                {(selectedRadius === 'all' || selectedRadius === '2day') && (
                  <ellipse
                    cx="58"
                    cy="38"
                    rx="42"
                    ry="38"
                    fill="rgba(34, 211, 238, 0.06)"
                    stroke="#22D3EE"
                    strokeWidth="0.8"
                    strokeDasharray="3,3"
                  />
                )}

                {/* Coordinate Crosshairs centered at Pontiac */}
                <line x1="58" y1="0" x2="58" y2="100" stroke="rgba(255, 107, 0, 0.2)" strokeWidth="0.5" />
                <line x1="0" y1="38" x2="100" y2="38" stroke="rgba(255, 107, 0, 0.2)" strokeWidth="0.5" />
              </svg>

              {/* Pontiac Central Beacon Marker */}
              <div
                style={{
                  position: 'absolute',
                  left: '58%',
                  top: '38%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 0,
                    backgroundColor: 'var(--brand-orange)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 20px #FF6B00, 0 0 40px #FF6B00',
                  }}
                >
                  <div style={{ width: 8, height: 8, borderRadius: 0, backgroundColor: '#fff' }} />
                </div>
                <div
                  style={{
                    backgroundColor: 'rgba(5, 8, 17, 0.9)',
                    border: '1px solid var(--brand-orange)',
                    borderRadius: 0,
                    padding: '0.15rem 0.45rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    color: '#fff',
                    whiteSpace: 'nowrap',
                    marginTop: 4,
                  }}
                >
                  ★ PONTIAC HQ
                </div>
              </div>

              {/* City Markers */}
              {filteredCities.map((city) => {
                if (city.name.includes('Pontiac')) return null;
                const isHovered = hoveredCity?.name === city.name;
                const is1Day = city.transitDays === 1;

                return (
                  <div
                    key={city.name}
                    onMouseEnter={() => setHoveredCity(city)}
                    onMouseLeave={() => setHoveredCity(null)}
                    style={{
                      position: 'absolute',
                      left: `${city.x}%`,
                      top: `${city.y}%`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: isHovered ? 20 : 5,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <div
                      style={{
                        width: isHovered ? 12 : 8,
                        height: isHovered ? 12 : 8,
                        borderRadius: 0,
                        backgroundColor: is1Day ? '#34D399' : '#22D3EE',
                        boxShadow: `0 0 ${isHovered ? 12 : 6}px ${is1Day ? '#34D399' : '#22D3EE'}`,
                        transition: 'all 0.2s ease',
                      }}
                    />
                    <span
                      style={{
                        fontSize: isHovered ? '0.78rem' : '0.66rem',
                        fontFamily: 'var(--font-mono)',
                        color: isHovered ? 'var(--text-white)' : 'var(--radar-city-text)',
                        fontWeight: isHovered ? 700 : 500,
                        textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {city.name}
                    </span>
                  </div>
                );
              })}

              {/* Hover Tooltip Card */}
              {hoveredCity && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 12,
                    left: 12,
                    zIndex: 30,
                    backgroundColor: 'var(--hud-bg)',
                    border: '1px solid var(--brand-orange)',
                    borderRadius: 0,
                    padding: '0.65rem 1rem',
                    boxShadow: 'var(--card-shadow)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                  }}
                >
                  <div style={{ color: 'var(--text-white)', fontWeight: 800, fontSize: '0.85rem' }}>
                    {hoveredCity.name}, {hoveredCity.state}
                  </div>
                  <div style={{ color: hoveredCity.transitDays === 1 ? '#34D399' : '#38BDF8', fontWeight: 700 }}>
                    {hoveredCity.transitDays}-Day Standard Ground Reach from Pontiac Hub
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>
                    Regional Population: {hoveredCity.pop}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Radius Legend */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.74rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-secondary)',
                marginTop: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: 10, height: 10, borderRadius: 0, backgroundColor: '#34D399' }} />
                <span>Zone 2 (1-Day Ground): Detroit, Chicago, Cleveland, Toronto</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: 10, height: 10, borderRadius: 0, backgroundColor: '#22D3EE' }} />
                <span>Zone 3 to 4 (2-Day Ground): NYC, Philly, DC, Atlanta, Boston</span>
              </div>
            </div>
          </div>

          {/* Right Column: Physical Facility Telemetry & Schedule */}
          <div style={{ display: 'grid', gap: '1.25rem' }}>
            {/* Facility Specs Card */}
            <div
              className="glass-panel"
              style={{
                padding: '1.75rem',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                boxShadow: 'var(--card-shadow)',
                borderRadius: 0,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                <MapPin size={20} color="var(--brand-orange)" />
                <h3 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--text-white)' }}>
                  Pontiac Facility Operational Telemetry
                </h3>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div style={{ padding: '0.85rem', borderRadius: 0, backgroundColor: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                    <Thermometer size={14} color="#F59E0B" />
                    <span>FLOOR TEMP</span>
                  </div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-white)', marginTop: 4 }}>
                    68.4°F
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#34D399', fontWeight: 600 }}>Climate Regulated</div>
                </div>

                <div style={{ padding: '0.85rem', borderRadius: 0, backgroundColor: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                    <Droplets size={14} color="#22D3EE" />
                    <span>HUMIDITY</span>
                  </div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-white)', marginTop: 4 }}>
                    42.1%
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#34D399', fontWeight: 600 }}>Cosmetics Stable</div>
                </div>
              </div>

              <h4 style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--brand-orange-light)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Daily Trailer Injections & Dock Sweeps:
              </h4>

              <div style={{ display: 'grid', gap: '0.5rem', fontSize: '0.82rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0.75rem', background: 'var(--bg-surface-elevated)', borderRadius: 0 }}>
                  <span style={{ color: 'var(--text-white)' }}>UPS Ground & Air</span>
                  <span style={{ color: 'var(--status-cyan)', fontFamily: 'var(--font-mono)' }}>17:30 EST (Daily Sweep)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0.75rem', background: 'var(--bg-surface-elevated)', borderRadius: 0 }}>
                  <span style={{ color: 'var(--text-white)' }}>FedEx Home & Express</span>
                  <span style={{ color: 'var(--status-cyan)', fontFamily: 'var(--font-mono)' }}>18:15 EST (Daily Sweep)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0.75rem', background: 'var(--bg-surface-elevated)', borderRadius: 0 }}>
                  <span style={{ color: 'var(--text-white)' }}>USPS Ground Advantage</span>
                  <span style={{ color: 'var(--status-cyan)', fontFamily: 'var(--font-mono)' }}>17:00 EST (Direct Hub Sync)</span>
                </div>
              </div>
            </div>

            {/* Direct Floor Access Callout Card */}
            <div
              style={{
                padding: '1.75rem',
                borderRadius: 0,
                background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.15) 0%, rgba(14, 22, 44, 0.95) 100%)',
                border: '1px solid rgba(255, 107, 0, 0.35)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Radio size={16} color="var(--brand-orange)" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--brand-orange-light)', textTransform: 'uppercase' }}>
                    Direct Floor Access
                  </span>
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#fff' }}>
                  Direct Warehouse Operations Support.
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                  Have questions about custom unboxing, carrier sweep cutoffs, or our open-API Shopify sync? Connect directly with our Pontiac floor leads with under 15-minute response SLA.
                </p>
              </div>

              <button
                onClick={onOpenContactModal}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Connect With Floor Lead</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
