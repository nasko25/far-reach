import { createFrames, types } from "frames.js/next";
import { farcasterHubContext } from "frames.js/middleware";
import { sql } from "@vercel/postgres";

const analytics: types.FramesMiddleware<any, {}> = async (ctx: any, next) => {
  const button = ctx.pressedButton?.index;
  if (typeof button === "number") {
    const interaction = `button pressed: ${button} to arrive @ ${ctx.url}`;
    const fid = ctx.message?.requesterFid;
    console.log(JSON.stringify(ctx, null, 2));
    // <sigh> https://stackoverflow.com/a/77093839
    await sql.query(
      `INSERT INTO FRAME_INTERACTIONS (customer_fid, interaction, campaign_id, far_reacher_fid)
       SELECT customer_fid, interaction, campaign_id, far_reacher_fid FROM json_populate_recordset(NULL::FRAME_INTERACTIONS, $1)`,
      [
        JSON.stringify([
          {
            customer_fid: fid,
            interaction,
            campaign_id: ctx.searchParams?.campaignId,
            far_reacher_fid: ctx.message?.castId?.fid,
          },
        ]),
      ]
    );
  }
  return next({});
};

export const frames = createFrames({
  basePath: "/frames",
  middleware: [
    farcasterHubContext({
      // remove if you aren't using @frames.js/debugger or you just don't want to use the debugger hub
      ...(process.env.NODE_ENV === "production"
        ? {}
        : {
            hubHttpUrl: "http://localhost:3010/hub",
          }),
    }),
    analytics,
  ],
});
