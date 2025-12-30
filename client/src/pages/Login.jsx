import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { Appcontext } from "../context/Appcontext";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { storeToken } = useContext(Appcontext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(data);

      //set token
      storeToken(data.token);
      console.log("Token stored successfully", data.token);

      // success
      setUser({
        email: "",
        password: "",
      });

      console.log("User logged in successfully");
      navigate("/");
    } catch (error) {
      // axios error handling
      if (error.response) {
        console.log("Login failed:", error.response.data.message);
      } else {
        console.log("Server error:", error.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-zinc-900">
      <div className="flex flex-col justify-center w-full max-w-80 rounded-xl px-6 py-8 border border-slate-700 bg-slate-900 text-white text-sm">
        <h2 className="text-2xl font-semibold">Sign In</h2>
        <p className="text-slate-300 mt-1">Login to your account</p>
        <form className="mt-8" onSubmit={handleLogin}>
          <label
            htmlFor="email"
            className="block mb-1 font-medium text-slate-300"
          >
            Email address
          </label>
          <input
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 mb-3 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-1 transition focus:ring-indigo-500 focus:border-indigo-500"
          />

          <label
            htmlFor="password"
            className="block mb-1 font-medium text-slate-300"
          >
            Password
          </label>
          <input
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 mb-2 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-1 transition focus:ring-indigo-500 focus:border-indigo-500"
          />
          <div className="text-right">
            <Link
              to="/registration"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Registration
            </Link>
          </div>
          <button
            type="submit"
            className="w-full mt-10 px-4 py-2.5 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
