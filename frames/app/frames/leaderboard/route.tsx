import { frames } from "../frames";
import { NavBar, Leaderboard } from "../../components";
import { Button } from "frames.js/core";
import { getUserDataForFid } from "frames.js";
import { fetchQuery, init } from "@airstack/node";

// TODO: for frameUrl use _in instead of _eq and give a list of urls containing all campaign IDs
const query = (fid: number) => `
    query FetchFarReachActivity {
       FarcasterCasts(
        input: {
          filter: {
            castedBy: {
              _eq: "fc_fid:${fid}"
            },
            frameUrl: {
              _eq: "https://altumbase.com"
            },
            hasFrames: {
              _eq: true
            }
          }, blockchain: ALL}
      ) {
        Cast {
          castedAtTimestamp
          numberOfRecasts
          numberOfLikes
          numberOfReplies
        }
      }
    }
`;

init(process.env.AIRSTACK_API_KEY!);

const handleRequest = frames(async (ctx) => {
  // TODO: can be null so maybe call function until not null?
  // const usernames = [23426, 551174, 235302, 354243, 5, 6, 7, 8, 9, 10].map(async fid => (await getUserDataForFid({ fid:  fid}))?.username!);
  // TODO: get through airstack or subgraph
  const usernames = [23426, 551174, 235302, 354243, 5, 6, 7, 8, 9, 10].map(
    async (fid) => fid.toString()
  );
  // console.log("fid: " + ctx.message?.requesterFid);
  const { data, error }: QueryResponse = await fetchQuery(
    query(ctx.message?.requesterFid ?? 354243)
  );

  console.log("airstack data: " + JSON.stringify(data, null, 2));
  console.log("airstack err: " + JSON.stringify(error, null, 2));

  // if (error) {
  //   return <p>Error: {error.message}</p>;
  // }
  return {
    image: (
      <div tw="bg-[#17101f] text-black flex flex-col w-full h-full">
        <NavBar />
        <Leaderboard
          users={await Promise.all(
            ["10234", "10000", "1189", "2", "0", "0", "0", "0", "0", "0"].map(
              async (score, idx) => {
                return { username: await usernames[idx], score };
              }
            )
          )}
        />
      </div>
    ),
    imageOptions: {
      aspectRatio: "1:1",
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
