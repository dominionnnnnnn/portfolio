import React from "react";
import img from "../assets/img1.jpg";
import { FaLocationPin, FaArrowRight, FaCode, FaServer, FaWrench } from "react-icons/fa6";
import { Link } from "react-router-dom";

const SKILL_GROUPS = [
  {
    label: "Frontend",
    icon: FaCode,
    skills: ["HTML", "CSS", "JavaScript", "React JS", "Tailwind CSS", "Vite"],
  },
  {
    label: "Backend",
    icon: FaServer,
    skills: ["Python", "Django", "Rest API", "GraphQL", "Strawberry GraphQL", "PostgreSQL", "Supabase"],
  },
  {
    label: "Tools & Practices",
    icon: FaWrench,
    skills: ["Git", "Docker", "Agile"],
  },
];

const AboutPage = () => {
  return (
    <div className="about-page-root">

      {/* Glows */}
      <div className="about-page-glow about-page-glow--tl" aria-hidden="true" />
      <div className="about-page-glow about-page-glow--br" aria-hidden="true" />

      <div className="relative z-1 px-6 lg:px-16 pt-12 pb-20">

        {/* ── HERO STRIP ───────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16 mb-16">

          {/* Photo */}
          <div className="about-photo-wrap flex-shrink-0">
            <img
              src={img}
              alt="Dominion"
              className="about-photo"
            />
          </div>

          {/* Identity */}
          <div className="flex flex-col justify-center gap-4 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
              <span className="h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
              <span className="text-sm font-semibold tracking-[0.2em] uppercase"
                style={{ color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace" }}>
                About Me
              </span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold leading-tight"
              style={{ color: "var(--text-primary)" }}>
              Dominion
            </h1>
            <p className="text-sm"
              style={{ color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>
              Adebiyi Abdulquawiy
            </p>

            <p className="text-xl lg:text-2xl font-light mt-1"
              style={{ color: "var(--text-secondary)" }}>
              Senior Fullstack Engineer
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-2 mt-1">
              <FaLocationPin size={13} style={{ color: "var(--accent)" }} />
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                Nigeria &mdash; available for remote work worldwide
              </span>
            </div>

            {/* Quick stat pills */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-4">
              {[
                { value: "2+", label: "Years experience" },
                { value: "React", label: "& Django" },
                { value: "Open", label: "to opportunities" },
              ].map((s) => (
                <div key={s.label} className="px-4 py-2 rounded-xl border"
                  style={{ borderColor: "var(--border-subtle)", background: "var(--bg-surface)" }}>
                  <span className="font-bold text-sm" style={{ color: "var(--accent)" }}>{s.value}</span>
                  <span className="text-sm ml-1" style={{ color: "var(--text-muted)" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── BIO ──────────────────────────────────────────────── */}
        <div className="about-bio-divider mb-10" />

        <div className="grid lg:grid-cols-2 gap-8 mb-16 max-w-5xl">
          <p className="text-base lg:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}>
            I'm a fullstack engineer with 2+ years building across logistics,
            fintech, and emergency response. I've collaborated on backend systems
            for a logistics platform, led frontend development on a P2P crypto
            trading platform as a freelance gig, and independently built{" "}
            <span className="font-semibold" style={{ color: "var(--text-primary)" }}>RuralAid</span>{" "}
            — including its real-time responder chat and live emergency map.
          </p>
          <p className="text-base lg:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}>
            My stack runs React and Tailwind on the frontend, Django and
            Strawberry GraphQL on the backend, with PostgreSQL and Supabase
            handling data and real-time infrastructure. I care about shipping
            software that holds up under real conditions — not just demos well.
          </p>
        </div>

        {/* ── SKILLS ───────────────────────────────────────────── */}
        <div className="about-bio-divider mb-10" />

        <h2 className="text-xl font-bold mb-8" style={{ color: "var(--text-primary)" }}>
          Skills & Stack
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {SKILL_GROUPS.map(({ label, icon: Icon, skills }) => (
            <div key={label}
              className="rounded-xl p-5 border"
              style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}>
              <div className="flex items-center gap-2 mb-4">
                <Icon size={14} style={{ color: "var(--accent)" }} />
                <span className="text-sm font-semibold tracking-wide uppercase"
                  style={{ color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace" }}>
                  {label}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill}
                    className="text-xs font-medium py-1 px-3 rounded-full border"
                    style={{ color: "var(--text-secondary)", borderColor: "var(--border-default)" }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <div className="about-cta-strip rounded-2xl px-8 py-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xl font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
              Let's build something together
            </p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Open to fullstack gigs, product teams, and interesting problems.
            </p>
          </div>
          <Link
            to="/contact"
            className="flex items-center gap-2 py-3 px-6 rounded-full font-semibold text-sm flex-shrink-0 transition-opacity duration-200 hover:opacity-80"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            Get in touch <FaArrowRight size={13} />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;