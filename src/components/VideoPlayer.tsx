import { asset } from '@/lib/asset';

/**
 * Playable HTML5 video for self-hosted MP4 demos (e.g. the MPPI-CBF run).
 * Uses native controls so it works without JavaScript.
 *
 * `preload="none"` (no metadata fetch until the viewer presses play) relies
 * on `aspectClassName` reserving the correct box up front so nothing shifts
 * when the video eventually loads — that's genuinely correct regardless of
 * preload strategy, whereas depending on preload="metadata" to establish
 * the box still needs a network round trip before layout settles.
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
  return (
    <video
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
