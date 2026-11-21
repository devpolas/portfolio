import { profile } from "@/data/profile";
import { siteConfig } from "./site";

const siteUrl = siteConfig.url;
const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;

// Must be a real photo of you. These exist in /public: profile.webp, profile.png, polas.webp.
// Pick the one that is a clear portrait (not a banner or logo).
const PROFILE_PHOTO = "/profile.webp";

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": personId,
  name: siteConfig.name,
  alternateName: [...profile.seo.alternateNames].filter(
    (n) => n !== siteConfig.name,
  ),
  url: siteUrl,
  image: new URL(PROFILE_PHOTO, siteUrl).toString(),
  email: siteConfig.publicEmail, // keeps the personal Gmail out of structured data
  jobTitle: siteConfig.role,
  description: siteConfig.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.location.city,
    addressRegion: siteConfig.location.division,
    addressCountry: siteConfig.location.countryCode,
  },
  knowsLanguage: profile.languages.map((l) => l.code),
  // Derived from profile.social entries flagged sameAs: true (URL strings only).
  sameAs: [...profile.seo.sameAs],
  knowsAbout: [
    ...new Set([
      ...siteConfig.professional.specialties,
      ...siteConfig.professional.technologies,
    ]),
  ],
  mainEntityOfPage: { "@id": websiteId },
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": websiteId,
  url: siteUrl,
  name: siteConfig.brandName,
  alternateName: siteConfig.name,
  description: siteConfig.description,
  inLanguage: siteConfig.language,
  publisher: { "@id": personId },
};

/**
 * Safe serialization for <script type="application/ld+json">.
 * Usage: <script type="application/ld+json"
 *          dangerouslySetInnerHTML={{ __html: jsonLdString(personJsonLd) }} />
 */
export const jsonLdString = (data: object) =>
  JSON.stringify(data).replace(/</g, "\\u003c");
