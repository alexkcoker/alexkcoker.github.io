'use client';

import { useRef } from 'react';
import { asset } from '@/lib/asset';
import { usePreloadNearViewport } from '@/lib/usePreloadNearViewport';

/**
 * Playable HTML5 video for self-hosted MP4 demos (e.g. the MPPI-CBF run).
 * Uses native controls so it works without JavaScript.
 *
 * `preload="none"` (no metadata fetch until the viewer presses play) relies
 * on `aspectClassName` reserving the correct box up front so nothing shifts
 * when the video eventually loads — that's genuinely correct regardless of
 * preload strategy, whereas depending on preload="metadata" to establish
 * the box still needs a network round trip before layout settles.
 *
 * `usePreloadNearViewport` switches to preload="auto" as the video nears the
 * viewport, so it is already buffering by the time the viewer presses play.
 */
export default function VideoPlayer({
  src,
  poster,
  aspectClassName = 'aspect-video',
}: {
  src: string;
  poster?: string;
  /** Tailwind aspect-ratio class; defaults to 16:9. Override for non-16:9 sources. */
  aspectClassName?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  usePreloadNearViewport([ref]);

  return (
    <video
      ref={ref}
      controls
      preload="none"
      poster={poster ? asset(poster) : undefined}
      className={`w-full rounded-sm bg-black ${aspectClassName}`}
    >
      <source src={asset(src)} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
