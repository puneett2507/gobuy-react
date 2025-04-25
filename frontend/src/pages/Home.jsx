import Hero from "../components/Layout/Hero";
import FeaturedProduct from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";

const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />

      {/* Best seller */}
      <ProductDetails />

      {/* featured products */}
      <FeaturedProduct />

      {/* features */}
      <FeaturesSection />
    </div>
  );
};

export default Home;
