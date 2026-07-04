import React from "react";
import { useInView } from "react-intersection-observer";
import HeroSection from "../components/herosection/HeroSection";
import About from "../components/About";
import Services from "../components/Service";
import Projects from "../components/Projects";
import Testimonial from "../components/Testimonial";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

const ProjectsHeader = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });
  return (
    <div ref={ref} className={`projects-section-header s-card ${inView ? "show" : ""}`}>
      <div className="flex items-center gap-2 mb-4">
        <span className="h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
        <span
          className="text-sm font-semibold tracking-[0.2em] uppercase"
          style={{ color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace" }}
        >
          Selected Work
        </span>
      </div>
      <div className="flex flex-wrap items-end gap-4 lg:gap-6">
        <h2
          className="text-4xl md:text-5xl font-semibold tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Projects
        </h2>
        <div
          className="h-[2px] flex-1 min-w-[60px] max-w-[480px] mb-2"
          style={{
            background:
              "linear-gradient(to right, rgba(var(--accent-rgb),0.5), var(--border-default) 40%, transparent)",
          }}
        />
      </div>
      <p className="mt-3 text-lg" style={{ color: "var(--text-muted)" }}>
        Live products — built end to end.
      </p>
    </div>
  );
};

const HomePage = () => {
  return (
    <div>
      <HeroSection />

      {/* One shared container for About, Services, Projects, Testimonial */}
      <div style={{ position: "relative", zIndex: 1, background: "var(--bg-page)", overflowX: "clip" }}>
        <About />
        <Services />

        {/* Projects */}
        <div className="lg:px-14 px-6 pt-16 pb-4">
          <ProjectsHeader />
        </div>
        <div className="lg:px-14 px-6">
          <Projects count={3} featured={true} />
        </div>
        <div className="lg:px-14 px-6 pb-16 mt-8 flex justify-end">
          <Link to="/projects" className="projects-see-more group">
            See all projects
            <FaArrowRight
              size={13}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Testimonial */}
        <Testimonial />
      </div>
    </div>
  );
};

export default HomePage;