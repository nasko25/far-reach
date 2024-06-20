import { frames } from "../frames";
import { NavBar, Leaderboard } from "../../page";
import { Button } from "frames.js/core";
import { getUserDataForFid } from "frames.js";

const handleRequest = frames(async (ctx) => {
    // TODO: can be null so maybe call function until not null?
    // console.log(await getUserDataForFid({fid: 1234}));
    // const usernames = [23426, 551174, 235302, 354243, 5, 6, 7, 8, 9, 10].map(async fid => (await getUserDataForFid({ fid:  fid}))?.username!);
    // TODO: get through airstack or subgraph
    const usernames = [23426, 551174, 235302, 354243, 5, 6, 7, 8, 9, 10].map(async fid => fid.toString());
    return {
      image: (
        <div tw="bg-[#17101f] text-black flex flex-col w-full h-full">
            <NavBar/>
            <Leaderboard users={await Promise.all(["10234", "10000", "1189", "2", "0", "0", "0", "0", "0", "0"].map(async (score, idx) => {return {username: await usernames[idx], score}}))} />
        </div>
      ),
      imageOptions: {
        aspectRatio: "1:1",
      },
      buttons: [
        <Button action="post" target={{pathname: "/stats"}}> Check my stats </Button>
      ]
    };
  });
  
  export const GET = handleRequest;
  export const POST = handleRequest;