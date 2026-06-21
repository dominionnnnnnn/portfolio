import React from "react";

// Real <button>, not a hidden checkbox/label hack — correct keyboard,
// focus, and screen-reader behavior for free. Bordered circular hit-area
// matches the theme-toggle button styling so it has its own contrast
// anchor regardless of navbar transparency state. Bars morph to an X using
// --accent (not red — red reads as "error/danger", accent blue reads as
// "active state").
const MenuToggle = ({ isOpen, onToggle }) => {
  return (
    <button
      type="button"
      className="menu-toggle md:hidden"
      aria-expanded={isOpen}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      onClick={onToggle}
      style={{ borderColor: 'var(--border-default)' }}
    >
      <span className="menu-toggle-bar" style={{ background: isOpen ? 'var(--accent)' : 'var(--text-primary)' }} />
      <span className="menu-toggle-bar" style={{ background: isOpen ? 'var(--accent)' : 'var(--text-primary)' }} />
      <span className="menu-toggle-bar" style={{ background: isOpen ? 'var(--accent)' : 'var(--text-primary)' }} />
    </button>
  );
};

export default MenuToggle;