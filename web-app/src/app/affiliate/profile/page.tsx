"use client";

import { useUserProfile } from "../../providers/profileProvider";
import { ProfileDetails } from "@/components/affiliate/ProfileDetails";
import { ProfileStats } from "@/components/affiliate/ProfileStats";
import { ProfileCasts } from "@/components/affiliate/ProfileCasts";
import "react-farcaster-embed/dist/styles.css";

// TODO: allow them to unlink wallet
export default function AffiliateProfile() {
  const { userProfile: profile } = useUserProfile();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <h1 className="font-bold text-2xl">Profile</h1>
      <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <ProfileDetails profile={profile} />
          {profile != null ? <ProfileStats profile={profile} /> : <div>Loading...</div>}
        </div>
        <div className="mt-12 md:mt-20">
          <div className="flex flex-col">
            <h3 className="text-xl md:text-2xl font-bold pb-4">{`Recent Casts from ${profile?.displayName}`}</h3>
            {profile != null ? <ProfileCasts profile={profile} /> : <div>Loading...</div>}
          </div>
        </div>
      </div>
    </main>
  );
}
