import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchDetails = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:5000/api/properties/${id}`
        );
        setProperty(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");
    try {
      await axios.post("http://127.0.0.1:5000/api/inquiries", {
        ...contactForm,
        property_id: property.id,
      });
      setFormStatus("success");
      setContactForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setFormStatus("error");
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (!property)
    return (
      <div className="h-screen flex items-center justify-center">
        Property not found.
      </div>
    );

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
          <div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-brand-navy mb-2">
              {property.title}
            </h1>
            <p className="text-gray-500 text-lg flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-brand-gold"
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
              {property.location}
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-left md:text-right">
            <div className="text-3xl font-bold text-brand-gold">
              {property.price}
            </div>
            <div className="inline-block bg-brand-navy text-white text-xs px-3 py-1 rounded uppercase tracking-wider mt-2">
              {property.status}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mb-16">
        <div className="h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl mb-6">
          <img
            src={property.images[activeImage]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        </div>

        {property.images.length > 1 && (
          <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
            {property.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`min-w-[100px] h-24 rounded-xl overflow-hidden border-2 transition-all ${
                  activeImage === index
                    ? "border-brand-gold scale-105"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt="Thumbnail"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-3 gap-6 mb-12 bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <div className="text-center">
              <div className="font-bold text-2xl text-brand-navy">
                {property.beds}
              </div>
              <div className="text-xs uppercase text-gray-400 font-bold tracking-widest">
                Bedrooms
              </div>
            </div>
            <div className="text-center border-l border-r border-gray-200">
              <div className="font-bold text-2xl text-brand-navy">
                {property.baths}
              </div>
              <div className="text-xs uppercase text-gray-400 font-bold tracking-widest">
                Bathrooms
              </div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl text-brand-navy">
                {property.sqft}
              </div>
              <div className="text-xs uppercase text-gray-400 font-bold tracking-widest">
                Sq Ft
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-bold text-brand-navy mb-4">
              About this Property
            </h3>
            <p className="text-gray-500 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-bold text-brand-navy mb-6">
              Amenities
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {property.amenities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 text-gray-600"
                >
                  <span className="w-2 h-2 bg-brand-gold rounded-full"></span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 sticky top-32">
            <h3 className="text-xl font-bold text-brand-navy mb-2">
              Interested?
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Schedule a viewing for {property.title}.
            </p>

            {formStatus === "success" ? (
              <div className="bg-green-100 text-green-700 p-4 rounded text-center">
                Message Sent! We will contact you soon.
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={contactForm.name}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, name: e.target.value })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:border-brand-navy outline-none"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  value={contactForm.email}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, email: e.target.value })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:border-brand-navy outline-none"
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  required
                  value={contactForm.phone}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, phone: e.target.value })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:border-brand-navy outline-none"
                />
                <textarea
                  rows="3"
                  placeholder="I am interested in this property..."
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, message: e.target.value })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:border-brand-navy outline-none"
                ></textarea>

                <button
                  disabled={formStatus === "sending"}
                  className="w-full bg-brand-navy text-white font-bold py-3 rounded hover:bg-brand-gold transition-colors uppercase text-xs tracking-widest disabled:opacity-50"
                >
                  {formStatus === "sending" ? "Sending..." : "Request Viewing"}
                </button>
                {formStatus === "error" && (
                  <p className="text-red-500 text-xs text-center">
                    Failed to send. Please try again.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
