import React from "react";
import p1 from "../assets/estate.png";
import p2 from "../assets/cconv.png";
import p3 from "../assets/blog.png";
import p5 from "../assets/crypto.png";
import estate from "../assets/estate.png";

const project = [
  {
    id: 1,
    title: "Real Estate Website",
    details:
      "A sleek, responsive template for real estate agencies to showcase properties with filters and high-quality images.",
    link: "https://estate-temp.vercel.app/",
    img: p1,
    stack: ["React", "Tailwind CSS", "JavaScript"],
  },
  {
    id: 2,
    title: "Web3 Landing Page",
    details:
      "A decentralized application showcasing the potential of blockchain technology with a user-friendly interface.",
    link: "https://web3-six-tau-85.vercel.app/",
    img: p5,
    stack: ["React", "Tailwind CSS", "JavaScript"],
  },
  {
    id: 3,
    title: "Currency Converter",
    details:
      "A real-time currency converter using CurrencyAPI, offering quick and seamless exchange rate conversions.",
    link: "https://domconverter.vercel.app/",
    img: p2,
    stack: ["React", "Tailwind CSS", "JavaScript", "CurrencyAPI"],
  },
  {
    id: 4,
    title: "Blog App",
    details:
      "A personal blog sharing my web dev insights, tech trends, tech journey and programming tips with a clean UI.",
    link: "https://dominionnnnnnn.github.io/domblog/",
    img: p3,
    stack: ["React", "CSS", "JavaScript"]
  },
];

const Projects = ({ count }) => {
  return (
    <div id="projects" className="scroll-mt-20 scroll-smooth py-4 mt-4">
      <div className="flex flex-wrap  gap-6 justify-center mt-6">
        {project.slice(0, count).map((item) => (
          <div
            key={item.id}
            className="w-[93vw] md:w-140 border-[1.5px] rounded-2xl border-gray-600 my-6 group overflow-hidden hover:cursor-pointer"
            onClick={() => window.open(item.link, "_blank")}
          >
            <img src={item.img} alt="" className="mb-4 rounded-t-2xl transition-transform duration-300 group-hover:scale-110" />
            <div className="px-3 md:px-6 py-4">
              <h2 className="text-white font-bold my-1">{item.title}</h2>
              <p className="text-[#c5c5c5]">{item.details}</p>
              <div className="mt-4 flex flex-wrap">
                {item.stack.map((tech, index) => (
                  <span
                    key={index}
                    className="my-1.5 text-[#c5c5c5] text-sm mr-2 border p-2 rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
