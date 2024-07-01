import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const SUBGRAPH_URL =
  "https://api.studio.thegraph.com/query/55913/far-reach/version/latest";

const apolloClient = new ApolloClient({
  uri: SUBGRAPH_URL,
  cache: new InMemoryCache(),
});

export const getLeaderboard = async (): Promise<Leaderboard> => {
  const result = await apolloClient.query({
    query: gql`
      query {
        affiliates(first: 10, orderBy: totalEarned, orderDirection: desc) {
          address
          totalEarned
          numberOfSales
          name
          fid
        }
      }
    `,
  });

  console.log(result.data.affiliates);
  return result.data?.affiliates ?? [];
};

export const getProductInformation = async (
  campaignId: string
): Promise<Product> => {
  const result = await apolloClient.query({
    query: gql`
      query {
        campaign(id: "${campaignId}") {
            txHash
            stock
            status
            receiptAddress
            productName
            productImage
            productId
            price
            permalink
            name
            minPostsLastWeek
            minFollowers
            merchantAddress
            maxFID
            id
            blockTimestamp
            commission
        }
      }
    `,
    fetchPolicy: "network-only",
  });

  console.log(result.data.campaign);
  return result.data?.campaign ?? [];
};

export const getAffiliateTotalRewards = async (
  fid: number
): Promise<{ totalEarned: string; numberOfSales: string } | undefined> => {
  const result = await apolloClient.query({
    query: gql`
          query {
            affiliates(where: {fid: ${fid}}) {
              totalEarned
              numberOfSales
            }
          }
        `,
  });

  console.log(result.data?.affiliates[0]);
  return result.data?.affiliates?.at(0);
};
