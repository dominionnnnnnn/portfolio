"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import AboutLanyard from "@/components/about/AboutLanyard";
import MaskTitle from "@/components/ui/MaskTitle";
const rise = { hidden: { opacity: 0, y: 20, filter: "blur(6px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] } } };
import { Reveal } from "@/components/ui/Reveal";
import { EXPERIENCE, EDUCATION } from "@/data/experience";
import { lagosNow } from "@/lib/time";
import { SITE, BASED_IN } from "@/lib/site";

const Float = ({ label, value, className }) => (
  <motion.div className={`glass about-float ${className}`} whileHover={{ scale: 1.06 }} transition={{ type: "spring", stiffness: 300, damping: 18 }}>
    <div className="t-meta" style={{ fontSize: 10.5, letterSpacing: ".12em", color: "var(--ink-2)" }}>{label}</div>
    <div style={{ marginTop: 7, font: "700 19px/1 var(--font-display)", letterSpacing: "-.02em" }}>{value}</div>
  </motion.div>
);

const Tile = ({ big, mono, children, className = "", style, i = 0 }) => (
  <Reveal className={`tile ${className}`} style={style} delay={(i % 3) * 0.08} from={{ y: 40, r: i % 2 ? 1.5 : -1.5 }}>
    {big && <div className="tile-big" suppressHydrationWarning>{big}</div>}
    {mono && <div className="tile-mono">{mono}</div>}
    <p>{children}</p>
  </Reveal>
);

export default function AboutView() {
  const reduce = useReducedMotion();
  const [cardReady, setCardReady] = useState(false);
  // Time renders after mount: pages are prerendered at build time, so a server clock would be stale.
  const [now, setNow] = useState({ time: "--:--", status: "" });
  useEffect(() => {
    setNow(lagosNow());
    const id = setInterval(() => setNow(lagosNow()), 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="page">
      <section className="about-hero">
        <AboutLanyard onReady={() => setCardReady(true)} />
        <motion.div
          className="about-hero-copy"
          initial={reduce ? false : "hidden"}
          animate={cardReady || reduce ? "show" : "hidden"}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.55 } } }}
        >
          <motion.p variants={rise} className="t-meta" style={{ margin: 0, color: "var(--ink-3)" }}>
            {SITE.title} · {SITE.altTitle} · {BASED_IN}
          </motion.p>
          <motion.h1 variants={rise} className="page-title" style={{ overflowWrap: "anywhere" }}>
            Abdulquawiy <span style={{ color: "var(--ink-3)" }}>Adebiyi</span>
          </motion.h1>
          <motion.p variants={rise} className="about-hero-lead">
            I&apos;m a software developer in Abeokuta with 2+ years building across logistics, fintech and emergency
            response. I&apos;ve worked with a backend team on a logistics platform, led the frontend of a P2P crypto trading
            platform as a freelancer, and built RuralAid on my own, including its real-time responder chat and live
            emergency map.
          </motion.p>
          <motion.p variants={rise} className="about-hero-sub">
            My stack runs React, Next.js and Tailwind on the frontend, Django and Strawberry GraphQL on the backend, with
            PostgreSQL and Supabase handling data and real-time infrastructure. I care about software that holds up under
            real conditions, not software that only demos well.
          </motion.p>
          <motion.div variants={rise} className="about-stats">
            <Float label="Speciality" value="Fullstack" className="" />
            <Float label="Experience" value="2+ Years" className="" />
            <Float label="Based in" value={SITE.city || "Nigeria"} className="" />
          </motion.div>
        </motion.div>
      </section>

      <div className="band-cut" data-surface="light">
      <MaskTitle as="h2" inView className="page-h2">A few specifics</MaskTitle>
      <div className="bento">
        <Tile i={0} big={now.time}>My local time (WAT). {now.status}</Tile>
        <Tile i={1} mono={<>class Incident(models.Model):<br />&nbsp;&nbsp;...</>}>I start from the data model. If the schema is right, the UI mostly writes itself.</Tile>
        <Tile i={2} big="3 roles">User, responder, admin. RuralAid, my final-year dissertation, enforces all three with Supabase row-level security.</Tile>
        <Tile i={3} big="Sole dev">On the Central Exchange frontend: every screen of a live trading platform, public site to order tracker.</Tile>
        <Tile i={4} mono="mutation { createRider }  query { transactions }">My first production GraphQL at Pavilion Technology: rider, transaction and pricing APIs on a logistics platform, built with the backend team.</Tile>
        <Tile i={5} big="♞ + AI">Off the clock I play chess. On it, I'm learning automation with AI: getting it to take the daily stress off people.</Tile>
        <Reveal className="tile tile-stack" delay={0.12} from={{ y: 40 }}>
          {[
            ["Frontend", "HTML, CSS, JavaScript, TypeScript, React, Next.js, Tailwind CSS, Vite"],
            ["Backend", "Python, Django, DRF, GraphQL, Strawberry GraphQL, PostgreSQL, Supabase, Firebase"],
            ["Tools", "Git, Docker, Vercel, Agile"],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="t-meta" style={{ color: "var(--ink-3)" }}>{k}</div>
              <p style={{ margin: "12px 0 0", fontSize: 18, lineHeight: 1.55, color: "var(--ink)" }}>{v}</p>
            </div>
          ))}
        </Reveal>
      </div>

      </div>
      <div className="band-cut" data-surface="dusk">
      <MaskTitle as="h2" inView className="page-h2">Experience &amp; education</MaskTitle>
      <div className="xp-group t-meta">Experience</div>
      <ol className="xp-list">
        {EXPERIENCE.map((j, i) => (
          <Reveal as="li" key={j.org + j.mark} className={`xp-row ${j.date.includes("Present") ? "is-current" : ""}`} delay={0.04 * (i % 3)} from={{ x: -40, y: 0 }}>
            <div className="xp-when">
              <span className="xp-chip">{j.date}</span>
            </div>
            <div className="xp-main">
              <div className="xp-head">
                <span className="xp-avatar" aria-hidden="true">{j.org.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase()}</span>
                <div>
                  {j.roles.map((r, n) => (
                    <div key={r.title} className={n ? "xp-role xp-role-prev" : "xp-role"}>
                      {r.title}
                      {r.date && <span className="xp-role-date">{r.date}</span>}
                    </div>
                  ))}
                  <div className="xp-org">
                    {j.org}
                    <span className="xp-kind">{j.kind}</span>
                  </div>
                </div>
              </div>
              <ul className="xp-points">
                {j.points.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </div>
          </Reveal>
        ))}
      </ol>

      <div className="xp-group t-meta">Education</div>
      <ol className="xp-list">
        {EDUCATION.map((e) => (
          <Reveal as="li" key={e.school} className="xp-row" from={{ x: -40, y: 0 }}>
            <div className="xp-when"><span className="xp-chip">{e.date}</span></div>
            <div className="xp-main">
              <div className="xp-head">
                <span className="xp-avatar" aria-hidden="true">🎓</span>
                <div>
                  <div className="xp-role">{e.what}</div>
                  <div className="xp-org">{e.school}<span className="xp-kind">Education</span></div>
                </div>
              </div>
              {e.note && <p className="xp-note">{e.note}</p>}
            </div>
          </Reveal>
        ))}
      </ol>
      </div>
    </div>
  );
}
