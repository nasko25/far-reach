"use client";
import { usePrivy } from "@privy-io/react-auth";
import React, { useState } from "react";

const Navbar = () => {
  const { login, logout, ready, authenticated } = usePrivy();

  return (
    <nav className="bg-white text-white p-4">
      <div className="flex justify-end">
        <div className="flex space-x-4">
          <button
            className="bg-[#8A63D2] hover:bg-violet-700 py-2 px-6 text-white rounded-lg"
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
