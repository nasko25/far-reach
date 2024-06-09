import Link from "next/link";
import { Button } from "@/components/Button";

import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/Card";
import { EarningsCard } from "@/components/affiliate/EarningsCard";
import { StatCard } from "@/components/affiliate/StatCard";
import { Coins, ShoppingBag, User } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { FrameCard } from "@/components/affiliate/FrameCard";

export default function Affiliate() {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r  lg:block ">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
              <span className="">Far-Reach 💜</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                prefetch={false}
              >
                My Dashboard
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                prefetch={false}
              >
                Offer Hunt
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                prefetch={false}
              >
                Earnings
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                prefetch={false}
              >
                Settings
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b px-6 lg:h-[60px]">
          <Link href="#" className="lg:hidden" prefetch={false}>
            {/* <Package2Icon className="h-6 w-6" /> */}
            <span className="sr-only">Home</span>
          </Link>
          <div className="flex-1">
            <h1 className="font-semibold text-lg md:text-2xl">Welcome Back 👋</h1>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
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
                    <ProductCard image="/placeholder.svg" name="2 Years Old Chick-fil-A Sauce" commission={0.18} />
                    <ProductCard image="/placeholder.svg" name="Satoshi Nakamoto's Sperm" commission={125} />
                    <ProductCard image="/placeholder.svg" name="Billie Eilish's Bath Water" commission={0.01} />
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
            <div>
              <Card>
                <CardHeader>
                  <CardDescription>Frames</CardDescription>
                  <CardTitle>Your Far-reaching Frames</CardTitle>
                </CardHeader>
                <CardContent>
                  <FrameCard />
                  <FrameCard />
                  <FrameCard />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
