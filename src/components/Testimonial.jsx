import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactStars from "react-stars";

const Review = [
  {
    id: 1,
    name: "Olasheu B.",
    message:
      "You really delivered beyond expectations the website was clean, professional, and done with zero stress. No long talk, just smooth and timely execution from start to finish. I’ll definitely recommend you anytime.",
    rating: 5,
    role: "Graphic Designer",
  },
  {
    id: 2,
    name: "Jimmy O.",
    message:
      "From the first conversation to the final result, everything was on point. Clear communication, fast turnaround, and a very polished outcome. You made the process easy and stress-free. The attention to detail really stood out throughout",
    rating: 4.5,
    role: "E-commerce Merchant",
  },
  {
    id: 3,
    name: "Pelumi A.",
    message:
      "Absolutely impressed with your work, you brought the vision to life with zero hassle. Clean design, smooth process, and timely updates. Everything was handled professionally, and the final result was even better than I imagined.",
    rating: 5,
    role: "Real Estate Founder",
  },
];

const Testimonial = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          infinite: true,
          arrows: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          infinite: true,
          arrows: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="lg:px-12 px-6 mt-20">
      {/* header */}
      <div className="flex flex-wrap items-center gap-6">
        <h1 className="text-4xl font-semibold text-white">My Clients</h1>
        <div className="w-[500px] bg-[#202020] h-[1px] lg:w-[920px]"></div>
      </div>
      {/* body */}
      <div className="my-12">
        <Slider {...settings}>
          {Review.map((item) => (
            <div key={item.id}>
              <div className="py-5 px-6 rounded-xl bg-[#1e1e1e] w-92">
                <p className="text-[#c1c1c1] font-semibold">"{item.message}"</p>
                <div className="mt-8 flex gap-2 items-center">
                  <p className="text-white">{item.name}</p>
                  <div className=" bg-gray-100 h-[1px] w-50"></div>
                </div>
                <div className="mt-8 flex justify-between items-center">
                  <p className="text-white text-sm text-[#c1c1c1]">
                    {item.role}
                  </p>
                  <ReactStars
                    count={5}
                    value={item.rating}
                    size={24}
                    color2={"#fbc800"}
                    edit={false}
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonial;
