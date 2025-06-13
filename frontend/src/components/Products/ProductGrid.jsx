import { Link } from "react-router-dom";

const ProductGrid = ({ products }) => {
  if (products.length == 0) {
    return (
      <p className="text-center font-medium text-xl mt-10">
        No Products to show!
      </p>
    );
  }
  return (
    <div>
      <div className="grid grid-cols-4">
        {products.map((product, index) => (
          <Link key={index} to={`/product/${product._id}`} className="block">
            <div className="bg-white p-4 rounded-lg">
              {/* product image */}
              <div className="w-full h-96 mb-4">
                <img
                  src={product.images[0]?.url}
                  alt=""
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>

              {/* product detail */}
              <h3 className="text-sm">{product.name}</h3>
              <p className="text-gray-600 tracking-tighter text-sm font-medium">
                ${product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
