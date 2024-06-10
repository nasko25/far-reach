/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";

// TODO: fetch from shopify
const handleRequest = frames(async (ctx) => {
  // NOTE: keep in mind that one object is the "default" one (when no parameters are selected)
  return {
    image: (
      <div tw="text-black w-full h-full justify-center items-center flex relative">
        <div tw="text-black w-140 h-140 justify-center items-center flex relative">
          { ctx.url.searchParams.has("color") && ctx.url.searchParams.get("color") === "black"
          ? <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNMjLY3ExAv8O2swxPg7_vgt-s6D8t3chYDg&s"></img>
          : <img src="https://cdn.iconscout.com/icon/free/png-256/free-t-shirt-2772271-2302029.png"></img> }
        </div>
        <p tw="w-50 absolute right-0 top-0">Only 5 left in stock!</p>
      </div>
    ),
    // imageOptions: {
    //   aspectRatio: "1:1"
    // },
    buttons: [
      <Button action="post" target={{ pathname: "/customize", query: Object.fromEntries(ctx.url.searchParams) }}>
        Customize 
      </Button>,
      <Button action="post" target={{ pathname: "/buy", query: Object.fromEntries(ctx.url.searchParams) }}>
        Buy 
      </Button>,
    ]
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
