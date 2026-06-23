import Section from '@/components/Section';
import { hero, sections, philosophy } from '@/data/content';

export default function Home() {
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-20">
      {/* ================= HERO ================= */}
      <section className="mb-24">
        <h1 className="mb-3 text-[2rem] font-bold md:text-[2.5rem]">
          {hero.name}
        </h1>
        <p className="max-w-prose text-text-secondary">{hero.tagline}</p>
      </section>

      {/* ================= CONTENT SECTIONS ================= */}
      {sections.map((section) => (
        <Section key={section.id} section={section} />
      ))}

      {/* ================= PHILOSOPHY ================= */}
      <section id="philosophy" className="mb-24">
        <h2 className="mb-8 text-[1.75rem] font-semibold">
          {philosophy.heading}
        </h2>
        <p className="max-w-prose text-text-secondary">{philosophy.body}</p>
      </section>
    </main>
  );
}
