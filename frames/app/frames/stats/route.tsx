import { frames } from "../frames";
import { NavBar, Stats } from "../../components";
import { Button } from "frames.js/core";
import { getUserDataForFid } from "frames.js";
import { getTop3Frames, getUserData } from "@/app/airstack/airstack";

const handleRequest = frames(async (ctx) => {
  console.log(ctx.message?.requesterFid);
  const userData = await getUserDataForFid({ fid: ctx.message?.requesterFid! });
  console.log("user data from stats: " + JSON.stringify(userData));
  const user = await getUserData(ctx.message?.requesterFid);
  const isAffiliate = user != undefined;
  console.log("ctx: " + JSON.stringify(ctx, null, 2));
  const fid = ctx.message?.requesterFid;
  const frameData = fid ? await getTop3Frames(fid) : [];
  return {
    image: (
      <div tw="bg-[#17101f] text-black flex flex-col w-full h-full">
        <NavBar stats={true} rank={user.rank} />
        <Stats
          profileImage={userData?.profileImage}
          displayName={userData?.displayName}
          totalRewards={rank ? 400 : undefined}
          frameData={frameData}
        />
      </div>
    ),
    imageOptions: isAffiliate
      ? {
          aspectRatio: "1:1",
        }
      : undefined,
    buttons: !isAffiliate
      ? [
          <Button action="post" target={{ pathname: "/apply" }}>
            Become a far reacher.
          </Button>,
        ]
      : undefined,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
