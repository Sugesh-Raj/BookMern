import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { gettingurl } from "../../utils/gettingurl";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/features/cart/cartSlice";


import { useDispatch } from "react-redux";


const Bookcard = ({ book }) => {
  const dispatch = useDispatch();

  const handleAddTocart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="rounded-lg transition-shadow duration-300 mb-10">
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">

        {/* IMAGE — ROUTES TO SINGLE BOOK */}
        <Link to={`/books/${book._id}`} className="sm:w-48 flex-shrink-0 border rounded-md p-2">
          <img
            src={gettingurl(book.coverImage)}
            alt={book.title}
            className="w-full rounded-md hover:scale-105 transition-all duration-200"
          />
        </Link>

        {/* CONTENT */}
        <div>
          <Link to={`/books/${book._id}`}>
            <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
              {book.title}
            </h3>
          </Link>

          <p className="text-gray-600 mb-5">
            {book.description.length > 80
              ? book.description.slice(0, 80) + "..."
              : book.description}
          </p>

          <p className="font-medium mb-5">
            ₹{book.newPrice}
            <span className="line-through text-gray-400 font-normal ml-2">
              ₹{book.oldPrice}
            </span>
          </p>

          <button
            onClick={() => handleAddTocart(book)}
            className="btn-primary px-6 py-2 flex items-center gap-2"
          >
            <FiShoppingCart />
            <span>Add to Cart</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Bookcard;
