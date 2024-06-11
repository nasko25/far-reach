"use client";

import Image from "next/image";
import { ReactTyped } from "react-typed";
import LandingPageImage from "../../public/farclanding.png";
import Link from "next/link";

export default function Landing() {
  return (
    <>
      <div>
        <div className="flex justify-start items-center px-8">
          <div className="flex justify-center items-center text-7xl ">
            <div className="flex justify-center items-center">
              <p className="w-1/2 mr-8">
                Find Affiliates to Help You Sell
                <ReactTyped
                  strings={["Shoes", "Perfumes", "Candles"]}
                  typeSpeed={40}
                  backSpeed={50}
                  loop
                  className="font-semibold text-[#8A63D2] bg-transparent"
                >
                  <input type="text" className="bg-transparent" />
                </ReactTyped>
              </p>
              <Image src={LandingPageImage} alt="landing page image" className="w-1/4 h-1/4" />
            </div>
          </div>
        </div>
        <div className="flex justify-center space-x-4 max-w-screen-sm mx-auto py-4">
          <Link
            href="/merchant"
            className="px-6 py-2 bg-[#96bf48] text-white hover:bg-[#7a9e38] transition duration-300 rounded-lg"
          >
            Find Affiliates
          </Link>
          <Link
            href="/affiliate"
            className="px-6 py-2 bg-[#8A63D2] text-white hover:bg-purple-700 transition duration-300 rounded-lg"
          >
            Become a Far-Reacher
          </Link>
        </div>
      </div>
    </>
  );
}
