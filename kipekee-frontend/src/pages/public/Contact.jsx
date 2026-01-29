import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "General Inquiry", // Default
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    // --- KEY CHANGE: Sending 'subject' explicitly ---
    const payload = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    };

    try {
      await axios.post("https://api.rutererealty.com/api/inquiries", payload);
      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          ></path>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          ></path>
        </svg>
      ),
      title: "Visit Our Office",
      text: "123 Westlands Blvd, Nairobi",
      subtext: "Open Mon-Fri, 8am - 6pm",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          ></path>
        </svg>
      ),
      title: "Give Us a Call",
      text: "+254 791 869 625",
      subtext: "Support available 24/7",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          ></path>
        </svg>
      ),
      title: "Send an Email",
      text: "info@rutererealty.com",
      subtext: "We reply within 2 hours",
    },
  ];

  return (
    <div className="bg-brand-gray min-h-screen pt-32 pb-0">
      <div className="container mx-auto px-6 mb-20">
        <div className="text-center mb-16 animate-fade-in-up">
          <h5 className="text-brand-gold font-bold tracking-widest uppercase mb-2 text-sm">
            Get In Touch
          </h5>
          <h1 className="text-4xl font-heading font-bold text-brand-navy">
            Contact Us
          </h1>
          <div className="w-24 h-1 bg-brand-gold mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 mx-auto bg-brand-navy/5 rounded-full flex items-center justify-center text-brand-navy mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-2">
                {item.title}
              </h3>
              <p className="text-brand-gold font-bold mb-1">{item.text}</p>
              <p className="text-gray-400 text-sm">{item.subtext}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
          <div className="lg:w-1/2 relative min-h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"
              alt="Contact Support"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-brand-navy/40"></div>
            <div className="absolute bottom-12 left-12 text-white p-6 max-w-md">
              <h3 className="text-3xl font-heading font-bold mb-4 text-gray-200">
                Start Your Journey.
              </h3>
              <p className="opacity-90">
                Whether you are looking to buy, sell, or invest, our team is
                ready to provide expert guidance tailored to your needs.
              </p>
            </div>
          </div>

          <div className="lg:w-1/2 p-12 lg:p-16">
            <h3 className="text-2xl font-bold text-brand-navy mb-8">
              Send a Message
            </h3>

            {status === "success" ? (
              <div className="h-full flex flex-col justify-center items-center text-center animate-fade-in">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-brand-navy mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-500 mb-6">
                  We will get back to you shortly.
                </p>
                <button
                  onClick={() => setStatus("")}
                  className="text-brand-gold font-bold underline text-sm uppercase tracking-wider"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2 block">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none transition-all"
                    />
                  </div>
                  <div className="group">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2 block">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2 block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none transition-all"
                    />
                  </div>
                  <div className="group">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2 block">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2 block">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none transition-all"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Buying">Buying a Property</option>
                    <option value="Selling">Selling a Property</option>
                    <option value="Partnership">Partnership</option>
                  </select>
                </div>

                <div className="group">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2 block">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  disabled={status === "sending"}
                  className="w-full bg-brand-navy text-white font-bold py-4 rounded shadow-lg hover:bg-brand-gold transition-colors uppercase text-xs tracking-widest disabled:opacity-70"
                >
                  {status === "sending" ? "Sending..." : "Submit Request"}
                </button>
                {status === "error" && (
                  <p className="text-red-500 text-xs text-center font-bold mt-2">
                    Failed to send message. Please try again.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="w-full h-[500px] relative grayscale hover:grayscale-0 transition-all duration-700">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.204555057982!2d36.79972914445851!3d-1.2675239967735398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f173c0a1f9a0d%3A0x4a49900332304675!2sWestlands%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1709900000000!5m2!1sen!2ske"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="absolute top-10 left-10 bg-white p-6 rounded-xl shadow-2xl max-w-xs hidden md:block">
          <h4 className="font-bold text-brand-navy text-lg mb-2">Kipekee HQ</h4>
          <p className="text-sm text-gray-500 mb-4">
            Located in the heart of Westlands, our office is open for walk-ins
            and scheduled consultations.
          </p>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-bold text-brand-gold uppercase hover:underline"
          >
            Get Directions
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
