"use client";
import { useEffect, useRef } from "react";
import { animate, motion } from "framer-motion";

/**
 * The signature element. On top: what users see (a RuralAid incident alert).
 * Through the lens: what I also build underneath (RLS policy, schema, realtime).
 * The lens drifts on its own until the visitor moves it; reduced motion = still.
 *
 * Build-in (when `play` turns true): the code layer fills the card and scans in
 * top to bottom (the backend comes first), then irises down into the lens,
 * revealing the UI that was sitting on top all along. The glass ring lands last
 * and the drift starts. --k scales the lens radius: 14 = whole card, 1 = lens.
 */
const BUILD = { scan: 0.35, iris: 1.45, ring: 2.35, drift: 2.9 };
const STEPS = [
  { label: "Alert received", state: "done" },
  { label: "Responder assigned", state: "done" },
  { label: "En route", state: "now" },
  { label: "On scene", state: "next" },
];

const C = ({ children }) => <span style={{ color: "#7F8AA3" }}>{children}</span>;

export default function HeroLens({ play = true, still = false }) {
  const stage = useRef(null);
  const touched = useRef(false);

  // Build sequence
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    if (still) { el.style.setProperty("--k", 1); el.style.setProperty("--ring", 1); el.dataset.built = "1"; return; }
    if (!play) return;
    const a = animate(14, 1, {
      delay: BUILD.iris, duration: 1.05, ease: [0.7, 0, 0.2, 1],
      onUpdate: (v) => el.style.setProperty("--k", v),
    });
    const b = animate(0, 1, {
      delay: BUILD.ring, duration: 0.55, ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (v) => el.style.setProperty("--ring", v),
      onComplete: () => { el.dataset.built = "1"; },
    });
    return () => { a.stop(); b.stop(); };
  }, [play, still]);

  // Drift
  useEffect(() => {
    const el = stage.current;
    if (!el || still || !play || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf;
    const t0 = performance.now() + BUILD.drift * 1000;
    const loop = (t) => {
      if (!touched.current && t > t0) {
        const s = (t - t0) / 1000;
        const r = Math.min(1, s / 1.6); // ease out of the centre
        el.style.setProperty("--lx", `${50 + r * 20 * Math.sin(s * 0.5)}%`);
        el.style.setProperty("--ly", `${50 + r * 18 * Math.sin(s * 0.37)}%`);
      }
      raf = requestAnimationFrame(loop);
    };
    // pause drift while off-screen
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting) raf = requestAnimationFrame(loop);
    });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [play, still]);

  const move = (e) => {
    if (e.currentTarget.dataset.built !== "1") return;
    touched.current = true;
    const b = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--lx", `${e.clientX - b.left}px`);
    e.currentTarget.style.setProperty("--ly", `${e.clientY - b.top}px`);
  };

  return (
    <motion.div
      className="hero-lens"
      initial={still ? false : { opacity: 0, y: 24, scale: 0.97 }}
      animate={play || still ? { opacity: 1, y: 0, scale: 1 } : undefined}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: 0.1 }}
    >
      <div ref={stage} onPointerMove={move} onPointerDown={move} className="lens-stage" style={{ "--k": still ? 1 : 14, "--ring": still ? 1 : 0, "--lx": "50%", "--ly": "50%" }}>
        {/* what users see */}
        <div className="lens-ui">
          <div className="lens-bar">
            <span>ui / IncidentAlert.tsx</span>
            <span className="lens-live"><span className="dot-live" />live</span>
          </div>
          <div>
            <div style={{ fontSize: 14, color: "var(--ink-3)" }}>RuralAid · incident alert</div>
            <div style={{ font: "700 clamp(26px,3.6vw,42px)/1.1 var(--font-display)", letterSpacing: "-.03em" }}>Medical emergency</div>
            <div style={{ marginTop: 6, fontSize: 14.5, color: "var(--ink-2)" }}>Reported 4 min ago · location shared on the live map</div>
          </div>
          <div style={{ height: 6, borderRadius: 9, background: "var(--surface-2)", overflow: "hidden" }}>
            <div style={{ width: "62%", height: "100%", borderRadius: 9, background: "var(--ink)" }} />
          </div>
          <ol className="lens-steps">
            {STEPS.map((s) => (
              <li key={s.label} data-state={s.state}>
                <span>{s.label}</span>
                <span>{s.state === "done" ? "done" : s.state === "now" ? "in progress" : "pending"}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* what runs underneath */}
        <div aria-hidden="true" className="lens-code">
          <pre className={play || still ? "is-scanning" : ""} style={{ "--scan-delay": `${BUILD.scan}s` }}>
<C>-- supabase / policies.sql</C>{`
create policy "responders read assigned incidents"
  on incidents for select
  using ( responder_id = auth.uid() );

`}<C>-- db / incidents</C>{`
create table incidents (
  id uuid primary key, kind text, status text,
  location geography(point),
  responder_id uuid references profiles (id) );
create index incidents_open_idx
  on incidents (responder_id, status);

`}<C>// realtime / useIncident.ts</C>{`
supabase.channel("incident:" + id)
  .on("postgres_changes", { event: "UPDATE",
      schema: "public", table: "incidents" },
    (p) => setStatus(p.new.status))
  .on("broadcast", { event: "chat" }, onMessage)
  .subscribe();

`}<C># general backend work · Django + Strawberry</C>{`
@strawberry.type
class Query:
    @strawberry.field
    def orders(self, info) -> list[OrderType]:
        return Order.objects.for_user(info.context.user)`}
          </pre>
        </div>
        <div aria-hidden="true" className="lens-ring" />
      </div>
      <p className="lens-caption">Move the lens. On top: what users see. Under it: what I also build.</p>
    </motion.div>
  );
}
