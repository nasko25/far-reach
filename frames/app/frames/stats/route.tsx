import { frames } from "../frames";
import { NavBar, Stats } from "../../page";
import { Button } from "frames.js/core";
import { getUserDataForFid } from "frames.js";

const handleRequest = frames(async (ctx) => {
    const userData = await getUserDataForFid({fid: ctx.message?.requesterFid!});
    console.log(userData?.profileImage);
    return {
      image: (
        <div tw="bg-[#17101f] text-black flex flex-col w-full h-full">
            <NavBar stats={ true } />
            {/* TODO: image too big; need to resize or alternatively get through airstack */}
            <Stats fid = {ctx.message?.requesterFid! } profileImage={userData?.profileImage} rank={4} score="2"/>
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