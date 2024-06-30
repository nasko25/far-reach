import { frames } from "../frames";
import { NavBar, Leaderboard } from "../../components";
import { Button } from "frames.js/core";
import { getUserDataForFid } from "frames.js";
import { fetchQuery, init } from "@airstack/node";

const queryFarReachActivity = (fid: number, framesListJson: string) => `
    query FetchFarReachActivity {
       FarcasterCasts(
        input: {
          filter: {
            castedBy: {
              _eq: "fc_fid:${fid}"
            },
            frameUrl: {
              _in: ${framesListJson}
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

const queryUserData = (fid: number) => `
    query FetchUserData {
         Socials(
          input: {
            filter: {
              identity: {
                _eq: "fc_fid:${fid}"
              }, dappName: {
                _eq: farcaster
              }
            },
            blockchain: ethereum
          }
        ) {
        Social {
          location
          profileName
          profileHandle
          profileDisplayName
        }
      }
    }
`;

const getUserData = async (fid: number | undefined): Promise<string | void> => {
  if (!fid) return;

  const { data, error }: QueryResponse = await fetchQuery(queryUserData(fid));

  if (error) {
    console.error(error);
    return;
  }

  return (data as any).Socials.Social.at(0)?.profileDisplayName;
};

init(process.env.AIRSTACK_API_KEY!);

const handleRequest = frames(async (ctx) => {
  // TODO: can be null so maybe call function until not null?
  // const usernames = [23426, 551174, 235302, 354243, 5, 6, 7, 8, 9, 10].map(async fid => (await getUserDataForFid({ fid:  fid}))?.username!);
  // TODO: get through airstack or subgraph
  const usernames = [23426, 551174, 235302, 354243, 5, 6, 7, 8, 9, 10];
  // console.log("fid: " + ctx.message?.requesterFid);
  const { data, error }: QueryResponse = await fetchQuery(
    queryFarReachActivity(
      ctx.message?.requesterFid ?? 23426,
      JSON.stringify([
        "https://letsgetjessebald.com/token/528?ref_code=ae764d5822",
      ])
    )
  );

  console.log(
    "airstack data for user " +
      ctx.message?.requesterFid +
      ": " +
      JSON.stringify(data, null, 2)
  );
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
                return {
                  username: (await getUserData(usernames[idx])) ?? "",
                  score,
                };
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
