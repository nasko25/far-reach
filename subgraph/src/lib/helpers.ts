import { ethereum } from "@graphprotocol/graph-ts";

export const getHash = (event: ethereum.Event): string => event.transaction.hash.toHexString();
