"use client";
import { MotionConfig } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { IntroProvider } from "./IntroContext";
import Nav from "./Nav";
import Footer from "./Footer";
import IntroLoader from "./IntroLoader";
import ChatBubble from "./ChatBubble";
import ScrollProgress from "./ScrollProgress";

export default function SiteShell({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      <IntroProvider>
        <Analytics />
        <ScrollProgress />
        <a href="#main" className="skip-link">Skip to content</a>
        <Nav />
        <main id="main" style={{ position: "relative", zIndex: 1 }}>{children}</main>
        <Footer />
        <ChatBubble />
        <IntroLoader />
      </IntroProvider>
    </MotionConfig>
  );
}
