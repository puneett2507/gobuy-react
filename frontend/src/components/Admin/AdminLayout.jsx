import { Link, Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      <div className=" p-4 bg-black text-white z-50">
        <Link to="/">
          <h4 className="uppercase ml-4 font-medium text-2xl mb-4">
            GoBuy admin
          </h4>
        </Link>
        {/* admin sidebar */}
        <AdminSidebar />
      </div>

      {/* main content */}
      <div className="flex-grow p-4 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
