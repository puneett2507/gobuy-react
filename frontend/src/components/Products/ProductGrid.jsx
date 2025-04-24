import { Link } from "react-router-dom";

const ProductGrid = ({ products }) => {
  return (
    <div>
      <h2 className="text-center text-3xl font-bold mb-2">You May Also Like</h2>
      <div className="grid grid-cols-4">
        {products.map((product, index) => (
          <Link key={index} to={`product/${product._id}`} className="block">
            <div className="bg-white p-4 rounded-lg">
              {console.log(product.images.url)}
              {/* product image */}
              <div className="w-full h-96 mb-4">
                <img
                  src={product.images.url}
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
