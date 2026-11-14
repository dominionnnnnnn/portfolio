import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { snappy, press } from "../../lib/motion";
import { SITE } from "../../lib/site";

// Collapsed glass bubble. No auto-open, no suggestion popups.
export default function ChatBubble() {
  return (
    <motion.a
      href={SITE.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="glass"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, transition: { ...snappy, delay: 1.4 } }}
      whileHover={{ y: -2, scale: 1.04 }}
      whileTap={press}
      transition={snappy}
      style={{
        position: "fixed", right: "clamp(16px, 3vw, 28px)", bottom: "clamp(16px, 3vw, 28px)", zIndex: 60,
        width: 52, height: 52, borderRadius: "50%", display: "grid", placeItems: "center", color: "var(--ink)",
      }}
    >
      <FaWhatsapp size={22} />
    </motion.a>
  );
}
