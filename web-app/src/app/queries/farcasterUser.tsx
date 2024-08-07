export const profileQuery = (username: string): string => `
query GetFarcasterUserDetails {
  Socials(
    input: {filter: {identity: {_eq: "fc_fname:${username}"}, dappName: {_eq: farcaster}}, blockchain: ethereum, limit: 50}
  ) {
    Social {
      dappName
      profileName
      id
      identity
      userId
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
      limit:50,
    }
  ) {
    Cast {
      url
      hash
      channel {
        name
        imageUrl
      }
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
