export const NavBar = (props: { rank?: number}) => {
    // assumes parent is display: flex and has 100% width and height
    return (
        <nav tw="text-white border-gray-200 dark:bg-gray-900 border-b border-[#e5e7eb] h-40">
          <p tw="p-0 m-4 ml-20 my-auto"> Far Reach </p>
          <p tw="m-4 mr-20 ml-auto my-auto p-0 max-w-lg"> { props.rank ? "Current Rank: {props.rank}" + "You are not yet a part of far reach. Please apply below." : "Web3 Affiliate Platform"} </p>
        </nav>
      );
  }
  
  export const Leaderboard = (props: {users: {username: string, score: string}[]}) => {
    const casterName = "7";
    // TODO: if caster is not top 10, show them below the top 10 with their actual current score
    // assumes parent is display: flex and has 100% width and height
    return (
        <div tw="text-white border-gray-200 dark:bg-gray-900 mb-auto mt-4 flex flex-col">
          <div tw="flex ml-30"><p tw="ml-10 mr-12"> Rank </p> <p> User </p> <p tw="ml-88"> Money made so far </p></div>
          <div tw="flex border-b border-gray-700 mx-30 text-gray-400 mb-8"> </div>
          {props.users.map((user, idx) => <div tw={"flex pl-40" + (casterName == user.username ? " text-purple-600" : "")} key={idx}><p tw="p-0 m-2 w-20"> # { idx + 1 } </p><p tw="p-0 m-2 w-120 text-purple-500"> { user.username } </p> <p tw="p-0 m-2"> ${user.score} {idx < 3 ?  "💸".repeat(3 - idx) : ""} </p></div>)}
        </div>
      );
  }
  
  const FrameData = () => {
    return (
        <div tw="flex flex-col m-0">
            {
                // I could not get the globals.css file to work...
            }
            <p tw="m-0" className="frame-data"> Published on: 23 June 2024 @ 12:23 </p>
            <div tw="flex flex-row">
                <div tw="flex flex-col">
                    <p tw="m-0" style={{"marginLeft": "20px", color: "red"}}> Total likes: 20 </p>
                    <p tw="m-0" style={{"marginLeft": "20px"}}> Total recasts: 12 </p>
                    <p tw="m-0" style={{"marginLeft": "20px"}}> Total comments: 42 </p>
                </div>
                <img tw="m-auto mr-40 h-30" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNMjLY3ExAv8O2swxPg7_vgt-s6D8t3chYDg&s"></img>
            </div>

        </div>
    );
  }

  export const Stats = (props: { displayName: string | undefined, totalRewards: number | undefined, rank: string, profileImage: string | undefined }) => {
    // assumes parent is display: flex and has 100% width and height
    return (
        <div tw="text-white border-gray-200 dark:bg-gray-900 mb-auto mt-20 ml-40 flex flex-col">
          {/* TODO: display pfp, total far reacher posts & impressions, total money made, rank */}
          {/* if user is not far reacher yet ass a custom message saying no data to show */}
          {/* TODO: also need to handle null images (maybe some placeholder static pfp) */}
          <div tw="flex flex-row">
            <div  tw="w-40 h-40 overflow-hidden flex m-0">
                <img src={props.profileImage} alt="User Profile image"/>
            </div>
            <p tw="ml-20 max-w-60"> {props.displayName} </p>
            {/* <p tw="ml-auto mr-10">  </p> */}
            <p tw="m-0 ml-auto mr-40 w-70 text-center h-40"> Total rewards so far: ${props.totalRewards}</p>
          </div>
          <div tw="flex border-b border-gray-700 mr-40 text-gray-400 mb-8"> </div>
          <p> Your Top 3 frames (+ engagement) </p>
          <FrameData/>
        </div>
      );
  }