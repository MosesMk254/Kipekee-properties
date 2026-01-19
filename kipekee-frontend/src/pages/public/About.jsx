import { useEffect } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { label: "Years Active", value: 12 },
    { label: "Properties Sold", value: 850 },
    { label: "Happy Clients", value: 1200 },
    { label: "Awards Won", value: 15 },
  ];

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h5 className="text-brand-gold font-bold tracking-widest uppercase mb-2 text-sm">
            Our Philosophy
          </h5>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-navy mb-6">
            More Than Real Estate.
            <br />
            We Curate Lifestyles.
          </h1>
          <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl"
        >
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1920&auto=format&fit=crop"
            alt="Luxury Lifestyle"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-navy/20"></div>
        </motion.div>
      </div>

      <div
        className="relative py-32 mb-24 bg-fixed bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop")',
        }}
      >
        <div className="absolute inset-0 bg-brand-navy/90"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-4"
              >
                <div className="text-5xl md:text-6xl font-heading font-bold text-brand-gold mb-2">
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    separator=","
                    enableScrollSpy={true}
                    scrollSpyOnce={true}
                  />
                  {stat.label.includes("Active") ||
                  stat.label.includes("Clients")
                    ? "+"
                    : ""}
                </div>
                <div className="text-white/80 text-sm uppercase tracking-widest font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mb-24">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2"
          >
            <h3 className="text-3xl font-heading font-bold text-brand-navy mb-6">
              A Legacy of Excellence
            </h3>
            <p>
              <strong>Rutere Realty</strong> is a purpose-driven real estate
              agency dedicated to creating precise, value-aligned matches
              between properties and homeowners or investors. Guided by insight,
              integrity, and market intelligence, Rutere Realty goes beyond
              traditional brokerage by delivering tailored property solutions
              that reflect the unique goals of each client.
            </p>

            <br />

            <p>
              <strong>Mission</strong>
            </p>
            <p>
              To connect people and capital to the right properties through
              strategic matching, professional guidance, and uncompromising
              service excellence.
            </p>

            <br />

            <p>
              <strong>Vision</strong>
            </p>
            <p>
              To become a trusted real estate partner recognized for precision
              matchmaking, ethical practice, and long-term value creation in
              property ownership and investment.
            </p>

            <br />

            <p>
              <strong>Value Proposition</strong>
            </p>
            <p>
              Rutere Realty differentiates itself through a consultative,
              match-driven approach. Rather than simply listing or selling
              property, the firm focuses on understanding client intent—whether
              lifestyle, yield, growth, or legacy—and aligning it with the right
              asset at the right time.
            </p>

            <br />

            <p>
              <strong>Operating Principles</strong>
            </p>
            <ul>
              <li>
                <strong>Precision:</strong> Every recommendation is grounded in
                research and relevance.
              </li>
              <li>
                <strong>Integrity:</strong> Transparent dealings and ethical
                standards guide all transactions.
              </li>
              <li>
                <strong>Client-Centricity:</strong> Solutions are customized,
                not standardized.
              </li>
              <li>
                <strong>Market Intelligence:</strong> Decisions are informed by
                current data and long-term trends.
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 grid grid-cols-2 gap-4"
          >
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=600&auto=format&fit=crop"
              className="rounded-2xl shadow-lg mt-8 hover:-translate-y-2 transition-transform duration-500"
              alt="Office"
            />
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=600&auto=format&fit=crop"
              className="rounded-2xl shadow-lg hover:-translate-y-2 transition-transform duration-500"
              alt="Meeting"
            />
          </motion.div>
        </div>
      </div>

      <div className="bg-gray-50 py-24">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="md:w-5/12 relative min-h-[500px]"
            >
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                alt="Sarah Jenkins"
                className="w-full h-full object-cover absolute inset-0"
              />
            </motion.div>

            <div className="md:w-7/12 p-12 md:p-16 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h5 className="text-brand-gold font-bold tracking-widest uppercase mb-2 text-xs">
                  Meet The Founder
                </h5>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy mb-6">
                  Christine Rutere
                </h2>

                <p className="text-gray-500 italic mb-6 text-lg">
                  "I started Rutere Realty with a simple belief: that finding a
                  home should be as inspiring as living in one."
                </p>

                <p className="text-gray-500 leading-relaxed mb-6 text-sm">
                  With over 10 years in the luxury real estate market, Christine
                  has personally facilitated over Ksh.200M in property
                  transactions. Her deep understanding of Nairobi's
                  architectural heritage, combined with an eye for modern
                  design, allows her to match clients with homes that truly
                  reflect their aspirations.
                </p>
                <p className="text-gray-500 leading-relaxed mb-8 text-sm">
                  When she isn't scouting the next hidden gem in Muthaiga,
                  Christine serves on the board of the Kenya Green Building
                  Society, advocating for sustainable luxury living.
                </p>

                <div className="font-handwriting text-2xl text-brand-navy opacity-70">
                  Christine Rutere
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-heading font-bold text-brand-navy mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-gold font-bold text-xl">
                1
              </div>
              <h3 className="font-bold text-brand-navy mb-2">Transparency</h3>
              <p className="text-gray-500 text-sm">
                We believe in clear, honest communication. No hidden fees, no
                surprises—just straight talk.
              </p>
            </div>
            <div className="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-gold font-bold text-xl">
                2
              </div>
              <h3 className="font-bold text-brand-navy mb-2">Insight</h3>
              <p className="text-gray-500 text-sm">
                We provide data-driven market analysis to turn your property
                purchase into a smart investment.
              </p>
            </div>
            <div className="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-gold font-bold text-xl">
                3
              </div>
              <h3 className="font-bold text-brand-navy mb-2">Excellence</h3>
              <p className="text-gray-500 text-sm">
                From viewing to closing, we ensure a seamless, premium
                experience for every client.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
