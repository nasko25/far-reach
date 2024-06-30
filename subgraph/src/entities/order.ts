import { Order } from "../../generated/schema";
import { BIG_INT_NEG_ONE, BIG_INT_ZERO, BYTES_EMPTY } from "../lib/constants";
import { BigInt, Bytes } from "@graphprotocol/graph-ts";

export function buildOrder(
  id: BigInt,
  txHash: Bytes,
  blockTimestamp: BigInt,
  campaign: string,
  buyer: Bytes,
  affiliate: string,
  price: BigInt,
  commission: BigInt
): Order {
  let order = new Order(id.toString());
  order.txHash = txHash;
  order.blockTimestamp = blockTimestamp;
  order.campaign = campaign;
  order.buyer = buyer;
  order.affiliate = affiliate;
  order.price = price;
  order.commission = commission;

  return order as Order;
}

export function getOrder(id: string): Order {
  let order = Order.load(id);

  if (order == null) {
    order = new Order(id.toString());

    order.txHash = BYTES_EMPTY;
    order.blockTimestamp = BIG_INT_ZERO;
    order.campaign = "";
    order.buyer = BYTES_EMPTY;
    order.affiliate = "";
    order.price = BIG_INT_ZERO;
    order.commission = BIG_INT_ZERO;
  }

  return order as Order;
}
