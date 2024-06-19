/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "../frames";

const handleRequest = frames(async (ctx) => {
  // TODO: remove example and use trx ID instead
  if (ctx.message?.transactionId || ctx.url.searchParams.has("example")) {
    // TODO: check if trx id is valid, and if it is make a request to shopify api to order the product
    return {
      image: (
        <div tw="bg-purple-800 text-white w-full h-full justify-center items-center flex text-center">
          Congratulations! Your purchase was successful. You can expect shipment in around 4-5 days.
          This is the ID of your transaction: 1234
          {/* {ctx.message.transactionId} */}
        </div>
      ),
      // imageOptions: {
      //   aspectRatio: "1:1",
      // },
      buttons: [
        <Button
          action="link"
          target={`https://google.com`}
          // target={`https://www.onceupon.gg/tx/${ctx.message.transactionId}`}
        >
          View on block explorer
        </Button>,
      ],
    };
  }

  return {
    image: (
      <div tw="bg-800 text-black w-full h-full justify-between items-center flex flex-col">
        {/* {ctx.message?.inputText ? `, Typed: ${ctx.message?.inputText}` : "no text yet"} */}
        { ctx.url.searchParams.has("color") && ctx.url.searchParams.get("color") === "black"
          ? <img tw="h-200" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNMjLY3ExAv8O2swxPg7_vgt-s6D8t3chYDg&s"></img>
          : <img tw="h-200" src="https://cdn.iconscout.com/icon/free/png-256/free-t-shirt-2772271-2302029.png"></img> }
          Size: {ctx.url.searchParams.get("size") ?? "M"}
        { ctx.url.searchParams.has("street") && ctx.message?.inputText ? 
              <div tw="justify-between items-center flex flex-col"><p tw="mx-8 text-center">This is the address you have typed: {ctx.url.searchParams.get("street")}; {ctx.message?.inputText}</p>
              <p tw="mx-8 text-center">If it is correct, please proceed to the checkout.</p></div>
        : <div tw="justify-between items-center flex flex-col">
              <p tw="mx-8 text-center">If you'd like to order this T-Shirt, please input your shipment details below.</p>
              <p tw="mx-8 text-center">In this screen, please type in {ctx.message?.inputText ? "your city and country names, separated by a comma" : "your street name" }.</p>          
          </div> }
      </div>
    ),
    imageOptions: {
      aspectRatio: "1:1",
    },
    buttons: [
      <Button action="post"> Cancel </Button>, 
      ctx.url.searchParams.has("street") && ctx.message?.inputText ? <Button action="tx" target="/txdata" post_url="/">
      Checkout 
     </Button> : <Button action="post" target={{ pathname: "/buy", query: ctx.message?.inputText ? { ...Object.fromEntries(ctx.url.searchParams), street: ctx.message?.inputText } : Object.fromEntries(ctx.url.searchParams) }}>Proceed</Button>,
    ],
    textInput: ctx.url.searchParams.has("street") ? undefined : ctx.message?.inputText ? "City and country" : "Street and number",
  };
});

export const GET = handleRequest;
export const POST = handleRequest;