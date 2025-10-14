import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import ParticleBg from "../components/ParticleBg";
import ScrollToTop from "../components/ScrollToTop";
import { Analytics } from "@vercel/analytics/react"
import Contact from "../components/Contact";

const Mainlayout = () => {
  return (
    <>
        <Analytics />
        <ScrollToTop/>
        <ParticleBg />
        <Navbar />
        <Outlet />
        <Contact />
        <Footer />
    </>
  )
}

export default Mainlayout

