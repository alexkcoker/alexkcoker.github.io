import { about, researchStatement, updates } from '@/data/content';
import { asset } from '@/lib/asset';

/** Headshot + bio, research-direction statement, and a short dated updates list. */
export default function About() {
  return (
    <section id="about" className="mb-24 flex flex-col gap-8 md:flex-row md:items-start">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(about.headshot)}
        alt="Headshot of Alex Coker"
        className="h-40 w-40 shrink-0 rounded-full border border-border object-cover"
      />
      <div className="flex flex-col gap-6">
        <p className="max-w-prose text-text-secondary">{about.bio}</p>

        <div>
          <h2 className="mb-2 text-lg font-semibold text-text-primary">
            {researchStatement.heading}
          </h2>
          <p className="max-w-prose text-text-secondary">
            {researchStatement.body}
          </p>
        </div>

        {updates.length > 0 && (
          <div>
            <h2 className="mb-2 text-lg font-semibold text-text-primary">
              Recent Updates
            </h2>
            <ul className="flex max-w-prose flex-col gap-1.5">
              {updates.map((u) => (
                <li key={`${u.date}-${u.text}`} className="flex gap-3 text-text-secondary">
                  <span className="w-24 shrink-0 text-sm text-text-secondary">
                    {u.date}
                  </span>
                  <span>{u.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
