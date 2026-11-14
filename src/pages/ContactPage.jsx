import { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { AnimatePresence, motion } from "framer-motion";
import { QuestPicker, QUESTS } from "../components/home/ContactQuest";
import { SITE } from "../lib/site";
import { snappy, soft } from "../lib/motion";

const Field = ({ label, children }) => <label className="field">{label}{children}</label>;

export default function ContactPage() {
  const form = useRef(null);
  const [quest, setQuest] = useState(null);
  const [subject, setSubject] = useState("");
  const [state, setState] = useState("idle"); // idle | sending | sent | error

  const pick = (i) => { setQuest(i); setSubject(QUESTS[i].subject); };

  const submit = async (e) => {
    e.preventDefault();
    setState("sending");
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setState("sent");
    } catch {
      setState("error");
    }
  };

  return (
    <div className="page">
      <title>Contact | Abdulquawiy Adebiyi</title>
      <p className="t-meta" style={{ margin: 0, display: "inline-flex", alignItems: "center", gap: 8, color: "var(--ink-2)" }}>
        <span className="dot-live pulse" />Available for projects · Typical reply within 24 hours
      </p>
      <h1 className="page-title" style={{ textWrap: "balance" }}>Tell me what <span style={{ color: "var(--ink-3)" }}>you're building.</span></h1>

      <div className="contact-grid">
        <div>
          <div style={{ font: "400 13px/1.6 var(--font-mono)", color: "var(--ink-3)" }}>&gt; first, what are you looking for?</div>
          <QuestPicker value={quest} onPick={pick} />
          <motion.p key={quest ?? "none"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ margin: "18px 0 0", color: "var(--ink-2)", minHeight: "3.2em", textWrap: "pretty" }}>
            {quest == null ? "Pick one and I'll fill in the subject for you." : QUESTS[quest].text}
          </motion.p>
          <div className="quest-contact" style={{ marginTop: 22, paddingTop: 22 }}>
            <a href={`mailto:${SITE.email}`} style={{ overflowWrap: "anywhere" }}>{SITE.email}</a>
            <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 18, marginTop: 6, color: "var(--ink-3)" }}>
              <a href={SITE.bookCall} target="_blank" rel="noopener noreferrer">Book a call ↗</a>
              <a href={SITE.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
              <a href={SITE.x} target="_blank" rel="noopener noreferrer">X ↗</a>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>
            </div>
          </div>
        </div>

        <form ref={form} onSubmit={submit} className="post-form">
          <div className="post-bar">POST /messages</div>
          <AnimatePresence mode="wait" initial={false}>
            {state === "sent" ? (
              <motion.div key="sent" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={soft} className="post-sent" role="status">
                <div style={{ color: "var(--ink)" }}>201 Created</div>
                <div>{'{ "delivered": true, "reply_within": "24h" }'}</div>
                <p>Got it. I'll get back to you soon.</p>
              </motion.div>
            ) : (
              <motion.div key="form" exit={{ opacity: 0 }} className="post-fields">
                <div className="field-row">
                  <Field label="Name"><input name="name" required placeholder="Your name" autoComplete="name" /></Field>
                  <Field label="Email"><input name="email" type="email" required placeholder="you@example.com" autoComplete="email" /></Field>
                </div>
                <Field label="Subject">
                  <input name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="What's this about?" />
                </Field>
                <Field label="Message">
                  <textarea name="message" required rows={6} placeholder="The project, the timeline, the budget. Anything helps." />
                </Field>
                {state === "error" && (
                  <p role="alert" style={{ margin: 0, font: "400 13.5px/1.6 var(--font-mono)", color: "var(--accent)" }}>
                    500: that didn't send. Try again, or email {SITE.email}.
                  </p>
                )}
                <motion.button
                  type="submit"
                  className="btn-primary"
                  disabled={state === "sending"}
                  style={{ height: 54, justifyContent: "center", opacity: state === "sending" ? 0.7 : 1 }}
                  whileTap={{ scale: 0.97 }}
                  transition={snappy}
                >
                  {state === "sending" ? "Sending…" : "Send message →"}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
}
