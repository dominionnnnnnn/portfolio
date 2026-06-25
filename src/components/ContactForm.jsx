import React, { useRef } from "react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import { FaPaperPlane } from "react-icons/fa6";

const ContactForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    Swal.fire({
      title: "Sending...",
      text: "Please wait while your message is being sent.",
      allowOutsideClick: false,
      didOpen: () => { Swal.showLoading(); },
    });

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY).then(
      () => {
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "Thanks for reaching out. I'll get back to you soon!",
          confirmButtonColor: "#3085d6",
        });
        form.current.reset();
      },
      () => {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Something went wrong. Please try again later.",
          confirmButtonColor: "#d33",
        });
      }
    );
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-5">

      <div className="flex flex-col sm:flex-row gap-5">
        <div className="contact-field flex-1">
          <label className="contact-field-label">
            Name <span style={{ color: "var(--accent)" }}>*</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            required
            className="contact-field-input"
          />
        </div>
        <div className="contact-field flex-1">
          <label className="contact-field-label">
            Email <span style={{ color: "var(--accent)" }}>*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            required
            className="contact-field-input"
          />
        </div>
      </div>

      <div className="contact-field">
        <label className="contact-field-label">
          Subject
        </label>
        <input
          type="text"
          name="subject"
          placeholder="What's this about?"
          className="contact-field-input"
        />
      </div>

      <div className="contact-field">
        <label className="contact-field-label">
          Message <span style={{ color: "var(--accent)" }}>*</span>
        </label>
        <textarea
          name="message"
          placeholder="Tell me about your project, timeline, budget — anything helps."
          required
          className="contact-field-input"
          style={{ minHeight: "140px", resize: "vertical" }}
        />
      </div>

      <button type="submit" className="contact-submit-btn">
        Send Message <FaPaperPlane size={14} />
      </button>

    </form>
  );
};

export default ContactForm;