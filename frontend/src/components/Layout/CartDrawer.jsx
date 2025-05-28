import { IoCloseOutline } from "react-icons/io5";
import CartContents from "../Cart/CartContents";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CartDrawer = ({ toggleCartDrawer, drawerOpen }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;

  const handleCheckout = () => {
    toggleCartDrawer();
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white shadow-lg w-1/4 flex flex-col z-50 transform transition-transform duration-300 ${
        drawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* close button */}
      <div className="flex justify-end p-4">
        <button onClick={toggleCartDrawer}>
          <IoCloseOutline className="h-6 w-6 cursor-pointer" />
        </button>
      </div>

      {/* cart content */}
      <div className="flex-grow px-4 py-2 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        {cart && cart?.products?.length > 0 ? (
          <CartContents cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <div className="flex flex-col justify-center items-center gap-4">
            <p className="mt-50 font-medium text-xl">Your Cart is empty!</p>
            <Link
              to="#"
              className="bg-gray-950 text-white px-4 py-1 rounded-lg text-lg"
            >
              Shop Now
            </Link>
          </div>
        )}
      </div>

      {/* checkout button */}
      <div className="p-4 bg-white sticky bottom-0">
        {cart && cart?.products?.length > 0 && (
          <>
            <button
              onClick={handleCheckout}
              className="w-full bg-[#36558f] py-2 rounded-2xl text-white hover:bg-[#e5533d] transition font-semibold"
            >
              Checkout
            </button>
            <p className="text-xs tracking-tighter text-gray-500 mt-2 text-center">
              Shipping and taxes are calculated at checkout
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
