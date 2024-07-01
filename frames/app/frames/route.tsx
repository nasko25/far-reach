/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";
import { getProductInformation } from "../subgraph/queries";
import { NavBar } from "../components";

// TODO: fetch from shopify
const handleRequest = frames(async (ctx) => {
  // NOTE: keep in mind that one object is the "default" one (when no parameters are selected)
  const product = await getProductInformation(ctx.searchParams.campaignId);
  return {
    image: (
      <div tw="bg-[#17101f] text-white w-full h-full justify-center items-center flex relative flex-col">
        {/* Absolutely terrible way of handling that, TODO: fix at some point */}
        <img
          tw="absolute text-white top-5"
          src="https://i.ibb.co/tXSF6t5/image.png"
          width={120}
        ></img>
        <NavBar />
        <div tw="text-black w-140 h-140 justify-center items-center flex relative mt-20">
          <img src={product.productImage} width={400}></img>
        </div>
        <p tw="m-0 mt-10">{product.name}</p>
        <p tw="m-0">
          Price: ${parseFloat(product.price) / parseFloat("1000000")}
        </p>
        <p tw="m-5">
          {product.stock == "0"
            ? "Product sold out!"
            : `Only ${product.stock} left in stock!`}
        </p>
      </div>
    ),
    imageOptions: {
      aspectRatio: "1:1",
    },
    buttons:
      product.stock != "0"
        ? [
            // <Button
            //   action="post"
            //   target={{
            //     pathname: "/customize",
            //     query: Object.fromEntries(ctx.url.searchParams),
            //   }}
            // >
            //   Customize
            // </Button>,
            <Button
              action="post"
              target={{
                pathname: "/buy",
                query: Object.fromEntries(ctx.url.searchParams),
              }}
            >
              Buy
            </Button>,
          ]
        : [],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
