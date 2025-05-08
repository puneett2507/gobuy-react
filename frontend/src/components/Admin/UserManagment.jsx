import { useState } from "react";

const UserManagment = () => {
  const users = [
    {
      _id: 32,
      name: "John Doe",
      email: "john.doe@gmail.com",
      role: "admin",
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer", //default
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // reset form
    setFormData({ name: "", email: "", password: "", role: "customer" });
  };

  const handleRoleChange = (userId, newRole) => {
    console.log({ user: userId, role: newRole });
  };

  const handleDeleteUser = (userId) => {
    console.log("delete", userId);
  };

  return (
    <div className="max-w-7xl max-auto">
      <h2 className="text-2xl font-semibold mb-4">User Managment</h2>

      {/* form for new user */}
      <div className="p-6 mb-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4">Add New User</h3>
        <form onSubmit={handleSubmit}>
          {/* name */}
          <div className="mb-4">
            <label className="block text-gray-900 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="py-1 px-2 border border-gray-400 rounded-lg w-1/2"
              placeholder="Enter user name"
              required
            />
          </div>

          {/* email */}
          <div className="mb-4">
            <label className="block text-gray-900 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="py-1 px-2 border border-gray-400 rounded-lg w-1/2"
              placeholder="Enter user email"
              required
            />
          </div>

          {/* password */}
          <div className="mb-4">
            <label className="block text-gray-900 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="py-1 px-2 border border-gray-400 rounded-lg w-1/2"
              placeholder="Enter user password"
              required
            />
          </div>

          {/* role */}
          <div className="mb-4">
            <label className="block text-gray-900 mb-2">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="py-1 px-2 border border-gray-400 rounded-lg w-1/2"
              required
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* submit button */}
          <button
            type="submit"
            className="bg-green-500 text-white rounded-lg py-2 px-4 hover:bg-green-400"
          >
            Add User
          </button>
        </form>
      </div>

      {/* user list managment */}
      <div className="overflow-x-auto shadow-md sm:shadow-lg">
        <table className="min-w-full text-left text-gray-800">
          <thead className="bg-gray-100 uppercase text-gray-700 text-xs">
            <tr>
              <td className="py-3 px-4">Name</td>
              <td className="py-3 px-4">Email</td>
              <td className="py-3 px-4">Role</td>
              <td className="py-3 px-4">Actions</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-100">
                <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                  {user.name}
                </td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="p-2 border rounded"
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagment;
