"use client";
import { purple } from "@/constants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Card";
import { PromoteButton } from "./PromoteButton";

export function OfferCard({
  from,
  price,
  name,
  image,
  commission,
  promoteUrl,
  status,
}: {
  from: string;
  price: string;
  name: string;
  image: string;
  commission: string;
  promoteUrl: string;
  status: string;
}) {
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
              <h3 className="text-lg font-semibold">Status</h3>
              <p>{status === "0" ? "Active" : "Ended"}</p>
            </div>
          </div>
          <PromoteButton promoteUrl={promoteUrl} className={`bg-[${purple}] rounded-lg text-white`} />
        </div>
      </CardContent>
    </Card>
  );
}
