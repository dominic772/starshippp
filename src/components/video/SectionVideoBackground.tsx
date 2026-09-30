import React, { useRef, useEffect, useState } from 'react';

interface SectionVideoBackgroundProps {
  videoUrl: string;
  posterUrl: string;
  overlayOpacity?: number; // e.g. 0.86
  fallbackColor?: string;
}

export const SectionVideoBackground: React.FC<SectionVideoBackgroundProps> = ({
  videoUrl,
  posterUrl,
  overlayOpacity = 0.78,
  fallbackColor = 'var(--bg-darkest)',
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // IntersectionObserver to pause/play video only when in view (saving CPU/GPU/memory)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            videoRef.current?.play().catch(() => {});
          } else {
            setIsInView(false);
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        zIndex: 0,
        backgroundColor: fallbackColor,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      {/* High-Resolution Poster Layer (Instant Paint) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${posterUrl})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          opacity: isLoaded ? 0.45 : 0.85,
          filter: 'brightness(0.72) contrast(1.15)',
          transition: 'opacity 1.2s ease',
        }}
      />

      {/* Video Loop Element (Muted, Playsinline, Loop) */}
      {isInView && (
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onCanPlay={() => setIsLoaded(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: isLoaded ? 0.85 : 0,
            transition: 'opacity 1.2s ease-in-out',
            filter: 'contrast(1.16) brightness(0.98) saturate(1.15)',
          }}
        />
      )}

      {/* Deep Cyber Scrim for WCAG AAA Text Readability */}
      <div
        className="section-video-scrim"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--video-scrim-bg)',
          opacity: overlayOpacity,
          transition: 'background 0.25s ease',
        }}
      />

      {/* Cyber Subtle Scanline Mesh */}
      <div
        className="section-video-vignette"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'var(--video-vignette)',
          transition: 'background-image 0.25s ease',
        }}
      />
    </div>
  );
};
