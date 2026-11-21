"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** Grows from slightly inset to full size as it scrolls into view; the image inside drifts for depth. */
export default function ScrollScale({ children, className = "", style }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  return (
    <div style={{ perspective: 1400 }}>
      <motion.div ref={ref} className={className} style={reduced ? style : { ...style, scale, rotateX, y, transformOrigin: "50% 100%" }}>
        {children}
      </motion.div>
    </div>
  );
}
