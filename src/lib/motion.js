// Motion tokens: drop into Framer Motion. Everything respects reduced motion
// via <MotionConfig reducedMotion="user"> in main.jsx.
export const snappy = { type: "spring", stiffness: 420, damping: 28, mass: 0.8 }; // UI: buttons, toggles
export const soft = { type: "spring", stiffness: 170, damping: 24, mass: 1 };      // layout, pages

const ease = [0.2, 0.8, 0.2, 1];
// `custom` (seconds) delays an item; `from` is { x, y } for side entrances.
export const reveal = {
  hidden: (c = {}) => ({ opacity: 0, x: c.x ?? 0, y: c.y ?? 22, rotate: c.r ?? 0, filter: "blur(6px)" }),
  show: (c = {}) => ({
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    filter: "blur(0px)",
    transition: {
      delay: c.d ?? 0,
      x: { duration: 0.9, ease }, y: { duration: 0.8, ease }, rotate: { duration: 0.9, ease },
      opacity: { duration: 0.6, ease: "easeOut" }, filter: { duration: 0.6, ease: "easeOut" },
    },
  }),
};
export const stagger = { show: { transition: { staggerChildren: 0.07 } } };
export const viewport = { once: true, amount: 0.2 };

export const press = { scale: 0.95 }; // use with transition: snappy
export const lift = { y: -2 };        // use with transition: snappy
export const magnet = 0.25;           // × cursor offset on primary CTAs
