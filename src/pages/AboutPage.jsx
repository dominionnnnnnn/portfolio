import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import portrait from "../assets/portrait.jpg";
import { Reveal } from "../components/ui/Reveal";
import { EXPERIENCE, EDUCATION } from "../data/experience";
import { lagosNow } from "../lib/time";
import { SITE } from "../lib/site";

const Float = ({ label, value, className }) => (
  <motion.div className={`glass about-float ${className}`} whileHover={{ scale: 1.06 }} transition={{ type: "spring", stiffness: 300, damping: 18 }}>
    <div className="t-meta" style={{ fontSize: 10.5, letterSpacing: ".12em", color: "var(--ink-2)" }}>{label}</div>
    <div style={{ marginTop: 7, font: "700 19px/1 var(--font-display)", letterSpacing: "-.02em" }}>{value}</div>
  </motion.div>
);

const Tile = ({ big, mono, children, className = "", style }) => (
  <Reveal className={`tile ${className}`} style={style}>
    {big && <div className="tile-big">{big}</div>}
    {mono && <div className="tile-mono">{mono}</div>}
    <p>{children}</p>
  </Reveal>
);

export default function AboutPage() {
  const [now, setNow] = useState(lagosNow);
  useEffect(() => {
    const id = setInterval(() => setNow(lagosNow()), 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="page">
      <title>About | Abdulquawiy Adebiyi</title>
      <div className="about-top">
        <div className="about-photo">
          <img src={portrait} alt={`Portrait of ${SITE.name}`} width="1000" height="1333" />
          <Float label="Speciality" value="Fullstack" className="float-a" />
          <Float label="Experience" value="2+ Years" className="float-b" />
        </div>
        <div style={{ flex: "1 1 340px", minWidth: 0 }}>
          <p className="t-meta" style={{ margin: 0, color: "var(--ink-3)" }}>{SITE.title} · Nigeria, working remotely</p>
          <h1 className="page-title rise" style={{ overflowWrap: "anywhere", "--d": "0.08s" }}>Abdulquawiy <span style={{ color: "var(--ink-3)" }}>Adebiyi</span></h1>
        </div>
      </div>

      <div className="about-intro">
        <p style={{ fontSize: "clamp(18px,1.6vw,20px)", color: "var(--ink)" }}>
          I'm a fullstack engineer with 2+ years building across logistics, fintech and emergency response. I've worked
          with a backend team on a logistics platform, led the frontend of a P2P crypto trading platform as a freelancer,
          and built RuralAid on my own, including its real-time responder chat and live emergency map.
        </p>
        <p>
          My stack runs React and Tailwind on the frontend, Django and Strawberry GraphQL on the backend, with PostgreSQL
          and Supabase handling data and real-time infrastructure. I care about software that holds up under real
          conditions, not software that only demos well.
        </p>
      </div>

      <h2 className="page-h2">A few specifics</h2>
      <div className="bento">
        <Tile big={now.time}>My local time (WAT). {now.status}</Tile>
        <Tile mono={<>class Incident(models.Model):<br />&nbsp;&nbsp;...</>}>I start from the data model. If the schema is right, the UI mostly writes itself.</Tile>
        <Tile big="3 roles">User, responder, admin. RuralAid, my final-year dissertation, enforces all three with Supabase row-level security.</Tile>
        <Tile big="Sole dev">On the Central Exchange frontend: every screen of a live trading platform, public site to order tracker.</Tile>
        <Tile mono="mutation { createRider }  query { transactions }">My first production GraphQL at Pavilion Technology: rider, transaction and pricing APIs on a logistics platform, built with the backend team.</Tile>
        <Tile big="♞ + AI">Off the clock I play chess. On it, I'm learning automation with AI: getting it to take the daily stress off people.</Tile>
        <Reveal className="tile tile-stack">
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

      <h2 className="page-h2">Experience &amp; education</h2>
      <ul className="xp-list">
        {EXPERIENCE.map((j) => (
          <Reveal as="li" key={j.org + j.mark} className="xp-row">
            <div className="xp-date">{j.date}</div>
            <div style={{ minWidth: 0 }}>
              {j.roles.map((r, n) => (
                <div key={r.title} style={{ fontSize: n ? 17 : 20, fontWeight: 600, color: n ? "var(--ink-2)" : "var(--ink)" }}>
                  {r.title} {r.date && <span className="xp-date" style={{ fontWeight: 400 }}>· {r.date}</span>}
                </div>
              ))}
              <div style={{ marginTop: 2 }}>{j.org} <span style={{ color: "var(--ink-3)" }}>· {j.kind}</span></div>
              <ul className="dash-list" style={{ maxWidth: 680, marginTop: 14 }}>
                {j.points.map((b) => <li key={b} style={{ fontSize: 16 }}>{b}</li>)}
              </ul>
            </div>
          </Reveal>
        ))}
        {EDUCATION.map((e) => (
          <Reveal as="li" key={e.school} className="xp-row">
            <div className="xp-date">{e.date}</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 600 }}>{e.what}</div>
              <div style={{ marginTop: 2 }}>{e.school} <span style={{ color: "var(--ink-3)" }}>· Education</span></div>
              {e.note && <p style={{ margin: "10px 0 0", color: "var(--ink-2)", fontSize: 16 }}>{e.note}</p>}
            </div>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
