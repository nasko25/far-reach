import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  CreatedAffiliate,
  CreatedMerchant,
  CreatedOrder,
  RegisteredProduct
} from "../generated/Registry/Registry"

export function createCreatedAffiliateEvent(
  id: BigInt,
  affiliateAddress: Address,
  affiliateName: string,
  numberOfSales: BigInt,
  totalEarned: BigInt
): CreatedAffiliate {
  let createdAffiliateEvent = changetype<CreatedAffiliate>(newMockEvent())

  createdAffiliateEvent.parameters = new Array()

  createdAffiliateEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  createdAffiliateEvent.parameters.push(
    new ethereum.EventParam(
      "affiliateAddress",
      ethereum.Value.fromAddress(affiliateAddress)
    )
  )
  createdAffiliateEvent.parameters.push(
    new ethereum.EventParam(
      "affiliateName",
      ethereum.Value.fromString(affiliateName)
    )
  )
  createdAffiliateEvent.parameters.push(
    new ethereum.EventParam(
      "numberOfSales",
      ethereum.Value.fromUnsignedBigInt(numberOfSales)
    )
  )
  createdAffiliateEvent.parameters.push(
    new ethereum.EventParam(
      "totalEarned",
      ethereum.Value.fromUnsignedBigInt(totalEarned)
    )
  )

  return createdAffiliateEvent
}

export function createCreatedMerchantEvent(
  id: BigInt,
  merchantAddress: Address,
  merchantName: string,
  numberOfSales: BigInt,
  totalEarned: BigInt
): CreatedMerchant {
  let createdMerchantEvent = changetype<CreatedMerchant>(newMockEvent())

  createdMerchantEvent.parameters = new Array()

  createdMerchantEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  createdMerchantEvent.parameters.push(
    new ethereum.EventParam(
      "merchantAddress",
      ethereum.Value.fromAddress(merchantAddress)
    )
  )
  createdMerchantEvent.parameters.push(
    new ethereum.EventParam(
      "merchantName",
      ethereum.Value.fromString(merchantName)
    )
  )
  createdMerchantEvent.parameters.push(
    new ethereum.EventParam(
      "numberOfSales",
      ethereum.Value.fromUnsignedBigInt(numberOfSales)
    )
  )
  createdMerchantEvent.parameters.push(
    new ethereum.EventParam(
      "totalEarned",
      ethereum.Value.fromUnsignedBigInt(totalEarned)
    )
  )

  return createdMerchantEvent
}

export function createCreatedOrderEvent(
  id: BigInt,
  buyer: Address,
  affiliateAddress: Address,
  productId: BigInt,
  price: BigInt,
  comission: BigInt
): CreatedOrder {
  let createdOrderEvent = changetype<CreatedOrder>(newMockEvent())

  createdOrderEvent.parameters = new Array()

  createdOrderEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  createdOrderEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  createdOrderEvent.parameters.push(
    new ethereum.EventParam(
      "affiliateAddress",
      ethereum.Value.fromAddress(affiliateAddress)
    )
  )
  createdOrderEvent.parameters.push(
    new ethereum.EventParam(
      "productId",
      ethereum.Value.fromUnsignedBigInt(productId)
    )
  )
  createdOrderEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  createdOrderEvent.parameters.push(
    new ethereum.EventParam(
      "comission",
      ethereum.Value.fromUnsignedBigInt(comission)
    )
  )

  return createdOrderEvent
}

export function createRegisteredProductEvent(
  id: BigInt,
  merchantAddress: Address,
  productName: string,
  price: BigInt,
  commission: i32
): RegisteredProduct {
  let registeredProductEvent = changetype<RegisteredProduct>(newMockEvent())

  registeredProductEvent.parameters = new Array()

  registeredProductEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  registeredProductEvent.parameters.push(
    new ethereum.EventParam(
      "merchantAddress",
      ethereum.Value.fromAddress(merchantAddress)
    )
  )
  registeredProductEvent.parameters.push(
    new ethereum.EventParam(
      "productName",
      ethereum.Value.fromString(productName)
    )
  )
  registeredProductEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  registeredProductEvent.parameters.push(
    new ethereum.EventParam(
      "commission",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(commission))
    )
  )

  return registeredProductEvent
}
