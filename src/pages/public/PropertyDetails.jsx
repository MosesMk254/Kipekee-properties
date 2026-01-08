import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { properties } from "../../data/mockData";

const PropertyDetails = () => {
  const { id } = useParams();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [property, setProperty] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const found = properties.find((p) => p.id === parseInt(id));

    if (found) {
      setProperty(found);
    }
  }, [id]);

  if (!property) {
    return (
      <div className="h-screen flex items-center justify-center text-brand-navy font-bold">
        Property Not Found
      </div>
    );
  }

  return (
    <div className="bg-brand-gray min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 animate-fade-in-up">
          <div>
            <span className="bg-brand-navy text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm mb-3 inline-block">
              {property.status}
            </span>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy mb-2">
              {property.title}
            </h1>
            <p className="text-gray-500 flex items-center">
              <svg
                className="w-4 h-4 text-brand-gold mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              {property.location}
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <div className="text-3xl font-heading font-bold text-brand-navy">
              {property.price}
            </div>
            <div className="text-sm text-gray-400">Fixed Price</div>
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-2xl mb-12 bg-white animate-fade-in-up">
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Navigation, Thumbs]}
            className="h-[500px] w-full"
          >
            {property.images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`View ${index}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[Navigation, Thumbs]}
            className="h-24 w-full bg-brand-navy p-2"
          >
            {property.images.map((img, index) => (
              <SwiperSlide
                key={index}
                className="cursor-pointer opacity-40 hover:opacity-100 transition-opacity"
              >
                <img
                  src={img}
                  alt={`Thumb ${index}`}
                  className="w-full h-full object-cover rounded-md"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-wrap justify-between items-center mb-8">
              <div className="text-center px-4 border-r border-gray-100 last:border-0">
                <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">
                  Bedrooms
                </div>
                <div className="font-bold text-xl text-brand-navy">
                  {property.specs.beds}
                </div>
              </div>
              <div className="text-center px-4 border-r border-gray-100 last:border-0">
                <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">
                  Bathrooms
                </div>
                <div className="font-bold text-xl text-brand-navy">
                  {property.specs.baths}
                </div>
              </div>
              <div className="text-center px-4 border-r border-gray-100 last:border-0">
                <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">
                  Size
                </div>
                <div className="font-bold text-xl text-brand-navy">
                  {property.specs.sqft} <span className="text-xs">sqft</span>
                </div>
              </div>
              <div className="text-center px-4">
                <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">
                  Type
                </div>
                <div className="font-bold text-xl text-brand-navy">
                  {property.specs.type}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
              <h3 className="text-xl font-heading font-bold text-brand-navy mb-4">
                Description
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {property.description}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
              <h3 className="text-xl font-heading font-bold text-brand-navy mb-6">
                Amenities
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((item, index) => (
                  <div key={index} className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-brand-gold rounded-full mr-3"></span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="sticky top-32 space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-brand-gold">
                <div className="flex items-center mb-6">
                  <img
                    src="https://i.pravatar.cc/150?u=32"
                    alt="Agent"
                    className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-gray-100"
                  />
                  <div>
                    <h4 className="font-bold text-brand-navy text-lg">
                      Sarah Jenkins
                    </h4>
                    <div className="text-brand-gold text-sm font-medium">
                      Premier Agent
                    </div>
                    <div className="text-gray-400 text-xs mt-1">
                      +254 700 123 456
                    </div>
                  </div>
                </div>

                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:border-brand-navy outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:border-brand-navy outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="Your Phone"
                    className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:border-brand-navy outline-none"
                  />
                  <textarea
                    rows="3"
                    placeholder={`I am interested in ${property.title}...`}
                    className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:border-brand-navy outline-none"
                  ></textarea>

                  <button className="w-full bg-brand-navy text-white font-bold py-3 rounded hover:bg-brand-gold transition-colors uppercase text-xs tracking-widest">
                    Request Info
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
