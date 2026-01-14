import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PropertyCard from "../../components/public/PropertyCard";

const Properties = () => {
  const { state } = useLocation();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filterLocation, setFilterLocation] = useState(
    state?.filterLocation || "All"
  );
  const [filterType, setFilterType] = useState(state?.filterType || "All");
  const [filterStatus, setFilterStatus] = useState(
    state?.filterStatus || "All"
  );
  const [filterSuitability, setFilterSuitability] = useState("All");
  const [filterBeds, setFilterBeds] = useState(state?.filterBeds || "All");

  const [priceRange, setPriceRange] = useState({ min: 0, max: 500000000 });
  const [searchQuery, setSearchQuery] = useState(state?.searchQuery || "");

  const [filteredProperties, setFilteredProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/api/properties"
        );
        setProperties(response.data);
        setFilteredProperties(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load properties. Please try again later.");
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    if (properties.length === 0) return;

    let result = properties;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (filterLocation !== "All") {
      result = result.filter((p) =>
        p.location.toLowerCase().includes(filterLocation.toLowerCase())
      );
    }
    if (filterType !== "All") {
      result = result.filter((p) => p.type === filterType);
    }
    if (filterStatus !== "All") {
      result = result.filter((p) => p.status === filterStatus);
    }
    if (filterSuitability !== "All") {
      result = result.filter((p) => p.suitability === filterSuitability);
    }

    if (filterBeds !== "All") {
      result = result.filter((p) => {
        const mainMatch = p.beds == filterBeds;
        const unitMatch =
          p.units &&
          p.units.some((u) => u.beds == filterBeds && u.status === "Available");
        return mainMatch || unitMatch;
      });
    }

    const cleanPrice = (priceStr) => {
      if (!priceStr) return 0;
      return parseInt(priceStr.replace(/[^0-9]/g, ""));
    };

    result = result.filter((p) => {
      const price = cleanPrice(p.price);
      return (
        price >= priceRange.min &&
        (priceRange.max === 0 || price <= priceRange.max)
      );
    });

    setFilteredProperties(result);
    setCurrentPage(1);
  }, [
    filterLocation,
    filterType,
    filterStatus,
    filterSuitability,
    filterBeds,
    priceRange,
    searchQuery,
    properties,
  ]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProperties.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  const locations = [
    "All",
    ...new Set(
      properties.map((p) => (p.location ? p.location.split(",")[0] : ""))
    ),
  ].filter((l) => l);
  const types = ["All", ...new Set(properties.map((p) => p.type))].filter(
    (t) => t
  );

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-brand-gray">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand-navy"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500 font-bold">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-brand-gray min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10 md:mb-16 animate-fade-in-up">
          <h5 className="text-brand-gold font-bold tracking-widest uppercase mb-2 text-sm">
            Portfolio
          </h5>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy">
            Exclusive Listings
          </h1>
          <div className="w-24 h-1 bg-brand-gold mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 relative">
          <div className="lg:hidden mb-4">
            <button
              onClick={() =>
                document
                  .getElementById("mobile-filters")
                  .classList.toggle("hidden")
              }
              className="w-full bg-white border border-brand-navy text-brand-navy font-bold py-3 rounded flex justify-center items-center shadow-sm"
            >
              Show/Hide Filters
            </button>
          </div>

          <div
            id="mobile-filters"
            className="hidden lg:block w-full lg:w-1/3 transition-all duration-300"
          >
            <div className="sticky top-32 bg-white rounded-2xl shadow-xl p-8 border border-gray-100 max-h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar">
              <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                <h3 className="text-xl font-heading font-bold text-brand-navy">
                  Filter Properties
                </h3>
                <button
                  onClick={() => {
                    setFilterLocation("All");
                    setFilterType("All");
                    setFilterStatus("All");
                    setFilterSuitability("All");
                    setFilterBeds("All");
                    setSearchQuery("");
                    setPriceRange({ min: 0, max: 500000000 });
                  }}
                  className="text-xs text-brand-gold font-bold uppercase hover:text-brand-navy transition-colors"
                >
                  Reset All
                </button>
              </div>

              <div className="mb-8">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3 block">
                  Keyword Search
                </label>
                <input
                  type="text"
                  placeholder="e.g. Villa..."
                  className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  value={searchQuery}
                />
              </div>

              <div className="mb-8">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3 block">
                  Classification
                </label>
                <select
                  className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm outline-none"
                  onChange={(e) => setFilterSuitability(e.target.value)}
                  value={filterSuitability}
                >
                  <option value="All">All Classifications</option>
                  <option value="Investment">Investment</option>
                  <option value="Home Living">Home Living</option>
                  <option value="Investment & Home Living">
                    Investment & Home Living
                  </option>
                </select>
              </div>

              <div className="mb-8">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3 block">
                  Listing Status
                </label>
                <div className="flex bg-gray-100 p-1 rounded">
                  {["All", "For Sale", "For Rent"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`flex-1 py-2 text-xs font-bold rounded ${
                        filterStatus === status
                          ? "bg-white text-brand-navy shadow-sm"
                          : "text-gray-500 hover:text-brand-navy"
                      }`}
                    >
                      {status === "All" ? "Any" : status.replace("For ", "")}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3 block">
                  Location
                </label>
                <select
                  className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm outline-none"
                  onChange={(e) => setFilterLocation(e.target.value)}
                  value={filterLocation}
                >
                  <option value="All">All Locations</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-8">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3 block">
                  Property Type
                </label>
                <select
                  className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm outline-none"
                  onChange={(e) => setFilterType(e.target.value)}
                  value={filterType}
                >
                  <option value="All">All Types</option>
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-8">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3 block">
                  Bedrooms
                </label>
                <select
                  className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm outline-none"
                  onChange={(e) => setFilterBeds(e.target.value)}
                  value={filterBeds}
                >
                  <option value="All">Any Size</option>
                  <option value="0">Studio</option>
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                </select>
              </div>

              <div className="mb-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3 block">
                  Max Price
                </label>
                <input
                  type="number"
                  placeholder="No Limit"
                  className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm"
                  onChange={(e) =>
                    setPriceRange({
                      ...priceRange,
                      max: e.target.value || 500000000,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/3">
            <div className="mb-8 flex justify-between items-center bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <span className="text-brand-navy text-sm font-medium">
                Found <strong>{filteredProperties.length}</strong> Properties
              </span>
            </div>

            {currentItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {currentItems.map((prop) => (
                  <PropertyCard
                    key={prop.id}
                    property={{ ...prop, image: prop.image_url }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-brand-navy">
                  No Results Found
                </h3>
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-16 flex justify-center space-x-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-12 h-12 flex items-center justify-center rounded-full font-bold text-sm ${
                      currentPage === i + 1
                        ? "bg-brand-navy text-white"
                        : "bg-white border text-gray-500"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
