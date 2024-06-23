import { frames } from "../frames";
import { NavBar, Stats } from "../../components";
import { Button } from "frames.js/core";
import { getUserDataForFid } from "frames.js";

const handleRequest = frames(async (ctx) => {
    const userData = await getUserDataForFid({fid: ctx.message?.requesterFid!});
    console.log("user data from stats: " + JSON.stringify(userData));
    return {
      image: (
        <div tw="bg-[#17101f] text-black flex flex-col w-full h-full">
            <NavBar rank={ 4 } />
            <Stats profileImage={userData?.profileImage} displayName={userData?.displayName} totalRewards={400} rank="2"/>
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