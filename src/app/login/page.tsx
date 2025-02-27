"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-fuchsia-500 to-pink-500">
      <div className="w-full max-w-md p-8 space-y-6 shadow-lg rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <div>
          <label
            className="block text-sm font-medium text-gray-600"
            htmlFor="email"
          ></label>
          <input
            type="email"
            className="w-full p-3 mt-1 border rounded-lg focus:ring focus:ring-blue-300"
            placeholder="Email"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600"></label>
          <input
            type="password"
            className="w-full p-3 mt-1 border rounded-lg focus:ring focus:ring-blue-300"
            placeholder="password"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <button
          onClick={onLogin}
          className="w-full p-3 text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full "
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <Link
          className="flex justify-center border rounded-full  text-white  border-gray-600 p-2 bg-gray-600 hover:bg-gray-800"
          href="/signup"
        >
          Visit Signup Page
        </Link>
        <Link
          className=" flex justify-center hover:text-gray-600 text-gray-800 "
          href="/forgotpassword"
        >
          Forgot Password
        </Link>
        <Toaster />
      </div>
    </div>
  );
}
