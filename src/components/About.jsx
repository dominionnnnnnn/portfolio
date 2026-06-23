import React from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { FaArrowRight } from "react-icons/fa6";
import TerminalWidget from "./TerminalWidget";

const TECH = ["React", "Django", "GraphQL", "Supabase", "PostgreSQL"];

export default function About() {
  const { ref: termRef,  inView: termVisible  } = useInView({ triggerOnce: false, threshold: 0.15 });
  const { ref: textRef,  inView: textVisible  } = useInView({ triggerOnce: false, threshold: 0.15 });

  return (
    <section className="about-section">
      <div className="about-glow about-glow--left"  aria-hidden="true" />
      <div className="about-glow about-glow--right" aria-hidden="true" />

      <div className="relative z-1 lg:px-14 px-6 py-16 lg:py-24">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-10">
          <span className="h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
          <span
            className="text-sm font-semibold tracking-[0.2em] uppercase"
            style={{ color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace" }}
          >
            About
          </span>
        </div>

        {/* Two-column: terminal (wider) + text (leaner) */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* Terminal — the focal element */}
          <div
            ref={termRef}
            className={`w-full lg:w-[58%] about-terminal ${termVisible ? "show" : ""}`}
          >
            <TerminalWidget />
          </div>

          {/* Text column */}
          <div
            ref={textRef}
            className={`w-full lg:w-[42%] flex flex-col justify-center about-text ${textVisible ? "show" : ""}`}
          >
            <h2
              className="text-3xl lg:text-4xl font-semibold leading-tight mb-5"
              style={{ color: "var(--text-primary)" }}
            >
              Hi, I'm{" "}
              <span style={{ color: "var(--accent)" }}>Dominion</span>
            </h2>
            <p
              className="text-sm mb-1"
              style={{ color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}
            >
              Adebiyi Abdulquawiy
            </p>

            <p
              className="text-base lg:text-lg leading-relaxed mt-5 mb-6"
              style={{ color: "var(--text-secondary)" }}
            >
              Senior Fullstack Engineer with 2+ years across logistics,
              fintech, and emergency response systems. I collaborate on backend
              architecture, lead frontend builds, and ship full-stack products
              that hold up under real-world conditions.
            </p>

            <p
              className="text-base lg:text-lg leading-relaxed mb-8"
              style={{ color: "var(--text-secondary)" }}
            >
              Open to remote work worldwide — whether that's joining a product
              team, taking on a frontend or fullstack gig, or building
              something from scratch.
            </p>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {TECH.map((t) => (
                <span
                  key={t}
                  className="text-xs font-semibold tracking-wide py-1.5 px-3 rounded-full border"
                  style={{
                    color: "var(--text-secondary)",
                    borderColor: "var(--border-default)",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-4 flex-wrap">
              <Link
                to="/about"
                className="flex items-center gap-2 py-2.5 px-5 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-80"
                style={{ background: "var(--accent)", color: "#fff" }}
              >
                More about me <FaArrowRight size={13} />
              </Link>
              <Link
                to="/contact"
                className="flex items-center gap-2 py-2.5 px-5 rounded-full text-sm font-semibold border transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                style={{ borderColor: "var(--border-default)", color: "var(--text-secondary)" }}
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}