"use client";
import { FarcasterEmbed } from "react-farcaster-embed/dist/client";
import "react-farcaster-embed/dist/styles.css"; // include default styles or write your own
import farcasterIcon from "../../../../public/farcastericon.svg";
import Image from "next/image";
import Link from "next/link";

import { ProfileStatCard } from "@/components/affiliate/ProfileStatCard";
import { useUserProfile } from "../../providers/profileProvider";
import { query } from "../../queries/farcasterUser";
import { useQuery } from "@airstack/airstack-react";
import { AirstackProfileResponse } from "../interfaces";
import { useEffect, useState } from "react";

// use warpcast url

export default function AffiliateProfile() {
  const [queryInput, setQueryInput] = useState<string>("");
  const { userProfile: profile } = useUserProfile();
  const { data, loading, error } = useQuery(query(queryInput), {}, { cache: true });
  useEffect(() => {
    if (profile?.links.farcaster.handle) {
      setQueryInput(profile.links.farcaster.handle);
    }
  }, [profile]);

  if (loading) return <div>Loading...</div>;
  if (error) {
    console.log("ERROR:", error);
    return <div>Error: {error[0].message}</div>;
  }
  if (data) {
    const airstackData: AirstackProfileResponse = JSON.parse(JSON.stringify(data)) as AirstackProfileResponse;

    return (
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <h1 className="font-bold text-2xl">Profile</h1>
        <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-6">
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
                    <Link target="_blank" href={profile.links.farcaster.link}>
                      <Image src={farcasterIcon} alt="Farcaster Icon" className="w-6 h-6" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-4">Farcaster Metrics</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <ProfileStatCard name="Followers" value={airstackData.Socials.Social[0].followerCount.toString()} />
                  <ProfileStatCard
                    name="Power Badge"
                    value={airstackData.Socials.Social[0].isFarcasterPowerUser ? "☑️" : "❌"}
                  />
                  <ProfileStatCard
                    name="Social Capital Score"
                    value={airstackData.Socials.Social[0].socialCapital.socialCapitalScore.toFixed(5)}
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-4">Performance Metrics</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <ProfileStatCard name="Total Earned" value={"$10,250"} />
                  <ProfileStatCard name="Commission Earned" value={"$1,250"} />
                  <ProfileStatCard name="Conversion Rate" value={"4.7%"} />
                  <ProfileStatCard name="Average Order Value" value={"$120"} />
                  <ProfileStatCard name="Total Referrals" value={"574"} />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 md:mt-20">
            <h3 className="text-xl md:text-2xl font-bold mb-4">Recent Social Posts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {airstackData.FarcasterCasts.Cast.map((cast, index) => (
                <FarcasterEmbed key={index} url={cast.url} />
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }
}
