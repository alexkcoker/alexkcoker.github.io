/**
 * Single source of truth for page content, mirroring the original site exactly.
 *
 * `media` describes the left/right column of each card:
 *   - { type: 'video', src }  -> responsive YouTube embed
 *   - { type: 'image', src, alt }
 *   - { type: 'slideshow', images: [{ src, alt }] }
 *   - undefined -> text-only card (no media column)
 */

/**
 * A labeled block within a `segments` card: a video + image pair, or a pair of
 * synchronized side-by-side clips (real vs sim).
 */
export interface MediaSegment {
  heading: string;
  /** Optional paragraph shown under the heading, above the media. */
  body?: string;
  video?: { src: string; poster?: string; caption?: string; aspect?: string };
  image?: { src: string; alt: string; caption?: string };
  synced?: {
    left: { label: string; src: string; poster?: string };
    right: { label: string; src: string; poster?: string };
    caption?: string;
  };
}

export type CardMedia =
  | { type: 'video'; src: string; title: string }
  | { type: 'image'; src: string; alt: string }
  | { type: 'slideshow'; images: { src: string; alt: string }[] }
  // A single self-hosted MP4 demo, full width, with an optional caption.
  | {
      type: 'single-video';
      video: { src: string; poster?: string; aspect?: string };
      caption?: string;
    }
  // Featured project media: a playable MP4 plus an image slideshow.
  | {
      type: 'showcase';
      video?: { src: string; poster?: string; aspect?: string };
      videoCaption?: string;
      imagesCaption?: string;
      /** Reserved spot (dashed tile) for media not yet provided, e.g. on-robot footage. */
      placeholder?: string;
      images: { src: string; alt: string }[];
    }
  // Multiple labeled sub-sections within one featured card.
  | { type: 'segments'; segments: MediaSegment[] };

export interface CardItem {
  /** Optional — omit for media-only cards (e.g. a lab photo strip). */
  title?: string;
  /** Paragraph body. Omit when using `bullets`. */
  body?: string;
  /** Turns one phrase inside `body` into a link (see TextWithLink). */
  bodyLink?: { text: string; href: string };
  bullets?: string[];
  /** Publication author list, in order. `self: true` bolds that author. */
  authors?: { name: string; self?: boolean }[];
  /**
   * Publication venue and review status. Word this so it can never read as
   * accepted while a paper is still under review.
   */
  venue?: string;
  media?: CardMedia;
  /** Mirrors the original `.card-reverse` asymmetric layout. */
  reverse?: boolean;
  /**
   * Full-width layout: media spans the card top, content below. Used for
   * flagship project cards whose media (video + slideshow) needs real estate.
   */
  featured?: boolean;
  /** Optional link to the project's public source repo. */
  repoUrl?: string;
  /** Link text for repoUrl. Defaults to "View source on GitHub". */
  repoLabel?: string;
  /**
   * Several labelled links rendered as a row — e.g. a paper and its videos.
   * Takes precedence over `repoUrl`/`repoLabel`, which stay for single-link cards.
   */
  links?: { label: string; href: string }[];
  /** Doubles the media column width (360px instead of 180px) on a standard (non-featured) card. */
  wideMedia?: boolean;
  /**
   * Date or date range for this project (e.g. "Oct. 2025 – Present"). Omitted
   * (rather than guessed) when the exact date isn't known yet — see
   * TODO-CONTENT.md for the list of projects still missing one.
   */
  dateRange?: string;
  /** At-a-glance project metadata, rendered as real structure (not a middle-dot string). */
  meta?: {
    role?: string;
    /** Free text, but "Deployed on hardware" / "Simulation only" / "In progress" get a status dot. */
    status?: string;
    stack?: string[];
  };
  /** One-line "My contribution:" statement — only for collaborative/lab-based work. */
  contribution?: string;
  /** Talks/presentations pulled out as their own labelled entries (e.g. for the Sandia entry). */
  talks?: string[];
}

export interface Section {
  id: string;
  heading: string;
  /** Optional lead paragraph shown under the heading, above the cards. */
  intro?: string;
  cards: CardItem[];
}

export const hero = {
  name: 'Alex Coker',
  // Short positioning line under the name. Also used verbatim as the site's
  // meta/OG/Twitter description (see layout.tsx) so the two can't drift out of
  // sync. Deliberately kept free of the biographical detail in `about.bio`
  // below — the two used to repeat each other almost word for word.
  tagline:
    'Safe, learning-based control for legged robots — control barrier functions, reachability, and hardware deployment on the Unitree Go2.',
};

// Facts below are drawn from Alex's CV (the version supplied 2026-08-30,
// confirmed as authoritative over the older PDF previously in the repo).
//
// This single paragraph replaced three near-identical blurbs that used to open
// the page (hero tagline, this bio, and a separate "Research Direction" block).
export const about = {
  headshot: 'assets/images/headshot.jpg',
  bio: 'B.S. in Mechanical Engineering at the University of New Mexico (expected Spring 2027) and an undergraduate researcher in the Learning and Control Lab under Prof. Leilei Cui. My work layers formal safety guarantees onto learned locomotion policies for legged robots, combining control barrier functions, MPPI, and Hamilton-Jacobi reachability to keep high-performance learned controllers provably safe — carried from simulation through to hardware on a Unitree Go2 quadruped.',
};

export const contact = {
  emailUser: 'acoker',
  emailDomain: 'unm.edu',
  github: 'https://github.com/alexkcoker',
  linkedin: 'https://linkedin.com/in/alexkcoker',
  // TODO(alex): add an ORCID iD here once you have one.
  cvPath: 'assets/cv/alex-coker-cv.pdf',
};

/** Short, dated highlights for the About area. Newest first. */
export const updates: {
  date: string;
  text: string;
  /** Trailing link rendered after the text. */
  url?: string;
  linkLabel?: string;
  /** Turns one phrase inside `text` into a link (see TextWithLink). */
  inlineLink?: { text: string; href: string };
}[] = [
  {
    date: 'Oct. 2026',
    text: 'Submitted my first paper, Exact-Safe MPPI, to ACC 2027 (with Prof. Leilei Cui).',
    inlineLink: { text: 'Exact-Safe MPPI', href: '#publications' },
  },
  {
    date: 'Sept. 2026',
    text: 'Presented at PVQAT TG10 (Junction Box Connectors), the international task group on PV connector durability and reliability.',
    url: 'https://www.pvqat.org/project-status/task-group-10',
    linkLabel: 'PVQAT TG10',
  },
  {
    date: 'Aug. 2026',
    text: 'Received the Sandia Thunderbird Award (Courageous) for internship performance.',
  },
  {
    date: 'Oct. 2025',
    text: 'Joined the Learning and Control Lab at UNM (advisor: Prof. Leilei Cui), starting the CBF safety filter work on the Go2.',
  },
  {
    date: 'June 2025',
    text: 'Started as a Mechanical Engineering Intern at Sandia National Laboratories, PV Reliability Group.',
  },
  // TODO(alex): add dated entries for more recent milestones (the LiDAR
  // perception update to the CBF filter, starting the Agile-But-Safe Go2
  // port) once you can confirm when they happened.
];

export const sections: Section[] = [
  {
    id: 'research',
    heading: 'Research',
    // No intro paragraph here: it restated the lab/advisor line from the bio
    // above and then summarised the three cards that follow it.
    cards: [
      {
        title: 'Control Barrier Function Safety Filter on the Unitree Go2',
        dateRange: 'Oct. 2025 – Present',
        body: 'Recreated Ames-style Control Barrier Functions as a safety filter wrapping the Go2’s reinforcement-learning locomotion policy: the CBF minimally edits the velocity command so the robot’s body cannot enter a keep-out zone, while the learned policy handles low-level tracking.',
        featured: true,
        repoUrl: 'https://github.com/alexkcoker/go2-cbf',
        media: {
          type: 'segments',
          segments: [
            {
              heading: 'In Simulation',
              body: 'Prototyped the filter as a closed-form, single-integrator CBF, then closed the loop in MuJoCo with a trained locomotion policy. With the filter active the robot skirts the keep-out zone — the barrier h(t) stays non-negative and the base remains upright — whereas with it disabled the policy walks straight in.',
              video: {
                src: 'assets/videos/cbf_sim_sidebyside.mp4',
                poster: 'assets/images/cbf_sim_poster.png',
                caption:
                  'MuJoCo: CBF off enters the keep-out zone, CBF on stops at the boundary',
              },
              image: {
                src: 'assets/images/cbf_phase2.png',
                alt: 'Closed-loop CBF in MuJoCo: top-down path skirting the keep-out, barrier h(t) staying non-negative, velocity command, and base height.',
                caption:
                  'Top-down path (CBF on), barrier h(t) ≥ 0, and stability plots',
              },
            },
            {
              heading: 'On the Real Robot & Digital Twin',
              body: 'Ported the closed-form filter to a real-time C++ safety filter wired into the on-robot deployer (Unitree SDK2 + LibTorch on a Jetson Orin) and verified it against the Python reference. Running on the physical Go2, a live MuJoCo digital twin mirrors the robot from its onboard state, so the real run and its simulated counterpart can be played back side by side.',
              synced: {
                left: {
                  label: 'Real Go2',
                  src: 'assets/videos/cbf_real.mp4',
                  poster: 'assets/images/cbf_real_poster.jpg',
                },
                right: {
                  label: 'Simulation',
                  src: 'assets/videos/cbf_sim_success.mp4',
                  poster: 'assets/images/cbf_sim_success_poster.jpg',
                },
                caption: 'Press play — real and simulation run side by side.',
              },
            },
            {
              heading: 'Update: Adapted to LiDAR',
              body: 'The real-robot deployment above detected the keep-out zone using the Go2’s onboard camera. This was later replicated on the same safety-filter pipeline but with perception swapped from camera to the robot’s LiDAR — adapting the zone-detection front end to work off point-cloud data while keeping the same CBF filter logic downstream.',
              video: {
                src: 'assets/videos/cbf_lidar_real.mp4',
                poster: 'assets/images/cbf_lidar_real_poster.jpg',
                caption: 'CBF safety filter on the real Go2, driven by LiDAR-based keep-out zone detection.',
                aspect: 'aspect-[720/640]',
              },
            },
          ],
        },
      },
      {
        title: 'MPPI–CBF Integration for Safe Quadruped Navigation',
        dateRange: 'Oct. 2025 – Present',
        body: 'Integrated Model Predictive Path Integral (MPPI) control with Control Barrier Functions (CBF) to enable safe, autonomous point-to-point navigation on a Unitree Go2 quadruped. The sampling-based MPPI planner generates obstacle-avoiding trajectories while a CBF safety filter enforces formal keep-out guarantees around obstacles. Validated across cluttered, maze, and gauntlet courses in simulation — where plain MPPI entered keep-out zones, the CBF-filtered controller held positive clearance. This work is currently simulation-only; transferring the approach to hardware is ongoing. It led to a paper submitted to ACC 2027.',
        bodyLink: {
          text: 'a paper submitted to ACC 2027',
          href: '#publications',
        },
        featured: true,
        repoUrl: 'https://github.com/alexkcoker/go2-mppi-cbf',
        media: {
          type: 'showcase',
          video: {
            src: 'assets/videos/cbfmppi_sidebyside.mp4',
            poster: 'assets/images/mppi_cbf_compare.png',
          },
          videoCaption: 'Side-by-side: plain MPPI vs MPPI-CBF (sim)',
          imagesCaption: 'MPPI-CBF results across obstacle courses',
          images: [
            {
              src: 'assets/images/mppi_cbf_single.png',
              alt: 'MPPI-CBF top-down path around a single obstacle with barrier h(t), speed command, and base-height plots.',
            },
            {
              src: 'assets/images/mppi_cbf_clutter.png',
              alt: 'MPPI-CBF navigating a cluttered field of obstacles from start to goal.',
            },
            {
              src: 'assets/images/mppi_cbf_maze.png',
              alt: 'MPPI-CBF path through a maze-like course with enforced keep-out margins.',
            },
            {
              src: 'assets/images/mppi_cbf_gauntlet.png',
              alt: 'MPPI-CBF traversing a gauntlet of staggered obstacles while maintaining clearance.',
            },
          ],
        },
      },
      {
        title: 'Porting Agile But Safe to the Unitree Go2',
        body: 'Working to recreate Agile But Safe (ABS) — a framework that pairs a high-speed agile locomotion policy with a learned reach-avoid safety value network and a recovery policy, letting a legged robot navigate cluttered environments at speed without colliding with obstacles. The original codebase targets the Unitree Go1 and has no existing Go2 port, so this project is building one from scratch. Current progress: training the base position-tracking locomotion policy on the Go2’s model in simulation over rough, obstacle-scattered terrain — the foundation the agile and safety policies still need to be trained on top of.',
        featured: true,
        repoUrl: 'https://agile-but-safe.github.io/',
        repoLabel: 'View original ABS project',
        media: {
          type: 'single-video',
          video: {
            src: 'assets/videos/go2_pos_rough.mp4',
            poster: 'assets/images/go2_pos_rough_poster.jpg',
          },
          caption: 'Early, rough-terrain training of the Go2 locomotion policy — still a work in progress.',
        },
      },
    ],
  },
  {
    id: 'publications',
    heading: 'Publications',
    cards: [
      {
        title:
          'Exact-Safe MPPI: Safety-Aware Sampling with Nonsmooth Control Barrier Functions',
        authors: [
          { name: 'Alexander Coker', self: true },
          { name: 'Leilei Cui' },
        ],
        venue:
          'Submitted to the 2027 American Control Conference (ACC) · under review',
        body: 'MPPI plans by sampling many candidate trajectories, but nothing in it enforces safety. The usual way to combine several control barrier functions — blending them into one smooth “soft minimum” — quietly shrinks the set of states the planner is allowed to use, and can close off a gap the robot could legitimately fit through; sampling more trajectories never recovers it. This work composes the barriers using their exact minimum instead, enforcing every nearly-active safety constraint together in a small optimization solved during both planning and execution, and confirms in simulation the predicted ln 2 threshold below which the smoothed approach fails to find the gap.',
        // The preprint is public on arXiv (posted 2026-10-05); the ACC
        // submission itself remains under review.
        links: [
          {
            label: 'arXiv:2610.07369',
            href: 'https://arxiv.org/abs/2610.07369',
          },
          {
            label: 'Videos',
            href: 'https://github.com/lc-lab25/Exact-Safe-MPPI',
          },
        ],
      },
    ],
  },
  {
    id: 'projects',
    heading: 'Projects',
    intro:
      'Independent projects outside the lab, spanning reinforcement learning, spacecraft attitude control, and from-scratch hardware control.',
    cards: [
      {
        title: 'Autonomous Drone Search-and-Sample RL Controller',
        body: 'Trained a PPO policy (Stable-Baselines3, on gym-pybullet-drones) to fly a simulated quadrotor across an unknown planetary-analog patch of terrain, searching for candidate biosignature sites with a continuous "metal detector" style sensor and navigating to collect them under a finite battery and time budget — while learning to recognize and abandon decoy sites that read as promising but are dead ends. Benchmarked against classical lawnmower-sweep, gradient-follower, and random-walk baselines: the trained policy detects more targets per episode than every baseline, and a hybrid controller (RL search, handing off to lawnmower-style homing on detection) collects more of what it finds.',
        featured: true,
        repoUrl: 'https://github.com/alexkcoker/rl-drone',
        media: {
          type: 'showcase',
          video: {
            src: 'assets/videos/rl_drone_hybrid.mp4',
            poster: 'assets/images/rl_drone_poster.jpg',
          },
          videoCaption:
            'Hybrid policy (RL search + lawnmower-style homing) searching and collecting a biosignature candidate',
          imagesCaption: 'Evaluation results vs. classical and random baselines',
          images: [
            {
              src: 'assets/images/rl_drone_targets_per_episode.png',
              alt: 'Bar chart comparing mean targets detected and collected per episode across the RL-trained, lawnmower, hybrid, random-walk, and gradient-follower policies.',
            },
            {
              src: 'assets/images/rl_drone_training_curve.png',
              alt: 'PPO training curve showing mean evaluation reward climbing past the random-walk and gradient-follower baselines over training.',
            },
            {
              src: 'assets/images/rl_drone_search_efficiency.png',
              alt: 'Bar chart comparing real-detection search efficiency between the RL policy pre- and post-handoff and the lawnmower sweep.',
            },
          ],
        },
      },
      {
        title: 'Keeping a Small Satellite Pointed at a Moving Target',
        body: 'A simulation of a shoebox-sized satellite — a 6U CubeSat — that has to keep its instrument aimed at a target while both it and the target are moving. The satellite turns itself using spinning flywheels called reaction wheels, and the question was whether ordinary small-satellite hardware is precise enough to stay on target within a tenth of a degree, about the width of a credit card seen from 50 metres away. Tracking fixed points on the ground across three overhead passes, it held that accuracy with roughly 2.5 times the margin it needed. The harder test was aiming at another satellite instead of the ground — a crossing encounter 96 km away at 6.95 km/s. That is where the hardware ran out of room: the flywheels reached their maximum spin and briefly could not correct any further, and the aim drifted outside the requirement for a moment.',
        featured: true,
        media: {
          type: 'single-video',
          video: {
            src: 'assets/videos/satellite_intersat_encounter.mp4',
            poster: 'assets/images/satellite_intersat_poster.jpg',
          },
          caption:
            'Inter-satellite tracking: the ADCS momentarily exceeds the 0.1° pointing requirement during a 6.95 km/s crossing encounter — the one scenario where the design’s margin runs out.',
        },
      },
      {
        title: 'Custom Robotic Arm — Learned From Scratch',
        body: 'An old desktop robotic arm with no surviving vendor SDK, starter code, or instruction manual. Its control scheme, joint mapping, and command interface all had to be learned from scratch by testing and probing the hardware directly. Wired it to a custom driver/controller board and built a control pipeline from nothing to get it moving reliably through a sequence of manipulation motions.',
        wideMedia: true,
        media: {
          type: 'single-video',
          video: {
            src: 'assets/videos/robot_arm_demo.mp4',
            poster: 'assets/images/robot_arm_demo_poster.jpg',
            aspect: 'aspect-[1290/1080]',
          },
          caption: 'The arm running its from-scratch control pipeline.',
        },
      },
    ],
  },
  {
    id: 'experience',
    heading: 'Experience',
    cards: [
      {
        title: 'Sandia National Laboratories',
        dateRange: 'June 2025 – Present',
        featured: true,
        body: 'Investigating failure mechanisms in photovoltaic (PV) connectors — characterizing why field connections degrade and fail. Work spanned hands-on sample preparation, four-wire (Kelvin) resistance measurement, and controlled electrical testing across thousands of connector samples, along with data collection and analysis in a national-laboratory environment. Mentored another intern on the team. Recipient of the Sandia Thunderbird Award.',
        talks: [
          'DOE quarterly program reviews',
          'PVQAT solar reliability conference (100+ industry experts)',
        ],
        media: {
          type: 'slideshow',
          images: [
            {
              src: 'assets/images/sandia_connector.jpg',
              alt: 'A failed PV connector with a test tracking barcode.',
            },
            {
              src: 'assets/images/sandia_kelvin.jpg',
              alt: 'PV connector held in Kelvin clips for four-wire resistance measurement.',
            },
            {
              src: 'assets/images/sandia_bench.jpg',
              alt: 'Test bench with PV connectors mounted for evaluation.',
            },
            {
              src: 'assets/images/sandia_measurement.png',
              alt: 'Power supply and precision multimeter capturing connector resistance under load.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'awards',
    heading: 'Awards & Accomplishments',
    cards: [
      {
        title: 'UNM Pitch Contest — Arid Sustainability Award',
        body: 'Pitched a technology commercialization concept for sustainability in arid environments to a judging panel, and won the Arid Sustainability Award. The result turned as much on the delivery as on the idea: framing a technical concept for an audience that did not share my background, making the case for its feasibility and real-world impact in the time allowed, and defending it under questioning.',
        media: {
          type: 'image',
          src: 'assets/images/greengro.jpg',
          alt: 'UNM Pitch Contest — Arid Sustainability Award',
        },
      },
      {
        title: 'Lobo Hackathon — Second Place',
        body: 'Took second place presenting a technical, market-driven solution to judges under hackathon time pressure. Placing came down to communicating the engineering clearly and persuasively — explaining what we had built, why the approach worked, and who it was for, to an audience encountering the problem for the first time.',
        media: {
          type: 'image',
          src: 'assets/images/hack.jpg',
          alt: 'Lobo Hackathon — Second Place',
        },
      },
      {
        title: 'Sandia Thunderbird Intern Award',
        dateRange: 'Aug. 2026',
        body: 'Received Sandia National Laboratories’ Intern Thunderbird Award (Courageous) from the Student Intern Programs, recognizing initiative and excellence shown during the internship.',
        media: {
          type: 'slideshow',
          images: [
            {
              src: 'assets/images/sandia_thunderbird_group.jpg',
              alt: 'Alex Coker holding an Intern Thunderbird Award: Courageous certificate alongside fellow Sandia National Laboratories interns.',
            },
            {
              src: 'assets/images/sandia_thunderbird_cert_coins.jpg',
              alt: 'Close-up of the Intern Thunderbird Award: Courageous certificate, above both sides of the award challenge coin.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'outreach',
    heading: 'Outreach',
    cards: [
      {
        title: 'Youth Outreach in the Robotics Lab',
        // TODO(alex): add a photo from one of the visits — this card is
        // text-only until then (see the `media` field on the card below).
        body: 'Host high-school-age students for visits to the Learning and Control Lab. Each visit pairs a tour of the lab with a short lecture on what we work on and why it matters, live demonstrations of the robots, and hands-on activities where the students interact with the hardware themselves — the aim being to make robotics research feel concrete and reachable rather than abstract.',
      },
      {
        title: 'GearMasters Volunteering',
        body: 'Volunteered with GearMasters to support hands-on STEM education, mentoring students and assisting with engineering-focused activities.',
        media: {
          type: 'image',
          src: 'assets/images/gearmasters.webp',
          alt: 'GearMasters Volunteering',
        },
      },
    ],
  },
];
