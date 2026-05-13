import React from "react";
import { useParams, Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useFetchBookByIdQuery } from "../../redux/features/cart/booksApi";
import { gettingurl } from "../../utils/gettingurl";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";

const SingleBook = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const handleAddTocart = (product) => {
    dispatch(addToCart(product));
  };


  const {
    data: book,
    isLoading,
    isError,
  } = useFetchBookByIdQuery(id);

  if (isLoading) {
    return <p className="text-center mt-10">Loading book...</p>;
  }

  if (isError) {
    return <p className="text-center mt-10 text-red-500">Failed to load book</p>;
  }

  return (
    <div className="rounded-lg transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-6">
        
        {/* Book Image */}
        {/* Book Image */}
        <div className="sm:h-72 sm:flex-shrink-0 border rounded-md">
          <img
            src={gettingurl(book.coverImage)}
            alt={book?.title}
            className="w-full h-full object-cover p-2 rounded-md hover:scale-105 transition-all duration-200"
          />
        </div>


        {/* Book Details */}
        <div>
          <h3 className="text-xl font-semibold mb-3">
            {book?.title}
          </h3>

          <p className="text-gray-600 mb-5">
            {book?.description}
          </p>

          <p className="font-medium mb-5">
            ₹{book?.newPrice}
            {book?.oldPrice && (
              <span className="line-through font-normal ml-2 text-gray-400">
                ₹{book.oldPrice}
              </span>
            )}
          </p>

          <button onClick={()=>handleAddTocart(book)} className="btn-primary px-6 flex items-center gap-2">
            <FiShoppingCart />
            <span>Add to Cart</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default SingleBook;
