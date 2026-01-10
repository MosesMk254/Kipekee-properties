import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const GoogleReviews = () => {
  const reviews = [
    {
      author_name: "James Mwangi",
      profile_photo_url: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      relative_time_description: "2 weeks ago",
      text: "Sarah was incredibly helpful in finding our apartment in Westlands. She was transparent, quick to respond, and made the paperwork seamless. Highly recommend Kipekee!",
    },
    {
      author_name: "Anita Patel",
      profile_photo_url: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      relative_time_description: "a month ago",
      text: "Professional service from start to finish. The video tours saved me so much time. Found my dream home in Kileleshwa without stress.",
    },
    {
      author_name: "David Otieno",
      profile_photo_url: "https://randomuser.me/api/portraits/men/46.jpg",
      rating: 4,
      relative_time_description: "3 months ago",
      text: "Great inventory of houses. The viewing process was smooth, though traffic was a bit heavy getting there. Overall a fantastic experience with the team.",
    },
    {
      author_name: "Lucy Kemunto",
      profile_photo_url: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 5,
      relative_time_description: "4 months ago",
      text: "I appreciated the honesty. They didn't try to upsell me on properties outside my budget. A trustworthy agency in Nairobi.",
    },
    {
      author_name: "Samuel Kamau",
      profile_photo_url: "https://randomuser.me/api/portraits/men/22.jpg",
      rating: 5,
      relative_time_description: "5 months ago",
      text: "Kipekee Properties made selling my land incredibly easy. Their network is vast and we got a great price within weeks.",
    },
  ];

  const GoogleLogo = ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-[#fbbc04]" : "text-gray-600"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-24 overflow-hidden relative bg-gradient-to-br from-brand-navy via-[#131c2e] to-brand-navy">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-30 pointer-events-none"></div>
      <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/5 to-transparent -rotate-45 transform pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold opacity-10 rounded-full translate-x-1/3 -translate-y-1/3 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-navy opacity-40 rounded-full -translate-x-1/3 translate-y-1/3 blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h5 className="text-brand-gold font-bold tracking-widest uppercase mb-2 text-sm">
            Client Stories
          </h5>
          <h2 className="text-4xl font-heading font-bold text-white mb-8 drop-shadow-sm">
            Trusted by Homeowners
          </h2>

          <div className="inline-flex items-center bg-brand-navy/40 backdrop-blur-md py-3 px-8 rounded-full shadow-2xl border border-white/10">
            <GoogleLogo className="w-6 h-6 mr-3" />

            <span className="text-2xl font-bold text-white mr-3">4.9</span>
            <div className="flex space-x-1 mr-4">{renderStars(5)}</div>
            <span className="text-gray-300 text-xs uppercase tracking-wider border-l border-gray-500 pl-4">
              Based on 48 Reviews
            </span>
          </div>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-16 custom-swiper-pagination px-4"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] border border-white/10 h-full flex flex-col relative group hover:bg-white/10 transition-all duration-500 hover:-translate-y-1">
                <div className="absolute top-6 right-6 opacity-30 group-hover:opacity-100 transition-all duration-500 filter grayscale group-hover:grayscale-0">
                  <GoogleLogo className="w-5 h-5" />
                </div>

                <div className="flex items-center mb-6">
                  <div className="p-1 bg-gradient-to-br from-white/20 to-brand-gold/20 rounded-full mr-4 backdrop-blur-md">
                    <img
                      src={review.profile_photo_url}
                      alt={review.author_name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-white text-lg tracking-wide">
                      {review.author_name}
                    </h4>
                    <span className="text-xs text-gray-400 font-medium">
                      {review.relative_time_description}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-1 mb-5">
                  {renderStars(review.rating)}
                </div>

                <p className="text-gray-300 italic leading-relaxed line-clamp-4 flex-grow font-light">
                  "{review.text}"
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center mt-8">
          <a
            href="https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-8 py-3 border border-brand-gold/50 shadow-[0_0_15px_rgba(212,175,55,0.2)] text-sm font-bold rounded-full text-brand-gold hover:bg-brand-gold hover:text-brand-navy transition-all duration-300 uppercase tracking-wider backdrop-blur-sm"
          >
            Read more on Google
          </a>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
