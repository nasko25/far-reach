export const query = (username: string): string => `
query GetFarcasterUserDetails {
  Socials(
    input: {filter: {identity: {_eq: "fc_fname:${username}"}, dappName: {_eq: farcaster}}, blockchain: ethereum, limit: 50}
  ) {
    Social {
      dappName
      profileName
      socialCapital {
        socialCapitalScore
      }
      isFarcasterPowerUser
      followerCount
    }
  }
   FarcasterCasts(
    input: {
      filter: {
        castedBy: {_eq: "fc_fname:${username}"},
      },
      blockchain: ALL,
      limit:5,
    }
  ) {
    Cast {
      castedBy {
        profileName
      }
      url
      frame {
        castedAtTimestamp
        frameUrl
      }
    }
  }
}`;
