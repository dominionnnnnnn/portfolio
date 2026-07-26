import { useEffect, useRef } from "react";

/**
 * A single circle that trails the mouse anywhere on the site and
 * inverts whatever color is underneath it via mix-blend-mode: difference
 * (the standard technique used on awwwards-style portfolios).
 *
 * - Smoothly lags behind the real cursor (lerp) instead of snapping to it
 * - Grows and shows a label when hovering links/buttons/project cards
 * - Shrinks slightly on click for tactile feedback
 * - Disables itself entirely on touch devices
 */
const CursorFollower = () => {
  const cursorRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const cursor = cursorRef.current;
    const label = labelRef.current;
    if (!cursor) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let posX = mouseX;
    let posY = mouseY;
    let scale = 1;
    let targetScale = 1;
    let rafId;
    let visible = false;
    let interactiveTarget = null;

    const show = () => {
      if (visible) return;
      visible = true;
      cursor.style.opacity = "1";
    };
    const hide = () => {
      visible = false;
      cursor.style.opacity = "0";
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      show();
    };

    const handleMouseDown = () => {
      targetScale = interactiveTarget ? 1.9 : 0.7;
    };
    const handleMouseUp = () => {
      targetScale = interactiveTarget
        ? interactiveTarget.classList.contains("cursor-view")
          ? 3
          : 2.2
        : 1;
    };

    const handleOver = (e) => {
      const el = e.target.closest?.(
        "a, button, input, textarea, select, [role='button'], .cursor-hover, .cursor-view"
      );
      interactiveTarget = el || null;

      if (el) {
        targetScale = el.classList.contains("cursor-view") ? 3 : 2.2;
        cursor.classList.add("cf-cursor--active");
        if (label) {
          label.textContent =
            el.dataset.cursorText || (el.classList.contains("cursor-view") ? "View" : "");
        }
      } else {
        targetScale = 1;
        cursor.classList.remove("cf-cursor--active");
        if (label) label.textContent = "";
      }
    };

    const animate = () => {
      posX += (mouseX - posX) * 0.16;
      posY += (mouseY - posY) * 0.16;
      scale += (targetScale - scale) * 0.2;
      cursor.style.transform = `translate3d(${posX}px, ${posY}px, 0) translate(-50%, -50%) scale(${scale})`;
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
    };
  }, []);

  return (
    <div ref={cursorRef} className="cf-cursor" aria-hidden="true">
      <span ref={labelRef} className="cf-cursor__label" />
    </div>
  );
};

export default CursorFollower;