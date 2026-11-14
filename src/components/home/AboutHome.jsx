import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "../ui/Reveal";
import { lagosNow } from "../../lib/time";
import { SITE } from "../../lib/site";

const K = ({ children }) => <span style={{ color: "var(--ink-3)" }}>{children}</span>;
const V = ({ children }) => <span style={{ color: "var(--ink)" }}>{children}</span>;

export default function AboutHome() {
  const [now, setNow] = useState(lagosNow);
  useEffect(() => {
    const id = setInterval(() => setNow(lagosNow()), 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="about-home" data-tone="3" className="section about-home">
      <Reveal>
        <h2 className="t-h2" style={{ margin: 0 }}>About</h2>
        <p style={{ margin: "24px 0 0", fontSize: "clamp(18px,1.7vw,21px)", textWrap: "pretty" }}>
          I'm {SITE.name}, a fullstack engineer with 2+ years across logistics, fintech and emergency-response systems.
        </p>
        <p style={{ margin: "16px 0 0", color: "var(--ink-2)", textWrap: "pretty" }}>
          I collaborate on backend architecture, lead frontend builds, and ship products that hold up under real
          conditions, not just in demos. Open to remote work: a product team, a frontend or fullstack contract, or
          something built from scratch.
        </p>
        <Link to="/about" className="link-underline" style={{ marginTop: 14 }}>More about me →</Link>
      </Reveal>

      {/* The terminal motif. Wraps instead of truncating at any width. */}
      <Reveal className="terminal">
        <div className="terminal-bar">$ cat about.json</div>
        <div className="terminal-body">
          <div>{"{"}</div>
          <div className="ind"><K>"name":</K> <V>"{SITE.name}"</V>,</div>
          <div className="ind"><K>"role":</K> <V>"{SITE.title}"</V>,</div>
          <div className="ind"><K>"stack":</K> ["React", "Django", "GraphQL", "Supabase", "PostgreSQL"],</div>
          <div className="ind"><K>"based_in":</K> "Nigeria",</div>
          <div className="ind"><K>"local_time":</K> "{now.time} WAT",</div>
          <div className="ind"><K>"currently":</K> <V>"Open to new opportunities"</V></div>
          <div>{"}"}</div>
        </div>
      </Reveal>
    </section>
  );
}
