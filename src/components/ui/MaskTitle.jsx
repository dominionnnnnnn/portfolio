"use client";
import { Children, isValidElement } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Page titles rise word by word from behind masks. Plain strings are split into words;
 * elements (like a muted <span>) move as one piece. Text stays in the HTML for search.
 */
const ease = [0.2, 0.8, 0.2, 1];

function pieces(children) {
  const out = [];
  Children.forEach(children, (c) => {
    if (typeof c === "string") c.split(/(\s+)/).forEach((w) => w && out.push(w));
    else if (isValidElement(c) || typeof c === "number") out.push(c);
  });
  return out;
}

export default function MaskTitle({ as = "h1", children, className = "", delay = 0.05, inView = false, style, ...rest }) {
  const reduced = useReducedMotion();
  const Tag = as;
  let n = 0;
  return (
    <Tag className={`mask-title ${className}`} style={style} {...rest}>
      {pieces(children).map((p, i) => {
        if (typeof p === "string" && /^\s+$/.test(p)) return " ";
        const k = n++;
        return (
          <span key={i} className="mask-word">
            <motion.span
              className="mask-word-in"
              initial={reduced ? false : { y: "110%", rotate: 4 }}
              {...(inView
                ? { whileInView: { y: "0%", rotate: 0 }, viewport: { once: true, amount: 0.6 } }
                : { animate: { y: "0%", rotate: 0 } })}
              transition={{ duration: 0.9, ease, delay: delay + k * 0.06 }}
            >
              {p}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}
