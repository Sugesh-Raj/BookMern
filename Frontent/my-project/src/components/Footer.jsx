import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      
      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">
            BookStore
          </h2>
          <p className="text-sm leading-relaxed">
            Discover books, news, and recommendations tailored just for you.
            Read more, learn more, grow more.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Books</li>
            <li className="hover:text-white cursor-pointer">News</li>
            <li className="hover:text-white cursor-pointer">Recommended</li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="text-white font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">Contact Us</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <a className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition">
              <FaFacebookF />
            </a>
            <a className="p-2 bg-gray-800 rounded-full hover:bg-sky-500 transition">
              <FaTwitter />
            </a>
            <a className="p-2 bg-gray-800 rounded-full hover:bg-pink-600 transition">
              <FaInstagram />
            </a>
            <a className="p-2 bg-gray-800 rounded-full hover:bg-blue-700 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} BookStore. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;
