"use client";

import { useUserProfile } from "../../providers/profileProvider";
import { ProfileDetails } from "@/components/affiliate/ProfileDetails";
import { ProfileStats } from "@/components/affiliate/ProfileStats";
import { ProfileCasts } from "@/components/affiliate/ProfileCasts";
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/Card";
import { EarningsCard } from "@/components/affiliate/EarningsCard";
import { StatCard } from "@/components/affiliate/StatCard";
import { Coins, ShoppingBag, User } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import "react-farcaster-embed/dist/styles.css";
import { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { CampaignsParticipated } from "@/components/affiliate/CampaignsParticipated";

// TODO: allow them to unlink wallet
export default function AffiliateProfile() {
  const { userProfile: profile } = useUserProfile();
  const [leaderboard, setLeaderboard] = useState([]);
  const farReachClient = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_SUBGRAPH_URL!,
    cache: new InMemoryCache(),
  });
  useEffect(() => {
    farReachClient
      .query({
        query: gql`
          query {
            affiliates(first: 5, orderBy: totalEarned, orderDirection: desc) {
              address
              totalEarned
              numberOfSales
              name
              fid
            }
          }
        `,
      })
      .then((result) => {
        console.log(result);
        setLeaderboard(
          result.data.affiliates.map((affiliate: any) => {
            return {
              name: affiliate.name,
              totalEarned: affiliate.totalEarned,
              numberOfSales: affiliate.numberOfSales,
            };
          })
        );
      })
      .catch((err) => {
        console.log("Error fetching data: ", err);
      });
  }, []);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <h1 className="font-bold text-2xl">Profile</h1>
      <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <ProfileDetails profile={profile} />
          {profile != null ? <ProfileStats profile={profile} /> : <div>Loading...</div>}
        </div>
      </div>
      <div className="grid gap-6">
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardDescription>Far-reacher Leaderboard</CardDescription>
              <CardTitle>Top 5</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {leaderboard.length > 0 &&
                  leaderboard
                    .slice(0, 4)
                    .map((affiliate: any, index: number) => (
                      <EarningsCard name={affiliate.name} earnings={affiliate.totalEarned} />
                    ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>New Merchant Offers</CardDescription>
              <CardTitle>3 new offers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <ProductCard image="/placeholder.svg" name="Apple IPhone 13" commission={0.18} />
                <ProductCard image="/placeholder.svg" name="Lacoste Shirt" commission={125} />
                <ProductCard image="/placeholder.svg" name="Shopify Subscription" commission={0.01} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Analytics</CardDescription>
              <CardTitle>Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <StatCard name="User Interactions" value={3456} unit="clicks" change={12} Icon={User} />
                <StatCard name="Sales" value={1234} unit="in revenue" change={4} money={true} Icon={ShoppingBag} />
                <StatCard name="Commissions" value={632} unit="earned" change={7} money={true} Icon={Coins} />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-5 md:mt-5">
          <div className="flex flex-col">
            <h3 className="text-xl md:text-2xl font-bold pb-4">{`The Campaigns You Participate In:`}</h3>
            {profile ? <CampaignsParticipated profile={profile} /> : <div>Loading...</div>}
          </div>
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
