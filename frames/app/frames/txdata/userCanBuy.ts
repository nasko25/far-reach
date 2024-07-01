import { http, createPublicClient } from "viem";
import { baseSepolia } from "viem/chains";
import { USDC_CONTRACT_ADDRESS, usdcABI } from "./contracts_abi/usdc";
import { FAR_REACH_REGISTRY_ADDRESS } from "./contracts_abi/registry";

export const userCanBuy = async (address: string) => {
  const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(),
  });
  const data = await publicClient.readContract({
    address: USDC_CONTRACT_ADDRESS,
    abi: usdcABI,
    functionName: "allowance",
    args: [address as `0x${string}`, FAR_REACH_REGISTRY_ADDRESS],
  });

  return data > 10000;
};
