import type { VideoTheme, PexelsVideoItem } from '../types';

const STORAGE_KEY_PREFIX = 'starshippp_pexels_cache_';
const API_KEY_STORAGE = 'starshippp_pexels_api_key';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

// Default curated fallback videos and posters for guaranteed high-fidelity render
export const FALLBACK_VIDEOS: Record<VideoTheme, PexelsVideoItem> = {
  hero: {
    id: 'hero-curated-01',
    theme: 'hero',
    query: 'warehouse automation, logistics robot, package conveyor',
    title: 'Automated High-Bay Sortation & Pallet Storage',
    videoUrl: '/videos/warehouse-flythrough.mp4',
    posterUrl: '/images/warehouse-flythrough-poster.jpg',
    author: 'Starshippp Autonomous Fleet',
    duration: 14,
  },
  unboxing: {
    id: 'unboxing-curated-02',
    theme: 'unboxing',
    query: 'luxury packaging, gift wrapping, artisan packing',
    title: 'High-Touch Boutique Parcel Presentation & Packaging',
    videoUrl: '/videos/boutique-unboxing.webm',
    posterUrl: '/images/boutique-unboxing.jpg',
    author: 'Starshippp Kitting Studio',
    duration: 16,
  },
  facility: {
    id: 'facility-curated-03',
    theme: 'facility',
    query: 'industrial distribution center, freight transit',
    title: 'Pontiac Distribution Center & Multimodal Freight Corridor',
    videoUrl: '/videos/freight-ocean-digital.mp4',
    posterUrl: '/images/freight-ocean-poster.jpg',
    author: 'Starshippp Great Lakes Freight Transit',
    duration: 10,
  },
};

export const THEME_QUERIES: Record<VideoTheme, string> = {
  hero: 'warehouse automation, logistics robot, package conveyor',
  unboxing: 'luxury packaging, gift wrapping, artisan packing',
  facility: 'industrial distribution center, freight transit',
};

interface CacheEntry {
  timestamp: number;
  data: PexelsVideoItem;
}

export class PexelsVideoService {
  private static getStoredApiKey(): string | null {
    if (typeof window === 'undefined') return null;
    return (
      localStorage.getItem(API_KEY_STORAGE) ||
      (import.meta.env?.VITE_PEXELS_API_KEY as string) ||
      null
    );
  }

  public static setApiKey(key: string): void {
    if (typeof window === 'undefined') return;
    if (key.trim()) {
      localStorage.setItem(API_KEY_STORAGE, key.trim());
    } else {
      localStorage.removeItem(API_KEY_STORAGE);
    }
  }

  public static getApiKey(): string | null {
    return this.getStoredApiKey();
  }

  public static isDataSaverActive(): boolean {
    if (typeof navigator === 'undefined') return false;
    const connection = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (connection?.saveData) return true;
    if (connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g') return true;
    return false;
  }

  public static isMobileDevice(): boolean {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  }

  public static async fetchThemeVideo(
    theme: VideoTheme,
    customQuery?: string
  ): Promise<PexelsVideoItem> {
    const query = customQuery || THEME_QUERIES[theme];
    const cacheKey = `${STORAGE_KEY_PREFIX}${theme}_${encodeURIComponent(query)}`;

    // 1. Check local cache
    if (typeof window !== 'undefined') {
      try {
        const cachedRaw = localStorage.getItem(cacheKey);
        if (cachedRaw) {
          const entry: CacheEntry = JSON.parse(cachedRaw);
          if (Date.now() - entry.timestamp < CACHE_TTL_MS) {
            return entry.data;
          }
        }
      } catch (e) {
        console.warn('Cache read error:', e);
      }
    }

    const apiKey = this.getStoredApiKey();

    // If no API key is provided, return default curated high-res item
    if (!apiKey) {
      return FALLBACK_VIDEOS[theme];
    }

    // 2. Fetch from Pexels API
    try {
      const url = `https://api.pexels.com/videos/search?query=${encodeURIComponent(
        query
      )}&per_page=5&orientation=landscape&size=medium`;

      const response = await fetch(url, {
        headers: {
          Authorization: apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`Pexels API error status: ${response.status}`);
      }

      const json = await response.json();
      const videoList = json?.videos || [];

      if (videoList.length === 0) {
        return FALLBACK_VIDEOS[theme];
      }

      // Pick best resolution MP4 (HD 1080p or 720p)
      const firstVid = videoList[0];
      const videoFiles = firstVid.video_files || [];
      const bestFile =
        videoFiles.find((f: { quality: string; width: number }) => f.quality === 'hd' && f.width >= 1280) ||
        videoFiles[0];

      const item: PexelsVideoItem = {
        id: firstVid.id,
        theme,
        query,
        title: firstVid.url ? `Pexels Video #${firstVid.id}` : FALLBACK_VIDEOS[theme].title,
        videoUrl: bestFile?.link || FALLBACK_VIDEOS[theme].videoUrl,
        posterUrl: firstVid.image || FALLBACK_VIDEOS[theme].posterUrl,
        author: firstVid.user?.name || 'Pexels Contributor',
        authorUrl: firstVid.user?.url,
        duration: firstVid.duration,
        width: bestFile?.width,
        height: bestFile?.height,
      };

      // Store in cache
      if (typeof window !== 'undefined') {
        try {
          const entry: CacheEntry = {
            timestamp: Date.now(),
            data: item,
          };
          localStorage.setItem(cacheKey, JSON.stringify(entry));
        } catch (e) {
          console.warn('Cache write error:', e);
        }
      }

      return item;
    } catch (err) {
      console.warn('Pexels API fetch failed, falling back to curated video assets:', err);
      return FALLBACK_VIDEOS[theme];
    }
  }

  public static clearCache(): void {
    if (typeof window === 'undefined') return;
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(STORAGE_KEY_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  }
}
