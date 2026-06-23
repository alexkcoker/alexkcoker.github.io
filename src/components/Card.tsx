import type { CardItem } from '@/data/content';
import CardMediaView from './CardMediaView';

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
  const columns = item.reverse
    ? 'md:grid-cols-[1fr_180px]'
    : 'md:grid-cols-[180px_1fr]';

  return (
    <div
      className={`group grid grid-cols-1 ${columns} gap-7 rounded border border-border bg-surface p-7 transition-[transform,box-shadow,border-color] duration-fast ease hover:-translate-y-1 hover:border-accent hover:shadow-card`}
    >
      {item.media && (
        <CardMediaView
          media={item.media}
          className={item.reverse ? 'md:order-2' : ''}
        />
      )}

      <div className={item.reverse ? 'md:order-1' : ''}>
        <h3 className="text-[1.1rem] font-semibold">{item.title}</h3>
        {item.body && (
          <p className="mt-2 max-w-prose text-text-secondary">{item.body}</p>
        )}
        {item.bullets && (
          <ul className="mt-2 max-w-prose list-disc pl-[18px] text-text-secondary">
            {item.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
