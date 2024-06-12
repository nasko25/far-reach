"use client";

import Image from "next/image";
import { ReactTyped } from "react-typed";
import LandingPageImage from "../../public/farclanding.png";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Landing() {
  return (
    <>
      <div className="moving-gradient">
        <Navbar />
        <div>
          <div className="flex justify-start items-center px-8">
            <div className="flex justify-center items-center text-7xl ">
              <div className="flex justify-center items-center">
                <p className="w-1/2 mr-8">
                  Help Shopify Merchants Sell
                  <ReactTyped
                    strings={["Snowboards", "Perfumes", "Candles", "Sneakers", "Socks", "Watches", "Jewelry"]}
                    typeSpeed={40}
                    backSpeed={50}
                    loop
                    className="font-semibold text-[#8A63D2] bg-transparent drop-shadow-[0_1.2px_1.2px_rgba(1,1,1,1)]
"
                  >
                    <input type="text" className="bg-transparent" />
                  </ReactTyped>
                  on Farcaster
                </p>
                <Image src={LandingPageImage} alt="landing page image" className="w-1/4 h-1/4" />
              </div>
            </div>
          </div>
          <div className="flex justify-center space-x-4 max-w-screen-sm mx-auto py-4">
            <Link
              href="/affiliate"
              className="px-6 py-2 bg-[#8A63D2] text-white  text-xl hover:bg-purple-700 transition duration-300 rounded-lg"
            >
              Become a Far-Reacher
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
