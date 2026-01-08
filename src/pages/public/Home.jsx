import { motion } from "framer-motion";

import Hero from "../../components/public/Hero";
import StorySection from "../../components/public/StorySection";
import PropertyCard from "../../components/public/PropertyCard";
import LocationGrid from "../../components/public/LocationGrid";
import Testimonials from "../../components/public/Testimonials";
import ContactSection from "../../components/public/ContactSection";

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

  return (
    <div>
      <Hero />

      <StorySection />

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
            <button className="bg-brand-navy text-white px-12 py-5 font-bold uppercase text-sm tracking-widest rounded-sm hover:bg-brand-gold transition-colors duration-300">
              View All Properties
            </button>
          </div>
        </div>
      </section>

      <LocationGrid />

      <Testimonials />

      <ContactSection />
    </div>
  );
};

export default Home;
