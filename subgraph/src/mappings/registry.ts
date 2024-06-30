import { BigInt } from "@graphprotocol/graph-ts";
import {
  CampaignEnded as CampaignEndedEvent,
  CreatedAffiliate as CreatedAffiliateEvent,
  CreatedCampaign as CreatedCampaignEvent,
  CreatedMerchant as CreatedMerchantEvent,
  CreatedOrder as CreatedOrderEvent,
  PaymentMade as PaymentMadeEvent,
  RegisteredAffiliateInCampaign as RegisteredAffiliateInCampaignEvent,
  TotalEarnedAffiliate as TotalEarnedAffiliateEvent,
  TotalEarnedMerchant as TotalEarnedMerchantEvent,
} from "../../generated/Registry/Registry";
import { Campaign, Affiliate, Order, Merchant, Payment } from "../../generated/schema";
import { buildCampaign, getCampaign } from "../entities/campaign";
import { buildAffiliate, getAffiliate } from "../entities/affiliate";
import { buildMerchant, getMerchant } from "../entities/merchant";
import { buildOrder } from "../entities/order";
import { buildPayment } from "../entities/payment";

export function handleCampaignEnded(event: CampaignEndedEvent): void {
  let entity = getCampaign(event.transaction.hash.toHexString());

  entity.save();
}

export function handleCreatedAffiliate(event: CreatedAffiliateEvent): void {
  buildAffiliate(
    event.params.FID,
    event.transaction.hash,
    event.block.timestamp,
    event.params.affiliateAddress,
    event.params.FID,
    event.params.affiliateName,
    event.params.numberOfSales,
    event.params.totalEarned,
    BigInt.fromI32(0),
    BigInt.fromI32(0)
  ).save();
}

export function handleCreatedCampaign(event: CreatedCampaignEvent): void {
  buildCampaign(
    event.params.id.toString(),
    event.transaction.hash,
    event.block.timestamp,
    event.params.merchantAddress,
    event.params.productName,
    event.params.productName,
    event.params.productId,
    event.params.price,
    event.params.comission,
    event.params.stock,
    event.params.maxFID,
    event.params.minFollowers,
    event.params.minPostsLastWeek,
    event.params.permalink,
    event.params.productImage,
    event.params.receiptAddress
  ).save();
}

export function handleCreatedMerchant(event: CreatedMerchantEvent): void {
  buildMerchant(
    event.params.merchantAddress,
    event.transaction.hash,
    event.block.timestamp,
    event.params.merchantAddress,
    event.params.merchantName,
    BigInt.fromI32(0),
    BigInt.fromI32(0)
  ).save();
}

export function handleCreatedOrder(event: CreatedOrderEvent): void {
  buildOrder(
    event.params.id,
    event.transaction.hash,
    event.block.timestamp,
    event.params.campaignId.toString(),
    event.params.buyer,
    event.params.affiliateFID.toString(),
    event.params.price,
    event.params.comission
  ).save();

  const campaign: Campaign = getCampaign(event.params.campaignId.toString());
  const merchant: Merchant = getMerchant(campaign.merchantAddress);
  const affiliate: Affiliate = getAffiliate(event.params.affiliateFID.toString());

  merchant.totalEarned = merchant.totalEarned.plus(event.params.comission);
  affiliate.totalEarned = affiliate.totalEarned.plus(event.params.comission);

  merchant.numberOfSales = merchant.numberOfSales.plus(BigInt.fromI32(1));
  affiliate.numberOfSales = affiliate.numberOfSales.plus(BigInt.fromI32(1));

  merchant.save();
  affiliate.save();
}

export function handleRegisteredAffiliateInCampaign(event: RegisteredAffiliateInCampaignEvent): void {
  const campaign: Campaign = getCampaign(event.params.campaignId.toString());
  const affiliate: Affiliate = getAffiliate(event.params.affiliateFID.toString());

  campaign.participants.push(affiliate.id);
  affiliate.campaigns.push(campaign.id);

  campaign.save();
  affiliate.save();
}
