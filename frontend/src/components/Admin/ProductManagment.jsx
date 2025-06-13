import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  deleteProduct,
  fetchAdminProducts,
} from "../../redux/slices/adminProductSlice";
import { toast } from "sonner";
import Navigation from "../Common/Navigation";

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
    if (
      window.confirm(`Are you sure you want to delete product "${productId}" ?`)
    ) {
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
      <Navigation pageRoute={`/admin`} pageName={"Dashboard"} />

      <div className="flex flex-row-reverse mb-4">
        <Link
          to={`/admin/products/add`}
          className="bg-blue-500 p-2 rounded-lg text-white cursor-pointer hover:bg-blue-600"
        >
          Add product
        </Link>
      </div>

      {/* order table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full text-left text-gray-800">
          <thead className="bg-gray-100 uppercase text-gray-700 text-sm">
            <tr>
              <td className="py-3 px-4">ID</td>
              <td className="py-3 px-4">Image</td>
              <td className="py-3 px-4">Name</td>
              <td className="py-3 px-4">Price</td>
              <td className="py-3 px-4">SKU</td>
              <td className="py-3 px-4">Actions</td>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-100 h-25"
                >
                  <td className="p-4 font-medium text-gray-900 w-10">
                    {product._id}
                  </td>
                  <td className="p-4 font-medium text-gray-900">
                    {/* {product.images[0].url} */}
                    <img
                      className="h-20 w-20 rounded-lg"
                      src={product.images[0]?.url}
                      alt={product.name}
                    />
                  </td>
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="p-4">${product?.price}</td>
                  <td className="p-4">{product?.sku}</td>
                  {/* <td className="p-4 grid grid-cols-2 gap-4"> */}
                  <td className="p-4 flex flex-row ">
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="p-2 rounded-lg "
                    >
                      <FaRegEdit className="h-6 w-6 hover:text-gray-600" />
                    </Link>
                    <button
                      className="p-2"
                      onClick={() => handleDeleteProduct(product.name)}
                    >
                      <MdDelete className="h-6 w-6 text-red-500 hover:text-red-600 cursor-pointer" />
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
