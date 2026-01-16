import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";

const LocationGrid = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5000/api/properties");
        setProperties(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching location counts:", err);
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const neighborhoods = [
    {
      name: "Karen",
      image:
        "https://images.unsplash.com/photo-1658218729615-167c32d70537?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8a2VueWElMjBob3VzZXN8ZW58MHx8MHx8fDA%3D",
    },
    {
      name: "Westlands",
      image:
        "https://images.unsplash.com/photo-1669333490889-194e8f46a766?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Runda",
      image:
        "https://images.unsplash.com/photo-1676794944553-399cade9cd39?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Kilimani",
      image:
        "https://images.unsplash.com/photo-1710168867585-9a74109dae6a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fG5haXJvYml8ZW58MHx8MHx8fDA%3D",
    },
  ];

  if (loading) return null;

  return (
    <section className="py-24 bg-brand-gray">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-brand-navy">
            Browse by Neighborhood
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {neighborhoods.map((loc, index) => {
            const count = properties.filter(
              (p) => p.location && p.location.includes(loc.name)
            ).length;

            return (
              <Link
                key={loc.name}
                to="/properties"
                state={{ filterLocation: loc.name }}
                className="block"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-lg"
                >
                  <img
                    src={loc.image}
                    alt={loc.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-xl font-heading font-bold text-white group-hover:text-brand-gold transition-colors">
                      {loc.name}
                    </h3>
                    <p className="text-gray-300 text-sm font-medium">
                      {count} {count === 1 ? "Property" : "Properties"}
                    </p>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LocationGrid;
