"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
  });

  const onForgot = async () => {
    try {
      await axios.post("/api/users/forgotpassword", user);
      toast.success("Email sent successfully");
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-slate-900 to-slate-700">
      <div className="w-full max-w-md p-10 bg-white shadow-lg rounded-2xl bg-gradient-to-r from-teal-200 to-teal-500">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          FORGOT PASSWORD
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="email"></label>
          <input
            type="text"
            id="email"
            placeholder="Email"
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <button
            onClick={onForgot}
            type="submit"
            className="mt-8 w-full p-2 text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full hover:bg-gray-600 mb-3"
          >
            Send Email
          </button>
          <Toaster />
        </div>
      </div>
    </div>
  );
}
