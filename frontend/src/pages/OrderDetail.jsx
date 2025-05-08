import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const OrderDetail = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const mockOrderDetail = {
      _id: id,
      createdAt: new Date(),
      isPaid: true,
      isDelivered: false,
      paymentMethod: "PayPal",
      shippingMethod: "Standard",
      shippingAddress: { city: "Jaipur", country: "India" },
      orderItems: [
        {
          productId: "1",
          name: "Shirt",
          price: 120,
          quantity: 1,
          image: "https://picsum.photos/500?random=1",
        },
        {
          productId: "2",
          name: "Shirt",
          price: 80,
          quantity: 3,
          image: "https://picsum.photos/500?random=2",
        },
      ],
    };
    setOrderDetails(mockOrderDetail);
  }, [id]);

  return (
    <div className="max-w-7xl p-4 mx-auto">
      <h2 className="text-2xl font-bold mb-2">Order Details</h2>
      {!orderDetails ? (
        <p className="text-center">No Order details found!</p>
      ) : (
        <div className="rounded-lg p-4 border border-gray-600 ">
          {/* order info */}
          <div className="flex flex-col sm:flex-row justify-between mb-8">
            <div>
              {/* order id */}
              <h3 className="text-lg font-semibold">
                Order ID: #{orderDetails._id}
              </h3>
              {/* order date */}
              <p className="text-gray-600">
                {new Date(orderDetails.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex flex-col items-start sm:items-end mt-2 gap-2">
              {/* payment status */}
              <p>
                {" "}
                Payment status:{" "}
                <span
                  className={`${
                    orderDetails.isPaid
                      ? "bg-green-200 text-green-700"
                      : "bg-red-200 text-red-500"
                  } px-3 py-1 rounded-full text-sm mb-2 font-medium`}
                >
                  {orderDetails.isPaid ? "Paid" : "Unpaid"}
                </span>
              </p>

              {/* delivery status */}
              <p>
                {" "}
                Delivery status:{" "}
                <span
                  className={`${
                    orderDetails.isDelivered
                      ? "bg-green-200 text-green-700"
                      : "bg-red-200 text-red-500"
                  } px-3 py-1 rounded-full text-sm mb-2 font-medium`}
                >
                  {orderDetails.isDelivered ? "Delivered" : "Pending"}
                </span>
              </p>
            </div>
          </div>

          {/* order details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
              <p>Mode: {orderDetails.paymentMethod}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Shipping Info</h4>
              <p>Mode: {orderDetails.shippingMethod}</p>
              <p>
                Address: {orderDetails.shippingAddress.city},{" "}
                {orderDetails.shippingAddress.country}
              </p>
            </div>
          </div>

          {/* product list */}
          <div className="overflow-x-auto">
            <h4 className="text-xl font-semibold mb-4">Products</h4>
            <table className="min-w-full mb-4 text-gray-600">
              <thead className="bg-gray-100">
                <tr>
                  <td className="py-2 px-4">Name</td>
                  <td className="py-2 px-4">Unit Price</td>
                  <td className="py-2 px-4">Quantity</td>
                  <td className="py-2 px-4">Total</td>
                </tr>
              </thead>
              <tbody>
                {orderDetails.orderItems.map((item) => (
                  <tr key={item.productId} className="border-b">
                    <td className="py-2 px-4 flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-10 w-10 object-cover rounded-lg mr-4"
                      />
                      <Link
                        to={`/product/${item.productId}`}
                        className="hover:underline"
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className="py-2 px-4">${item.price}</td>
                    <td className="py-2 px-4">{item.quantity}</td>
                    <td className="py-2 px-4">${item.quantity * item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* back to my orders */}
            <Link to="/my-orders" className="text-blue-500 hover:underline">
              Back to My Orders
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
