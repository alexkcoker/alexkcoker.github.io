# Content TODOs

Running punch list of placeholders and open decisions from the site revamp,
grouped by where they live. Nothing below was invented — each is either a
literal gap or a judgment call only Alex can make. Source-level markers use
`// TODO(alex): ...` comments next to the relevant field in `src/data/content.ts`
so they're visible right where they matter when editing content.

## About / Research Direction (`src/data/content.ts` → `researchStatement`)

- [ ] Review the drafted research-direction paragraph and make it yours — it
      was assembled from the existing project copy, not written by you.
- [ ] Add one sentence on what you want to pursue in a PhD (research
      questions, sub-area, anything more specific than "robotics").

## Contact (`src/data/content.ts` → `contact`)

- [ ] Add an ORCID iD once you have one (no link is rendered until then).

## Recent Updates (`src/data/content.ts` → `updates`)

- [ ] Add dated entries for more recent milestones once you can confirm
      when they happened — at minimum:
  - The LiDAR perception update to the CBF filter (camera → LiDAR).
  - Starting the Agile-But-Safe → Go2 port.

## Missing project dates (`src/data/content.ts`)

These cards have no `dateRange` because no date exists yet in the CV or
elsewhere. Add one and the site will pick it up automatically.

- [ ] Autonomous Drone Search-and-Sample RL Controller (`research` → `projects` section)
- [ ] Porting Agile But Safe to the Unitree Go2 (`research` section) — at
      least a start date/month.
- [ ] CubeSat ADCS — Slew Maneuver & Pointing Budget (`projects` section)
- [ ] Custom Robotic Arm — Learned From Scratch (`projects` section)
- [ ] UNM Pitch Contest — Arid Sustainability Award (`awards` section)
- [ ] Lobo Hackathon — Second Place (`awards` section)
- [ ] Design II Final Project — First Place Team Award (`awards` section)
- [ ] GearMasters Volunteering (`outreach` section)

## Missing stack info (`src/data/content.ts`)

- [ ] Custom Robotic Arm — Learned From Scratch: no language/tooling facts
      were available to populate `meta.stack`, so it's omitted. Add one if
      you want it shown.

## CV file — done, with one cosmetic note

- [x] `public/assets/cv/alex-coker-cv.pdf` now exists, converted from the
      `.docx` you supplied via LibreOffice (confirmed as the authoritative,
      up-to-date version — GPA 3.45/4.0, CBF work described as deployed).
- [ ] Minor pagination quirk: LibreOffice's font metrics differ slightly
      from Word's, so the "Projects" section header now lands at the very
      bottom of page 1 with its content spilling to a mostly-empty page 2.
      Not broken, just not tightly paginated — nudge a line spacing/margin
      in the source doc if you want it back to one page, then redo the
      conversion (or ask Claude to).

## Custom domain (Phase 3.6 — not started)

- [ ] Decide on a custom domain. The current URL
      (`pseudower1.github.io/alexcoker`) puts a pseudonymous handle in front
      of your real name, and that URL goes on a CV/PhD application.
- [ ] Once a domain is chosen: add a `CNAME` file at `public/CNAME` and set
      the DNS records the registrar requires (leave inactive until
      confirmed — not done as part of this pass).
- [ ] Separately: your GitHub *username* (`pseudower1`) also appears in
      every project repo link (`github.com/pseudower1/go2-cbf`, etc.).
      Renaming the GitHub account is a related but distinct decision — note
      it here so it isn't lost, but nothing has been changed.
