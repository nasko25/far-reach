import { frames } from "../frames";
import { NavBar, Stats } from "../../components";
import { Button } from "frames.js/core";
import { getUserDataForFid } from "frames.js";
import { getTop3Frames, getUserData } from "@/app/airstack/airstack";
import { getAffiliateTotalRewards } from "@/app/subgraph/queries";

const handleRequest = frames(async (ctx) => {
  const userData = await getUserDataForFid({ fid: ctx.message?.requesterFid! });
  const user = await getUserData(ctx.message?.requesterFid);
  const isAffiliate = user != undefined;
  const fid = ctx.message?.requesterFid;
  const frameData = fid ? await getTop3Frames(fid) : [];

  const affiliateRewards = fid
    ? await getAffiliateTotalRewards(fid)
    : undefined;
  const totalEarned = affiliateRewards?.totalEarned ?? "0";
  const itemsSold = affiliateRewards?.numberOfSales ?? "0";
  return {
    image: (
      <div tw="bg-[#17101f] text-black flex flex-col w-full h-full">
        <NavBar stats={true} rank={0} />
        <Stats
          profileImage={userData?.profileImage}
          displayName={userData?.displayName}
          totalRewards={totalEarned}
          itemsSold={itemsSold}
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
