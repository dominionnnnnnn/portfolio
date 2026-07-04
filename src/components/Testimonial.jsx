import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa6";

const reviews = [
  {
    id: 1,
    name: "Olasheu B.",
    role: "Graphic Designer",
    rating: 5,
    message:
      "You really delivered beyond expectations — the website was clean, professional, and done with zero stress. No long talk, just smooth and timely execution from start to finish. I'll definitely recommend you anytime.",
  },
  {
    id: 2,
    name: "Jimmy O.",
    role: "E-commerce Merchant",
    rating: 5,
    message:
      "From the first conversation to the final result, everything was on point. Clear communication, fast turnaround, and a very polished outcome. You made the process easy and stress-free. The attention to detail really stood out.",
  },
  {
    id: 3,
    name: "Pelumi A.",
    role: "Real Estate Founder",
    rating: 5,
    message:
      "Absolutely impressed — you brought the vision to life with zero hassle. Clean design, smooth process, and timely updates. Everything was handled professionally, and the final result was even better than I imagined.",
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} width="15" height="15" viewBox="0 0 20 20"
          fill={star <= rating ? "#fbc800" : "none"}
          stroke={star <= rating ? "#fbc800" : "var(--border-default)"}
          strokeWidth="1.5"
        >
          <path d="M10 1l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 13.27l-4.78 2.51.91-5.32L2.27 6.62l5.34-.78L10 1z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ review, active }) {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.15 });
  return (
    <div
      ref={ref}
      className={`testimonial-card ${inView ? "show" : ""} ${active ? "testimonial-card--active" : ""}`}
    >
      <FaQuoteLeft className="testimonial-quote-icon" size={22} />
      <p className="testimonial-message">"{review.message}"</p>
      <div className="testimonial-footer">
        <div className="testimonial-avatar" aria-hidden="true">{review.name.charAt(0)}</div>
        <div className="testimonial-author">
          <span className="testimonial-name">{review.name}</span>
          <span className="testimonial-role">{review.role}</span>
        </div>
        <div className="ml-auto">
          <StarRating rating={review.rating} />
        </div>
      </div>
    </div>
  );
}

const Testimonial = () => {
  const [active, setActive] = useState(0);
  const { ref: headerRef, inView: headerVisible } = useInView({ triggerOnce: false, threshold: 0.2 });

  const prev = () => setActive((a) => (a - 1 + reviews.length) % reviews.length);
  const next = () => setActive((a) => (a + 1) % reviews.length);

  return (
    <section className="testimonial-section">
      <div className="lg:px-14 px-6 pt-0 pb-20">

        {/* Header — own animation class, not s-card */}
        <div ref={headerRef} className={`testimonial-header ${headerVisible ? "show" : ""}`}>
          <div className="flex items-center gap-2 mb-4">
            <span className="h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
            <span
              className="text-sm font-semibold tracking-[0.2em] uppercase"
              style={{ color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace" }}
            >
              Client Feedback
            </span>
          </div>
          <div className="flex flex-wrap items-end gap-4 lg:gap-6">
            <h2
              className="text-4xl md:text-5xl font-semibold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              What Clients Say
            </h2>
            <div
              className="h-[2px] flex-1 min-w-[60px] max-w-[420px] mb-2"
              style={{
                background:
                  "linear-gradient(to right, rgba(var(--accent-rgb),0.5), var(--border-default) 40%, transparent)",
              }}
            />
          </div>
          <p className="mt-3 mb-12 text-lg" style={{ color: "var(--text-muted)" }}>
            Straight from the people I've built for.
          </p>
        </div>

        {/* Cards */}
        <div className="testimonial-grid">
          {reviews.map((r, i) => (
            <TestimonialCard key={r.id} review={r} active={i === active} />
          ))}
        </div>

        {/* Mobile carousel controls */}
        <div className="testimonial-controls">
          <button onClick={prev} className="testimonial-ctrl-btn" aria-label="Previous review">
            <FaChevronLeft size={14} />
          </button>
          <div className="testimonial-dots">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`testimonial-dot ${i === active ? "testimonial-dot--active" : ""}`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
          <button onClick={next} className="testimonial-ctrl-btn" aria-label="Next review">
            <FaChevronRight size={14} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Testimonial;