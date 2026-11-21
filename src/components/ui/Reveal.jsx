"use client";
import { motion } from "framer-motion";
import { reveal, stagger, viewport } from "../../lib/motion";

/** Section reveal: short y-offset + opacity, runs once at ~20% visibility. */
export function Reveal({ as = "div", children, delay = 0, from, ...rest }) {
  const M = motion[as];
  return (
    <M variants={reveal} custom={{ d: delay, ...from }} initial="hidden" whileInView="show" viewport={viewport} {...rest}>
      {children}
    </M>
  );
}

/** Staggers direct <Reveal> children (pass `inherit` children variants). */
export function Stagger({ as = "div", children, ...rest }) {
  const M = motion[as];
  return (
    <M variants={stagger} initial="hidden" whileInView="show" viewport={viewport} {...rest}>
      {children}
    </M>
  );
}

export const RevealItem = ({ as = "div", children, ...rest }) => {
  const M = motion[as];
  return <M variants={reveal} {...rest}>{children}</M>;
};
