import { useState } from "react";
import {
  IoMenu,
  IoSearchOutline,
  IoPersonOutline,
  IoHeartOutline,
  IoCartOutline,
} from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth.context";

const Navbar = () => {
  const { currentUser, logoutUser } = useAuth(); // ✅ get actual current user
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);

  const navarr = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Orders", href: "/orders" },
    { name: "Cart", href: "/cart" },
  ];

  const cartItems = useSelector((state) => state.cart.cartItems);

  // Logout handler
  const handleLogout = async () => {
    try {
      await logoutUser();
      setDropdown(false);
      navigate("/login"); // redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-black text-white px-3 md:px-6 py-3">
      <div className="flex items-center justify-between relative">

        {/* LEFT */}
        <div className="flex items-center gap-2 md:gap-4 flex-1">
          <Link to={'/'}><IoMenu size={24} className="cursor-pointer hover:text-red-500" /></Link>

          {/* Search */}
          <div className="relative flex-1 max-w-xs md:max-w-md lg:max-w-lg">
            <IoSearchOutline
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search products"
              className="w-full bg-[#EAEAEA] text-black pl-10 pr-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4 md:gap-6 text-lg md:text-2xl relative">

          {currentUser ? (
            <>
              {/* Profile */}
              <button
                onClick={() => setDropdown(!dropdown)}
                className="w-8 h-8 md:w-9 md:h-9 rounded-full overflow-hidden border border-gray-300 hover:ring-2 hover:ring-red-500 transition"
              >
                <img
                  src={currentUser.photo || "https://i.pravatar.cc/150?img=3"}
                  alt={currentUser.username || "Profile"}
                  className="w-full h-full object-cover"
                />
              </button>

              {/* Dropdown */}
              {dropdown && (
                <div className="absolute right-0 top-12 bg-white rounded-md shadow-lg w-40 z-50">
                  <ul className="text-sm">
                    {navarr.map((items) => (
                      <li key={items.name} onClick={() => setDropdown(false)}>
                        <Link
                          to={items.href}
                          className="block px-4 py-2 hover:bg-gray-100 text-black"
                        >
                          {items.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-black"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <Link to="/login">
              <IoPersonOutline className="hover:text-red-500 transition" />
            </Link>
          )}

          {/* Wishlist */}
          <IoHeartOutline className="hover:text-red-500 transition hidden sm:block" />

          {/* Cart */}
          <Link to="/cart" className="relative">
            <IoCartOutline className="hover:text-red-500 transition" />

            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs 
                                min-w-[18px] h-[18px] flex items-center justify-center 
                                rounded-full font-bold">
                {cartItems.length}
              </span>
            )}
          </Link>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;
