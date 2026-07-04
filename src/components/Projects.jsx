import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import { FaArrowUpRightFromSquare, FaGithub, FaCheck, FaCircle } from "react-icons/fa6";

const projects = [
  {
    id: 1,
    title: "Central Exchange",
    role: "Sole Frontend Dev",
    roleType: "freelance",
    summary:
      "Complete frontend for a live crypto trading platform — from the public-facing site through to the full authenticated app experience.",
    highlights: [
      "Full web app: auth flows, P2P merchant matching, sell crypto, purchase credits, and a live order tracker",
      "Public landing experience with market ticker, testimonials, and app download banner",
      "Dark/light/system theme toggle with ThemeContext; fully responsive across all breakpoints",
    ],
    stack: ["React", "Vite", "Tailwind CSS", "Lucide React"],
    link: "https://www.centralexchange.com.ng/",
    github: null,
  },
  {
    id: 2,
    title: "RuralAid",
    role: "Full-Stack Build",
    roleType: "personal",
    summary:
      "Emergency response platform connecting rural communities to responders in real time. Built as a final-year dissertation project.",
    highlights: [
      "Three-role system (user, responder, admin) with Supabase Auth and row-level security",
      "Real-time responder alerts and in-app emergency chat via Supabase subscriptions",
      "Haversine geolocation on a live Leaflet map; full admin approval and onboarding flow",
    ],
    stack: ["React 19", "Supabase", "Leaflet", "Tailwind CSS", "Framer Motion"],
    link: "https://ruralaid.vercel.app/",
    github: null,
  },
  {
    id: 3,
    title: "Real Estate Template",
    role: "Frontend Demo",
    roleType: "demo",
    summary:
      "A polished, responsive property showcase template — filterable listings, high-res imagery, and a clean agency layout.",
    highlights: [
      "Property filter UI with dynamic listing grid",
      "Fully responsive from mobile through widescreen",
      "Clean component architecture ready for CMS integration",
    ],
    stack: ["React", "Tailwind CSS", "JavaScript"],
    link: "https://estate-temp.vercel.app/",
    github: null,
  },
];

const ROLE_STYLES = {
  freelance: { bg: "rgba(0,168,232,0.1)",  color: "var(--accent)",  border: "rgba(0,168,232,0.25)" },
  personal:  { bg: "rgba(40,200,100,0.1)", color: "#28c864",        border: "rgba(40,200,100,0.25)" },
  demo:      { bg: "rgba(0,168,232,0.06)", color: "var(--text-muted)", border: "var(--border-default)" },
};

/* ── Browser chrome mockup wrapping an iframe ── */
function SitePreview({ url, title }) {
  const [blocked, setBlocked] = useState(false);

  return (
    <div className="site-preview-wrap">
      {/* Title bar */}
      <div className="site-preview-bar">
        <span className="site-preview-dot" style={{ background: "#ff5f57" }} />
        <span className="site-preview-dot" style={{ background: "#febc2e" }} />
        <span className="site-preview-dot" style={{ background: "#28c840" }} />
        <span className="site-preview-url">{url.replace(/^https?:\/\//, "")}</span>
      </div>

      {/* iframe / fallback */}
      <div className="site-preview-viewport">
        {blocked ? (
          <div className="site-preview-blocked">
            <FaCircle size={8} style={{ color: "var(--accent)", opacity: 0.6 }} />
            <span>{title}</span>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="site-preview-blocked-link"
            >
              Open site <FaArrowUpRightFromSquare size={10} />
            </a>
          </div>
        ) : (
          <iframe
            src={url}
            title={title}
            className="site-preview-iframe"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms"
            onError={() => setBlocked(true)}
          />
        )}
      </div>
    </div>
  );
}

/* ── Featured card (first project, wide layout) ── */
function FeaturedCard({ project }) {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });
  const roleStyle = ROLE_STYLES[project.roleType];

  return (
    <div ref={ref} className={`project-featured-card s-card ${inView ? "show" : ""}`}>
      {/* Preview pane */}
      <div className="project-featured-preview">
        <SitePreview url={project.link} title={project.title} />
      </div>

      {/* Content pane */}
      <div className="project-featured-content">
        <div className="flex items-center gap-3 mb-4">
          <span
            className="project-role-badge"
            style={{ background: roleStyle.bg, color: roleStyle.color, borderColor: roleStyle.border }}
          >
            {project.role}
          </span>
          <span className="project-index-label">01</span>
        </div>

        <h3 className="project-featured-title">{project.title}</h3>
        <p className="project-summary">{project.summary}</p>

        <ul className="project-highlights">
          {project.highlights.map((h, i) => (
            <li key={i} className="project-highlight-item">
              <FaCheck className="project-highlight-icon" size={11} />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((tech) => (
            <span key={tech} className="project-stack-pill">{tech}</span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-btn-primary"
          >
            View Live <FaArrowUpRightFromSquare size={12} />
          </a>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-btn-ghost"
            >
              <FaGithub size={15} /> Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Grid card (projects 2 & 3) ── */
function GridCard({ project, index }) {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.12 });
  const roleStyle = ROLE_STYLES[project.roleType];
  const num = String(index + 2).padStart(2, "0");

  return (
    <div
      ref={ref}
      className={`project-grid-card s-card ${inView ? "show" : ""}`}
      style={{ animationDelay: `${index * 120}ms` }}
    >
      {/* Preview */}
      <div className="project-grid-preview">
        <SitePreview url={project.link} title={project.title} />
        <span className="project-grid-index">{num}</span>
      </div>

      <div className="project-grid-content">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="project-role-badge"
            style={{ background: roleStyle.bg, color: roleStyle.color, borderColor: roleStyle.border }}
          >
            {project.role}
          </span>
        </div>

        <h3 className="project-grid-title">{project.title}</h3>
        <p className="project-grid-summary">{project.summary}</p>

        <ul className="project-highlights project-highlights--sm mb-4">
          {project.highlights.slice(0, 2).map((h, i) => (
            <li key={i} className="project-highlight-item">
              <FaCheck className="project-highlight-icon" size={10} />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.stack.map((tech) => (
            <span key={tech} className="project-stack-pill project-stack-pill--sm">{tech}</span>
          ))}
        </div>

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="project-btn-primary project-btn-primary--sm"
        >
          View Live <FaArrowUpRightFromSquare size={11} />
        </a>
      </div>
    </div>
  );
}

const Projects = ({ count, featured = true }) => {
  const visible = projects.slice(0, count ?? projects.length);
  const [first, ...rest] = visible;

  return (
    <div id="projects" className="scroll-mt-20">
      {featured && first && <FeaturedCard project={first} />}
      {rest.length > 0 && (
        <div className="projects-grid">
          {(featured ? rest : visible).map((p, i) => (
            <GridCard key={p.id} project={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;