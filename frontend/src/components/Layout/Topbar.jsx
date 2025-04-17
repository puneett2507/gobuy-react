import { FaMeta } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Topbar = () => {
    return (
        <div className="bg-[#36558f] text-white">
            <div className="container mx-auto flex justify-between items-center px-4 py-3">
                <div className="flex items-center space-x-4">
                    <a href="#" className="hover:text-gray-300">
                        <FaMeta className="h-5 w-5" />
                    </a>
                    <a href="#" className="hover:text-gray-300">
                        <FaInstagram className="h-5 w-5" />
                    </a>
                    <a href="#" className="hover:text-gray-300">
                        <FaXTwitter className="h-5 w-5" />
                    </a>
                </div>
                <div className=" text-sm text-center ">
                    <span>
                        We deliver world-wide! Fast and reliable shipping
                    </span>
                </div>
                <div className="text-sm">
                    <a href="tel:+1234567890" className="hover:text-gray-300">
                        +1 (234) 567-890
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
