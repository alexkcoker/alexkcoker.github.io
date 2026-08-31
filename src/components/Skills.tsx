import { skills } from '@/data/content';

/** Grouped technical skills — scannable by both academic readers and recruiter keyword filters. */
export default function Skills() {
  return (
    <section id="skills" className="mb-24">
      <h2 className="mb-8 text-[1.75rem] font-semibold">Skills</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((group) => (
          <div key={group.category}>
            <h3 className="mb-2 text-sm font-semibold text-text-primary">
              {group.category}
            </h3>
            <ul className="flex flex-col gap-1 text-sm text-text-secondary">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
