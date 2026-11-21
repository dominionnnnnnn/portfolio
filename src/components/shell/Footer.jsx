"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useIntro } from "./IntroContext";
import { NAV_LINKS } from "./Nav";
import { SITE, BASED_IN } from "../../lib/site";
import { SERVICES } from "../../data/services";
import { LOCATIONS } from "../../data/locations";
import { lagosNow } from "../../lib/time";

const STACK = ["React", "Django", "GraphQL", "Supabase", "PostgreSQL", "Tailwind CSS"];

const Col = ({ title, children }) => (
  <div className="footer-col">
    <div className="t-meta" style={{ color: "var(--ink-3)", marginBottom: 6 }}>{title}</div>
    {children}
  </div>
);

export default function Footer() {
  const { replay } = useIntro();
  // Time renders after mount: pages are prerendered at build time, so a server clock would be stale.
  const [now, setNow] = useState({ time: "--:--", status: "" });
  useEffect(() => {
    setNow(lagosNow());
    const id = setInterval(() => setNow(lagosNow()), 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div style={{ gridColumn: "span 2", minWidth: 0 }}>
          <div style={{ font: "700 clamp(24px,3vw,34px)/1.05 var(--font-display)", letterSpacing: "-.03em" }}>{SITE.name}</div>
          <p style={{ margin: "10px 0 0", color: "var(--ink-2)", fontSize: 15.5 }}>
            {SITE.title} ({SITE.altTitle}) in {BASED_IN}. Working with clients in Lagos, across Nigeria and remotely.
          </p>
          <p style={{ margin: "8px 0 0", font: "400 12.5px/1.7 var(--font-mono)", color: "var(--ink-3)" }}>{STACK.join(" · ")}</p>
          <p suppressHydrationWarning style={{ margin: "22px 0 0", font: "400 12.5px/1.7 var(--font-mono)", color: "var(--ink-3)" }}>
            It's {now.time} where I am. {now.status}
          </p>
        </div>
        <Col title="Site">
          {NAV_LINKS.map((l) => <Link key={l.label} href={l.to}>{l.label}</Link>)}
        </Col>
        <Col title="Services">
          {SERVICES.map((s) => <Link key={s.slug} href={`/services/${s.slug}`}>{s.short}</Link>)}
          {LOCATIONS.map((l) => <Link key={l.slug} href={`/software-developer-${l.slug}`}>Developer in {l.city}</Link>)}
        </Col>
        <Col title="Contact">
          <a href={`mailto:${SITE.email}`} style={{ overflowWrap: "anywhere" }}>{SITE.email}</a>
          <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
          <a href={SITE.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>
        </Col>
      </div>
      <div className="footer-base">
        <span>© {new Date().getFullYear()} {SITE.name}</span>
        <span style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
          <button type="button" onClick={replay}>replay intro</button>
          <Link href="/this-page-was-never-here">a page that doesn't exist</Link>
        </span>
      </div>
    </footer>
  );
}
