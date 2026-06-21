import { Link, NavLink, useLocation } from 'react-router-dom';
import MenuToggle from './MenuToggle';
import { useState, useEffect, useRef } from 'react';
import Button from './Button';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [scrolledPastThreshold, setScrolledPastThreshold] = useState(false);
  const menuRef = useRef(null);
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  // Only the homepage has a hero for the navbar to blend into at scrollY 0 —
  // every other route stays in the solid/blurred state at all times.
  // Also force solid whenever the mobile drawer is open: the drawer/overlay
  // start below the navbar (top: var(--navbar-height)), so if the strip
  // itself stays transparent, hero content shows through behind the toggle
  // button and logo while the menu is open.
  const scrolled = !isHome || scrolledPastThreshold || isMenuVisible;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuVisible &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuVisible]);

  const closeMenu = () => {
    setIsMenuVisible(false);
  };

  useEffect(() => {
    if (isMenuVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuVisible]);

  // Two-state navbar: transparent over the hero, solid/blurred once scrolled.
  useEffect(() => {
    const handleScroll = () => {
      setScrolledPastThreshold(window.scrollY > 2);
    };
    handleScroll(); // set initial state in case the page loads mid-scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      ref={menuRef}
      className="navbar relative flex px-6 lg:px-12 py-5 justify-between items-center sticky top-0 z-50"
      style={{ color: 'var(--text-primary)' }}
    >
        {/* Background + blur live on this layer instead of directly on
            <nav>. Reason: `backdrop-filter` (like `filter`) makes the
            element it's set on a containing block for `position: fixed`
            descendants — so .nav-links (fixed, meant to be positioned
            relative to the VIEWPORT for the mobile drawer) was instead
            being positioned/sized relative to <nav>'s own small ~78px box
            whenever <nav> had backdrop-filter applied (i.e. whenever the
            drawer was open, since `scrolled` is forced true while the menu
            is visible). That's what caused the drawer to render as a
            malformed, barely-there box with text floating over the hero
            instead of a proper solid panel. This div sits behind the
            navbar's actual content (z-index 0) and carries the blur/bg
            instead, so <nav> itself stays filter-free and .nav-links keeps
            the viewport as its containing block, exactly like every other
            `position: fixed` element on the page. */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            background: scrolled ? 'var(--nav-bg)' : 'transparent',
            backdropFilter: scrolled ? 'blur(12px)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
            borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
            transition: 'background-color 0.35s ease, backdrop-filter 0.35s ease, border-color 0.35s ease',
          }}
        />
        <Link to="/" onClick={closeMenu} className="relative flex items-center gap-2 group" style={{ zIndex: 1 }}>
          <span
            className="w-2 h-2 rounded-sm transition-transform duration-300 group-hover:rotate-45"
            style={{ background: 'var(--accent)' }}
            aria-hidden="true"
          ></span>
          <span className="font-bold text-lg tracking-tight">DOMSTACK</span>
        </Link>

        <div
          className={`nav-overlay ${isMenuVisible ? 'show' : ''}`}
          onClick={closeMenu}
          aria-hidden="true"
        />
        {/* Absolutely centered relative to <nav> rather than just being the
            middle child of a `justify-between` row. With justify-between,
            a middle child's horizontal position depends entirely on the
            combined widths of the children on either side of it — it isn't
            centered in the navbar at all. The right-side group (theme
            toggle + "Get in touch" button) is visibly wider than the
            left-side logo, so the links were landing closer to true center
            of the *remaining* space, which reads as skewed right relative
            to the navbar as a whole. This only applies above the mobile
            breakpoint — on mobile .nav-links switches to the fixed-drawer
            layout via the media query, which overrides position entirely. */}
        <div
          className={`nav-links md:absolute md:left-1/2 md:-translate-x-1/2 relative flex items-center md:gap-8 font-medium ${
            isMenuVisible ? "show" : ""
          }`}
          style={{ zIndex: 1 }}
        >
            {NAV_LINKS.map((link, i) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={closeMenu}
                style={{ '--link-index': i }}
                className={({ isActive }) =>
                  `nav-link${isActive ? ' active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}
        </div>

        <div className='relative flex items-center gap-3' style={{ zIndex: 1 }}>
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark / light mode"
            className='w-9 h-9 flex items-center justify-center rounded-full border transition-colors duration-200 cursor-pointer'
            style={{ borderColor: 'var(--border-default)', color: 'var(--text-primary)' }}
          >
            {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
          <Button />
          <MenuToggle
            isOpen={isMenuVisible}
            onToggle={() => setIsMenuVisible((prev) => !prev)}
          />
        </div>
    </nav>
  )
}

export default Navbar