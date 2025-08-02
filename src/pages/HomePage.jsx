import React from "react";
import HeroSection from "../components/herosection/HeroSection";
import About from "../components/About";
import Services from "../components/Service";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <About />
      <Services />
      <Projects />
      <Contact />
    </div>
  );
};

export default HomePage;
