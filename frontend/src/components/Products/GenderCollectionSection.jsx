import { Link } from "react-router-dom";
import mensCollectionImage from "../../assets/mens-collection.webp";
import womensCollectionImage from "../../assets/womens-collection.webp";

const GenderCollectionSection = () => {
    return (
        <section className="py-16 px-4 lg:px-0">
            <div className="container mx-auto flex flex-col gap-8 md:flex-row">
                {/* womens section */}
                <div className="relative flex-1">
                    <img
                        src={womensCollectionImage}
                        alt="womens collection"
                        className="w-full h-[700px] object-cover"
                    />
                    <div className="absolute bottom-5 left-8 p-4 bg-white/80 rounded-lg ">
                        <h2 className="text-black text-4xl font-bold mb-4">
                            Women's Collection
                        </h2>
                        <Link
                            to="/collection/all?gender=women"
                            className="bg-black text-white p-2 px-4 rounded-lg"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>

                {/* mens section */}
                <div className="relative flex-1">
                    <img
                        src={mensCollectionImage}
                        alt="mens colleciton "
                        className="w-full h-[700px] object-cover"
                    />
                    <div className="absolute bottom-5 left-8 p-4 bg-white/80 rounded">
                        <h2 className="text-black text-4xl font-bold mb-4">
                            Men's Collection
                        </h2>
                        <Link
                            to="/collection/all?gender=men"
                            className="bg-black text-white p-2 px-4 rounded-lg"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GenderCollectionSection;
