"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Covers a project screenshot with a card that splits open as it scrolls toward the
 * middle of the screen: two panels slide apart (alternating direction per item)
 * and the image underneath eases from slightly zoomed to rest.
 */
export default function Unveil({ children, label, tag, i = 0, className = "" }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 95%", "center 55%"] });
  const open = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);
  const vertical = i % 2 === 1;
  const a = useTransform(open, [0, 1], ["0%", "-101%"]);
  const b = useTransform(open, [0, 1], ["0%", "101%"]);
  const imgScale = useTransform(open, [0, 1], [1.12, 1]);
  const labelOpacity = useTransform(open, [0, 0.35], [1, 0]);

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <div ref={ref} className={`unveil ${className}`}>
      <motion.div className="unveil-media" style={{ scale: imgScale }}>{children}</motion.div>
      <motion.div className="unveil-door unveil-a" data-dir={vertical ? "v" : "h"} style={vertical ? { y: a } : { x: a }} aria-hidden="true" />
      <motion.div className="unveil-door unveil-b" data-dir={vertical ? "v" : "h"} style={vertical ? { y: b } : { x: b }} aria-hidden="true" />
      {label && (
        <motion.div className="unveil-label" style={{ opacity: labelOpacity }} aria-hidden="true">
          {tag && <span className="t-meta">{tag}</span>}
          <span className="unveil-name">{label}</span>
        </motion.div>
      )}
    </div>
  );
}
