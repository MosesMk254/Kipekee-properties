import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

const ClientLayout = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-brand-navy shadow-lg py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-heading font-bold text-white tracking-wide">
            Kipekee<span className="text-brand-gold">.</span>
          </div>

          <div className="hidden md:flex space-x-8 text-white font-medium text-sm tracking-wide">
            <Link to="/" className="hover:text-brand-gold transition">
              HOME
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

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-brand-navy text-white py-8 text-center border-t border-white/10">
        <p className="opacity-50 text-sm font-light">
          © 2026 Kipekee Properties. Built with React.
        </p>
      </footer>
    </div>
  );
};

export default ClientLayout;
