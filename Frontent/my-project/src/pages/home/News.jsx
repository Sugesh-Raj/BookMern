import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";

import NewsCard from "../card/NewsCard";

const News = () => {
  const news = [
    {
      id: 1,
      title: "Global Climate Summit Calls for Urgent Action",
      description:
        "World leaders gather at the Global Climate Summit to discuss urgent strategies to combat climate change, focusing on reducing carbon emissions and fostering renewable energy solutions.",
      image: "news-1",
    },
    {
      id: 2,
      title: "Breakthrough in AI Technology Announced",
      description:
        "A major breakthrough in artificial intelligence has been announced by researchers, with new advancements promising to revolutionize industries from healthcare to finance.",
      image: "news-2",
    },
    {
      id: 3,
      title: "New Space Mission Aims to Explore Distant Galaxies",
      description:
        "NASA has unveiled plans for a new space mission that will aim to explore distant galaxies, with hopes of uncovering insights into the origins of the universe.",
      image: "news-3",
    },
    {
      id: 4,
      title: "Stock Markets Reach Record Highs Amid Economic Recovery",
      description:
        "Global stock markets have reached record highs as signs of economic recovery continue to emerge following the challenges posed by the global pandemic.",
      image: "news-4",
    },
  ];

  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold mb-6">News</h2>

      {/* Custom arrows */}
      <div className="relative">
        <button className="news-prev absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-3 rounded-full">
          <FaChevronLeft />
        </button>

        <button className="news-next absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-3 rounded-full">
          <FaChevronRight />
        </button>

        <Swiper
          slidesPerView={1}
          spaceBetween={40}
          navigation={{
            prevEl: ".news-prev",
            nextEl: ".news-next",
          }}
          breakpoints={{
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 1.5 },
            1024: { slidesPerView: 2 },
          }}
          modules={[Navigation]}
          className="px-10"
        >
          {news.map((item) => (
            <SwiperSlide key={item.id}>
              <NewsCard news={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default News;
