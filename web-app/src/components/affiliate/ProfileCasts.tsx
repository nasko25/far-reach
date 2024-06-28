import { profileQuery } from "@/app/queries/farcasterUser";
import { useQuery } from "@airstack/airstack-react";
import * as React from "react";
import "react-farcaster-embed/dist/styles.css";
import { FarcasterEmbedWrapper } from "./FarcasterEmbedWrapper";
import { UserProfile } from "@/app/providers/profileProvider";

export function ProfileCasts({ profile }: { profile: any }) {
  const { data: profileData, loading, error } = useQuery(profileQuery(profile.links.farcaster.handle), { cache: true });
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (profileData) {
    console.log(profileData, "PROFILEDATA");
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {profileData.FarcasterCasts.Cast.map((cast: any, index: number) => (
          <FarcasterEmbedWrapper
            key={index}
            hash={cast.hash}
            username={(profile as UserProfile).links.farcaster.handle}
          />
        ))}
      </div>
    );
  }
}
