import { getUserDataForFid } from "frames.js";
import { fetchMetadata } from "frames.js/next";
import { Metadata } from "next";

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

export const NavBar = (props: {fid: number | string | undefined, username: string | undefined, stats?: boolean}) => {
  // assumes parent is display: flex and has 100% width and height
  return (
      <nav tw="text-white border-gray-200 dark:bg-gray-900 border-b border-[#e5e7eb] h-40">
        <p tw="p-0 m-4 ml-20 my-auto"> Far Reach </p>
        <p tw="m-4 mr-20 ml-auto my-auto p-0 max-w-lg"> {props.fid ? props.username + "'s rank currently is: " + props.fid : props.stats ? "You are not yet a part of far reach. Please apply below." : ""} </p>
      </nav>
    );
}

export const Leaderboard = (props: {users: {username: string, score: string}[]}) => {
  // assumes parent is display: flex and has 100% width and height
  return (
      <div tw="text-white border-gray-200 dark:bg-gray-900 mb-auto mt-4 flex flex-col">
        <div tw="flex ml-30"><p tw="ml-10 mr-12"> Rank </p> <p> User </p> <p tw="ml-88"> Money made so far </p></div>
        <div tw="flex border-b border-gray-700 mx-30 text-gray-400 mb-8"> </div>
        {props.users.map((user, idx) => <div tw="flex pl-40" key={idx}><p tw="p-0 m-2 w-20"> # { idx + 1 } </p><p tw="p-0 m-2 w-120 text-purple-500"> { user.username } </p> <p tw="p-0 m-2"> ${user.score} {idx < 3 ?  "💸".repeat(3 - idx) : ""} </p></div>)}
      </div>
    );
}

export const Stats = (props: { fid: string | number }) => {
  // assumes parent is display: flex and has 100% width and height
  return (
      <div tw="text-white border-gray-200 dark:bg-gray-900 mb-auto mt-4 flex flex-col">
        {/* TODO: display pfp, total far reacher posts & impressions, total money made, rank */}
        {/* if user is not far reacher yet ass a custom message saying no data to show */}
      </div>
    );
}