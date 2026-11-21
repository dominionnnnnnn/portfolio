"use client";
import { useEffect, useRef } from "react";
import { useIntro } from "./IntroContext";

/**
 * AA monogram builds in (scale + de-blur), then flies into the nav mark (#aa-nav-mark).
 * ~1.1s total. Page is already rendered underneath, so first paint shows real content.
 * Reduced motion: 200ms fade.
 */
export default function IntroLoader() {
  const { loading, run, finish } = useIntro();
  const wrap = useRef(null);
  const bg = useRef(null);
  const mark = useRef(null);

  useEffect(() => {
    if (!loading) return;
    if (document.documentElement.dataset.intro === "skip") return;
    const m = mark.current, b = bg.current, w = wrap.current;
    if (!m || !b || !m.animate) return finish();
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer;

    if (reduced) {
      m.style.opacity = 1;
      w.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: "forwards" }).onfinish = finish;
      return;
    }

    m.animate(
      [
        { transform: "scale(.6)", filter: "blur(16px)", opacity: 0 },
        { transform: "scale(1)", filter: "blur(0px)", opacity: 1 },
      ],
      { duration: 440, easing: "cubic-bezier(.3,1.4,.5,1)", fill: "forwards" }
    );

    timer = setTimeout(() => {
      const nav = document.getElementById("aa-nav-mark");
      const a = m.getBoundingClientRect();
      const t = nav ? nav.getBoundingClientRect() : { left: 20, top: 20, width: 36, height: 36 };
      const dx = t.left + t.width / 2 - (a.left + a.width / 2);
      const dy = t.top + t.height / 2 - (a.top + a.height / 2);
      const s = t.width / a.width;
      b.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 480, easing: "ease-out", fill: "forwards" });
      m.animate(
        [
          { transform: "translate(0,0) scale(1)", opacity: 1 },
          { transform: `translate(${dx}px,${dy}px) scale(${s})`, opacity: 1 },
        ],
        { duration: 560, easing: "cubic-bezier(.55,0,.1,1)", fill: "forwards" }
      ).onfinish = finish;
    }, 540);

    return () => clearTimeout(timer);
  }, [loading, run, finish]);

  if (!loading) return null;

  return (
    <div ref={wrap} key={run} aria-hidden="true" className="intro-overlay" style={{ position: "fixed", inset: 0, zIndex: 100, display: "grid", placeItems: "center" }}>
      <div ref={bg} style={{ position: "absolute", inset: 0, background: "var(--bg)" }} />
      <div ref={mark} className="aa-mark" style={{ position: "relative", width: 128, height: 128, fontSize: 46, opacity: 0, boxShadow: "inset 0 1.5px 0 var(--glass-hi), inset 0 -26px 40px var(--glow), 0 24px 60px rgba(0,0,0,.4)" }}>
        AA
      </div>
    </div>
  );
}
