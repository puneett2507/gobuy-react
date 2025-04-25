import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";

const selectedProduct = {
  name: "Stylish Jacket",
  price: 120,
  originalPrice: 150,
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima asperiores ea corrupti animi accusamus excepturi eaque illum sunt voluptas expedita, minus perspiciatis, odio pariatur vero consequatur saepe, laboriosam architecto voluptatum.",
  brand: "Levis",
  material: "Leather",
  sizes: ["S", "M", "L", "XL"],
  colors: ["Red", "Black"],
  images: [
    {
      url: "https://picsum.photos/500/500?random=1",
      altText: "Stylish Jacket 1",
    },
    {
      url: "https://picsum.photos/500/500?random=2",
      altText: "Stylish Jacket 2",
    },
  ],
};

const similarProducts = [
  {
    _id: 1,
    name: "New Jeans",
    price: 150,
    images: {
      url: "https://picsum.photos/500/500?random=3",
    },
  },
  {
    _id: 2,
    price: 150,
    name: "New Jeans",
    images: {
      url: "https://picsum.photos/500/500?random=4",
      altText: "Image",
    },
  },
  {
    _id: 3,
    price: 150,
    name: "New Jeans",
    images: {
      url: "https://picsum.photos/500/500?random=5",
    },
  },
  {
    _id: 4,
    price: 150,
    name: "New Jeans",
    images: {
      url: "https://picsum.photos/500/500?random=6",
    },
  },
];

const ProductDetails = () => {
  const [mainImage, setMainImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // quantity function
  const handleQuantityChange = (action) => {
    if (action === "decrease" && selectedQuantity > 1)
      setSelectedQuantity((prev) => prev - 1);
    if (action === "increase") setSelectedQuantity((prev) => prev + 1);
  };

  // add to cart function
  const handleAddToCart = () => {
    if (!selectedColor) {
      toast.error("Please select a color!", {
        duration: 1000,
      });
      return;
    }
    if (!selectedSize) {
      toast.error("Please select a size!", {
        duration: 1000,
      });
      return;
    }

    setIsButtonDisabled(true);

    setTimeout(() => {
      toast.success("Product added to cart successfully!", {
        duration: 1000,
      });
      setIsButtonDisabled(false);
    }, 5000);
  };

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0]?.url);
    }
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-center text-3xl font-bold mb-2">Our Best Seller</h2>
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row mb-12">
          {/* product thumbnails */}
          <div className="flex flex-col space-y-4 mr-6">
            {selectedProduct.images.map((image, index) => (
              <img
                onClick={() => setMainImage(image.url)}
                key={index}
                src={image.url}
                alt={image.altText}
                className={`h-20 w-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === image.url
                    ? "outline-2 outline-offset-2 "
                    : "border-gray-200"
                }`}
              />
            ))}
          </div>

          {/* main image */}
          <div className="md:w-1/2 flex">
            <div>
              <img
                src={mainImage}
                alt="Product Thumbnail"
                className="w-full h-full object-cover rounded-lg "
              />
            </div>
          </div>

          {/* product details */}
          <div className="w-1/2 ml-10">
            {/* product name */}
            <h1 className="text-2xl font-semibold mb-2">
              {selectedProduct.name}
            </h1>

            {/* product price */}
            <div className="flex items-baseline gap-2">
              <p className="text-xl text-gray-700 mb-2">
                ${selectedProduct.price}
              </p>
              <p className="text-sm text-gray-600 mb-1 line-through">
                {selectedProduct.originalPrice &&
                  `$${selectedProduct.originalPrice}`}
              </p>
            </div>

            {/* product description */}
            <p className="text-black mb-4">{selectedProduct.description}</p>

            {/* product material and brand */}
            <div className="mb-4">
              {/* <h3 className="text-xl font-medium mb-1">Characteristics:</h3> */}
              <table className="w-1/2 text-left text-md">
                <tbody>
                  <tr>
                    <td className="text-black font-medium py-1">Brand: </td>
                    <td className="py-1">{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="text-black font-medium py-1">Material: </td>
                    <td className="py-1">{selectedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* product colors */}
            <div className="mb-4">
              <p className="text-black font-medium text-lg mb-1">Colors:</p>
              <div className="flex gap-2 mb-2">
                {selectedProduct.colors.map((color) => (
                  <button
                    onClick={() => setSelectedColor(color)}
                    key={color}
                    className={`h-6 w-6 rounded-full cursor-pointer border ${
                      selectedColor === color
                        ? "outline-2 outline-offset-2"
                        : ""
                    }`}
                    style={{
                      background: color.toLocaleLowerCase(),
                      filter: "brightness(0.5)",
                    }}
                  ></button>
                ))}
              </div>
            </div>

            {/* product sizes */}
            <div className="mb-4">
              <p className="text-black font-medium text-lg mb-1">Size:</p>
              <div className="flex gap-2 mb-2">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-2 py-1 border rounded-xs cursor-pointer ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* quantity */}
            <div className="mb-4">
              <p className="text-black font-medium text-lg mb-1">Quantity:</p>
              <div className="flex space-x-4 items-center ">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  className="py-1 px-2 bg-gray-200 rounded-l-lg text-xl cursor-pointer"
                >
                  -
                </button>
                <p className="text-md">{selectedQuantity}</p>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  className="py-1 px-2 bg-gray-200 rounded-r-lg text-lg cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* add to cart btn */}
            <button
              onClick={() => handleAddToCart()}
              disabled={isButtonDisabled}
              className={`xp-6 py-2 bg-black text-white text-center w-full rounded-lg mb-10 ${
                isButtonDisabled
                  ? "bg-gray-500 cursor-not-allowed opacity-50"
                  : "hover:bg-gray-500"
              }`}
            >
              {isButtonDisabled ? "Adding..." : "ADD TO CART"}
            </button>
          </div>
        </div>

        {/* similar products */}
        <ProductGrid products={similarProducts} />
      </div>
    </div>
  );
};

export default ProductDetails;
