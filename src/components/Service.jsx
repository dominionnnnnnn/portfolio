import React from "react";
import { useInView } from "react-intersection-observer";
import {
  FaLayerGroup,
  FaServer,
  FaDatabase,
  FaBoltLightning,
  FaDocker,
} from "react-icons/fa6";

const services = [
  {
    id: 1,
    title: "Fullstack Web Applications",
    text: "React and Tailwind on the frontend, Django and PostgreSQL on the backend \u2014 including a 14-component trading platform landing experience and a logistics platform's order workflows.",
    icon: FaLayerGroup,
  },
  {
    id: 2,
    title: "API & Backend Architecture",
    text: "Django REST and Strawberry GraphQL APIs with clean service-layer separation \u2014 the pattern I've contributed to a logistics platform's rider, order, and pricing mutations as part of a backend team.",
    icon: FaServer,
  },
  {
    id: 3,
    title: "Database Design",
    text: "Schema design and data modeling across PostgreSQL and Supabase, built for scale and for queries that stay fast as the data grows.",
    icon: FaDatabase,
  },
  {
    id: 4,
    title: "Real-time Features",
    text: "Live, synced experiences via Supabase channels and WebSockets \u2014 RuralAid's responder chat and live emergency map run on this.",
    icon: FaBoltLightning,
  },
  {
    id: 5,
    title: "Deployment & Infrastructure",
    text: "Docker-based CI/CD and Vercel deployments, with Supabase managed as backend infrastructure end to end.",
    icon: FaDocker,
  },
];

const ServiceCard = ({ service, index, featured }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const Icon = service.icon;
  const number = String(index + 1).padStart(2, "0");

  return (
    <div
      ref={ref}
      className={`service-card relative overflow-hidden flex flex-col gap-4 my-6 border-1 p-6 rounded-xl s-card ${
        featured
          ? "lg:[width:calc(66.666%-16px)]"
          : "lg:[width:calc(33.333%-16px)]"
      } md:w-[340px] ${inView ? "show" : ""}`}
      style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
    >
      <span
        className="service-card-number pointer-events-none select-none absolute top-2 right-4 font-bold leading-none"
        style={{ color: 'var(--text-primary)' }}
        aria-hidden="true"
      >
        {number}
      </span>

      <div
        className="service-card-icon relative h-14 w-14 rounded-lg flex items-center justify-center"
        style={{ background: 'var(--bg-elevated)', color: 'var(--accent)' }}
      >
        <Icon size={26} />
      </div>
      <div className="relative" style={{ color: 'var(--text-secondary)' }}>
        <h1 className="text-2xl font-bold my-2" style={{ color: 'var(--text-primary)' }}>{service.title}</h1>
        <p className={`tracking-wide ${featured ? "text-lg lg:text-xl lg:max-w-[85%]" : "text-lg"}`} style={{ color: 'var(--text-muted)' }}>{service.text}</p>
      </div>
    </div>
  );
};

const Service = () => {
  const { ref: eyebrowRef, inView: isEyebrowVisible } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const { ref: headerRef, inView: isHeaderVisible } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const { ref: bottomTextRef, inView: isBottomTextVisible } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <section className="services-section py-12">
      <div className="services-glow services-glow--top" aria-hidden="true"></div>
      <div className="services-glow services-glow--center" aria-hidden="true"></div>
      <div className="services-glow services-glow--bottom" aria-hidden="true"></div>

      <div className="relative z-1 lg:px-14 px-6 py-4">
        <div
          ref={eyebrowRef}
          className={`service-eyebrow flex items-center gap-2 mb-3 ${
            isEyebrowVisible ? "show" : ""
          }`}
        >
          <span
            className="service-eyebrow-dot h-2 w-2 rounded-full"
            style={{ background: 'var(--accent)' }}
          ></span>
          <span
            className="text-sm font-semibold tracking-[0.2em] uppercase"
            style={{ color: 'var(--accent)' }}
          >
            Capabilities
          </span>
        </div>

        <div
          ref={headerRef}
          className={`flex flex-wrap gap-4 lg:gap-2 items-center service-header ${
            isHeaderVisible ? "show" : ""
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            What I Build
          </h1>
          <div className="service-divider h-[2px] w-[350px] md:w-[150px] lg:w-[620px]"></div>
        </div>

        <p
          ref={bottomTextRef}
          className={`mx-1 mt-4 text-lg servicebottom ${
            isBottomTextVisible ? "show" : ""
          }`}
          style={{ color: 'var(--text-muted)' }}
        >
          Fullstack depth across the whole stack
        </p>

        <div className="flex flex-wrap justify-center md:gap-6 lg:gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              featured={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;