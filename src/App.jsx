import ParticleBg from "./components/ParticleBg"
import Navbar from "./components//navbar/Navbar"
import HeroSection from "./components/herosection/HeroSection"
import About from "./components/About"
import Services from "./components/Service"
import Projects from "./components/Projects"
import Contact from "./components/Contact"
import Footer from "./components/Footer"

function App() {

  return (
    <>
      <ParticleBg />
      <Navbar/>
      <HeroSection/>
      <About/>
      <Services/>
      <Projects />
      <Contact/>
      <Footer/>
    </>
  )
}

export default App
