import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaXTwitter, FaWhatsapp, FaGithub } from "react-icons/fa6";

const NAV_LINKS = [
  { to: "/",        label: "Home"     },
  { to: "/about",   label: "About"    },
  { to: "/projects",label: "Projects" },
  { to: "/contact", label: "Contact"  },
];

const STACK = ["React", "Django", "GraphQL", "Supabase", "PostgreSQL", "Tailwind CSS"];

const SOCIALS = [
  { href: "https://github.com/dominionnnnnnn",  icon: FaGithub,   label: "GitHub"    },
  { href: "https://www.linkedin.com/in/aabdulquawiy", icon: FaLinkedin, label: "LinkedIn"  },
  { href: "https://x.com/Dominion864414?t=rMocIolMIppTGQZqkzglXA&s=09", icon: FaXTwitter, label: "X" },
  { href: "https://wa.me/2349038207504",        icon: FaWhatsapp, label: "WhatsApp"  },
];

const Footer = () => {
  return (
    <footer className="footer-root">
      <div className="footer-top-border" />

      <div className="px-6 lg:px-16 pt-14 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
              <span className="font-extrabold text-xl name" style={{ color: "var(--text-primary)" }}>
                DOMSTACK
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Senior Fullstack Engineer.<br />
              Building products that work<br />
              in the real world.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-4"
              style={{ color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>
              Navigation
            </p>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to}
                    className="text-sm transition-colors duration-200 hover:text-[var(--accent)]"
                    style={{ color: "var(--text-secondary)" }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stack */}
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-4"
              style={{ color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>
              Stack
            </p>
            <ul className="flex flex-col gap-3">
              {STACK.map((tech) => (
                <li key={tech} className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-4"
              style={{ color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>
              Contact
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="mailto:adebiyiquawiy2006@gmail.com"
                  className="text-sm transition-colors duration-200 hover:text-[var(--accent)] break-all"
                  style={{ color: "var(--text-secondary)" }}>
                  adebiyiquawiy2006@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+2349038207504"
                  className="text-sm transition-colors duration-200 hover:text-[var(--accent)]"
                  style={{ color: "var(--text-secondary)" }}>
                  +234 903 820 7504
                </a>
              </li>
              <li className="pt-2">
                <div className="flex items-center gap-3">
                  {SOCIALS.map(({ href, icon: Icon, label }) => (
                    <a key={label} href={href} aria-label={label}
                      className="transition-colors duration-200 hover:text-[var(--accent)]"
                      style={{ color: "var(--text-muted)" }}>
                      <Icon size={17} />
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom-divider mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} Dominion. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>
            Built with React + Django
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;