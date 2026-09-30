import React from 'react';

interface StarshipppLogoProps {
  /**
   * 'full': Icon on top + STARSHIPPP typography below (matching user asset)
   * 'horizontal': Icon on left + STARSHIPPP .com typography on right (ideal for navbar)
   * 'mark': Just the iconic orange box + star
   */
  variant?: 'full' | 'horizontal' | 'mark';
  /**
   * 'dark': White/light text for dark cyber backgrounds (default for starshippp.com)
   * 'original': Navy blue text (#052E5E) matching the original uploaded file
   */
  colorMode?: 'dark' | 'original';
  height?: number | string;
  className?: string;
  showTagline?: boolean;
}

export const StarshipppLogo: React.FC<StarshipppLogoProps> = ({
  variant = 'horizontal',
  colorMode = 'dark',
  height = 38,
  className = '',
  showTagline = true,
}) => {
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

  // Horizontal variant (Ideal for Navbar & Header)
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
