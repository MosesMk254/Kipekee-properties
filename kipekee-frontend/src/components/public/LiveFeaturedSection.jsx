import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import PropertyCard from "./PropertyCard";

const LiveFeaturedSection = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get(
          "http://127.0.0.1:5000/api/properties?featured=true"
        );
        setFeaturedProperties(res.data.slice(0, 3));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching featured properties:", err);
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);
  if (loading)
    return (
      <div className="py-24 text-center bg-brand-gray">
        Loading Exclusive Offers...
      </div>
    );
  if (featuredProperties.length === 0) return null;

  return (
    <section className="py-24 bg-gradient-to-b from-brand-gray to-gray-200 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h5 className="text-brand-gold font-bold tracking-widest uppercase mb-2 text-sm">
            Discover Luxury
          </h5>
          <h2 className="text-4xl font-heading font-bold text-brand-navy">
            Featured Properties
          </h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {featuredProperties.map((prop, index) => (
            <motion.div
              key={prop.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <PropertyCard property={prop} />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-20">
          <Link to="/properties">
            <button className="bg-brand-navy text-white px-12 py-5 font-bold uppercase text-sm tracking-widest rounded-sm hover:bg-brand-gold transition-colors duration-300">
              View All Properties
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LiveFeaturedSection;
