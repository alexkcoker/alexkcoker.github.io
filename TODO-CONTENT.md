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

## Media weight (Phase 3.4)

Poster frames, `preload="none"`, `loading="lazy"`, and explicit video
aspect-ratios are all in place now, which should meaningfully cut *initial*
page weight (nothing but posters and above-the-fold images fetch until you
scroll to or interact with something). Total on-disk media is still ~41 MB
(~15.7 MB images + ~25.7 MB video) — real for someone who reads the whole
page. Per the brief, nothing was silently re-encoded; if you want to shrink
it further, the options, biggest first:

- `robot_arm_demo.mp4` (9.2 MB) and `go2_pos_rough.mp4` (4.1 MB) are the two
  heaviest videos — both could likely drop 50%+ with a slightly lower
  bitrate/resolution with no visible quality loss at the size they're
  displayed on the page.
- `sandia_connector.jpg` (3.3 MB), `sandia_bench.jpg` (2.9 MB), and
  `sandia_kelvin.jpg` (2.0 MB) are full phone/DSLR-resolution photos shown
  in a slideshow that's never displayed larger than the card width —
  downscaling and re-compressing these would cut them to a few hundred KB
  each with no visible difference.
- Ask Claude to do this re-encode pass whenever you want it — holding off
  by default since it touches your original source files.

## Custom domain (Phase 3.6)

- [ ] Decide on a custom domain. The current URL
      (`pseudower1.github.io/alexcoker`) puts a pseudonymous handle in front
      of your real name, and that URL goes on a CV/PhD application. **No
      `CNAME` file has been added** — intentionally left inactive until you
      confirm a domain, per the brief.
- [ ] Once you've picked one, here's the actual GitHub Pages setup:
  1. Buy/have the domain (e.g. via Namecheap, Google Domains successor,
     Cloudflare Registrar, etc.).
  2. At your DNS registrar, add records pointing at GitHub Pages:
     - **Apex domain** (`alexcoker.com`): four `A` records at the apex (`@`)
       pointing to GitHub Pages' IPs — `185.199.108.153`,
       `185.199.109.153`, `185.199.110.153`, `185.199.111.153`. Also add an
       `AAAA` set for IPv6: `2606:50c0:8000::153`, `2606:50c0:8001::153`,
       `2606:50c0:8002::153`, `2606:50c0:8003::153`.
     - **Subdomain** (`www.alexcoker.com` or similar): a `CNAME` record
       pointing to `pseudower1.github.io`.
  3. Create `public/CNAME` in this repo containing just the domain, e.g.
     `alexcoker.com` (no `https://`, no trailing slash).
  4. In the GitHub repo's **Settings → Pages**, enter the same custom
     domain and wait for DNS to verify, then check **Enforce HTTPS** once
     it's available.
  5. Update `metadataBase` in `src/app/layout.tsx` (currently hardcoded to
     `https://pseudower1.github.io/alexcoker/`) to the new domain, so
     OG/Twitter image URLs resolve correctly.
- [ ] Separately: your GitHub *username* (`pseudower1`) also appears in
      every project repo link (`github.com/pseudower1/go2-cbf`, etc.).
      Renaming the GitHub account is a related but distinct decision — note
      it here so it isn't lost, but nothing has been changed.
