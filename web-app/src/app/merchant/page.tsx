"use client";
import Link from "next/link";
import { MerchantDashboard } from "./dasboard";
import { useState } from "react";
import { MerchantProducts } from "./products";

export default function Component() {
  const [page, setPage] = useState("dashboard");
  return (
    <div className="grid min-h-screen w-full grid-cols-[280px_1fr] overflow-hidden">
      <div className="hidden border-r  lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
              {/* <Package2Icon className="h-6 w-6" /> */}
              <span className="">Far-Reach 💜</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <button
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 ${
                  page === "dashboard" && "bg-gray-100"
                }`}
                onClick={() => setPage("dashboard")}
              >
                Dashboard
              </button>
              <button
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 ${
                  page === "products" ? "bg-gray-100" : ""
                }`}
                onClick={() => setPage("products")}
              >
                Products
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
        <main className="flex-1 p-4 md:p-6">
          {page === "dashboard" && <MerchantDashboard />}
          {page === "products" && <MerchantProducts />}
        </main>
      </div>
    </div>
  );
}
