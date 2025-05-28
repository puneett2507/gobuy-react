import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../redux/slices/cartSlice";

const CartContents = ({ cart, userId, guestId }) => {
  console.log(cart.products);
  const dispatch = useDispatch();

  const handleQuantityChange = (productId, change, quantity, size, color) => {
    const newQuantity = quantity + change;
    console.log(newQuantity);
    // if (newQuantity > 1) {
    dispatch(
      updateCartItemQuantity({
        productId,
        quantity: newQuantity,
        size,
        color,
        userId,
        guestId,
      })
    );
    // }
  };

  const handleRemoveFromCart = (productId, quantity, size, color) => {
    dispatch(
      removeFromCart({
        productId,
        quantity,
        size,
        color,
        userId,
        guestId,
      })
    );
  };

  return (
    <div>
      {cart.products.map((product, index) => (
        <div
          key={index}
          className="flex items-start justify-between py-4 border-b "
        >
          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 rounded object-cover mr-4"
            />
            <div>
              <h3>{product.name}</h3>
              <p className="text-sm text-gray-500">
                Size: {product.size} | Color: {product.color}
              </p>
              {/* quantity buttons */}
              <div className="flex items-center mt-2">
                <button
                  className="border rounded text-base font-medium px-2 py-1 cursor-pointer"
                  onClick={() =>
                    handleQuantityChange(
                      product.productId,
                      -1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                >
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(
                      product.productId,
                      1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                  className="border rounded text-base font-medium px-2 py-1 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          {/* price */}
          <div>
            <p className="font-medium">${product.price}</p>
            <AiOutlineDelete
              onClick={() =>
                handleRemoveFromCart(
                  product.productId,
                  product.quantity,
                  product.size,
                  product.color
                )
              }
              className="h-6 w-6 mt-2 text-red-600 cursor-pointer"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
