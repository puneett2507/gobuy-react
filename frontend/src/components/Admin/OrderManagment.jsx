const OrderManagment = () => {
  const orders = [
    {
      _id: 152,
      user: {
        name: "John Doe",
      },
      totalPrice: 500,
      status: "Processing",
    },
    {
      _id: 2,
      user: {
        name: "Doe",
      },
      totalPrice: 500,
      status: "Processing",
    },
    {
      _id: 52,
      user: {
        name: "John ",
      },
      totalPrice: 500,
      status: "Processing",
    },
    {
      _id: 15,
      user: {
        name: "John Doe",
      },
      totalPrice: 500,
      status: "Processing",
    },
  ];

  const handleStatusChange = (orderId, newStatus) => {
    console.log({ id: orderId, status: newStatus });
  };

  return (
    <div className="max-w-7xl max-auto">
      <h2 className="text-2xl font-semibold mb-4">Order Managment</h2>

      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-600">
          <thead className="bg-gray-100 text-xs text-gray-900 uppercase">
            <tr>
              <td className="py-3 px-4">Order id</td>
              <td className="py-3 px-4">Customer</td>
              <td className="py-3 px-4">Total price</td>
              <td className="py-3 px-4">status</td>
              <td className="py-3 px-4">actions</td>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4 font-medium whitespace-nowrap text-gray-900">
                    #{order._id}
                  </td>
                  <td className="py-3 px-4">{order.user.name}</td>
                  <td className="py-3 px-4">${order.totalPrice}</td>
                  <td className="py-3 px-4">
                    <select
                      name="status"
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="bg-gray-50 border border-gray-300 text-sm rounded-lg  text-gray-900 focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    >
                      <option value="processing">Processing</option>
                      <option value="shipping">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleStatusChange(order._id, "delivered")}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Mark as Delivered
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-3 px-4 text-center" colSpan={5}>
                  No Orders Found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagment;
