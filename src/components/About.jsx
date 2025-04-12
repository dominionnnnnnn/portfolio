import React from 'react'
import img from "../assets/pimg.jpg"
import quote from '../assets/svg/quote.svg'

const About = () => {
  return (
    <div id='about'  className='scroll-mt-20 scroll-smooth my-4 py-4 px-4 md:px-10 lg:px-17'>
      <header className='md:text-4xl text-3xl text-gray-300 tracking-wide  my-2 border-t-1 border-gray-500 pt-6 font-light'>About me</header>
      <div className='flex flex-wrap md:flex-nowrap justify-center gap-12 lg:gap-24 mt-4'>
    <div>
      <img src={img} alt="" className='h-120 md:h-100 lg:h-120' />
    </div>
    <div>
      <header className='text-white text-4xl lg:text-6xl font-bold lg:font-semibold name lg:tracking-wide lg:my-4 leading-14 lg:leading-18'>Hi, I'm <br /> Adebiyi <br /> AbdulQuawiy</header>
      <div className='flex gap-6 lg:mt-12'>
      <img src={quote} alt="" className='h-8 hidden md:block '/>
      <p className=' text-gray-300 text-xl lg:text-3xl font-light tracking-wide w-[350px] lg:w-[500px]  mt-4 lg:mt-8 leading-8 lg:leading-11'>
      I craft <span className='font-medium text-white underline underline-offset-4'>high-performance</span>, pixel-perfect <span className='font-medium text-white semi-bold underline underline-offset-4'>responsive</span> web applications that are both visually stunning and incredibly <span className='font-medium  text-white semi-bold underline underline-offset-4'>user-friendly</span>
      </p>
      </div>
    </div>
  </div>
  </div>
  )
}

export default About
