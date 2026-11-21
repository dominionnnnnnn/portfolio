// Each service gets its own page at /services/<slug>, written for the searches people actually make.
// `projects` are slugs from data/projects.js shown as proof on the page.

export const SERVICES = [
  {
    slug: "web-development",
    short: "Websites & web apps",
    name: "Website and Web App Development",
    h1: "Website and web app development in Nigeria",
    metaTitle: "Website & Web App Developer in Lagos, Abeokuta & Nigeria",
    metaDescription:
      "Fast, modern websites and web apps built with React and Next.js by Abdulquawiy Adebiyi, a software developer in Nigeria working with businesses in Lagos, Abeokuta and remotely.",
    lead:
      "A website that loads fast, ranks on Google and turns visitors into calls, orders or sign-ups. Built with React and Next.js, designed for phones first.",
    forWho: "Businesses, founders and teams who need a new website, a web app, or a site that finally works on mobile.",
    includes: [
      "Responsive design that works on every phone, tablet and laptop",
      "Next.js builds with server rendering, so pages load fast and Google can read them",
      "On-page SEO: titles, descriptions, structured data and a sitemap",
      "Contact forms, WhatsApp links, booking and analytics wired in",
      "Deployment on Vercel with your own domain",
    ],
    stack: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
    projects: ["central-exchange", "real-estate-template"],
    faqs: [
      { q: "How long does a website take?", a: "A business website usually takes one to three weeks depending on the number of pages and how ready the content is. Web apps are scoped on a call first." },
      { q: "Do you work with businesses outside Lagos?", a: "Yes. I work with clients in Lagos, Abeokuta and across Nigeria, and with international clients remotely." },
      { q: "Will my website show up on Google?", a: "Every site is built with technical SEO in place: fast pages, proper titles and descriptions, structured data and a sitemap submitted to Google Search Console." },
    ],
  },
  {
    slug: "backend-api-development",
    short: "Backends & APIs",
    name: "Backend and API Development",
    h1: "Backend and API development with Django and GraphQL",
    metaTitle: "Backend & API Developer in Nigeria (Django, GraphQL, REST)",
    metaDescription:
      "Django, Django REST Framework and Strawberry GraphQL backends with PostgreSQL, built by Abdulquawiy Adebiyi, a fullstack software developer in Nigeria.",
    lead:
      "The part users never see but always feel. Clean APIs, sound data models and business logic that holds up as the product grows.",
    forWho: "Startups and product teams who need a reliable backend, a new API, or someone to untangle an existing one.",
    includes: [
      "REST APIs with Django REST Framework, or GraphQL with Strawberry",
      "Authentication, roles and permissions",
      "Data modelling on PostgreSQL with migrations and indexes",
      "Background jobs, imports and third-party integrations",
      "Dockerised setup and CI/CD so deployments are repeatable",
    ],
    stack: ["Python", "Django", "DRF", "Strawberry GraphQL", "PostgreSQL", "Docker"],
    projects: ["ruralaid", "docpilot"],
    faqs: [
      { q: "Can you work with my existing frontend team?", a: "Yes. Most of my backend work has been alongside frontend and mobile teams, agreeing on the API contract first so both sides can move in parallel." },
      { q: "REST or GraphQL?", a: "It depends on who consumes the API. I'll recommend one on the call and explain the trade-off for your case." },
    ],
  },
  {
    slug: "fullstack-development",
    short: "Full products",
    name: "Fullstack Product Development",
    h1: "Fullstack product development, from first click to final query",
    metaTitle: "Fullstack Engineer for Hire in Nigeria | MVPs & Web Products",
    metaDescription:
      "Hire a fullstack engineer in Nigeria to build your MVP or web product end to end: React and Next.js frontend, Django or Supabase backend, database and deployment.",
    lead:
      "One developer who owns the whole product: the screens, the API, the database and the deployment. Fewer handoffs, faster launches.",
    forWho: "Founders with an idea or a spec who need an MVP or a full web product built end to end.",
    includes: [
      "Scoping the first version so you launch with what matters",
      "Frontend in React or Next.js, backend in Django or Supabase",
      "Database design, auth and admin tools",
      "Real-time features where the product needs them",
      "Launch, monitoring and a clear handover",
    ],
    stack: ["React", "Next.js", "Django", "Supabase", "PostgreSQL", "Firebase"],
    projects: ["ledgio", "ruralaid", "docpilot"],
    faqs: [
      { q: "I only have an idea. Can we still start?", a: "Yes. The first call is about turning the idea into a small first version and a realistic plan. You don't need a finished spec." },
      { q: "Who owns the code?", a: "You do. The code lives in your repository and accounts from day one." },
    ],
  },
  {
    slug: "database-design",
    short: "Databases & Supabase",
    name: "Database Design and Supabase Development",
    h1: "Database design, PostgreSQL and Supabase development",
    metaTitle: "PostgreSQL & Supabase Developer in Nigeria",
    metaDescription:
      "PostgreSQL schemas, Supabase row-level security and real-time features designed by Abdulquawiy Adebiyi, a software developer in Nigeria.",
    lead:
      "Get the data model right and the rest of the product gets easier. Schemas, security rules and queries that stay fast as data grows.",
    forWho: "Teams starting a new product, or products slowing down under their own data.",
    includes: [
      "Schema design and migrations on PostgreSQL",
      "Supabase setup: auth, row-level security and storage",
      "Real-time channels for live updates and chat",
      "Query and index tuning for slow pages",
      "Multi-tenant data isolation",
    ],
    stack: ["PostgreSQL", "Supabase", "Firebase", "Firestore"],
    projects: ["ruralaid", "ledgio"],
    faqs: [
      { q: "Can you fix a slow database?", a: "Usually, yes. I start by finding the slow queries, then fix indexes, query shape or schema, and measure the result." },
    ],
  },
  {
    slug: "ai-automation",
    short: "AI automation",
    name: "AI Automation and Workflow Integration",
    h1: "AI automation for businesses in Nigeria",
    metaTitle: "AI Automation Developer in Nigeria | AI Agents, Chatbots & Workflows",
    metaDescription:
      "Automate repetitive work with AI. Abdulquawiy Adebiyi, a software developer in Abeokuta, builds AI agents, chatbots, document processing and workflow automations for businesses in Lagos, across Nigeria and remotely.",
    lead:
      "Hand the repetitive work to software. AI agents, chatbots and automations that answer customers, process documents and move data between your tools, so your team can focus on the work only people can do.",
    forWho: "Businesses and teams losing hours to repetitive tasks: replying to the same questions, copying data between tools, sorting documents or writing routine reports.",
    includes: [
      "Mapping the task you want automated and where AI actually helps",
      "AI agents and assistants built on models like Claude and GPT",
      "Customer-facing chatbots for your website or WhatsApp",
      "Document and email processing: extract, sort, summarise, route",
      "Automations that connect your existing tools, with a human check where it matters",
    ],
    stack: ["Python", "Django", "Claude API", "OpenAI API", "n8n", "Webhooks"],
    projects: [],
    faqs: [
      { q: "What can actually be automated?", a: "Most tasks that follow a pattern: answering common questions, pulling details out of documents, updating records, sending follow-ups and preparing reports. We start by finding the one that costs you the most time." },
      { q: "Will AI make mistakes with my customers?", a: "Automations are built with limits and checks. Anything sensitive can go to a person for approval before it is sent." },
    ],
  },
  {
    slug: "website-redesign",
    short: "Website redesign",
    name: "Website Redesign",
    h1: "Website redesign for businesses in Lagos, Abeokuta and across Nigeria",
    metaTitle: "Website Redesign in Lagos & Abeokuta | Modern, Fast, Mobile-First",
    metaDescription:
      "Turn an outdated or slow business website into a fast, modern, mobile-first site that ranks on Google. Website redesign by Abdulquawiy Adebiyi, software developer in Nigeria.",
    lead:
      "If your site looks dated, loads slowly or breaks on phones, it is costing you customers. I rebuild it so it looks current and does its job.",
    forWho: "Businesses whose current website is old, slow, hard to update or not bringing in enquiries.",
    includes: [
      "A review of what your current site does well and where it loses visitors",
      "A modern design that keeps your brand recognisable",
      "Rebuilt on Next.js for speed and SEO",
      "Content moved over with redirects so you keep your Google rankings",
      "WhatsApp, call and contact actions on every page",
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    projects: ["real-estate-template", "central-exchange"],
    faqs: [
      { q: "Will I lose my Google ranking?", a: "Not if the move is done properly. Old URLs are redirected to their new pages and the sitemap is resubmitted." },
      { q: "Can I update the site myself afterwards?", a: "Yes. If you need to edit content often, I'll set the site up so you can do it without touching code." },
    ],
  },
];

export const serviceBySlug = (slug) => SERVICES.find((s) => s.slug === slug);
