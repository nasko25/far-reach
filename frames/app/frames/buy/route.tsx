/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "../frames";
import { sql } from "@vercel/postgres";

const handleRequest = frames(async (ctx) => {
  // TODO: remove example and use trx ID instead
  if (ctx.message?.transactionId || ctx.url.searchParams.has("example")) {
    await sql.query(
      `INSERT INTO TRANSACTION_EVENT (customer_fid, customer_addresses_json, campaign_id, far_reacher_fid)
       SELECT customer_fid, customer_addresses_json, campaign_id, far_reacher_fid FROM json_populate_recordset(NULL::TRANSACTION_EVENT, $1)`,
      [
        JSON.stringify([
          {
            customer_fid: ctx.message?.requesterFid,
            customer_addresses_json: JSON.stringify([
              ...((ctx.message as any)?.requesterVerifiedAddresses ?? []),
              (ctx.message as any)?.requesterCustodyAddress,
              ctx.message?.connectedAddress,
            ]),
            campaign_id: ctx.searchParams?.campaignId,
            far_reacher_fid: ctx.message?.castId?.fid,
          },
        ]),
      ]
    );
    // TODO: check if trx id is valid, and if it is make a request to shopify api to order the product
    return {
      image: (
        <div tw="bg-purple-800 text-white w-full h-full justify-center items-center flex text-center">
          Congratulations! Your purchase was successful. You can expect shipment
          in around 4-5 days. This is the ID of your transaction: 1234
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
        {ctx.url.searchParams.has("color") &&
        ctx.url.searchParams.get("color") === "black" ? (
          <img
            tw="h-200"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNMjLY3ExAv8O2swxPg7_vgt-s6D8t3chYDg&s"
          ></img>
        ) : (
          <img
            tw="h-200"
            src="https://cdn.iconscout.com/icon/free/png-256/free-t-shirt-2772271-2302029.png"
          ></img>
        )}
        Size: {ctx.url.searchParams.get("size") ?? "M"}
        <div tw="justify-between items-center flex flex-col">
          <p tw="mx-8 text-center">
            If you'd like to order this T-Shirt, please input your email below.
            It will be used to verify you have purchased the product, so please
            input an email only you have access to.
          </p>
        </div>
      </div>
    ),
    imageOptions: {
      aspectRatio: "1:1",
    },
    buttons: [
      <Button action="post"> Cancel </Button>,
      <Button
        action="tx"
        target={{
          pathname: "/txdata",
          query: Object.fromEntries(ctx.url.searchParams),
        }}
        post_url="/"
      >
        Checkout
      </Button>,
    ],
    textInput: "Email",
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
