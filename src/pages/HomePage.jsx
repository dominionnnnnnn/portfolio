import React from "react";
import HeroSection from "../components/herosection/HeroSection";
import About from "../components/About";
import Services from "../components/Service";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
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
        <header className=' text-xl text-gray-500 tracking-widest  text-center  mt-6  '>TOP PROJECTS</header>
        <p className='text-6xl text-white font-semibold text-center my-4'>Portfolio</p>
      </div>
      <Projects count={4} />
      <div>
        <Link to="/projects" className="text-white float-right mx-20 overflow-hidden group hover:text-[#00A8E8] transition-colors duration-300">See More <FaArrowRight className="inline mx-2 group-hover:scale-x-140 transition-transform duration-300" /></Link>
      </div>
      <Testimonial/>
    </div>
  );
};

export default HomePage;
