"use client";
import { usePrivy } from "@privy-io/react-auth";
import React, { useState } from "react";

const Navbar = () => {
  const { login, logout, ready, authenticated } = usePrivy();

  return (
    <nav className="text-white p-4 rounded-b-lg">
      <div className="flex justify-between">
        <p className="flex justify-center items-center font-bold text-black">Far-Reach 💜</p>
        <div className="flex">
          <button className="flex justify-center items-center text-black hover:underline py-2 px-6 rounded-lg">
            Find Affiliates
          </button>
          <button className="flex justify-center items-center text-black hover:underline py-2 px-6 rounded-lg">
            Become a Far-Reacher
          </button>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            className="py-2 px-6 hover:underline text-black rounded-lg"
            onClick={ready && authenticated ? logout : login}
          >
            {ready && authenticated ? "Log out" : "Log in"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
