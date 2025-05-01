import { useEffect, useState } from "react";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = [
      {
        _id: 1,
        name: "Product 1",
        price: 100,
        images: [{ url: "https://picsum.photos/500/500?random=1" }],
      },
      {
        _id: 2,
        name: "Product 2",
        price: 100,
        images: [{ url: "https://picsum.photos/500/500?random=2" }],
      },
      {
        _id: 3,
        name: "Product 3",
        price: 100,
        images: [{ url: "https://picsum.photos/500/500?random=3" }],
      },
      {
        _id: 4,
        name: "Product 4",
        price: 100,
        images: [{ url: "https://picsum.photos/500/500?random=4" }],
      },
      {
        _id: 5,
        name: "Product 5",
        price: 100,
        images: [{ url: "https://picsum.photos/500/500?random=5" }],
      },
      {
        _id: 6,
        name: "Product 6",
        price: 100,
        images: [{ url: "https://picsum.photos/500/500?random=6" }],
      },
      {
        _id: 7,
        name: "Product 7",
        price: 100,
        images: [{ url: "https://picsum.photos/500/500?random=7" }],
      },
      {
        _id: 8,
        name: "Product 8",
        price: 100,
        images: [{ url: "https://picsum.photos/500/500?random=8" }],
      },
    ];
    setProducts(fetchProducts);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* sidebar filter */}
      <div className="fixed inset-y-0 z-50 lg:static lg:translate-x-0 left-0 w-64 bg-white overflow-y-auto">
        <FilterSidebar />
      </div>

      {/* right section */}
      <div className="flex-grow p-4">
        <h2 className="text-2xl font-medium mb-4 uppercase">All collection</h2>

        {/* price sort filter */}
        <SortOptions />

        {/* product grid */}
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default CollectionPage;
