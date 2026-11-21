// Structured data (JSON-LD) so Google understands who this is, where, and what is offered.
import { SITE, BASED_IN } from "./site";
import { SERVICES } from "../data/services";

const address = () => ({
  "@type": "PostalAddress",
  ...(SITE.city ? { addressLocality: SITE.city } : {}),
  ...(SITE.region ? { addressRegion: SITE.region } : {}),
  addressCountry: "NG",
});

const areas = () =>
  SITE.areaServed.filter((a) => !a.startsWith("Remote")).map((name) => ({ "@type": name === "Nigeria" ? "Country" : "City", name }));

export const personSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE.url}/#person`,
  name: SITE.name,
  alternateName: "Dominion",
  url: SITE.url,
  image: `${SITE.url}/portrait.jpg`,
  jobTitle: [SITE.title, SITE.altTitle],
  description: `${SITE.title} and ${SITE.altTitle.toLowerCase()} based in ${BASED_IN}.`,
  address: address(),
  email: `mailto:${SITE.email}`,
  telephone: SITE.phone.replace(/\s/g, ""),
  sameAs: [SITE.github, SITE.linkedin, SITE.x],
  knowsAbout: ["Software development", "Web development", "React", "Next.js", "Django", "GraphQL", "PostgreSQL", "Supabase", "API development"],
  alumniOf: { "@type": "CollegeOrUniversity", name: "Olabisi Onabanjo University" },
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  author: { "@id": `${SITE.url}/#person` },
  inLanguage: "en",
});

export const serviceProviderSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE.url}/#business`,
  name: `${SITE.name}, ${SITE.title}`,
  url: SITE.url,
  image: `${SITE.url}/og.jpg`,
  founder: { "@id": `${SITE.url}/#person` },
  email: SITE.email,
  telephone: SITE.phone.replace(/\s/g, ""),
  address: address(),
  areaServed: areas(),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Software development services",
    itemListElement: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name, url: `${SITE.url}/services/${s.slug}` },
    })),
  },
});

export const serviceSchema = (s) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: s.name,
  serviceType: s.name,
  description: s.metaDescription,
  url: `${SITE.url}/services/${s.slug}`,
  provider: { "@id": `${SITE.url}/#person` },
  areaServed: areas(),
});

export const faqSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: `${SITE.url}${path}` })),
});
