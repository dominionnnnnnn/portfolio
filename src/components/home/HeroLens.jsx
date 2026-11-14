import { useEffect, useRef } from "react";

/**
 * The signature element. On top: what users see (a RuralAid incident alert).
 * Through the lens: what I also build underneath (RLS policy, schema, realtime).
 * The lens drifts on its own until the visitor moves it; reduced motion = still.
 */
const STEPS = [
  { label: "Alert received", state: "done" },
  { label: "Responder assigned", state: "done" },
  { label: "En route", state: "now" },
  { label: "On scene", state: "next" },
];

const C = ({ children }) => <span style={{ color: "#7F8AA3" }}>{children}</span>;

export default function HeroLens() {
  const stage = useRef(null);
  const touched = useRef(false);

  useEffect(() => {
    const el = stage.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf;
    const t0 = performance.now();
    const loop = (t) => {
      if (!touched.current) {
        const s = (t - t0) / 1000;
        el.style.setProperty("--lx", `${46 + 20 * Math.sin(s * 0.5)}%`);
        el.style.setProperty("--ly", `${46 + 20 * Math.sin(s * 0.37 + 1)}%`);
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
  }, []);

  const move = (e) => {
    touched.current = true;
    const b = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--lx", `${e.clientX - b.left}px`);
    e.currentTarget.style.setProperty("--ly", `${e.clientY - b.top}px`);
  };

  return (
    <div>
      <div ref={stage} onPointerMove={move} onPointerDown={move} className="lens-stage">
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
          <pre>
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
    </div>
  );
}
