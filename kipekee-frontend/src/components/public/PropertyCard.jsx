import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const PropertyCard = ({ property }) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const savedLikes = JSON.parse(
      localStorage.getItem("kipekee_likes") || "[]"
    );
    if (savedLikes.includes(property.id)) {
      setIsLiked(true);
    }
  }, [property.id]);

  const toggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const savedLikes = JSON.parse(
      localStorage.getItem("kipekee_likes") || "[]"
    );
    let newLikes;
    if (isLiked) {
      newLikes = savedLikes.filter((id) => id !== property.id);
    } else {
      newLikes = [...savedLikes, property.id];
    }

    localStorage.setItem("kipekee_likes", JSON.stringify(newLikes));
    setIsLiked(!isLiked);
  };

  return (
    <div className="group relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl bg-white">
      <Link
        to={`/properties/${property.id}`}
        className="block relative h-[340px] overflow-hidden"
      >
        <img
          src={property.images ? property.images[0] : property.image_url}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-black/30 transition-opacity duration-500 group-hover:opacity-10"></div>

        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent z-0"></div>

        <div className="absolute top-5 left-5 z-10">
          <div className="bg-white/30 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-4 py-2 uppercase tracking-wider rounded-full shadow-lg">
            {property.status}
          </div>
        </div>

        <button
          onClick={toggleLike}
          className={`absolute top-5 right-5 z-20 bg-white/30 backdrop-blur-md border border-white/20 p-3 rounded-full transition-all duration-300 shadow-lg group-hover:scale-110 ${
            isLiked
              ? "bg-white text-red-500"
              : "text-white hover:bg-white hover:text-red-500"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isLiked ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>

        <div className="absolute bottom-24 left-6 z-20">
          <h4 className="text-2xl md:text-3xl font-heading font-bold text-white drop-shadow-lg">
            {property.price}
          </h4>
        </div>
      </Link>

      <div className="relative z-10 -mt-20 mx-4 p-6 bg-white/80 backdrop-blur-xl border-t border-l border-r border-white/60 rounded-t-3xl rounded-b-3xl shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.3)] transition-all duration-500 group-hover:bg-white/95">
        <div className="mb-6">
          <h3 className="text-xl font-heading font-bold text-brand-navy mb-2 truncate group-hover:text-brand-gold transition-colors">
            <Link to={`/properties/${property.id}`}>{property.title}</Link>
          </h3>
          <p className="text-brand-navy/70 text-sm flex items-center font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 mr-2 text-brand-gold"
            >
              <path
                fillRule="evenodd"
                d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
            {property.location}
          </p>
        </div>

        <div className="flex items-center justify-between py-4 border-t border-brand-navy/10 border-b mb-4">
          <div className="flex items-center flex-col md:flex-row">
            <span className="text-sm font-bold text-brand-navy">
              {property.beds}{" "}
              <span className="font-medium text-brand-navy/60">Beds</span>
            </span>
          </div>
          <div className="flex items-center flex-col md:flex-row">
            <span className="text-sm font-bold text-brand-navy">
              {property.baths}{" "}
              <span className="font-medium text-brand-navy/60">Baths</span>
            </span>
          </div>
          <div className="flex items-center flex-col md:flex-row">
            <span className="text-sm font-bold text-brand-navy">
              {property.sqft}{" "}
              <span className="font-medium text-brand-navy/60">sqft</span>
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3 border-2 border-white shadow-sm">
              <img
                src={`https://i.pravatar.cc/150?u=${property.id}`}
                alt="Agent"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-xs font-bold text-brand-navy block">
                Sarah Jenkins
              </span>
            </div>
          </div>

          <Link
            to={`/properties/${property.id}`}
            className="text-xs text-brand-gold font-bold uppercase tracking-widest hover:text-brand-navy transition-colors cursor-pointer border-b-2 border-transparent hover:border-brand-gold py-1"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
