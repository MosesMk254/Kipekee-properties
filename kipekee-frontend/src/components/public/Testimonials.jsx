import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "James Mwangi",
      role: "Homeowner, Runda",
      text: "Finding our dream home was effortless with Kipekee. Their attention to detail is unmatched.",
      rating: 5,
      img: "https://i.pravatar.cc/150?u=20",
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      role: "Expat Investor",
      text: "Professional, transparent, and incredibly knowledgeable about the Nairobi luxury market.",
      rating: 5,
      img: "https://i.pravatar.cc/150?u=32",
    },
    {
      id: 3,
      name: "David Kimani",
      role: "Property Seller",
      text: "They sold my property in Karen within 3 weeks at the asking price. Highly recommended.",
      rating: 5,
      img: "https://i.pravatar.cc/150?u=44",
    },
    {
      id: 4,
      name: "Anita Patel",
      role: "Interior Designer",
      text: "The most stylish real estate agency I have worked with. They truly understand luxury.",
      rating: 5,
      img: "https://i.pravatar.cc/150?u=55",
    },
  ];

  return (
    <section className="py-24 bg-brand-navy relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-brand-gold blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-blue-500 blur-[120px] rounded-full mix-blend-screen"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <span className="bg-white/10 backdrop-blur px-4 py-1 rounded-full text-xs font-bold text-white flex items-center border border-white/10">
              <svg
                className="w-4 h-4 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
              </svg>
              Google Reviews
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
            Client Stories
          </h2>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-16" 
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl h-full flex flex-col hover:bg-white/10 transition-colors duration-300">
                <div className="flex text-brand-gold mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 fill-current mr-1"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-gray-300 italic mb-8 flex-grow leading-relaxed">
                  "{review.text}"
                </p>

                <div className="flex items-center pt-4 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-gray-500 mr-3 overflow-hidden border border-white/20">
                    <img
                      src={review.img}
                      alt={review.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">
                      {review.name}
                    </h4>
                    <span className="text-gray-500 text-xs uppercase tracking-wide">
                      {review.role}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
