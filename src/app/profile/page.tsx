"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Success");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/myself");
    setData(res.data.data._id);
  };

  return (
    <>
      <div className="flex justify-end bg-gray-700">
        <button
          onClick={logout}
          className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg "
        >
          Logout
        </button>
        <button
          onClick={getUserDetails}
          className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ml-2 "
        >
          User Details
        </button>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-700">
        <h1>Profile Page</h1>
        <h2 className="p-1 rounded bg-green-500">
          {data === "nothing" ? (
            "Nothing"
          ) : (
            <Link href={`/profile/${data}`}>{data}</Link>
          )}
        </h2>
        <Toaster />
      </div>
    </>
  );
}
