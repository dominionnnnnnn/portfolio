"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Magnetic from "../ui/Magnetic";
import HeroLens from "./HeroLens";
import { useIntro } from "../shell/IntroContext";
import { SITE } from "../../lib/site";
import { snappy, press } from "../../lib/motion";

/**
 * The headline acts out its own sentence:
 *   1. lines rise from behind masks
 *   2. a cursor arrives and clicks "click" (ripple + underline)
 *   3. "query" types itself in mono with a live caret
 * Meanwhile the lens card builds code-first (see HeroLens).
 * Waits for the AA intro to land in the nav. Reduced motion: everything static.
 */
const ease = [0.2, 0.8, 0.2, 1];
const T = { lines: 0.15, click: 1.15, type: 2.0, rest: 2.15 };

const lineV = {
  hidden: { y: "108%" },
  show: (i) => ({ y: "0%", transition: { duration: 0.95, ease, delay: T.lines + i * 0.13 } }),
};
const fadeV = {
  hidden: { opacity: 0, y: 16 },
  show: (d) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease, delay: T.rest + d } }),
};

function Cursor() {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
      <path d="M4 2.5 19 12l-6.6 1.4L9 20z" fill="var(--ink)" stroke="var(--bg)" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function ClickWord({ play, still }) {
  return (
    <span className="click-word">
      click
      {!still && (
        <>
          <motion.span
            className="click-cursor"
            initial={{ opacity: 0, x: "1.6em", y: "0.5em" }}
            animate={play ? { opacity: [0, 1, 1, 1, 0], x: ["1.6em", "0.15em", "0.15em", "0.15em", "0.3em"], y: ["0.5em", "0.05em", "0.05em", "0.05em", "0.2em"], scale: [1, 1, 0.78, 1, 1] } : undefined}
            transition={{ delay: T.click, duration: 1.25, times: [0, 0.42, 0.52, 0.64, 1], ease: "easeInOut" }}
          >
            <Cursor />
          </motion.span>
          <motion.span
            className="click-ripple"
            initial={{ scale: 0, opacity: 0 }}
            animate={play ? { scale: [0.2, 2.6], opacity: [0.55, 0] } : undefined}
            transition={{ delay: T.click + 0.62, duration: 0.75, ease: "easeOut" }}
          />
        </>
      )}
      <motion.span
        className="click-underline"
        initial={still ? false : { scaleX: 0 }}
        animate={play || still ? { scaleX: 1 } : undefined}
        transition={{ delay: T.click + 0.66, duration: 0.6, ease }}
      />
    </span>
  );
}

function QueryWord({ play, still }) {
  return (
    <span className={`query-word ${play && !still ? "is-typing" : ""} ${still ? "is-still" : ""}`} style={{ "--type-delay": `${T.type}s` }}>
      <span className="query-text">query</span>
      <span className="query-caret" aria-hidden="true" />
    </span>
  );
}

export default function Hero() {
  const { loading } = useIntro();
  const reduced = useReducedMotion();
  const play = !loading;
  const still = !!reduced;
  // Masks clip the rising lines; open them afterwards so the cursor and ripple can overflow.
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!play) return;
    const t = setTimeout(() => setOpen(true), (T.lines + 1.2) * 1000);
    return () => clearTimeout(t);
  }, [play]);

  const book = SITE.bookCall ? { href: SITE.bookCall, target: "_blank", rel: "noopener noreferrer" } : { to: "/contact" };
  const anim = (v, custom) =>
    still ? {} : { variants: v, custom, initial: "hidden", animate: play ? "show" : "hidden" };

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div aria-hidden="true" className="hero-bg" />
      <div className="hero-copy">
        <motion.p className="t-meta hero-meta" {...anim(fadeV, 0)}>
          <span>{SITE.name}</span>
          <span aria-hidden="true" style={{ color: "var(--ink-3)" }}>·</span>
          <span>{SITE.title}</span>
          <span aria-hidden="true" style={{ color: "var(--ink-3)" }}>·</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--ink)" }}>
            <span className="dot-live pulse" />
            Available for projects
          </span>
        </motion.p>

        <h1 id="hero-title" className={`t-display hero-title ${open || still ? "masks-open" : ""}`}>
          <span className="line-mask"><motion.span className="line" {...anim(lineV, 0)}>From first <ClickWord play={play} still={still} /></motion.span></span>{" "}
          <span className="line-mask"><motion.span className="line" {...anim(lineV, 1)}>to final <QueryWord play={play} still={still} />,</motion.span></span>{" "}
          <span className="line-mask"><motion.span className="line" {...anim(lineV, 2)}>I build <span style={{ color: "var(--ink-3)" }}>the whole thing.</span></motion.span></span>
        </h1>

        <motion.p className="hero-lead" {...anim(fadeV, 0.1)}>
          I&apos;m a software developer in Abeokuta, Nigeria, building production-grade websites and web apps end to end:
          Django and GraphQL backends through to polished React and Next.js frontends, for businesses in Lagos, across
          Nigeria and remote teams worldwide.
        </motion.p>
        <motion.div {...anim(fadeV, 0.2)} style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 32 }}>
          <Magnetic {...book}>Book a call</Magnetic>
          <motion.a href={SITE.cv} download className="btn-secondary" whileHover={{ y: -2 }} whileTap={press} transition={snappy}>
            Download CV <span style={{ color: "var(--ink-3)" }}>↓</span>
          </motion.a>
        </motion.div>
        <motion.div className="hero-links" {...anim(fadeV, 0.3)}>
          <a href={SITE.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        </motion.div>
      </div>

      <HeroLens play={play} still={still} />
    </section>
  );
}
