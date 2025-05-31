// components/TestimonialSlider.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaQuoteLeft, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { testimonials } from "./testimonialData";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const TestimonialSlider = () => {
  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-7xl rounded-lg mx-auto relative bg-gray-100">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            nextEl: ".testimonial-next",
            prevEl: ".testimonial-prev",
          }}
          autoplay={{
            delay: 7000,
            disableOnInteraction: false,
          }}
          loop={true}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id} className="py-8">
              <div className="max-w-4xl mx-auto h-full p-8 rounded-lg relative ">
                <FaQuoteLeft className="text-2xl mx-auto text-green-500" />
                <h1 className="text-md md:text-xl text-center py-4 font-bold">
                  {testimonial.summary}
                </h1>
                <blockquote className="text-sm sm:text-md px-4  text-center text-gray-700 mb-3 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>
                <div className="flex items-center justify-center gap-2 py-4">
                  <p className="text-sm text-gray-900">
                    — {testimonial.author}
                  </p>
                  <p className="text-gray-500 text-sm">{testimonial.date}</p>
                </div>
                <div className="flex justify-center">
                  <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-md">
                    <span className="text-sm font-semibold">Excellent</span>
                    <div className="flex text-green-600">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStarHalfAlt />
                    </div>
                    <span className="text-sm text-gray-700 hidden sm:inline">
                      2,473 reviews on
                    </span>
                    <span className="flex items-center font-semibold text-green-600 hidden sm:flex">
                      <FaStar className="text-green-600 mr-1" />
                      Trustpilot
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons - Visible on all screens */}
        <button
          className="cursor-pointer testimonial-prev absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors md:left-6"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        <button
          className="cursor-pointer testimonial-next absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors md:right-6"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;