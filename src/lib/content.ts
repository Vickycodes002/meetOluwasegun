/**
 * Everything on the site comes from this file.
 * Search for "TODO" to find placeholder content that needs your real details.
 * Images live in /public/images (see public/images/README.md for the layout).
 */

export const site = {
  name: "Oluwasegun Babawale",
  shortName: "Segun",
  role: "Brand identity designer",
  // Your live address, for example "https://segunbabawale.com". Link previews
  // use it to find the share image. Leave empty until you have a domain:
  // on Vercel the site then uses the address Vercel gives the project.
  url: "https://meetsegun.vercel.app",
  description:
    "Brand identity designer. I build logos, visual systems and brand stories for companies that want to be remembered.",
  email: "oluwasegunbabawale9@gmail.com",
    // TODO: paste your Google Drive link. Share it as "Anyone with the link can view".
  resumeUrl: "https://drive.google.com/file/d/1sE37MGMXQEfDrc6zVS7MLqJIdZSphJxs/view?usp=drive_link",
  instagramUrl: "https://www.instagram.com/pexel_grafix",
  instagramHandle: "@pexel_grafix",
  socials: [
    { label: "Behance", href: "https://www.behance.net/pixell_grafix" },
    { label: "Instagram", href: "https://www.instagram.com/pexel_grafix" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/babawale-oluwasegun-aa5b63310/" },
    { label: "X", href: "https://x.com/your_design_guy" },
  ],
} as const;

export const hero = {
  hello: "Hi, I'm Segun.",
  /** Headline, one entry per line. `lime` lines take the brand colour. */
  lines: [
    { text: "Bad logos", lime: false },
    { text: "don't kill brands.", lime: false },
    { text: "Indecision", lime: true },
    { text: "does", lime: true },
  ],
  intro:
    "I'm a brand identity designer. Before I draw a single thing, I make you answer the awkward question: what does this brand actually stand for? Then I build the logo, the system and every small detail around that answer, so people remember you, trust you and come back.",
  /** Small stickers floating around the headline. */
  tag: "Brand identity designer",
  aside: "I ask \"why?\" a lot.",
  burst: "Say hello",
};

/** Words in the lime band under the hero. */
export const band = ["Logos", "Identity systems", "Guidelines", "Motion", "Lettering", "Social"];

/**
 * Two marquee rows, four images each. They scroll in opposite directions
 * and repeat endlessly, so four images are enough.
 */
export const marquee = {
  rowOne: [
    { src: "/images/hero/row-1/01.png", alt: "Brand work preview 1" },
    { src: "/images/hero/row-1/02.png", alt: "Brand work preview 2" },
    { src: "/images/hero/row-1/03.png", alt: "Brand work preview 3" },
    { src: "/images/hero/row-1/04.png", alt: "Brand work preview 4" },
  ],
  rowTwo: [
    { src: "/images/hero/row-2/01.png", alt: "Brand work preview 5" },
    { src: "/images/hero/row-2/02.png", alt: "Brand work preview 6" },
    { src: "/images/hero/row-2/03.png", alt: "Brand work preview 7" },
    { src: "/images/hero/row-2/04.png", alt: "Brand work preview 8" },
  ],
};

type Img = { src: string; alt: string };

export type CaseStudy = {
  sector: string;
  deliverables: string[];
  /** The brand's own colours. They theme the case study page. */
  theme: { dark: string; main: string; pop: string };
  brief: string[];
  /** One sentence that sums up the problem. It lights up word by word on scroll. */
  statement: string;
  problem: string[];
  /** The decisions that shaped the direction. Three works best. */
  decisions: { title: string; body: string }[];
  /** The full logo lockup. */
  logo: Img;
  /**
   * The logo rationale, presented as an equation: the source ideas on the
   * left, the finished symbol on the right, then what it means.
   */
  mark: {
    idea: string;
    parts: { icon: "plane" | "arrow"; name: string; meaning: string }[];
    symbol: Img;
    result: string;
    uses: string;
  };
  colors: { name: string; hex: string; role: string }[];
  typeface: { name: string; note: string; image: Img };
  /** `full` images span the page, `half` images sit two to a row. */
  gallery: (Img & { layout: "full" | "half" })[];
  closing: string[];
};

export type Project = {
  slug: string;
  title: string;
  year: string;
  /** One line shown on the home page list. */
  summary: string;
  tags: string[];
  role: string;
  collaborators?: string[];
  cover: string;
  /** Paragraphs for the case study page. */
  overview: string[];
  challenge: string;
  approach: string;
  outcome: string;
  gallery: { src: string; alt: string }[];
  liveUrl?: string;
  /**
   * The project on Behance. Without a `study`, the card on the home page
   * opens Behance in a new tab and no page is generated on this site.
   * With a `study`, the card opens the on-site case study and Behance
   * becomes a "see more" link at the bottom of that page.
   */
  behanceUrl?: string;
  /** Image shown when this project's page is shared. JPG or PNG, 1200x630. */
  shareImage?: string;
  /** Full on-site case study. See the Arbex project for a complete example. */
  study?: CaseStudy;
};

// TODO: replace each project below with a real one. Keep the slug short, it becomes the URL.
export const projects: Project[] = [
  {
    slug: "kinto",
    behanceUrl: "https://www.behance.net/gallery/244793535/Kinto-Brand-Identity-and-UIUX-Case-Study",
    title: "Kinto",
    year: "2025",
    summary: "Brand identity and app design for a money app built on trust between people.",
    tags: ["Brand identity", "UI/UX design", "Logo design"],
    role: "Brand and UI designer",
    cover: "/images/projects/kinto/cover.webp",
    overview: [
      "TODO: Two or three sentences on who the client is and what they do.",
      "TODO: What they asked you to deliver and what the brief looked like at the start.",
    ],
    challenge: "TODO: The real problem. What was not working about how the brand looked or felt?",
    approach:
      "TODO: How you thought it through. Research, references, sketches, the idea you landed on and why.",
    outcome: "TODO: What changed after launch. Numbers if you have them, quotes if you do not.",
    gallery: [],
  },
  {
    slug: "arbex",
    behanceUrl: "https://www.behance.net/gallery/253375111/Arbex-Brand-Identity-Strategy",
    title: "Arbex",
    year: "2026",
    summary: "Brand strategy and identity for a cross-border payments platform serving individuals and businesses across Africa.",
    tags: ["Brand identity", "Brand strategy", "Logo design"],
    role: "Brand designer",
    cover: "/images/projects/arbex/cover.webp",
    shareImage: "/images/projects/arbex/share.jpg",
    // The four fields below are the short fallback. The page uses `study` instead.
    overview: ["Arbex is a cross-border payments platform for individuals and businesses across Africa."],
    challenge: "The financial system treated Africa as an afterthought.",
    approach: "A confident voice, a mark built on movement, and illustration that shows the route.",
    outcome: "One identity system that stays consistent from an app icon to a billboard.",
    gallery: [],
    study: {
      sector: "Fintech, cross-border payments",
      deliverables: ["Brand strategy", "Logo", "Colour and type", "Brand voice", "Illustration style", "Applications"],
      theme: { dark: "#1E2D3D", main: "#36B989", pop: "#F5A621" },
      brief: [
        "Arbex is a cross-border payments platform for individuals and businesses across Africa. It lets people send, receive, exchange and grow money without the friction, fees and limits they have been told to accept.",
        "The scope was the full identity: positioning and brand voice first, then the logo, colour, typography, illustration and the applications that carry them.",
      ],
      statement: "The money was always here. The infrastructure to move it freely never was.",
      problem: [
        "For too long, the financial system treated Africa as an afterthought: slower transfers, higher fees and less access for the people who need it most.",
        "Visually, the category falls back on two defaults: the formality of a traditional bank, or the interchangeable look of a global fintech app. Arbex needed to earn trust without feeling distant, and to feel rooted in Africa without looking small.",
      ],
      decisions: [
        {
          title: "A confident voice",
          body: "The positioning starts from a simple fact: the money was always here. The brand voice follows from it. Lines are short and declarative, such as \"Money without borders\" and \"The distance was never the problem\".",
        },
        {
          title: "A mark built on movement",
          body: "The symbol joins a paper plane and an arrow inside a shape that leans forward, so it reads as sending and as progress at once. Navy gives the palette weight, green leads, and orange adds warmth.",
        },
        {
          title: "Illustration that shows the route",
          body: "Transfers are shown as journeys between real places, Lagos to London, with landmarks and currency symbols. Portrait photography keeps the people sending and receiving at the centre.",
        },
      ],
      logo: { src: "/images/projects/arbex/logo.webp", alt: "The Arbex logo: the green symbol beside the Arbex wordmark" },
      mark: {
        idea: "A paper plane and an arrow, joined into one symbol.",
        parts: [
          {
            icon: "plane",
            name: "Paper plane",
            meaning: "Sending. Something leaves one person and reaches another, across any border.",
          },
          {
            icon: "arrow",
            name: "Arrow",
            meaning: "Progress. Forward movement, for the money and for the people it reaches.",
          },
        ],
        symbol: { src: "/images/projects/arbex/symbol.svg", alt: "The Arbex symbol on its own" },
        result: "The plane sits inside the arrow, and the whole shape leans in the direction of travel. One symbol carries both ideas: money that crosses borders, and progress for the people on either side of it.",
        uses: "It stands alone as the app icon and repeats as a pattern across merchandise and print.",
      },
      colors: [
        { name: "Deep navy", hex: "#1E2D3D", role: "Base" },
        { name: "Arbex green", hex: "#36B989", role: "Primary" },
        { name: "Warm orange", hex: "#F5A621", role: "Accent" },
      ],
      typeface: {
        name: "Syne",
        note: "Syne combines bold geometric forms with distinctive character, giving the brand a modern, confident personality. It stays clean and legible across digital interfaces while reinforcing trust and professionalism.",
        image: { src: "/images/projects/arbex/typeface.webp", alt: "The Syne typeface set large in Arbex green" },
      },
      gallery: [
        { src: "/images/projects/arbex/tote-app-icon.webp", alt: "Arbex tote bag with a repeating logo pattern, and the app icon on a phone", layout: "full" },
        { src: "/images/projects/arbex/notifications.webp", alt: "Two Arbex cards showing 'Transfer completed' and 'Wallet funded' notifications", layout: "half" },
        { src: "/images/projects/arbex/stationery.webp", alt: "Arbex notebook reading 'Do more with your money', with a pen and a badge", layout: "half" },
        { src: "/images/projects/arbex/lagos-to-london.webp", alt: "Illustration of a Lagos bridge and Big Ben with the line 'Lagos to London. Money without borders.'", layout: "full" },
        { src: "/images/projects/arbex/rollup-banner.webp", alt: "Arbex roll-up banner in an exhibition hall: 'Fast payments. Zero stress.'", layout: "half" },
        { src: "/images/projects/arbex/flags.webp", alt: "Three Arbex flags in orange, green and navy against the sky", layout: "half" },
        { src: "/images/projects/arbex/send-money-anywhere.webp", alt: "Portraits and currency badges on a ribbon with the line 'Send money anywhere. The distance was never the problem.'", layout: "full" },
        { src: "/images/projects/arbex/merch-billboard.webp", alt: "Arbex sweatshirts and a rooftop billboard reading 'Send money home from anywhere.'", layout: "half" },
        { src: "/images/projects/arbex/portraits.webp", alt: "Four smiling portraits in scalloped frames in the Arbex colours", layout: "half" },
        { src: "/images/projects/arbex/event-screen.webp", alt: "Arbex on a conference stage screen: 'Africa moves fast. Her money should too.'", layout: "full" },
      ],
      closing: [
        "One mark, three colours, one typeface and one voice.",
        "The identity stays consistent across every touchpoint it was designed for: the app icon, product notifications, stationery, merchandise, event screens and outdoor advertising.",
      ],
    },
  },
  {
    slug: "hexaguard",
    behanceUrl: "https://www.behance.net/gallery/244036029/HexaGuard-Logo-Brand-Identity-System",
    title: "HexaGuard",
    year: "2025",
    summary: "Logo and brand identity system for a cybersecurity company that protects devices, files and networks.",
    tags: ["Logo design", "Brand identity"],
    role: "Brand designer",
    cover: "/images/projects/hexaguard/cover.webp",
    overview: ["TODO: Client and context.", "TODO: The scope of the work."],
    challenge: "TODO: The problem.",
    approach: "TODO: The process.",
    outcome: "TODO: The result.",
    gallery: [],
  },
  {
    slug: "sunvolt",
    behanceUrl: "https://www.behance.net/gallery/248640731/Strategic-Social-Media-Ads-for-SUNVOLT",
    title: "SunVolt",
    year: "2025",
    summary: "Social media ad designs for a solar energy brand.",
    tags: ["Social media design", "Advertising"],
    role: "Designer",
    cover: "/images/projects/sunvolt/cover.webp",
    overview: ["TODO: Client and context.", "TODO: The scope of the work."],
    challenge: "TODO: The problem.",
    approach: "TODO: The process.",
    outcome: "TODO: The result.",
    gallery: [],
  },
  {
    slug: "swiftnest",
    behanceUrl: "https://www.behance.net/gallery/249895745/Creative-Social-Media-Designs-for-SwiftNest",
    title: "SwiftNest",
    year: "2024",
    summary: "Social media designs for a same-day delivery company.",
    tags: ["Social media design"],
    role: "Designer",
    cover: "/images/projects/swiftnest/cover.webp",
    overview: ["TODO: What you redesigned and why.", "TODO: What you wanted to learn from it."],
    challenge: "TODO: The problem.",
    approach: "TODO: The process.",
    outcome: "TODO: The result.",
    gallery: [],
  },
 
];

export const services = [
  {
    title: "Brand identity",
    body: "Strategy, logo, colour, type and the rules that hold it together. The whole thing, not a logo in a zip file.",
  },
  {
    title: "Logo design",
    body: "One clear idea, drawn properly, then tested at every size from billboard to favicon.",
  },
  {
    title: "Brand guidelines",
    body: "A guide your team and your printer can follow without calling me. (You can still call me.)",
  },
  {
    title: "Collateral and social",
    body: "Stationery, packaging, decks and social templates, so the identity survives contact with real life.",
  },
  {
    title: "Motion design",
    body: "Logo animations and moving brand moments, because your brand will spend most of its life on a screen.",
  },
];

export type MotionItem = {
  title: string;
  /** Short line next to the title, for example the kind of piece. */
  note: string;
  /** Video file in /public/motion. MP4 (H.264) or WebM. */
  src: string;
  /** Shape of the video. Defaults to "16/9". Use "9/16" for upright phone videos. */
  ratio?: "16/9" | "9/16" | "4/3" | "1/1";
  /** Optional still shown before the video loads. */
  poster?: string;
};

/**
 * Motion showcase. Each video plays by itself (silently) when it scrolls into
 * view and pauses when it leaves. Visitors turn the sound on per video.
 * To add one: drop the file in /public/motion and add an entry here.
 */
export const motion = {
  heading: "It moves.",
  intro: "Brands that refuse to sit still. They play when you arrive and stop when you leave. Hit the sound button, they were made to be heard.",
  items: [
    { title: "Montra", note: "Launch film", src: "/motion/MONTRA_Launch_Film_9x16.mp4", ratio: "9/16" },
    { title: "Vybe", note: "Launch film", src: "/motion/VYBE_Launch_Film_16x9.mp4", ratio: "16/9" },
    { title: "Rilo", note: "Launch video", src: "/motion/RILO_Launch_Video.mp4", ratio: "16/9" },
  ] as MotionItem[],
};

/** Newest first. Leave `org` empty for independent work. */
export const history = [
  {
    role: "Freelance brand designer and strategist",
    org: "",
    period: "Now",
    body: "I work with brands on identity and strategy, from the first awkward question about what they stand for to the finished system.",
  },
  {
    role: "Brand designer",
    org: "Project Climeset",
    period: "2025 - 2026",
    body: "I led the development of the company's logo and complete brand identity, creating a consistent visual language across brand touchpoints. I also produce ongoing social media graphics and collaborate with the core team to translate business objectives into clear, purposeful visual communications.",
  },
  {
    role: "Graphic designer",
    org: "Gatehouse 28",
    period: "2024 - 2025",
    body: "I designed book covers from concept to final artwork, balancing client briefs with the visual conventions of each genre. I also developed social media graphics to support digital campaigns and managed multiple design requests while meeting agreed deadlines.",
  },
];

/** "Book a call" section. The button opens Calendly in a new tab. */
export const booking = {
  url: "https://calendly.com/oluwasegunbabawale9/brand-strategy-call",
  heading: "Bring the brand. I'll bring the questions.",
  body: "Book a brand strategy call and tell me where the brand is stuck. You'll leave with a clearer idea of what it should stand for, whether or not we end up working together.",
  button: "Book a strategy call",
  aside: "Pick a time that suits you",
};

/**
 * Shown on the home page. These are the quotes that speak about design.
 * Every quote is the client's own words, unedited.
 * TODO: add quotes from brand identity clients here as you collect them,
 * and put the strongest one first.
 */
export const testimonials = [
  {
    project: "Fatal Stryke Comix",
    quote:
      "I've really enjoyed working with Segun. He's a talented designer who brings good ideas to the table and cares about the work he puts out. It's always great finding someone who understands your vision and can help you bring it to life. I'd happily recommend him to anyone looking for a creative partner.",
    name: "Tierre E. Hall",
    title: "Founder, Fatal Stryke Comix",
  },
  {
    project: "Terra Ferox",
    quote:
      "Segun did a great job with the layout, colours, and overall design for Terra Ferox. He understood the direction we wanted and brought everything together really well. I'm happy with how the work turned out.",
    name: "Christopher Cheslock",
    title: "Founder, Terra Ferox / Savage Earth",
  },
  {
    project: "Ragged Rhino",
    quote:
      "Segun has been great to work with on both design and lettering. He's creative, dependable, and understands what it takes to make a comic project come together visually. I've appreciated the collaboration and the work he's contributed to Ragged Rhino.",
    name: "Scott James",
    title: "Founder, Ragged Rhino",
  },
];

/** Not shown on the site. Kept here because it is about lettering only. */
export const letteringTestimonials = [
  {
    project: "Blood & Banter",
    quote:
      "Segun's lettering work has been a great addition to Blood & Banter. He understands how much lettering contributes to the reading experience, and I appreciate having him involved in the project.",
    name: "Chad Dingler",
    title: "Creator, Blood & Banter",
  },
];

export const about = {
  heading: "Who's behind this?",
  paragraphs: [
    "I'm Segun, and I love design the way some people love football: loudly, and with opinions. Not just branding either. Creativity and art in general have a hold on me, and I still get a small thrill every time an idea finally clicks into place.",
    "With brands, I treat design as thinking before decoration. A good identity starts with a sharp idea about who a company is. The visuals are just how that idea shows up to the party.",
    "When I'm not designing, I'm reading comics, writing, losing a boss fight I swear was unfair, or watching a movie and quietly judging the title sequence. It all finds its way back into the work. Good stories and good brands run on the same thing: knowing exactly who you are.",
  ],
  photos: [
    { src: "/images/about/about-1.webp", alt: "Segun standing outdoors in a green sweatshirt and sunglasses" },
    { src: "/images/about/about-2.webp", alt: "Segun with arms wide in front of the Untitled Designers Conference backdrop" },
    { src: "/images/about/about-3.webp", alt: "Segun at his desk, with design work open on the monitor" },
    { src: "/images/about/about-4.webp", alt: "Segun adjusting his glasses, lit in blue" },
  ],
};

/** True when the project has its own page on this site. */
export function isOnSite(p: Project) {
  return Boolean(p.study) || !p.behanceUrl;
}

/** Where a project card should link to. */
export function projectHref(p: Project) {
  return isOnSite(p) ? `/work/${p.slug}` : (p.behanceUrl as string);
}

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/** Neighbours among projects that have a page on this site (Behance-only ones are skipped). */
export function getAdjacentProjects(slug: string) {
  const local = projects.filter(isOnSite);
  const i = local.findIndex((p) => p.slug === slug);
  return {
    prev: local[(i - 1 + local.length) % local.length],
    next: local[(i + 1) % local.length],
  };
}
