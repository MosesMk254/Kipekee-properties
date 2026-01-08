import { motion } from "framer-motion";
import Hero from "../../components/public/Hero";
import PropertyCard from "../../components/public/PropertyCard";

const Home = () => {
  const featuredProperties = [
    {
      id: 1,
      title: "Modern Glass Villa Runda",
      price: "KES 85,000,000",
      location: "Runda, Nairobi",
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1920&auto=format&fit=crop",
      status: "For Sale",
      beds: 5,
      baths: 6,
      sqft: 4500,
    },
    {
      id: 2,
      title: "Skyline Penthouse Westlands",
      price: "KES 250,000 / mo",
      location: "Westlands, Nairobi",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1920&auto=format&fit=crop",
      status: "For Rent",
      beds: 3,
      baths: 3,
      sqft: 2800,
    },
    {
      id: 3,
      title: "Karen Exclusive Mansion",
      price: "KES 120,000,000",
      location: "Karen, Nairobi",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop",
      status: "For Sale",
      beds: 6,
      baths: 7,
      sqft: 6500,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, 
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 }, 
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 }, 
    },
  };

  return (
    <div>
      <Hero />
      <section className="py-24 bg-gradient-to-b from-brand-gray to-gray-200 overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h5 className="text-brand-gold font-bold tracking-widest uppercase mb-2 text-sm">
              Discover Luxury
            </h5>
            <h2 className="text-4xl font-heading font-bold text-brand-navy">
              Featured Properties
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 96 }} 
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1 }}
              className="h-1 bg-brand-gold mx-auto mt-6 rounded-full"
            ></motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }} 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            {featuredProperties.map((prop) => (
              <motion.div key={prop.id} variants={cardVariants}>
                <PropertyCard property={prop} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-center mt-20"
          >
            <button className="group relative overflow-hidden bg-brand-navy text-white px-12 py-5 font-bold uppercase text-sm tracking-widest rounded-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <span className="relative z-10">View All Properties</span>
              <div className="absolute inset-0 h-full w-0 bg-brand-gold transition-all duration-300 group-hover:w-full z-0"></div>
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
