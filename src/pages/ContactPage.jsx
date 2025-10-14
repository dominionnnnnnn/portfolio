import React from "react";
import {
  FaLinkedin,
  FaXTwitter,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa6";

import ContactForm from "../components/ContactForm";

const ContactPage = () => {
  return (
    <div className="py-6 px-4 lg:px-8">
      <h1 className="text-5xl text-white mt-10  font-bold">Let's Talk</h1>
      <p className="text-[#c1c1c1] lg:w-115 mt-4">
        Let’s turn your vision into reality from eye-catching web designs to
        digital strategy and marketing assets, I’m here to build what your brand
        needs to stand out.
      </p>
      <div className="flex flex-wrap items-center justify-center my-12 gap-6 lg:gap-2">
        <div className="flex text-white items-center gap-1">
          <a href="https://www.linkedin.com/in/aabdulquawiy">
            <FaLinkedin size={20} />
          </a>
          <div className="h-1 w-1 rounded-[50%] bg-[#00A8E8] mx-1"></div>
          <a href="https://x.com/Dominion864414?t=rMocIolMIppTGQZqkzglXA&s=09">
            <FaXTwitter size={20} />
          </a>
          <div className="h-1 w-1 rounded-[50%] bg-[#00A8E8] mx-1"></div>
          <a href="https://wa.me/2348083842079">
            <FaWhatsapp size={20} />
          </a>
        </div>
        <div className=" bg-[#202020] h-[1px] w-88 lg:w-84 md:w-20"></div>
        <a
          href="mailto:adebiyiquawiy2006@gmail.com"
          className="text-white text-sm tracking-wide"
        >
          <FaEnvelope className="inline text-[#00A8E8] mx-1" />
          adebiyiquawiy2006@gmail.com
        </a>
        <div className=" bg-[#202020] h-[1px] w-88 lg:w-84 md:w-20"></div>
        <a href="" className="text-white text-sm tracking-wide font-semibold">
          <FaPhone className="inline text-[#00A8E8] mx-1" />
          +234 903 820 7504
        </a>
      </div>
      <div className="flex flex-wrap gap-2 lg:justify-between">
        <p className="text-[#8a8a8a] font-semibold text-2xl lg:text-4xl lg:w-170 mt-6 tracking-wide">
          <span className="font-bold text-white">Reach out,</span> and let's
          create something amazing together.
        </p>
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactPage;
