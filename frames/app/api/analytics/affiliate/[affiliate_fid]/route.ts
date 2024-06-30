import { sql } from "@vercel/postgres";
import Moralis from "moralis";

Moralis.start({
  apiKey: process.env.MORALIS_API_KEY,
}).catch(console.error);

export async function GET(
  request: Request,
  { params }: { params: { affiliate_fid: string } }
) {
  const { rows: rowsUniqueCustomerTransactions } =
    await sql`SELECT DISTINCT customer_fid from TRANSACTION_EVENT where far_reacher_fid=${params.affiliate_fid}`;
  const { rows: rowsUniqueCustomerInteractions } =
    await sql`SELECT DISTINCT customer_fid from FRAME_INTERACTIONS where far_reacher_fid=${params.affiliate_fid}`;

  const userConversion =
    rowsUniqueCustomerTransactions.length /
    rowsUniqueCustomerInteractions.length;

  return Response.json(
    {
      affiliate_fid: params.affiliate_fid,
      userConversion,
    },
    { headers: { "Access-Control-Allow-Origin": "*" } }
  );
}
