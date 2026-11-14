// All project content in one place. Home shows the first three.
// `draft: true` marks case-study copy written for you to check.
// Screenshots: drop a file named <slug>.png / .jpg / .webp into src/assets/projects/.
// A .png or .jpg wins over the .webp placeholder, so replacing an image needs no code change.

const files = import.meta.glob("../assets/projects/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" });
const imageFor = (slug) => {
  const hits = Object.entries(files).filter(([p]) => p.split("/").pop().replace(/\.\w+$/, "") === slug);
  if (!hits.length) return null;
  hits.sort(([a], [b]) => (a.endsWith(".webp") ? 1 : 0) - (b.endsWith(".webp") ? 1 : 0));
  return hits[0][1];
};

const raw = [
  {
    slug: "central-exchange",
    name: "Central Exchange",
    cat: "Frontend",
    tag: "Sole frontend dev",
    type: "Frontend · sole developer",
    role: "Sole frontend developer",
    url: "centralexchange.com.ng",
    blurb: "A live crypto and fiat P2P trading platform. I built the complete frontend, from the public site through the authenticated app.",
    bullets: [
      "Auth flows, P2P merchant matching, sell crypto and purchase credits",
      "A live order tracker that follows a trade from match to release",
      "Dark, light and system theming, responsive at every breakpoint",
    ],
    stack: ["React", "Vite", "Tailwind CSS"],
    hasDemo: true,
    problem:
      "People were being asked to move real money through this product, so it had to earn trust on the first screen and keep it through every step of a trade. That meant a public site that explains the platform clearly, and an app where nobody ever has to wonder what state their order is in.",
    roleLong:
      "I was the only frontend developer. I owned every screen and state, worked against the backend team's API, and shipped the public site and the authenticated app as one codebase.",
    decisions: [
      { t: "One order status, many views", d: "The tracker derives every label, step and available action from a single status value, so two parts of the screen can never disagree about where a trade is." },
      { t: "Theme as context, not overrides", d: "Dark, light and system modes run through one ThemeContext and a shared set of Tailwind tokens. No component carries its own colour exceptions." },
      { t: "Phone first", d: "Trading happens on phones, so every flow was designed at the smallest breakpoint and widened from there." },
    ],
    draft: true, // decisions drafted for review: confirm before launch
  },
  {
    slug: "ledgio",
    name: "Ledgio",
    cat: "Full-stack",
    tag: "Full-stack build",
    type: "Full-stack · PWA",
    role: "Full-stack developer",
    url: "ledgio-nine.vercel.app",
    blurb: "An offline-first record book for small businesses. It replaces paper, calculators and the manual weekly summary.",
    bullets: [
      "Multi-tenant Firestore with isolated data per business and plan limits enforced in security rules",
      "Per-worker performance and history",
      "Automatic revenue, expense and profit tracking, installable with offline writes",
    ],
    stack: ["React", "Vite", "Tailwind CSS", "Firebase", "Cloudinary"],
    problem:
      "Small businesses already keep a notebook of each day's work, then sit down at the end of the week with a calculator to work out what came in, what went out and who did what. The totals arrive late, they are easy to get wrong, and nobody can see how each worker is doing without doing the sums again.",
    roleLong:
      "I designed and built it end to end: the data model, the installable frontend, the Firebase rules that keep each business's data apart, and a separate admin console for support and broadcasts.",
    decisions: [
      { t: "Offline first, because the shop floor is", d: "Records are written locally and sync when a connection comes back, so a weak signal never stops someone logging a sale. The trade-off is simpler conflict handling: one record usually has one author, so the latest write wins." },
      { t: "Isolation enforced in security rules", d: "Each business lives under its own path and the Firestore rules check membership and plan limits on every read and write. The client cannot reach another tenant's data even if it tries, at the cost of rules that need their own tests." },
      { t: "Totals are computed, never typed", d: "Revenue, expenses and profit are derived from the records themselves, so a summary can never drift from the entries behind it." },
    ],
    draft: true,
  },
  {
    slug: "docpilot",
    name: "DocPilot",
    cat: "Full-stack",
    tag: "Full-stack build",
    type: "Full-stack · developer tool",
    role: "Full-stack developer",
    url: "docpilot-beta.vercel.app",
    blurb: "OpenAPI documentation intelligence. Upload or link a spec and get a quality-scored, browsable doc site.",
    bullets: [
      "Three-pane dashboard: endpoint nav, full viewer, live insights rail",
      "Spec-wide quality scoring and issue detection",
      "Ranked recommendations per endpoint, six-language snippets",
    ],
    stack: ["React", "TypeScript", "Zustand"],
    problem:
      "Most OpenAPI specs are incomplete in ways nobody notices until a developer gets stuck: missing descriptions, undocumented errors, examples that never got written. Teams had no quick way to see where their docs were weak, and the docs they did generate were hard to read.",
    roleLong:
      "I built the whole product: spec parsing, the scoring and issue detection, the three-pane dashboard and the export tools. It runs fully in the browser.",
    decisions: [
      { t: "No backend, on purpose", d: "Parsing and scoring happen client-side, so a company's API spec never leaves the visitor's machine. The trade-off is that very large specs lean on the visitor's device rather than a server." },
      { t: "One store, three panes", d: "A single Zustand store drives the endpoint nav, the viewer and the insights rail, so selecting an endpoint updates all three at once and they never fall out of step." },
      { t: "Scores that explain themselves", d: "Every quality score links to the specific issues behind it and a ranked list of fixes, so a low number always comes with a next step." },
    ],
    draft: true,
  },
  {
    slug: "ruralaid",
    name: "RuralAid",
    cat: "Full-stack",
    tag: "Full-stack build",
    type: "Full-stack · dissertation",
    role: "Sole developer",
    url: "ruralaid.vercel.app",
    blurb: "An emergency-response platform that connects rural communities to responders in real time.",
    bullets: [
      "Three roles (user, responder, admin) with Supabase Auth and row-level security",
      "Real-time responder alerts and in-app chat",
      "A live emergency map with Haversine distance matching",
      "Responder onboarding and an admin approvals flow",
    ],
    stack: ["React 19", "Supabase", "Leaflet", "Framer Motion"],
    problem:
      "In rural communities, the gap between something going wrong and help arriving is often the problem itself. People need a fast way to report an emergency with their location, and responders need to know about it immediately and talk to the person while they travel.",
    roleLong:
      "This was my final-year dissertation and I was the only developer. I designed and built the whole system, from the database policies to the live map, and wrote up its implementation and testing.",
    decisions: [
      { t: "Security in the database, not the UI", d: "Row-level security policies decide what each role can read, so a responder only ever sees incidents assigned to them. Even a modified client cannot see anyone else's emergency." },
      { t: "Push, not polling", d: "Status changes and chat messages arrive over Supabase realtime channels, so a reporter sees \"en route\" the moment it happens. The cost is handling reconnects when the signal drops." },
      { t: "Nearest responder by straight-line distance", d: "Haversine distance on coordinates picks the closest available responder. At rural distances it is simple, fast and close enough to road distance to be useful." },
    ],
    draft: true,
  },
  {
    slug: "real-estate-template",
    name: "Real Estate Template",
    cat: "Frontend",
    tag: "Frontend demo",
    type: "Frontend · demo",
    role: "Frontend developer",
    url: "estate-temp.vercel.app",
    blurb: "A responsive property showcase with filterable listings and a clean agency layout.",
    bullets: ["Property filter UI with a dynamic listing grid", "Responsive from mobile through widescreen"],
    stack: ["React", "Tailwind CSS", "JavaScript"],
    problem: "Agencies want a site that shows listings well and is quick to adapt to their own brand and inventory.",
    roleLong: "A frontend demo I designed and built as a reusable starting point for agency sites.",
    decisions: [
      { t: "Data-driven listings", d: "Every card and filter reads from one listings array, so swapping in a CMS or API later changes the data source, not the components." },
      { t: "Images do the selling", d: "Large photography carries the page, with the layout kept quiet around it." },
    ],
    draft: true,
  },
];

export const PROJECTS = raw.map((p) => ({
  ...p,
  img: imageFor(p.slug),
  href: `https://${p.url}`,
  problem: p.problem ?? p.blurb,
  roleLong: p.roleLong ?? "I designed and built this end to end.",
  decisions: p.decisions ?? [],
}));

export const HOME_PROJECTS = PROJECTS.slice(0, 3);
export const projectBySlug = (slug) => PROJECTS.find((p) => p.slug === slug);
