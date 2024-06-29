import { Order } from "../../generated/schema";
import { BIG_INT_NEG_ONE, BIG_INT_ZERO, BYTES_EMPTY } from "../lib/constants";
import { BigInt, Bytes } from "@graphprotocol/graph-ts";

export function buildOrder(
  id: BigInt,
  txHash: Bytes,
  blockTimestamp: BigInt,
  campaignId: BigInt,
  buyer: Bytes,
  affiliateId: BigInt,
  price: BigInt,
  commission: BigInt,
  buyerHash: Bytes,
  affiliateCommission: BigInt
): Order {
  let order = new Order(id.toString());
  order.txHash = txHash;
  order.blockTimestamp = blockTimestamp;
  order.campaign = campaignId.toString();
  order.buyer = buyer;
  order.affiliate = affiliateId.toString();
  order.price = price;
  order.commission = commission;
  order.buyerHash = buyerHash;
  order.affiliateCommission = affiliateCommission;

  return order as Order;
}

export function getOrder(id: string): Order {
  let order = Order.load(id);

  if (order == null) {
    order = new Order(id.toString());

    order.txHash = BYTES_EMPTY;
    order.blockTimestamp = BIG_INT_ZERO;
    order.campaign = BIG_INT_NEG_ONE.toString();
    order.buyer = BYTES_EMPTY;
    order.affiliate = BIG_INT_NEG_ONE.toString();
    order.price = BIG_INT_ZERO;
    order.commission = BIG_INT_ZERO;
    order.buyerHash = BYTES_EMPTY;
    order.affiliateCommission = BIG_INT_ZERO;
  }

  return order as Order;
}
