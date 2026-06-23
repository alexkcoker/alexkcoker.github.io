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
  // Featured cards stack media full-width on top with content below; standard
  // cards use the original two-column (media + content) grid.
  const layout = item.featured
    ? 'flex flex-col gap-6'
    : `grid grid-cols-1 gap-7 ${
        item.reverse ? 'md:grid-cols-[1fr_180px]' : 'md:grid-cols-[180px_1fr]'
      }`;

  return (
    <div
      className={`group ${layout} rounded border border-border bg-surface p-7 transition-[transform,box-shadow,border-color] duration-fast ease hover:-translate-y-1 hover:border-accent hover:shadow-card`}
    >
      {/* Featured: title sits above the media for context. */}
      {item.featured && item.title && (
        <h3 className="text-[1.1rem] font-semibold">{item.title}</h3>
      )}

      {item.media && (
        <CardMediaView
          media={item.media}
          featured={item.featured}
          className={!item.featured && item.reverse ? 'md:order-2' : ''}
        />
      )}

      <div className={!item.featured && item.reverse ? 'md:order-1' : ''}>
        {!item.featured && item.title && (
          <h3 className="text-[1.1rem] font-semibold">{item.title}</h3>
        )}
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
