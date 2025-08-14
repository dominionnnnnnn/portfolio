import React from 'react'
import p1 from '../assets/p1.png'
import p2 from '../assets/p4.png'
import p3 from '../assets/p3.png'
import p5 from '../assets/p5.png'

const project = [
  {
    "id": 1,
    "title": "Real Estate Website",
    "details": 'A sleek, responsive template for real estate agencies to showcase properties with filters and high-quality images.',
    "link": 'https://estate-temp.vercel.app/',
    "img": p1
  },
  {
    "id": 2,
    "title": "Currency Converter",
    "details": 'A real-time currency converter using CurrencyAPI, offering quick and seamless exchange rate conversions.',
    "link": 'https://domconverter.vercel.app/',
    "img": p2
  },
  {
    "id": 3,
    "title": "Blog App",
    "details": 'A personal blog sharing my web dev insights, tech trends, tech journey and programming tips with a clean UI.',
    "link": 'https://dominionnnnnnn.github.io/domblog/',
    "img": p3
  },
  {
    "id": 4,
    "title": "Web3 Landing Page",
    "details": 'A decentralized application showcasing the potential of blockchain technology with a user-friendly interface.',
    "link": 'https://web3-six-tau-85.vercel.app/',
    "img": p5
  },
]

const Projects = ({ count }) => {
  return (
    <div id='projects' className='scroll-mt-20 scroll-smooth py-4 mt-4'>
      <header className=' mx-17 text-xl text-gray-500 tracking-widest  text-center  my-2 '>TOP PROJECTS</header>
      <p className='mx-17 text-6xl text-white font-semibold text-center my-4'>Portfolio</p>
      <div className='flex flex-col gap-16  lg:px-16 items-center'>
        {project.slice(0, count).map((item) => (
          <div key={item.id} className='bg-[#1E1E1E] w-[92%]  rounded-3xl project-item'>
            <p className='font-light my-8 text-white mx-8 tracking-widest text-xl'>0{item.id} | Fullstack Developer</p>
            <div className="flex flex-col md:flex-row lg:gap-4">
              <img src={item.img} alt="" className='lg:h-120 h-100 w-91 lg:w-auto rounded-t-4xl' />
              <div className='lg:my-[150px] my-12 mx-auto px-4 lg:px-0'>
                <h1 className='text-white  text-3xl lg:text-4xl font-bold tracking-wide '>{item.title}</h1>
                <p className='text-white  text-lg my-3 font-light name'>{item.details}</p>
                <a href={item.link} className='text-blue-300'>View Live Site</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects
