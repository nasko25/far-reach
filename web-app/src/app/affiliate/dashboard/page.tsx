import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/Card";
import { EarningsCard } from "@/components/affiliate/EarningsCard";
import { StatCard } from "@/components/affiliate/StatCard";
import { Coins, ShoppingBag, User } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";

export default function AffiliateDashboard() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <h1 className="font-bold text-2xl">Dashboard</h1>
      <div className="grid gap-6">
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardDescription>Far-reacher Leaderboard</CardDescription>
              <CardTitle>Top 5</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <EarningsCard name="nxs" earnings={4567} />
                <EarningsCard name="gaonuk" earnings={3456} />
                <EarningsCard name="gkas23.eth" earnings={2345} />
                <EarningsCard name="builderszn.eth" earnings={1234} />
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
      </div>
    </main>
  );
}
