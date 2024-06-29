export async function GET(
  request: Request,
  { params }: { params: { campaign_id: string } }
) {
  return Response.json({
    hello: "there",
    page: params.campaign_id,
  });
}
