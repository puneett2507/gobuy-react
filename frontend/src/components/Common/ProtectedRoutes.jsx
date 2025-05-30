import { useSelector } from "react-redux";

const ProtectedRoutes = ({ children, role }) => {
  const { user } = useSelector((state) => state.user);
  return <div>ProtectedRoutes</div>;
};

export default ProtectedRoutes;
