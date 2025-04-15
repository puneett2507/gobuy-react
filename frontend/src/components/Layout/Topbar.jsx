import { FaMeta } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Topbar = () => {
    return (
        <div className="bg-[#36558f] text-white">
            <div className="container mx-auto">
                <div>
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
            </div>
        </div>
    );
};

export default Topbar;
