import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

const Navigation = ({ pageRoute, pageName }) => {
  return (
    <div className="flex items-center">
      <IoIosArrowBack />
      <Link to={pageRoute}>{pageName}</Link>
    </div>
  );
};

export default Navigation;
