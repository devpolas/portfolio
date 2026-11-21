import type { Metadata, Viewport } from "next";
import { profile } from "@/data/profile";
import { siteConfig } from "./site";

const siteUrl = siteConfig.url;
const absoluteUrl = (path: string) => new URL(path, siteUrl).toString();

/**
 * Social image: you have app/opengraph-image.png, so Next generates the URL
 * (with a hash) and injects the tags itself. Do NOT hardcode "/opengraph-image.png"
 * anywhere. Pass `image` to createMetadata() only for pages with their own image.
 */
const withImage = (image?: string, alt?: string) =>
  image ? { images: [{ url: absoluteUrl(image), alt }] } : {};

type RouteMetadata = {
  title: string;
  description: string;
  path: `/${string}`;
};

export const routeMetadata = {
  home: {
    title: "Home",
    description:
      "Polas Chandra Barmon builds reliable web applications and AI-powered products through full-stack engineering, RAG, and agentic workflows.",
    path: "/",
  },
  projects: {
    title: "Projects",
    description:
      "Software projects by Polas Chandra Barmon: full-stack apps, backend APIs, databases, and AI engineering.",
    path: "/projects",
  },
  about: {
    title: "About",
    description:
      "About Polas Chandra Barmon: his engineering philosophy, technical interests, and approach to building meaningful digital products.",
    path: "/about",
  },
  skills: {
    title: "Skills",
    // "testing" removed: no testing tools are listed in the profile.
    description:
      "Technical skills of Polas Chandra Barmon across frontend, backend, databases, AI and LLM engineering, and deployment.",
    path: "/skills",
  },
  experience: {
    // app/(marketing)/(public)/experience exists in your tree.
    // Remove this entry (and its pageMetadata line) if the page has no real content yet.
    title: "Experience",
    description:
      "Professional experience of Polas Chandra Barmon in full-stack development, backend engineering, and AI-powered products.",
    path: "/experience",
  },
  education: {
    title: "Education",
    description:
      "Educational background and ongoing learning of Polas Chandra Barmon in software engineering and technology.",
    path: "/education",
  },
  docs: {
    title: "Docs",
    description:
      "Guides and documentation by Polas Chandra Barmon on code blocks, callouts, tabs, and getting started with this site.",
    path: "/docs",
  },
  contact: {
    title: "Contact",
    description:
      "Get in touch with Polas Chandra Barmon about full-stack development, backend engineering, AI projects, and collaboration.",
    path: "/contact",
  },
} as const satisfies Record<string, RouteMetadata>;

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: siteConfig.title, // already "Name | Role", so no suffix is added
    template: `%s | ${siteConfig.brandName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.brandName,

  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [...profile.websiteConfig.keywords],

  alternates: { canonical: "/" },

  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.brandName,
    url: siteUrl,
    title: siteConfig.title,
    description: siteConfig.description,
  },

  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: siteConfig.title,
    description: siteConfig.description,
  },

  robots: {
    index: profile.websiteConfig.robots.index,
    follow: profile.websiteConfig.robots.follow,
    googleBot: {
      index: profile.websiteConfig.robots.index,
      follow: profile.websiteConfig.robots.follow,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  formatDetection: { email: false, address: false, telephone: false },
};

// app/layout.tsx: export const viewport = defaultViewport;
export const defaultViewport: Viewport = {
  themeColor: profile.websiteConfig.defaultThemeColor,
  colorScheme: "dark light",
};

type CreateMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
};

export function createMetadata({
  title,
  description,
  path = "/",
  image,
  imageAlt,
  noIndex = false,
}: CreateMetadataOptions): Metadata {
  const canonicalUrl = absoluteUrl(path);
  const isHomePage = path === "/";

  // Must match the root template: `%s | ${brandName}`
  const pageTitle = isHomePage
    ? siteConfig.title
    : `${title} | ${siteConfig.brandName}`;

  return {
    title: isHomePage ? { absolute: siteConfig.title } : title,
    description,
    alternates: { canonical: canonicalUrl },

    // Next replaces (does not merge) openGraph/twitter, so set them in full.
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.brandName,
      title: pageTitle,
      description,
      url: canonicalUrl,
      ...withImage(image, imageAlt ?? pageTitle),
    },

    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title: pageTitle,
      description,
      ...(image && { images: [absoluteUrl(image)] }),
    },

    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}

export const pageMetadata = {
  home: createMetadata(routeMetadata.home),
  projects: createMetadata(routeMetadata.projects),
  about: createMetadata(routeMetadata.about),
  skills: createMetadata(routeMetadata.skills),
  experience: createMetadata(routeMetadata.experience),
  education: createMetadata(routeMetadata.education),
  docs: createMetadata(routeMetadata.docs),
  contact: createMetadata(routeMetadata.contact),
} satisfies Record<keyof typeof routeMetadata, Metadata>;

/** For app/(dashboard)/** and any private page. */
export const privateMetadata: Metadata = createMetadata({
  title: "Dashboard",
  description: "Private dashboard.",
  path: "/dashboard",
  noIndex: true,
});
