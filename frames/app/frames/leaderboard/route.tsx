import { frames } from "../frames";
import { NavBar, Leaderboard } from "../../components";
import { Button } from "frames.js/core";
import { getUserData } from "@/app/airstack/airstack";
import { getLeaderboard } from "@/app/subgraph/queries";

const handleRequest = frames(async (ctx) => {
  const leaderboard = await getLeaderboard();
  return {
    image: (
      <div tw="bg-[#17101f] text-black flex flex-col w-full h-full">
        <NavBar />
        <Leaderboard leaderboard={leaderboard} />
      </div>
    ),
    imageOptions: {
      aspectRatio: leaderboard.length > 4 ? "1:1" : "1.91:1",
    },
    buttons: [
      <Button action="post" target={{ pathname: "/stats" }}>
        Check my stats
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
