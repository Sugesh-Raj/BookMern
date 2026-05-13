import React from "react";
import { newsurl } from "../../utils/newsurl";

const NewsCard = ({ news }) => {
  return (
    <div className="inline-block min-w-[750px] bg-white rounded-lg shadow-sm hover:shadow-md transition p-5 mr-6 g">

      {/* Grid layout */}
      <div className="grid grid-cols-[140px_1fr] gap-6 items-start">

        {/* Left Image */}
        <img
          src={newsurl(news.image)}
          alt={news.title}
          className="w-36 h-24 object-cover rounded"
        />

        {/* Right Text Area (VERY WIDE) */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {news.title}
          </h3>

          <p className="text-gray-600 text-sm leading-relaxed">
            {news.description}
          </p>
        </div>

      </div>
    </div>
  );
};

export default NewsCard;
