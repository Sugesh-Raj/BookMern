import React, { useEffect, useState } from "react";
import Bookcard from "../card/Bookcard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import { useFetchAllBooksQuery } from "../../redux/features/cart/booksApi";

const Recommended = () => {
  const {data : books=[]} = useFetchAllBooksQuery();

  return (
    <div className="py-16 relative"> {/* 🔴 IMPORTANT */}
      <h2 className="text-3xl font-semibold mb-6">
        Recommended for you
      </h2>

      {/* LEFT ARROW */}
      <button className="custom-prev1 absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md p-3 rounded-full hover:bg-gray-200">
        <FaChevronLeft size={18} />
      </button>

      {/* RIGHT ARROW */}
      <button className="custom-next1 absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md p-3 rounded-full hover:bg-gray-200">
        <FaChevronRight size={18} />
      </button>

      {/* SWIPER */}
      <Swiper
        navigation={{
          nextEl: ".custom-next1",
          prevEl: ".custom-prev1",
        }}
        spaceBetween={30}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
          1180: { slidesPerView: 3 },
        }}
        modules={[Navigation]}
        className="px-10"  /* 🔴 prevents clipping */
      >
        {books.slice(8, 18).map((book, index) => (
          <SwiperSlide key={index}>
            <Bookcard book={book} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Recommended;
