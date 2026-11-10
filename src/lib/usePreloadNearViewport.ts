'use client';

import { useEffect, type RefObject } from 'react';

/**
 * Starts buffering a `preload="none"` video shortly before it scrolls into
 * view, so playback is near-instant when the viewer presses play, while
 * videos far down the page still cost nothing on initial load.
 *
 * Skipped when the viewer has Data Saver on or is on a 2G connection; those
 * viewers keep the click-to-load behaviour.
 */
export function usePreloadNearViewport(
  refs: RefObject<HTMLVideoElement | null>[],
  rootMargin = '600px 0px',
) {
  useEffect(() => {
    const conn = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    if (conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? '')) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const videos = refs
      .map((r) => r.current)
      .filter((v): v is HTMLVideoElement => v !== null);
    if (videos.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Preload all videos in the group together (side-by-side pairs must
        // both be ready to play in sync).
        if (!entries.some((e) => e.isIntersecting)) return;
        for (const v of videos) {
          if (v.preload !== 'auto') {
            v.preload = 'auto';
            // Nothing fetched yet and not playing: kick off the download.
            if (v.readyState === 0 && v.paused) v.load();
          }
        }
        observer.disconnect();
      },
      { rootMargin },
    );
    videos.forEach((v) => observer.observe(v));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootMargin]);
}
