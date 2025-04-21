import { IoCloseOutline } from "react-icons/io5";
import CartContents from "../Cart/CartContents";

const CartDrawer = ({ toggleCartDrawer, drawerOpen }) => {
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
			<div className="flex-grow p-4 overflow-y-auto">
				<h2 className="text-xl font-semibold mb-4">Your Cart</h2>
				<CartContents />
			</div>

			{/* checkout button */}
			<div className="p-4 bg-white sticky bottom-0">
				<button className="w-full bg-[#36558f] py-4 rounded-2xl text-white hover:bg-[#e5533d] transition font-semibold">
					Checkout
				</button>
				<p className="text-xs tracking-tighter text-gray-500 mt-2 text-center">
					Shipping, taxes and discount codes calculated at checkout
				</p>
			</div>
		</div>
	);
};

export default CartDrawer;
