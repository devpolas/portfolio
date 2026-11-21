const BASE_URL = "https://polas.dev";
const NAME = "Polas Chandra Barmon";
const ROLE = "Full-Stack Software Engineer";
const BRAND = "Dev Polas"; // display casing used in metadata and JSON-LD
const WORDMARK = "DEV POLAS"; // logo-only casing; never use in metadata
const USERNAME = "devpolas";
const TAGLINE = "Thoughtful engineering. Meaningful products.";
const PERSONAL_EMAIL = "dpi.polas@gmail.com";
const PUBLIC_EMAIL = "hello@polas.dev";

type SocialLink = {
  username: string;
  url?: string;
  sameAs?: boolean;
  additionalProfiles?: string[];
};

const social = {
  // Core identity
  github: {
    username: USERNAME,
    url: "https://github.com/devpolas",
    sameAs: true,
  },
  linkedin: {
    username: USERNAME,
    url: "https://www.linkedin.com/in/devpolas/",
    sameAs: true,
  },
  facebook: {
    username: USERNAME,
    url: "https://www.facebook.com/devpolas",
    sameAs: true,
    additionalProfiles: ["https://www.facebook.com/fbpcb/"],
  },
  x: { username: "dev_polas", url: "https://x.com/dev_polas", sameAs: true },
  instagram: {
    username: "dev_polas",
    url: "https://www.instagram.com/dev_polas/",
    sameAs: true,
  },

  // Developer platforms
  gitlab: {
    username: USERNAME,
    url: "https://gitlab.com/devpolas",
    sameAs: true,
  },
  devTo: { username: USERNAME, url: "https://dev.to/devpolas", sameAs: true },
  hashnode: {
    username: USERNAME,
    url: "https://hashnode.com/@devpolas",
    sameAs: true,
  },

  // Package registries
  npm: {
    username: USERNAME,
    url: "https://www.npmjs.com/~devpolas",
    sameAs: true,
  },
  pypi: {
    username: USERNAME,
    url: "https://pypi.org/user/devpolas/",
    sameAs: true,
  },

  // Publishing
  medium: {
    username: USERNAME,
    url: "https://medium.com/@devpolas",
    sameAs: true,
  },
  reddit: {
    username: USERNAME,
    url: "https://www.reddit.com/user/devpolas",
    sameAs: true,
  },

  // Messaging: contact links, never part of sameAs
  telegram: { username: USERNAME, url: "https://t.me/devpolas" },
} as const satisfies Record<string, SocialLink>;

/**
 * Handles you intend to claim but have not confirmed. No URLs on purpose:
 * promote an entry into `social` (with a real URL) only after you verify it.
 */
const pendingHandles = {
  codeberg: USERNAME,
  bitbucket: USERNAME,
  stackOverflow: USERNAME, // needs numeric profile ID
  codepen: USERNAME,
  replit: USERNAME,
  stackblitz: USERNAME,
  codesandbox: USERNAME,
  dockerHub: USERNAME,
  crates: USERNAME,
  rubyGems: USERNAME,
  packagist: USERNAME,
  nuget: USERNAME,
  huggingFace: USERNAME,
  postman: USERNAME,
  peerlist: USERNAME,
  productHunt: USERNAME,
  hackerNoon: USERNAME,
  googleDevelopers: USERNAME,
  microsoftLearn: USERNAME,
  kaggle: USERNAME,
  bluesky: USERNAME,
  mastodon: USERNAME, // needs instance URL
  substack: USERNAME,
  youtube: USERNAME,
} as const;

// Derived: JSON-LD sameAs can never contain objects, chat links or unverified handles.
const sameAs = (Object.values(social) as readonly SocialLink[])
  .filter((s) => s.sameAs && s.url)
  .map((s) => s.url as string);

export const profile = {
  name: NAME,
  firstName: "Polas",
  middleName: "Chandra",
  lastName: "Barmon",
  username: USERNAME,

  displayName: BRAND,
  brandName: BRAND,
  wordmark: WORDMARK,

  role: ROLE,
  alternativeRoles: [
    "Full-Stack Developer",
    "Software Engineer",
    "Backend Developer",
    "Frontend Developer",
    "AI Engineer",
  ],

  headline: "Building performant, scalable and maintainable web applications.",

  description:
    "Full-Stack Software Engineer specializing in modern web technologies, scalable backend architecture, type-safe applications, API development, authentication, database design and AI-powered solutions.",

  shortDescription:
    "Full-Stack Software Engineer building reliable digital products.",

  positioning: {
    title: ROLE,
    tagline: TAGLINE,
    philosophy:
      "Building reliable, accessible and user-focused digital experiences through thoughtful engineering and maintainable architecture.",

    focus: [
      "Type Safety",
      "Performance Optimization",
      "Scalable Architecture",
      "Clean Code",
      "Maintainable Systems",
      "Developer Experience",
      "API Design",
      "Application Security",
      "AI-Powered Applications",
    ],

    interests: [
      "Software Engineering",
      "System Design",
      "Web Development",
      "Backend Engineering",
      "Application Security",
      "Artificial Intelligence",
      "Open Source",
      "Developer Tools",
    ],
  },

  website: BASE_URL,
  canonicalUrl: BASE_URL,

  email: PERSONAL_EMAIL,
  alternativeEmail: PUBLIC_EMAIL,

  contact: {
    email: PERSONAL_EMAIL,
    alternativeEmail: PUBLIC_EMAIL,
    whatsapp: "https://wa.me/devpolas",
    telegram: social.telegram.url,
  },

  location: {
    city: "Thakurgaon",
    division: "Rangpur Division",
    country: "Bangladesh",
    countryCode: "BD",
    countryCode3: "BGD",
    timezone: "Asia/Dhaka",
  },

  brand: {
    name: BRAND,
    wordmark: WORDMARK,
    username: USERNAME,
    domain: "polas.dev",
    tagline: TAGLINE,
    inspiration: {
      name: "Palash",
      botanicalName: "Butea monosperma",
      commonName: "Flame of the Forest",
    },
    philosophy:
      "Building reliable, accessible, and user-focused digital experiences.",
    colors: {
      ember: "#B83A22",
      flame: "#F17B38",
      leaf: "#174B35",
      petal: "#F7F1E5",
      midnight: "#151B17",
    },
  },

  websiteConfig: {
    name: BRAND,
    title: `${NAME} | ${ROLE}`,
    description: `Official portfolio of ${NAME} (${BRAND}), a ${ROLE} building performant, scalable and maintainable web applications.`,

    url: BASE_URL,
    canonical: BASE_URL,
    language: "en",
    locale: "en_US",
    defaultThemeColor: "#151B17",
    robots: { index: true, follow: true },

    keywords: [
      NAME,
      BRAND,
      USERNAME,
      ROLE,
      "Full-Stack Developer",
      "Next.js Developer",
      "React Developer",
      "TypeScript Developer",
      "Node.js Developer",
      "PostgreSQL Developer",
      "Prisma ORM",
      "Backend Engineer",
      "Frontend Engineer",
      "Software Engineer Bangladesh",
    ],
  },

  /**
   * Items marked "from package.json" were added because the project uses them.
   * NestJS, LangChain, LangGraph and n8n are NOT here: nothing in this repo
   * uses them. Add them back only if they are real parts of your skill set.
   */
  expertise: {
    frontend: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "shadcn/ui", // from package.json
      "Sass",
      "GSAP", // from package.json
      "Motion", // from package.json
    ],

    backend: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "GraphQL",
      "Python",
      "FastAPI",
      "Zod", // from package.json
    ],

    database: [
      "PostgreSQL",
      "pgvector", // from package.json / migrations
      "Prisma ORM",
      "MongoDB",
      "Mongoose",
      "Redis", // from package.json
    ],

    authentication: [
      "JWT",
      "Firebase Authentication",
      "Auth.js (NextAuth)",
      "Better Auth",
    ],

    // "React Query" removed: same library as TanStack Query.
    stateManagement: ["Zustand", "Redux", "TanStack Query", "TanStack Form"],

    ai: [
      "Retrieval-Augmented Generation (RAG)",
      "Embeddings", // from migrations (setup_vector)
      "Vector Search",
      "AI Agents",
      "Tool Calling",
    ],

    tools: [
      "Git",
      "GitHub",
      "Postman",
      "Linux",
      "Debian",
      "Docker",
      "Vercel",
      "Netlify",
      "Cloudflare Workers", // from package.json / cloudflare.config.ts
      "Firebase",
    ],
  },

  social,
  pendingHandles,

  accountStatus: {
    primaryUsername: USERNAME,
    exceptions: { x: "dev_polas", instagram: "dev_polas" },
  },

  languages: [
    { name: "Bengali", code: "bn", proficiency: "Native" },
    { name: "English", code: "en", proficiency: "Professional working" },
  ],

  seo: {
    brandName: BRAND,
    alternateNames: [WORDMARK, NAME, USERNAME],
    canonicalUrl: BASE_URL,
    entityType: "Person",
    sameAs, // derived from `social`, verified entries only
  },

  content: {
    primaryTopics: [
      "Full-Stack Development",
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Prisma ORM",
      "System Design",
      "Software Architecture",
      "Application Security",
      "AI Engineering",
    ],

    audience: [
      "Software Engineers",
      "Technical Recruiters",
      "Engineering Leaders",
      "Freelance Clients",
      "Software Development Teams",
      "Open Source Communities",
    ],

    primaryWebsite: BASE_URL,
    primaryCallToAction: "Explore my work",
    secondaryCallToAction: "Let's connect",
  },
} as const;

export type Profile = typeof profile;
export type SocialPlatform = keyof typeof profile.social;
export type ExpertiseCategory = keyof typeof profile.expertise;
