import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useIntro } from "./IntroContext";
import Magnetic from "../ui/Magnetic";
import { snappy, soft, press } from "../../lib/motion";
import { SITE } from "../../lib/site";

export const NAV_LINKS = [
  { label: "Work", to: "/projects", match: (p) => p.startsWith("/projects") },
  { label: "About", to: "/about", match: (p) => p === "/about" },
  { label: "Experience", to: "/#experience", match: (p, h) => p === "/" && h === "#experience" },
  { label: "Contact", to: "/contact", match: (p) => p === "/contact" },
];

function ThemeToggle({ size = 40 }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      whileHover={{ rotate: 180 }}
      whileTap={{ scale: 0.88 }}
      transition={snappy}
      style={{ flex: "0 0 auto", width: size, height: size, borderRadius: "50%", display: "grid", placeItems: "center", color: "var(--ink)" }}
    >
      <motion.span
        animate={{ rotate: theme === "dark" ? 0 : 180 }}
        transition={soft}
        style={{ width: 15, height: 15, borderRadius: "50%", border: "1.5px solid currentColor", background: "linear-gradient(90deg,currentColor 50%,transparent 50%)" }}
      />
    </motion.button>
  );
}

function Burger({ open, onClick }) {
  const line = { position: "absolute", left: 0, right: 0, height: 1.8, borderRadius: 2, background: "currentColor" };
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls="mobile-menu"
      whileTap={{ scale: 0.88 }}
      transition={snappy}
      className="grid min-[860px]:hidden"
      style={{ flex: "0 0 44px", width: 44, height: 44, borderRadius: "50%", placeItems: "center", border: "1px solid var(--line)", background: "var(--glow)", color: "var(--ink)" }}
    >
      <span style={{ position: "relative", width: 18, height: 12, display: "block" }}>
        <motion.span style={{ ...line, top: 0 }} animate={open ? { y: 5, rotate: 45 } : { y: 0, rotate: 0 }} transition={snappy} />
        <motion.span style={{ ...line, bottom: 0 }} animate={open ? { y: -5, rotate: -45 } : { y: 0, rotate: 0 }} transition={snappy} />
      </span>
    </motion.button>
  );
}

export default function Nav() {
  const { pathname, hash } = useLocation();
  const { loading } = useIntro();
  const [hovered, setHovered] = useState(null);
  const [menu, setMenu] = useState(false);

  useEffect(() => setMenu(false), [pathname, hash]);
  useEffect(() => {
    if (!menu) return;
    const onKey = (e) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  const active = NAV_LINKS.findIndex((l) => l.match(pathname, hash));
  const pill = hovered ?? (active >= 0 ? active : null);

  return (
    <>
      <header className="nav-header">
        <nav aria-label="Primary" className="glass nav-pill">
          <Link to="/" aria-label={`${SITE.name}, home`} className="nav-brand">
            <span id="aa-nav-mark" aria-hidden="true" className="aa-mark" style={{ width: 36, height: 36, flex: "0 0 36px", fontSize: 13, opacity: loading ? 0 : 1 }}>
              AA
            </span>
            <span className="nav-wordmark">
              <span>Abdulquawiy</span> <span>Adebiyi</span>
            </span>
          </Link>

          <div className="hidden min-[860px]:flex" style={{ gap: 2, margin: "0 6px" }} onMouseLeave={() => setHovered(null)}>
            {NAV_LINKS.map((l, i) => (
              <NavLink
                key={l.label}
                to={l.to}
                onMouseEnter={() => setHovered(i)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                aria-current={i === active ? "page" : undefined}
                className="aa-nav-link"
                style={{ color: i === active || i === pill ? "var(--ink)" : "var(--ink-2)" }}
              >
                {pill === i && <motion.span layoutId="nav-pill" className="aa-nav-link-pill" transition={soft} />}
                <span style={{ position: "relative" }}>{l.label}</span>
              </NavLink>
            ))}
          </div>

          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}>
            <ThemeToggle />
            <span className="hidden min-[860px]:block">
              <Magnetic to="/contact" style={{ padding: "10px 18px", fontSize: 14.5 }}>
                Get in touch
              </Magnetic>
            </span>
            <Burger open={menu} onClick={() => setMenu((m) => !m)} />
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menu && (
          <>
            <motion.div
              key="scrim"
              className="min-[860px]:hidden"
              onClick={() => setMenu(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: "fixed", inset: 0, zIndex: 48, background: "rgba(3,5,10,.35)" }}
            />
            <motion.div
              key="sheet"
              id="mobile-menu"
              className="glass min-[860px]:hidden"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={soft}
              style={{ position: "fixed", top: 76, left: 14, right: 14, zIndex: 49, padding: 10, borderRadius: 24, display: "flex", flexDirection: "column", gap: 2, transformOrigin: "top center" }}
            >
              {NAV_LINKS.map((l, i) => (
                <motion.div key={l.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0, transition: { ...soft, delay: 0.03 * i } }}>
                  <Link to={l.to} className="menu-link" aria-current={i === active ? "page" : undefined}>
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div whileTap={press} transition={snappy}>
                <Link to="/contact" className="btn-primary" style={{ marginTop: 6, width: "100%", padding: "15px 16px", borderRadius: 16, justifyContent: "center" }}>
                  Get in touch
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
