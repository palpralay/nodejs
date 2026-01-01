import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { Appcontext } from "../context/Appcontext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registration = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const { storeToken } = useContext(Appcontext);

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (!user.username || !user.email || !user.phone || !user.password) {
      toast.error("All fields are required");
      return;
    }
    if (user.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (user.phone.length < 10) {
      toast.error("Phone number must be at least 10 digits");
      return;
    }
    if (!isValidEmail(user.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/register`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // console.log(data);

      //set token
      storeToken(data.token);

      // success
      setUser({
        username: "",
        email: "",
        phone: "",
        password: "",
      });
      toast.success("User registered successfully");
      console.log("User registered successfully");
      navigate("/");
    } catch (error) {
      // axios error handling
      if (error.response) {
        console.log("Registration failed:", error.response.data.message);
      } else {
        console.log("Server error:", error.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-zinc-900">
      <div className="flex flex-col justify-center w-full max-w-80 rounded-xl px-6 py-8 border border-slate-700 bg-slate-900 text-white text-sm">
        <h2 className="text-2xl font-semibold">Sign Up</h2>
        <form className="mt-8" onSubmit={handleRegistration}>
          <label
            htmlFor="username"
            className="block mb-1 font-medium text-slate-300"
          >
            Username
          </label>
          <input
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            className="w-full p-2 mb-3 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-1 transition focus:ring-indigo-500 focus:border-indigo-500"
          />{" "}
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
            htmlFor="phone"
            className="block mb-1 font-medium text-slate-300"
          >
            Phone Number
          </label>
          <input
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
            type="number"
            id="phone"
            name="phone"
            placeholder="Phone Number"
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
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Login
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

export default Registration;
