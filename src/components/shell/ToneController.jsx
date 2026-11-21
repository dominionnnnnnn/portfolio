"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Picks the tone of whatever section sits in the middle of the screen and puts it on
 * <html data-tone>. The colour tokens are animatable (@property in tokens.css), so the
 * whole page eases from one mood to the next as you scroll. When markers nest, the
 * innermost one wins; with nothing marked, the page stays on its last tone.
 */
export default function ToneController() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    const pick = () => {
      raf = 0;
      const y = window.innerHeight * 0.5;
      let tone = null;
      for (const el of document.querySelectorAll("[data-section-tone]")) {
        const r = el.getBoundingClientRect();
        if (r.top <= y && r.bottom >= y) tone = el.dataset.sectionTone; // later (inner) markers override
      }
      if (tone && root.dataset.tone !== tone) root.dataset.tone = tone;
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(pick); };
    root.dataset.tone = "night";
    pick();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    const t = setTimeout(pick, 400); // after the page transition settles
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [pathname]);
  return null;
}
