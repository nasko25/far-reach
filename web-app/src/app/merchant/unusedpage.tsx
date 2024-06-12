"use client";
import { useRouter } from "next/navigation";

import { usePrivy } from "@privy-io/react-auth";
import { MerchantDashboard } from "./dasboard";
import { useState } from "react";
import { MerchantProducts } from "./products";
import Navbar from "@/components/Navbar";

export default function Component() {
  const [page, setPage] = useState("dashboard");
  const { ready, authenticated, user } = usePrivy();
  const router = useRouter();

  if (!ready) {
    // Do nothing while the PrivyProvider initializes with updated user state
    return <></>;
  }

  if (ready && !authenticated) {
    // Replace this code with however you'd like to handle an unauthenticated user
    // As an example, you might redirect them to a login page
    router.push("/auth");
  }
  if (ready && authenticated) {
    return (
      <div>
        <Navbar />
        <div className="grid min-h-screen w-full grid-cols-[280px_1fr] overflow-hidden">
          <div className="hidden border-r  lg:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
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
            <main className="flex-1 p-4 md:p-6">
              {page === "dashboard" && <MerchantDashboard />}
              {page === "products" && <MerchantProducts />}
            </main>
          </div>
        </div>
      </div>
    );
  }
}
