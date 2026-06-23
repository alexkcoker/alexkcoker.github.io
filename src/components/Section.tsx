import type { Section as SectionData } from '@/data/content';
import Card from './Card';
import Reveal from './Reveal';

/** A titled section containing a vertical stack of reveal-animated cards. */
export default function Section({ section }: { section: SectionData }) {
  return (
    <section id={section.id} className="mb-24">
      <h2 className="mb-8 text-[1.75rem] font-semibold">{section.heading}</h2>
      {/* Cards stack flush (no inter-card margin) to match the original CSS. */}
      {section.cards.map((card) => (
        <Reveal key={card.title}>
          <Card item={card} />
        </Reveal>
      ))}
    </section>
  );
}
