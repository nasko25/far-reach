"use client";

import { usePrivy } from "@privy-io/react-auth";
import Head from "next/head";
import PrivyProviderWrapper from "@/components/privy-provider-wrapper";

export default function LoginPage() {
  const { login } = usePrivy();

  return (
    <>
      <Head>
        <title>Login · Privy</title>
      </Head>

      <main className="flex min-h-screen min-w-full">
        <div className="flex bg-privy-light-blue flex-1 p-6 justify-center items-center">
          <div>
            <div className="mt-6 flex justify-center text-center">
              <button className="bg-violet-600 hover:bg-violet-700 py-3 px-6 text-white rounded-lg" onClick={login}>
                Log in
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
