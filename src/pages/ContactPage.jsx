import React from "react";
import {
  FaLinkedin, FaXTwitter, FaWhatsapp,
  FaEnvelope, FaPhone, FaGithub,
} from "react-icons/fa6";
import ContactForm from "../components/ContactForm";

const CONTACT_ITEMS = [
  { href: "mailto:adebiyiquawiy2006@gmail.com", icon: FaEnvelope, label: "Email", value: "adebiyiquawiy2006@gmail.com" },
  { href: "tel:+2349038207504",                icon: FaPhone,    label: "Phone", value: "+234 903 820 7504" },
];

const SOCIALS = [
  { href: "https://github.com/dominionnnnnnn", icon: FaGithub, label: "GitHub" },
  { href: "https://www.linkedin.com/in/aabdulquawiy", icon: FaLinkedin, label: "LinkedIn" },
  { href: "https://x.com/Dominion864414?t=rMocIolMIppTGQZqkzglXA&s=09", icon: FaXTwitter, label: "X / Twitter" },
  { href: "https://wa.me/2349038207504", icon: FaWhatsapp, label: "WhatsApp" },
];

const ContactPage = () => {
  return (
    <div className="contact-page-root">
      <div className="contact-page-glow contact-page-glow--tl" aria-hidden="true" />
      <div className="contact-page-glow contact-page-glow--br" aria-hidden="true" />

      <div className="relative z-1 px-6 lg:px-16 pt-16 pb-24">

        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-6">
          <span className="h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
          <span className="text-sm font-semibold tracking-[0.2em] uppercase"
            style={{ color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace" }}>
            Contact
          </span>
        </div>

        {/* Two-column: info left, form right */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">

          {/* Left — info */}
          <div className="lg:w-[42%] flex flex-col gap-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4"
                style={{ color: "var(--text-primary)" }}>
                Let's build<br />
                something{" "}
                <span style={{ color: "var(--accent)" }}>great.</span>
              </h1>
              <p className="text-base lg:text-lg leading-relaxed"
                style={{ color: "var(--text-secondary)" }}>
                Whether you need a fullstack product built from scratch,
                a frontend gig, or a backend system that actually scales —
                I'm open to hearing about it.
              </p>
            </div>

            {/* Contact method cards */}
            <div className="flex flex-col gap-3">
              {CONTACT_ITEMS.map(({ href, icon: Icon, label, value }) => (
                <a key={label} href={href}
                  className="contact-info-card flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200"
                  style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}>
                  <div className="h-11 w-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--bg-elevated)", color: "var(--accent)" }}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>{label}</p>
                    <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Socials */}
            <div>
              <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>Also find me on</p>
              <div className="flex items-center gap-3">
                {SOCIALS.map(({ href, icon: Icon, label }) => (
                  <a key={label} href={href} aria-label={label}
                    className="h-10 w-10 rounded-full flex items-center justify-center border transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    style={{ borderColor: "var(--border-default)", color: "var(--text-muted)" }}>
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:w-[58%] w-full">
            <div className="p-8 rounded-2xl border"
              style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}>
              <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--text-primary)" }}>
                Send a message
              </h2>
              <ContactForm />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;