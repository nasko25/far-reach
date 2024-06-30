import { contractAddress } from "@/constants";
import { EIP1193Provider, useWallets } from "@privy-io/react-auth";
import {encodeFunctionData} from 'viem';
import toast, { Toaster } from "react-hot-toast";

const notify = (promoteUrl: string) => {
  toast("Affiliate link frame copied to clipboard.");
  window.open(promoteUrl, "_blank");
};

export function PromoteButton({ className, promoteUrl }: { className: string; promoteUrl: string }) {
  const { wallets } = useWallets();
  const wallet = wallets[0]; // Replace this with your desired wallet

  return (
    <button className={className} onClick={async () => {
        const provider = await wallet.getEthereumProvider();
        const transactionRequest = {
            to: contractAddress,
          };
          const data = encodeFunctionData({
            abi: 
            functionName: 'insertTheNameOfTheMethodToCall'
        })
          const transactionHash = await provider.request({
            method: 'eth_sendTransaction',
            params: [transactionRequest],
          });
    }}>
      Promote 💜
    </button>
  );
}
