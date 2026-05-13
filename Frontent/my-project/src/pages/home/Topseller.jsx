import React, { useEffect, useState } from "react";
import Bookcard from "../card/Bookcard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { useFetchAllBooksQuery } from "../../redux/features/cart/booksApi";

const Topseller = () => {
  //const [books, setbooks] = useState([]);

  const categories = [
    "choose a genre",
    "adventure",
    "horror",
    "fiction",
    "comedy",
  ];

  const [changedcategory, setchangedcategory] = useState("choose a genre");

  // useEffect(() => {
  //   fetch("books.json")
  //     .then((res) => res.json())
  //     .then((data) => setbooks(data));
  // }, []);

  // way to fetch from api

  const {data : books=[]} = useFetchAllBooksQuery();
  

  const filteredbooks =
    changedcategory === "choose a genre"
      ? books
      : books.filter(
          (book) => book.category === changedcategory.toLowerCase()
        );

  return (
    <div className="py-10 relative">
      <h2 className="text-3xl font-semibold mb-6">Top sellers</h2>

      {/* Category */}
      <div className="mb-8">
        <select
          className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none"
          onChange={(e) => setchangedcategory(e.target.value)}
        >
          {categories.map((item, index) => (
            <option key={index}>{item}</option>
          ))}
        </select>
      </div>

      {/* LEFT ARROW */}
      <button className="custom-prev absolute left-0 top-[55%] z-10 bg-white shadow-md p-3 rounded-full hover:bg-gray-200">
        <FaChevronLeft size={18} />
      </button>

      {/* RIGHT ARROW */}
      <button className="custom-next absolute right-0 top-[55%] z-10 bg-white shadow-md p-3 rounded-full hover:bg-gray-200">
        <FaChevronRight size={18} />
      </button>

      {/* SWIPER */}
      <Swiper
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        spaceBetween={30}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
          1180: { slidesPerView: 3 },
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {filteredbooks.map((book, index) => (
          <SwiperSlide key={index}>
            <Bookcard book={book} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Topseller;
