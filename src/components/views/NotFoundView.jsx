"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Magnetic from "@/components/ui/Magnetic";
import { snappy, press } from "@/lib/motion";

export default function NotFoundView() {
  const pathname = usePathname();
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "clamp(130px,18vw,200px) var(--gutter) 40px" }}>
      <div style={{ font: "400 13.5px/1.6 var(--font-mono)", color: "var(--ink-3)", overflowWrap: "anywhere" }}>GET {pathname}</div>
      <h1 style={{ margin: "10px 0 0", font: "800 clamp(110px,26vw,280px)/.85 var(--font-display)", letterSpacing: "-.06em" }}>
        4
        <motion.span
          style={{ display: "inline-block", color: "var(--ink-3)", cursor: "default" }}
          initial={{ rotate: 14, y: "0.06em" }}
          whileHover={{ rotate: 374 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
        >
          0
        </motion.span>
        4
      </h1>
      <div style={{ marginTop: 34, borderRadius: 18, background: "var(--surface)", border: "1px solid var(--line)", padding: 20, font: "400 14px/1.9 var(--font-mono)", color: "var(--ink-2)", overflowWrap: "anywhere" }}>
        <div style={{ color: "var(--ink-3)" }}>x-checked-by: abdulquawiy</div>
        <div>{"{"}</div>
        <div style={{ paddingLeft: 20 }}>"status": 404,</div>
        <div style={{ paddingLeft: 20 }}>
          "detail": <span style={{ color: "var(--ink)" }}>"No route matches. I checked the backend too."</span>
        </div>
        <div>{"}"}</div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
        <Magnetic to="/" style={{ padding: "15px 26px" }}>Back home</Magnetic>
        <motion.div whileHover={{ y: -2 }} whileTap={press} transition={snappy}>
          <Link href="/projects" className="btn-secondary">See the work</Link>
        </motion.div>
      </div>
    </div>
  );
}
