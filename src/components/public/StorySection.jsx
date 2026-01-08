import { motion } from "framer-motion";

const StorySection = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <h5 className="text-brand-gold font-bold tracking-widest uppercase mb-4 text-sm">
              Our Story
            </h5>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-navy mb-6 leading-tight">
              Redefining Luxury Living in Kenya
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              At Kipekee, we believe that a home is more than just a place to
              live—it is a sanctuary. Established in 2020, we have curated the
              most exclusive portfolio of properties in Nairobi, focusing on
              architectural excellence and prime locations.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              Whether you are looking for a colonial-style mansion in Karen or a
              modern penthouse in Westlands, our team ensures a seamless,
              personalized buying experience.
            </p>

            <button className="border-2 border-brand-navy text-brand-navy px-8 py-3 font-bold uppercase text-xs tracking-widest hover:bg-brand-navy hover:text-white transition-all duration-300 rounded-sm">
              Read More About Us
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative"
          >
            <img
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop"
              alt="Luxury Interior"
              className="w-full h-[500px] object-cover rounded-sm shadow-2xl"
            />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 border-8 border-white hidden md:block shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=400&auto=format&fit=crop"
                alt="Detail"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
