// Single source of truth for identity + links.
export const SITE = {
  url: "https://www.abdulquawiy.online", // live site redirects the bare domain to www
  name: "Abdulquawiy Adebiyi",
  shortName: "Abdulquawiy",
  monogram: "AA",
  // Visible title. "Fullstack Engineer" stays in descriptions, keywords and schema for search.
  title: "Software Developer",
  altTitle: "Fullstack Engineer",
  // Where you are based. Edit `city` to the real one; it feeds the "based in" lines and schema.
  city: "Abeokuta",
  region: "Ogun State",
  country: "Nigeria",
  areaServed: ["Lagos", "Abeokuta", "Ibadan", "Abuja", "Nigeria", "Remote (worldwide)"],
  email: "adebiyiquawiy2006@gmail.com",
  phone: "+234 903 820 7504",
  whatsapp: "https://wa.me/2349038207504",
  github: "https://github.com/dominionnnnnnn",
  githubHandle: "dominionnnnnnn",
  linkedin: "https://www.linkedin.com/in/aabdulquawiy",
  x: "https://x.com/not_dominion",
  bookCall: "https://calendly.com/adebiyiquawiy2006/30min",
  cv: "/resume.pdf",
};

export const BASED_IN = SITE.city ? `${SITE.city}, ${SITE.country}` : SITE.country;

export const KEYWORDS = [
  "software developer",
  "software developer in Nigeria",
  "software developer in Lagos",
  "software developer in Abeokuta",
  "fullstack engineer",
  "fullstack developer Nigeria",
  "web developer Lagos",
  "web developer Abeokuta",
  "React developer Nigeria",
  "Next.js developer",
  "Django developer Nigeria",
  "backend developer Nigeria",
  "hire a software developer in Nigeria",
  "AI automation Nigeria",
  "AI agent developer Nigeria",
];
