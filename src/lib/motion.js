// Motion tokens: drop into Framer Motion. Everything respects reduced motion
// via <MotionConfig reducedMotion="user"> in main.jsx.
export const snappy = { type: "spring", stiffness: 420, damping: 28, mass: 0.8 }; // UI: buttons, toggles
export const soft = { type: "spring", stiffness: 170, damping: 24, mass: 1 };      // layout, pages

export const reveal = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: soft },
};
export const stagger = { show: { transition: { staggerChildren: 0.07 } } };
export const viewport = { once: true, amount: 0.2 };

export const press = { scale: 0.95 }; // use with transition: snappy
export const lift = { y: -2 };        // use with transition: snappy
export const magnet = 0.25;           // × cursor offset on primary CTAs
