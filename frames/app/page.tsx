import { getUserDataForFid } from "frames.js";
import { fetchMetadata } from "frames.js/next";
import { Metadata } from "next";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Far reach",
    other: {
      ...(await fetchMetadata(
        new URL("/frames", process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
      )),
    },
  };
}

export default async function Home() {
  return <div>Welcome to far reach. Please use this URL in a frame.</div>;
}
