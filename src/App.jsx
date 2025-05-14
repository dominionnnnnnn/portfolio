import ParticleBg from "./components/ParticleBg"
import Navbar from "./components//navbar/Navbar"
import HeroSection from "./components/herosection/HeroSection"
import About from "./components/About"
import Services from "./components/Service"
import Projects from "./components/Projects"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import Loader from "./components/Loader"
import LoaderWrapper from "./components/LoaderWrapper"

function App() {

  return (
    <>
    <LoaderWrapper>
      <ParticleBg />
      <Navbar/>
      <HeroSection/>
      <About/>
      <Services/>
      <Projects />
      <Contact/>
      <Footer/>
    </LoaderWrapper>
    </>
  )
}

export default App
