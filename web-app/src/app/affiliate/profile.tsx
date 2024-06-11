"use client";
import { useEffect, useState } from "react";
import { FarcasterEmbed } from "react-farcaster-embed/dist/client";
import "react-farcaster-embed/dist/styles.css"; // include default styles or write your own
import farcasterIcon from "../../../public/farcastericon.svg";
import Image from "next/image";
import Link from "next/link";
import { URL } from "url";
import { Url } from "next/dist/shared/lib/router/router";
// use warpcast url

type UserProfile = {
  address: string;
  identity: string;
  platform: string;
  displayName: string;
  avatar: string;
  description: string;
  email: null | string;
  location: string;
  header: null | string;
  contenthash: null | string;
  links: {
    farcaster: {
      link: string;
      handle: string;
    };
  };
};

export function AffiliateProfile() {
  const [profile, setProfile] = useState<UserProfile>({} as UserProfile);
  useEffect(() => {
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };

    fetch(`https://api.web3.bio/profile/farcaster/builderszn.eth`, options)
      .then((response) => response.json())
      .then((result) => {
        console.log("results", result);
        setProfile(result);
      });
  }, []);
  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="flex flex-col items-center gap-6">
          <div className="relative flex justify-center items-center w-32 h-32 md:w-40 md:h-40">
            {profile && (
              <img src={profile.avatar} alt="Affiliate Profile Picture" className="rounded-full object-cover" />
            )}
          </div>
          <div className="text-center space-y-2">
            {profile && <h2 className="text-2xl md:text-3xl font-bold">{profile.displayName}</h2>}
            {profile && <p className="text-lg md:text-md text-gray-500">{profile.description}</p>}

            <div className="flex items-center justify-center gap-4">
              {profile && profile.links && profile.links.farcaster && (
                <Link href={profile.links.farcaster.link as Url}>
                  <Image src={farcasterIcon} alt="Farcaster Icon" className="w-6 h-6" />
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-4">Performance Metrics</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-100 rounded-lg p-4 space-y-2">
                <div className="text-sm text-gray-500 dark:text-gray-400">Total Sales</div>
                <div className="text-2xl font-bold text-right">$12,345</div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 space-y-2">
                <div className="text-sm text-gray-500 dark:text-gray-400">Commission Earned</div>
                <div className="text-2xl font-bold text-right">$1,234</div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 space-y-2">
                <div className="text-sm text-gray-500 dark:text-gray-400">Conversion Rate</div>
                <div className="text-2xl font-bold text-right">15%</div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 space-y-2">
                <div className="text-sm text-gray-500 dark:text-gray-400">Average Order Value</div>
                <div className="text-2xl font-bold text-right">$75</div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 space-y-2">
                <div className="text-sm text-gray-500 dark:text-gray-400">Total Referrals</div>
                <div className="text-2xl font-bold text-right">2,345</div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 space-y-2">
                <div className="text-sm text-gray-500 dark:text-gray-400">Repeat Purchase Rate</div>
                <div className="text-2xl font-bold text-right">25%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 md:mt-20">
        <h3 className="text-xl md:text-2xl font-bold mb-4">Recent Social Posts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <FarcasterEmbed url="https://warpcast.com/builderszn.eth/0x01dc8cad" />
          <FarcasterEmbed url="https://warpcast.com/gaonuk/0x41f836c5" />
          <FarcasterEmbed url="https://warpcast.com/nxs/0x124a2834" />
          <FarcasterEmbed url="https://warpcast.com/gkas23.eth/0x807da1c4" />
        </div>
      </div>
    </div>
  );
}
