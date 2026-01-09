import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { blogPosts } from "../../data/blogData"; 

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Market Trends",
    "Selling Tips",
    "Architecture",
    "Legal Insights",
    "Lifestyle",
  ];

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-brand-gray min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h5 className="text-brand-gold font-bold tracking-widest uppercase mb-2 text-sm">
            The Journal
          </h5>
          <h1 className="text-4xl font-heading font-bold text-brand-navy">
            Insights & News
          </h1>
          <div className="w-24 h-1 bg-brand-gold mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map((post, index) => (
                <Link to={`/blog/${post.id}`} key={post.id} className="block">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group cursor-pointer h-full flex flex-col"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-brand-navy text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
                        {post.category}
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="text-gray-400 text-xs mb-3">
                        {post.date}
                      </div>
                      <h3 className="text-xl font-heading font-bold text-brand-navy mb-3 group-hover:text-brand-gold transition-colors leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center text-brand-navy font-bold text-xs uppercase tracking-widest group-hover:text-brand-gold transition-colors">
                        Read Article
                        <svg
                          className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>

            {filteredPosts.length > 4 && (
              <div className="mt-12 flex justify-center space-x-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-navy text-white font-bold text-sm">
                  1
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:border-brand-navy hover:text-brand-navy font-bold text-sm transition-colors">
                  2
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:border-brand-navy hover:text-brand-navy font-bold text-sm transition-colors">
                  →
                </button>
              </div>
            )}
          </div>

          <div className="lg:w-1/3">
            <div className="sticky top-32 space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h4 className="text-lg font-heading font-bold text-brand-navy mb-6">
                  Categories
                </h4>
                <ul className="space-y-3">
                  {categories.map((cat) => (
                    <li key={cat}>
                      <button
                        onClick={() => setActiveCategory(cat)}
                        className={`text-sm font-medium transition-colors w-full text-left flex justify-between group ${
                          activeCategory === cat
                            ? "text-brand-gold"
                            : "text-gray-500 hover:text-brand-navy"
                        }`}
                      >
                        <span>{cat}</span>
                        <span
                          className={`w-2 h-2 rounded-full ${
                            activeCategory === cat
                              ? "bg-brand-gold"
                              : "bg-gray-200 group-hover:bg-brand-navy"
                          } transition-colors`}
                        ></span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-brand-navy p-8 rounded-2xl shadow-xl text-white text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold blur-[60px] opacity-20 pointer-events-none"></div>

                <h4 className="text-lg font-heading font-bold mb-2 relative z-10">
                  Subscribe
                </h4>
                <p className="text-gray-300 text-sm mb-6 relative z-10">
                  Get the latest market insights delivered to your inbox.
                </p>

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-white/10 border border-white/20 rounded p-3 text-sm mb-4 focus:outline-none focus:border-brand-gold text-white placeholder-gray-400 relative z-10"
                />
                <button className="w-full bg-brand-gold text-white font-bold py-3 rounded uppercase text-xs tracking-widest hover:bg-white hover:text-brand-navy transition-colors relative z-10">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
