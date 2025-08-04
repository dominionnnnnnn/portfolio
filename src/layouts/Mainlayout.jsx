import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import ParticleBg from "../components/ParticleBg";
import ScrollToTop from "../components/ScrollToTop";

const Mainlayout = () => {
  return (
    <>
        <ScrollToTop/>
        <ParticleBg />
        <Navbar />
        <Outlet />
        <Footer />
    </>
  )
}

export default Mainlayout

