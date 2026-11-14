import Hero from "../components/home/Hero";
import SelectedWork from "../components/home/SelectedWork";
import WhatIBuild from "../components/home/WhatIBuild";
import AboutHome from "../components/home/AboutHome";
import Experience from "../components/home/Experience";
import Education from "../components/home/Education";
import GitHubHeatmap from "../components/home/GitHubHeatmap";
import Testimonials from "../components/home/Testimonials";
import ContactQuest from "../components/home/ContactQuest";

const HomePage = () => (
  <div>
    <Hero />
    <SelectedWork />
    <WhatIBuild />
    <AboutHome />
    <Experience />
    <Education />
    <GitHubHeatmap />
    <Testimonials />
    <ContactQuest />
  </div>
);

export default HomePage;
