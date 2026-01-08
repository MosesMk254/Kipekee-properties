import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const Hero = () => {
  const [activeTab, setActiveTab] = useState("sell");

  const slides = [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1920&auto=format&fit=crop",

    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop",

    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1920&auto=format&fit=crop",

    "https://plus.unsplash.com/premium_photo-1677474827615-31ea6fa13efe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Bright Interior
  ];

  return (
    <div className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-brand-navy">
      <style>{`
        @keyframes kenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }
        /* Only animate the image when the slide is active */
        .swiper-slide-active .slide-image {
          animation: kenBurns 8s linear forwards;
        }
      `}</style>

      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          speed={2000}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          loop={true}
          allowTouchMove={false}
          className="h-full w-full"
        >
          {slides.map((image, index) => (
            <SwiperSlide key={index} className="overflow-hidden">
              <div className="relative w-full h-full">
                <img
                  src={image}
                  alt={`Luxury Home ${index + 1}`}
                  className="slide-image w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/60 via-brand-navy/40 to-brand-navy/60"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center pt-20">
        <h5 className="text-brand-gold font-bold tracking-widest uppercase mb-4 text-sm animate-pulse">
          The Best Way To Find Your Home
        </h5>
        <h1 className="text-4xl md:text-6xl text-white font-heading font-bold mb-12 leading-tight drop-shadow-2xl">
          Find Your Dream Home <br /> In Kenya
        </h1>

        <div className="max-w-4xl mx-auto text-left shadow-2xl relative">
          <div className="inline-flex relative z-20 top-[1px]">
            <button
              onClick={() => setActiveTab("sell")}
              className={`px-8 py-3 font-bold text-sm rounded-t-md transition-all duration-300 ${
                activeTab === "sell"
                  ? "bg-white text-brand-navy border-b-0 shadow-sm"
                  : "bg-brand-navy/60 text-white hover:bg-brand-navy/80 backdrop-blur-md"
              }`}
            >
              FOR SALE
            </button>
            <button
              onClick={() => setActiveTab("rent")}
              className={`px-8 py-3 font-bold text-sm rounded-t-md transition-all duration-300 ml-1 ${
                activeTab === "rent"
                  ? "bg-white text-brand-navy border-b-0 shadow-sm"
                  : "bg-brand-navy/60 text-white hover:bg-brand-navy/80 backdrop-blur-md"
              }`}
            >
              FOR RENT
            </button>
          </div>

          <div className="bg-white p-6 rounded-b-md rounded-tr-md flex flex-col md:flex-row gap-4 items-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="flex-1 w-full relative group">
              <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1 block">
                Keyword
              </label>
              <input
                type="text"
                placeholder="Enter address, city..."
                className="w-full border-b border-gray-200 py-2 outline-none focus:border-brand-navy text-brand-dark font-medium placeholder-gray-300 transition-all"
              />
            </div>

            <div className="flex-1 w-full relative border-l border-gray-100 md:pl-4">
              <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1 block">
                Property Type
              </label>
              <select className="w-full border-b border-gray-200 py-2 outline-none focus:border-brand-navy text-brand-dark font-medium bg-white cursor-pointer appearance-none">
                <option>All Types</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>Office</option>
              </select>
            </div>

            <div className="flex-1 w-full relative border-l border-gray-100 md:pl-4">
              <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1 block">
                Location
              </label>
              <select className="w-full border-b border-gray-200 py-2 outline-none focus:border-brand-navy text-brand-dark font-medium bg-white cursor-pointer appearance-none">
                <option>All Cities</option>
                <option>Nairobi</option>
                <option>Mombasa</option>
                <option>Kisumu</option>
              </select>
            </div>

            <button className="w-full md:w-auto bg-brand-gold hover:bg-brand-goldHover text-white font-bold py-4 px-10 rounded shadow-lg transform hover:-translate-y-1 transition-all uppercase text-sm tracking-wider">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
