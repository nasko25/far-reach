import { frames } from "../frames";
import { NavBar, Leaderboard, Stats } from "../../page";
import { Button } from "frames.js/core";
import { getUserDataForFid } from "frames.js";

const handleRequest = frames(async (ctx) => {
    return {
      image: (
        <div tw="bg-[#17101f] text-black flex flex-col w-full h-full">
            <NavBar stats={ true } fid={ ctx.message?.requesterFid ?? ctx.searchParams.fid } username="v"/>
            <Stats fid = {ctx.message?.requesterFid ?? ctx.searchParams.fid! }/>
        </div>
      ),
      imageOptions: {
        aspectRatio: "1:1",
      },
      buttons: [
        <Button action="post" target={{pathname: "/apply"}}> Become a far reacher. </Button>
      ]
    };
  });
  
  export const GET = handleRequest;
  export const POST = handleRequest;