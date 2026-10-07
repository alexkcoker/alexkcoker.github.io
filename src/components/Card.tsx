import type { CardItem } from '@/data/content';
import CardMediaView from './CardMediaView';
import TextWithLink from './TextWithLink';

/**
 * Publication byline: author list (the site owner bolded) above the venue and
 * review status. Rendered between the title and the summary.
 */
function PublicationHeader({ item }: { item: CardItem }) {
  if (!item.authors && !item.venue) return null;
  return (
    <>
      {item.authors && item.authors.length > 0 && (
        <p className="mt-2 text-sm text-text-secondary">
          {item.authors.map((a, i) => (
            <span key={a.name}>
              {i > 0 && ', '}
              <span className={a.self ? 'font-semibold text-text-primary' : undefined}>
                {a.name}
              </span>
            </span>
          ))}
        </p>
      )}
      {item.venue && (
        <p className="mt-1 text-sm text-text-secondary">{item.venue}</p>
      )}
    </>
  );
}

/** Status values that get a colored dot; anything else just prints plain. */
const STATUS_COLOR: Record<string, string> = {
  'Deployed on hardware': 'bg-accent',
  'Simulation only': 'bg-text-secondary',
  'In progress': 'bg-yellow-400',
};

/** At-a-glance project metadata: role, status, stack — real structure, not a middle-dot string. */
function MetaBlock({ meta }: { meta: NonNullable<CardItem['meta']> }) {
  return (
    <dl className="flex flex-wrap gap-x-8 gap-y-3 rounded border border-border bg-bg/40 px-4 py-3 text-sm">
      {meta.role && (
        <div className="flex flex-col gap-0.5">
          <dt className="text-xs font-medium text-text-secondary">Role</dt>
          <dd className="text-text-primary">{meta.role}</dd>
        </div>
      )}
      {meta.status && (
        <div className="flex flex-col gap-0.5">
          <dt className="text-xs font-medium text-text-secondary">Status</dt>
          <dd className="flex items-center gap-1.5 text-text-primary">
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${STATUS_COLOR[meta.status] ?? 'bg-text-secondary'}`}
            />
            {meta.status}
          </dd>
        </div>
      )}
      {meta.stack && meta.stack.length > 0 && (
        <div className="flex flex-col gap-0.5">
          <dt className="text-xs font-medium text-text-secondary">Stack</dt>
          <dd className="text-text-primary">{meta.stack.join(', ')}</dd>
        </div>
      )}
    </dl>
  );
}

/**
 * Row of outbound links for a card. Prefers the `links` list; falls back to the
 * single `repoUrl`/`repoLabel` pair the project cards use.
 */
function CardLinks({ item, className }: { item: CardItem; className?: string }) {
  const links =
    item.links ??
    (item.repoUrl
      ? [{ label: item.repoLabel ?? 'View source on GitHub', href: item.repoUrl }]
      : []);
  if (links.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-x-5 gap-y-1 ${className ?? ''}`}>
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="link w-fit text-sm font-medium"
        >
          {l.label}
        </a>
      ))}
    </div>
  );
}

/** Extra structured fields shared by the featured and standard layouts. */
function CardExtras({ item }: { item: CardItem }) {
  return (
    <>
      {item.meta && <MetaBlock meta={item.meta} />}
      {item.contribution && (
        <p className="text-sm text-text-secondary">
          <span className="font-medium text-text-primary">My contribution:</span>{' '}
          {item.contribution}
        </p>
      )}
      {item.talks && item.talks.length > 0 && (
        <div>
          <h4 className="mb-1 text-sm font-medium text-text-primary">
            Talks &amp; Presentations
          </h4>
          <ul className="list-disc pl-5 text-sm text-text-secondary">
            {item.talks.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

/**
 * Card component mirroring the original `.card` / `.card-reverse` layout:
 *   - two-column grid (180px media + flexible content), collapsing to a single
 *     column under 700px
 *   - reverse variant swaps column order
 *   - hover lifts the card, highlights the border and zooms the image
 *
 * Text-only cards (no media) keep the same grid, matching the source markup.
 */
export default function Card({ item }: { item: CardItem }) {
  // Featured cards stack media full-width on top with content below; standard
  // cards use the original two-column (media + content) grid.
  // Tailwind's scanner needs each arbitrary-value class spelled out literally
  // (not composed via interpolation) to generate it — hence the explicit branches.
  const mediaColsClass = item.wideMedia
    ? item.reverse
      ? 'md:grid-cols-[1fr_360px]'
      : 'md:grid-cols-[360px_1fr]'
    : item.reverse
      ? 'md:grid-cols-[1fr_180px]'
      : 'md:grid-cols-[180px_1fr]';
  // A card with no media gets a single full-width column: the two-column grid
  // would place its only child in the narrow 180px media track.
  const layout = item.featured
    ? 'flex flex-col gap-6'
    : `grid grid-cols-1 gap-7 ${item.media ? mediaColsClass : ''}`;

  return (
    <div
      className={`group ${layout} rounded border border-border bg-surface p-7 transition-[transform,box-shadow,border-color] duration-fast ease hover:-translate-y-1 hover:border-accent hover:shadow-card`}
    >
      {item.featured ? (
        /* Featured: title + overview on top, then the media (which may hold its
           own labeled sub-sections). */
        <>
          {item.dateRange && (
            <p className="text-sm text-text-secondary">{item.dateRange}</p>
          )}
          {item.title && (
            <h3 className="text-[1.1rem] font-semibold">{item.title}</h3>
          )}
          <PublicationHeader item={item} />
          {item.body && (
            <p className="-mt-2 max-w-prose text-text-secondary">
              <TextWithLink text={item.body} link={item.bodyLink} />
            </p>
          )}
          <CardExtras item={item} />
          <CardLinks item={item} className="-mt-2" />
          {item.media && <CardMediaView media={item.media} featured />}
        </>
      ) : (
        // Content always precedes media in DOM order — a screen reader (or a
        // stacked mobile layout, where `order` doesn't apply below `md:`)
        // hits the heading before a video's control set, not after. Desktop
        // left/right column placement is done purely with CSS `order`.
        <>
          <div className={item.reverse ? 'md:order-1' : 'md:order-2'}>
            {item.dateRange && (
              <p className="text-sm text-text-secondary">{item.dateRange}</p>
            )}
            {item.title && (
              <h3 className="text-[1.1rem] font-semibold">{item.title}</h3>
            )}
            <PublicationHeader item={item} />
            {item.body && (
              <p className="mt-2 max-w-prose text-text-secondary">
                <TextWithLink text={item.body} link={item.bodyLink} />
              </p>
            )}
            {item.bullets && (
              <ul className="mt-2 max-w-prose list-disc pl-[18px] text-text-secondary">
                {item.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
            <CardExtras item={item} />
            <CardLinks item={item} className="mt-3" />
          </div>
          {item.media && (
            <CardMediaView
              media={item.media}
              className={item.reverse ? 'md:order-2' : 'md:order-1'}
            />
          )}
        </>
      )}
    </div>
  );
}
