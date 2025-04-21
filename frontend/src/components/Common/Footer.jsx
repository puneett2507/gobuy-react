import { Link } from "react-router-dom";
import { FaMeta } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdOutlinePhoneInTalk } from "react-icons/md";

const Footer = () => {
    return (
        <footer className="border-t py-12">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
                <div>
                    <h3 className="text-lg text-gray-800 mb-4 font-semibold">
                        {" "}
                        Newsletter
                    </h3>
                    <p className="text-gray-500 mb-4">
                        Be the first one to hear about our new products, offers
                        and events
                    </p>
                    <p className="text-xs font font-medium text-gray-800 mb-3">
                        Sign Up and get 10% off on your first order
                    </p>

                    {/* newsletter form */}
                    <form className="flex ">
                        <input
                            type="email"
                            placeholder="Enter you email"
                            className="p-3 text-sm w-full border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                            required
                        />
                        <button className="px-6 py-3 text-white bg-black text-sm rounded-r-md hover:bg-gray-700 transition-all">
                            Subscribe
                        </button>
                    </form>
                </div>

                {/* shop links */}
                <div>
                    <h3 className="text-lg text-gray-800 mb-3 font-semibold">
                        Shop
                    </h3>
                    <ul className="space-y-2 text-black">
                        <li>
                            <Link to="#" className="hover:text-gray-600">
                                Men's Top Wear
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:text-gray-600">
                                Men's Bottom Wear
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:text-gray-600">
                                Women's Top Wear
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:text-gray-600">
                                Women's Bottom Wear
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* support links */}
                <div>
                    <h3 className="text-lg text-gray-800 mb-3 font-semibold">
                        Support
                    </h3>
                    <ul className="space-y-2 text-black">
                        <li>
                            <Link to="#" className="hover:text-gray-600">
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:text-gray-600">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:text-gray-600">
                                Features
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:text-gray-600">
                                FAQs
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* follow section */}
                <div>
                    <h3 className="text-lg text-gray-800 mb-3 font-semibold">
                        Follow us
                    </h3>
                    <div className="flex items-center space-x-4 mb-6">
                        <a
                            href="https://www.facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-gray-500"
                        >
                            <FaMeta className="h-6 w-6" />
                        </a>
                        <a
                            href="https://www.instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-gray-500"
                        >
                            <FaInstagram className="h-6 w-6" />
                        </a>
                        <a
                            href="https://www.twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-gray-500"
                        >
                            <FaXTwitter className="h-6 w-6" />
                        </a>
                    </div>
                    <p className="text-gray-700">Call us</p>
                    <p>
                        <MdOutlinePhoneInTalk className="inline-block mr-2" />
                        0123-456-789
                    </p>
                </div>
            </div>

            {/* footer bottom */}
            <div className="container mx-auto mt-12 px-4 border-t border-gray-200 pt-6">
                <p className="text-gray-500 tracking-tighter text-sm text-center">
                    {" "}
                    © All Rights Reserved. Developed by Puneet Rawat{" "}
                </p>
            </div>
        </footer>
    );
};

export default Footer;
