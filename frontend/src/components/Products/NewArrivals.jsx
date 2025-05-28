import { useEffect, useRef, useState } from "react";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import { Link } from "react-router-dom";
import axios from "axios";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrival`
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNewArrivals();
  }, []);

  const scrollFunction = (direction) => {
    const scrollAmount = direction === "left" ? -400 : 400;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;

    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollabe =
        container.scrollWidth > leftScroll + container.clientWidth;

      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollabe);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
    }
    // unmounting on page change
    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
    };
  }, [newArrivals]);

  return (
    <section className="mb-12">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-800 mb-4">
          Discover the latest styles straight off the runway, freshly added to
          keep your wardrobe on the cutting edge of fashion.
        </p>

        {/* scroll buttons */}
        <div className="absolute right-0 bottom-[-30px] flex space-x-2">
          <button
            onClick={() => scrollFunction("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded-full border border-gray-200 shadow-md  ${
              canScrollLeft
                ? "cursor-pointer"
                : "bg-gray-200 text-gray-800 cursor-not-allowed"
            }`}
          >
            <GrFormPrevious className="text-2xl" />
          </button>
          <button
            onClick={() => scrollFunction("right")}
            disabled={!canScrollRight}
            className={`p-2 rounded-full border border-gray-200 shadow-md ${
              canScrollRight
                ? "cursor-pointer"
                : "bg-gray-200 text-gray-800 cursor-not-allowed"
            }`}
          >
            <GrFormNext className="text-2xl" />
          </button>
        </div>
      </div>

      {/* scroll cards */}
      <div
        ref={scrollRef}
        className="container mx-auto flex space-x-6 relative overflow-x-scroll no-scrollbar"
      >
        {newArrivals.map((product) => (
          <div
            key={product._id}
            className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative"
          >
            <Link to={`/product/${product._id}`}>
              <img
                src={product.images[0].url}
                alt={product.name}
                className="w-full h-[400px] object-cover rounded-lg"
              />

              {/* product details */}
              <div className="absolute bottom-0 left-0 backdrop-blur-md w-full px-4 py-2 rounded-l-bg text-white">
                <h4 className="font-medium">{product.name}</h4>
                <p className="mt-1">${product.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
