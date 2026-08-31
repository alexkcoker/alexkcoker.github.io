'use client';

import { useEffect, useState } from 'react';
import { contact } from '@/data/content';
import { asset } from '@/lib/asset';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'research', label: 'Research' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
];

/** Sticky top nav with anchor links, a mobile toggle, and scroll-spy highlighting. */
export default function Nav() {
  const [active, setActive] = useState<string>('about');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport among those visible.
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const top = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        );
        setActive(top.target.id);
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-3">
        <a href="#about" className="text-sm font-semibold text-text-primary">
          Alex Coker
        </a>

        {/* Desktop links */}
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              aria-current={active === l.id ? 'true' : undefined}
              className={
                active === l.id
                  ? 'font-medium text-accent'
                  : 'text-text-secondary hover:text-text-primary'
              }
            >
              {l.label}
            </a>
          ))}
          <a
            href={asset(contact.cvPath)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-text-primary"
          >
            CV
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="text-sm text-text-primary md:hidden"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-6 py-3 text-sm md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              aria-current={active === l.id ? 'true' : undefined}
              className={
                active === l.id
                  ? 'py-1.5 font-medium text-accent'
                  : 'py-1.5 text-text-secondary'
              }
            >
              {l.label}
            </a>
          ))}
          <a
            href={asset(contact.cvPath)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="py-1.5 text-text-secondary"
          >
            CV
          </a>
        </nav>
      )}
    </header>
  );
}
