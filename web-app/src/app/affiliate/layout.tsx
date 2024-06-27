"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AirstackProvider } from "@airstack/airstack-react";

export default function Affiliate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { ready, authenticated, user } = usePrivy();
  console.log("ready", "auth", ready, authenticated);
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

  if (ready && authenticated)
    return (
      <AirstackProvider apiKey={process.env.NEXT_PUBLIC_AIRSTACK_API_KEY ?? ""}>
        <div>
          <Navbar />
          <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r  lg:block ">
              <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex-1 overflow-auto py-2">
                  <nav className="grid items-start px-4 text-sm font-medium">
                    <Link
                      href="/affiliate/dashboard"
                      className={`flex items-center gap-3 rounded-lg  px-3 py-2 text-gray-900  transition-all hover:text-gray-900 `}
                    >
                      {" "}
                      Dashboard
                    </Link>
                    <Link
                      href="/affiliate/offers"
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900`}
                    >
                      Offers
                    </Link>
                    <Link
                      href="/affiliate/profile"
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 `}
                    >
                      Profile
                    </Link>
                  </nav>
                </div>
              </div>
            </div>
            <div className="flex flex-col">{children}</div>
          </div>
        </div>
      </AirstackProvider>
    );
}
