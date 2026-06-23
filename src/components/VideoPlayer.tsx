import { asset } from '@/lib/asset';

/**
 * Playable HTML5 video for self-hosted MP4 demos (e.g. the MPPI-CBF run).
 * Uses native controls so it works without JavaScript.
 */
export default function VideoPlayer({
  src,
  poster,
}: {
  src: string;
  poster?: string;
}) {
  return (
    <video
      controls
      preload="metadata"
      poster={poster ? asset(poster) : undefined}
      className="w-full rounded-sm bg-black"
    >
      <source src={asset(src)} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
