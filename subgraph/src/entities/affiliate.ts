import { Affiliate } from "../../generated/schema";
import { BIG_INT_ZERO, BYTES_EMPTY } from "../lib/constants";
import { BigInt, Bytes } from "@graphprotocol/graph-ts";

export function buildAffiliate(
  id: BigInt,
  txHash: Bytes,
  blockTimestamp: BigInt,
  address: Bytes,
  fid: BigInt,
  name: string,
  numberOfSales: BigInt,
  totalEarned: BigInt,
  postsLastWeek: BigInt,
  followers: BigInt
): Affiliate {
  let affiliate = new Affiliate(id.toString());
  affiliate.txHash = txHash;
  affiliate.blockTimestamp = blockTimestamp;
  affiliate.address = address;
  affiliate.fid = fid;
  affiliate.name = name;
  affiliate.numberOfSales = numberOfSales;
  affiliate.totalEarned = totalEarned;
  affiliate.postsLastWeek = postsLastWeek;
  affiliate.followers = followers;
  affiliate.campaigns = [];
  return affiliate as Affiliate;
}

export function getAffiliate(id: string): Affiliate {
  let affiliate = Affiliate.load(id);

  if (affiliate == null) {
    affiliate = new Affiliate(id);
    affiliate.txHash = BYTES_EMPTY;
    affiliate.blockTimestamp = BIG_INT_ZERO;
    affiliate.address = BYTES_EMPTY;
    affiliate.fid = BIG_INT_ZERO;
    affiliate.name = "";
    affiliate.numberOfSales = BIG_INT_ZERO;
    affiliate.totalEarned = BIG_INT_ZERO;
    affiliate.postsLastWeek = BIG_INT_ZERO;
    affiliate.followers = BIG_INT_ZERO;
    affiliate.campaigns = [];
  }

  return affiliate as Affiliate;
}
