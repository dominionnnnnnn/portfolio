import React from 'react'
import pointer from '../../assets/svg/bullseye-cursor.svg'
import circle from '../../assets/svg/circle.svg'
import Checkbox from './Checkbox'
import Button from './Button'
import { useState, useEffect, useRef } from 'react';

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
    <div className='bg-gray/10 backdrop-blur-lg shadow-md w-full flex justify-center '>
      <nav className='flex justify-between items-center px-2 lg:px-12 py-4  text-white w-[90vw]  rounded-b-4xl '>
        <div className="logo">
          <span className='font-bold text-2xl'>DOM<span className='text-primary font-extrabold'>DEV</span></span>
        </div>
        <div className={`links lg:border-[1.4px] lg:border-gray-400 p-2 lg:rounded-3xl nav-cont `}>
          <img src={pointer} alt="" className='h-[32px] hidden lg:inline-block ml-2 mr-8' />
          <div className={`inline-block nav-links ${isMenuVisible ? "show" : ""}`}>
          <a href="" className='px-4 text-text hover:text-white'>About</a>
          <a href="" className='px-4 text-text hover:text-white'>Projects</a>
          <a href="" className='px-4 text-text hover:text-white'>Contact</a>
          <button className="button inline-block lg:hidden ">Get in touch</button>
          </div>
          <img src={circle} alt="" className='h-[31px] hidden lg:inline-block mr-2 ml-8' />
        </div>
        <Button/>
        <div className='lg:hidden nav-menu'>
        <Checkbox setIsMenuVisible={setIsMenuVisible} checkboxRef={checkboxRef} />
        </div>
      </nav>
    </div>
  )
}

export default Navbar
