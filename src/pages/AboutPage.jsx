import React from "react";
import img from "../assets/img1.jpg";
import { FaLocationPin, FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Skills = [
  "HTML",
  "CSS",
  "Tailwind CSS",
  "JavaScript",
  "React JS",
  "Python",
  "Django",
  "Rest API",
  "PostgreSQL",
  "Agile",
];

const AboutPage = () => {
  return (
    <div className=" px-6 lg:px-12 py-10 mb-20 lg:mb-30">
      <div className="flex flex-wrap items-center justify-center  gap-17">
        <div className="flex flex-col gap-6">
          <h1 className="font-bold text-xl lg:text-3xl" style={{ color: 'var(--text-primary)' }}>About Me</h1>
          <p className="lg:w-182 text-lg tracking-wide" style={{ color: 'var(--text-secondary)' }}>
            I'm{" "}
            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              {" "}
              Adebiyi Abdulquawiy
            </span>
            , also known as
            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}> Dominion</span>, a
            fullstack developer with 2 years of hands-on experience passionate
            about creating clean, responsive and user friendly digital
            solutions. I believe every line of code should serve a purpose and
            every interface should feel effortless to use.
          </p>
          <p className="lg:w-182 text-lg tracking-wide" style={{ color: 'var(--text-secondary)' }}>
            I work with <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>React.js</span> and <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Tailwind CSS</span> for visually polished and
            accessible frontends, paired with <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Django REST Framework</span> and
            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}> PostgreSQL</span> for powerful and reliable backends. This combination
            allows me to deliver structured, efficient and scalable applications
            for different needs.
          </p>
          <p className="lg:w-182 text-lg tracking-wide" style={{ color: 'var(--text-secondary)' }}>
            My approach blends design sense with technical skill to ensure that
            every project not only works but also delivers value. I enjoy
            turning ideas into reality, exploring creative solutions and I am
            always open to collaborating on meaningful projects that inspire
            growth and make an impact.
          </p>
        </div>
        <img src={img} alt="" className="lg:h-115 mt-4 rounded-t-4xl" />
      </div>
      <div className="flex flex-wrap mt-12 items-center gap-4">
        <h1 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
          <FaLocationPin className="inline mx-2" style={{ color: 'var(--accent)' }} />
          Let's Work Together!
        </h1>
        <div className="h-[1px] w-200" style={{ background: 'var(--border-default)' }}></div>
        <Link
          to="/contact"
          className="py-2 px-3 font-semibold rounded-2xl text-white"
          style={{ background: 'var(--accent)' }}
        >
          Let's Talk <FaArrowRight className="inline" />
        </Link>
      </div>
      <h3 className="mt-6 font-bold text-xl mx-2" style={{ color: 'var(--text-primary)' }}>Skills</h3>
      <div className="flex flex-wrap gap-4 mt-5 mx-2">
        {Skills.map((skill, index) => (
          <p
            key={index}
            className="border-1 p-2 rounded-xl"
            style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-default)' }}
          >
            {skill}
          </p>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;