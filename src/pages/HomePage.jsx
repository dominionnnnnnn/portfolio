import React from "react";
import HeroSection from "../components/herosection/HeroSection";
import About from "../components/About";
import Services from "../components/Service";
import Projects from "../components/Projects";
import Testimonial from "../components/Testimonial";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <About />
      <Services />
      <div>
        <header className='text-xl tracking-widest text-center mt-6' style={{ color: 'var(--text-muted)' }}>TOP PROJECTS</header>
        <p className='text-6xl font-semibold text-center my-4' style={{ color: 'var(--text-primary)' }}>Portfolio</p>
      </div>
      <Projects count={4} />
      <div>
        <Link
          to="/projects"
          className="float-right mx-20 overflow-hidden group transition-colors duration-300"
          style={{ color: 'var(--text-primary)' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; }}
        >
          See More <FaArrowRight className="inline mx-2 group-hover:scale-x-140 transition-transform duration-300" />
        </Link>
      </div>
      <Testimonial/>
    </div>
  );
};

export default HomePage;