import React, { useEffect, useRef } from "react";
import {
  FaLinkedin, FaXTwitter, FaWhatsapp,
  FaEnvelope, FaPhone, FaGithub, FaArrowRight,
} from "react-icons/fa6";
import ContactForm from "../components/ContactForm";

const CONTACT_ITEMS = [
  { href: "mailto:adebiyiquawiy2006@gmail.com", icon: FaEnvelope, label: "Email",  value: "adebiyiquawiy2006@gmail.com" },
  { href: "tel:+2349038207504",                 icon: FaPhone,    label: "Phone",  value: "+234 903 820 7504" },
];

const SOCIALS = [
  { href: "https://github.com/dominionnnnnnn",                                     icon: FaGithub,   label: "GitHub" },
  { href: "https://www.linkedin.com/in/aabdulquawiy",                              icon: FaLinkedin, label: "LinkedIn" },
  { href: "https://x.com/Dominion864414?t=rMocIolMIppTGQZqkzglXA&s=09",           icon: FaXTwitter, label: "X / Twitter" },
  { href: "https://wa.me/2349038207504",                                            icon: FaWhatsapp, label: "WhatsApp" },
];

const NoiseCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (!w || !h) return;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const px = Math.floor((i / 4) % w);
        const py = Math.floor((i / 4) / w);
        const seed = px * 1234 + py * 5678;
        const val = (((Math.sin(seed) * 43758.5453) % 1) + 1) / 2;
        const b = Math.floor(val * 255);
        data[i] = b; data[i + 1] = b; data[i + 2] = b; data[i + 3] = 15;
      }
      ctx.putImageData(imageData, 0, 0);
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(canvas.parentElement);
    return () => ro.disconnect();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        mixBlendMode: "overlay",
      }}
    />
  );
};

const ContactPage = () => {
  return (
    <div className="contact-page-root">
      <NoiseCanvas />

      <div className="relative z-10 px-6 lg:px-16 pt-16 pb-24">

        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-10">
          <span className="h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
          <span
            className="text-sm font-semibold tracking-[0.2em] uppercase"
            style={{ color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace" }}
          >
            Contact
          </span>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">

          {/* Left panel */}
          <div className="lg:w-[42%] flex flex-col gap-8 relative">

            {/* Faint watermark */}
            <span
              className="absolute -top-6 -left-2 text-[7rem] lg:text-[9rem] font-bold leading-none select-none pointer-events-none"
              style={{
                color: "var(--accent)",
                opacity: 0.04,
                fontFamily: "'JetBrains Mono', monospace",
              }}
              aria-hidden="true"
            >
              HELLO
            </span>

            <div className="relative">
              {/* Availability badge */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-5"
                style={{ borderColor: "var(--border-subtle)", background: "var(--bg-elevated)" }}
              >
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                <span
                  className="text-xs font-medium"
                  style={{ color: "var(--text-secondary)", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Available for new projects
                </span>
              </div>

              <h1
                className="text-4xl lg:text-5xl font-bold leading-tight mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Let's build<br />
                something{" "}
                <span style={{ color: "var(--accent)" }}>great.</span>
              </h1>
              <p
                className="text-base lg:text-lg leading-relaxed mb-2"
                style={{ color: "var(--text-secondary)" }}
              >
                Whether you need a fullstack product built from scratch,
                a frontend gig, or a backend system that actually scales —
                I'm open to hearing about it.
              </p>
              <p
                className="text-sm"
                style={{ color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}
              >
                ⚡ Typical reply within 24 hours.
              </p>
            </div>

            {/* Contact cards */}
            <div className="flex flex-col gap-3">
              {CONTACT_ITEMS.map(({ href, icon: Icon, label, value }) => (
                <a
                  key={label}
                  href={href}
                  className="contact-info-card flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200"
                  style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
                >
                  <div
                    className="h-11 w-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--bg-elevated)", color: "var(--accent)" }}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>{label}</p>
                    <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Divider */}
            <div
              className="h-[1px]"
              style={{
                background: "linear-gradient(to right, var(--accent), var(--border-default) 40%, transparent 90%)",
                opacity: 0.4,
              }}
            />

            {/* Socials */}
            <div>
              <p
                className="text-xs font-semibold tracking-[0.15em] uppercase mb-4"
                style={{ color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}
              >
                Find me on
              </p>
              <div className="flex items-center gap-3">
                {SOCIALS.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="contact-social-btn h-10 w-10 rounded-full flex items-center justify-center border transition-all duration-200"
                    style={{ borderColor: "var(--border-default)", color: "var(--text-muted)" }}
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel — form */}
          <div className="lg:w-[58%] w-full">
            <div
              className="contact-form-card p-8 rounded-2xl border"
              style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
            >
              {/* Terminal-style card header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
                  <span className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
                  <span className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
                </div>
                <span
                  className="text-xs"
                  style={{ color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  new_message.send()
                </span>
              </div>

              <ContactForm />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;