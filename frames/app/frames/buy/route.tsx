/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "../frames";
import { sql } from "@vercel/postgres";
import { userCanBuy } from "../txdata/userCanBuy";
import { getProductInformation } from "@/app/subgraph/queries";
import { NavBar } from "@/app/components";

const handleRequest = frames(async (ctx) => {
  console.log(JSON.stringify(ctx, null, 2));
  const product = await getProductInformation(ctx.searchParams.campaignId);
  // TODO: remove example and use trx ID instead
  if (ctx.message?.transactionId && ctx.searchParams.successful == "true") {
    await sql.query(
      `INSERT INTO TRANSACTION_EVENT (customer_fid, customer_addresses_json, campaign_id, far_reacher_fid, cast_hash)
       SELECT customer_fid, customer_addresses_json, campaign_id, far_reacher_fid, cast_hash FROM json_populate_recordset(NULL::TRANSACTION_EVENT, $1)`,
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
            cast_hash: ctx.message.castId?.hash,
          },
        ]),
      ]
    );
    // TODO: check if trx id is valid, and if it is make a request to shopify api to order the product
    return {
      image: (
        <div tw="bg-[#17101f] text-white w-full h-full justify-center items-center flex text-center">
          {/* Absolutely terrible way of handling that, TODO: fix at some point */}
          <img
            tw="absolute text-white top-5"
            src="https://i.ibb.co/tXSF6t5/image.png"
            width={120}
          ></img>
          Congratulations! Your purchase was successful. You can expect shipment
          in around 4-5 days.
        </div>
      ),
      // imageOptions: {
      //   aspectRatio: "1:1",
      // },
      buttons: [
        <Button
          action="link"
          target={`https://www.onceupon.gg/tx/${ctx.message.transactionId}`}
        >
          View on block explorer
        </Button>,
        <Button action="link" target={product.permalink}>
          Open on shopify to complete order
        </Button>,
      ],
    };
  } else if (ctx.message?.transactionId) {
    return {
      image: (
        <div tw="bg-[#17101f] text-white w-full h-full justify-center items-center flex text-center">
          {/* Absolutely terrible way of handling that, TODO: fix at some point */}
          <img
            tw="absolute text-white top-5"
            src="https://i.ibb.co/tXSF6t5/image.png"
            width={120}
          ></img>
          You can now proceed with buying the product. Please input your email
          below. It will be used to verify you have purchased the product, so
          please input an email only you have access to.
        </div>
      ),
      buttons: [
        <Button
          action="tx"
          target={{
            pathname: "/txdata",
            query: Object.fromEntries(ctx.url.searchParams),
          }}
          post_url={{
            pathname: "/buy",
            query: {
              ...Object.fromEntries(ctx.url.searchParams),
              successful: true,
            },
          }}
        >
          Checkout
        </Button>,
      ],
      textInput: "Email",
    };
  }

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
        <p tw="mx-10 mt-20 text-center">
          If you'd like to order this {product.productName}, you will first need
          to allow our contract to use your USDC balance.
        </p>
      </div>
    ),
    imageOptions: {
      aspectRatio: "1:1",
    },
    buttons: [
      <Button
        action="post"
        target={{
          pathname: "/",
          query: Object.fromEntries(ctx.url.searchParams),
        }}
      >
        Cancel
      </Button>,
      <Button
        action="tx"
        target={{
          pathname: "/txdata",
          query: {
            ...Object.fromEntries(ctx.url.searchParams),
            toApprove: true,
            price: product.price,
          },
        }}
        post_url={{
          pathname: "/buy",
          query: {
            ...Object.fromEntries(ctx.url.searchParams),
            successful: false,
            toApprove: false,
          },
        }}
      >
        Approve USDC Spending
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
