import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaArrowRight, FaXTwitter, FaWhatsapp,
  FaEnvelope, FaPhone, FaLinkedin,
} from "react-icons/fa6";

const Contact = () => {
  const location = useLocation();
  if (location.pathname === "/contact") return null;

  return (
    <section
      className="relative"
      style={{ background: "var(--bg-surface)" }}
    >
      {/* Gradient top border — accent peaks at center, fades to transparent */}
      <div
        aria-hidden="true"
        style={{
          height: "1px",
          background: "linear-gradient(to right, transparent, var(--accent), transparent)",
        }}
      />

      <div className="px-6 lg:px-16 py-20">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-6">
          <span className="h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
          <span
            className="text-sm font-semibold tracking-[0.2em] uppercase"
            style={{ color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace" }}
          >
            Let's connect
          </span>
        </div>

        {/* Headline + CTA */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-14">
          <h2
            className="text-4xl lg:text-6xl font-bold leading-tight max-w-2xl"
            style={{ color: "var(--text-primary)" }}
          >
            Have a project<br />
            in mind?{" "}
            <span style={{ color: "var(--accent)" }}>Let's talk.</span>
          </h2>
          <Link
            to="/contact"
            className="flex items-center gap-3 py-4 px-8 rounded-full font-semibold text-base flex-shrink-0 transition-opacity duration-200 hover:opacity-80 self-start lg:self-auto"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            Get in touch <FaArrowRight size={14} />
          </Link>
        </div>

        {/* Contact cards — sit on --bg-page for contrast against --bg-surface */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <a
            href="mailto:adebiyiquawiy2006@gmail.com"
            className="global-cta-card flex items-center gap-4 flex-1 p-5 rounded-2xl border transition-all duration-200"
            style={{ background: "var(--bg-page)", borderColor: "var(--border-subtle)" }}
          >
            <div
              className="h-11 w-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "var(--bg-elevated)", color: "var(--accent)" }}
            >
              <FaEnvelope size={18} />
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Email</p>
              <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                adebiyiquawiy2006@gmail.com
              </p>
            </div>
          </a>

          <a
            href="tel:+2349038207504"
            className="global-cta-card flex items-center gap-4 flex-1 p-5 rounded-2xl border transition-all duration-200"
            style={{ background: "var(--bg-page)", borderColor: "var(--border-subtle)" }}
          >
            <div
              className="h-11 w-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "var(--bg-elevated)", color: "var(--accent)" }}
            >
              <FaPhone size={18} />
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Phone</p>
              <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                +234 903 820 7504
              </p>
            </div>
          </a>
        </div>

        {/* Social row */}
        <div className="flex items-center gap-5">
          <span className="text-sm" style={{ color: "var(--text-muted)" }}>Find me on</span>
          <div className="h-[1px] w-8" style={{ background: "var(--border-default)" }} />
          {[
            { href: "https://www.linkedin.com/in/aabdulquawiy", icon: FaLinkedin, label: "LinkedIn" },
            { href: "https://x.com/Dominion864414?t=rMocIolMIppTGQZqkzglXA&s=09", icon: FaXTwitter, label: "X" },
            { href: "https://wa.me/2349038207504", icon: FaWhatsapp, label: "WhatsApp" },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="h-10 w-10 rounded-full flex items-center justify-center border transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              style={{ borderColor: "var(--border-default)", color: "var(--text-muted)" }}
            >
              <Icon size={17} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;