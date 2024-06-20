import { frames } from "../frames";
import { Button } from "frames.js/core";

const handleRequest = frames(async (ctx) => {
  console.log(ctx.url.pathname);
  // ctx.message?.castId is only available after an interaction
  // TODO: will need to use airstack for that  
  const applicationSuccessful = false;
    return {
      image: (
        <div tw="bg-[#17101f] text-white px-20 text-center my-auto flex flex-col w-full h-full">
            { applicationSuccessful ? <p> Congratulations! you are now a far reacher! </p> : <p> In order for you to apply to be a far reacher, you need to follow far reach, have at least 50 followers and at least 50 impressions on your last 20 casts. This is the caster fid: {ctx.message?.castId?.fid}</p> }
        </div>
      ),
      buttons: applicationSuccessful ? undefined : [
        <Button action="post" target={{pathname: "/apply"}}> Try again. </Button>
      ]
    };
  });
  
  export const GET = handleRequest;
  export const POST = handleRequest;