import { Reveal } from "../ui/Reveal";

// One request's path through a product. The order means something, so no numbers.
const ROWS = [
  { k: "interface", t: "Fullstack apps.", d: "React frontends wired to their own backends, shipped as one product.", s: "React · Vite · Tailwind · TypeScript" },
  { k: "api", t: "APIs & backend architecture.", d: "GraphQL and REST with clean layer separation, like the rider, order and pricing mutations on a logistics platform.", s: "Django · Strawberry GraphQL · REST" },
  { k: "data", t: "Database design.", d: "Schemas and row-level security built for queries that stay fast as the data grows.", s: "PostgreSQL · Supabase · Firestore" },
  { k: "real-time", t: "Real-time features.", d: "Live, synced state: RuralAid's responder chat and emergency map run on it.", s: "Supabase channels · WebSockets" },
  { k: "deploy", t: "Deployment & infra.", d: "Docker-based CI/CD and Vercel deployments, managed end to end.", s: "Docker · Vercel · CI/CD" },
];

export default function WhatIBuild() {
  return (
    <section id="build" data-tone="2" className="section">
      <Reveal className="section-head" style={{ marginBottom: 28 }}>
        <h2 className="t-h2" style={{ margin: 0 }}>What I build</h2>
        <p>Read top to bottom, it's the path one request takes through a product. I work on every stop.</p>
      </Reveal>
      <Reveal as="dl" className="build-table">
        {ROWS.map((r) => (
          <div key={r.k} className="build-row">
            <dt className="t-meta">{r.k}</dt>
            <dd><b>{r.t}</b> <span>{r.d}</span></dd>
            <dd className="build-stack">{r.s}</dd>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
