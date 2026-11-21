"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";

/**
 * Selected work as envelopes. The section pins; each project gets one stretch of scroll:
 *   enter  → the envelope rises in, sealed
 *   open   → the flap folds back
 *   out    → the screenshot slides up out of the pocket…
 *   side   → …and settles to one side (alternating), while the envelope moves to the other
 *   exit   → the scene lifts away as the next envelope arrives
 * The project details are printed on the envelope itself.
 */
const SEG = 1.25; // screens of scroll per project

function Scene({ p, i, n, progress }) {
  const local = useTransform(progress, (v) => v * n - i); // 0..1 while this project is active
  const side = i % 2 === 0 ? 1 : -1; // screenshot goes right on even projects, left on odd
  const first = i === 0;
  const last = i === n - 1;

  const sceneY = useTransform(local, [-0.22, 0.02, 0.86, 1.05], [first ? "0%" : "70%", "0%", "0%", last ? "0%" : "-14%"]);
  const sceneOpacity = useTransform(local, [-0.22, -0.06, 0.88, 1.02], [first ? 1 : 0, 1, 1, last ? 1 : 0]);
  const sceneScale = useTransform(local, [0.86, 1.05], [1, last ? 1 : 0.93]);

  const flap = useTransform(local, [0.06, 0.24], [0, 180]);
  const flapZ = useTransform(flap, (r) => (r < 90 ? 6 : 1));
  const sealOpacity = useTransform(local, [0.04, 0.1], [1, 0]);

  const imgY = useTransform(local, [0.22, 0.42, 0.62], ["0%", "-88%", "-34%"]);
  const imgX = useTransform(local, [0.42, 0.62], ["0vw", `${side * 21}vw`]);
  const imgRot = useTransform(local, [0.42, 0.62], [0, side * 2.5]);
  const imgScale = useTransform(local, [0.22, 0.42, 0.62], [0.96, 1, 1.18]);
  const imgZ = useTransform(local, (v) => (v > 0.46 ? 5 : 2));
  const imgOpacity = useTransform(local, [0.16, 0.24], [0, 1]);
  const envX = useTransform(local, [0.42, 0.62], ["0vw", `${side * -17}vw`]);

  return (
    <motion.div className="env-scene" style={{ y: sceneY, opacity: sceneOpacity, scale: sceneScale, zIndex: i + 1 }} aria-hidden={false}>
      <motion.div className="env-layer env-back" style={{ x: envX }} data-surface="light" />
      <motion.div className="env-layer env-flap-wrap" style={{ x: envX, zIndex: flapZ }}>
        <motion.div className="env-flap" style={{ rotateX: flap }} data-surface="light">
          <motion.span className="env-seal" style={{ opacity: sealOpacity }}>AA</motion.span>
        </motion.div>
      </motion.div>
      <motion.div className="env-layer env-shot-wrap" style={{ zIndex: imgZ }}>
        <motion.div className="env-shot" style={{ x: imgX, y: imgY, rotate: imgRot, scale: imgScale, opacity: imgOpacity }}>
          <Link href={`/projects/${p.slug}`} tabIndex={-1} aria-hidden="true">
            <div className="frame-bar"><span /><span /><span /><em>{p.url}</em></div>
            {p.img ? (
              <img src={p.img} alt="" className="frame-shot" style={{ "--focus": p.focus }} loading="lazy" decoding="async" />
            ) : (
              <div className="frame-shot frame-empty"><span className="t-meta">{p.name}</span></div>
            )}
          </Link>
        </motion.div>
      </motion.div>
      <motion.div className="env-layer env-front" style={{ x: envX, zIndex: 3 }} data-surface="light">
        <div className="env-content">
          <div className="env-meta t-meta">
            <span>{p.tag}</span>
            <span>0{i + 1} / 0{n}</span>
          </div>
          <h3 className="env-title">{p.name}</h3>
          <p className="env-blurb">{p.blurb}</p>
          <div className="env-foot">
            <span className="env-stack">{p.stack.slice(0, 4).join(" · ")}</span>
            <span className="env-links">
              <Link href={`/projects/${p.slug}`} className="link-underline">Case study →</Link>
              <a href={p.href} target="_blank" rel="noopener noreferrer" className="link-quiet">Live ↗</a>
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function EnvelopeWork({ projects }) {
  const ref = useRef(null);
  const n = projects.length;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Leave a little runway at both ends so the first envelope can be read before it opens.
  const progress = useTransform(scrollYProgress, [0.04, 0.98], [0, 1]);
  const [active, setActive] = useState(0);
  useMotionValueEvent(progress, "change", (v) => setActive(Math.min(n - 1, Math.max(0, Math.floor(v * n + 0.1)))));
  const bar = useTransform(progress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="env-track" style={{ height: `${n * SEG * 100 + 40}svh` }}>
      <div className="env-stage">
        <div className="env-head">
          <h2 className="t-h2" style={{ margin: 0 }}>Selected work</h2>
          <div className="env-count t-meta">
            <span>{projects[active]?.name}</span>
            <span className="env-bar"><motion.span style={{ scaleX: bar }} /></span>
            <span>0{active + 1} / 0{n}</span>
          </div>
        </div>
        {projects.map((p, i) => <Scene key={p.slug} p={p} i={i} n={n} progress={progress} />)}
      </div>
    </div>
  );
}
