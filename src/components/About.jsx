import React from 'react'
import img from "../assets/pimg.jpg"
import quote2 from '../assets/svg/quote2.svg'
import quote from '../assets/svg/quote.svg'

const About = () => {
  return (
    <div className='flex my-4 py-4 justify-center gap-24'>
      <div>
        <img src={img} alt="" className='h-120' />
      </div>
      <div>
        <header className='text-white text-6xl font-semibold name tracking-wide my-4 leading-18'>Hi, I'm <br /> Adebiyi <br /> AbdulQuawiy</header>
        <div className='flex gap-6 mt-12'>
        <img src={quote} alt="" className='h-8 '/>
        <p className=' text-white text-3xl font-light tracking-wide w-[500px] mt-8 leading-11'>
        I craft <span className='semi-bold underline underline-offset-4'>high-performance</span>, pixel-perfect <span className='semi-bold underline underline-offset-4'>responsive</span> web applications that are both visually stunning and incredibly <span className='semi-bold underline underline-offset-4'>user-friendly</span>
        </p>
        </div>
      </div>
    </div>
  )
}

export default About
