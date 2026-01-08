import { useState, useEffect } from "react";
import { properties } from "../../data/mockData";
import PropertyCard from "../../components/public/PropertyCard";

const Properties = () => {
  const [filterLocation, setFilterLocation] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500000000 });
  const [searchQuery, setSearchQuery] = useState("");

  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    let result = properties;

    if (searchQuery) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filterLocation !== "All") {
      result = result.filter((p) => p.location.includes(filterLocation));
    }
    if (filterType !== "All") {
      result = result.filter((p) => p.specs.type === filterType);
    }
    if (filterStatus !== "All") {
      result = result.filter((p) => p.status === filterStatus);
    }

    const cleanPrice = (priceStr) => parseInt(priceStr.replace(/[^0-9]/g, ""));
    result = result.filter((p) => {
      const price = cleanPrice(p.price);
      return (
        price >= priceRange.min &&
        (priceRange.max === 0 || price <= priceRange.max)
      );
    });

    setFilteredProperties(result);
    setCurrentPage(1);
  }, [filterLocation, filterType, filterStatus, priceRange, searchQuery]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProperties.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  const locations = [
    "All",
    ...new Set(properties.map((p) => p.location.split(", ")[0])),
  ];
  const types = ["All", ...new Set(properties.map((p) => p.specs.type))];

  return (
    <div className="bg-brand-gray min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h5 className="text-brand-gold font-bold tracking-widest uppercase mb-2 text-sm">
            Portfolio
          </h5>
          <h1 className="text-4xl font-heading font-bold text-brand-navy">
            Exclusive Listings
          </h1>
          <div className="w-24 h-1 bg-brand-gold mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 relative">
          <div className="w-full lg:w-1/3">
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
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Pool, Garden..."
                    className="w-full bg-gray-50 border border-gray-200 rounded p-3 pl-10 text-sm focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none transition-all"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                  />
                  <svg
                    className="w-4 h-4 text-gray-400 absolute left-3 top-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
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
                      className={`flex-1 py-2 text-xs font-bold rounded transition-all ${
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
                  className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:border-brand-navy outline-none cursor-pointer"
                  onChange={(e) => setFilterLocation(e.target.value)}
                  value={filterLocation}
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc === "All" ? "All Locations" : loc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-8">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3 block">
                  Property Type
                </label>
                <select
                  className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:border-brand-navy outline-none cursor-pointer"
                  onChange={(e) => setFilterType(e.target.value)}
                  value={filterType}
                >
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type === "All" ? "All Types" : type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3 block">
                  Max Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400 text-sm">
                    KES
                  </span>
                  <input
                    type="number"
                    placeholder="No Limit"
                    className="w-full bg-gray-50 border border-gray-200 rounded p-3 pl-12 text-sm focus:border-brand-navy outline-none transition-colors"
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
          </div>

          <div className="w-full lg:w-2/3">
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <span className="text-brand-navy text-sm font-medium mb-2 sm:mb-0">
                Found <strong>{filteredProperties.length}</strong> Properties
              </span>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-400 uppercase">
                  Sort:
                </span>
                <select className="bg-gray-50 border border-gray-200 rounded px-3 py-1 text-sm text-brand-navy outline-none cursor-pointer hover:border-brand-navy transition-colors">
                  <option>Newest Listed</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            {currentItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {currentItems.map((prop) => (
                  <PropertyCard key={prop.id} property={prop} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="text-6xl mb-4 grayscale opacity-50">🏠</div>
                <h3 className="text-xl font-bold text-brand-navy mb-2">
                  No Results Found
                </h3>
                <p className="text-gray-400 max-w-xs mx-auto">
                  We couldn't find any properties matching your current filters.
                </p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-16 flex justify-center items-center space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`w-12 h-12 flex items-center justify-center rounded-full border transition-all ${
                    currentPage === 1
                      ? "border-gray-100 text-gray-300 cursor-not-allowed"
                      : "border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white shadow-md"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-12 h-12 flex items-center justify-center rounded-full font-bold text-sm transition-all shadow-sm ${
                      currentPage === index + 1
                        ? "bg-brand-navy text-white scale-110"
                        : "bg-white text-gray-500 hover:text-brand-navy hover:bg-gray-50"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`w-12 h-12 flex items-center justify-center rounded-full border transition-all ${
                    currentPage === totalPages
                      ? "border-gray-100 text-gray-300 cursor-not-allowed"
                      : "border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white shadow-md"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
