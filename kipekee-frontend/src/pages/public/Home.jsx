import { motion } from "framer-motion";

import Hero from "../../components/public/Hero";
import StorySection from "../../components/public/StorySection";
import LiveFeaturedSection from "../../components/public/LiveFeaturedSection";
import LocationGrid from "../../components/public/LocationGrid";
import Testimonials from "../../components/public/Testimonials";
import ContactSection from "../../components/public/ContactSection";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Hero />

      <StorySection />

      <LiveFeaturedSection />

      <LocationGrid />

      <Testimonials />

      <ContactSection />
    </div>
  );
};

export default Home;
