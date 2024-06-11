"use client";
import Link from "next/link";
import { AffiliateDashboard } from "./dashboard";
import { useState } from "react";
import { AffiliateOffers } from "./offers";
import { AffiliateProfile } from "./profile";

export default function Affiliate() {
  const [page, setPage] = useState("dashboard");
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r  lg:block ">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
              <span className="">Far-Reach 💜</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <button
                className={`flex items-center gap-3 rounded-lg  px-3 py-2 text-gray-900  transition-all hover:text-gray-900 ${
                  page === "dashboard" && "bg-gray-100"
                }`}
                onClick={() => setPage("dashboard")}
              >
                {" "}
                My Dashboard
              </button>
              <button
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 ${
                  page === "offers" && "bg-gray-100"
                }`}
                onClick={() => setPage("offers")}
              >
                Offers
              </button>
              <button
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 ${
                  page === "profile" && "bg-gray-100"
                }`}
                onClick={() => setPage("profile")}
              >
                Profile
              </button>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b px-6 lg:h-[60px]">
          <Link href="#" className="lg:hidden" prefetch={false}>
            {/* <Package2Icon className="h-6 w-6" /> */}
            <span className="sr-only">Home</span>
          </Link>
          <div className="flex-1">
            <h1 className="font-semibold text-lg md:text-2xl">Welcome Back 👋</h1>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          {page === "dashboard" && <AffiliateDashboard />}
          {page === "offers" && <AffiliateOffers />}
          {page === "profile" && <AffiliateProfile />}
        </main>
      </div>
    </div>
  );
}
