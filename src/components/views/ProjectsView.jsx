"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { PROJECTS } from "@/data/projects";
import { BrowserFrame } from "@/components/home/SelectedWork";
import { snappy, soft } from "@/lib/motion";
import MaskTitle from "@/components/ui/MaskTitle";

const FILTERS = ["All", "Full-stack", "Frontend"];

export default function ProjectsView() {
  const [filter, setFilter] = useState("All");
  const router = useRouter();
  const list = PROJECTS.filter((p) => filter === "All" || p.cat === filter);

  return (
    <div className="page">
      <header className="band-cut band-top" data-surface="light">
      <p className="t-meta" style={{ margin: 0, color: "var(--ink-3)" }}>ls ./projects · {list.length} of {PROJECTS.length}</p>
      <MaskTitle className="page-title">Everything <span style={{ color: "var(--ink-3)" }}>I&apos;ve shipped.</span></MaskTitle>

      <div className="seg" role="tablist" aria-label="Filter projects">
        {FILTERS.map((f) => (
          <button key={f} type="button" role="tab" aria-selected={filter === f} onClick={() => setFilter(f)}>
            {filter === f && <motion.span layoutId="seg-pill" className="seg-pill" transition={soft} />}
            <span style={{ position: "relative" }}>{f}</span>
          </button>
        ))}
      </div>
      </header>

      <motion.div layout className="proj-grid band-cut" data-surface="deep">
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 48, x: i % 2 ? 36 : -36, rotate: i % 2 ? 2 : -2, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, x: 0, rotate: 0, scale: 1, transition: { ...soft, delay: 0.25 + i * 0.08 } }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={soft}
            >
              <motion.div
                className="proj-card"
                role="link"
                tabIndex={0}
                aria-label={`${p.name} case study`}
                onClick={() => router.push(`/projects/${p.slug}`)}
                onKeyDown={(e) => e.key === "Enter" && router.push(`/projects/${p.slug}`)}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.985 }}
                transition={snappy}
              >
                <div className="showcase-frame" style={{ flex: "none" }}>
                  <BrowserFrame p={p} unveil i={i} />
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
