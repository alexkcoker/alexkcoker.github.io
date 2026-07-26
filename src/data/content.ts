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
  video?: { src: string; poster?: string; caption?: string };
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
  // Featured project media: a playable MP4 plus an image slideshow.
  | {
      type: 'showcase';
      video?: { src: string; poster?: string };
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
  bullets?: string[];
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
  tagline:
    'Physics student and robotics-focused engineer working at the intersection of automation, embedded systems, and applied research.',
};

export const sections: Section[] = [
  {
    id: 'unm-robotics',
    heading: 'UNM Robotics Research',
    intro:
      'Ongoing robotics research at the University of New Mexico, focused on safe autonomous control, motion planning, and hardware–software integration for legged robots. Individual lab projects are highlighted below.',
    cards: [
      {
        title: 'MPPI–CBF Integration for Safe Quadruped Navigation',
        body: 'Integrated Model Predictive Path Integral (MPPI) control with Control Barrier Functions (CBF) to enable safe, autonomous point-to-point navigation on a Unitree Go2 quadruped. The sampling-based MPPI planner generates obstacle-avoiding trajectories while a CBF safety filter enforces formal keep-out guarantees around obstacles. Validated across cluttered, maze, and gauntlet courses in simulation — where plain MPPI entered keep-out zones, the CBF-filtered controller held positive clearance. This work is currently simulation-only; transferring the approach to hardware is ongoing.',
        featured: true,
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
    ],
  },
  {
    id: 'cbf',
    heading: 'CBF Safety Filter',
    intro:
      'A Control Barrier Function (CBF) safety filter for the Unitree Go2, taken from prototype to on-robot deployment.',
    cards: [
      {
        title: 'Control Barrier Function Safety Filter on the Unitree Go2',
        body: 'Recreated Aaron Ames-style Control Barrier Functions as a safety filter wrapping the Go2’s reinforcement-learning locomotion policy: the CBF minimally edits the velocity command so the robot’s body cannot enter a keep-out zone, while the learned policy handles low-level tracking.',
        featured: true,
        media: {
          type: 'segments',
          segments: [
            {
              heading: 'In Simulation',
              body: 'Prototyped the filter as a closed-form, single-integrator CBF, then closed the loop in MuJoCo with the trained locomotion policy. With the filter active the robot skirts the keep-out zone — the barrier h(t) stays non-negative and the base remains upright — whereas with it disabled the policy walks straight in.',
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
          ],
        },
      },
    ],
  },
  {
    id: 'rl-drone',
    heading: 'Autonomous Drone Search-and-Sample',
    intro:
      'A personal reinforcement-learning project: training a simulated quadrotor to search unknown terrain for scientific targets under real mission constraints.',
    cards: [
      {
        title: 'Autonomous Drone Search-and-Sample RL Controller',
        body: 'Trained a PPO policy (Stable-Baselines3, on gym-pybullet-drones) to fly a simulated quadrotor across an unknown planetary-analog patch of terrain, searching for candidate biosignature sites with a continuous "metal detector" style sensor and navigating to collect them under a finite battery and time budget — while learning to recognize and abandon decoy sites that read as promising but are dead ends. Benchmarked against classical lawnmower-sweep, gradient-follower, and random-walk baselines: the trained policy detects more targets per episode than every baseline, and a hybrid controller (RL search, handing off to lawnmower-style homing on detection) collects more of what it finds.',
        featured: true,
        repoUrl: 'https://github.com/pseudower1/rl-drone',
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
    ],
  },
  {
    id: 'sandia',
    heading: 'Sandia National Laboratories',
    intro:
      'Internship investigating failure mechanisms in photovoltaic (PV) connectors — characterizing why field connections degrade and fail. Work spans hands-on sample preparation, four-wire (Kelvin) resistance measurement, controlled electrical testing, and data collection within a national-laboratory environment.',
    cards: [
      {
        featured: true,
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
        body: 'Awarded for a technology commercialization concept addressing sustainability challenges in arid environments, emphasizing technical feasibility and real-world impact.',
        media: {
          type: 'image',
          src: 'assets/images/greengro.jpg',
          alt: 'UNM Pitch Contest — Arid Sustainability Award',
        },
      },
      {
        title: 'Lobo Hackathon — Second Place',
        body: 'Earned second place for presenting a technical and market-driven solution, demonstrating strong engineering reasoning and communication skills.',
        media: {
          type: 'image',
          src: 'assets/images/hack.jpg',
          alt: 'Lobo Hackathon — Second Place',
        },
      },
      {
        title: 'Design II Final Project — First Place Team Award',
        body: 'Competed in a class-wide engineering competition where teams designed and machined a car powered solely by mechanical energy, with the goal of traveling as close to 20 meters as possible. This project reinforced the importance of clear communication and strong organization within a team.',
        media: {
          type: 'image',
          src: 'assets/images/design2_punks.jpg',
          alt: 'Design II Final Project — PUNKS Mousetrap Car',
        },
      },
      {
        title: 'Wrestling Accomplishments',
        bullets: [
          'Multiple years of competitive wrestling experience',
          'Demonstrated discipline, resilience, and time management',
          'Balanced intensive training with rigorous academic workload',
        ],
      },
    ],
  },
  {
    id: 'outreach',
    heading: 'Outreach',
    cards: [
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

export const philosophy = {
  heading: 'Philosophy',
  body: 'I approach engineering and research with an emphasis on clarity, systems thinking, and practical impact. I value building things that work reliably, scale thoughtfully, and solve real problems. My goal is to combine technical depth with disciplined execution while continually learning across domains.',
};
