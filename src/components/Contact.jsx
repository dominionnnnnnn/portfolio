import React from "react";
// import heroimage2 from "../assets/Lhero.png";
import { Link, useLocation } from "react-router-dom";
import {
  FaArrowRight,
  FaXTwitter,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaLinkedin,
} from "react-icons/fa6";

const Contact = () => {
  const location = useLocation();

  const isContactPage = location.pathname === "/contact";

  return (
    <div className="px-4 mt-10 lg:px-12">
      {/* header */}
      <div>
        {/* <img src={heroimage2} alt="" className="h-20 rounded-[50%]" /> */}
        <p className="text-lg mt-2 lg:w-168" style={{ color: 'var(--text-secondary)' }}>
          <span className="font-semibold" style={{ color: 'var(--text-primary)' }}> I'm Dominion</span>, a
          fullstack developer with 2+ years of experience building clean,
          high-performing web applications that deliver great user experiences
          and help brands stand out online.
        </p>
      </div>
      {!isContactPage && (
        <div>
          <div className="flex flex-wrap mt-12 items-center gap-6 lg:gap-2">
            <h1 className="text-2xl lg:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Let's Work Together!
            </h1>
            <div className="h-[1px] w-130 md:w-92 lg:w-160" style={{ background: 'var(--border-default)' }}></div>
            <Link
              to="/contact"
              className="py-2 px-3 font-semibold rounded-2xl text-white"
              style={{ background: 'var(--accent-hover)' }}
            >
              Let's Talk <FaArrowRight className="inline" />
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-between my-12 gap-4 lg:gap-2">
            <div className="flex items-center gap-1" style={{ color: 'var(--text-primary)' }}>
              <a href="https://www.linkedin.com/in/aabdulquawiy">
                <FaLinkedin size={20} />
              </a>
              <div className="h-1 w-1 rounded-[50%] mx-1" style={{ background: 'var(--accent-hover)' }}></div>
              <a href="https://x.com/Dominion864414?t=rMocIolMIppTGQZqkzglXA&s=09">
                <FaXTwitter size={20} />
              </a>
              <div className="h-1 w-1 rounded-[50%] mx-1" style={{ background: 'var(--accent-hover)' }}></div>
              <a href="https://wa.me/2348083842079">
                <FaWhatsapp size={20} />
              </a>
            </div>
            <div className="h-[1px] w-88 lg:w-75 md:w-20" style={{ background: 'var(--border-default)' }}></div>
            <a
              href="mailto:aabdulquawiy@gmail.com"
              className="text-sm tracking-wide"
              style={{ color: 'var(--text-primary)' }}
            >
              <FaEnvelope className="inline mx-1" style={{ color: 'var(--accent-hover)' }} />
              aabdulquawiy@gmail.com
            </a>
            <div className="h-[1px] w-88 lg:w-75 md:w-20" style={{ background: 'var(--border-default)' }}></div>
            <a
              href=""
              className="text-sm tracking-wide font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              <FaPhone className="inline mx-1" style={{ color: 'var(--accent-hover)' }} />
              +234 8083 8420 79
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;