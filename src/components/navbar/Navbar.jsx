import { Link, NavLink, useLocation } from 'react-router-dom';
import Checkbox from './Checkbox';
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
  const checkboxRef = useRef(null); // Reference to the checkbox
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  // Only the homepage has a hero for the navbar to blend into at scrollY 0 —
  // every other route stays in the solid/blurred state at all times.
  const scrolled = !isHome || scrolledPastThreshold;

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
  }, [isMenuVisible]); // ✅ Re-run when menu state changes
  
  const closeMenu = () => {
    setIsMenuVisible(false);
    
    // ✅ Ensure the checkbox is "clicked" only when the menu is open
    if (checkboxRef.current && checkboxRef.current.checked) {
      checkboxRef.current.click();
    }
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
      className="navbar flex px-6 lg:px-12 py-5 justify-between items-center sticky top-0 z-50"
      style={{
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
        color: 'var(--text-primary)',
      }}
    >
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2 group">
          <span
            className="w-2 h-2 rounded-sm transition-transform duration-300 group-hover:rotate-45"
            style={{ background: 'var(--accent)' }}
            aria-hidden="true"
          ></span>
          <span className="font-bold text-lg tracking-tight">DOMSTACK</span>
        </Link>

        <div
          className={`nav-links flex items-center md:gap-8 font-medium ${
            isMenuVisible ? "show" : ""
          }`}
        >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `nav-link${isActive ? ' active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}
        </div>

        <div className='flex items-center gap-3'>
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark / light mode"
            className='w-9 h-9 flex items-center justify-center rounded-full border transition-colors duration-200 cursor-pointer'
            style={{ borderColor: 'var(--border-default)', color: 'var(--text-primary)' }}
          >
            {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
          <Button />
          <Checkbox setIsMenuVisible={setIsMenuVisible} checkboxRef={checkboxRef} />
        </div>
    </nav>
  )
}

export default Navbar