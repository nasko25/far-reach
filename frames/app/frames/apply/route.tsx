import { frames } from "../frames";
import { NavBar, Leaderboard } from "../../page";
import { Button } from "frames.js/core";
import { getUserDataForFid } from "frames.js";

const handleRequest = frames(async (ctx) => {
  // TODO: will need to use airstack for that  
  const applicationSuccessful = false;
    return {
      image: (
        <div tw="bg-[#17101f] text-black flex flex-col w-full h-full">
            { applicationSuccessful ? <p> Congratulations! you are now a far reacher! </p> : <p> In order for you to apply to be a far reacher, you need to follow far reach, have at least 50 followers and at least 50 impressions on your last 20 casts. </p> }
        </div>
      ),
      imageOptions: {
        aspectRatio: "1:1",
      },
      buttons: applicationSuccessful ? undefined : [
        <Button action="post" target={{pathname: "/apply"}}> Try again. </Button>
      ]
    };
  });
  
  export const GET = handleRequest;
  export const POST = handleRequest;