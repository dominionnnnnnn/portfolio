import { Link } from 'react-router-dom';
import Checkbox from './Checkbox';
import { useState, useEffect, useRef } from 'react';
import Button from './Button';
const Navbar = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuRef = useRef(null);
  const checkboxRef = useRef(null); // Reference to the checkbox

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
  

  return (
    <nav ref={menuRef} className='flex px-6 lg:px-12 py-6 lg:py-4 justify-between lg:border-gray items-center sticky top-0 z-4 text-white md:backdrop-blur-sm bg-[rgba(18,18,18)] md:bg-[rgba(18,18,18,0.65)]'>
        <Link to="/" className='font-bold text-xl flex flex-col items-center mt-1.5'>
          DOMSTACK
        </Link>
        <div
        className={`nav-links flex border border-gray-200 md:px-4 md:py-2   lg:py-3 rounded-3xl text-white font-semibold items-center md:gap-8 ${
          isMenuVisible ? "show" : "" }`}>
            <Link to="/" onClick={closeMenu} className=''>Home</Link>
            <Link to="/about" onClick={closeMenu} className=''>About</Link>
            <Link to="/projects" onClick={closeMenu} className=''>Projects</Link>
            <Link to="/contact" onClick={closeMenu} className=''>Contact</Link>
        </div>
        <Button />
        <Checkbox setIsMenuVisible={setIsMenuVisible} checkboxRef={checkboxRef} />
    </nav>
  )
}

export default Navbar
