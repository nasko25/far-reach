"use client";

import "react-farcaster-embed/dist/styles.css";
import { useEffect, useState } from "react";

import { OfferCard } from "@/components/affiliate/OfferCard";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { usePrivy } from "@privy-io/react-auth";

export default function AffiliateOffers() {
  const [recentCampaigns, setRecentCampaigns] = useState([]); // [Campaign
  const { user } = usePrivy();
  const farReachClient = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_SUBGRAPH_URL!,
    cache: new InMemoryCache(),
  });
  useEffect(() => {
    farReachClient
      .query({
        query: gql`
          query {
            campaigns(first: 3, where: { status: 0 }) {
              id
              merchantAddress
              name
              price
              productImage
              productName
              commission
              status
              stock
              permalink
            }
          }
        `,
      })
      .then((result) => {
        console.log("CAMPAIGN: ", result);
        setRecentCampaigns(result.data.campaigns);
      })
      .catch((err) => {
        console.log("Error fetching data: ", err);
      });
  }, []);
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <h1 className="font-bold text-2xl">Offers</h1>
      <div className="grid gap-6">
        <div className="grid md:grid-cols-3 gap-6">
          {recentCampaigns.map((campaign: any) => {
            if (user && user.farcaster && user.farcaster.fid)
              return (
                <OfferCard
                  from={campaign.merchantAddress}
                  price={campaign.price}
                  name={campaign.name}
                  image={campaign.productImage}
                  commission={campaign.commission}
                  status={campaign.status.toString()}
                  promoteUrl={campaign.permalink}
                  campaignId={campaign.id}
                  affiliateFID={user.farcaster.fid.toString()}
                />
              );
          })}
        </div>
      </div>
    </main>
  );
}
