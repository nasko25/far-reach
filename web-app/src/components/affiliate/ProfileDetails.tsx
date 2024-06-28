import Image from "next/image";
import Link from "next/link";
import farcasterIcon from "../../../public/farcastericon.svg";
import { UserProfile } from "@/app/providers/profileProvider";

export function ProfileDetails({ profile }: { profile: UserProfile | null }) {
  if (!profile) return <div>Loading...</div>;
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative flex justify-center items-center w-32 h-32 md:w-40 md:h-40">
        {profile && <img src={profile.avatar} alt="Affiliate Profile Picture" className="rounded-full object-cover" />}
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
  );
}
