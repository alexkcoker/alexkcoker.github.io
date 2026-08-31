import { contact } from '@/data/content';
import { asset } from '@/lib/asset';
import ObfuscatedEmail from './ObfuscatedEmail';

/** Persistent contact/profile links, CV download, and a build-time "last updated" stamp. */
export default function Footer() {
  const lastUpdated = process.env.NEXT_PUBLIC_LAST_UPDATED;

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1100px] flex-col gap-3 px-6 py-10">
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <ObfuscatedEmail
            user={contact.emailUser}
            domain={contact.emailDomain}
            className="link"
          />
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            GitHub
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            LinkedIn
          </a>
          {/* TODO(alex): add an ORCID link here once you have an ORCID iD. */}
          <a
            href={asset(contact.cvPath)}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            Download CV (PDF)
          </a>
        </nav>
        {lastUpdated && (
          <p className="text-xs text-text-secondary">
            Last updated {lastUpdated}
          </p>
        )}
      </div>
    </footer>
  );
}
