import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  CampaignEnded,
  CreatedAffiliate,
  CreatedCampaign,
  CreatedMerchant,
  CreatedOrder,
  PaymentMade,
  RegisteredAffiliateInCampaign,
  TotalEarnedAffiliate,
  TotalEarnedMerchant
} from "../generated/Registry/Registry"

export function createCampaignEndedEvent(campaignId: BigInt): CampaignEnded {
  let campaignEndedEvent = changetype<CampaignEnded>(newMockEvent())

  campaignEndedEvent.parameters = new Array()

  campaignEndedEvent.parameters.push(
    new ethereum.EventParam(
      "campaignId",
      ethereum.Value.fromUnsignedBigInt(campaignId)
    )
  )

  return campaignEndedEvent
}

export function createCreatedAffiliateEvent(
  FID: BigInt,
  affiliateAddress: Address,
  affiliateName: string,
  numberOfSales: BigInt,
  totalEarned: BigInt
): CreatedAffiliate {
  let createdAffiliateEvent = changetype<CreatedAffiliate>(newMockEvent())

  createdAffiliateEvent.parameters = new Array()

  createdAffiliateEvent.parameters.push(
    new ethereum.EventParam("FID", ethereum.Value.fromUnsignedBigInt(FID))
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

export function createCreatedCampaignEvent(
  id: BigInt,
  merchantAddress: Address,
  productName: string,
  price: BigInt,
  commission: i32,
  stock: i32
): CreatedCampaign {
  let createdCampaignEvent = changetype<CreatedCampaign>(newMockEvent())

  createdCampaignEvent.parameters = new Array()

  createdCampaignEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  createdCampaignEvent.parameters.push(
    new ethereum.EventParam(
      "merchantAddress",
      ethereum.Value.fromAddress(merchantAddress)
    )
  )
  createdCampaignEvent.parameters.push(
    new ethereum.EventParam(
      "productName",
      ethereum.Value.fromString(productName)
    )
  )
  createdCampaignEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  createdCampaignEvent.parameters.push(
    new ethereum.EventParam(
      "commission",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(commission))
    )
  )
  createdCampaignEvent.parameters.push(
    new ethereum.EventParam(
      "stock",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(stock))
    )
  )

  return createdCampaignEvent
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
  campaignId: BigInt,
  buyer: Address,
  affiliateFID: BigInt,
  price: BigInt,
  comission: BigInt
): CreatedOrder {
  let createdOrderEvent = changetype<CreatedOrder>(newMockEvent())

  createdOrderEvent.parameters = new Array()

  createdOrderEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  createdOrderEvent.parameters.push(
    new ethereum.EventParam(
      "campaignId",
      ethereum.Value.fromUnsignedBigInt(campaignId)
    )
  )
  createdOrderEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  createdOrderEvent.parameters.push(
    new ethereum.EventParam(
      "affiliateFID",
      ethereum.Value.fromUnsignedBigInt(affiliateFID)
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

export function createPaymentMadeEvent(
  customer: Address,
  amount: BigInt
): PaymentMade {
  let paymentMadeEvent = changetype<PaymentMade>(newMockEvent())

  paymentMadeEvent.parameters = new Array()

  paymentMadeEvent.parameters.push(
    new ethereum.EventParam("customer", ethereum.Value.fromAddress(customer))
  )
  paymentMadeEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return paymentMadeEvent
}

export function createRegisteredAffiliateInCampaignEvent(
  campaignId: BigInt,
  affiliateFID: Address,
  maxFID: BigInt,
  minFollowers: BigInt,
  minPostsLastWeek: BigInt
): RegisteredAffiliateInCampaign {
  let registeredAffiliateInCampaignEvent =
    changetype<RegisteredAffiliateInCampaign>(newMockEvent())

  registeredAffiliateInCampaignEvent.parameters = new Array()

  registeredAffiliateInCampaignEvent.parameters.push(
    new ethereum.EventParam(
      "campaignId",
      ethereum.Value.fromUnsignedBigInt(campaignId)
    )
  )
  registeredAffiliateInCampaignEvent.parameters.push(
    new ethereum.EventParam(
      "affiliateFID",
      ethereum.Value.fromAddress(affiliateFID)
    )
  )
  registeredAffiliateInCampaignEvent.parameters.push(
    new ethereum.EventParam("maxFID", ethereum.Value.fromUnsignedBigInt(maxFID))
  )
  registeredAffiliateInCampaignEvent.parameters.push(
    new ethereum.EventParam(
      "minFollowers",
      ethereum.Value.fromUnsignedBigInt(minFollowers)
    )
  )
  registeredAffiliateInCampaignEvent.parameters.push(
    new ethereum.EventParam(
      "minPostsLastWeek",
      ethereum.Value.fromUnsignedBigInt(minPostsLastWeek)
    )
  )

  return registeredAffiliateInCampaignEvent
}

export function createTotalEarnedAffiliateEvent(
  affiliate: Address,
  totalEarned: BigInt
): TotalEarnedAffiliate {
  let totalEarnedAffiliateEvent = changetype<TotalEarnedAffiliate>(
    newMockEvent()
  )

  totalEarnedAffiliateEvent.parameters = new Array()

  totalEarnedAffiliateEvent.parameters.push(
    new ethereum.EventParam("affiliate", ethereum.Value.fromAddress(affiliate))
  )
  totalEarnedAffiliateEvent.parameters.push(
    new ethereum.EventParam(
      "totalEarned",
      ethereum.Value.fromUnsignedBigInt(totalEarned)
    )
  )

  return totalEarnedAffiliateEvent
}

export function createTotalEarnedMerchantEvent(
  merhcant: Address,
  totalEarned: BigInt
): TotalEarnedMerchant {
  let totalEarnedMerchantEvent = changetype<TotalEarnedMerchant>(newMockEvent())

  totalEarnedMerchantEvent.parameters = new Array()

  totalEarnedMerchantEvent.parameters.push(
    new ethereum.EventParam("merhcant", ethereum.Value.fromAddress(merhcant))
  )
  totalEarnedMerchantEvent.parameters.push(
    new ethereum.EventParam(
      "totalEarned",
      ethereum.Value.fromUnsignedBigInt(totalEarned)
    )
  )

  return totalEarnedMerchantEvent
}
