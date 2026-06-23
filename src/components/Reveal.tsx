'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Fade-and-rise-on-scroll wrapper. Reproduces the original IntersectionObserver
 * reveal (threshold 0.15, fires once). The `.reveal` / `.visible` styles live in
 * globals.css so the visual timing matches the source exactly.
 */
export default function Reveal({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  );
}
