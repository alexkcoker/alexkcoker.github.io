'use client';

import { useState } from 'react';
import { asset } from '@/lib/asset';

/**
 * Image carousel with prev/next controls, matching the original `[data-slideshow]`
 * behavior: one image shown at a time, wrap-around navigation, first image active.
 *
 * `feature` mode centers each image and caps its height (good for full-width
 * galleries of mixed portrait/landscape photos); the default fills the column
 * width as in the original.
 */
export default function Slideshow({
  images,
  feature = false,
}: {
  images: { src: string; alt: string }[];
  feature?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const count = images.length;

  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);

  const containerClass = feature
    ? 'relative flex items-center justify-center rounded-sm bg-black/30'
    : 'relative';

  const imgClass = (active: boolean) =>
    feature
      ? `${active ? 'block' : 'hidden'} mx-auto max-h-[460px] w-auto max-w-full rounded-sm`
      : `${active ? 'block' : 'hidden'} w-full rounded-sm`;

  return (
    <div className={containerClass}>
      {images.map((img, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={img.src}
          src={asset(img.src)}
          alt={img.alt}
          className={imgClass(i === index)}
        />
      ))}

      <button
        type="button"
        aria-label="Previous image"
        onClick={() => go(-1)}
        className="absolute left-1.5 top-1/2 -translate-y-1/2 cursor-pointer border-none bg-[rgba(15,17,21,0.7)] px-2.5 py-1.5 text-lg text-white"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Next image"
        onClick={() => go(1)}
        className="absolute right-1.5 top-1/2 -translate-y-1/2 cursor-pointer border-none bg-[rgba(15,17,21,0.7)] px-2.5 py-1.5 text-lg text-white"
      >
        ›
      </button>

      {feature && (
        <span className="absolute bottom-2 right-2 rounded bg-[rgba(15,17,21,0.7)] px-2 py-0.5 text-xs text-white">
          {index + 1} / {count}
        </span>
      )}
    </div>
  );
}
