import { Abi, encodeFunctionData } from "viem";
import { baseSepolia } from "viem/chains";
import { frames } from "../frames";
import {
  FAR_REACH_REGISTRY_ADDRESS,
  storageRegistryABI,
} from "./contracts_abi/registry";
import { transaction } from "frames.js/core";
import { JsonObject } from "frames.js/types";
import { USDC_CONTRACT_ADDRESS, usdcABI } from "./contracts_abi/usdc";
import { createHash } from "crypto";
import { userCanBuy } from "./userCanBuy";

const baseId = `eip155:${baseSepolia.id.toString()}`;
export const POST = frames(async (ctx) => {
  console.log(ctx.searchParams);
  if (
    !ctx?.message ||
    !ctx.message.connectedAddress ||
    !ctx.message.castId ||
    typeof ctx.searchParams.campaignId !== "string"
  ) {
    throw new Error("Invalid frame message");
  }

  // TODO: better to check for product's price instead
  if (ctx.searchParams.toApprove == "true") {
    const calldata = encodeFunctionData({
      abi: usdcABI,
      functionName: "approve",
      args: [
        FAR_REACH_REGISTRY_ADDRESS,
        BigInt(
          ctx.searchParams.price ??
            "115792089237316195423570985008687907853269984665640564039457584007913129639935"
        ),
      ] as const,
    });

    // TODO: verify that on warpcast this allows using the coinbase smart wallet
    return transaction({
      chainId: baseId,
      method: "eth_sendTransaction",
      params: {
        abi: usdcABI as Abi,
        to: USDC_CONTRACT_ADDRESS,
        data: calldata,
      },
    });
  }

  if (typeof ctx.message.inputText !== "string") {
    throw new Error("Invalid frame message");
  }

  const calldata = encodeFunctionData({
    abi: storageRegistryABI,
    functionName: "buyProductFromCampaign",
    args: [
      BigInt(ctx.searchParams.campaignId),
      BigInt(ctx.message.castId.fid),
      `0x${createHash("sha256").update(ctx.message.inputText).digest("hex")}`,
      new Date().toISOString(),
    ] as const,
  });

  // TODO: verify that on warpcast this allows using the coinbase smart wallet
  return transaction({
    chainId: baseId,
    method: "eth_sendTransaction",
    params: {
      abi: storageRegistryABI as Abi,
      to: FAR_REACH_REGISTRY_ADDRESS,
      data: calldata,
    },
  });
});
