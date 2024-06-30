"use client";
import { UserProfile } from "@/app/providers/profileProvider";
import { ProfileStatCard } from "./ProfileStatCard";
import { useQuery } from "@airstack/airstack-react";
import { profileQuery } from "@/app/queries/farcasterUser";
import { Channel } from "@/app/affiliate/interfaces";
import Image from "next/image";
import { useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export function ProfileStats({ profile }: { profile: UserProfile }) {
  const { data: profileData, loading, error } = useQuery(profileQuery(profile.links.farcaster.handle), { cache: true });
  const [performanceMetrics, setPerformanceMetrics] = useState<any>(null);
  const farReachClient = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_SUBGRAPH_URL!,
    cache: new InMemoryCache(),
  });
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (profileData) {
    console.log("PROFILE DATA", profileData);
    const channelsRaw = profileData.FarcasterCasts.Cast.map((cast: any) => cast.channel);
    const channels = channelsRaw.filter((channel: Channel | null) => channel != null);
    const frequency = channels.reduce((acc: any, channel: Channel) => {
      acc[channel.name] = (acc[channel.name] || 0) + 1;
      return acc;
    }, {});

    const sortedChannels = Object.keys(frequency)
      .sort((a, b) => frequency[b] - frequency[a])
      .map((key) => ({
        name: key,
        count: frequency[key],
        imageUrl: channels.find((channel: Channel) => channel.name === key).imageUrl,
      }));

    farReachClient
      .query({
        query: gql`
    query {
      affiliate(id: "${profileData.Socials.Social[0].userId}") {
        numberOfSales
        totalEarned
      }
  }
            `,
      })
      .then((result) => {
        console.log(result);
        setPerformanceMetrics(result.data.affiliate);
      })
      .catch((err) => {
        console.log("Error fetching data: ", err);
      });
    console.log("performancemetrics", performanceMetrics);
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
          <h3 className="text-xl md:text-2xl font-bold my-4">Recently Active At </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {sortedChannels.slice(0, 3).map((channel) => (
              <div className="bg-gray-100 rounded-lg p-4 space-y-2 flex flex-col justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400 flex justify-around items-center">
                  <Image className="rounded-lg" src={channel.imageUrl} width={24} height={24} alt={channel.name} />
                  <p>{channel.name}</p>
                </div>
                <div className="text-2xl font-bold text-right">{channel.count} casts</div>
              </div>
            ))}
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
