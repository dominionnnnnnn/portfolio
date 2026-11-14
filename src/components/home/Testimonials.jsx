import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "../ui/Reveal";
import { snappy, soft, press } from "../../lib/motion";

const QUOTES = [
  { name: "Olasheu B.", role: "Graphic Designer", text: "You really delivered beyond expectations. The website was clean, professional, and done with zero stress. No long talk, just smooth and timely execution from start to finish." },
  { name: "Jimmy O.", role: "E-commerce Merchant", text: "From the first conversation to the final result, everything was on point. Clear communication, fast turnaround, and a very polished outcome. The attention to detail really stood out." },
  { name: "Pelumi A.", role: "Real Estate Founder", text: "Absolutely impressed. You brought the vision to life with zero hassle. Clean design, smooth process, and timely updates. The final result was even better than I imagined." },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const q = QUOTES[i];
  return (
    <section id="quotes" data-tone="6" className="section" aria-labelledby="quotes-title">
      <Reveal as="h2" id="quotes-title" className="t-meta" style={{ margin: 0, color: "var(--ink-3)" }}>What clients say</Reveal>
      <Reveal className="quote-stage">
        <AnimatePresence mode="wait" initial={false}>
          <motion.blockquote
            key={q.name}
            className="quote-text"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: soft }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
            aria-live="polite"
          >
            “{q.text}”
          </motion.blockquote>
        </AnimatePresence>
      </Reveal>
      <Reveal className="quote-tabs" role="tablist" aria-label="Choose a testimonial">
        {QUOTES.map((x, n) => (
          <motion.button
            key={x.name}
            type="button"
            role="tab"
            aria-selected={n === i}
            onClick={() => setI(n)}
            className="quote-tab"
            whileHover={{ y: -2 }}
            whileTap={press}
            transition={snappy}
          >
            <span style={{ fontWeight: 600, fontSize: 15.5 }}>{x.name}</span>
            <span style={{ font: "400 12px/1.5 var(--font-mono)", color: "var(--ink-3)" }}>{x.role}</span>
          </motion.button>
        ))}
      </Reveal>
    </section>
  );
}
