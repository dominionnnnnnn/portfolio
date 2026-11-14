import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { PROJECTS, projectBySlug } from "../data/projects";
import { BrowserFrame } from "../components/home/SelectedWork";
import OrderTrackerDemo from "../components/pages/OrderTrackerDemo";
import Magnetic from "../components/ui/Magnetic";
import NotFoundPage from "./NotFoundPage";

const Meta = ({ label, children }) => (
  <div>
    <div className="t-meta" style={{ color: "var(--ink-3)", fontSize: 11.5 }}>{label}</div>
    <div style={{ marginTop: 8 }}>{children}</div>
  </div>
);

export default function CaseStudyPage() {
  const { slug } = useParams();
  const p = projectBySlug(slug);
  const [current, setCurrent] = useState("cs-problem");

  const toc = p
    ? [
        ["cs-problem", "The problem"],
        ["cs-role", "My role"],
        ["cs-built", "What I built"],
        ["cs-stack", "Stack"],
        ...(p.decisions.length ? [["cs-decisions", "Key decisions"]] : []),
      ]
    : [];

  // Highlight the section being read in the sticky table of contents.
  useEffect(() => {
    if (!p) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setCurrent(e.target.id)),
      { rootMargin: "-30% 0px -60% 0px" }
    );
    toc.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!p) return <NotFoundPage />;

  const idx = PROJECTS.indexOf(p);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const go = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: reduced ? "instant" : "smooth" });
  };

  return (
    <article className="page case">
      <title>{`${p.name} | Abdulquawiy Adebiyi`}</title>
      <Link to="/projects" className="back-link">← All projects</Link>
      <p className="t-meta" style={{ margin: "14px 0 0", color: "var(--ink-3)" }}>Case study · {p.type}</p>
      <motion.h1 layoutId={`title-${p.slug}`} className="page-title" style={{ width: "fit-content" }}>{p.name}</motion.h1>
      <p className="page-lead">{p.blurb}</p>

      <div className="cs-meta">
        <Meta label="Role">{p.role}</Meta>
        <Meta label="Stack">{p.stack.join(" · ")}</Meta>
        <Meta label="Live">
          <a href={p.href} target="_blank" rel="noopener noreferrer" className="inline-link">{p.url} ↗</a>
        </Meta>
      </div>

      <div className="showcase-frame cs-hero" style={{ cursor: "default" }}>
        <BrowserFrame p={p} />
      </div>

      <div className="cs-body">
        <div className="cs-col">
          <h2 id="cs-problem" className="cs-h">The problem</h2>
          <p>{p.problem}</p>

          <h2 id="cs-role" className="cs-h">My role</h2>
          <p>{p.roleLong}</p>

          <h2 id="cs-built" className="cs-h">What I built</h2>
          <ul className="dash-list" style={{ marginTop: 0, gap: 10 }}>
            {p.bullets.map((b) => <li key={b} style={{ fontSize: "inherit" }}>{b}</li>)}
          </ul>
          {p.hasDemo && <OrderTrackerDemo />}

          <h2 id="cs-stack" className="cs-h">Stack</h2>
          <div className="chips" style={{ marginTop: 0 }}>
            {p.stack.map((c) => <span key={c} className="chip chip-mono">{c}</span>)}
          </div>

          {p.decisions.length > 0 && (
            <>
              <h2 id="cs-decisions" className="cs-h">Key decisions</h2>
              <div style={{ display: "grid", gap: 22 }}>
                {p.decisions.map((d) => (
                  <div key={d.t}>
                    <div style={{ fontWeight: 600, color: "var(--ink)" }}>{d.t}</div>
                    <p style={{ margin: "4px 0 0" }}>{d.d}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="cs-foot">
            <Magnetic href={p.href} target="_blank" rel="noopener noreferrer" style={{ padding: "14px 24px" }}>Visit the live site ↗</Magnetic>
            <Link to={`/projects/${next.slug}`} className="link-underline">Next: {next.name} →</Link>
          </div>
        </div>

        <aside className="cs-toc" aria-label="On this page">
          <div className="t-meta" style={{ color: "var(--ink-3)", fontSize: 11.5, marginBottom: 10 }}>On this page</div>
          {toc.map(([id, label]) => (
            <button key={id} type="button" onClick={() => go(id)} aria-current={current === id ? "location" : undefined}>
              {label}
            </button>
          ))}
        </aside>
      </div>
    </article>
  );
}
