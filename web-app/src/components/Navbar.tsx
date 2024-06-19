"use client";
import { useUserProfile } from "@/app/providers/profileProvider";
import { usePrivy } from "@privy-io/react-auth";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const { logout, user } = usePrivy();
  const { userProfile: profile } = useUserProfile();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="text-white p-4 rounded-b-lg">
      <div className="flex justify-between">
        <Link href="/" className="flex justify-center items-center font-bold text-black">
          Far-Reach 💜
        </Link>
        <div className="flex">
          <Link
            href="/affiliate/dashboard"
            className="flex justify-center items-center text-black hover:underline py-2 px-6 rounded-lg"
          >
            For Affiliates
          </Link>
        </div>
        <div className="flex justify-end space-x-4">
          <div className="relative inline-block text-left">
            {!profile ? (
              <Link href="/auth" className="py-2 px-6 hover:underline text-black rounded-lg">
                Sign in
              </Link>
            ) : (
              <button
                className="flex justify-center items-center text-white bg-[#8A63D2] border rounded-lg h-full"
                onClick={toggleDropdown}
              >
                {profile && (
                  <div className="mr-2  flex justify-center items-center p-2">
                    <Image src="/farcastericon.svg" alt="Farcaster Icon" width={24} height={24} className="mr-2" />
                    {profile.displayName}
                  </div>
                )}
                <img src={profile.avatar} alt="Affiliate Profile Picture" className="rounded-full w-[40px] m-1" />
              </button>
            )}

            {isOpen && (
              <div className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
                <div className="py-1">
                  <Link href="/affiliate/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                  <Link onClick={logout} href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Sign Out
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
