import Section from '@/components/Section';
import About from '@/components/About';
import Nav from '@/components/Nav';
import Skills from '@/components/Skills';
import Footer from '@/components/Footer';
import { hero, sections } from '@/data/content';

// Skills sits between "Experience" and "Awards" — after the work that
// evidences it, before the accolades that close the page.
const BEFORE_SKILLS = ['research', 'projects', 'experience'];

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

        {/* ================= RESEARCH / PROJECTS / EXPERIENCE ================= */}
        {sections
          .filter((s) => BEFORE_SKILLS.includes(s.id))
          .map((section) => (
            <Section key={section.id} section={section} />
          ))}

        {/* ================= SKILLS ================= */}
        <Skills />

        {/* ================= AWARDS / OUTREACH ================= */}
        {sections
          .filter((s) => !BEFORE_SKILLS.includes(s.id))
          .map((section) => (
            <Section key={section.id} section={section} />
          ))}
      </main>

      <Footer />
    </>
  );
}
