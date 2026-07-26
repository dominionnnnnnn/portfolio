import { useEffect, useRef } from "react";

/**
 * A gooey, magnetic, inverting cursor.
 *
 * - A chain of blurred "metaballs" (SVG goo filter) melt into one liquid
 *   blob that trails the mouse, then mix-blend-mode: difference inverts
 *   whatever color is underneath it.
 * - Hovering a link/button/.cursor-magnetic element pulls both the blob
 *   AND the element itself toward the pointer (magnetic effect).
 * - Hovering a .cursor-view element (project previews) spins up a
 *   rotating text ring ("VIEW • VIEW • ...") around the blob.
 * - Fully disables itself on touch devices; native cursor only hidden
 *   on fine-pointer (mouse) devices.
 */

const METABALL_COUNT = 6;
const BASE_SIZES = [22, 18, 15, 12, 9, 6]; // head -> tail
const MAGNET_SELECTOR = "a, button, [role='button'], .cursor-magnetic, .cursor-view";
const MAGNET_STRENGTH = 0.35;
const MAGNET_MAX = 18;

const CursorFollower = () => {
  const blobWrapRef = useRef(null);
  const metaballRefs = useRef([]);
  const ringRef = useRef(null);
  const textPathRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const blobWrap = blobWrapRef.current;
    const ring = ringRef.current;
    const textPath = textPathRef.current;
    if (!blobWrap || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let visible = false;

    // chain of trailing positions, each easing toward the one before it
    const positions = Array.from({ length: METABALL_COUNT }, () => ({ x: mouseX, y: mouseY }));
    let scale = 1;
    let targetScale = 1;
    let ringScale = 0;
    let ringTargetScale = 0;

    let magnetEl = null;
    let rafId;

    const show = () => {
      if (visible) return;
      visible = true;
      blobWrap.style.opacity = "1";
    };
    const hide = () => {
      visible = false;
      blobWrap.style.opacity = "0";
      ringTargetScale = 0;
      releaseMagnet();
    };

    const releaseMagnet = () => {
      if (magnetEl) {
        magnetEl.style.transition = "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)";
        magnetEl.style.transform = "";
        magnetEl = null;
      }
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      show();

      if (magnetEl) {
        const rect = magnetEl.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = Math.max(-MAGNET_MAX, Math.min(MAGNET_MAX, (mouseX - cx) * MAGNET_STRENGTH));
        const dy = Math.max(-MAGNET_MAX, Math.min(MAGNET_MAX, (mouseY - cy) * MAGNET_STRENGTH));
        magnetEl.style.transition = "transform 0.15s ease-out";
        magnetEl.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      }
    };

    const handleOver = (e) => {
      const el = e.target.closest?.(MAGNET_SELECTOR);
      if (el === magnetEl) return;

      releaseMagnet();

      if (el) {
        magnetEl = el;
        const isView = el.classList.contains("cursor-view");
        targetScale = isView ? 2.6 : 2;
        ringTargetScale = 1;
        if (textPath) {
          const label = el.dataset.cursorText || (isView ? "View" : "Click");
          textPath.textContent = `${label} \u2022 `.repeat(6);
        }
      } else {
        targetScale = 1;
        ringTargetScale = 0;
      }
    };

    const handleMouseDown = () => {
      targetScale *= 0.85;
    };
    const handleMouseUp = () => {
      targetScale = magnetEl ? (magnetEl.classList.contains("cursor-view") ? 2.6 : 2) : 1;
    };

    const animate = () => {
      // head chases the mouse (or the magnet target's center, blended in)
      let aimX = mouseX;
      let aimY = mouseY;
      if (magnetEl) {
        const rect = magnetEl.getBoundingClientRect();
        aimX = mouseX * 0.5 + (rect.left + rect.width / 2) * 0.5;
        aimY = mouseY * 0.5 + (rect.top + rect.height / 2) * 0.5;
      }

      positions[0].x += (aimX - positions[0].x) * 0.28;
      positions[0].y += (aimY - positions[0].y) * 0.28;
      for (let i = 1; i < positions.length; i++) {
        positions[i].x += (positions[i - 1].x - positions[i].x) * 0.32;
        positions[i].y += (positions[i - 1].y - positions[i].y) * 0.32;
      }

      scale += (targetScale - scale) * 0.2;
      ringScale += (ringTargetScale - ringScale) * 0.18;

      positions.forEach((p, i) => {
        const el = metaballRefs.current[i];
        if (!el) return;
        const s = i === 0 ? scale : scale * (1 - i * 0.06);
        el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%) scale(${Math.max(s, 0.3)})`;
      });

      ring.style.transform = `translate3d(${positions[0].x}px, ${positions[0].y}px, 0) translate(-50%, -50%) scale(${ringScale})`;
      ring.style.opacity = String(ringScale > 0.02 ? Math.min(ringScale, 1) : 0);

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", hide);
    window.addEventListener("mouseenter", show);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", hide);
      window.removeEventListener("mouseenter", show);
      cancelAnimationFrame(rafId);
      releaseMagnet();
    };
  }, []);

  return (
    <>
      {/* SVG goo filter definition — zero-size, never rendered visually */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <filter id="cf-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="cf-blur" />
            <feColorMatrix
              in="cf-blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
            />
          </filter>
          <path id="cf-ring-path" d="M 50,50 m -34,0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0" />
        </defs>
      </svg>

      {/* Gooey blob: chain of metaballs merged by the filter above */}
      <div ref={blobWrapRef} className="cf-blob-wrap">
        {BASE_SIZES.map((size, i) => (
          <div
            key={i}
            ref={(el) => (metaballRefs.current[i] = el)}
            className="cf-metaball"
            style={{ width: size, height: size }}
          />
        ))}
      </div>

      {/* Rotating text ring shown on hover */}
      <svg ref={ringRef} className="cf-ring" viewBox="0 0 100 100" aria-hidden="true">
        <text className="cf-ring-text">
          <textPath ref={textPathRef} href="#cf-ring-path" startOffset="0%">
            View •
          </textPath>
        </text>
      </svg>
    </>
  );
};

export default CursorFollower;