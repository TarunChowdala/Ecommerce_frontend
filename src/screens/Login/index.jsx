import "./index.css";
import { Toaster, toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../../Components/Spinner";
const Login = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [logginIn, setLogginIn] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLogginIn(true);
      const url = "https://ecommerce-backend-g96o.onrender.com/auth/login";
      const body = userDetails;
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Login successful");
        localStorage.setItem("token", data.token);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error(data.error);
      }
      setLogginIn(false);
    } catch (err) {
      console.log(err, "error");
      toast.error("Something went wrong, Please try again.");
      setLogginIn(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  });
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-col items-center">
            <img
              alt="Ecommerce Logo"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="h-12 w-12 mb-2"
            />
            <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-px">
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-base font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  onChange={(e) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Enter your email"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-base"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-base font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  onChange={(e) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Enter your password"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-base"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-base font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {logginIn ? <Spinner /> : "Sign In"}
              </button>
            </div>
          </form>
          <p className="mt-6 text-center text-base text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <Toaster richColors position="top-right" />
    </>
  );
};

export default Login;
