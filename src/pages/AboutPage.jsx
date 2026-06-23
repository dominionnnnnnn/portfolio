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
  "GraphQL",
  "Strawberry GraphQL",
  "PostgreSQL",
  "Supabase",
  "Vite",
  "Git",
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
            senior fullstack engineer with 2+ years building software across
            logistics, fintech, and emergency response systems where
            reliability and real-time data aren't optional.
          </p>
          <p className="lg:w-182 text-lg tracking-wide" style={{ color: 'var(--text-secondary)' }}>
            I've collaborated on backend systems for a logistics platform,
            led frontend development on a P2P crypto trading platform as a
            freelance gig, and independently built{" "}
            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>RuralAid</span> — including
            its real-time responder chat and live emergency map. My stack is{" "}
            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>React</span> and{" "}
            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Tailwind CSS</span> on the
            frontend, <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Django</span> and{" "}
            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Strawberry GraphQL</span> on
            the backend, with <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>PostgreSQL</span>{" "}
            and <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Supabase</span> handling
            data and real-time infrastructure.
          </p>
          <p className="lg:w-182 text-lg tracking-wide" style={{ color: 'var(--text-secondary)' }}>
            What sets my work apart is context — I build for markets with
            patchy connectivity, mobile-first users, and infrastructure
            constraints most templates ignore. I'm always open to
            collaborating on products that need to hold up under real-world
            conditions, not just demo well.
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