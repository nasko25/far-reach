import { farcasterHubContext } from "frames.js/middleware";
import { createFrames, Button } from "frames.js/next";

const frames = createFrames({
  basePath: '/frames',
  middleware: [
    farcasterHubContext({
      // remove if you aren't using @frames.js/debugger or you just don't want to use the debugger hub
      ...(process.env.NODE_ENV === "production"
        ? {}
        : {
            hubHttpUrl: "http://localhost:3010/hub",
          }),
    }),
  ],
});

// TODO: fetch from shopify
const handleRequest = frames(async (ctx) => {
  return {
    image: ctx.message ? (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        GM, {ctx.message.requesterUserData?.displayName}! Your FID is{" "}
        {ctx.message.requesterFid}
        {", "}
        {ctx.message.requesterFid < 20_000
          ? "you're OG!"
          : "welcome to the Farcaster!"}
      </div>
    ) : (
      // <img src="https://cdn.iconscout.com/icon/free/png-256/free-t-shirt-2772271-2302029.png"></img>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNMjLY3ExAv8O2swxPg7_vgt-s6D8t3chYDg&s"></img>
    ),
    buttons: !ctx.url.searchParams.has("saidGm")
      ? [
          <Button action="post" target={{ pathname: "/customize", query: { saidGm: true } }}>
           Customize 
          </Button>,
          <Button action="post" target={{ query: { saidGm: true } }}>
            Buy 
          </Button>,
        ]
      : [],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
