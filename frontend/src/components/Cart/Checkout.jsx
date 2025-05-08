import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaypalButton from "./PaypalButton";

const Checkout = () => {
  const cart = {
    products: [
      {
        productId: 1,
        name: "T-shirt",
        size: "M",
        color: "Red",
        quantity: 1,
        price: 15,
        image: "https://picsum.photos/200?random=1",
      },
      {
        productId: 2,
        name: "Shirt",
        size: "L",
        color: "Blue",
        quantity: 1,
        price: 15,
        image: "https://picsum.photos/200?random=2",
      },
      {
        productId: 3,
        name: "T-shirt",
        size: "M",
        color: "Red",
        quantity: 1,
        price: 15,
        image: "https://picsum.photos/200?random=3",
      },
      {
        productId: 4,
        name: "T-shirt",
        size: "M",
        color: "Red",
        quantity: 1,
        price: 15,
        image: "https://picsum.photos/200?random=4",
      },
      {
        productId: 5,
        name: "T-shirt",
        size: "M",
        color: "Red",
        quantity: 1,
        price: 15,
        image: "https://picsum.photos/200?random=5",
      },
    ],
    totalPrice: 1500,
  };

  const navigate = useNavigate();
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

  // checkout
  const handleCreateCheckout = (e) => {
    e.preventDefault();
    setCheckoutId(12);
  };

  // payment success
  const handlePaymentSuccess = (details) => {
    console.log("Payment Success", details);
    navigate("/order-confirmation");
  };

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
              className="w-full p-2 rounded-lg border border-gray-500"
              required
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
                amount={100}
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
