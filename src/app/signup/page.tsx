"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("SignUp error", error);

      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-slate-900 to-slate-700">
      <div className="w-full max-w-md p-10 bg-white shadow-lg rounded-2xl bg-gradient-to-r from-teal-200 to-teal-500">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Sign Up
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="username"></label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="email"></label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="password"></label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <button
          onClick={onSignup}
          type="submit"
          className="w-full p-2 text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full hover:bg-gray-600 mb-3"
        >
          {loading ? "Signning in..." : "Sign Up"}
        </button>
        <Link
          className="flex flex-end mt-3 justify-center border rounded-full  bg-gray-600 hover:bg-gray-800 text-white  border-gray-600 p-1.5  hover:text-white"
          href="/login"
        >
          Visit Login Page
        </Link>
        <Toaster />
      </div>
    </div>
  );
}
