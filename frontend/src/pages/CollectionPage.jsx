import { useEffect } from "react";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";

const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParmas] = useSearchParams();
  const queryParams = Object.fromEntries([...searchParmas]);
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, searchParmas]);

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
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default CollectionPage;
