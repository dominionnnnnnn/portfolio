"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "../ui/Reveal";
import { soft } from "../../lib/motion";

/**
 * "What I build", as the path one request takes through a product.
 * Left: the layers as big titles; the one in the middle of the screen lights up.
 * Right: a sticky preview that swaps to show that layer at work.
 * Phones: each layer shows its preview inline.
 */
const C = ({ children }) => <span className="wb-c">{children}</span>;
const K = ({ children }) => <span className="wb-k">{children}</span>;

const LAYERS = [
  {
    k: "interface",
    t: "Interfaces people enjoy using",
    d: "React and Next.js frontends wired to their own backends, fast on phones and built to be found on Google.",
    s: ["React", "Next.js", "Tailwind", "TypeScript"],
    href: "/services/web-development",
    preview: (
      <div className="wb-ui">
        <div className="wb-ui-bar"><span /><span /><span /><em>yourbusiness.com</em></div>
        <div className="wb-ui-body">
          <div className="wb-ui-h" />
          <div className="wb-ui-l" style={{ width: "82%" }} />
          <div className="wb-ui-l" style={{ width: "64%" }} />
          <div className="wb-ui-row"><span className="wb-ui-btn">Book now</span><span className="wb-ui-ghost">WhatsApp</span></div>
          <div className="wb-ui-cards"><span /><span /><span /></div>
        </div>
      </div>
    ),
  },
  {
    k: "api",
    t: "APIs that hold the logic",
    d: "GraphQL and REST with clean layers: auth, roles, pricing and orders, built in Django and Strawberry.",
    s: ["Django", "DRF", "Strawberry GraphQL"],
    href: "/services/backend-api-development",
    preview: (
      <pre className="wb-code">
        <C># orders/schema.py</C>{"\n"}
        <K>@strawberry.mutation</K>{"\n"}
        <K>def</K> create_order(self, info, input: OrderInput) -&gt; Order:{"\n"}
        {"    "}user = info.context.user{"\n"}
        {"    "}price = quote(input.pickup, input.dropoff){"\n"}
        {"    "}<K>return</K> Order.objects.create({"\n"}
        {"        "}customer=user, total=price, **input.dict()){"\n"}
      </pre>
    ),
  },
  {
    k: "data",
    t: "Data that stays fast",
    d: "PostgreSQL schemas, row-level security and indexes designed before the first screen, so nothing slows down as you grow.",
    s: ["PostgreSQL", "Supabase", "Firestore"],
    href: "/services/database-design",
    preview: (
      <pre className="wb-code">
        <C>-- who can see what, enforced by the database</C>{"\n"}
        <K>create policy</K> "staff read own branch"{"\n"}
        {"  "}<K>on</K> orders <K>for select</K>{"\n"}
        {"  "}<K>using</K> (branch_id = auth.branch());{"\n\n"}
        <K>create index</K> orders_open_idx{"\n"}
        {"  "}<K>on</K> orders (branch_id, status);{"\n"}
      </pre>
    ),
  },
  {
    k: "real-time",
    t: "Things that update live",
    d: "Chat, tracking and dashboards that change the moment something happens, like RuralAid's responder chat and live map.",
    s: ["Supabase channels", "WebSockets"],
    href: "/projects/ruralaid",
    preview: (
      <div className="wb-chat">
        <div className="wb-bub in">Responder assigned 🚑</div>
        <div className="wb-bub in">ETA 6 minutes</div>
        <div className="wb-bub out">Gate is open, we're waiting</div>
        <div className="wb-live"><span className="dot-live pulse" /> live · synced 0.2s ago</div>
      </div>
    ),
  },
  {
    k: "automation",
    t: "AI that does the busywork",
    d: "Agents, chatbots and workflows that answer, sort, extract and report, so your team spends time on real work.",
    s: ["Python", "Claude API", "OpenAI API", "n8n"],
    href: "/services/ai-automation",
    preview: (
      <div className="wb-log">
        <div><span className="wb-ok">✓</span> 14 new emails read</div>
        <div><span className="wb-ok">✓</span> 9 invoices extracted → sheet</div>
        <div><span className="wb-ok">✓</span> 3 customer replies drafted</div>
        <div><span className="wb-wait">●</span> 1 refund held for approval</div>
        <div className="wb-log-foot">agent · ran 2 min ago · saved ~2h</div>
      </div>
    ),
  },
  {
    k: "deploy",
    t: "Shipped and kept running",
    d: "Docker, CI/CD and Vercel deployments managed end to end, with a clean handover when it's live.",
    s: ["Docker", "Vercel", "CI/CD"],
    href: "/services/fullstack-development",
    preview: (
      <div className="wb-log">
        <div><span className="wb-ok">✓</span> tests passed (128)</div>
        <div><span className="wb-ok">✓</span> image built · 41MB</div>
        <div><span className="wb-ok">✓</span> migrations applied</div>
        <div><span className="wb-ok">✓</span> deployed to production</div>
        <div className="wb-log-foot">main · 3f9c2e1 · live on yourdomain.com</div>
      </div>
    ),
  },
];

export default function WhatIBuild() {
  const [active, setActive] = useState(0);
  const items = useRef([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(Number(e.target.dataset.i))),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    items.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const L = LAYERS[active];

  return (
    <section data-surface="dusk" id="build" className="section band-cut wb">
      <Reveal className="section-head" style={{ marginBottom: "clamp(32px, 5vw, 56px)" }}>
        <h2 className="t-h2" style={{ margin: 0 }}>What I build</h2>
        <p>Top to bottom, it&apos;s the path one request takes through a product. I work on every stop. <Link href="/services" className="inline-link">See services →</Link></p>
      </Reveal>

      <div className="wb-grid">
        <ol className="wb-list">
          {LAYERS.map((l, i) => (
            <li
              key={l.k}
              ref={(el) => (items.current[i] = el)}
              data-i={i}
              className={`wb-item ${i === active ? "is-active" : ""}`}
              onMouseEnter={() => setActive(i)}
            >
              <span className="wb-num t-meta">0{i + 1} · {l.k}</span>
              <h3 className="wb-title">{l.t}</h3>
              <div className="wb-more">
                <p>{l.d}</p>
                <div className="chips" style={{ marginTop: 12 }}>
                  {l.s.map((s) => <span key={s} className="chip chip-mono">{s}</span>)}
                </div>
                <Link href={l.href} className="link-underline" style={{ marginTop: 8 }}>Learn more →</Link>
                <div className="wb-inline">{l.preview}</div>
              </div>
            </li>
          ))}
        </ol>

        <div className="wb-stage" aria-hidden="true">
          <div className="wb-panel">
            <div className="wb-panel-bar">
              <span className="t-meta">{L.k}</span>
              <span className="wb-steps">{LAYERS.map((_, i) => <span key={i} className={i <= active ? "on" : ""} />)}</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={L.k}
                className="wb-panel-body"
                initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)", transition: soft }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)", transition: { duration: 0.18 } }}
              >
                {L.preview}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
