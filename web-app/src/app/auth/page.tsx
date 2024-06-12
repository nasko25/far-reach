"use client";

import { LoginButton } from "@/components/LoginButton";
import { usePrivy } from "@privy-io/react-auth";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Authentication() {
  const { ready, authenticated, user, linkFarcaster } = usePrivy();
  console.log("user", user?.farcaster!);
  console.log("ready", ready);
  console.log("authenticated", authenticated);

  return (
    <div className="flex flex-col bg-gray-100">
      <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8 ">
        <div className="w-full max-w-xl space-y-8">
          <Link className="flex" href="/">
            <ArrowLeft />
            Back
          </Link>
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 ">
              Join our network of Shopify Merchants and Farcaster-native affiliates💜
            </h2>
          </div>
          <div className="flex justify-center space-y-4">
            <div className="flex flex-col items-center space-y-4 w-full">
              <div className="w-3/4 pt-4">
                <p className="pb-4 text-center text-sm text-gray-600 ">Sign-in with Privy</p>

                <LoginButton
                  className={`rounded-md text-center focus:outline-none  border border-black  w-full px-6 py-2 text-sm font-medium ${
                    ready && authenticated
                      ? "bg-black text-white hover:bg-gray-700"
                      : "bg-transparent text-black hover:bg-gray-100"
                  }`}
                />
              </div>

              {ready && authenticated && user && (
                <div className="w-3/4 pt-4">
                  <p className="pb-4 text-center text-sm text-gray-600 ">Link your Farcaster Account🟣</p>

                  <button
                    onClick={linkFarcaster}
                    disabled={!ready || !authenticated || !!user.farcaster}
                    className="rounded-md text-center focus:outline-none bg-transparent border border-black text-black hover:bg-gray-100 w-full px-6 py-2 text-sm font-medium disabled:bg-black disabled:text-white"
                  >
                    {!!user.farcaster ? "Farcaster Account Linked" : "Link"}
                  </button>
                </div>
              )}
              {ready && authenticated && user && !!user.farcaster && (
                <div className="w-3/4 pt-4">
                  <button
                    onClick={() => console.log("finalized")}
                    className="rounded-md text-center focus:outline-none bg-transparent border border-black text-black hover:bg-gray-100 w-full px-6 py-2 text-sm font-medium disabled:bg-black disabled:text-white"
                  >
                    Finalize 🥳
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
