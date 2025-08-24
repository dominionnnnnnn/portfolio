import React from 'react'
import { useTypewriter, Cursor } from "react-simple-typewriter";
import Button from './Button';
import { FaPhoneAlt } from 'react-icons/fa';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { useInView } from "react-intersection-observer";

const HeroSection = () => {
  const [text] = useTypewriter({
    words: ["Full-stack Developer", "CS Student", "Tech Enthusiast"],
    loop: 0, // Infinite loop
    typeSpeed: 100,
    deleteSpeed: 50,
    delaySpeed: 1000,
  });

  const { ref, inView } = useInView({
    
    threshold: 0.3, // 20% of element should be visible
  });
  // const { isVisible, elementRef } = useIntersectionObserver();

  return (
    <div  ref={ref} className={`flex flex-col items-center py-8 my-8 justify-center hero-text ${inView ? "show" : ""}`}>
        <h1 className={`mt-8 mb-3  text-2xl md:text-4xl lg:text-4xl text-white tracking-wide font-semibold `}>I'm <span className='text-[#00A8E8] font-extrabold'>Dominion</span>, your</h1>
        <h1 className='text-4xl md:text-6xl lg:text-8xl text-white font-bold mb-4 '>{text}<Cursor cursorStyle="|" /></h1>
        <p className='text-gray-300 text-lg tracking-wide w-[400px] leading-relaxed md:w-[600px] text-center'>I help businesses grow online by creating efficient, user-friendly websites that boost engagement and drive sales</p>
        <p className='text-gray-400 text-sm md:text-base mt-2 tracking-wide  md:tracking-widest'>REACT | TAILWIND | JAVASCRIPT | PYTHON | GIT</p>
        <div className='mt-4 flex'>
          <a href="https://calendly.com/adebiyiquawiy2006/30min" className='border-2 border-gray-400 text-white py-2.5  px-4 mx-4 rounded-xl'>Book a Call <FaPhoneAlt className='inline-block mx-1'/></a>
          <Button/>
        </div>
    </div>
  )
}

export default HeroSection
