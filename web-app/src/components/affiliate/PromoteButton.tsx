import { contractAddress } from "@/constants";
import { EIP1193Provider, useWallets } from "@privy-io/react-auth";
import { createPublicClient, encodeFunctionData, http } from "viem";
import toast, { Toaster } from "react-hot-toast";
import { registry } from "../../../abis/Registry";
import { createWalletClient, custom } from "viem";
import { baseSepolia } from "viem/chains";
import { from } from "@apollo/client";

export const notify = (promoteUrl: string) => {
  toast("Affiliate link frame copied to clipboard.");
  console.log(promoteUrl, "PROMOTE_URL");
  window.open(`https://warpcast.com/~/compose?text=Hello%20@farcaster!&embeds[]=${promoteUrl}`, "_blank");
};

export function PromoteButton({
  className,
  promoteUrl,
  campaignId,
  affilaiteFID,
}: {
  className: string;
  promoteUrl: string;
  campaignId: string;
  affilaiteFID: string;
}) {
  const { wallets } = useWallets();
  console.log("wallets", wallets);
  const wallet = wallets[0]; // Replace this with your desired wallet

  return (
    <button
      className={className}
      onClick={async () => {
        console.log("WALLET", wallet);
        console.log("CONTRACT", contractAddress);
        await wallet.switchChain(baseSepolia.id);
        const provider = await wallet.getEthereumProvider();

        const publicClient = createPublicClient({
          chain: baseSepolia,
          transport: http(),
        });
        const exists = (await publicClient.readContract({
          address: contractAddress,
          abi: registry,
          functionName: "affiliatesInCampaigns",
          args: [1, affilaiteFID],
        })) as any[];
        console.log(exists);
        if (!exists) {
          const data = encodeFunctionData({
            args: [1, affilaiteFID],
            abi: registry,
            functionName: "registerAffiliateInCampaign",
          });
          const transactionRequest = {
            from: wallet.address,
            to: contractAddress,
            data: data,
          };
          const transactionHash = await provider.request({
            method: "eth_sendTransaction",
            params: [transactionRequest],
          });
          console.log(transactionHash);
        }
        notify(promoteUrl);
      }}
    >
      Promote 💜
    </button>
  );
}
