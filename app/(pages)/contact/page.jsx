"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const formFieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1, duration: 0.5 },
  }),
};

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formState.name.trim()) newErrors.name = "Name is required";
    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formState.subject.trim()) newErrors.subject = "Subject is required";
    if (!formState.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Reset submission status after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Hero Section */}
      <div className="relative h-[30vh] bg-gradient-to-r from-[#854836] to-[#FFB22C] flex items-center justify-center">
        <motion.div
          className="text-center text-white p-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl">We'd love to hear from you</p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-lg mb-8">
              Have questions about our properties or services? Our team is here
              to help. Reach out to us using any of the methods below.
            </p>

            <div className="space-y-6">
              <ContactInfoItem
                icon={<MapPin size={24} />}
                title="Our Location"
                content="123 Property Lane, Suite 456, San Francisco, CA 94107"
              />
              <ContactInfoItem
                icon={<Phone size={24} />}
                title="Phone Number"
                content="(555) 123-4567"
              />
              <ContactInfoItem
                icon={<Mail size={24} />}
                title="Email Address"
                content="contact@shareabode.com"
              />
              <ContactInfoItem
                icon={<Clock size={24} />}
                title="Business Hours"
                content="Monday - Friday: 9am - 6pm EST"
              />
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-semibold text-black mb-4">
                Our Location
              </h3>

              <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="w-full h-36 bg-gradient-to-br from-[#FFB22C]/20 to-[#854836]/20 flex items-center justify-center">
                  <MapPin size={56} className="text-[#854836]" />
                </div>

                <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-md shadow-md">
                  <p className="text-sm font-medium text-black">
                    We’re located in San Francisco, CA
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="bg-white rounded-xl shadow-md p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

            {isSubmitted ? (
              <motion.div
                className="flex flex-col items-center justify-center py-12 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle size={64} className="text-green-500 mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Message Sent!</h3>
                <p className="text-gray-600">
                  Thank you for reaching out. We'll get back to you as soon as
                  possible.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <motion.div
                    custom={1}
                    variants={formFieldVariants}
                    className="form-group"
                  >
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB22C] ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </motion.div>

                  <motion.div
                    custom={2}
                    variants={formFieldVariants}
                    className="form-group"
                  >
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB22C] ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </motion.div>

                  <motion.div
                    custom={3}
                    variants={formFieldVariants}
                    className="form-group"
                  >
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB22C] ${
                        errors.subject ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Booking Inquiry"
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.subject}
                      </p>
                    )}
                  </motion.div>

                  <motion.div
                    custom={4}
                    variants={formFieldVariants}
                    className="form-group"
                  >
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows="5"
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB22C] ${
                        errors.message ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Your message here..."
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message}
                      </p>
                    )}
                  </motion.div>

                  <motion.div custom={5} variants={formFieldVariants}>
                    <button
                      type="submit"
                      className="w-full bg-[#FFB22C] text-black font-medium py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center hover:cursor-pointer"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Send size={18} className="mr-2" />
                          Send Message
                        </span>
                      )}
                    </button>
                  </motion.div>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

const ContactInfoItem = ({ icon, title, content }) => {
  return (
    <div className="flex items-start">
      <div className="p-3 bg-[#FFB22C] bg-opacity-20 rounded-lg mr-4">
        <div className="text-[#854836]">{icon}</div>
      </div>
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-gray-600">{content}</p>
      </div>
    </div>
  );
};
