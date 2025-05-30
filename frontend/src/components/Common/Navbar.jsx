import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) ||
    0;

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
            All
          </Link>
          <Link
            to="collection/all?gender=Men"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Men
          </Link>
          <Link
            to="collection/all?gender=Women"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Women
          </Link>
          <Link
            to="collection/all?category=Top Wear"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Top Wear
          </Link>
          <Link
            to="collection/all?category=Bottom Wear"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Bottom Wear
          </Link>
        </div>

        {/* right icons */}
        <div className="flex items-center space-x-4">
          {user && user.role === "admin" && (
            <Link
              to="/admin"
              className="block bg-black text-white px-2 rounded-lg"
            >
              Admin
            </Link>
          )}
          <Link to="/profile" className="hover:text-black">
            <FiUser className="h-6 w-6 text-gray-700" />
          </Link>
          <button
            className="relative hover:text-black cursor-pointer"
            onClick={toggleCartDrawer}
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1 py-0.2">
                {cartItemCount}
              </span>
            )}
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
