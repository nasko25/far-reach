import {
  CreatedAffiliate as CreatedAffiliateEvent,
  CreatedMerchant as CreatedMerchantEvent,
  CreatedOrder as CreatedOrderEvent,
  RegisteredProduct as RegisteredProductEvent
} from "../generated/Registry/Registry"
import {
  CreatedAffiliate,
  CreatedMerchant,
  CreatedOrder,
  RegisteredProduct
} from "../generated/schema"

export function handleCreatedAffiliate(event: CreatedAffiliateEvent): void {
  let entity = new CreatedAffiliate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Registry_id = event.params.id
  entity.affiliateAddress = event.params.affiliateAddress
  entity.affiliateName = event.params.affiliateName
  entity.numberOfSales = event.params.numberOfSales
  entity.totalEarned = event.params.totalEarned

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
  entity.buyer = event.params.buyer
  entity.affiliateAddress = event.params.affiliateAddress
  entity.productId = event.params.productId
  entity.price = event.params.price
  entity.comission = event.params.comission

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRegisteredProduct(event: RegisteredProductEvent): void {
  let entity = new RegisteredProduct(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Registry_id = event.params.id
  entity.merchantAddress = event.params.merchantAddress
  entity.productName = event.params.productName
  entity.price = event.params.price
  entity.commission = event.params.commission

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
