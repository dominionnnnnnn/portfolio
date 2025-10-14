import React from 'react'
import Projects from '../components/Projects'

const ProjectsPage = () => {
  return (
    <div className='py-4 mt-4'>
      <header className="lg:mx-17 mx-4  flex flex-col gap-2">
        <h3 className="text-[#00A8E8] font-bold">My Work</h3>
        <h1 className="text-white text-3xl font-bold ">Featured Projects</h1>
        <p className="text-[#c5c5c5] w-92 ">
          A showcase of projects that reflect my passion for creating modern,
          user-friendly applications.
        </p>
      </header>
      <Projects count={4}/>   
    </div>
  )
}

export default ProjectsPage
