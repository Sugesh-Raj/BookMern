import React from "react";

const Banner = () => {
  return (
    <div className="px-6 md:px-12 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        
        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            New Releases This Week
          </h1>

          <p className="text-gray-600 mb-6 max-w-md">
            It’s time to update your reading list with some of the latest
            and greatest releases in the literary world. From heart-pumping
            thrillers to captivating memoirs, this week’s new releases offer
            something for everyone.
          </p>

          <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-md font-medium transition">
            Subscribe
          </button>
        </div>

        {/* RIGHT IMAGES */}
        <div className="relative flex justify-center md:justify-end">
          
          {/* Book 1 */}
          <img
            src="https://covers.openlibrary.org/b/id/10523359-L.jpg"
            alt="Book 1"
            className="w-40 md:w-44 rounded-md shadow-lg z-20"
          />

          {/* Book 2 */}
          <img
            src="https://covers.openlibrary.org/b/id/10523360-L.jpg"
            alt="Book 2"
            className="w-36 md:w-40 rounded-md shadow-lg absolute -right-6 md:-right-10 top-6 z-10"
          />

          {/* Book 3 */}
          <img
            src="https://covers.openlibrary.org/b/id/10523361-L.jpg"
            alt="Book 3"
            className="w-32 md:w-36 rounded-md shadow-lg absolute -right-16 md:-right-20 top-12 z-0"
          />
        </div>

      </div>
    </div>
  );
};

export default Banner;
