import React from 'react';
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
        isMenuVisible && // ✅ Only run if the menu is open
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
  

  return (
    <nav ref={menuRef} className='flex px-6 lg:px-12 py-6 lg:py-4 justify-between border-gray items-center sticky top-0 z-4 text-white backdrop-blur-sm bg-[rgba(18,18,18,0.65)]'>
        <h1 className='font-bold text-xl flex flex-col items-center mt-1.5'>
          DOMDEV
        </h1>
        <div
        className={`nav-links flex border border-gray-200 lg:px-4 py-3 rounded-3xl text-white font-semibold items-center lg:gap-8 ${
          isMenuVisible ? "show" : "" }`}>
            <a href="#" onClick={closeMenu} className=''>Home</a>
            <a href="#about" onClick={closeMenu} className=''>About</a>
            <a href="#products" onClick={closeMenu} className=''>Projects</a>
            <a href="#testimonial" onClick={closeMenu} className=''>Contact</a>
        </div>
        <Button />
        <Checkbox setIsMenuVisible={setIsMenuVisible} checkboxRef={checkboxRef} />
    </nav>
  )
}

export default Navbar
