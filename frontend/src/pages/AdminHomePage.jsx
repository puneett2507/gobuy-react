import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllOrders } from "../redux/slices/adminOrderSlice";
import { fetchAdminProducts } from "../redux/slices/adminProductSlice";

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.adminProducts);
  const {
    orders,
    loading: ordersLoading,
    error: ordersError,
    totalOrders,
    totalSales,
  } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto">
      <h4 className="uppercase ml-4 font-medium text-2xl mb-4">
        Admin dashboard
      </h4>
      {productsLoading || ordersLoading ? (
        <p>Loading...</p>
      ) : productsError ? (
        <p className="text-red-500">Error fetching products: {productsError}</p>
      ) : ordersError ? (
        <p className="text-red-500">Error fetching Orders: {ordersError}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold">Revenue</h2>
            <p className="text-xl">${totalSales.toFixed(2)}</p>
          </div>
          <div className="p-4 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold">Total Orders</h2>
            <p className="text-xl">{totalOrders}</p>
            <Link to="/admin/orders" className="text-blue-500 hover:underline">
              Manage Orders
            </Link>
          </div>
          <div className="p-4 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold">Total Products</h2>
            <p className="text-xl">{products.length}</p>
            <Link
              to="/admin/products"
              className="text-blue-500 hover:underline"
            >
              Manage Products
            </Link>
          </div>
        </div>
      )}

      {/* recent orders */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-gray-600">
            <thead className="bg-gray-100 text-xs text-black">
              <tr>
                <td className="py-3 px-4">ORDER ID</td>
                <td className="py-3 px-4">USER</td>
                <td className="py-3 px-4">TOTAL PRICE</td>
                <td className="py-3 px-4">STATUS</td>
              </tr>
            </thead>

            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="p-4">{order?._id}</td>
                    <td className="p-4">{order?.user?.name}</td>
                    <td className="p-4">${order?.totalPrice?.toFixed(2)}</td>
                    <td className="p-4">{order?.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    No recent orders
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
