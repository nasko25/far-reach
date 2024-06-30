import { Campaign } from "../../generated/schema";
import { BIG_INT_ZERO, BYTES_EMPTY } from "../lib/constants";
import { BigInt, Bytes, Int8 } from "@graphprotocol/graph-ts";

export function buildCampaign(
  id: string,
  txHash: Bytes,
  blockTimestamp: BigInt,
  merchantAddress: Bytes,
  name: string,
  productName: string,
  productId: BigInt,
  price: BigInt,
  commission: Int8,
  stock: Int8,
  maxFID: BigInt,
  minFollowers: BigInt,
  minPostsLastWeek: BigInt,
  permalink: string,
  productImage: string,
  receiptAddress: Bytes
): Campaign {
  let campaign = new Campaign(id.toString());
  campaign.txHash = txHash;
  campaign.blockTimestamp = blockTimestamp;
  campaign.merchantAddress = merchantAddress;
  campaign.name = name;
  campaign.productName = productName;
  campaign.productId = productId;
  campaign.price = price;
  campaign.commission = commission as i32;
  campaign.stock = stock as i32;
  campaign.maxFID = maxFID;
  campaign.minFollowers = minFollowers;
  campaign.minPostsLastWeek = minPostsLastWeek;
  campaign.permalink = permalink;
  campaign.productImage = productImage;
  campaign.receiptAddress = receiptAddress;
  campaign.participants = [];
  return campaign as Campaign;
}

export function getCampaign(id: string): Campaign {
  let campaign = Campaign.load(id);

  if (campaign == null) {
    campaign = new Campaign(id);
    campaign.txHash = BYTES_EMPTY;
    campaign.blockTimestamp = BIG_INT_ZERO;
    campaign.merchantAddress = BYTES_EMPTY;
    campaign.name = "";
    campaign.productName = "";
    campaign.productId = BIG_INT_ZERO;
    campaign.price = BIG_INT_ZERO;
    campaign.commission = 0;
    campaign.stock = 0;
    campaign.maxFID = BIG_INT_ZERO;
    campaign.minFollowers = BIG_INT_ZERO;
    campaign.minPostsLastWeek = BIG_INT_ZERO;
    campaign.permalink = "";
    campaign.productImage = "";
    campaign.receiptAddress = BYTES_EMPTY;
  }

  return campaign as Campaign;
}
