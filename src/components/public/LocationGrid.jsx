import { motion } from "framer-motion";

const locations = [
  {
    name: "Karen",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=600&auto=format&fit=crop",
    count: "12 Properties",
  },
  {
    name: "Westlands",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=600&auto=format&fit=crop",
    count: "8 Properties",
  },
  {
    name: "Runda",
    image:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=600&auto=format&fit=crop",
    count: "15 Properties",
  },
  {
    name: "Kilimani",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600&auto=format&fit=crop",
    count: "22 Properties",
  },
];

const LocationGrid = () => {
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
          {locations.map((loc, index) => (
            <motion.div
              key={loc.name}
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
                <p className="text-gray-300 text-sm">{loc.count}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationGrid;
