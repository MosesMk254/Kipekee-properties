import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [unlockForm, setUnlockForm] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    selectedUnit: "",
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

  const handleUnlock = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:5000/api/inquiries", {
        name: unlockForm.name,
        email: unlockForm.email,
        phone: unlockForm.phone,
        message: `[ANALYTICS UNLOCK] User unlocked investment data for: ${property.title}`,
        property_id: property.id,
      });
      setIsUnlocked(true);
    } catch (err) {
      alert("Error unlocking data. Please try again.");
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");

    const finalMessage = contactForm.selectedUnit
      ? `[Interested in: ${contactForm.selectedUnit}] ${contactForm.message}`
      : contactForm.message;

    try {
      await axios.post("http://127.0.0.1:5000/api/inquiries", {
        ...contactForm,
        message: finalMessage,
        property_id: property.id,
      });
      setFormStatus("success");
      setContactForm({
        name: "",
        email: "",
        phone: "",
        message: "",
        selectedUnit: "",
      });
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

  const isSold = property.status === "Sold";
  const priceVal = parseInt(property.price.replace(/[^0-9]/g, "")) || 0;
  const pricePerSqm = property.sqm ? Math.round(priceVal / property.sqm) : 0;

  const getVisualScores = (suitability) => {
    if (suitability === "Investment")
      return { inv: "94%", life: "75%", safe: "88%" };
    if (suitability === "Home Living")
      return { inv: "78%", life: "96%", safe: "94%" };
    return { inv: "90%", life: "92%", safe: "90%" };
  };
  const scores = getVisualScores(property.suitability);

  const generateAnalyticsText = () => {
    const amenitiesText = property.nearby_schools
      ? `including proximity to ${property.nearby_schools}`
      : "including excellent local educational facilities";
    const marketText = property.market_comparison
      ? `This asset is currently ${property.market_comparison.toLowerCase()} compared to the area average.`
      : "This asset is competitively priced for the current market.";
    return `Our proprietary analysis indicates strong fundamentals for this location, ${amenitiesText}. ${marketText} Combined with projected appreciation, this property represents a compelling opportunity for ${property.suitability.toLowerCase()}.`;
  };

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      {/* ... Header and Images (Same as before) ... */}
      <div className="container mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
          <div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-brand-navy mb-2 flex items-center gap-4">
              {property.title}{" "}
              {isSold && (
                <span className="bg-red-600 text-white text-sm px-4 py-1 rounded-full uppercase tracking-wider shadow-lg animate-pulse">
                  Sold
                </span>
              )}
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
            <div
              className={`text-3xl font-bold ${
                isSold ? "text-gray-400 line-through" : "text-brand-gold"
              }`}
            >
              {property.price}
            </div>
            <div
              className={`inline-block text-white text-xs px-3 py-1 rounded uppercase tracking-wider mt-2 ${
                isSold ? "bg-red-600" : "bg-brand-navy"
              }`}
            >
              {property.status}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mb-16">
        <div className="h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl mb-6 relative">
          <img
            src={property.images[activeImage]}
            alt={property.title}
            className={`w-full h-full object-cover ${
              isSold ? "grayscale" : ""
            }`}
          />
          {isSold && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <div className="border-4 border-white p-8 rounded-xl transform -rotate-12">
                <span className="text-6xl font-black text-white uppercase tracking-widest opacity-80">
                  SOLD
                </span>
              </div>
            </div>
          )}
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
                } ${isSold ? "grayscale" : ""}`}
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
          {/* ... Stats & Units (Same as before) ... */}
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
                {property.sqm}
              </div>
              <div className="text-xs uppercase text-gray-400 font-bold tracking-widest">
                SQM
              </div>
            </div>
          </div>

          {property.units && property.units.length > 0 && (
            <div className="mb-12">
              <h3 className="text-xl font-bold text-brand-navy mb-4">
                Available Units
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th className="px-6 py-3">Unit Type</th>
                      <th className="px-6 py-3">Size (SQM)</th>
                      <th className="px-6 py-3">Baths</th>
                      <th className="px-6 py-3">Price</th>
                      <th className="px-6 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {property.units.map((unit) => (
                      <tr key={unit.id} className="bg-white border-b">
                        <td className="px-6 py-4 font-bold text-brand-navy">
                          {unit.type}
                        </td>
                        <td className="px-6 py-4">{unit.size} sqm</td>
                        <td className="px-6 py-4">{unit.baths}</td>
                        <td className="px-6 py-4 text-brand-gold font-bold">
                          {unit.price.trim().startsWith("KES")
                            ? unit.price
                            : `KES ${unit.price}`}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              unit.status === "Sold"
                                ? "bg-red-100 text-red-600"
                                : "bg-green-100 text-green-600"
                            }`}
                          >
                            {unit.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

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

          <div className="mb-12 pt-8 border-t border-gray-100 relative overflow-hidden rounded-2xl">
            {/* ... Analytics (Same as before) ... */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-brand-navy">
                Market Analytics & Investment Data
              </h3>
              <span className="bg-brand-navy text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                Premium
              </span>
            </div>
            <div
              className={`transition-all duration-700 ${
                !isUnlocked
                  ? "filter blur-md select-none pointer-events-none opacity-60"
                  : ""
              }`}
            >
              <div className="mb-6">
                <p className="text-sm text-gray-500 italic border-l-4 border-brand-gold pl-4 py-2 bg-gray-50 rounded-r">
                  {generateAnalyticsText()}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
                    Neighborhood Rating
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-brand-navy">
                          Commute / Access
                        </span>
                        <span className="text-green-600">{scores.inv}</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-green-500 h-full rounded-full"
                          style={{ width: scores.inv }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-brand-navy">Lifestyle Score</span>
                        <span className="text-blue-600">{scores.life}</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-500 h-full rounded-full"
                          style={{ width: scores.life }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-brand-navy">Safety Rating</span>
                        <span className="text-brand-gold">{scores.safe}</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-brand-gold h-full rounded-full"
                          style={{ width: scores.safe }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                    <div className="text-green-800 text-xs font-bold uppercase mb-1">
                      {property.status === "For Rent"
                        ? "Est. Monthly Utilities"
                        : "Proj. Rental Yield"}
                    </div>
                    <div className="text-2xl font-black text-brand-navy">
                      {property.rental_yield || "N/A"}
                    </div>
                    <div className="text-green-600 text-[10px] mt-1 font-bold">
                      {property.status === "For Rent"
                        ? "Water, Elec, WiFi"
                        : "Annual Estimate"}
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <div className="text-blue-800 text-xs font-bold uppercase mb-1">
                      {property.status === "For Rent"
                        ? "Total Move-in Cost"
                        : "Price / SQM"}
                    </div>
                    <div className="text-2xl font-black text-brand-navy">
                      {property.status === "For Rent"
                        ? property.annual_growth || "N/A"
                        : pricePerSqm.toLocaleString()}
                    </div>
                    <div className="text-blue-600 text-[10px] mt-1 font-bold">
                      {property.status === "For Rent"
                        ? "Deposit + 1st Month"
                        : "Based on area avg"}
                    </div>
                  </div>
                  <div className="col-span-2 bg-gray-900 text-white p-4 rounded-xl relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="text-gray-400 text-xs font-bold uppercase mb-1">
                        {property.status === "For Rent"
                          ? "Area Demand Trend"
                          : "5-Year Appreciation"}
                      </div>
                      <div className="text-2xl font-bold">
                        {property.status === "For Rent"
                          ? "High Demand"
                          : property.annual_growth || "N/A"}
                      </div>
                    </div>
                    <div className="absolute bottom-0 right-0 left-0 h-12 flex items-end justify-between px-4 opacity-30 gap-1">
                      <div className="w-full bg-brand-gold h-[30%]"></div>
                      <div className="w-full bg-brand-gold h-[45%]"></div>
                      <div className="w-full bg-brand-gold h-[40%]"></div>
                      <div className="w-full bg-brand-gold h-[60%]"></div>
                      <div className="w-full bg-brand-gold h-[55%]"></div>
                      <div className="w-full bg-brand-gold h-[75%]"></div>
                      <div className="w-full bg-brand-gold h-[90%]"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-brand-navy mb-2 flex items-center text-xs uppercase tracking-wide">
                    <span className="text-lg mr-2">🏫</span> Education
                  </h4>
                  <p className="text-gray-600 text-sm font-medium">
                    {property.nearby_schools ||
                      "Access to top-tier international schools."}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-brand-navy mb-2 flex items-center text-xs uppercase tracking-wide">
                    <span className="text-lg mr-2">🏥</span> Healthcare
                  </h4>
                  <p className="text-gray-600 text-sm font-medium">
                    {property.nearby_hospitals ||
                      "Proximity to major medical centers."}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-brand-navy mb-2 flex items-center text-xs uppercase tracking-wide">
                    <span className="text-lg mr-2">🛒</span> Lifestyle
                  </h4>
                  <p className="text-gray-600 text-sm font-medium">
                    {property.nearby_shopping ||
                      "Walking distance to premium malls."}
                  </p>
                </div>
              </div>
            </div>
            {!isUnlocked && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/10 backdrop-blur-[2px]">
                <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center border border-brand-gold/20 transform scale-100 hover:scale-105 transition-transform duration-300">
                  <div className="w-14 h-14 bg-brand-navy text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
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
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      ></path>
                    </svg>
                  </div>
                  <h4 className="font-heading font-bold text-brand-navy text-xl mb-2">
                    Unlock Investment Analytics
                  </h4>
                  <p className="text-gray-500 text-sm mb-6">
                    Get instant access to rental yields, neighborhood safety
                    scores, appreciation trends, and specific location data.
                  </p>
                  <form onSubmit={handleUnlock} className="space-y-4 text-left">
                    <div>
                      <input
                        type="text"
                        placeholder="Full Name"
                        required
                        value={unlockForm.name}
                        onChange={(e) =>
                          setUnlockForm({ ...unlockForm, name: e.target.value })
                        }
                        className="w-full bg-gray-50 border border-gray-200 p-3 rounded text-sm focus:border-brand-navy outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        required
                        value={unlockForm.email}
                        onChange={(e) =>
                          setUnlockForm({
                            ...unlockForm,
                            email: e.target.value,
                          })
                        }
                        className="w-full bg-gray-50 border border-gray-200 p-3 rounded text-sm focus:border-brand-navy outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Phone Number"
                        required
                        value={unlockForm.phone}
                        onChange={(e) =>
                          setUnlockForm({
                            ...unlockForm,
                            phone: e.target.value,
                          })
                        }
                        className="w-full bg-gray-50 border border-gray-200 p-3 rounded text-sm focus:border-brand-navy outline-none transition-colors"
                      />
                    </div>
                    <button className="w-full bg-brand-gold text-white font-bold py-4 rounded shadow-md uppercase text-xs tracking-widest hover:bg-brand-navy hover:shadow-lg transition-all">
                      Reveal Data
                    </button>
                  </form>
                  <p className="text-[10px] text-gray-400 mt-4">
                    We respect your privacy. No spam.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 sticky top-32">
            {isSold ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Off Market
                </h3>
                <p className="text-gray-500 text-sm">
                  This property has been sold and is no longer available for
                  viewings.
                </p>
                <button
                  onClick={() => window.history.back()}
                  className="mt-6 text-brand-gold font-bold text-sm uppercase tracking-wider hover:underline"
                >
                  Browse other Properties
                </button>
              </div>
            ) : (
              <>
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
                        setContactForm({
                          ...contactForm,
                          email: e.target.value,
                        })
                      }
                      className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:border-brand-navy outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Phone Number"
                      required
                      value={contactForm.phone}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          phone: e.target.value,
                        })
                      }
                      className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:border-brand-navy outline-none"
                    />

                    {/* FIX: Filter Sold Units */}
                    {property.units && property.units.length > 1 && (
                      <select
                        value={contactForm.selectedUnit}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            selectedUnit: e.target.value,
                          })
                        }
                        className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:border-brand-navy outline-none"
                      >
                        <option value="">
                          Select Interested Unit (Optional)
                        </option>
                        {property.units
                          .filter((u) => u.status === "Available")
                          .map((u) => (
                            <option key={u.id} value={u.type}>
                              {u.type} - {u.price}
                            </option>
                          ))}
                      </select>
                    )}

                    <textarea
                      rows="3"
                      placeholder="I am interested in this property..."
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          message: e.target.value,
                        })
                      }
                      className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:border-brand-navy outline-none"
                    ></textarea>
                    <button
                      disabled={formStatus === "sending"}
                      className="w-full bg-brand-navy text-white font-bold py-3 rounded hover:bg-brand-gold transition-colors uppercase text-xs tracking-widest disabled:opacity-50"
                    >
                      {formStatus === "sending"
                        ? "Sending..."
                        : "Request Viewing"}
                    </button>
                    {formStatus === "error" && (
                      <p className="text-red-500 text-xs text-center">
                        Failed to send. Please try again.
                      </p>
                    )}
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
