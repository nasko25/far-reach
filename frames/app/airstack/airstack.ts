import { fetchQuery, init } from "@airstack/node";

init(process.env.AIRSTACK_API_KEY!);

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

export const getUserData = async (
  fid: number | undefined
): Promise<string | void> => {
  if (!fid) return;

  const { data, error }: QueryResponse = await fetchQuery(queryUserData(fid));

  if (error) {
    console.error(error);
    return;
  }

  return (data as any).Socials.Social.at(0)?.profileDisplayName;
};

export const getTop3Frames = async (
  fid: number | undefined
): Promise<
  {
    castedAtTimestamp: string;
    numberOfRecasts: number;
    numberOfLikes: number;
    numberOfReplies: number;
  }[]
> => {
  if (!fid) return [];
  const { data, error }: QueryResponse = await fetchQuery(
    queryFarReachActivity(
      fid,
      JSON.stringify([
        // TODO: get all campaign IDs from subgraph
        "https://letsgetjessebald.com/token/528?ref_code=ae764d5822",
      ])
    )
  );

  console.log(
    "airstack data for user " + fid + ": " + JSON.stringify(data, null, 2)
  );
  console.log("airstack err: " + JSON.stringify(error, null, 2));

  const casts =
    ((data as any).FarcasterCasts?.Casts as any[] | undefined) ?? [];

  console.log(casts);

  if (casts && casts.length > 3) {
    const top3 = casts.sort((a, b) => a.numberOfLikes - b.numberOfLikes);
    return top3;
  } else {
    return casts;
  }
};
