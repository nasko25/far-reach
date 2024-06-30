import { BigInt } from "@graphprotocol/graph-ts";
import {
  CampaignEnded as CampaignEndedEvent,
  CreatedAffiliate as CreatedAffiliateEvent,
  CreatedCampaign as CreatedCampaignEvent,
  CreatedMerchant as CreatedMerchantEvent,
  CreatedOrder as CreatedOrderEvent,
  PaymentMade as PaymentMadeEvent,
  RegisteredAffiliateInCampaign as RegisteredAffiliateInCampaignEvent,
} from "../../generated/Registry/Registry";
import { Campaign, Affiliate, Order, Merchant, Payment } from "../../generated/schema";
import { buildCampaign, getCampaign } from "../entities/campaign";
import { buildAffiliate, getAffiliate } from "../entities/affiliate";
import { buildMerchant, getMerchant } from "../entities/merchant";
import { buildOrder } from "../entities/order";

export function handleCampaignEnded(event: CampaignEndedEvent): void {
  let campaign = getCampaign(event.transaction.hash.toHexString());
  campaign.status = 1;
  campaign.save();
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
    event.params.receiptAddress,
    event.params.status
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
  const order: Order = buildOrder(
    event.params.id,
    event.transaction.hash,
    event.block.timestamp,
    event.params.campaignId.toString(),
    event.params.buyer,
    event.params.buyerHash,
    event.params.affiliateFID.toString(),
    event.params.price,
    event.params.comission,
    event.params.status
  );

  const campaign: Campaign = getCampaign(event.params.campaignId.toString());
  const merchant: Merchant = getMerchant(campaign.merchantAddress);
  const affiliate: Affiliate = getAffiliate(event.params.affiliateFID.toString());

  merchant.totalEarned = merchant.totalEarned.plus(event.params.comission);
  affiliate.totalEarned = affiliate.totalEarned.plus(event.params.comission);

  merchant.numberOfSales = merchant.numberOfSales.plus(BigInt.fromI32(1));
  affiliate.numberOfSales = affiliate.numberOfSales.plus(BigInt.fromI32(1));

  merchant.save();
  affiliate.save();

  const orders = campaign.orders;
  orders.push(order.id);
  campaign.orders = orders;

  campaign.stock = campaign.stock - 1;
  campaign.save();

  order.save();
}

export function handleRegisteredAffiliateInCampaign(event: RegisteredAffiliateInCampaignEvent): void {
  const campaign: Campaign = getCampaign(event.params.campaignId.toString());
  const affiliate: Affiliate = getAffiliate(event.params.affiliateFID.toString());

  const participants = campaign.participants;
  participants.push(affiliate.fid.toString());
  campaign.participants = participants;

  campaign.save();

  const campaigns = affiliate.campaigns;
  campaigns.push(campaign.id);
  affiliate.campaigns = campaigns;

  affiliate.save();
}
