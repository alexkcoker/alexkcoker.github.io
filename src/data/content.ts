/**
 * Single source of truth for page content, mirroring the original site exactly.
 *
 * `media` describes the left/right column of each card:
 *   - { type: 'video', src }  -> responsive YouTube embed
 *   - { type: 'image', src, alt }
 *   - { type: 'slideshow', images: [{ src, alt }] }
 *   - undefined -> text-only card (no media column)
 */

export type CardMedia =
  | { type: 'video'; src: string; title: string }
  | { type: 'image'; src: string; alt: string }
  | { type: 'slideshow'; images: { src: string; alt: string }[] }
  // Featured project media: a playable MP4 plus an image slideshow.
  | {
      type: 'showcase';
      video?: { src: string; poster?: string };
      images: { src: string; alt: string }[];
    };

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
        body: 'Integrated Model Predictive Path Integral (MPPI) control with Control Barrier Functions (CBF) to enable safe, autonomous point-to-point navigation on a Unitree Go2 quadruped. The sampling-based MPPI planner generates obstacle-avoiding trajectories while a CBF safety filter enforces formal keep-out guarantees around obstacles. Validated across cluttered, maze, and gauntlet courses in simulation — where plain MPPI entered keep-out zones, the CBF-filtered controller held positive clearance — then ported to a real-time C++ controller for hardware deployment.',
        featured: true,
        media: {
          type: 'showcase',
          video: {
            src: 'assets/videos/mppi_cbf_AtoB.mp4',
            poster: 'assets/images/mppi_cbf_single.png',
          },
          images: [
            {
              src: 'assets/images/mppi_cbf_compare.png',
              alt: 'Plain MPPI enters the keep-out zone while MPPI-CBF maintains positive clearance around the obstacle.',
            },
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
    id: 'projects',
    heading: 'Projects',
    cards: [
      {
        title: 'Automated YouTube Channel',
        body: 'Designed and deployed an automated content pipeline that generates, edits, and publishes YouTube videos with minimal human intervention. Focused on workflow automation, scalability, and performance optimization.',
        media: {
          type: 'video',
          src: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
          title: 'Automated YouTube Channel Demo',
        },
      },
      {
        title: 'Automated T-Shirt Business',
        body: 'Built an automated e-commerce system integrating design generation, order processing, and fulfillment. Emphasis on automation logic, cost efficiency, and scalable operations.',
        reverse: true,
        media: {
          type: 'video',
          src: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
          title: 'Automated T-Shirt Business Demo',
        },
      },
      {
        title: 'Arduino Mousetrap Robot',
        body: 'Designed and programmed an Arduino-based robotic system incorporating sensors, actuators, and control logic. Focused on rapid prototyping, embedded programming, and mechanical integration.',
        media: {
          type: 'video',
          src: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
          title: 'Arduino Mousetrap Robot',
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
      {
        title: 'Carnival of Chemistry',
        body: 'Participated in public science outreach by demonstrating chemistry concepts to a general audience, emphasizing accessibility and engagement.',
        reverse: true,
        media: {
          type: 'image',
          src: 'assets/images/carnival_chemistry.png',
          alt: 'Carnival of Chemistry',
        },
      },
    ],
  },
];

export const philosophy = {
  heading: 'Philosophy',
  body: 'I approach engineering and research with an emphasis on clarity, systems thinking, and practical impact. I value building things that work reliably, scale thoughtfully, and solve real problems. My goal is to combine technical depth with disciplined execution while continually learning across domains.',
};
