import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoTrash } from "react-icons/io5";
import { gettingurl } from "../utils/gettingurl";

import {clearcart, removeFromCart} from "../redux/features/cart/cartSlice"
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleClearCart=()=>{
    dispatch(clearcart())
  }

  const totalPrice = cartItems.reduce((acc,items)=>{
    return acc+items.newPrice;
  },0)

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
              <img
                src={gettingurl(item.coverImage)}
                alt={item.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-600">{item.category}</p>
                <p className="text-xl font-bold text-blue-600">₹{item.newPrice}</p>
              </div>
              <button
                onClick={() => dispatch(removeFromCart(item))}
                className="text-red-500 hover:text-red-700 p-2"
              >
                <IoTrash size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Link
              to="/checkout"
              className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={handleClearCart}
              className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
