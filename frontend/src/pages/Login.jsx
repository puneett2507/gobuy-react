import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginImg from "../assets/login.webp";
import { loginUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../redux/slices/cartSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  // check redirect parameter
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(() => {
    if (user) {
      if (cart?.products?.length > 0 && guestId) {
        dispatch(mergeCart({ user, guestId })).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="flex">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg drop-shadow-2xl border-2 border-white"
        >
          <h2 className="text-2xl font-bold text-center mb-4">
            Hey there! <span className="text-xl font-medium">Welcome Back</span>
          </h2>
          <p className="text-center text-xl mb-6">Login Here</p>

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
            Login
          </button>

          <p className="text-center text-sm">
            Dont't have an account?{" "}
            <Link
              to={`/register?redirect=${encodeURIComponent(redirect)}`}
              className="text-blue-800"
            >
              Register here!
            </Link>
          </p>
        </form>
      </div>

      <div className="md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col items-center justify-center">
          <img
            src={loginImg}
            alt=""
            className="object-cover h-[650px] w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
