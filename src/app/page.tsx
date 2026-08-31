import Section from '@/components/Section';
import About from '@/components/About';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { hero, sections } from '@/data/content';

export default function Home() {
  return (
    <>
      <Nav />

      <main className="mx-auto max-w-[1100px] px-6 py-20">
        {/* ================= HERO ================= */}
        <section className="mb-16">
          <h1 className="mb-3 text-[2rem] font-bold md:text-[2.5rem]">
            {hero.name}
          </h1>
          <p className="max-w-prose text-text-secondary">{hero.tagline}</p>
        </section>

        {/* ================= ABOUT ================= */}
        <About />

        {/* ================= CONTENT SECTIONS ================= */}
        {sections.map((section) => (
          <Section key={section.id} section={section} />
        ))}
      </main>

      <Footer />
    </>
  );
}
