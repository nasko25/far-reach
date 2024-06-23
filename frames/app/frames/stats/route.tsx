import { frames } from "../frames";
import { NavBar, Stats } from "../../components";
import { Button } from "frames.js/core";
import { getUserDataForFid } from "frames.js";

const handleRequest = frames(async (ctx) => {
    const userData = await getUserDataForFid({fid: ctx.message?.requesterFid!});
    console.log("user data from stats: " + JSON.stringify(userData));
    const rank = 4;
    return {
      image: (
        <div tw="bg-[#17101f] text-black flex flex-col w-full h-full">
            <NavBar stats={ true } rank={ rank } />
            <Stats profileImage={ userData?.profileImage } displayName={ userData?.displayName } totalRewards={ rank ? 400 : undefined} />
        </div>
      ),
      imageOptions: rank ? {
        aspectRatio: "1:1",
      } : undefined,
      buttons: rank == undefined ? [
        <Button action="post" target={{pathname: "/apply"}}> Become a far reacher. </Button>
      ] : undefined
    };
  });
  
  export const GET = handleRequest;
  export const POST = handleRequest;