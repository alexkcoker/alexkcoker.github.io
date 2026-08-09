'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * Full-screen image overlay. Click the backdrop, press Escape, or hit the
 * close button to dismiss; optional prev/next let a slideshow keep paging
 * while enlarged.
 */
export default function Lightbox({
  src,
  alt,
  onClose,
  onPrev,
  onNext,
}: {
  src: string;
  alt: string;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev?.();
      if (e.key === 'ArrowRight') onNext?.();
    };
    document.addEventListener('keydown', onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose, onPrev, onNext]);

  // Portal straight to <body>: rendering in place would nest this fixed
  // overlay inside the card's `group` div, and any ancestor with an active
  // `transform` (e.g. the card's hover:-translate-y-1) becomes a containing
  // block for `position: fixed`, trapping the overlay inside the card
  // instead of covering the viewport.
  if (!mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 cursor-pointer rounded border-none bg-[rgba(15,17,21,0.7)] px-3 py-1.5 text-2xl leading-none text-white"
      >
        ×
      </button>

      {onPrev && (
        <button
          type="button"
          aria-label="Previous image"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer rounded border-none bg-[rgba(15,17,21,0.7)] px-3 py-2 text-2xl text-white md:left-6"
        >
          ‹
        </button>
      )}
      {onNext && (
        <button
          type="button"
          aria-label="Next image"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded border-none bg-[rgba(15,17,21,0.7)] px-3 py-2 text-2xl text-white md:right-6"
        >
          ›
        </button>
      )}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] max-w-[90vw] cursor-default rounded-sm object-contain"
      />
    </div>,
    document.body
  );
}
