import { Payment } from "../../generated/schema";
import { BIG_INT_ZERO, BYTES_EMPTY } from "../lib/constants";
import { BigInt, Bytes } from "@graphprotocol/graph-ts";

export function buildPayment(
  id: string,
  txHash: Bytes,
  blockTimestamp: BigInt,
  customer: Bytes,
  amount: BigInt
): Payment {
  let payment = new Payment(id.toString());
  payment.txHash = txHash;
  payment.blockTimestamp = blockTimestamp;
  payment.customer = customer;
  payment.amount = amount;

  return payment as Payment;
}

export function getPayment(id: string): Payment {
  let payment = Payment.load(id);

  if (payment == null) {
    payment = new Payment(id);
    payment.txHash = BYTES_EMPTY;
    payment.blockTimestamp = BIG_INT_ZERO;
    payment.customer = BYTES_EMPTY;
    payment.amount = BIG_INT_ZERO;
  }

  return payment as Payment;
}
