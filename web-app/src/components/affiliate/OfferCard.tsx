"use client";
import { purple } from "@/constants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Card";
import toast, { Toaster } from "react-hot-toast";

const notify = (promoteUrl: string) => {
  toast("Affiliate link frame copied to clipboard.");
  window.open(promoteUrl, "_blank");
};

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
        <CardDescription>Offer from {from}</CardDescription>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <img src={image} alt={name} className="w-full h-48 object-cover rounded-lg" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold">Price</h3>
              <p>{price}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Commission</h3>
              <p>{commission}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Status</h3>
              <p>{status}</p>
            </div>
          </div>
          <button className={`bg-[${purple}] rounded-lg text-white`} onClick={() => notify(promoteUrl)}>
            Promote 💜
          </button>
        </div>
        <Toaster />
      </CardContent>
    </Card>
  );
}
