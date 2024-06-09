"use client";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";

export default function Component() {
  return (
    <div className="grid min-h-screen w-full grid-cols-[280px_1fr] overflow-hidden">
      <div className="hidden border-r  lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
              {/* <Package2Icon className="h-6 w-6" /> */}
              <span className="">Far-Reach 💜</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                prefetch={false}
              >
                <HomeIcon className="h-4 w-4" />
                My Dashboard
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                prefetch={false}
              >
                {/* <PackageIcon className="h-4 w-4" /> */}
                Products
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                prefetch={false}
              >
                {/* <PercentIcon className="h-4 w-4" /> */}
                Offers
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                prefetch={false}
              >
                {/* <UsersIcon className="h-4 w-4" /> */}
                Affiliates
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                prefetch={false}
              >
                {/* <LineChartIcon className="h-4 w-4" /> */}
                Analytics
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                prefetch={false}
              >
                {/* <SettingsIcon className="h-4 w-4" /> */}
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
        <main className="flex-1 p-4 md:p-6">
          <div className="grid gap-6 md:gap-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex items-center justify-between">
                  <div className="grid gap-1">
                    <CardTitle>Total Earnings</CardTitle>
                    <CardDescription>All time earnings</CardDescription>
                  </div>
                  <DollarSignIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent className="text-3xl font-bold">$12,345</CardContent>
              </Card>
              <Card>
                <CardHeader className="flex items-center justify-between">
                  <div className="grid gap-1">
                    <CardTitle>Products</CardTitle>
                    <CardDescription>Without commission</CardDescription>
                  </div>
                  {/* <PackageIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" /> */}
                </CardHeader>
                <CardContent className="text-3xl font-bold">24</CardContent>
              </Card>
              <Card>
                <CardHeader className="flex items-center justify-between">
                  <div className="grid gap-1">
                    <CardTitle>Active Offers</CardTitle>
                    <CardDescription>Live affiliate offers</CardDescription>
                  </div>
                  {/* <PercentIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" /> */}
                </CardHeader>
                <CardContent className="text-3xl font-bold">18</CardContent>
              </Card>
              <Card>
                <CardHeader className="flex items-center justify-between">
                  <div className="grid gap-1">
                    <CardTitle>User Engagement</CardTitle>
                    <CardDescription>Analytics on offers</CardDescription>
                  </div>
                  {/* <LineChartIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" /> */}
                </CardHeader>
                <CardContent className="text-3xl font-bold">78%</CardContent>
              </Card>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Onboarding</CardTitle>
                  <CardDescription>Get started with your affiliate program</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <h3 className="text-lg font-semibold">Link your Shopify account</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Connect your Shopify store to import your products and start creating affiliate offers.
                      </p>
                      <Button>Connect Shopify</Button>
                    </div>
                    <div className="grid gap-2">
                      <h3 className="text-lg font-semibold">Create a Farcaster account</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Easily share your affiliate offers on Farcaster channels to reach more potential customers.
                      </p>
                      <Button>Create Farcaster Account</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Analytics</CardTitle>
                    <CardDescription>Insights on your affiliate products</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BarChart className="aspect-[9/4]" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Affiliate Earnings</CardTitle>
                    <CardDescription>Breakdown of your affiliate earnings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LineChart className="aspect-[9/4]" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function BarChart(props: any) {
  return (
    <div {...props}>
      <ResponsiveBar
        data={[
          { name: "Jan", count: 111 },
          { name: "Feb", count: 157 },
          { name: "Mar", count: 129 },
          { name: "Apr", count: 150 },
          { name: "May", count: 119 },
          { name: "Jun", count: 72 },
        ]}
        keys={["count"]}
        indexBy="name"
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={["#2563eb"]}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role="application"
        ariaLabel="A bar chart showing data"
      />
    </div>
  );
}

function DollarSignIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function HomeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function LineChart(props: any) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "Jan", y: 60 },
              { x: "Feb", y: 48 },
              { x: "Mar", y: 177 },
              { x: "Apr", y: 78 },
              { x: "May", y: 96 },
              { x: "Jun", y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  );
}
