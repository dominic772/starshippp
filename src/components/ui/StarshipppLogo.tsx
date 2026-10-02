import React, { useState } from 'react';
import { StarshipAnimationOverlay } from './StarshipAnimationOverlay';

export interface StarshipppLogoProps {
  /**
   * 'horizontal': Standard horizontal lockup (ideal for navbar & header)
   * 'full': Full brand presentation
   * 'mark': Just the iconic brandmark
   */
  variant?: 'full' | 'horizontal' | 'mark';
  /**
   * 'rocket': The new dynamic rocket-speed logo with fiery PPP thrusters & 3D Star Box (Default)
   * 'classic': The legacy box + text lockup
   */
  logoStyle?: 'rocket' | 'classic';
  /**
   * 'dark': White/light text for dark cyber backgrounds (default for starshippp.com)
   * 'original': Navy blue text (#052E5E) matching the original uploaded file
   */
  colorMode?: 'dark' | 'original';
  height?: number | string;
  className?: string;
  showTagline?: boolean;
  taglineText?: string;
  taglineColor?: string;
}

export const StarshipppLogo: React.FC<StarshipppLogoProps> = ({
  variant = 'horizontal',
  logoStyle = 'rocket',
  colorMode = 'dark',
  height = 64,
  className = '',
  showTagline = true,
  taglineText = '3PL, WAREHOUSING & LOGISTICS',
  taglineColor = '#FF8500',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Rocket Speed Logo Implementation (New Design)
  if (logoStyle === 'rocket') {
    if (variant === 'mark') {
      return (
        <div
          className={`starshippp-logo-mark ${className}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            height,
          }}
        >
          <img
            src="/images/starshippp-rocket-mark-375.png"
            alt="Starshippp Star Mark"
            style={{
              height: '100%',
              width: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 10px rgba(255, 107, 0, 0.45))',
              transition: 'transform 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.08) rotate(3deg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
            }}
          />
        </div>
      );
    }

    return (
      <div
        className={`starshippp-logo-speed ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            height,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: isHovered ? 'scale(1.03) translateX(3px)' : 'scale(1) translateX(0px)',
          }}
        >
          <img
            src="/images/starshippp-rocket-logo.png"
            alt="starshippp.com - 3PL, Warehousing & Logistics"
            className="starship-img-glow"
            style={{
              height: '100%',
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
              transition: 'filter 0.28s ease',
              filter: isHovered
                ? 'drop-shadow(0 0 26px rgba(255, 120, 0, 0.88)) brightness(1.08)'
                : undefined,
            }}
          />

          {/* Living Sci-Fi Micro-Animation Overlay */}
          <StarshipAnimationOverlay isHovered={isHovered} />
        </div>

        {showTagline && (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: isHovered ? '#FFA033' : taglineColor,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              marginTop: 4,
              fontWeight: 800,
              textShadow: isHovered
                ? '0 0 16px rgba(255, 122, 0, 0.8)'
                : '0 0 12px rgba(255, 122, 0, 0.55)',
              whiteSpace: 'nowrap',
              transition: 'all 0.25s ease',
            }}
          >
            {taglineText}
          </div>
        )}
      </div>
    );
  }

  // Classic Legacy Logo Implementation
  if (variant === 'mark') {
    return (
      <div
        className={`starshippp-logo-mark ${className}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          height,
        }}
      >
        <img
          src="/images/starshippp-mark.png"
          alt="Starshippp Box & Star Brandmark"
          style={{
            height: '100%',
            width: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 10px rgba(255, 107, 0, 0.35))',
          }}
        />
      </div>
    );
  }

  if (variant === 'full') {
    const logoSrc = colorMode === 'dark' 
      ? '/images/starshippp-logo-dark.png' 
      : '/images/starshippp-logo.png';

    return (
      <div
        className={`starshippp-logo-full ${className}`}
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height,
        }}
      >
        <img
          src={logoSrc}
          alt="starshippp.com official logo"
          style={{
            height: '100%',
            width: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 12px rgba(255, 107, 0, 0.25))',
          }}
        />
      </div>
    );
  }

  // Horizontal variant (Legacy Classic)
  return (
    <div
      className={`starshippp-logo-horizontal ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
        cursor: 'pointer',
      }}
    >
      {/* Official Box & Star Icon Mark */}
      <div
        style={{
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src="/images/starshippp-mark.png"
          alt="Starshippp Mark"
          style={{
            height: '100%',
            width: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 12px rgba(255, 107, 0, 0.45))',
            transition: 'transform 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.06) rotate(-2deg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
          }}
        />
      </div>

      {/* Typography Lockup */}
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.2rem', lineHeight: 1 }}>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.45rem',
              fontWeight: 900,
              letterSpacing: '-0.025em',
              color: colorMode === 'dark' ? '#FFFFFF' : '#052E5E',
              textTransform: 'uppercase',
            }}
          >
            STARSHI<span style={{ color: 'var(--brand-orange)' }}>PPP</span>
          </span>
        </div>
        {showTagline && (
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              color: 'var(--brand-orange-light)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginTop: 3,
              fontWeight: 600,
            }}
          >
            Pick • Pack • Perform
          </div>
        )}
      </div>
    </div>
  );
};
