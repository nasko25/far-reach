import { sql } from "@vercel/postgres";
import Moralis from "moralis";

Moralis.start({
  apiKey: process.env.MORALIS_API_KEY,
}).catch(console.error);

export async function GET(
  request: Request,
  { params }: { params: { campaign_id: string } }
) {
  const { rows: rowsFrames } =
    await sql`SELECT * from FRAME_INTERACTIONS where campaign_id=${params.campaign_id}`;

  const { rows: rowsTransactions } =
    await sql`SELECT * from TRANSACTION_EVENT where campaign_id=${params.campaign_id}`;

  const networths = [];
  const customerFids = [];
  let customersAlsoBought = new Set<string>();
  for (var row of rowsTransactions) {
    customerFids.push(row.customer_fid);
    const { rows: rowsCustomersAlsoBought } =
      await sql`SELECT DISTINCT campaign_id from TRANSACTION_EVENT where customer_fid=${row.customer_fid} and campaign_id!=${params.campaign_id}`;

    rowsCustomersAlsoBought.forEach((row) =>
      customersAlsoBought.add(row.campaign_id)
    );

    console.log(rowsCustomersAlsoBought);
    const uniqueAddresses = Array.from(
      new Set(JSON.parse(row.customer_addresses_json) as string[])
    );

    const networthAcc = [0];
    // for (var address of uniqueAddresses) {
    //   if (address)
    //     networthAcc.push(
    //       await Moralis.EvmApi.wallets
    //         .getWalletNetWorth({
    //           excludeSpam: true,
    //           excludeUnverifiedContracts: true,
    //           address,
    //         })
    //         .then((result) => parseInt(result.raw.total_networth_usd))
    //     );
    // }
    networths.push(
      networthAcc.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      )
    );
  }

  return Response.json({
    hello: "there",
    page: params.campaign_id,
    networths,
    customerFidsBelow10000: customerFids.filter((fid) => fid <= 10000).length,
    customersAlsoBought: Array.from(customersAlsoBought),
  });
}
