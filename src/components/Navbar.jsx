import React from 'react'
import pointer from '../assets/svg/bullseye-cursor.svg'
import circle from '../assets/svg/circle.svg'
const Navbar = () => {
  return (
    <div className='bg-gray/10 backdrop-blur-lg shadow-md w-full flex justify-center '>
      <nav className='flex justify-between items-center px-2 lg:px-12 py-4  text-white w-[90vw]  rounded-b-4xl '>
        <div className="logo">
          <span className='font-bold text-2xl'>DOM<span className='text-primary font-extrabold'>DEV</span></span>
        </div>
        <div className="links lg:border-[1.4px] lg:border-gray-400 p-2 lg:rounded-3xl nav-cont">
          <img src={pointer} alt="" className='h-[32px] hidden lg:inline-block ml-2 mr-8' />
          <div className='inline-block nav-links'>
          <a href="" className='px-4 text-text hover:text-white'>About</a>
          <a href="" className='px-4 text-text hover:text-white'>Projects</a>
          <a href="" className='px-4 text-text hover:text-white'>Contact</a>
          <button className="button inline-block lg:hidden ">Get in touch</button>
          </div>
          <img src={circle} alt="" className='h-[31px] hidden lg:inline-block mr-2 ml-8' />
        </div>
        <button className="button hidden lg:inline-block">Get in touch</button>
        <div className='lg:hidden nav-menu'>
        <input id="checkbox2" type="checkbox"/>
        <label className="toggle toggle2" for="checkbox2">
          <div id="bar4" className="bars"></div>
          <div id="bar5" className="bars"></div>
          <div id="bar6" className="bars"></div>
        </label>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
