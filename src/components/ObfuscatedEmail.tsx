'use client';

import { useEffect, useState } from 'react';

/**
 * Renders "user [at] domain" in the static HTML (so scrapers regexing for a
 * plain email address don't find one in the prerendered page), then upgrades
 * to a real, copy-pasteable mailto: link once mounted in the browser.
 */
export default function ObfuscatedEmail({
  user,
  domain,
  className,
}: {
  user: string;
  domain: string;
  className?: string;
}) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  if (!ready) {
    return (
      <span className={className}>
        {user} [at] {domain}
      </span>
    );
  }

  const email = `${user}@${domain}`;
  return (
    <a href={`mailto:${email}`} className={className}>
      {email}
    </a>
  );
}
