import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { useState } from "react";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Left Logo */}
        <div>
          <Link to="/" className="text-2xl font-medium ">
            GoBuy
          </Link>
        </div>

        {/* center navigation links */}
        <div className="flex space-x-6">
          <Link
            to="collection/all"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Men
          </Link>
          <Link
            to="collection/women"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Women
          </Link>
          <Link
            to="collection/top-wear"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Top Wear
          </Link>
          <Link
            to="collection/bottom-wear"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Bottom Wear
          </Link>
        </div>

        {/* right icons */}
        <div className="flex items-center space-x-4">
          <Link to="/profile" className="hover:text-black">
            <FiUser className="h-6 w-6 text-gray-700" />
          </Link>
          <button
            className="relative hover:text-black cursor-pointer"
            onClick={toggleCartDrawer}
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1 py-0.2">
              4
            </span>
          </button>

          {/* search button */}
          <SearchBar />
        </div>
      </nav>
      {/* cart drawer */}
      <CartDrawer toggleCartDrawer={toggleCartDrawer} drawerOpen={drawerOpen} />
    </>
  );
};

export default Navbar;
