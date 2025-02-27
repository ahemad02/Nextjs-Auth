"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function VerifyForgotPasswordPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    password: "",
    confirmPassword: "",
  });
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const newPassword = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/newpassword", {
        ...user,
        token,
      });
      toast.success(response.data.message);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const resetpassword = async () => {
    try {
      await axios.post("/api/users/resetpassword", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, [resetpassword]);

  useEffect(() => {
    if (token.length > 0) {
      resetpassword();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Password Reset</h1>
      {verified && (
        <div>
          <label className="block text-gray-700" htmlFor="email"></label>
          <input
            type="password"
            id="password"
            placeholder="New Passsword"
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <input
            type="password"
            id="confirmpassword"
            placeholder="Confirm Passsword"
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={user.confirmPassword}
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
          />
          <button
            onClick={newPassword}
            type="submit"
            className="mt-8 w-full p-2 text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full hover:bg-gray-600 mb-3"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
          {error && (
            <p className="text-red-500">
              Something went wrong please try again
            </p>
          )}
        </div>
      )}
      {!verified && <div></div>}
      <Toaster />
    </div>
  );
}
