"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Reveal } from "../ui/Reveal";
import { soft } from "../../lib/motion";

const QUOTES = [
  { name: "Olasheu B.", role: "Graphic Designer", text: "You really delivered beyond expectations. The website was clean, professional, and done with zero stress. No long talk, just smooth and timely execution from start to finish." },
  { name: "Jimmy O.", role: "E-commerce Merchant", text: "From the first conversation to the final result, everything was on point. Clear communication, fast turnaround, and a very polished outcome. The attention to detail really stood out." },
  { name: "Pelumi A.", role: "Real Estate Founder", text: "Absolutely impressed. You brought the vision to life with zero hassle. Clean design, smooth process, and timely updates. The final result was even better than I imagined." },
];

const initials = (n) => n.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
const Stars = () => <span className="chat-stars" aria-label="5 out of 5">★★★★★</span>;

/**
 * Reviews arrive like messages in a chat: typing dots, then the bubble.
 * Starts when the phone scrolls into view; reduced motion shows them all at once.
 */
export default function Testimonials() {
  const phone = useRef(null);
  const screen = useRef(null);
  const inView = useInView(phone, { once: true, amount: 0.45 });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (reduced) { setShown(QUOTES.length); return; }
    if (!inView || shown >= QUOTES.length) return;
    setTyping(true);
    const t = setTimeout(() => { setTyping(false); setShown((s) => s + 1); }, shown === 0 ? 900 : 1500);
    return () => clearTimeout(t);
  }, [inView, shown, reduced]);

  useEffect(() => {
    const el = screen.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduced ? "auto" : "smooth" });
  }, [shown, typing, reduced]);

  return (
    <div className="band-cut" data-surface="light">
      <section id="quotes" className="section quotes" aria-labelledby="quotes-title">
        <Reveal className="quotes-copy">
          <p className="t-meta" style={{ margin: 0, color: "var(--ink-3)" }}>What clients say</p>
          <h2 id="quotes-title" className="t-h2" style={{ margin: "14px 0 0" }}>
            Straight from <span style={{ color: "var(--ink-3)" }}>the chat.</span>
          </h2>
          <p style={{ margin: "20px 0 0", color: "var(--ink-2)", maxWidth: 420 }}>
            A few messages from people I&apos;ve built for. Clear updates, fast turnaround, and a result that holds up.
          </p>
          <div className="quotes-score">
            <b>5.0</b>
            <span><Stars /> <span style={{ color: "var(--ink-3)" }}>from {QUOTES.length} clients</span></span>
          </div>
        </Reveal>

        <div ref={phone} className="phone" role="group" aria-label="Client messages">
          <div className="phone-notch" aria-hidden="true" />
          <div className="chat-head">
            <span className="chat-avatars" aria-hidden="true">
              {QUOTES.map((q) => <span key={q.name}>{initials(q.name)}</span>)}
            </span>
            <span>
              <b>Happy clients</b>
              <small>{QUOTES.length} reviews · <Stars /></small>
            </span>
          </div>
          <div ref={screen} className="chat-screen">
            {QUOTES.map((q, n) => (
              <AnimatePresence key={q.name}>
                {n < shown && (
                  <motion.figure
                    className="chat-msg"
                    initial={reduced ? false : { opacity: 0, y: 14, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1, transition: soft }}
                  >
                    <span className="chat-av" aria-hidden="true">{initials(q.name)}</span>
                    <div>
                      <blockquote className="chat-bubble">{q.text}</blockquote>
                      <figcaption className="chat-by"><b>{q.name}</b> · {q.role} <Stars /></figcaption>
                    </div>
                  </motion.figure>
                )}
              </AnimatePresence>
            ))}
            {/* Text stays in the HTML for search engines and screen readers until the bubbles play. */}
            {shown === 0 && !typing && (
              <div className="sr-only">
                {QUOTES.map((q) => <p key={q.name}>{q.text} — {q.name}, {q.role}</p>)}
              </div>
            )}
            <AnimatePresence>
              {typing && (
                <motion.div className="chat-typing" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} aria-hidden="true">
                  <span /><span /><span />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link href="/contact" className="chat-input">
            <span>Start your project with me…</span>
            <span className="chat-send" aria-hidden="true">↑</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
