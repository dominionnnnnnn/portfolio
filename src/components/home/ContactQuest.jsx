import { useState } from "react";
import { motion } from "framer-motion";
import Magnetic from "../ui/Magnetic";
import { SITE } from "../../lib/site";
import { snappy, soft } from "../../lib/motion";

export const QUESTS = [
  { label: "A web app", rec: "call", subject: "A web app", text: "A frontend or fullstack build. The fastest route is a 20-minute call so I can scope it properly." },
  { label: "A backend or API", rec: "email", subject: "A backend or API", text: "Django, GraphQL, Postgres. Email me the spec or the pain point and I'll reply with how I'd approach it." },
  { label: "A full product, start to finish", rec: "call", subject: "A full product", text: "End to end is what I do. Let's talk it through on a call." },
  { label: "Just looking", rec: "wa", subject: "Just saying hi", text: "No pressure. Say hi on WhatsApp, or keep browsing the work." },
];

/** "What are you looking for?" picker. `onPick(quest)` lets /contact prefill its form subject. */
export function QuestPicker({ value, onPick }) {
  return (
    <div className="quest-opts" role="radiogroup" aria-label="What are you looking for?">
      {QUESTS.map((o, i) => (
        <motion.button
          key={o.label}
          type="button"
          role="radio"
          aria-checked={value === i}
          onClick={() => onPick(i)}
          className="quest-opt"
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          transition={snappy}
        >
          <span>{o.label}</span>
          <span style={{ color: "var(--ink-3)" }}>{value === i ? "●" : "→"}</span>
        </motion.button>
      ))}
    </div>
  );
}

export default function ContactQuest() {
  const [pick, setPick] = useState(null);
  const q = pick == null ? null : QUESTS[pick];
  const rec = q ? q.rec : "call";
  const subject = q ? `?subject=${encodeURIComponent(q.subject)}` : "";

  const actions = [
    { id: "call", label: "Book a call", href: SITE.bookCall, external: true },
    { id: "email", label: "Email me", href: `mailto:${SITE.email}${subject}` },
    { id: "wa", label: "WhatsApp", href: SITE.whatsapp, external: true },
  ];

  return (
    <section id="contact" data-tone="7" className="section">
      <motion.div
        className="quest-card"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0, transition: soft }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div>
          <h2 className="quest-title">What are you <span style={{ color: "var(--ink-3)" }}>looking for?</span></h2>
          <QuestPicker value={pick} onPick={setPick} />
        </div>
        <div className="quest-side">
          <div style={{ font: "400 13px/1.6 var(--font-mono)", color: "var(--ink-3)" }}>&gt; {q ? q.label.toLowerCase() : "pick one"}</div>
          <motion.p key={pick ?? "none"} className="quest-text" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={soft}>
            {q ? q.text : "Pick one and I'll point you to the fastest way to reach me."}
          </motion.p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 22 }}>
            {actions.map((a) =>
              a.id === rec ? (
                <Magnetic key={a.id} href={a.href} target={a.external ? "_blank" : undefined} rel={a.external ? "noopener noreferrer" : undefined} style={{ padding: "14px 22px" }}>
                  {a.label}
                </Magnetic>
              ) : (
                <motion.a key={a.id} href={a.href} target={a.external ? "_blank" : undefined} rel={a.external ? "noopener noreferrer" : undefined} className="btn-ghost" whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} transition={snappy}>
                  {a.label}
                </motion.a>
              )
            )}
          </div>
          <div className="quest-contact">
            <a href={`mailto:${SITE.email}`} style={{ overflowWrap: "anywhere" }}>{SITE.email}</a>
            <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 18, marginTop: 6, color: "var(--ink-3)" }}>
              <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
              <a href={SITE.x} target="_blank" rel="noopener noreferrer">X ↗</a>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
