'use client';

import { useState } from 'react';
import { asset } from '@/lib/asset';

/**
 * Image carousel with prev/next controls, matching the original `[data-slideshow]`
 * behavior: one image shown at a time, wrap-around navigation, first image active.
 */
export default function Slideshow({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  const [index, setIndex] = useState(0);
  const count = images.length;

  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);

  return (
    <div className="relative">
      {images.map((img, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={img.src}
          src={asset(img.src)}
          alt={img.alt}
          className={`w-full rounded-sm ${i === index ? 'block' : 'hidden'}`}
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
    </div>
  );
}
