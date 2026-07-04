import React from "react";
import { useInView } from "react-intersection-observer";
import Projects from "../components/Projects";

const ProjectsPage = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.15 });

  return (
    <div className="projects-page-root">
      <div className="projects-page-glow projects-page-glow--tl" aria-hidden="true" />
      <div className="projects-page-glow projects-page-glow--br" aria-hidden="true" />

      <div className="relative z-1 lg:px-14 px-6 pt-16 pb-10">
        <div
          ref={ref}
          className={`s-card ${inView ? "show" : ""}`}
        >
          <div className="flex items-center gap-2 mb-5">
            <span className="h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
            <span
              className="text-sm font-semibold tracking-[0.2em] uppercase"
              style={{ color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace" }}
            >
              My Work
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-semibold tracking-tight mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Featured Projects
          </h1>
          <p
            className="text-lg max-w-xl"
            style={{ color: "var(--text-muted)" }}
          >
            Live products and production builds — from trading platforms to emergency response systems.
          </p>
        </div>
      </div>

      <div className="relative z-1 lg:px-14 px-6 pb-20">
        <Projects featured={true} />
      </div>
    </div>
  );
};

export default ProjectsPage;