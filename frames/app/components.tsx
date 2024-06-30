export const NavBar = (props: { rank?: number; stats?: boolean }) => {
  // assumes parent is display: flex and has 100% width and height
  return (
    <nav tw="text-white border-gray-200 dark:bg-gray-900 border-b border-[#e5e7eb] h-40">
      <p tw="p-0 m-4 ml-20 my-auto"> Far Reach </p>
      <p tw="m-4 mr-20 ml-auto my-auto p-0 max-w-lg">
        {props.stats
          ? props.rank
            ? `Current Rank: ${props.rank}`
            : "You are not yet a part of far reach. Please apply below."
          : "Web3 Affiliate Platform"}
      </p>
    </nav>
  );
};

export const Leaderboard = (props: { leaderboard: Leaderboard }) => {
  const casterName = "7";
  // TODO: if caster is not top 10, show them below the top 10 with their actual current score
  // assumes parent is display: flex and has 100% width and height
  return (
    <div tw="text-white border-gray-200 dark:bg-gray-900 mb-auto mt-4 flex flex-col">
      <div tw="flex ml-30">
        <p tw="ml-10 mr-12"> Rank </p> <p> User </p>
        <p tw="ml-88"> Money made so far </p>
      </div>
      <div tw="flex border-b border-gray-700 mx-30 text-gray-400 mb-8"> </div>
      {props.leaderboard.map((user, idx) => (
        <div
          tw={
            "flex pl-40" + (casterName == user.name ? " text-purple-600" : "")
          }
          key={idx}
        >
          <p tw="p-0 m-2 w-20"> # {idx + 1} </p>
          <p tw="p-0 m-2 w-120 text-purple-500"> {user.name} </p>
          <p tw="p-0 m-2">
            ${user.totalEarned} {idx < 3 ? "💸".repeat(3 - idx) : ""}
          </p>
        </div>
      ))}
    </div>
  );
};

const randomBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const FrameData = (props: {
  productImage: string;
  productsSold: number;
  reward: number;
  likes: number;
  recasts: number;
  comments: number;
}) => {
  return (
    <div tw="flex flex-col m-0 mt-5">
      {
        // I could not get the globals.css file to work...
      }
      <p tw="m-0" className="frame-data">
        Published on: 23 June 2024 @ 12:23
      </p>
      <div tw="flex flex-row">
        <div tw="flex flex-col">
          <p tw="m-0" style={{ marginLeft: "20px", color: "red" }}>
            Total products sold: {props.productsSold}
          </p>
          <p tw="m-0" style={{ marginLeft: "20px" }}>
            Total reward: ${props.reward}
          </p>
          <p tw="m-0">
            Likes/recasts/comments: {props.likes}/{props.recasts}/
            {props.comments}
          </p>
        </div>
        <img tw="m-auto mr-40 h-30" src={props.productImage}></img>
      </div>
      <div tw="flex border-b border-gray-700 mx-30 text-gray-400 m-0 mt-2 mr-40"></div>
    </div>
  );
};

export type FrameData = {
  castedAtTimestamp: string;
  numberOfRecasts: number;
  numberOfLikes: number;
  numberOfReplies: number;
  productImage: string;
  productsSold: number;
  reward: number;
};

export const Stats = (props: {
  displayName: string | undefined;
  totalRewards: number | undefined;
  profileImage: string | undefined;
  frameData: FrameData[];
}) => {
  let frames: any[] = [];

  if (props.totalRewards) {
    for (let frame of props.frameData) {
      frames.push(
        <FrameData
          productImage={frame.productImage}
          productsSold={frame.productsSold}
          reward={frame.reward}
          likes={frame.numberOfLikes}
          recasts={frame.numberOfRecasts}
          comments={frame.numberOfReplies}
        />
      );
    }
  }
  // assumes parent is display: flex and has 100% width and height
  return (
    <div tw="text-white border-gray-200 dark:bg-gray-900 mb-auto mt-5 ml-40 flex flex-col">
      {/* TODO: display pfp, total far reacher posts & impressions, total money made, rank */}
      {/* if user is not far reacher yet ass a custom message saying no data to show */}
      {/* TODO: also need to handle null images (maybe some placeholder static pfp) */}
      <div tw="flex flex-row m-0">
        <div tw="w-40 h-40 overflow-hidden flex m-0">
          <img src={props.profileImage} alt="User Profile image" />
        </div>
        <p tw="ml-20 max-w-60"> {props.displayName} </p>
        <p tw="m-0 ml-auto mr-40 w-70 text-center h-40">
          Total rewards so far: ${props.totalRewards ?? 0}
        </p>
      </div>
      <div tw="flex border-b border-gray-700 mr-40 text-gray-400 mb-4 mt-0"></div>
      <p tw="mt-0 mr-40 justify-center"> Your Top 3 frames </p>
      <tbody>{frames}</tbody>
      {props.totalRewards ? undefined : (
        <p tw="mr-40 justify-center">You don't have any frames yet</p>
      )}
    </div>
  );
};
