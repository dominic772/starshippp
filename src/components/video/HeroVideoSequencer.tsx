import React, { useState, useEffect, useRef } from 'react';

interface SceneItem {
  id: string;
  title: string;
  tag: string;
  videoUrl: string;
  posterUrl: string;
  durationMs: number;
}

const HERO_SCENES: SceneItem[] = [
  {
    id: 'flythrough',
    title: 'Automated 4K High-Bay Sortation Aisle',
    tag: 'CAM 01 • HIGH-BAY RACKS',
    videoUrl: '/videos/warehouse-flythrough.mp4',
    posterUrl: '/images/warehouse-flythrough-poster.jpg',
    durationMs: 7000,
  },
  {
    id: 'freight',
    title: 'Pontiac Corridor & Multimodal Freight Telemetry',
    tag: 'CAM 02 • FREIGHT DISPATCH',
    videoUrl: '/videos/freight-ocean-digital.mp4',
    posterUrl: '/images/freight-ocean-poster.jpg',
    durationMs: 7000,
  },
  {
    id: 'unboxing',
    title: 'Precision Pick & Custom DTC Kitting Station',
    tag: 'CAM 03 • WHITE-GLOVE UNBOXING',
    videoUrl: '/videos/boutique-unboxing.webm',
    posterUrl: '/images/boutique-unboxing.jpg',
    durationMs: 6500,
  },
  {
    id: 'barcode',
    title: 'High-Speed Automated Optical Ingestion Line',
    tag: 'CAM 04 • 99.98% SLA VERIFIED',
    videoUrl: '/videos/package-scan-dispatch.mp4',
    posterUrl: '/images/package-scan-poster.jpg',
    durationMs: 6500,
  },
  {
    id: 'tablet',
    title: 'Real-Time Cloud WMS Inventory Tracking',
    tag: 'CAM 05 • INVENTORY CLOUD',
    videoUrl: '/videos/tablet-warehouse.mp4',
    posterUrl: '/images/tablet-warehouse-poster.jpg',
    durationMs: 6500,
  },
];

interface HeroVideoSequencerProps {
  overlayOpacity?: number;
  onOpenSettings?: () => void;
}

export const HeroVideoSequencer: React.FC<HeroVideoSequencerProps> = ({
  overlayOpacity = 0.42,
}) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [incomingSceneIndex, setIncomingSceneIndex] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Start initial video on mount
  useEffect(() => {
    const firstVid = videoRefs.current[0];
    if (firstVid) {
      firstVid.play().catch(() => {});
    }
  }, []);

  // Timer-based seamless sequencer with pre-warming to eliminate transition delay
  useEffect(() => {
    const currentScene = HERO_SCENES[currentSceneIndex];
    const nextIndex = (currentSceneIndex + 1) % HERO_SCENES.length;

    // 1. Pre-warm next video 1000ms before transition so it is actively decoding and streaming frames
    const prewarmLeadTime = 1000;
    const prewarmDelay = Math.max(500, currentScene.durationMs - prewarmLeadTime);

    let transitionTimer: ReturnType<typeof setTimeout> | null = null;
    let completeTimer: ReturnType<typeof setTimeout> | null = null;

    const prewarmTimer = setTimeout(() => {
      const nextVid = videoRefs.current[nextIndex];
      if (nextVid) {
        nextVid.currentTime = 0;
        nextVid.play().catch(() => {});
      }
    }, prewarmDelay);

    // 2. Start seamless crossfade at durationMs (no fade to black!)
    transitionTimer = setTimeout(() => {
      setIncomingSceneIndex(nextIndex);

      // Ensure incoming video is playing
      const incomingVid = videoRefs.current[nextIndex];
      if (incomingVid && incomingVid.paused) {
        incomingVid.play().catch(() => {});
      }

      // 3. Complete crossfade transition after CSS transition duration (700ms)
      completeTimer = setTimeout(() => {
        const oldIndex = currentSceneIndex;
        setCurrentSceneIndex(nextIndex);
        setIncomingSceneIndex(null);

        // Pause previous video to conserve CPU/GPU
        const oldVid = videoRefs.current[oldIndex];
        if (oldVid) {
          oldVid.pause();
        }
      }, 700);
    }, currentScene.durationMs);

    return () => {
      clearTimeout(prewarmTimer);
      if (transitionTimer) clearTimeout(transitionTimer);
      if (completeTimer) clearTimeout(completeTimer);
    };
  }, [currentSceneIndex]);

  // Pause active video when tab is hidden, resume when foregrounded
  useEffect(() => {
    const handleVisibilityChange = () => {
      const activeIdx = incomingSceneIndex !== null ? incomingSceneIndex : currentSceneIndex;
      const vid = videoRefs.current[activeIdx];
      if (document.hidden) {
        vid?.pause();
      } else {
        vid?.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [currentSceneIndex, incomingSceneIndex]);

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
      {/* Video Tracks */}
      {HERO_SCENES.map((scene, idx) => {
        const isCurrent = idx === currentSceneIndex;
        const isIncoming = idx === incomingSceneIndex;

        let opacity = 0;
        let zIndex = 1;

        if (isIncoming) {
          opacity = 1;
          zIndex = 3;
        } else if (isCurrent) {
          opacity = 1;
          zIndex = 2;
        } else {
          opacity = 0;
          zIndex = 1;
        }

        return (
          <div
            key={scene.id}
            style={{
              position: 'absolute',
              inset: 0,
              opacity,
              transition: isIncoming
                ? 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
                : isCurrent
                ? 'none'
                : 'opacity 0.4s ease',
              zIndex,
              pointerEvents: 'none',
              willChange: isIncoming || isCurrent ? 'opacity' : 'auto',
            }}
          >
            {/* Poster layer */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${scene.posterUrl})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                filter: 'brightness(0.8) contrast(1.15)',
              }}
            />

            {/* Video element */}
            <video
              ref={(el) => {
                videoRefs.current[idx] = el;
              }}
              src={scene.videoUrl}
              preload="auto"
              autoPlay={idx === 0}
              loop
              muted
              playsInline
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                filter: 'contrast(1.16) brightness(1.0) saturate(1.16)',
              }}
            />
          </div>
        );
      })}

      {/* Cyber Contrast Scrim Overlay for Perfect Text Contrast */}
      <div
        className="hero-video-scrim"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--video-scrim-bg)',
          opacity: overlayOpacity,
          zIndex: 4,
          pointerEvents: 'none',
          transition: 'background 0.25s ease',
        }}
      />

      {/* Radial Edge Vignette */}
      <div
        className="hero-video-vignette"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'var(--video-vignette)',
          zIndex: 5,
          pointerEvents: 'none',
          transition: 'background-image 0.25s ease',
        }}
      />
    </div>
  );
};