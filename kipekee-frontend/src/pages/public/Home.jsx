import { motion } from "framer-motion";

import Hero from "../../components/public/Hero";
import StorySection from "../../components/public/StorySection";
import LiveFeaturedSection from "../../components/public/LiveFeaturedSection";
import LocationGrid from "../../components/public/LocationGrid";
import GoogleReviews from "../../components/public/GoogleReviews";
import ContactSection from "../../components/public/ContactSection";
import { Link } from "react-router-dom";
import WhatsAppFloat from "../../components/public/WhatsAppFloat";

const Home = () => {
  return (
    <div>
      <Hero />

      <StorySection />

      <LiveFeaturedSection />

      <LocationGrid />

      {/*   Testimonial Hidden as per client request */}
      {/* <GoogleReviews /> */}

      <ContactSection />
    </div>
  );
};

export default Home;
