import { Merchant } from "../../generated/schema";
import { BIG_INT_ZERO, BYTES_EMPTY } from "../lib/constants";
import { BigInt, Bytes } from "@graphprotocol/graph-ts";

export function buildMerchant(
  id: Bytes,
  txHash: Bytes,
  blockTimestamp: BigInt,
  address: Bytes,
  name: string,
  numberOfSales: BigInt,
  totalEarned: BigInt
): Merchant {
  let merchant = new Merchant(id.toHexString());
  merchant.txHash = txHash;
  merchant.blockTimestamp = blockTimestamp;
  merchant.address = address;
  merchant.name = name;
  merchant.numberOfSales = numberOfSales;
  merchant.totalEarned = totalEarned;

  return merchant as Merchant;
}

export function getMerchant(id: Bytes): Merchant {
  let merchant = Merchant.load(id.toHexString());

  if (merchant == null) {
    merchant = new Merchant(id.toHexString());
    merchant.txHash = BYTES_EMPTY;
    merchant.blockTimestamp = BIG_INT_ZERO;
    merchant.address = BYTES_EMPTY;
    merchant.name = "";
    merchant.numberOfSales = BIG_INT_ZERO;
    merchant.totalEarned = BIG_INT_ZERO;
  }

  return merchant as Merchant;
}
