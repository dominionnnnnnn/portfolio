"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import EnvelopeWork from "./EnvelopeWork";
import Unveil from "../ui/Unveil";
import useMedia from "../../hooks/useMedia";
import { Reveal } from "../ui/Reveal";
import { HOME_PROJECTS } from "../../data/projects";
import { snappy } from "../../lib/motion";

export function BrowserFrame({ p, layout = true, unveil = false, i = 0 }) {
  const shot = (
  <>{p.img ? (
        <motion.img
          layoutId={layout ? `shot-${p.slug}` : undefined}
          src={p.img}
          alt={`${p.name} screenshot`}
          loading="lazy"
          decoding="async"
          className="frame-shot"
          style={{ "--focus": p.focus }}
        />
      ) : (
        <div className="frame-shot frame-empty">
          <span className="t-meta">{p.name}</span>
        </div>
      )}</>
  );
  return (
    <>
      <div className="frame-bar">
        <span /><span /><span />
        <em>{p.url}</em>
      </div>
      {unveil ? <Unveil label={p.name} tag={p.tag} i={i}>{shot}</Unveil> : shot}
    </>
  );
}

function Showcase({ p, i, total }) {
  const router = useRouter();
  const to = `/projects/${p.slug}`;
  const glow = (e) => {
    const b = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - b.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - b.top}px`);
  };

  return (
    <Reveal as="article" className={`showcase ${i % 2 ? "is-flipped" : ""}`} aria-labelledby={`t-${p.slug}`}>
      <motion.div
        className="showcase-frame slide-in"
        initial={{ x: i % 2 ? 80 : -80, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1, transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] } }}
        viewport={{ once: true, amount: 0.3 }}
        onClick={() => router.push(to)}
        onMouseMove={glow}
        whileHover={{ y: -6, rotate: i % 2 ? 0.5 : -0.5 }}
        whileTap={{ scale: 0.985 }}
        transition={snappy}
      >
        <BrowserFrame p={p} unveil i={i} />
        <span className="showcase-tag-overlay t-meta" aria-hidden="true">{p.tag}</span>
        <span aria-hidden="true" className="cursor-glow" />
      </motion.div>

      <div className="showcase-body">
        <span className="chip t-meta showcase-tag">{p.tag}</span>
        <div className="showcase-head">
          <motion.h3 layoutId={`title-${p.slug}`} id={`t-${p.slug}`} className="showcase-title">
            {p.name}
          </motion.h3>
          <span className="showcase-num">0{i + 1} / 0{total}</span>
        </div>
        <p className="showcase-blurb">{p.blurb}</p>
        <ul className="dash-list">
          {p.bullets.map((b) => <li key={b}>{b}</li>)}
        </ul>
        <div className="chips">
          {p.stack.map((c) => <span key={c} className="chip chip-mono">{c}</span>)}
        </div>
        <div className="showcase-actions">
          <Link href={to} className="link-underline"><span className="lbl-long">Read the case study</span><span className="lbl-short">Case study</span>&nbsp;→</Link>
          <a href={p.href} target="_blank" rel="noopener noreferrer" className="link-quiet"><span className="lbl-long">View live</span><span className="lbl-short">Live</span>&nbsp;↗</a>
        </div>
      </div>
    </Reveal>
  );
}

export default function SelectedWork() {
  const reduced = useReducedMotion();
  const roomy = useMedia("(min-width: 900px) and (min-height: 640px)");
  const all = (
    <Link href="/projects" className="link-underline" style={{ display: "inline-block", marginTop: "clamp(40px,6vw,72px)" }}>
      See all projects →
    </Link>
  );

  // Big screens: pinned envelopes. Phones, short screens and reduced motion: the list.
  if (roomy && !reduced) {
    return (
      <section id="work" className="env-section" aria-label="Selected work">
        <EnvelopeWork projects={HOME_PROJECTS} />
        <div className="env-after"><Reveal>{all}</Reveal></div>
      </section>
    );
  }

  return (
    <section id="work" className="section">
      <Reveal className="section-head">
        <h2 className="t-h2" style={{ margin: 0 }}>Selected work</h2>
        <p>Three live products. Each one opens into its case study.</p>
      </Reveal>
      <div className="showcases">
        {HOME_PROJECTS.map((p, i) => <Showcase key={p.slug} p={p} i={i} total={HOME_PROJECTS.length} />)}
      </div>
      <Reveal>{all}</Reveal>
    </section>
  );
}
