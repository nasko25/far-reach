export const query = `
query MyQuery {
  Socials(
    input: {
      filter: {
        dappName: {
          _eq: farcaster
        },
        identity: { _eq: "fc_fid:602" }
      },
      blockchain: ethereum
    }
  ) {
    Social {
      socialCapital {
        socialCapitalScoreRaw
        socialCapitalScore
      }
    }
  }
}`;
