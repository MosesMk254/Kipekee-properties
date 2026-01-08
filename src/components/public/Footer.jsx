import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-brand-navy text-white pt-20 pb-10 border-t border-white/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-bl-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="text-3xl font-heading font-bold text-white mb-6">
              <img
                src="/logo.png"
                alt="Kipekee Properties"
                className="h-16 w-auto object-contain transform scale-150 origin-left"
              />
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Connecting discerning clients with exclusive properties in
              Nairobi's most sought-after neighborhoods.
            </p>

            <div className="flex space-x-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-brand-gold hover:border-brand-gold hover:text-white transition-all duration-300"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-brand-gold hover:border-brand-gold hover:text-white transition-all duration-300"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-brand-gold hover:border-brand-gold hover:text-white transition-all duration-300"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-brand-gold hover:border-brand-gold hover:text-white transition-all duration-300"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.12-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h5v-8.306c0-4.613 6.135-4.954 6.135 0v8.306h5v-9.716c0-6.992-8.082-6.852-11.167-3.178v-2.112z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-heading font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <Link
                  to="/about"
                  className="hover:text-brand-gold transition-colors block transform hover:translate-x-1"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/properties"
                  className="hover:text-brand-gold transition-colors block transform hover:translate-x-1"
                >
                  Properties
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-brand-gold transition-colors block transform hover:translate-x-1"
                >
                  Latest News
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-brand-gold transition-colors block transform hover:translate-x-1"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-heading font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start">
                <span className="text-brand-gold mr-3 font-bold">A.</span>
                123 Westlands Blvd, Nairobi, Kenya
              </li>
              <li className="flex items-center">
                <span className="text-brand-gold mr-3 font-bold">P.</span>
                +254 700 123 456
              </li>
              <li className="flex items-center">
                <span className="text-brand-gold mr-3 font-bold">E.</span>
                info@kipekeeproperties.com
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-heading font-bold mb-6">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get the latest property updates.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-white/5 border border-white/10 p-3 rounded text-sm text-white placeholder-gray-500 focus:border-brand-gold outline-none transition-colors"
              />
              <button className="bg-brand-gold text-white font-bold py-3 rounded uppercase text-xs tracking-widest hover:bg-brand-goldHover transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© 2026 Kipekee Properties. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
