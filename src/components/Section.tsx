import type { Section as SectionData } from '@/data/content';
import Card from './Card';
import Reveal from './Reveal';

/** A titled section containing a vertical stack of reveal-animated cards. */
export default function Section({ section }: { section: SectionData }) {
  return (
    <section id={section.id} className="mb-24">
      <h2 className={`text-[1.75rem] font-semibold ${section.intro ? 'mb-3' : 'mb-8'}`}>
        {section.heading}
      </h2>
      {section.intro && (
        <p className="mb-8 max-w-prose text-text-secondary">{section.intro}</p>
      )}
      {/* Cards stack flush (no inter-card margin) to match the original CSS. */}
      {section.cards.map((card, i) => (
        <Reveal key={card.title ?? `${section.id}-${i}`}>
          <Card item={card} />
        </Reveal>
      ))}
    </section>
  );
}
