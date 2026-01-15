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
    market_comparison: "",
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

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) navigate("/login");
    fetchProperties();
    fetchInquiries();
    fetchTestimonials();
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

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/api/testimonials");
      setTestimonials(res.data);
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

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://127.0.0.1:5000/api/admin/update", profileData);
      alert("Profile Updated Successfully. Please login again.");
      localStorage.removeItem("isAdmin");
      navigate("/login");
    } catch (err) {
      alert("Failed to update profile. Check your current password.");
    }
  };

  const handleLiveStatusUpdate = async (id, newStatus) => {
    const updatedProperties = properties.map((p) =>
      p.id === id ? { ...p, status: newStatus } : p
    );
    setProperties(updatedProperties);
    try {
      await axios.patch(`http://127.0.0.1:5000/api/properties/${id}/status`, {
        status: newStatus,
      });
    } catch (err) {
      alert("Error updating status");
      fetchProperties();
    }
  };

  const handleUnitStatusChange = async (unitId, newStatus) => {
    try {
      await axios.patch(`http://127.0.0.1:5000/api/units/${unitId}/status`, {
        status: newStatus,
      });
      fetchProperties();
    } catch (err) {
      alert("Error updating unit status");
    }
  };

  // --- COLOR LOGIC ADDED HERE ---
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
      i === index ? { ...unit, [field]: value } : unit
    );
    setUnits(newUnits);
  };

  const removeUnitField = (index) => {
    const newUnits = units.filter((_, i) => i !== index);
    setUnits(newUnits);
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
      market_comparison: property.market_comparison,
      analytics_text: property.analytics_text || "",
      is_featured: property.is_featured,
    });

    if (property.units) {
      const variants = property.units.filter(
        (u) => u.price !== property.price || u.size !== property.sqm
      );
      setUnits(
        variants.map((u) => ({
          type: u.type,
          price: u.price,
          size: u.size,
          beds: u.beds,
          baths: u.baths || "",
        }))
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
      market_comparison: "",
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
          `http://127.0.0.1:5000/api/properties/${editId}`,
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        alert("Property Updated Successfully!");
      } else {
        await axios.post("http://127.0.0.1:5000/api/properties", data, {
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
          {["overview", "properties", "inbox", "settings"].map((tab) => (
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
          ))}
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
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="group">
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                    Status Lifecycle
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="border p-3 rounded w-full focus:outline-none focus:border-brand-gold text-sm"
                  >
                    {["For Sale", "For Rent"].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="group">
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                    Classification
                  </label>
                  <select
                    name="suitability"
                    value={formData.suitability}
                    onChange={handleInputChange}
                    className="border p-3 rounded w-full focus:outline-none focus:border-brand-gold text-sm"
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
                        ","
                      );
                      setFormData({ ...formData, price: formatted });
                    }}
                    className="border p-3 pl-12 rounded w-full focus:outline-none focus:border-brand-gold font-bold text-brand-navy"
                    required
                  />
                </div>

                <p className="text-[10px] text-gray-400 mt-1">
                  This is the starting price displayed on the card.
                </p>
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
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="border p-3 rounded w-full focus:outline-none focus:border-brand-gold"
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
                className="border p-3 rounded w-full focus:outline-none focus:border-brand-gold"
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
                    placeholder="Base Beds"
                    value={formData.beds}
                    onChange={handleInputChange}
                    className="border p-3 rounded text-sm focus:outline-none"
                  />
                  <input
                    type="number"
                    name="baths"
                    placeholder="Base Baths"
                    value={formData.baths}
                    onChange={handleInputChange}
                    className="border p-3 rounded text-sm focus:outline-none"
                  />
                  <input
                    type="number"
                    name="sqm"
                    placeholder="Base SQM"
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
                  {formData.status === "For Rent"
                    ? "Rental Costs & Analytics"
                    : "Investment Analysis"}{" "}
                  (Gated Data)
                </h4>

                <div className="w-full">
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                    Manual Analysis Paragraph (Optional)
                  </label>
                  <textarea
                    name="analytics_text"
                    placeholder="Write your own market analysis here. If left blank, the system will auto-generate one."
                    value={formData.analytics_text}
                    onChange={handleInputChange}
                    className="border p-3 rounded w-full text-sm focus:outline-none h-24"
                  ></textarea>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    name="rental_yield"
                    placeholder={
                      formData.status === "For Rent"
                        ? "Est. Utilities"
                        : "Rental Yield"
                    }
                    value={formData.rental_yield}
                    onChange={handleInputChange}
                    className="border p-3 rounded w-full text-sm focus:outline-none"
                  />
                  <input
                    type="text"
                    name="annual_growth"
                    placeholder={
                      formData.status === "For Rent"
                        ? "Move-in Cost"
                        : "Appreciation"
                    }
                    value={formData.annual_growth}
                    onChange={handleInputChange}
                    className="border p-3 rounded w-full text-sm focus:outline-none"
                  />
                  <input
                    type="text"
                    name="market_comparison"
                    placeholder="Vs Market"
                    value={formData.market_comparison}
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
                className="border p-3 rounded w-full h-24 focus:outline-none focus:border-brand-gold"
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
                  className={`bg-white p-4 rounded-xl shadow-md border hover:shadow-lg transition block ${
                    isEditing && editId === prop.id
                      ? "border-brand-gold ring-1 ring-brand-gold"
                      : "border-gray-100"
                  }`}
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
                      <div className="mt-2 flex items-center gap-2">
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
                              expandedPropertyId === prop.id ? null : prop.id
                            )
                          }
                          className="text-gray-500 border border-gray-300 font-bold text-xs uppercase px-3 py-2 rounded hover:bg-gray-100 transition"
                        >
                          {expandedPropertyId === prop.id
                            ? "Hide Units"
                            : "Units"}
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
                                unit.status === "Sold"
                                  ? "bg-red-100 text-red-600 border-red-200"
                                  : "bg-green-100 text-green-600 border-green-200"
                              }`}
                            >
                              <option value="Available">Available</option>
                              <option value="Sold">Sold / Taken</option>
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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
                    className="border-b border-gray-100 pb-6 last:border-0 hover:bg-gray-50 p-4 rounded transition border-l-4 border-l-blue-500"
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
                        {new Date(msg.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    {msg.property_id && (
                      <div className="mb-2">
                        <span className="bg-blue-50 text-brand-navy text-xs font-bold px-2 py-1 rounded border border-blue-100">
                          Re:{" "}
                          {relatedProperty
                            ? relatedProperty.title
                            : `Property #${msg.property_id}`}
                        </span>
                      </div>
                    )}
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-100 text-sm leading-relaxed mb-3 mt-2">
                      {msg.message}
                    </p>
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={() => handleDeleteInquiry(msg.id)}
                        className="text-xs font-bold text-red-500 border border-red-200 px-4 py-2 rounded hover:bg-red-500 hover:text-white transition uppercase tracking-wider"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
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
            <p className="text-sm text-gray-500 mb-6">
              Update your login credentials here.
            </p>
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  New Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                  className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-brand-navy"
                  placeholder="admin@kipekee.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Current Password (Required)
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
                  className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-brand-navy"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  New Password (Optional)
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
                  className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-brand-navy"
                  placeholder="••••••••"
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
