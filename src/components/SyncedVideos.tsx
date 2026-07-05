'use client';

import { useRef, useState } from 'react';
import { asset } from '@/lib/asset';

type Clip = { label: string; src: string; poster?: string };

/**
 * Two videos shown side by side that play in lockstep: pressing play (or
 * clicking either video) starts both; pausing stops both; replay restarts both
 * from the beginning together. Both loop and are muted so they run as an
 * ambient real-vs-sim comparison.
 */
export default function SyncedVideos({
  left,
  right,
  caption,
}: {
  left: Clip;
  right: Clip;
  caption?: string;
}) {
  const leftRef = useRef<HTMLVideoElement>(null);
  const rightRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const forEach = (fn: (v: HTMLVideoElement) => void) =>
    [leftRef.current, rightRef.current].forEach((v) => v && fn(v));

  const play = () => {
    forEach((v) => void v.play().catch(() => {}));
    setPlaying(true);
  };
  const pause = () => {
    forEach((v) => v.pause());
    setPlaying(false);
  };
  const toggle = () => (playing ? pause() : play());
  const replay = () => {
    forEach((v) => {
      v.currentTime = 0;
    });
    play();
  };

  const clips: [Clip, React.RefObject<HTMLVideoElement | null>][] = [
    [left, leftRef],
    [right, rightRef],
  ];

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {clips.map(([clip, ref]) => (
          <div key={clip.src} className="relative overflow-hidden rounded-sm bg-black">
            <span className="absolute left-2 top-2 z-10 rounded bg-[rgba(15,17,21,0.75)] px-2 py-0.5 text-xs font-medium text-white">
              {clip.label}
            </span>
            <video
              ref={ref}
              src={asset(clip.src)}
              poster={clip.poster ? asset(clip.poster) : undefined}
              muted
              loop
              playsInline
              onClick={toggle}
              className="h-56 w-full cursor-pointer bg-black object-contain md:h-72"
            />
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          className="rounded-sm border border-border bg-surface px-3 py-1.5 text-sm text-text-primary transition-colors duration-fast ease hover:border-accent"
        >
          {playing ? '❚❚ Pause both' : '▶ Play both'}
        </button>
        <button
          type="button"
          onClick={replay}
          className="rounded-sm border border-border bg-surface px-3 py-1.5 text-sm text-text-secondary transition-colors duration-fast ease hover:border-accent"
        >
          ↺ Replay
        </button>
        {caption && (
          <span className="text-sm text-text-secondary">{caption}</span>
        )}
      </div>
    </div>
  );
}
