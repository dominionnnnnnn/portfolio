import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import ParticleBg from "../components/ParticleBg";

const Mainlayout = () => {
  return (
    <>
        <ParticleBg />
        <Navbar />
        <Outlet />
        <Footer />
    </>
  )
}

export default Mainlayout

