import { LiaShippingFastSolid } from "react-icons/lia";
import { HiOutlineArrowPathRoundedSquare } from "react-icons/hi2";
import { CiCreditCard1 } from "react-icons/ci";

const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto text-center grid grid-cols-3 gap-8">
        {/* feature one */}
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full">
            <LiaShippingFastSolid className="text-4xl" />
          </div>
          <h4 className="font-semibold tracking-tighter">
            FREE INTERNATION SHIPPING
          </h4>
          <p className="text-sm tracking-tighter text-gray-600">
            On all orders above $100
          </p>
        </div>

        {/* feature two */}
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full">
            <HiOutlineArrowPathRoundedSquare className="text-4xl" />
          </div>
          <h4 className="font-semibold tracking-tighter">45 DAYS RETURN</h4>
          <p className="text-sm tracking-tighter text-gray-600">
            Hassle-free return
          </p>
        </div>

        {/* feature three */}
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full">
            <CiCreditCard1 className="text-4xl" />
          </div>
          <h4 className="font-semibold tracking-tighter">SECURE CHECKOUT</h4>
          <p className="text-sm tracking-tighter text-gray-600">
            100% secure checkout
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
