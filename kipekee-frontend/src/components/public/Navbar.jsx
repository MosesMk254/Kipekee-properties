import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || !isHome || mobileMenuOpen
            ? "bg-brand-navy shadow-lg py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-heading font-bold text-white tracking-wide z-50 relative">
            <Link to="/" className="block">
              <img
                src="/logo.png"
                alt="Kipekee Properties"
                className="h-10 md:h-12 w-auto object-contain transform scale-[1.8] origin-left ml-2"
              />
            </Link>
          </div>

          <div className="hidden md:flex space-x-8 text-white font-medium text-sm tracking-wide">
            {["HOME", "PROPERTIES", "ABOUT", "BLOG", "CONTACT"].map((item) => (
              <Link
                key={item}
                to={item === "HOME" ? "/" : `/${item.toLowerCase()}`}
                className="hover:text-brand-gold transition"
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <button className="bg-brand-gold text-white px-6 py-3 rounded-sm hover:bg-brand-goldHover transition font-bold uppercase text-xs tracking-widest">
              List Property
            </button>
          </div>

          <button
            className="md:hidden text-white z-50 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 bg-brand-navy md:hidden flex flex-col justify-center items-center"
          >
            <div className="flex flex-col space-y-8 text-center">
              {["HOME", "PROPERTIES", "ABOUT", "BLOG", "CONTACT"].map(
                (item) => (
                  <Link
                    key={item}
                    to={item === "HOME" ? "/" : `/${item.toLowerCase()}`}
                    className="text-2xl font-heading font-bold text-white hover:text-brand-gold transition tracking-widest"
                  >
                    {item}
                  </Link>
                )
              )}

              <div className="pt-8">
                <Link to="/contact">
                  <button className="bg-brand-gold text-white px-8 py-4 rounded-sm font-bold uppercase text-sm tracking-widest">
                    Talk to an Agent
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
