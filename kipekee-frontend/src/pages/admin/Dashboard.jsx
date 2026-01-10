import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardHome from "./DashboardHome";

const Dashboard = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "",
    type: "Villa",
    status: "For Sale",
    beds: "",
    baths: "",
    sqft: "",
    description: "",
    is_featured: false,
  });

  const allAmenities = [
    "Swimming Pool",
    "Gym",
    "Garden",
    "CCTV",
    "Backup Generator",
    "High Speed Internet",
    "Parking",
  ];
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) navigate("/login");
    fetchProperties();
    fetchInquiries();
  }, [navigate]);

  const fetchProperties = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/api/properties");
      setProperties(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchInquiries = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/api/inquiries");
      setInquiries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const updatedInquiries = inquiries.map((msg) =>
        msg.id === id ? { ...msg, status: newStatus } : msg
      );
      setInquiries(updatedInquiries);
      await axios.put(`http://127.0.0.1:5000/api/inquiries/${id}`, {
        status: newStatus,
      });
    } catch (err) {
      console.error("Failed to update status");
      fetchInquiries();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Contacted":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Viewing":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Closed":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleInputChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleAmenityChange = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleFileChange = (e) => {
    setImageFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageFiles.length === 0)
      return alert("Please upload at least one image!");

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    data.append("amenities", selectedAmenities.join(","));

    for (let i = 0; i < imageFiles.length; i++) {
      data.append("images", imageFiles[i]);
    }

    try {
      await axios.post("http://127.0.0.1:5000/api/properties", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Property Listed Successfully!");
      fetchProperties();
      setFormData({
        title: "",
        price: "",
        location: "",
        type: "Villa",
        status: "For Sale",
        beds: "",
        baths: "",
        sqft: "",
        description: "",
        is_featured: false,
      });
      setSelectedAmenities([]);
      setImageFiles([]);
    } catch (err) {
      alert("Error adding property");
    }
  };

  const handleDeleteProperty = async (id) => {
    if (window.confirm("Delete this property?")) {
      await axios.delete(`http://127.0.0.1:5000/api/properties/${id}`);
      fetchProperties();
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (window.confirm("Delete this message?")) {
      await axios.delete(`http://127.0.0.1:5000/api/inquiries/${id}`);
      fetchInquiries();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <div className="bg-brand-navy text-white p-6 shadow-lg flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-bold font-heading">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-300">Welcome, Sarah</span>
          <button
            onClick={() => {
              localStorage.removeItem("isAdmin");
              navigate("/login");
            }}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm font-bold transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-8 mb-8">
        <div className="flex gap-4 border-b border-gray-300 pb-4">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
              activeTab === "overview"
                ? "bg-brand-navy text-white shadow-lg"
                : "bg-white text-gray-500 hover:bg-gray-200"
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => setActiveTab("properties")}
            className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
              activeTab === "properties"
                ? "bg-brand-navy text-white shadow-lg"
                : "bg-white text-gray-500 hover:bg-gray-200"
            }`}
          >
            Manage Properties
          </button>

          <button
            onClick={() => {
              setActiveTab("inbox");
              fetchInquiries();
            }}
            className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
              activeTab === "inbox"
                ? "bg-brand-navy text-white shadow-lg"
                : "bg-white text-gray-500 hover:bg-gray-200"
            }`}
          >
            Inbox{" "}
            <span className="ml-2 bg-brand-gold text-brand-navy px-2 py-0.5 rounded-full text-xs">
              {inquiries.length}
            </span>
          </button>
        </div>
      </div>

      {activeTab === "overview" && (
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-brand-navy mb-6">
            Business Overview
          </h2>
          <DashboardHome properties={properties} inquiries={inquiries} />
        </div>
      )}

      {activeTab === "properties" && (
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-xl shadow-lg h-fit">
            <h2 className="text-2xl font-bold text-brand-navy mb-6">
              List New Property
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center bg-gray-50">
                <label className="block text-sm font-bold text-gray-400 uppercase mb-2">
                  Property Gallery
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-brand-navy file:text-white hover:file:bg-brand-gold"
                  accept="image/*"
                />
              </div>

              <div className="flex justify-between items-center bg-gray-50 p-4 rounded border border-gray-100">
                <label className="flex items-center space-x-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="is_featured"
                    checked={formData.is_featured}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-brand-gold rounded focus:ring-brand-gold"
                  />
                  <span className="font-bold text-brand-navy text-sm">
                    Mark as Featured
                  </span>
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="border p-2 rounded font-bold text-sm bg-white text-brand-navy outline-none focus:border-brand-gold"
                >
                  <option value="For Sale">For Sale</option>
                  <option value="For Rent">For Rent</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="border p-3 rounded w-full focus:outline-none focus:border-brand-gold"
                  required
                />
                <input
                  type="text"
                  name="price"
                  placeholder="Price (e.g. KES 50M)"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="border p-3 rounded w-full focus:outline-none focus:border-brand-gold"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="border p-3 rounded w-full focus:outline-none focus:border-brand-gold"
                  required
                />
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="border p-3 rounded w-full focus:outline-none focus:border-brand-gold"
                >
                  <option>Villa</option>
                  <option>Apartment</option>
                  <option>Penthouse</option>
                  <option>Land</option>
                </select>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="number"
                  name="beds"
                  placeholder="Beds"
                  value={formData.beds}
                  onChange={handleInputChange}
                  className="border p-3 rounded focus:outline-none focus:border-brand-gold"
                />
                <input
                  type="number"
                  name="baths"
                  placeholder="Baths"
                  value={formData.baths}
                  onChange={handleInputChange}
                  className="border p-3 rounded focus:outline-none focus:border-brand-gold"
                />
                <input
                  type="number"
                  name="sqft"
                  placeholder="Sqft"
                  value={formData.sqft}
                  onChange={handleInputChange}
                  className="border p-3 rounded focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                  Amenities
                </label>
                <div className="grid grid-cols-2 gap-2 bg-gray-50 p-4 rounded border border-gray-100">
                  {allAmenities.map((amenity) => (
                    <label
                      key={amenity}
                      className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes(amenity)}
                        onChange={() => handleAmenityChange(amenity)}
                        className="rounded text-brand-navy focus:ring-0"
                      />
                      <span>{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              <textarea
                name="description"
                placeholder="Description..."
                value={formData.description}
                onChange={handleInputChange}
                className="border p-3 rounded w-full h-24 focus:outline-none focus:border-brand-gold"
                required
              ></textarea>

              <button className="w-full bg-brand-gold text-white font-bold py-4 rounded hover:bg-yellow-600 transition shadow-lg uppercase text-sm tracking-widest">
                Publish Listing
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-brand-navy mb-6">
              Current Portfolio
            </h2>
            <div className="max-h-[800px] overflow-y-auto pr-2 custom-scrollbar space-y-4">
              {properties.map((prop) => (
                <div
                  key={prop.id}
                  className="bg-white p-4 rounded-xl shadow-md flex gap-4 items-center border border-gray-100 hover:shadow-lg transition"
                >
                  <img
                    src={prop.images[0]}
                    alt={prop.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-brand-navy">{prop.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">
                        {prop.location}
                      </span>
                      {prop.is_featured && (
                        <span className="bg-brand-gold text-white text-[10px] px-2 py-0.5 rounded uppercase font-bold">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-brand-navy font-bold text-sm mt-1">
                      {prop.price}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteProperty(prop.id)}
                    className="text-red-500 hover:text-white hover:bg-red-500 border border-red-200 font-bold text-xs uppercase px-3 py-2 rounded transition"
                  >
                    Delete
                  </button>
                </div>
              ))}
              {properties.length === 0 && (
                <p className="text-gray-400 text-center py-10">
                  No properties listed yet.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "inbox" && (
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-white rounded-xl shadow-lg p-8 min-h-[400px]">
            <h2 className="text-2xl font-bold text-brand-navy mb-8">
              Customer Inquiries
            </h2>
            <div className="space-y-6">
              {inquiries.map((msg) => {
                const relatedProperty = properties.find(
                  (p) => p.id === msg.property_id
                );

                return (
                  <div
                    key={msg.id}
                    className={`border-b border-gray-100 pb-6 last:border-0 hover:bg-gray-50 p-4 rounded transition border-l-4 ${
                      msg.status === "New"
                        ? "border-l-blue-500"
                        : msg.status === "Contacted"
                        ? "border-l-yellow-500"
                        : msg.status === "Closed"
                        ? "border-l-green-500"
                        : "border-l-transparent"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center gap-3">
                          <h4 className="font-bold text-brand-navy text-lg">
                            {msg.name}
                          </h4>
                          <select
                            value={msg.status || "New"}
                            onChange={(e) =>
                              handleStatusChange(msg.id, e.target.value)
                            }
                            className={`text-xs font-bold px-3 py-1 rounded-full border cursor-pointer outline-none appearance-none ${getStatusColor(
                              msg.status || "New"
                            )}`}
                          >
                            <option value="New">● New</option>
                            <option value="Contacted">● Contacted</option>
                            <option value="Viewing">● Viewing</option>
                            <option value="Closed">● Closed</option>
                          </select>
                        </div>
                        <div className="mt-1">
                          <a
                            href={`mailto:${msg.email}`}
                            className="text-sm text-gray-500 hover:text-brand-gold"
                          >
                            {msg.email}
                          </a>
                          <span className="text-gray-300 mx-2">|</span>
                          <span className="text-sm text-gray-500">
                            {msg.phone}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 font-medium bg-gray-100 px-2 py-1 rounded">
                        {new Date(msg.created_at).toLocaleString("en-KE", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-100 text-sm leading-relaxed mb-3 mt-2">
                      {msg.message}
                    </p>

                    <div className="flex justify-between items-center mt-2">
                      {msg.property_id ? (
                        <span className="text-xs font-bold text-brand-navy bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                          Re:{" "}
                          {relatedProperty
                            ? relatedProperty.title
                            : `Property #${msg.property_id}`}
                        </span>
                      ) : (
                        <span></span>
                      )}

                      <div className="flex gap-4">
                        <a
                          href={`mailto:${msg.email}`}
                          className="text-xs font-bold text-brand-navy border border-brand-navy px-4 py-2 rounded hover:bg-brand-navy hover:text-white transition uppercase tracking-wider"
                        >
                          Reply
                        </a>
                        <button
                          onClick={() => handleDeleteInquiry(msg.id)}
                          className="text-xs font-bold text-red-500 border border-red-200 px-4 py-2 rounded hover:bg-red-500 hover:text-white transition uppercase tracking-wider"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              {inquiries.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                  <svg
                    className="w-16 h-16 mb-4 opacity-20"
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
                  <p>No new messages.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
