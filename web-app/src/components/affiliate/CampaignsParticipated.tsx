"use client";
import { UserProfile } from "@/app/providers/profileProvider";
import { useQuery } from "@airstack/airstack-react";
import { profileQuery } from "@/app/queries/farcasterUser";
import { Channel } from "@/app/affiliate/interfaces";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { OfferCard } from "./OfferCard";

export function CampaignsParticipated({ profile }: { profile: UserProfile }) {
  const { data: profileData, loading, error } = useQuery(profileQuery(profile.links.farcaster.handle), { cache: true });
  const [campaignsParticipated, setCampaignsParticipated] = useState([]);
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
        campaigns(first: 10, where: {status: 0}) {
                id
                name
                commission
                merchantAddress
                price
                productImage
                productName
                status
                permalink
                stock
              }
      }
  }
            `,
        })
        .then((result) => {
          console.log("RESULT:", result);
          setCampaignsParticipated(result.data.affiliate.campaigns);
        })
        .catch((err) => {
          console.log("Error fetching data: ", err);
        });
  }, [profileData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (profileData && campaignsParticipated.length > 0) {
    return (
      <div>
        <h3 className="text-xl md:text-2xl font-bold pb-4">{`Your Campaigns`}</h3>

        <div className="grid md:grid-cols-3 gap-4">
          {campaignsParticipated.map((campaign: any, index: number) => {
            console.log("Promoteusrl", campaign.id, campaign.permalink);
            return (
              <OfferCard
                key={index}
                campaignId={campaign.id}
                from={campaign.merchantAddress}
                price={campaign.price}
                name={campaign.name}
                image={campaign.productImage}
                commission={campaign.commission}
                status={campaign.status.toString()}
                promoteUrl={campaign.permalink}
                affiliateFID={profileData.Socials.Social[0].userId}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
