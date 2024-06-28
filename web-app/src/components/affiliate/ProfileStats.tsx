import { UserProfile } from "@/app/providers/profileProvider";
import { ProfileStatCard } from "./ProfileStatCard";
import { useQuery } from "@airstack/airstack-react";
import { profileQuery } from "@/app/queries/farcasterUser";

export function ProfileStats({ profile }: { profile: UserProfile }) {
  const { data: profileData, loading, error } = useQuery(profileQuery(profile.links.farcaster.handle), { cache: true });
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (profileData) {
    console.log(profileData, "PROFILEDATA");
    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-xl md:text-2xl font-bold mb-4">Farcaster Metrics</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <ProfileStatCard name="Followers" value={profileData.Socials.Social[0].followerCount.toString()} />
            <ProfileStatCard
              name="Power Badge"
              value={profileData.Socials.Social[0].isFarcasterPowerUser ? "☑️" : "❌"}
            />
            <ProfileStatCard
              name="Social Capital Score"
              value={profileData.Socials.Social[0].socialCapital.socialCapitalScore.toFixed(5)}
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
    );
  }
}
