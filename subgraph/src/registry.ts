import {
  CampaignEnded as CampaignEndedEvent,
  CreatedAffiliate as CreatedAffiliateEvent,
  CreatedCampaign as CreatedCampaignEvent,
  CreatedMerchant as CreatedMerchantEvent,
  CreatedOrder as CreatedOrderEvent,
  PaymentMade as PaymentMadeEvent,
  RegisteredAffiliateInCampaign as RegisteredAffiliateInCampaignEvent,
  TotalEarnedAffiliate as TotalEarnedAffiliateEvent,
  TotalEarnedMerchant as TotalEarnedMerchantEvent
} from "../generated/Registry/Registry"
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
} from "../generated/schema"

export function handleCampaignEnded(event: CampaignEndedEvent): void {
  let entity = new CampaignEnded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.campaignId = event.params.campaignId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCreatedAffiliate(event: CreatedAffiliateEvent): void {
  let entity = new CreatedAffiliate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.FID = event.params.FID
  entity.affiliateAddress = event.params.affiliateAddress
  entity.affiliateName = event.params.affiliateName
  entity.numberOfSales = event.params.numberOfSales
  entity.totalEarned = event.params.totalEarned

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCreatedCampaign(event: CreatedCampaignEvent): void {
  let entity = new CreatedCampaign(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Registry_id = event.params.id
  entity.merchantAddress = event.params.merchantAddress
  entity.productName = event.params.productName
  entity.price = event.params.price
  entity.commission = event.params.commission
  entity.stock = event.params.stock

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCreatedMerchant(event: CreatedMerchantEvent): void {
  let entity = new CreatedMerchant(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Registry_id = event.params.id
  entity.merchantAddress = event.params.merchantAddress
  entity.merchantName = event.params.merchantName
  entity.numberOfSales = event.params.numberOfSales
  entity.totalEarned = event.params.totalEarned

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCreatedOrder(event: CreatedOrderEvent): void {
  let entity = new CreatedOrder(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Registry_id = event.params.id
  entity.campaignId = event.params.campaignId
  entity.buyer = event.params.buyer
  entity.affiliateFID = event.params.affiliateFID
  entity.price = event.params.price
  entity.comission = event.params.comission

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaymentMade(event: PaymentMadeEvent): void {
  let entity = new PaymentMade(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.customer = event.params.customer
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRegisteredAffiliateInCampaign(
  event: RegisteredAffiliateInCampaignEvent
): void {
  let entity = new RegisteredAffiliateInCampaign(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.campaignId = event.params.campaignId
  entity.affiliateFID = event.params.affiliateFID
  entity.maxFID = event.params.maxFID
  entity.minFollowers = event.params.minFollowers
  entity.minPostsLastWeek = event.params.minPostsLastWeek

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTotalEarnedAffiliate(
  event: TotalEarnedAffiliateEvent
): void {
  let entity = new TotalEarnedAffiliate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.affiliate = event.params.affiliate
  entity.totalEarned = event.params.totalEarned

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTotalEarnedMerchant(
  event: TotalEarnedMerchantEvent
): void {
  let entity = new TotalEarnedMerchant(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.merhcant = event.params.merhcant
  entity.totalEarned = event.params.totalEarned

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
