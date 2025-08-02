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
          text: "Thanks for reaching out. I’ll get back to you soon!",
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
      className="flex flex-col gap-4 w-full max-w-md"
    >
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        required
        className=" rounded-xl text-white bg-[#262626] p-3"
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        required
        className=" rounded-xl text-white bg-[#262626] p-3"
      />
      <textarea
        name="message"
        placeholder="Your Message"
        required
        className="rounded-xl text-white bg-[#262626] p-3 h-32"
      ></textarea>
      <button type="submit" className="bg-white font-semibold rounded-xl text-black py-2 px-4">
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
