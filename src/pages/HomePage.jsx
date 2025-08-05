import React from "react";
import HeroSection from "../components/herosection/HeroSection";
import About from "../components/About";
import Services from "../components/Service";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Testimonial from "../components/Testimonial";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <About />
      <Services />
      <Projects />
      <Testimonial/>
      <Contact />
    </div>
  );
};

export default HomePage;
