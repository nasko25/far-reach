"use client";

import { FrameUI, fallbackFrameContext, FrameContext } from "@frames.js/render";
import { signFrameAction, FarcasterSigner } from "@frames.js/render/farcaster";
import { FrameImageNext } from "@frames.js/render/next";
import { FrameButton } from "frames.js";
import { useFrame } from "@frames.js/render/use-frame";
export function FrameCard({ frameUrl }: { frameUrl: string }) {
  // TODO: replace with your farcaster signer
  const farcasterSigner: FarcasterSigner = {
    fid: 1,
    status: "approved",
    publicKey: "0x00000000000000000000000000000000000000000000000000000000000000000",
    privateKey: "0x00000000000000000000000000000000000000000000000000000000000000000",
  };

  const frameState = useFrame({
    // replace with your frame url
    homeframeUrl: frameUrl,
    // corresponds to the name of the route for POST in step 3
    frameActionProxy: "/frames",
    connectedAddress: undefined,
    // corresponds to the name of the route for GET in step 3
    frameGetProxy: "/frames",
    frameContext: fallbackFrameContext,
    // map to your identity if you have one
    signerState: {
      hasSigner: farcasterSigner !== undefined,
      signer: farcasterSigner,
      onSignerlessFramePress: () => {
        // Only run if `hasSigner` is set to `false`
        // This is a good place to throw an error or prompt the user to login
        alert("A frame button was pressed without a signer. Perhaps you want to prompt a login");
      },
      signFrameAction: signFrameAction,
    },
  });

  return (
    <div className="max-w-screen-md w-full bg-white">
      <FrameUI frameState={frameState} theme={{}} FrameImage={FrameImageNext} />
    </div>
  );
}
