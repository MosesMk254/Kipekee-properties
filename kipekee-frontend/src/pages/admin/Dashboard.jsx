import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardHome from "./DashboardHome";
import DashboardTestimonials from "./DashboardTestimonials";

const Dashboard = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [inboxFilter, setInboxFilter] = useState("All");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [expandedPropertyId, setExpandedPropertyId] = useState(null);

  const [profileData, setProfileData] = useState({
    email: "",
    current_password: "",
    new_password: "",
  });

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "",
    type: "Villa",
    status: "For Sale",
    construction_status: "Ready",
    suitability: "Home Living",
    beds: "",
    baths: "",
    sqm: "",
    description: "",
    nearby_schools: "",
    nearby_hospitals: "",
    nearby_shopping: "",
    rental_yield: "",
    annual_growth: "",
    analytics_text: "",
    is_featured: false,
  });

  const [units, setUnits] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  const allAmenities = [
    "Swimming Pool",
    "Gym",
    "Garden",
    "CCTV",
    "Backup Generator",
    "High Speed Internet",
    "Parking",
  ];

  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) navigate("/login");
    fetchProperties();
    fetchInquiries();
    fetchTestimonials();
    fetchSubscribers();
  }, [navigate]);

  const fetchProperties = async () => {
    try {
      const res = await axios.get(
        "https://api.rutererealty.com/api/properties",
      );
      setProperties(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchInquiries = async () => {
    try {
      const res = await axios.get("https://api.rutererealty.com/api/inquiries");
      setInquiries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(
        "https://api.rutererealty.com/api/testimonials",
      );
      setTestimonials(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSubscribers = async () => {
    try {
      const res = await axios.get(
        "https://api.rutererealty.com/api/subscribers",
      );
      setSubscribers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const updatedInquiries = inquiries.map((msg) =>
        msg.id === id ? { ...msg, status: newStatus } : msg,
      );
      setInquiries(updatedInquiries);
      await axios.put(`https://api.rutererealty.com/api/inquiries/${id}`, {
        status: newStatus,
      });
    } catch (err) {
      console.error("Failed to update status");
      fetchInquiries();
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "https://api.rutererealty.com/api/admin/update",
        profileData,
      );
      alert("Profile Updated Successfully. Please login again.");
      localStorage.removeItem("isAdmin");
      navigate("/login");
    } catch (err) {
      alert("Failed to update profile. Check your current password.");
    }
  };

  const handleLiveStatusUpdate = async (id, newStatus) => {
    const updatedProperties = properties.map((p) =>
      p.id === id ? { ...p, status: newStatus } : p,
    );
    setProperties(updatedProperties);
    try {
      await axios.patch(
        `https://api.rutererealty.com/api/properties/${id}/status`,
        { status: newStatus },
      );
    } catch (err) {
      alert("Error updating status");
      fetchProperties();
    }
  };

  const handleLiveConstructionStatusUpdate = async (id, newStatus) => {
    const updatedProperties = properties.map((p) =>
      p.id === id ? { ...p, construction_status: newStatus } : p,
    );
    setProperties(updatedProperties);
    try {
      await axios.patch(
        `https://api.rutererealty.com/api/properties/${id}/status`,
        { construction_status: newStatus },
      );
    } catch (err) {
      alert("Error updating construction status");
      fetchProperties();
    }
  };

  const handleUnitStatusChange = async (unitId, newStatus) => {
    try {
      const updatedProperties = properties.map((prop) => {
        if (!prop.units) return prop;
        return {
          ...prop,
          units: prop.units.map((u) =>
            u.id === unitId ? { ...u, status: newStatus } : u,
          ),
        };
      });
      setProperties(updatedProperties);

      await axios.patch(
        `https://api.rutererealty.com/api/units/${unitId}/status`,
        { status: newStatus },
      );
    } catch (err) {
      alert("Error updating unit status");
      fetchProperties();
    }
  };

  const handleDeleteSubscriber = async (id) => {
    if (window.confirm("Remove this subscriber?")) {
      try {
        await axios.delete(
          `https://api.rutererealty.com/api/subscribers/${id}`,
        );
        fetchSubscribers();
      } catch (err) {
        alert("Failed to delete");
      }
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

  const addUnitField = () => {
    setUnits([
      ...units,
      { type: "", price: "", size: "", beds: "", baths: "" },
    ]);
  };

  const handleUnitChange = (index, field, value) => {
    const newUnits = units.map((unit, i) =>
      i === index ? { ...unit, [field]: value } : unit,
    );
    setUnits(newUnits);
  };

  const removeUnitField = (index) => {
    setUnits(units.filter((_, i) => i !== index));
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

  const handleEdit = (property) => {
    setIsEditing(true);
    setEditId(property.id);
    setFormData({
      title: property.title,
      price: property.price,
      location: property.location,
      type: property.type,
      status: property.status,
      construction_status: property.construction_status || "Ready",
      suitability: property.suitability,
      beds: property.beds,
      baths: property.baths,
      sqm: property.sqm,
      description: property.description,
      nearby_schools: property.nearby_schools,
      nearby_hospitals: property.nearby_hospitals,
      nearby_shopping: property.nearby_shopping,
      rental_yield: property.rental_yield,
      annual_growth: property.annual_growth,
      analytics_text: property.analytics_text || "",
      is_featured: property.is_featured,
    });

    const cleanPrice = (p) => p?.toString().replace(/[^0-9]/g, "") || "";

    if (property.units) {
      const basePrice = cleanPrice(property.price);
      const baseSqm = property.sqm;
      let baseUnitFound = false;

      const variants = property.units.filter((u) => {
        const isBase = cleanPrice(u.price) === basePrice && u.size === baseSqm;
        if (isBase && !baseUnitFound) {
          baseUnitFound = true;
          return false;
        }
        return true;
      });

      setUnits(
        variants.map((u) => ({
          type: u.type,
          price: u.price,
          size: u.size,
          beds: u.beds,
          baths: u.baths || "",
        })),
      );
    } else {
      setUnits([]);
    }
    setSelectedAmenities(property.amenities || []);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({
      title: "",
      price: "",
      location: "",
      type: "Villa",
      status: "For Sale",
      construction_status: "Ready",
      suitability: "Home Living",
      beds: "",
      baths: "",
      sqm: "",
      description: "",
      nearby_schools: "",
      nearby_hospitals: "",
      nearby_shopping: "",
      rental_yield: "",
      annual_growth: "",
      analytics_text: "",
      is_featured: false,
    });
    setUnits([]);
    setSelectedAmenities([]);
    setImageFiles([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEditing && imageFiles.length === 0)
      return alert("Please upload at least one image!");

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "price") {
        data.append(key, `KES ${formData[key]}`);
      } else {
        data.append(key, formData[key]);
      }
    });
    data.append("amenities", selectedAmenities.join(","));

    for (let i = 0; i < imageFiles.length; i++) {
      data.append("images", imageFiles[i]);
    }

    units.forEach((unit) => {
      data.append("unit_types", unit.type);
      data.append("unit_prices", unit.price);
      data.append("unit_sizes", unit.size);
      data.append("unit_beds", unit.beds);
      data.append("unit_baths", unit.baths);
    });

    try {
      if (isEditing) {
        await axios.put(
          `https://api.rutererealty.com/api/properties/${editId}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } },
        );
        alert("Property Updated Successfully!");
      } else {
        await axios.post("https://api.rutererealty.com/api/properties", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Property Listed Successfully!");
      }
      fetchProperties();
      cancelEdit();
    } catch (err) {
      alert("Error saving property");
    }
  };

  const handleDeleteProperty = async (id) => {
    if (window.confirm("Delete this property?")) {
      await axios.delete(`https://api.rutererealty.com/api/properties/${id}`);
      fetchProperties();
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (window.confirm("Delete this message?")) {
      await axios.delete(`https://api.rutererealty.com/api/inquiries/${id}`);
      fetchInquiries();
    }
  };

  // --- REFINED FILTER LOGIC ---
  const filteredInquiries = inquiries.filter((msg) => {
    if (inboxFilter === "All") return true;
    const rawSubject = msg.subject || "General Inquiry";
    const subject = rawSubject.toLowerCase();

    if (inboxFilter === "General")
      return subject.includes("general") || subject.includes("contact");
    if (inboxFilter === "Buying/Viewings")
      return (
        subject.includes("buying") ||
        subject.includes("viewing") ||
        subject.includes("request")
      );
    if (inboxFilter === "Investment")
      return (
        subject.includes("investment") ||
        subject.includes("analytics") ||
        subject.includes("data")
      );
    if (inboxFilter === "Selling")
      return subject.includes("selling") || subject.includes("sale");
    if (inboxFilter === "Partnership") return subject.includes("partnership");

    return false;
  });

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <div className="bg-brand-navy text-white p-6 shadow-lg flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-bold font-heading">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-300">Welcome, Admin</span>
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
        <div className="flex gap-4 border-b border-gray-300 pb-4 overflow-x-auto">
          {["overview", "properties", "inbox", "subscribers", "settings"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all whitespace-nowrap capitalize ${
                  activeTab === tab
                    ? "bg-brand-navy text-white shadow-lg"
                    : "bg-white text-gray-500 hover:bg-gray-200"
                }`}
              >
                {tab}{" "}
                {tab === "inbox" && inquiries.length > 0 && (
                  <span className="ml-2 bg-brand-gold text-brand-navy px-2 py-0.5 rounded-full text-xs">
                    {inquiries.length}
                  </span>
                )}
              </button>
            ),
          )}
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
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-brand-navy">
                {isEditing ? "Edit Property" : "List New Property"}
              </h2>
              {isEditing && (
                <button
                  onClick={cancelEdit}
                  className="text-sm text-red-500 font-bold underline"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center bg-gray-50">
                <label className="block text-sm font-bold text-gray-400 uppercase mb-2">
                  Property Gallery {isEditing && "(Upload to Append/Replace)"}
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="w-full text-sm text-gray-500"
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
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="group">
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                    Market Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="border p-3 rounded w-full focus:outline-none text-sm"
                  >
                    {["For Sale", "For Rent"].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {formData.status === "For Sale" && (
                  <div className="group">
                    <label className="block text-xs font-bold text-brand-navy uppercase mb-2">
                      Project Phase
                    </label>
                    <select
                      name="construction_status"
                      value={formData.construction_status}
                      onChange={handleInputChange}
                      className="border p-3 rounded w-full focus:outline-none text-sm bg-blue-50 border-blue-200 text-brand-navy font-bold"
                    >
                      {["Off-plan", "Ongoing", "Ready"].map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="group">
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                    Classification
                  </label>
                  <select
                    name="suitability"
                    value={formData.suitability}
                    onChange={handleInputChange}
                    className="border p-3 rounded w-full focus:outline-none text-sm"
                  >
                    {[
                      "Home Living",
                      "Investment",
                      "Investment & Home Living",
                    ].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                  Base Price
                </label>
                <div className="relative w-full">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 pointer-events-none">
                    KES
                  </span>
                  <input
                    type="text"
                    name="price"
                    placeholder="10,000,000"
                    value={formData.price}
                    onChange={(e) => {
                      const digitsOnly = e.target.value.replace(/[^\d]/g, "");
                      const formatted = digitsOnly.replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ",",
                      );
                      setFormData({ ...formData, price: formatted });
                    }}
                    className="border p-3 pl-12 rounded w-full focus:outline-none font-bold text-brand-navy"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="border p-3 rounded w-full focus:outline-none"
                  required
                />
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="border p-3 rounded w-full focus:outline-none"
                >
                  {["Villa", "Apartment", "Penthouse", "Land"].map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleInputChange}
                className="border p-3 rounded w-full focus:outline-none"
                required
              />

              <div className="bg-blue-50 p-6 rounded border border-blue-100 mb-4">
                <h4 className="font-bold text-brand-navy text-sm uppercase mb-4">
                  Property Configuration
                </h4>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <input
                    type="number"
                    name="beds"
                    placeholder="Beds"
                    value={formData.beds}
                    onChange={handleInputChange}
                    className="border p-3 rounded text-sm focus:outline-none"
                  />
                  <input
                    type="number"
                    name="baths"
                    placeholder="Baths"
                    value={formData.baths}
                    onChange={handleInputChange}
                    className="border p-3 rounded text-sm focus:outline-none"
                  />
                  <input
                    type="number"
                    name="sqm"
                    placeholder="SQM"
                    value={formData.sqm}
                    onChange={handleInputChange}
                    className="border p-3 rounded text-sm focus:outline-none"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-bold text-gray-400 uppercase">
                    Multiple Units (Optional)
                  </label>
                  {units.map((unit, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Type (e.g. 1 Bed)"
                        value={unit.type}
                        onChange={(e) =>
                          handleUnitChange(index, "type", e.target.value)
                        }
                        className="border p-2 rounded text-xs w-1/4 focus:outline-none"
                      />
                      <div className="relative w-1/4">
                        <span className="absolute left-2 top-2 text-[10px] font-bold text-gray-400">
                          KES
                        </span>
                        <input
                          type="text"
                          placeholder="Price"
                          value={unit.price}
                          onChange={(e) =>
                            handleUnitChange(index, "price", e.target.value)
                          }
                          className="border p-2 pl-8 rounded text-xs w-full focus:outline-none"
                        />
                      </div>
                      <input
                        type="number"
                        placeholder="SQM"
                        value={unit.size}
                        onChange={(e) =>
                          handleUnitChange(index, "size", e.target.value)
                        }
                        className="border p-2 rounded text-xs w-1/6 focus:outline-none"
                      />
                      <input
                        type="number"
                        placeholder="Bed"
                        value={unit.beds}
                        onChange={(e) =>
                          handleUnitChange(index, "beds", e.target.value)
                        }
                        className="border p-2 rounded text-xs w-1/6 focus:outline-none"
                      />
                      <input
                        type="number"
                        placeholder="Bath"
                        value={unit.baths}
                        onChange={(e) =>
                          handleUnitChange(index, "baths", e.target.value)
                        }
                        className="border p-2 rounded text-xs w-1/6 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => removeUnitField(index)}
                        className="text-red-500 font-bold text-lg"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addUnitField}
                    className="text-xs font-bold text-brand-navy border border-brand-navy px-3 py-2 rounded border-dashed hover:bg-brand-navy hover:text-white transition"
                  >
                    + Add Unit Variant
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded border border-gray-200 space-y-4">
                <h4 className="font-bold text-brand-navy text-sm uppercase">
                  Investment Analysis (Gated Data)
                </h4>
                <textarea
                  name="analytics_text"
                  placeholder="Write your own market analysis..."
                  value={formData.analytics_text}
                  onChange={handleInputChange}
                  className="border p-3 rounded w-full text-sm focus:outline-none h-24"
                ></textarea>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    name="rental_yield"
                    placeholder="Rental Yield / Est. Utilities"
                    value={formData.rental_yield}
                    onChange={handleInputChange}
                    className="border p-3 rounded w-full text-sm focus:outline-none"
                  />
                  <input
                    type="text"
                    name="annual_growth"
                    placeholder="Appreciation / Move-in Cost"
                    value={formData.annual_growth}
                    onChange={handleInputChange}
                    className="border p-3 rounded w-full text-sm focus:outline-none"
                  />
                </div>
                <input
                  type="text"
                  name="nearby_schools"
                  placeholder="Nearby Schools"
                  value={formData.nearby_schools}
                  onChange={handleInputChange}
                  className="border p-3 rounded w-full text-sm focus:outline-none"
                />
                <input
                  type="text"
                  name="nearby_hospitals"
                  placeholder="Nearby Hospitals"
                  value={formData.nearby_hospitals}
                  onChange={handleInputChange}
                  className="border p-3 rounded w-full text-sm focus:outline-none"
                />
                <input
                  type="text"
                  name="nearby_shopping"
                  placeholder="Nearby Shopping"
                  value={formData.nearby_shopping}
                  onChange={handleInputChange}
                  className="border p-3 rounded w-full text-sm focus:outline-none"
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
                className="border p-3 rounded w-full h-24 focus:outline-none"
                required
              ></textarea>
              <button className="w-full bg-brand-gold text-white font-bold py-4 rounded hover:bg-yellow-600 transition shadow-lg uppercase text-sm tracking-widest">
                {isEditing ? "Update Listing" : "Publish Listing"}
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
                  className={`bg-white p-4 rounded-xl shadow-md border hover:shadow-lg transition block ${isEditing && editId === prop.id ? "border-brand-gold ring-1 ring-brand-gold" : "border-gray-100"}`}
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={prop.images[0]}
                      alt={prop.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-brand-navy">
                        {prop.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-brand-navy font-bold text-sm">
                          {prop.price}
                        </p>
                        <span className="text-[10px] px-2 py-0.5 bg-gray-100 rounded text-gray-600 border">
                          {prop.suitability}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center gap-2 flex-wrap">
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] uppercase font-bold text-gray-400">
                            Status:
                          </span>
                          <select
                            value={prop.status}
                            onChange={(e) =>
                              handleLiveStatusUpdate(prop.id, e.target.value)
                            }
                            className="text-xs font-bold border rounded px-2 py-1 cursor-pointer outline-none bg-blue-50 text-brand-navy border-blue-200"
                          >
                            {[
                              "For Sale",
                              "For Rent",
                              "Sold",
                              "Rented",
                              "Back on Market",
                              "Off Market",
                            ].map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>

                        {prop.status === "For Sale" && (
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] uppercase font-bold text-gray-400">
                              Phase:
                            </span>
                            <select
                              value={prop.construction_status || "Ready"}
                              onChange={(e) =>
                                handleLiveConstructionStatusUpdate(
                                  prop.id,
                                  e.target.value,
                                )
                              }
                              className="text-xs font-bold border rounded px-2 py-1 cursor-pointer outline-none bg-gray-100 text-gray-600 border-gray-200"
                            >
                              <option value="Off-plan">Off-plan</option>
                              <option value="Ongoing">Ongoing</option>
                              <option value="Ready">Ready</option>
                            </select>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleEdit(prop)}
                        className="text-brand-navy border border-brand-navy font-bold text-xs uppercase px-3 py-2 rounded hover:bg-brand-navy hover:text-white transition"
                      >
                        Edit
                      </button>

                      {prop.units && prop.units.length > 0 && (
                        <button
                          onClick={() =>
                            setExpandedPropertyId(
                              expandedPropertyId === prop.id ? null : prop.id,
                            )
                          }
                          className="text-purple-600 border border-purple-200 font-bold text-xs uppercase px-3 py-2 rounded hover:bg-purple-600 hover:text-white transition"
                        >
                          {expandedPropertyId === prop.id
                            ? "Hide Units"
                            : "Manage Units"}
                        </button>
                      )}

                      <button
                        onClick={() => handleDeleteProperty(prop.id)}
                        className="text-red-500 hover:text-white hover:bg-red-500 border border-red-200 font-bold text-xs uppercase px-3 py-2 rounded transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {expandedPropertyId === prop.id && prop.units && (
                    <div className="mt-4 pt-4 border-t border-gray-100 bg-gray-50 rounded-lg p-3">
                      <h5 className="text-xs font-bold text-gray-400 uppercase mb-2">
                        Unit Inventory
                      </h5>
                      <div className="space-y-2">
                        {prop.units.map((unit) => (
                          <div
                            key={unit.id}
                            className="flex justify-between items-center bg-white p-2 rounded border border-gray-200 shadow-sm"
                          >
                            <div>
                              <span className="font-bold text-brand-navy text-sm block">
                                {unit.type}
                              </span>
                              <span className="text-xs text-gray-500">
                                {unit.price} • {unit.size} sqm
                              </span>
                            </div>

                            <select
                              value={unit.status}
                              onChange={(e) =>
                                handleUnitStatusChange(unit.id, e.target.value)
                              }
                              className={`text-xs font-bold px-2 py-1 rounded border outline-none cursor-pointer ${
                                ["Sold", "Rented"].includes(unit.status)
                                  ? "bg-red-100 text-red-600 border-red-200"
                                  : "bg-green-100 text-green-600 border-green-200"
                              }`}
                            >
                              <option value="Available">Available</option>
                              {prop.status === "For Rent" ? (
                                <option value="Rented">Rented</option>
                              ) : (
                                <option value="Sold">Sold</option>
                              )}
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "inbox" && (
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="bg-white rounded-xl shadow-lg p-8 min-h-[600px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-brand-navy">
                Customer Inquiries
              </h2>
            </div>

            <div className="flex gap-2 mb-6 border-b border-gray-100 pb-2 overflow-x-auto">
              {[
                "All",
                "General",
                "Buying/Viewings",
                "Investment",
                "Selling",
                "Partnership",
              ].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setInboxFilter(filter)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                    inboxFilter === filter
                      ? "bg-brand-navy text-white"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-brand-navy uppercase bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Client Details
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Subject / Property
                    </th>
                    <th scope="col" className="px-6 py-4 w-1/3">
                      Message
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-4 text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInquiries.length > 0 ? (
                    filteredInquiries.map((msg) => {
                      const relatedProperty = properties.find(
                        (p) => p.id === msg.property_id,
                      );
                      return (
                        <tr
                          key={msg.id}
                          className="bg-white border-b hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap font-medium">
                            {new Date(msg.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-brand-navy">
                              {msg.name}
                            </div>
                            <div className="text-xs text-gray-400">
                              {msg.email}
                            </div>
                            <div className="text-xs text-gray-400">
                              {msg.phone}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`block font-bold text-xs uppercase tracking-wide mb-1 ${
                                (msg.subject || "").includes("Investment")
                                  ? "text-green-600"
                                  : (msg.subject || "").includes("Buying") ||
                                      (msg.subject || "").includes("Viewing")
                                    ? "text-purple-600"
                                    : "text-brand-gold"
                              }`}
                            >
                              {msg.subject || "General Inquiry"}
                            </span>
                            {msg.property_id && (
                              <span className="bg-blue-50 text-brand-navy text-[10px] font-bold px-2 py-1 rounded border border-blue-100 inline-block truncate max-w-[150px]">
                                Re:{" "}
                                {relatedProperty
                                  ? relatedProperty.title
                                  : `#${msg.property_id}`}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="max-h-20 overflow-y-auto custom-scrollbar text-xs leading-relaxed text-gray-600">
                              {msg.message}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={msg.status || "New"}
                              onChange={(e) =>
                                handleStatusChange(msg.id, e.target.value)
                              }
                              className={`text-xs font-bold px-3 py-1 rounded-full border cursor-pointer outline-none appearance-none ${getStatusColor(msg.status || "New")}`}
                            >
                              <option value="New">● New</option>
                              <option value="Contacted">● Contacted</option>
                              <option value="Viewing">● Viewing</option>
                              <option value="Closed">● Closed</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => handleDeleteInquiry(msg.id)}
                              className="text-red-500 hover:text-red-700 font-bold text-xs uppercase tracking-wider"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-10 text-gray-400"
                      >
                        No messages found in this category.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "subscribers" && (
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-white rounded-xl shadow-lg p-8 min-h-[600px]">
            <h2 className="text-2xl font-bold text-brand-navy mb-6">
              Newsletter Subscribers
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-brand-navy uppercase bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Date Joined
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Email Address
                    </th>
                    <th scope="col" className="px-6 py-4 text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.length > 0 ? (
                    subscribers.map((sub) => (
                      <tr
                        key={sub.id}
                        className="bg-white border-b hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 font-medium">
                          {new Date(sub.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-700">
                          {sub.email}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleDeleteSubscriber(sub.id)}
                            className="text-red-500 hover:text-red-700 font-bold text-xs uppercase tracking-wider"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="text-center py-10 text-gray-400"
                      >
                        No subscribers yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "testimonials" && (
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-brand-navy mb-6">
            Manage Reviews
          </h2>
          <DashboardTestimonials
            testimonials={testimonials}
            fetchTestimonials={fetchTestimonials}
          />
        </div>
      )}

      {activeTab === "settings" && (
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-brand-navy mb-6">
              Account Settings
            </h2>
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  New Email Address
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                  className="w-full border border-gray-300 p-3 rounded"
                  placeholder="admin@rutere.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={profileData.current_password}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      current_password: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 p-3 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={profileData.new_password}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      new_password: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 p-3 rounded"
                />
              </div>
              <button className="w-full bg-brand-navy text-white font-bold py-4 rounded hover:bg-brand-gold transition shadow-lg uppercase text-sm tracking-widest">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
