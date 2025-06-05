import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteProduct,
  fetchAdminProducts,
} from "../../redux/slices/adminProductSlice";
import { toast } from "sonner";

const ProductManagment = () => {
  const disptach = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { products, loading, error } = useSelector(
    (state) => state.adminProducts
  );

  useEffect(() => {
    disptach(fetchAdminProducts());
  }, [disptach, user, navigate]);

  //  delete product function
  const handleDeleteProduct = (productId) => {
    if (window.confirm(`Are you sure you want to delete user ${productId} ?`)) {
      disptach(deleteProduct(productId)).then((response) => {
        toast.success(response.payload.message, {
          duration: 2000,
        });
      });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-7xl max-auto">
      <h2 className="text-2xl font-semibold mb-4">Product Managment</h2>

      {/* order table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full text-left text-gray-800">
          <thead className="bg-gray-100 uppercase text-gray-700 text-sm">
            <tr>
              <td className="py-3 px-4">ID</td>
              <td className="py-3 px-4">Name</td>
              <td className="py-3 px-4">Price</td>
              <td className="py-3 px-4">SKU</td>
              <td className="py-3 px-4">Actions</td>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-100">
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    {product._id}
                  </td>
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="p-4">${product.price}</td>
                  <td className="p-4">{product.sku}</td>
                  <td className="p-4">
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="px-4 py-2 rounded-lg text-white bg-yellow-400 hover:bg-yellow-500 mr-4"
                    >
                      Edit
                    </Link>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center">
                  No products found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagment;
