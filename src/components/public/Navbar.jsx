import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHome
          ? "bg-brand-navy shadow-lg py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-heading font-bold text-white tracking-wide">
          <Link to="/">
            Kipekee<span className="text-brand-gold">.</span>
          </Link>
        </div>

        <div className="hidden md:flex space-x-8 text-white font-medium text-sm tracking-wide">
          <Link to="/" className="hover:text-brand-gold transition">
            HOME
          </Link>
          <Link to="/about" className="hover:text-brand-gold transition">
            ABOUT
          </Link>
          <Link to="/properties" className="hover:text-brand-gold transition">
            PROPERTIES
          </Link>
          <Link to="/contact" className="hover:text-brand-gold transition">
            CONTACT
          </Link>
        </div>

        <button className="bg-brand-gold text-white px-6 py-3 rounded-sm hover:bg-brand-goldHover transition font-bold uppercase text-xs tracking-widest">
          List Property
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
