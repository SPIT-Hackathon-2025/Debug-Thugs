import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-teal-500 flex flex-col items-center justify-center text-white p-6">
      <div className="max-w-3xl bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-center">Get in Touch</h1>
        <p className="text-lg text-gray-200 text-center">We'd love to hear from you! Reach out to us via the form below.</p>

        <form className="mt-6 flex flex-col gap-4">
          <input type="text" placeholder="Your Name" className="p-3 rounded-lg bg-white text-gray-900 outline-none" />
          <input type="email" placeholder="Your Email" className="p-3 rounded-lg bg-white text-gray-900 outline-none" />
          <textarea placeholder="Your Message" rows="4" className="p-3 rounded-lg bg-white text-gray-900 outline-none"></textarea>
          <button className="bg-yellow-400 text-gray-900 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-all">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
