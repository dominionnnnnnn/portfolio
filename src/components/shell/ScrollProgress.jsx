"use client";
import { motion, useScroll } from "framer-motion";

/** 2px accent bar along the top edge showing how far down the page you are. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 60,
        background: "var(--accent)", transformOrigin: "left", scaleX: scrollYProgress, pointerEvents: "none",
      }}
    />
  );
}
