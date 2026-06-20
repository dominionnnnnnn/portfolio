import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import img from "../assets/pimg.jpg";
import quote from "../assets/svg/quote.svg";

const About = () => {
  const { ref: headerRef, inView: isHeaderVisible } = useInView({
    threshold: 0.3,
  });

  const { ref: headerTextRef, inView: isHeaderTextVisible } = useInView({
    threshold: 0.3,
  });

  const { ref: bottomTextRef, inView: isBottomTextVisible } = useInView({
    threshold: 0.3,
  });

  const { ref: bottomText2Ref, inView: isBottomText2Visible } = useInView({
    threshold: 0.3,
  });

  const { ref: imgRef, inView: isImgVisible } = useInView({
    threshold: 0.3,
  });

  return (
    <div
      id="about"
      className="scroll-mt-20 scroll-smooth my-3 py-3 px-4 md:px-10 lg:px-17"
    >
      <header
        ref={headerRef}
        className={`md:text-4xl text-3xl tracking-wide my-2 border-t-1 pt-6 font-light about-header ${
          isHeaderVisible ? "show" : ""
        }`}
        style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-default)' }}
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
            className={`text-4xl lg:text-6xl font-bold lg:font-semibold headertext name lg:tracking-wide lg:my-4 leading-14 lg:leading-18 ${
              isHeaderTextVisible ? "show" : ""
            }`}
            style={{ color: 'var(--text-primary)' }}
          >
            Hi, I'm <br className="hidden lg:block" /> Adebiyi <br /> AbdulQuawiy
          </header>

          <div
            ref={bottomTextRef}
            className={`flex gap-6 lg:mt-12 bottomtext ${
              isBottomTextVisible ? "show" : ""
            }`}
          >
            <img src={quote} alt="" className="h-8 hidden md:block" />
            <p
              className="text-xl lg:text-3xl font-light tracking-wide w-[350px] lg:w-[500px] mt-4 lg:mt-8 leading-8 lg:leading-11"
              style={{ color: 'var(--text-secondary)' }}
            >
              I craft{" "}
              <span className="font-medium underline underline-offset-4" style={{ color: 'var(--text-primary)' }}>
                high-performance
              </span>
              , pixel-perfect{" "}
              <span className="font-medium semi-bold underline underline-offset-4" style={{ color: 'var(--text-primary)' }}>
                responsive
              </span>{" "}
              web applications that are both visually stunning and incredibly{" "}
              <span className="font-medium semi-bold underline underline-offset-4" style={{ color: 'var(--text-primary)' }}>
                user-friendly
              </span>
            </p>
          </div>
        </div>
      </div>

      <div
        ref={bottomText2Ref}
        className={`px-1 my-4 lg:my-10 bottomtext2 ${
          isBottomText2Visible ? "show" : ""
        }`}
      >
        <h1 className="text-xl lg:text-5xl font-semibold lg:w-[80vw]" style={{ color: 'var(--text-muted)' }}>
          <span style={{ color: 'var(--text-primary)' }}>
            Crafting seamless experiences through clean code and smart design
          </span>
          , built to perform flawlessly across every platform.
        </h1>

        <div className="flex flex-wrap items-center gap-4 lg:gap-2 mt-6">
          <p className="font-semibold" style={{ color: 'var(--text-muted)' }}>
            <span className="font-semibold" style={{ color: 'var(--accent)' }}>2+</span> Years of
            Experience
          </p>
          <div className="h-[1px] w-[90%] lg:w-35" style={{ background: 'var(--border-default)' }}></div>
          <p className="font-semibold" style={{ color: 'var(--text-muted)' }}>
            <span className="font-semibold" style={{ color: 'var(--accent)' }}>40+</span> Completed
            Projects
          </p>
          <div className="h-[1px] w-[90%] lg:w-35" style={{ background: 'var(--border-default)' }}></div>
          <p className="font-semibold" style={{ color: 'var(--text-muted)' }}>
            <span className="font-semibold" style={{ color: 'var(--accent)' }}>30+</span> Satisfied
            Clients
          </p>
          <div className="h-[1px] w-[90%] lg:w-35" style={{ background: 'var(--border-default)' }}></div>
          <Link
            to="/about"
            className="py-2 px-3 rounded-2xl font-semibold text-sm"
            style={{ background: 'var(--bg-input)', color: 'var(--text-secondary)' }}
          >
            More About me <FaArrowRight className="inline" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;