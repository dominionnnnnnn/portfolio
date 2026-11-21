"use client";
import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { EXPERIENCE } from "../../data/experience";
import useMedia from "../../hooks/useMedia";
import { soft } from "../../lib/motion";

/**
 * "Where I've worked" as a road. The section pins (≥860px) for about one
 * screen per stop; an accent node rides the line with the date beside it,
 * the passed line fills in, each card rises as the node arrives and the
 * previous one slides up and dims. Phones: no pin, node follows scroll.
 * Reduced motion: static timeline, everything visible.
 */
const clamp = (v) => Math.max(0, Math.min(1, v));
const node = { stiffness: 170, damping: 24, mass: 1 };

function Card({ j }) {
  return (
    <>
      <div className="exp-date">{j.date}</div>
      {j.roles.length === 1 ? (
        <div className="exp-role">{j.roles[0].title}</div>
      ) : (
        <ol className="exp-ladder">
          {j.roles.map((r) => (
            <li key={r.title}>
              <span className="exp-role">{r.title}</span>
              <span className="exp-date">{r.date}</span>
            </li>
          ))}
        </ol>
      )}
      <div style={{ marginTop: 2 }}>
        {j.org} <span style={{ color: "var(--ink-3)" }}>· {j.kind}</span>
      </div>
      <ul className="dash-list exp-points">
        {j.points.map((b) => <li key={b}>{b}</li>)}
      </ul>
    </>
  );
}

export default function Experience() {
  const N = EXPERIENCE.length;
  const reduced = useReducedMotion();
  const wide = useMedia("(min-width: 860px)");
  const pin = wide && !reduced;

  const outer = useRef(null);
  const track = useRef(null);
  const col = useRef(null);
  const cards = useRef([]);

  const [active, setActive] = useState(0);
  const [shift, setShift] = useState(0);
  const [seen, setSeen] = useState(() => new Set([0]));

  const yRaw = useMotionValue(0);
  const fRaw = useMotionValue(reduced ? 1 : 0);
  const nodeY = useSpring(yRaw, node);
  const fill = useSpring(fRaw, node);

  useLayoutEffect(() => {
    if (reduced) { fRaw.set(1); return; }
    let raf = 0;
    const paint = () => {
      raf = 0;
      const vh = window.innerHeight;
      const t = track.current;
      if (!t || !outer.current) return;
      let f, act = 0;
      if (pin) {
        const r = outer.current.getBoundingClientRect();
        f = clamp(clamp(-r.top / (r.height - vh)) / 0.85);
        act = Math.min(N - 1, Math.floor(f * (N - 1) + 0.08));
        const ac = cards.current[act];
        const prev = cards.current[act - 1];
        const colH = col.current?.clientHeight ?? vh;
        if (ac) setShift(-Math.max(0, prev ? prev.offsetTop : 0, ac.offsetTop + ac.offsetHeight - colH));
      } else {
        const tr = t.getBoundingClientRect();
        f = clamp((vh * 0.5 - tr.top) / tr.height);
        cards.current.forEach((c, i) => {
          if (!c) return;
          const top = c.getBoundingClientRect().top;
          if (top < vh * 0.88) setSeen((s) => (s.has(i) ? s : new Set(s).add(i)));
          if (top < vh * 0.55) act = i;
        });
        setShift(0);
      }
      setActive(act);
      fRaw.set(f);
      yRaw.set(f * Math.max(0, t.offsetHeight - 14));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(paint); };
    paint();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [pin, reduced, N, fRaw, yRaw]);

  const cardAnim = (i) => {
    if (reduced) return { opacity: 1, y: 0 };
    if (pin) return i < active ? { opacity: 0.3, y: 0 } : i === active ? { opacity: 1, y: 0 } : { opacity: 0, y: 64 };
    return seen.has(i) ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 };
  };

  return (
    <section id="experience" className="section exp" aria-labelledby="exp-title">
      <div ref={outer} style={pin ? { height: `${N * 90 + 40}vh` } : undefined}>
        <div className={pin ? "exp-pinned" : undefined}>
          <div className="exp-head">
            <h2 id="exp-title" className="t-h2" style={{ margin: 0 }}>Where I've worked</h2>
            <div className="exp-counter" aria-hidden="true">
              <span>{reduced ? `${N} stops` : `0${active + 1} / 0${N}`}</span>
              {pin && active < N - 1 && <span style={{ color: "var(--ink-3)" }}>· scroll to continue</span>}
            </div>
          </div>

          <div className="exp-grid">
            <div ref={track} className="exp-track" aria-hidden="true">
              <div className="exp-line" />
              <motion.div className="exp-fill" style={{ scaleY: fill }} />
              {!reduced && (
                <motion.div className="exp-node" style={{ y: nodeY }}>
                  <span className="exp-dot" />
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={EXPERIENCE[active].mark}
                      className="exp-mark"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={soft}
                    >
                      {EXPERIENCE[active].mark}
                    </motion.span>
                  </AnimatePresence>
                </motion.div>
              )}
            </div>

            <div ref={col} className="exp-col">
              <motion.ol className="exp-list" animate={{ y: shift }} transition={soft}>
                {EXPERIENCE.map((j, i) => (
                  <motion.li
                    key={j.org + j.mark}
                    ref={(el) => (cards.current[i] = el)}
                    className="exp-card"
                    initial={false}
                    animate={cardAnim(i)}
                    transition={soft}
                    aria-current={pin && i === active ? "step" : undefined}
                  >
                    <Card j={j} />
                  </motion.li>
                ))}
              </motion.ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
