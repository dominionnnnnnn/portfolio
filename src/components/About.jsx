import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import img from "../assets/pimg.jpg";
import quote from "../assets/svg/quote.svg";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

const About = () => {
  const { isVisible: isHeaderVisible, elementRef: headerRef } =
    useIntersectionObserver();
  const { isVisible: isHeaderTextVisible, elementRef: headerTextRef } =
    useIntersectionObserver();
  const { isVisible: isBottomTextVisible, elementRef: bottomTextRef } =
    useIntersectionObserver();
  const { isVisible: isBottomText2Visible, elementRef: bottomText2Ref } =
    useIntersectionObserver();
  const { isVisible: isImgVisible, elementRef: imgRef } =
    useIntersectionObserver();

  return (
    <div
      id="about"
      className="scroll-mt-20 scroll-smooth my-3 py-3 px-4 md:px-10 lg:px-17"
    >
      <header
        ref={headerRef}
        className={`md:text-4xl text-3xl text-gray-300 tracking-wide  my-2 border-t-1 border-gray-500 pt-6 font-light about-header ${
          isHeaderVisible ? "show" : ""
        }`}
      >
        About me
      </header>
      <div className="flex flex-wrap md:flex-nowrap justify-center gap-12 lg:gap-24 mt-4">
        <div>
          <img
            ref={imgRef}
            src={img}
            alt=""
            className={`h-120 md:h-100 lg:h-120 about-img ${
              isImgVisible ? "show" : ""
            }`}
          />
        </div>
        <div>
          <header
            ref={headerTextRef}
            className={`text-white text-4xl lg:text-6xl font-bold lg:font-semibold headertext name lg:tracking-wide lg:my-4 leading-14 lg:leading-18 ${
              isHeaderTextVisible ? "show" : ""
            } `}
          >
            Hi, I'm <br className="hidden lg:block" /> Adebiyi <br />{" "}
            AbdulQuawiy
          </header>
          <div
            ref={bottomTextRef}
            className={`flex gap-6 lg:mt-12 bottomtext ${
              isBottomTextVisible ? "show" : ""
            }`}
          >
            <img src={quote} alt="" className="h-8 hidden md:block " />
            <p className=" text-gray-300 text-xl lg:text-3xl font-light tracking-wide w-[350px] lg:w-[500px]  mt-4 lg:mt-8 leading-8 lg:leading-11">
              I craft{" "}
              <span className="font-medium text-white underline underline-offset-4">
                high-performance
              </span>
              , pixel-perfect{" "}
              <span className="font-medium text-white semi-bold underline underline-offset-4">
                responsive
              </span>{" "}
              web applications that are both visually stunning and incredibly{" "}
              <span className="font-medium  text-white semi-bold underline underline-offset-4">
                user-friendly
              </span>
            </p>
          </div>
        </div>
      </div>
      <div  ref={bottomText2Ref} className={`px-1  my-4  lg:my-10 bottomtext2 ${
              isBottomText2Visible ? "show" : ""
            }`}>
        <h1 className="text-[#8a8a8a] text-xl lg:text-5xl font-semibold lg:w-[80vw]">
          <span className="text-white">
            Crafting seamless experiences through clean code and smart design
          </span>
          , built to perform flawlessly across every platform.
        </h1>

        <div className="flex flex-wrap items-center gap-4 lg:gap-2 mt-6">
          <p className="text-gray-400 font-semibold">
            <span className="font-semibold text-[#00a8e8]">2+</span> Years of
            Experience
          </p>
          <div className="h-[1px] bg-gray-300 w-[90%] lg:w-35"></div>
          <p className="text-gray-400 font-semibold">
            <span className="font-semibold text-[#00a8e8]">40+</span> Completed
            Projects
          </p>
          <div className="h-[1px] bg-gray-300 w-[90%] lg:w-35"></div>
          <p className="text-gray-400 font-semibold">
            <span className="font-semibold text-[#00a8e8]">30+</span> Satisfied
            Clients
          </p>
          <div className="h-[1px] bg-gray-300 w-[90%] lg:w-35"></div>
          <Link
            to="/about"
            className="text-gray-300 py-2 px-3 rounded-2xl bg-[#202020] font-semibold text-sm"
          >
            More About me <FaArrowRight className="inline" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
