"use client";

import { LoginButton } from "@/components/LoginButton";
import { usePrivy } from "@privy-io/react-auth";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { contractAddress } from "@/constants";
import { EIP1193Provider, useWallets } from "@privy-io/react-auth";
import { createPublicClient, encodeFunctionData, http } from "viem";
import toast, { Toaster } from "react-hot-toast";
import { registry } from "../../../abis/Registry";
import { createWalletClient, custom } from "viem";
import { baseSepolia } from "viem/chains";
import { from } from "@apollo/client";
export default function Authentication() {
  const { ready, authenticated, user, linkFarcaster, linkWallet } = usePrivy();
  const [createdAffiliate, setCreatedAffiliate] = useState(false);
  const { wallets } = useWallets();
  console.log("wallets", wallets);
  const wallet = wallets[0]; // Replace this with your desired wallet
  console.log("user", user?.farcaster!);
  console.log("ready", ready);
  console.log("authenticated", authenticated);
  function randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }
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
              {ready && authenticated && user && !!user.farcaster && !user.wallet && (
                <div className="w-3/4 pt-4">
                  <p className="pb-4 text-center text-sm text-gray-600 ">Link your wallet</p>

                  <button
                    onClick={linkWallet}
                    disabled={!ready || !authenticated || !!user.wallet}
                    className="rounded-md text-center focus:outline-none bg-transparent border border-black text-black hover:bg-gray-100 w-full px-6 py-2 text-sm font-medium disabled:bg-black disabled:text-white"
                  >
                    {!!user.farcaster ? "Wallet Linked" : "Link"}
                  </button>
                </div>
              )}
              {ready && authenticated && user && !!user.farcaster && !!user.wallet && (
                <div className="w-3/4 pt-4">
                  <p className="pb-4 text-center text-sm text-gray-600 ">Register your Affiliate Account</p>

                  <button
                    className={
                      "rounded-md text-center focus:outline-none bg-transparent border border-black text-black hover:bg-gray-100 w-full px-6 py-2 text-sm font-medium disabled:bg-black disabled:text-white"
                    }
                    disabled={!ready || !authenticated || createdAffiliate}
                    onClick={async () => {
                      console.log("WALLET", wallet);
                      console.log("CONTRACT", contractAddress);
                      await wallet.switchChain(baseSepolia.id);
                      const provider = await wallet.getEthereumProvider();
                      const publicClient = createPublicClient({
                        chain: baseSepolia,
                        transport: http(),
                      });
                      const exists = (await publicClient.readContract({
                        address: contractAddress,
                        abi: registry,
                        functionName: "affiliates",
                        args: [user.farcaster?.fid],
                      })) as any[];
                      if (exists[2].length > 0) {
                        setCreatedAffiliate(true);
                        return;
                      }
                      const data = encodeFunctionData({
                        args: [
                          user.farcaster?.displayName,
                          randomNumber(0, 20),
                          randomNumber(0, 2000),
                          user.farcaster?.fid,
                        ],
                        abi: registry,
                        functionName: "createAffiliate",
                      });
                      const transactionRequest = {
                        from: wallet.address,
                        to: contractAddress,
                        data: data,
                      };
                      await provider.request({
                        method: "eth_sendTransaction",
                        params: [transactionRequest],
                      });
                      setCreatedAffiliate(true);
                    }}
                  >
                    Register Affiliate
                  </button>
                </div>
              )}
              {ready && authenticated && user && !!user.farcaster && !!user.wallet && createdAffiliate && (
                <div className="w-3/4 pt-4">
                  <Link
                    href="/affiliate/dashboard"
                    className="rounded-md text-center focus:outline-none bg-transparent border border-black text-black hover:bg-gray-100 w-full px-6 py-2 text-sm font-medium disabled:bg-black disabled:text-white"
                  >
                    Finalize 🥳
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
