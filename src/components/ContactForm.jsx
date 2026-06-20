import React, { useRef } from "react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";

const ContactForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    Swal.fire({
      title: "Sending...",
      text: "Please wait while your message is being sent.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY).then(
      (result) => {
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "Thanks for reaching out. I'll get back to you soon!",
          confirmButtonColor: "#3085d6",
        });
        form.current.reset();
      },
      (error) => {
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
    <form
      ref={form}
      onSubmit={sendEmail}
      className="flex flex-col gap-4  "
    >
      <label htmlFor="name" className="font-light mx-2" style={{ color: 'var(--text-primary)' }}>Name*</label>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        required
        className="rounded-xl lg:w-120 p-3"
        style={{ background: 'var(--bg-input)', color: 'var(--text-primary)' }}
      />
      <label htmlFor="email" className="font-light mx-2" style={{ color: 'var(--text-primary)' }}>Email*</label>
      <input
        type="email"
        name="email"
        placeholder="example@gmail.com"
        required
        className="rounded-xl lg:w-120 p-3"
        style={{ background: 'var(--bg-input)', color: 'var(--text-primary)' }}
      />
      <label htmlFor="message" className="font-light mx-2" style={{ color: 'var(--text-primary)' }}>Message*</label>
      <textarea
        name="message"
        placeholder="Project Inquiry.."
        required
        className="rounded-xl w-90 lg:w-120 p-3 h-32"
        style={{ background: 'var(--bg-input)', color: 'var(--text-primary)' }}
      ></textarea>
      <button
        type="submit"
        className="font-semibold rounded-xl py-2 px-4 text-white"
        style={{ background: 'var(--accent)' }}
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;