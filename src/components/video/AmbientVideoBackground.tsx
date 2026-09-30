import React, { useState, useEffect, useRef } from 'react';
import type { VideoTheme, PexelsVideoItem } from '../../types';
import { PexelsVideoService, THEME_QUERIES } from '../../services/pexelsService';
import { Play, Pause, Sliders } from 'lucide-react';

interface AmbientVideoProps {
  currentTheme?: VideoTheme;
  onOpenSettings?: () => void;
  overlayOpacity?: number; // 0 to 1
  showControls?: boolean;
}

export const AmbientVideoBackground: React.FC<AmbientVideoProps> = ({
  currentTheme = 'hero',
  onOpenSettings,
  overlayOpacity = 0.52,
  showControls = true,
}) => {
  const [activeTheme, setActiveTheme] = useState<VideoTheme>(currentTheme);
  const [videoData, setVideoData] = useState<PexelsVideoItem | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isDataSaver, setIsDataSaver] = useState<boolean>(false);
  const [apiKeySet, setApiKeySet] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    setActiveTheme(currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    const dataSaver = PexelsVideoService.isDataSaverActive();
    const isMobile = PexelsVideoService.isMobileDevice();
    setIsDataSaver(dataSaver || isMobile);
    setApiKeySet(!!PexelsVideoService.getApiKey());

    let isMounted = true;

    async function loadVideo() {
      setIsLoaded(false);
      try {
        const item = await PexelsVideoService.fetchThemeVideo(activeTheme);
        if (isMounted) {
          setVideoData(item);
        }
      } catch (e) {
        console.error('Error loading video item:', e);
      }
    }

    loadVideo();

    return () => {
      isMounted = false;
    };
  }, [activeTheme]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleVideoCanPlay = () => {
    setIsLoaded(true);
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        zIndex: 0,
        backgroundColor: 'var(--bg-darkest)',
      }}
      aria-hidden="true"
    >
      {/* High-Resolution Poster Layer (Always present for instant paint, fade when video plays) */}
      {videoData?.posterUrl && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${videoData.posterUrl})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(0.7) contrast(1.1)',
            opacity: isLoaded && !isDataSaver ? 0.4 : 0.85,
            transition: 'opacity 1s ease-in-out',
            transform: 'scale(1.02)',
          }}
        />
      )}

      {/* Ambient Video Element (Lazy loaded, muted, loop, playsinline) */}
      {!isDataSaver && videoData?.videoUrl && (
        <video
          ref={videoRef}
          key={videoData.videoUrl}
          autoPlay
          loop
          muted
          playsInline
          onCanPlay={handleVideoCanPlay}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: isLoaded ? 0.82 : 0,
            transition: 'opacity 1s ease-in-out',
            filter: 'contrast(1.18) brightness(0.92) saturate(1.14)',
          }}
        >
          {videoData.videoUrl.endsWith('.webm') && (
            <source src={videoData.videoUrl} type="video/webm" />
          )}
          {videoData.videoUrl.endsWith('.mp4') && (
            <source src={videoData.videoUrl} type="video/mp4" />
          )}
          <source src={videoData.videoUrl} />
        </video>
      )}

      {/* High Contrast Gradient Scrim Overlay for WCAG AAA Accessibility */}
      <div
        className="video-overlay-scrim"
        style={{
          background: 'var(--video-scrim-bg)',
          opacity: overlayOpacity,
          transition: 'background 0.25s ease',
        }}
      />

      {/* Cyber Telemetry Scanlines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'var(--video-vignette)',
          pointerEvents: 'none',
          zIndex: 2,
          transition: 'background-image 0.25s ease',
        }}
      />

      {/* Interactive Video Controls & Telemetry Bar */}
      {showControls && (
        <div
          style={{
            position: 'absolute',
            bottom: '1.25rem',
            right: '1.5rem',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'var(--hud-bg)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid var(--border-card)',
            borderLeft: '3px solid var(--brand-orange)',
            borderRadius: 0,
            padding: '0.35rem 0.75rem',
            boxShadow: 'var(--card-shadow)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 0,
                backgroundColor: isLoaded || isDataSaver ? '#10B981' : '#FF6B00',
                boxShadow: `0 0 8px ${isLoaded || isDataSaver ? '#10B981' : '#FF6B00'}`,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--text-secondary)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              {isDataSaver ? 'WebP Poster Mode' : isLoaded ? 'Ambient 4K Loop' : 'Buffering'}
            </span>
          </div>

          <div
            style={{
              width: 1,
              height: 14,
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              margin: '0 0.2rem',
            }}
          />

          {/* Theme switcher tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            {(['hero', 'unboxing', 'facility'] as VideoTheme[]).map((theme) => (
              <button
                key={theme}
                onClick={() => setActiveTheme(theme)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  textTransform: 'capitalize',
                  padding: '0.2rem 0.5rem',
                  borderRadius: 0,
                  color: activeTheme === theme ? '#FF6B00' : 'var(--text-secondary)',
                  background: activeTheme === theme ? 'rgba(255, 107, 0, 0.15)' : 'transparent',
                  border: activeTheme === theme ? '1px solid rgba(255, 107, 0, 0.35)' : 'none',
                  transition: 'all 0.2s ease',
                }}
                title={`Switch video mood to: ${THEME_QUERIES[theme]}`}
              >
                {theme === 'hero' ? 'Robotics' : theme === 'unboxing' ? 'Unbox' : 'Pontiac'}
              </button>
            ))}
          </div>

          {!isDataSaver && (
            <button
              onClick={togglePlay}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 24,
                height: 24,
                borderRadius: 0,
                background: 'rgba(255, 255, 255, 0.08)',
                color: 'var(--text-white)',
                transition: 'background 0.2s ease',
              }}
              title={isPlaying ? 'Pause ambient video' : 'Play ambient video'}
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            </button>
          )}

          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                padding: '0.2rem 0.45rem',
                borderRadius: 0,
                background: apiKeySet ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.06)',
                color: apiKeySet ? '#34D399' : 'var(--text-secondary)',
                fontSize: '0.68rem',
                fontFamily: 'var(--font-mono)',
                border: apiKeySet ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
              }}
              title="Pexels Video Engine Settings"
            >
              <Sliders size={11} />
              <span>{apiKeySet ? 'Pexels API' : 'Pexels CDN'}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
