import React from 'react'
import Projects from '../components/Projects'

const ProjectsPage = () => {
  return (
    <div className='py-4 mt-4'>
      <header className="lg:mx-17 mx-4  flex flex-col gap-2">
        <h3 className="font-bold" style={{ color: 'var(--accent)' }}>My Work</h3>
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Featured Projects</h1>
        <p className="w-92" style={{ color: 'var(--text-secondary)' }}>
          A showcase of projects that reflect my passion for creating modern,
          user-friendly applications.
        </p>
      </header>
      <Projects count={4}/>   
    </div>
  )
}

export default ProjectsPage