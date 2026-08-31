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
  // A single self-hosted MP4 demo, full width, with an optional caption.
  | { type: 'single-video'; video: { src: string; poster?: string }; caption?: string }
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
  /** Link text for repoUrl. Defaults to "View source on GitHub". */
  repoLabel?: string;
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
  tagline:
    'Robotics student at UNM working with dynamic platforms, path planning algorithms, and embedded control systems.',
};

// Facts below are drawn from Alex's CV (the version supplied 2026-08-30,
// confirmed as authoritative over the older PDF previously in the repo).
export const about = {
  headshot: 'assets/images/headshot.jpg',
  bio: 'B.S. in Mechanical Engineering at the University of New Mexico (expected Spring 2027). Undergraduate researcher in the Learning and Control Lab under Prof. Leilei Cui, working on safety-critical control for legged robots — combining control barrier functions, MPPI, and Hamilton-Jacobi reachability with learned locomotion policies on a Unitree Go2 quadruped, from simulation through hardware deployment.',
};

// Replaces the old "Philosophy" section per the site-revamp brief: a
// research-direction statement placed near the top, adjacent to the About
// block, instead of a generic engineering-philosophy paragraph at the bottom.
export const researchStatement = {
  heading: 'Research Direction',
  body: 'My work centers on layering formal safety guarantees onto learned locomotion policies for legged robots — using control barrier functions and reachability-based methods to keep high-performance, learned controllers provably safe, carried from simulation through to real hardware on a Unitree Go2 quadruped.',
  // TODO(alex): review this paragraph and make it yours.
  // TODO(alex): add one sentence on what you want to pursue in a PhD.
};

export const contact = {
  emailUser: 'acoker',
  emailDomain: 'unm.edu',
  github: 'https://github.com/pseudower1',
  linkedin: 'https://linkedin.com/in/alexkcoker',
  // TODO(alex): add an ORCID iD here once you have one.
  cvPath: 'assets/cv/alex-coker-cv.pdf',
};

// Groups and wording match the CV's own "Technical Skills" section verbatim
// (not the site-revamp brief's guessed list, which named "Isaac Lab" and
// "ROS 2" — the CV says Isaac Gym, and doesn't list ROS 2 at all).
export const skills: { category: string; items: string[] }[] = [
  { category: 'Programming', items: ['Python', 'C++'] },
  {
    category: 'Robotics & Control',
    items: [
      'CBF safety filters',
      'MPPI',
      'Hamilton-Jacobi reachability',
      'RL policy deployment',
      'Sim-to-real transfer',
      'Legged robots (Unitree Go2)',
      'Unitree SDK2',
      'LibTorch',
    ],
  },
  {
    category: 'Simulation',
    items: ['MuJoCo', 'Isaac Gym', 'PyBullet', 'Digital twin development'],
  },
  {
    category: 'Hardware & Lab',
    items: [
      'Jetson Orin',
      'LiDAR',
      'Camera-based perception',
      'Kelvin resistance measurement',
      'Experimental design',
      'Hand tools',
    ],
  },
  {
    category: 'Tools & Systems',
    items: ['Git', 'Linux', 'Windows', 'Network & computer setup', 'Claude Code'],
  },
];

/** Short, dated highlights for the About area. Newest first. */
export const updates: { date: string; text: string }[] = [
  {
    date: 'Oct. 2025',
    text: 'Joined the Learning and Control Lab at UNM (advisor: Prof. Leilei Cui), starting the CBF safety filter work on the Go2.',
  },
  {
    date: '2025',
    text: 'Received the Sandia Thunderbird Award (Courageous) for internship performance.',
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
    intro:
      'Undergraduate research in the Learning and Control Lab at the University of New Mexico (advisor: Prof. Leilei Cui), focused on safe autonomous control for legged robots — from a Control Barrier Function safety filter taken to on-robot deployment, to sampling-based planning, to an in-progress port of a state-of-the-art agile-locomotion framework.',
    cards: [
      {
        title: 'Control Barrier Function Safety Filter on the Unitree Go2',
        dateRange: 'Oct. 2025 – Present',
        body: 'Recreated Aaron Ames-style Control Barrier Functions as a safety filter wrapping the Go2’s reinforcement-learning locomotion policy: the CBF minimally edits the velocity command so the robot’s body cannot enter a keep-out zone, while the learned policy handles low-level tracking.',
        featured: true,
        repoUrl: 'https://github.com/pseudower1/go2-cbf',
        meta: {
          role: 'Undergraduate Research Assistant, Learning and Control Lab (advisor: Prof. Leilei Cui)',
          status: 'Deployed on hardware',
          stack: ['C++', 'Python', 'MuJoCo', 'Unitree SDK2', 'LibTorch', 'Jetson Orin', 'LiDAR'],
        },
        contribution:
          'Prototyped the closed-form CBF filter, ported it to a real-time C++ implementation wired into the on-robot deployer, and later adapted its perception front end from camera to LiDAR.',
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
            {
              heading: 'Update: Adapted to LiDAR',
              body: 'The real-robot deployment above detected the keep-out zone using the Go2’s onboard camera. This was later replicated on the same safety-filter pipeline but with perception swapped from camera to the robot’s LiDAR — adapting the zone-detection front end to work off point-cloud data while keeping the same CBF filter logic downstream.',
              video: {
                src: 'assets/videos/cbf_lidar_real.mp4',
                poster: 'assets/images/cbf_lidar_real_poster.jpg',
                caption: 'CBF safety filter on the real Go2, driven by LiDAR-based keep-out zone detection.',
              },
            },
          ],
        },
      },
      {
        title: 'MPPI–CBF Integration for Safe Quadruped Navigation',
        dateRange: 'Oct. 2025 – Present',
        body: 'Integrated Model Predictive Path Integral (MPPI) control with Control Barrier Functions (CBF) to enable safe, autonomous point-to-point navigation on a Unitree Go2 quadruped. The sampling-based MPPI planner generates obstacle-avoiding trajectories while a CBF safety filter enforces formal keep-out guarantees around obstacles. Validated across cluttered, maze, and gauntlet courses in simulation — where plain MPPI entered keep-out zones, the CBF-filtered controller held positive clearance. This work is currently simulation-only; transferring the approach to hardware is ongoing.',
        featured: true,
        repoUrl: 'https://github.com/pseudower1/go2-mppi-cbf',
        meta: {
          role: 'Undergraduate Research Assistant, Learning and Control Lab (advisor: Prof. Leilei Cui)',
          status: 'Simulation only',
          stack: ['Python'],
        },
        contribution:
          'Integrated the MPPI planner with the CBF safety filter and validated the combined controller across all three obstacle courses.',
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
        meta: {
          role: 'Independent project',
          status: 'In progress',
          stack: ['Python'],
        },
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
    id: 'projects',
    heading: 'Projects',
    intro:
      'Independent projects outside the lab, spanning reinforcement learning, spacecraft attitude control, and from-scratch hardware control.',
    cards: [
      {
        title: 'Autonomous Drone Search-and-Sample RL Controller',
        body: 'Trained a PPO policy (Stable-Baselines3, on gym-pybullet-drones) to fly a simulated quadrotor across an unknown planetary-analog patch of terrain, searching for candidate biosignature sites with a continuous "metal detector" style sensor and navigating to collect them under a finite battery and time budget — while learning to recognize and abandon decoy sites that read as promising but are dead ends. Benchmarked against classical lawnmower-sweep, gradient-follower, and random-walk baselines: the trained policy detects more targets per episode than every baseline, and a hybrid controller (RL search, handing off to lawnmower-style homing on detection) collects more of what it finds.',
        featured: true,
        repoUrl: 'https://github.com/pseudower1/rl-drone',
        meta: {
          role: 'Independent project',
          status: 'Simulation only',
          stack: ['Python', 'Stable-Baselines3', 'gym-pybullet-drones', 'PPO'],
        },
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
        title: 'Slew Maneuver & Pointing Budget — Target-Tracking CubeSat ADCS',
        body: 'A self-contained simulation of a reaction-wheel-stabilized 6U CubeSat tracking targets during overhead passes, built to test whether representative small-sat ADCS hardware can hold a 0.1° pointing requirement while slewing. Across three ground-target passes the controller holds the requirement with roughly 2.5x margin. An extension pass then stress-tests the design further — swapping the fixed ground target for a second, fast-moving satellite in a 96.4 km, 6.95 km/s crossing encounter — and finds the one scenario where the hardware’s margin actually runs out: a real reaction-wheel momentum saturation event that briefly exceeds the pointing requirement.',
        featured: true,
        meta: {
          role: 'Independent project',
          status: 'Simulation only',
          stack: ['Python', 'Skyfield', 'SGP4'],
        },
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
        meta: {
          role: 'Independent project',
          status: 'Deployed on hardware',
        },
        media: {
          type: 'single-video',
          video: {
            src: 'assets/videos/robot_arm_demo.mp4',
            poster: 'assets/images/robot_arm_demo_poster.jpg',
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
        body: 'Investigating failure mechanisms in photovoltaic (PV) connectors — characterizing why field connections degrade and fail. Work spanned hands-on sample preparation, four-wire (Kelvin) resistance measurement, and controlled electrical testing across thousands of connector samples, along with data collection and analysis in a national-laboratory environment. Recipient of the Sandia Thunderbird Award.',
        meta: {
          role: 'Mechanical Engineering Intern, PV Reliability Group',
        },
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
        title: 'Sandia Thunderbird Intern Award',
        dateRange: '2025',
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
