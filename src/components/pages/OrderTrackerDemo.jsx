"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { snappy, soft } from "../../lib/motion";

// Mirrors the Central Exchange tracker idea: every label comes from one status value.
const STEPS = [
  { key: "matched", label: "Merchant matched" },
  { key: "payment_confirmed", label: "Payment confirmed" },
  { key: "released", label: "Crypto released" },
  { key: "completed", label: "Completed" },
];

export default function OrderTrackerDemo() {
  const [i, setI] = useState(1);
  const status = STEPS[i].key;
  return (
    <figure style={{ margin: "36px 0 0" }}>
      <div className="demo-card">
        <div className="demo-bar">
          <span>inline demo · order tracker</span>
          <span>status: "{status}"</span>
        </div>
        <div style={{ padding: "20px 18px", display: "grid", gap: 8, fontSize: 15.5, lineHeight: 1.4 }}>
          {STEPS.map((s, n) => {
            const state = n < i || (n === i && i === STEPS.length - 1) ? "done" : n === i ? "now" : "next";
            return (
              <motion.div key={s.key} layout transition={soft} className="demo-step" data-state={state}>
                <span>{s.label}</span>
                <span>{state === "done" ? "done" : state === "now" ? "in progress" : "waiting"}</span>
              </motion.div>
            );
          })}
          <motion.button
            type="button"
            className="btn-primary"
            style={{ justifySelf: "start", marginTop: 8, padding: "12px 20px" }}
            onClick={() => setI((n) => (n + 1) % STEPS.length)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={snappy}
          >
            {i === STEPS.length - 1 ? "Reset order" : "Advance order →"}
          </motion.button>
        </div>
      </div>
      <figcaption style={{ margin: "12px 0 0", font: "400 12.5px/1.6 var(--font-mono)", color: "var(--ink-3)" }}>
        Every label above is derived from one status value. Step it and nothing can disagree.
      </figcaption>
    </figure>
  );
}
