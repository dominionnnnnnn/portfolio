"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * The hero stays in place while the About section slides up over it like a card.
 * Works at any screen size: if the hero is taller than the screen, it scrolls until its
 * bottom is in view, then holds (negative sticky top) while About covers it.
 * Underneath, the hero shrinks a touch and darkens.
 */
export default function CoverStack({ hero, children }) {
  const ref = useRef(null);
  const pinRef = useRef(null);
  const reduced = useReducedMotion();
  const [top, setTop] = useState(0);

  useEffect(() => {
    const el = pinRef.current;
    if (!el) return;
    const measure = () => setTop(Math.min(0, window.innerHeight - el.offsetHeight));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scale = useTransform(scrollYProgress, [0.05, 1], [1, 0.92]);
  const dim = useTransform(scrollYProgress, [0.05, 0.95], [0, 0.7]);
  const pin = !reduced;

  return (
    <div ref={ref} className={`cover-stack ${pin ? "is-pinned" : ""}`}>
      <motion.div ref={pinRef} className="cover-pin" style={pin ? { scale, top } : undefined}>
        {hero}
        {pin && <motion.div aria-hidden="true" className="cover-dim" style={{ opacity: dim }} />}
      </motion.div>
      <div className="cover-next">{children}</div>
    </div>
  );
}
