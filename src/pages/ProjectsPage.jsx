import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { PROJECTS } from "../data/projects";
import { BrowserFrame } from "../components/home/SelectedWork";
import { snappy, soft } from "../lib/motion";

const FILTERS = ["All", "Full-stack", "Frontend"];

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();
  const list = PROJECTS.filter((p) => filter === "All" || p.cat === filter);

  return (
    <div className="page">
      <title>Projects | Abdulquawiy Adebiyi</title>
      <p className="t-meta" style={{ margin: 0, color: "var(--ink-3)" }}>ls ./projects · {list.length} of {PROJECTS.length}</p>
      <h1 className="page-title">Everything <span style={{ color: "var(--ink-3)" }}>I've shipped.</span></h1>

      <div className="seg" role="tablist" aria-label="Filter projects">
        {FILTERS.map((f) => (
          <button key={f} type="button" role="tab" aria-selected={filter === f} onClick={() => setFilter(f)}>
            {filter === f && <motion.span layoutId="seg-pill" className="seg-pill" transition={soft} />}
            <span style={{ position: "relative" }}>{f}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="proj-grid">
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={soft}
            >
              <motion.div
                className="proj-card"
                role="link"
                tabIndex={0}
                aria-label={`${p.name} case study`}
                onClick={() => navigate(`/projects/${p.slug}`)}
                onKeyDown={(e) => e.key === "Enter" && navigate(`/projects/${p.slug}`)}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.985 }}
                transition={snappy}
              >
                <div className="showcase-frame" style={{ flex: "none" }}>
                  <BrowserFrame p={p} />
                </div>
                <div className="proj-head">
                  <motion.h2 layoutId={`title-${p.slug}`} className="proj-name">{p.name}</motion.h2>
                  <span className="t-meta" style={{ fontSize: 11.5, color: "var(--ink-3)", textAlign: "right" }}>{p.type}</span>
                </div>
                <p style={{ margin: "8px 0 0", color: "var(--ink-2)", fontSize: 16, textWrap: "pretty" }}>{p.blurb}</p>
                <div style={{ marginTop: 10, font: "400 12.5px/1.6 var(--font-mono)", color: "var(--ink-3)" }}>{p.stack.join(" · ")}</div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
