import { useEffect, useState } from "react";
import { FarcasterEmbed } from "react-farcaster-embed/dist/client";
import "react-farcaster-embed/dist/styles.css"; // include default styles or write your own

export function FarcasterEmbedWrapper({ username, hash }: { username: string; hash: string }) {
  const [showEmbed, setShowEmbed] = useState<boolean>(false);
  useEffect(() => {
    fetch(`https://farcaster.tv/${username}/${hash}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result.casts.length > 0) setShowEmbed(true);
      });
  }, []);
  if (showEmbed) return <FarcasterEmbed username={username} hash={hash} />;
}
