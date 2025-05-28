import { useState } from "react";
import Hero from "../components/Layout/Hero";
import FeaturedProduct from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const [bestSeller, setBestSeller] = useState(null);

  useEffect(() => {
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );

        setBestSeller(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBestSeller();
  }, [dispatch]);

  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />

      {/* Best seller */}
      <h2 className="text-center text-3xl font-bold mb-2">Our Best Seller</h2>
      {bestSeller ? (
        <ProductDetails productId={bestSeller._id} />
      ) : (
        <p className="text-center">Loading BestSeller...</p>
      )}

      {/* featured products */}
      <FeaturedProduct />

      {/* features */}
      <FeaturesSection />
    </div>
  );
};

export default Home;
