/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "../frames";

const handleRequest = frames(async (ctx) => {
  if (ctx.message?.transactionId) {
    return {
      image: (
        <div tw="bg-purple-800 text-white w-full h-full justify-center items-center flex">
          Transaction submitted! {ctx.message.transactionId}
        </div>
      ),
      imageOptions: {
        aspectRatio: "1:1",
      },
      buttons: [
        <Button
          action="link"
          target={`https://www.onceupon.gg/tx/${ctx.message.transactionId}`}
        >
          View on block explorer
        </Button>,
      ],
    };
  }

  return {
    image: (
      <div tw="bg-800 text-white w-full h-full justify-center items-center flex relative">
       <img src="https://cdn.iconscout.com/icon/free/png-256/free-t-shirt-2772271-2302029.png"></img>
       <div tw="text-black absolute m-auto bottom-40"> Buy this T-Shirt? </div>
      </div>
    ),
    imageOptions: {
      aspectRatio: "1:1",
    },
    buttons: [
      <Button action="tx" target="/txdata" post_url="/">
        Buy a unit
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;