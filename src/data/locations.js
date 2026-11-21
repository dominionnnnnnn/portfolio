// City landing pages: /software-developer-<slug>. Honest framing: based in Abeokuta, working with these cities.
export const LOCATIONS = [
  {
    slug: "lagos",
    city: "Lagos",
    metaTitle: "Software Developer in Lagos | Websites, Web Apps & APIs",
    metaDescription:
      "Hire a software developer for your Lagos business. Abdulquawiy Adebiyi builds fast websites, web apps and backends with React, Next.js and Django, from Abeokuta, about 90 minutes from Lagos.",
    h1: "Software developer for Lagos businesses",
    lead:
      "Websites, web apps and backends for startups and businesses in Lagos. I'm based in Abeokuta, close enough to meet in person when it matters, and set up to work remotely the rest of the time.",
    points: [
      { t: "Remote-first, not remote-only", d: "Weekly progress you can click through, calls on your schedule, and an in-person meeting in Lagos when the project needs one." },
      { t: "Built for Lagos customers", d: "Mobile-first pages that load fast on Nigerian networks, with WhatsApp, call and Paystack or Flutterwave flows where you need them." },
      { t: "One developer, whole product", d: "Frontend, backend, database and deployment from the same person, so nothing gets lost between handoffs." },
    ],
  },
  {
    slug: "abeokuta",
    city: "Abeokuta",
    metaTitle: "Software Developer in Abeokuta | Websites & Web Apps in Ogun State",
    metaDescription:
      "Local software developer in Abeokuta, Ogun State. Abdulquawiy Adebiyi builds websites, web apps and business software with React, Next.js and Django for businesses in Abeokuta and across Nigeria.",
    h1: "Software developer in Abeokuta",
    lead:
      "I live and work in Abeokuta. If you run a business in Abeokuta or anywhere in Ogun State, we can sit down in person, plan what you need and build it here.",
    points: [
      { t: "Local and reachable", d: "Meet in person in Abeokuta to scope the project, review progress or hand it over." },
      { t: "Websites that bring in customers", d: "A modern, fast site that shows up when people in Ogun State search for what you sell." },
      { t: "Software for how you work", d: "Inventory, records, bookings or dashboards built around your actual process, not a template." },
    ],
  },
];

export const locationBySlug = (slug) => LOCATIONS.find((l) => l.slug === slug);
