import { useState } from "react";
import { Link } from "react-router-dom";
import register from "../assets/register.webp";

import { registerUser } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <div className="flex">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg drop-shadow-2xl border-2 border-white"
        >
          <h2 className="text-2xl font-bold text-center mb-4">Hey there!</h2>
          <p className="text-center text-xl mb-6">Register Here</p>

          {/* name input */}
          <div className="mb-4">
            <label className="block text-md font-semibold mb-2">Name: </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-2 rounded border"
            />
          </div>

          {/* email input */}
          <div className="mb-4">
            <label className="block text-md font-semibold mb-2">Email: </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-2 rounded border"
            />
          </div>

          {/* password input */}
          <div className="mb-4">
            <label className="block text-md font-semibold mb-2">
              Password:{" "}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-2 rounded border"
            />
          </div>

          {/* submit button */}
          <button className="bg-black text-white w-full rounded-lg p-2 hover:bg-gray-700 font-semibold transition cursor-pointer mb-4">
            Sign Up
          </button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-800">
              Login here!
            </Link>
          </p>
        </form>
      </div>

      <div className="md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col items-center justify-center">
          <img
            src={register}
            alt=""
            className="object-cover h-[650px] w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
