"use client";
import { motion } from "framer-motion";
import { soft } from "@/lib/motion";

// Re-mounts on every navigation: a soft rise for the incoming page.
export default function Template({ children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0, transition: soft }}>
      {children}
    </motion.div>
  );
}
