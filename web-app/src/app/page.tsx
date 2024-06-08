"use client";

import { usePrivy } from "@privy-io/react-auth";
import Head from "next/head";

export default function LoginPage() {
  const { login, logout, ready, authenticated } = usePrivy();

  return (
    <>
      <Head>
        <title>Login · Privy</title>
      </Head>

      <main className="flex min-h-screen min-w-full">
        <div className="flex bg-privy-light-blue flex-1 p-6 justify-center items-center">
          <div>
            <div className="mt-6 flex justify-center text-center">
              <button
                className="bg-violet-600 hover:bg-violet-700 py-3 px-6 text-white rounded-lg"
                onClick={ready && authenticated ? logout : login}
              >
                {ready && authenticated ? "Log out" : "Log in"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
