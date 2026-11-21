"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Reveal } from "../ui/Reveal";
import { lagosNow } from "../../lib/time";
import { SITE, BASED_IN } from "../../lib/site";

const K = ({ children }) => <span style={{ color: "var(--ink-3)" }}>{children}</span>;
const V = ({ children }) => <span style={{ color: "var(--ink)" }}>{children}</span>;

export default function AboutHome() {
  // Time renders after mount: pages are prerendered at build time, so a server clock would be stale.
  const [now, setNow] = useState({ time: "--:--", status: "" });
  useEffect(() => {
    setNow(lagosNow());
    const id = setInterval(() => setNow(lagosNow()), 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="band band-light band-cover" data-surface="light">
    <section id="about-home" className="section about-home">
      <Reveal>
        <h2 className="t-h2" style={{ margin: 0 }}>About</h2>
        <p style={{ margin: "24px 0 0", fontSize: "clamp(18px,1.7vw,21px)", textWrap: "pretty" }}>
          I'm {SITE.name}, a software developer (fullstack engineer) based in {BASED_IN}, with 2+ years across logistics, fintech and emergency-response systems.
        </p>
        <p style={{ margin: "16px 0 0", color: "var(--ink-2)", textWrap: "pretty" }}>
          I collaborate on backend architecture, lead frontend builds, and ship products that hold up under real
          conditions, not just in demos. Open to remote work: a product team, a frontend or fullstack contract, or
          something built from scratch.
        </p>
        <Link href="/about" className="link-underline" style={{ marginTop: 14 }}>More about me →</Link>
      </Reveal>

      {/* The terminal motif. Wraps instead of truncating at any width. */}
      <Reveal className="terminal">
        <div className="terminal-bar">$ cat about.json</div>
        <div className="terminal-body">
          <div>{"{"}</div>
          <div className="ind"><K>"name":</K> <V>"{SITE.name}"</V>,</div>
          <div className="ind"><K>"role":</K> <V>"{SITE.title}"</V>,</div>
          <div className="ind"><K>"stack":</K> ["React", "Django", "GraphQL", "Supabase", "PostgreSQL"],</div>
          <div className="ind"><K>"based_in":</K> "{BASED_IN}",</div>
          <div className="ind" suppressHydrationWarning><K>"local_time":</K> "{now.time} WAT",</div>
          <div className="ind"><K>"currently":</K> <V>"Open to new opportunities"</V></div>
          <div>{"}"}</div>
        </div>
      </Reveal>
    </section>
    </div>
  );
}
