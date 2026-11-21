import { profile } from "@/data/profile";

export const siteConfig = {
  name: profile.name,
  username: profile.username,
  brandName: profile.brandName, // "Dev Polas"

  title: profile.websiteConfig.title, // "Polas Chandra Barmon | Full-Stack Software Engineer"
  role: profile.role,
  headline: profile.headline,

  // ~150 characters, so Google is unlikely to truncate it.
  description:
    "Polas Chandra Barmon is a Full-Stack Software Engineer building reliable web apps and AI features with Next.js, TypeScript, Node.js, PostgreSQL and RAG.",

  url: profile.website,
  email: profile.email,
  publicEmail: profile.alternativeEmail,
  locale: profile.websiteConfig.locale,
  language: profile.websiteConfig.language,
  twitterHandle: `@${profile.social.x.username}`,

  // URL strings only, so Object.values() is always safe.
  social: {
    github: profile.social.github.url,
    linkedin: profile.social.linkedin.url,
    x: profile.social.x.url,
    facebook: profile.social.facebook.url,
    instagram: profile.social.instagram.url,
  },

  // Contact links, deliberately kept out of sameAs.
  contact: {
    whatsapp: profile.contact.whatsapp,
    telegram: profile.contact.telegram,
  },

  location: profile.location,
  brand: profile.brand,

  professional: {
    specialties: [
      "Full-Stack Web Development",
      "Frontend Engineering",
      "Backend API Development",
      "Database Design",
      "AI Engineering",
      "Software Architecture",
      "Performance Optimization",
    ],

    // Derived from the profile so the two can never drift apart.
    technologies: [...new Set(Object.values(profile.expertise).flat())],

    interests: [
      "System Design",
      "Software Architecture",
      "AI Applications",
      "Agentic Workflows",
      "Developer Experience",
      "Performance Optimization",
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
