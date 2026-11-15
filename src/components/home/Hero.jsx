import { motion } from "framer-motion";
import Magnetic from "../ui/Magnetic";
import HeroLens from "./HeroLens";
import { SITE } from "../../lib/site";
import { snappy, press, soft } from "../../lib/motion";

// Rendered without an entrance delay so the name and headline are in the first paint.
export default function Hero() {
  const book = SITE.bookCall
    ? { href: SITE.bookCall, target: "_blank", rel: "noopener noreferrer" }
    : { to: "/contact" };

  return (
    <section data-tone="0" className="hero">
      <div>
        <p className="t-meta hero-meta rise" style={{ "--d": "0.1s" }}>
          <span>{SITE.name}</span>
          <span aria-hidden="true" style={{ color: "var(--ink-3)" }}>·</span>
          <span>{SITE.title}</span>
          <span aria-hidden="true" style={{ color: "var(--ink-3)" }}>·</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--ink)" }}>
            <span className="dot-live pulse" />
            Available for projects
          </span>
        </p>
        <h1 className="t-display hero-title rise" style={{ "--d": "0.18s" }}>
          From first click to final query, I build <span style={{ color: "var(--ink-3)" }}>the whole thing.</span>
        </h1>
        <p className="hero-lead rise" style={{ "--d": "0.28s" }}>
          Production-grade web apps, end to end: Django and GraphQL backends through to polished React frontends, for
          international clients and remote teams.
        </p>
        <div className="rise" style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 32, "--d": "0.38s" }}>
          <Magnetic {...book}>Book a call</Magnetic>
          <motion.a href={SITE.cv} download className="btn-secondary" whileHover={{ y: -2 }} whileTap={press} transition={snappy}>
            Download CV <span style={{ color: "var(--ink-3)" }}>↓</span>
          </motion.a>
        </div>
        <div className="hero-links rise" style={{ "--d": "0.46s" }}>
          <a href={SITE.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1, transition: { ...soft, delay: 0.15 } }}>
        <HeroLens />
      </motion.div>
    </section>
  );
}
