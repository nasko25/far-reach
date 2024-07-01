"use client";
import { contractAddress, purple } from "@/constants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Card";
import { PromoteButton } from "./PromoteButton";
import { useEffect, useState } from "react";
import { createPublicClient, http } from "viem";
import { baseSepolia } from "viem/chains";
import { registry } from "../../../abis/Registry";

export function OfferCard({
  from,
  price,
  name,
  image,
  commission,
  promoteUrl,
  status,
  campaignId,
  affiliateFID,
}: {
  from: string;
  price: string;
  name: string;
  image: string;
  commission: string;
  promoteUrl: string;
  status: string;
  campaignId: string;
  affiliateFID: string;
}) {
  console.log(price, "PRICE");
  const [totalSales, setTotalSales] = useState<BigInt>(BigInt(0));
  const [totalEarned, setTotalEarned] = useState<number>(0);
  const [conversionRate, setConversionRate] = useState<number>(0);
  useEffect(() => {
    fetch(`https://far-reach.vercel.app/api/analytics/10`)
      .then((res) => res.json())
      .then((data) => setConversionRate(data.userConversion));

    const publicClient = createPublicClient({
      chain: baseSepolia,
      transport: http(),
    });
    publicClient
      .readContract({
        address: contractAddress,
        abi: registry,
        functionName: "affiliatesInCampaignsTotalSales",
        args: [campaignId, affiliateFID],
      })
      .then((res) => setTotalSales(res as BigInt));

    publicClient
      .readContract({
        address: contractAddress,
        abi: registry,
        functionName: "affiliatesInCampaignsTotalEarned",
        args: [campaignId, affiliateFID],
      })
      .then((res) => setTotalEarned((Number(res) / 0.9) * 0.1));
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardDescription>Offer from {`${from.substring(0, 6)}...${from.substring(from.length - 4)}`}</CardDescription>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <img src={image} alt={name} className="w-full h-48 object-cover rounded-lg" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold">Price</h3>
              <p>${Number(price) / 100000}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Commission</h3>
              <p>{Number(commission)}%</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Campaign Conversion Rate</h3>
              <p>{conversionRate * 100}%</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Status</h3>
              <p>{status === "0" ? "Active" : "Ended"}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">You Sold</h3>
              <p>{totalSales.toString()} units</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">You Earned</h3>
              <p>${(Number(totalEarned) / 10000).toString()}</p>
            </div>
          </div>
          <PromoteButton
            promoteUrl={promoteUrl}
            className={`bg-[${purple}] rounded-lg text-white`}
            campaignId={campaignId}
            affilaiteFID={affiliateFID}
          />
        </div>
      </CardContent>
    </Card>
  );
}
