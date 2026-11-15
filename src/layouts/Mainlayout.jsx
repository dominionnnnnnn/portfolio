import { useEffect, useRef, useState } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import Nav from "../components/shell/Nav";
import Footer from "../components/shell/Footer";
import IntroLoader from "../components/shell/IntroLoader";
import ChatBubble from "../components/shell/ChatBubble";
import ScrollProgress from "../components/shell/ScrollProgress";
import { soft } from "../lib/motion";

// Freeze the outlet so the exiting page keeps rendering its own content.
function FrozenOutlet() {
  const outlet = useOutlet();
  const [frozen] = useState(outlet);
  return frozen;
}

const scrollToHash = (hash, smooth) => {
  const el = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!el) return false;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: smooth && !reduced ? "smooth" : "instant" });
  return true;
};

export default function Mainlayout() {
  const location = useLocation();
  const prevPath = useRef(location.pathname);

  // Same page + hash (e.g. "Experience" while on home): scroll right away.
  useEffect(() => {
    if (prevPath.current === location.pathname && location.hash) scrollToHash(location.hash, true);
    prevPath.current = location.pathname;
  }, [location.key]); // eslint-disable-line react-hooks/exhaustive-deps

  // New page: once the old one has left, reset scroll (or jump to the hash).
  const onExitComplete = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (location.hash) setTimeout(() => scrollToHash(location.hash, false), 60);
  };

  return (
    <>
      <Analytics />
      <ScrollProgress />
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav />
      <main id="main" style={{ position: "relative", zIndex: 1 }}>
        <AnimatePresence mode="wait" onExitComplete={onExitComplete}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0, transition: soft }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.18, ease: "easeIn" } }}
          >
            <FrozenOutlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <ChatBubble />
      <IntroLoader />
    </>
  );
}
