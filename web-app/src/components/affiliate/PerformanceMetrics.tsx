import { useQuery } from "@airstack/airstack-react";
import { CardContent } from "../Card";
import { StatCard } from "./StatCard";
import { profileQuery } from "@/app/queries/farcasterUser";
import { Coins, ShoppingBag, User } from "lucide-react";

import { UserProfile } from "@/app/providers/profileProvider";
import { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export function PerformanceMetrics({ profile }: { profile: UserProfile }) {
  const { data: profileData, loading, error } = useQuery(profileQuery(profile.links.farcaster.handle), { cache: true });
  const [performanceMetrics, setPerformanceMetrics] = useState<any>(null);
  const farReachClient = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_SUBGRAPH_URL!,
    cache: new InMemoryCache(),
  });
  useEffect(() => {
    if (profileData)
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
          console.log("RESULT:", result);
          setPerformanceMetrics(result.data.affiliate);
        })
        .catch((err) => {
          console.log("Error fetching data: ", err);
        });
  }, [profileData]);

  if (profileData)
    return (
      <CardContent>
        {performanceMetrics ? (
          <div className="grid gap-4">
            <StatCard name="Total Earned" value={performanceMetrics.totalEarned} money={true} Icon={Coins} />
            <StatCard
              name="Total Number of Sales"
              value={performanceMetrics.numberOfSales}
              unit={"units"}
              Icon={ShoppingBag}
            />
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </CardContent>
    );
}
