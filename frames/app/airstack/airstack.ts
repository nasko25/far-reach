import { fetchQuery, init } from "@airstack/node";
import { FrameData } from "../components";
import { sql } from "@vercel/postgres";
import { getProductInformation } from "../subgraph/queries";

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
          hash
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
): Promise<FrameData[]> => {
  if (!fid) return [];

  const { rows } =
    await sql`SELECT * from TRANSACTION_EVENT where far_reacher_fid=${fid}`;
  const campaignIds = rows
    .map((row) => row.campaign_id)
    .filter((campaignId) => campaignId != null);
  const { data, error }: QueryResponse = await fetchQuery(
    queryFarReachActivity(
      fid,
      JSON.stringify(
        campaignIds.map(
          (campaignId) =>
            "https://far-reach.vercel.app/frames?campaignId=" + campaignId
        )
      )
    )
  );

  console.log(
    "airstack data for user " + fid + ": " + JSON.stringify(data, null, 2)
  );
  console.log("airstack err: " + JSON.stringify(error, null, 2));

  const casts = await Promise.all(
    (((data as any).FarcasterCasts?.Casts as any[] | undefined) ?? []).map(
      async (cast) => {
        const { rows } =
          await sql`SELECT campaign_id from TRANSACTION_EVENT where cast_hash=${cast.hash}`;
        // should be only 1 campaign in that hash
        const campaignId = rows.map((row) => row.campaign_id).at(0);

        const product = await getProductInformation(campaignId);
        cast.productImage = product.productImage;
        cast.productsSold = rows.length;
        cast.reward =
          rows.length *
          parseFloat(product.commission) *
          parseFloat(product.price);
        return cast;
      }
    )
  );

  console.log("casts: " + JSON.stringify(casts, null, 2));

  if (casts && casts.length > 3) {
    const top3 = casts.sort((a, b) => a.numberOfLikes - b.numberOfLikes);
    return top3;
  } else {
    return casts;
  }
};
