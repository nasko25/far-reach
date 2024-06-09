/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";

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
      ctx.url.searchParams.has("color") && ctx.url.searchParams.get("color") === "blk"
      ? <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNMjLY3ExAv8O2swxPg7_vgt-s6D8t3chYDg&s"></img>
      : <img src="https://cdn.iconscout.com/icon/free/png-256/free-t-shirt-2772271-2302029.png"></img>
    ),
    buttons: [
      <Button action="post" target={{ pathname: "/customize", query: { token: "asdasd-asdasd-dd" } }}>
        Customize 
      </Button>,
      <Button action="post" target={{ pathname: "/buy" }}>
        Buy 
      </Button>,
    ]
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
