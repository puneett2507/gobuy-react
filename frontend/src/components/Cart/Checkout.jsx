import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaypalButton from "./PaypalButton";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../redux/slices/checkoutSlice";
import axios from "axios";

const Checkout = () => {
  // const cart = {
  //   products: [
  //     {
  //       productId: 1,
  //       name: "T-shirt",
  //       size: "M",
  //       color: "Red",
  //       quantity: 1,
  //       price: 15,
  //       image: "https://picsum.photos/200?random=1",
  //     },
  //     {
  //       productId: 2,
  //       name: "Shirt",
  //       size: "L",
  //       color: "Blue",
  //       quantity: 1,
  //       price: 15,
  //       image: "https://picsum.photos/200?random=2",
  //     },
  //     {
  //       productId: 3,
  //       name: "T-shirt",
  //       size: "M",
  //       color: "Red",
  //       quantity: 1,
  //       price: 15,
  //       image: "https://picsum.photos/200?random=3",
  //     },
  //     {
  //       productId: 4,
  //       name: "T-shirt",
  //       size: "M",
  //       color: "Red",
  //       quantity: 1,
  //       price: 15,
  //       image: "https://picsum.photos/200?random=4",
  //     },
  //     {
  //       productId: 5,
  //       name: "T-shirt",
  //       size: "M",
  //       color: "Red",
  //       quantity: 1,
  //       price: 15,
  //       image: "https://picsum.photos/200?random=5",
  //     },
  //   ],
  //   totalPrice: 1500,
  // };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  // checkout
  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    if (cart && cart.products.length > 0) {
      console.log("btn click");
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: "Paypal",
          totalPrice: cart.totalPrice,
        })
      );
      console.log(res);
      if (res.payload && res.payload._id) {
        setCheckoutId(res.payload._id);
      }
    }
  };

  // payment success
  const handlePaymentSuccess = async (details) => {
    console.log("handlePaymentSuccess");
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        { paymentStatus: "paid", paymentDetails: details },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      await handleFinalizeCheckout(checkoutId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      navigate("/order-confirmation");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading Cart...</p>;
  if (error) return <p>Error Loading Cart: {error}</p>;
  if (!cart || !cart.products || cart.products.length === 0) {
    return <p>Your cart is empty!</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* left section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6 font-medium">checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-xl mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-black mb-2">
              Email<span style={{ color: "red", marginLeft: "5px" }}>*</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={user ? user.email : ""}
              className="w-full p-2 rounded-lg border border-gray-500"
              required
              disabled
            />
          </div>

          {/* delivery address */}
          <h3 className="text-xl mb-4">Delivery Details</h3>

          {/* name */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-black mb-2">
                First Name
                <span style={{ color: "red", marginLeft: "5px" }}>*</span>
              </label>
              <input
                type="text"
                placeholder="Enter first name"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                className="w-full p-2 rounded-lg border border-gray-500"
                required
              />
            </div>
            <div>
              <label className="block text-black mb-2">
                Last Name
                <span style={{ color: "red", marginLeft: "5px" }}>*</span>
              </label>
              <input
                type="text"
                placeholder="Enter last name"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                className="w-full p-2 rounded-lg border border-gray-500"
                required
              />
            </div>
          </div>

          {/* address */}
          <div className="mb-4">
            <label className="block text-black mb-2">
              Address
              <span style={{ color: "red", marginLeft: "5px" }}>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter address"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              className="w-full p-2 rounded-lg border border-gray-500"
              required
            />
          </div>

          {/* city and code */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-black mb-2">
                City
                <span style={{ color: "red", marginLeft: "5px" }}>*</span>
              </label>
              <input
                type="text"
                placeholder="Enter city"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="w-full p-2 rounded-lg border border-gray-500"
                required
              />
            </div>
            <div>
              <label className="block text-black mb-2">
                Postal Code
                <span style={{ color: "red", marginLeft: "5px" }}>*</span>
              </label>
              <input
                type="text"
                placeholder="Enter postal code"
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                className="w-full p-2 rounded-lg border border-gray-500"
                required
              />
            </div>
          </div>

          {/* country */}
          <div className="mb-4">
            <label className="block text-black mb-2">
              Country
              <span style={{ color: "red", marginLeft: "5px" }}>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter country"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
              className="w-full p-2 rounded-lg border border-gray-500"
              required
            />
          </div>

          {/* phone */}
          <div className="mb-4">
            <label className="block text-black mb-2">
              Phone
              <span style={{ color: "red", marginLeft: "5px" }}>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter phone"
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              className="w-full p-2 rounded-lg border border-gray-500"
              required
            />
          </div>

          {/* checkout button */}
          {!checkoutId ? (
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg cursor-pointer hover:bg-gray-700"
            >
              Continue to payment
            </button>
          ) : (
            <div>
              {/* paypal component */}
              <PaypalButton
                amount={cart.totalPrice}
                onSuccess={handlePaymentSuccess}
                onError={(err) => alert("Payment failed. Try again.")}
              />
            </div>
          )}
        </form>
      </div>

      {/* order summary section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-2xl mb-4">Order Summary</h3>

        <div className="border-t p-4m mb-4">
          {cart.products.map((product, index) => (
            <div
              key={index}
              className="flex items-start justify-between border-b border-gray-400 py-2 mt-2"
            >
              {/* img div */}
              <div className="flex items-start">
                <img
                  src={product.image}
                  alt="product-image"
                  className="w-20 h-24 object-cover rounded-lg mr-4"
                />
                {/* product details */}
                <div>
                  <h3 className="text-lg">{product.name}</h3>
                  <p className="text-gray-600">Size: {product.size}</p>
                  <p className="text-gray-600">Color: {product.color}</p>
                </div>
              </div>
              {/* product price */}
              <p className="text-xl">${product.price?.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mb-4 text-lg">
          <p>Subtotal</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
        <div className="flex items-center justify-between text-lg">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex items-center justify-between text-lg mt-4 border-t pt-4 font-medium">
          <p>Total</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
