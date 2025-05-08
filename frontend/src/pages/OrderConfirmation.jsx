const checkout = {
  _id: "123",
  createdAt: new Date(),
  checkoutItems: [
    {
      productId: 1,
      name: "Jeans",
      color: "black",
      size: "M",
      price: 150,
      quantity: 1,
      image: "https://picsum.photos/500?random=1",
    },
    {
      productId: 2,
      name: "Jacket",
      color: "Blue",
      size: "S",
      price: 25,
      quantity: 3,
      image: "https://picsum.photos/500?random=2",
    },
  ],
  shippingAddress: {
    address: "152/Mansarovar",
    city: "Jaipur",
    country: "India",
  },
};

const OrderConfirmation = () => {
  // estimate calulator function
  const calculateEstimateDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate.toLocaleDateString();
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center mb-8 text-emerald-800">
        Thank you for your Order!
      </h1>

      {checkout && (
        <div className="p-6 rounded-lg border">
          <div className="flex justify-between mb-20">
            {/* order id and date */}
            <div>
              <h2 className="text-xl font-semibold">
                Order ID: {checkout._id}
              </h2>
              <p className="text-gray-500">
                Order Date: {checkout.createdAt.toLocaleDateString()}
              </p>
            </div>

            {/* estimate delivery */}
            <div>
              <p className="text-emerald-700 text-sm ">
                {" "}
                Estimated Delivery:{" "}
                {calculateEstimateDelivery(checkout.createdAt)}
              </p>
            </div>
          </div>

          {/* ordered items */}
          <div className="mb-2">
            {checkout.checkoutItems.map((item) => (
              <div key={item.productId} className="flex items-start mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-20 rounded-lg object-cover mb-4"
                />
                <div className="ml-4">
                  <h4 className="text-md font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    {item.size} | {item.color}
                  </p>
                </div>

                <div className="ml-auto text-right">
                  <p className="text-md">${item.price}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-8">
            {/* payment info */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment</h4>
              <p className="text-gray-600">Paypal</p>
            </div>

            {/* delivery info */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Delivery</h4>
              <p className="text-gray-600">
                {checkout.shippingAddress.address}
              </p>
              <p className="text-gray-600">
                {checkout.shippingAddress.city},{" "}
                {checkout.shippingAddress.country}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmation;
