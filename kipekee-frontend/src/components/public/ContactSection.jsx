import { useState } from "react";
import axios from "axios";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const payload = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
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
        message: "",
      });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-3xl overflow-hidden">
          <div className="md:w-1/2 relative min-h-[250px] md:min-h-[600px]">
            <img
              src="https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=800&auto=format&fit=crop"
              alt="Luxury Real Estate Contact"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-brand-navy/30"></div>

            <div className="absolute bottom-12 left-12 text-white max-w-xs hidden md:block">
              <h3 className="text-3xl font-heading font-bold mb-4 text-gray-300">
                Let's Find Your Dream Home.
              </h3>

              <p className="opacity-90 font-light">
                Our team of luxury specialists is ready to assist you every step
                of the way.
              </p>
            </div>
          </div>

          <div className="md:w-1/2 p-10 md:p-16 lg:p-20 flex flex-col justify-center">
            <div className="mb-10">
              <h5 className="text-brand-gold font-bold tracking-widest uppercase mb-4 text-sm">
                Get In Touch
              </h5>
              <h2 className="text-4xl font-heading font-bold text-brand-navy mb-6">
                Send Us A Message
              </h2>

              <div className="flex flex-col space-y-2 text-brand-navy/70 text-sm font-medium">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-brand-gold mr-3"
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
                  +254 791 869 625
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-brand-gold mr-3"
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
                  info@rutererealty.com
                </div>
              </div>
            </div>

            {status === "success" ? (
              <div className="bg-green-50 border border-green-100 rounded-lg p-8 text-center animate-fade-in">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
                  Message Sent
                </h3>
                <p className="text-gray-500 mb-6">
                  We will get back to you shortly.
                </p>
                <button
                  onClick={() => setStatus("")}
                  className="text-brand-gold font-bold uppercase text-xs tracking-widest hover:underline"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative z-0 w-full group">
                    <input
                      type="text"
                      name="firstName"
                      id="floating_first_name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="block py-2.5 px-0 w-full text-sm text-brand-dark bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-brand-navy peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_first_name"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-brand-navy peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      First Name
                    </label>
                  </div>
                  <div className="relative z-0 w-full group">
                    <input
                      type="text"
                      name="lastName"
                      id="floating_last_name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="block py-2.5 px-0 w-full text-sm text-brand-dark bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-brand-navy peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_last_name"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-brand-navy peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Last Name
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative z-0 w-full group">
                    <input
                      type="email"
                      name="email"
                      id="floating_email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block py-2.5 px-0 w-full text-sm text-brand-dark bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-brand-navy peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_email"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-brand-navy peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Email address
                    </label>
                  </div>
                  <div className="relative z-0 w-full group">
                    <input
                      type="tel"
                      name="phone"
                      id="floating_phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="block py-2.5 px-0 w-full text-sm text-brand-dark bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-brand-navy peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_phone"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-brand-navy peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Phone Number
                    </label>
                  </div>
                </div>

                <div className="relative z-0 w-full group">
                  <textarea
                    rows="4"
                    name="message"
                    id="floating_message"
                    value={formData.message}
                    onChange={handleChange}
                    className="block py-2.5 px-0 w-full text-sm text-brand-dark bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-brand-navy peer resize-none"
                    placeholder=" "
                    required
                  ></textarea>
                  <label
                    htmlFor="floating_message"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-brand-navy peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Your Message
                  </label>
                </div>

                <button
                  disabled={status === "sending"}
                  className="bg-brand-navy text-white px-10 py-4 font-bold uppercase text-sm tracking-widest hover:bg-brand-gold transition-colors duration-300 rounded-sm w-full md:w-auto disabled:opacity-70"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
                {status === "error" && (
                  <p className="text-red-500 text-sm mt-2 font-bold">
                    Failed to send message. Please try again.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
