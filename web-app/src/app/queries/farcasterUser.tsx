export const profileQuery = (username: string): string => `
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
      limit:10,
    }
  ) {
    Cast {
      url
      hash
      frame {
        castedAtTimestamp
        frameUrl
      }
    }
  }
}`;

export const frameQuery = (username: string): string => `
query GetFarcasterUserDetails {
   FarcasterCasts(
    input: {
      filter: {
        castedBy: {_eq: "fc_fname:${username}"},
        hasFrames: {_eq: true},
      },
      blockchain: ALL,
      limit:6,
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
