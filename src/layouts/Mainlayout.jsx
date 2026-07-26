import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { Analytics } from "@vercel/analytics/react"
import Contact from "../components/Contact";
import CursorFollower from "../components/CursorFollower";

const Mainlayout = () => {
  return (
    <>
        <CursorFollower />
        <Analytics />
        <ScrollToTop/>
        <Navbar />
        <Outlet />
        <Contact />
        <Footer />
    </>
  )
}

export default Mainlayout