import React from "react";
import { useInView } from "react-intersection-observer";
import software from "../assets/svg/software.png";
import web from "../assets/svg/web.png";
import seo from "../assets/svg/seo.png";
import google from "../assets/svg/gbusiness.png";
import cloud from "../assets/svg/cloud.png";
import Optimizaton from "../assets/svg/optimization.png";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Services = [
  {
    id: 1,
    title: "Web Development",
    text: " We build modern, high-performance websites tailored to your personal needs",
    icon: web,
  },
  {
    id: 2,
    title: "SEO Optimizaton",
    text: "Improve your website ranking and attract more organic traffic with our SEO strategies.",
    icon: seo,
  },
  {
    id: 3,
    title: "Google Business",
    text: "Get found easily! We optimize and set up your Google Business profile for maximum visibility.",
    icon: google,
  },
  {
    id: 4,
    title: "Software Development",
    text: "Custom software solutions designed to streamline your business operations.",
    icon: software,
  },
  {
    id: 5,
    title: "Web Hosting",
    text: "Reliable and secure hosting services to keep your website running smoothly.",
    icon: cloud,
  },
  {
    id: 6,
    title: "Web Optimization",
    text: "Speed up and enhance your website for a seamless user experience. Let’s take your business to the next level",
    icon: Optimizaton,
  },
];

const ServiceCard = ({ service }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className={`bg-[#1E1E1E] flex flex-col gap-4 my-6 lg:[width:calc(33.333%-16px)] md:w-[340px] border-1 border-[#1e1e1e] p-6 rounded-xl s-card ${
        inView ? "show" : ""
      }`}
    >
      <img src={service.icon} alt="" className="h-16 w-16" />
      <div className="text-gray-200">
        <h1 className="text-2xl font-bold my-2">{service.title}</h1>
        <p className="text-gray-400 text-lg tracking-wide">{service.text}</p>
      </div>
    </div>
  );
};

const Service = () => {
  const { ref: headerRef, inView: isHeaderVisible } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { ref: bottomTextRef, inView: isBottomTextVisible } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 1000,
    cssEase: "linear",
    arrows: false,
  };

  return (
    <div className="lg:px-14 px-6 py-4 mt-8">
      <div
        ref={headerRef}
        className={`flex flex-wrap gap-4 lg:gap-2 lg:justify-center items-center ${
          isHeaderVisible ? "show" : ""
        }`}
      >
        <h1 className="text-4xl font-semibold text-white">My Service</h1>
        <div className="w-[350px] bg-[#202020] h-[1px] md:w-[150px] lg:w-[620px]"></div>
        <div className="text-gray-300 w-85 md:w-76 lg:w-82">
          <Slider {...settings}>
            {Services.map((items) => (
              <div key={items.id}>
                <h3 className="text-sm">{items.title}</h3>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <p
        ref={bottomTextRef}
        className={`text-gray-400 mx-1 mt-4 text-lg servicebottom ${
          isBottomTextVisible ? "show" : ""
        }`}
      >
        Explore my offerings
      </p>

      <div className="flex flex-wrap md:gap-6 md:justify-center lg:gap-6">
        {Services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Service;
