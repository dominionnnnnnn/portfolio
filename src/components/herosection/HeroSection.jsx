import React from 'react';
import Button from './Button';
import TechSphere from './TechSphere';
import { FaPhoneAlt, FaGithub, FaLinkedin } from 'react-icons/fa';
import { useInView } from "react-intersection-observer";

const HeroSection = () => {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <div className="relative">
      {/* dot grid + radial glow background, scoped to hero */}
      <div className="dot-grid-bg" aria-hidden="true"></div>

      <div
        ref={ref}
        className={`relative z-10 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-4 py-16 my-4 hero-text ${inView ? "show" : ""}`}
      >
        {/* left: text content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:flex-1 lg:max-w-[560px]">
          {/* availability badge */}
          <div
            className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border text-sm"
            style={{ borderColor: 'var(--border-default)', color: 'var(--text-muted)' }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block"></span>
            Available for new projects
          </div>

          {/* name */}
          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            Hi, I'm <span style={{ color: 'var(--accent)' }}>Dominion</span>
          </h1>

          {/* title */}
          <h2
            className="text-xl md:text-2xl lg:text-3xl font-light mt-3 tracking-wide"
            style={{ color: 'var(--text-secondary)' }}
          >
            Senior Fullstack Engineer
          </h2>

          {/* value line */}
          <p
            className="text-base md:text-lg tracking-wide max-w-[560px] leading-relaxed mt-5"
            style={{ color: 'var(--text-secondary)' }}
          >
            I build production-grade web applications — from GraphQL APIs and Django backends
            to polished React UIs — with a focus on African markets and real user impact.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <a
              href="https://calendly.com/adebiyiquawiy2006/30min"
              className="flex items-center gap-2 border py-2.5 px-5 rounded-xl transition-colors duration-200 text-sm font-medium"
              style={{ borderColor: 'var(--border-default)', color: 'var(--text-primary)' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
            >
              <FaPhoneAlt size={13} />
              Book a Call
            </a>
            <Button />
          </div>

          {/* social links */}
          <div className="flex items-center gap-5 mt-7">
            <a
              href="https://github.com/dominionnnnnnn"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--text-muted)' }}
              className="transition-colors duration-200 hover:opacity-80"
              aria-label="GitHub"
            >
              <FaGithub size={20} />
            </a>
            <div className="w-1 h-1 rounded-full" style={{ background: 'var(--border-default)' }}></div>
            <a
              href="https://www.linkedin.com/in/aabdulquawiy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--text-muted)' }}
              className="transition-colors duration-200 hover:opacity-80"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* right: tech sphere */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <TechSphere size={300} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;