import { motion } from "framer-motion";

import Hero from "../../components/public/Hero";
import StorySection from "../../components/public/StorySection";
import PropertyCard from "../../components/public/PropertyCard";
import LocationGrid from "../../components/public/LocationGrid";
import Testimonials from "../../components/public/Testimonials";
import ContactSection from "../../components/public/ContactSection";
import { properties } from "../../data/mockData";

const Home = () => {
  const featuredProperties = properties.slice(0, 3);

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
