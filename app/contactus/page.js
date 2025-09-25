"use client"
import React, { useState, useEffect, useMemo } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  // Email regex
  const emailPattern = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);

  // Live validation
  useEffect(() => {
    setErrors({
      name: formData.name && formData.name.trim().length < 2 ? "Name must be at least 2 characters" : "",
      email: formData.email && !emailPattern.test(formData.email) ? "Invalid email" : "",
      message: formData.message && formData.message.trim().length < 5 ? "Message must be at least 5 characters" : "",
    });
  }, [formData, emailPattern]);

  // Check form validity
  const isFormValid =
    formData.name.trim() &&
    formData.email.trim() &&
    formData.message.trim() &&
    !errors.name &&
    !errors.email &&
    !errors.message;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trigger validation on submit as well
    const submitErrors = {
      name: formData.name.trim().length < 2 ? "Name must be at least 2 characters" : "",
      email: !emailPattern.test(formData.email) ? "Invalid email" : "",
      message: formData.message.trim().length < 5 ? "Message must be at least 5 characters" : "",
    };
    setErrors(submitErrors);

    if (submitErrors.name || submitErrors.email || submitErrors.message) return;

    setLoading(true);
    const start = Date.now();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();

      // Minimum spinner time
      const elapsed = Date.now() - start;
      if (elapsed < 300) await new Promise((res) => setTimeout(res, 300 - elapsed));

      if (result.success) {
        toast.success(result.message || "Message sent successfully!", { position: "top-right", autoClose: 5000, transition: Bounce });
        setFormData({ name: "", email: "", message: "" });
        setErrors({ name: "", email: "", message: "" });
      } else {
        toast.error(result.message || "Failed to send message", { position: "top-right", autoClose: 5000, transition: Bounce });
      }
        

    } catch (err) {
      console.error(err);
      toast.error("Server error. Please try again.", { position: "top-right", autoClose: 5000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer transition={Bounce} />
      <div className="max-w-lg mx-auto bg-purple-100 rounded-lg p-6 md:p-10 mt-10 flex flex-col gap-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">Contact Us</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="px-4 py-3 rounded-md w-full text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 transition hover:scale-105"
          />
          {errors.name && <span className="text-red-600 text-xs md:text-sm">{errors.name}</span>}

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="px-4 py-3 rounded-md w-full text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 transition hover:scale-105"
          />
          {errors.email && <span className="text-red-600 text-xs md:text-sm">{errors.email}</span>}

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="px-4 py-3 rounded-md w-full text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 transition hover:scale-105"
          />
          {errors.message && <span className="text-red-600 text-xs md:text-sm">{errors.message}</span>}

          <button
            type="submit"
            disabled={!isFormValid || loading}
            className="bg-purple-500 rounded-lg shadow-lg px-4 py-3 font-bold text-white disabled:bg-purple-400 disabled:cursor-not-allowed disabled:opacity-70 w-full md:w-auto flex justify-center items-center hover:bg-purple-600 hover:scale-105 active:scale-95 transition duration-300"
          >
            {loading ? <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div> : "Send Message"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Contact;
