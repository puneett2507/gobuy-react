import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const mockOrders = [
      {
        _id: "12345",
        createdAt: new Date(),
        shippingAddress: { city: "New York", country: "USA" },
        orderItems: [
          {
            name: "Product 1",
            image: "https://picsum.photos/500/500?random=1",
          },
        ],
        totalPrice: 1200,
        isPaid: true,
      },
      {
        _id: "42325",
        createdAt: new Date(),
        shippingAddress: { city: "Delhi", country: "India" },
        orderItems: [
          {
            name: "Product 1",
            image: "https://picsum.photos/500/500?random=2",
          },
        ],
        totalPrice: 1500,
        isPaid: false,
      },
    ];
    setOrders(mockOrders);
  }, []);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  return (
    <div className="max-w-7xl p-4 mx-auto">
      <h2 className="text-xl font-bold mb-6">My Orders</h2>
      <div className="relative shadow-md overflow-hidden">
        {console.log(orders)}
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-2 px-4">Image</th>
              <th className="py-2 px-4">Order id</th>
              <th className="py-2 px-4">created</th>
              <th className="py-2 px-4">Shipping address</th>
              <th className="py-2 px-4">Items</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => handleRowClick(order._id)}
                  className="hover:border hover:border-gray-300 cursor-pointer"
                >
                  <td className="p-2 ">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="h-10 w-10 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-2 font-medium text-gray-900 whitespace-nowrap">
                    #{order._id}
                  </td>
                  <td className="p-2 text-sm text-gray-800">
                    {new Date(order.createdAt).toLocaleDateString()}{" "}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="p2">
                    {order.shippingAddress
                      ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                      : "N/A"}
                  </td>
                  <td className="p-2">{order.orderItems.length}</td>
                  <td className="p-2">${order.totalPrice} </td>
                  <td className="p-2">
                    <span
                      className={`${
                        order.isPaid
                          ? "bg-green-100 text-green-500"
                          : "bg-red-100 text-red-500"
                      } rounded-full px-2 py-1 text-sm font-bold`}
                    >
                      {order.isPaid ? "PAID" : "UNPAID"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-4 text-center text-gray-600" colSpan={7}>
                  You have no orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
