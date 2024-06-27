export interface SocialCapital {
  socialCapitalScore: number;
}

export interface Social {
  dappName: string;
  profileName: string;
  socialCapital: SocialCapital;
  isFarcasterPowerUser: boolean;
  followerCount: number;
}

export interface Socials {
  Social: Social[];
}

export interface CastedBy {
  profileName: string;
}

export interface Frame {
  castedAtTimestamp: string;
  frameUrl: string;
}

export interface Cast {
  castedBy: CastedBy;
  url: string;
  frame: Frame;
}

export interface FarcasterCasts {
  Cast: Cast[];
}

export interface AirstackProfileResponse {
  Socials: Socials;
  FarcasterCasts: FarcasterCasts;
}
