import React from 'react';

interface StarshipAnimationOverlayProps {
  className?: string;
  isHovered?: boolean;
}

// Millimeter-accurate vector silhouette matching starshippp-rocket-logo.png (484x123)
const HULL_SILHOUETTE_PATH =
  'M 0,83 L 6,74 L 12,68 L 18,63 L 24,59 L 30,41 L 36,41 L 42,39 L 48,11 L 54,14 L 60,16 L 66,17 L 72,16 L 78,15 L 84,13 L 90,11 L 96,5 L 102,2 L 108,1 L 114,0 L 120,0 L 126,1 L 132,0 L 138,1 L 144,1 L 150,2 L 156,2 L 162,2 L 168,3 L 174,5 L 180,9 L 186,21 L 192,21 L 198,20 L 204,20 L 210,20 L 216,19 L 222,19 L 228,19 L 234,18 L 240,18 L 246,17 L 252,17 L 258,16 L 264,16 L 270,15 L 276,15 L 282,14 L 288,14 L 294,13 L 300,13 L 306,12 L 312,12 L 318,11 L 324,11 L 330,10 L 336,10 L 342,9 L 348,9 L 354,8 L 360,8 L 366,7 L 372,8 L 378,8 L 384,8 L 390,9 L 396,9 L 402,10 L 408,10 L 414,10 L 420,11 L 426,15 L 432,23 L 438,31 L 444,34 L 450,29 L 456,23 L 462,18 L 468,57 L 474,60 L 480,64 L 483,55 L 480,67 L 474,68 L 468,68 L 462,69 L 456,70 L 450,78 L 444,103 L 438,90 L 432,92 L 426,97 L 420,103 L 414,108 L 408,109 L 402,109 L 396,109 L 390,109 L 384,109 L 378,110 L 372,110 L 366,110 L 360,110 L 354,110 L 348,109 L 342,109 L 336,108 L 330,108 L 324,108 L 318,107 L 312,107 L 306,106 L 300,106 L 294,106 L 288,105 L 282,105 L 276,105 L 270,104 L 264,104 L 258,103 L 252,103 L 246,103 L 240,102 L 234,102 L 228,101 L 222,101 L 216,100 L 210,100 L 204,100 L 198,99 L 192,99 L 186,98 L 180,98 L 174,98 L 168,106 L 162,111 L 156,113 L 150,113 L 144,113 L 138,112 L 132,118 L 126,121 L 120,122 L 114,122 L 108,121 L 102,119 L 96,118 L 90,116 L 84,113 L 78,105 L 72,102 L 66,100 L 60,99 L 54,99 L 48,101 L 42,84 L 36,85 L 30,86 L 24,73 L 18,75 L 12,77 L 6,80 L 0,84 Z';

export const StarshipAnimationOverlay: React.FC<StarshipAnimationOverlayProps> = ({
  className = '',
  isHovered = false,
}) => {
  return (
    <div
      className={`starship-fx-overlay-container ${className} ${isHovered ? 'is-hovered' : ''}`}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 2,
      }}
      aria-hidden="true"
    >
      {/* SVG Laser Contour Perimeter Scanner */}
      <svg
        viewBox="0 0 484 123"
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          position: 'absolute',
          inset: 0,
        }}
      >
        <defs>
          {/* Laser Glow Filter */}
          <filter id="laserGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Traveling Multi-Color Laser Pulse Gradient (Cyan -> Goldenrod -> Vivid Orange) */}
          <linearGradient id="laserStrokeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.1" />
            <stop offset="35%" stopColor="#00E5FF" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#FFAA00" stopOpacity="1" />
            <stop offset="100%" stopColor="#FF4400" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Subtle Static Hull Guide Track */}
        <path
          d={HULL_SILHOUETTE_PATH}
          fill="none"
          stroke="rgba(255, 107, 0, 0.12)"
          strokeWidth="1.2"
        />

        {/* Animated Traveling Multi-Color Laser Scan Beam */}
        <path
          d={HULL_SILHOUETTE_PATH}
          className="starship-laser-beam"
          fill="none"
          stroke="url(#laserStrokeGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#laserGlow)"
        />
      </svg>
    </div>
  );
};
