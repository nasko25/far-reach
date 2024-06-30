// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IRegistry {
    struct Affiliate {
        uint256 FID;
        address affiliateAddress;
        string affiliateName;
        uint256 numberOfSales;
        uint256 totalEarned;
        uint256 postsLastWeek;
        uint256 followers;
    }

    struct Merchant {
        uint256 id;
        address merchantAddress;
        string merchantName;
        uint256 numberOfSales;
        uint256 totalEarned;
    }

    enum OrderStatus {
        Pending,
        Completed
    }

    struct Order {
        uint256 id;
        uint256 campaignId;
        uint256 productId;
        uint256 affiliateFID;
        address buyer;
        uint256 price;
        uint256 affiliateComission;
        bytes32 buyerHash;
        OrderStatus status;
    }

    struct Campaign {
        uint256 id;
        address merchantAddress;
        string name;
        string productName;
        uint256 productId;
        uint256 price;
        uint16 comission;
        uint16 stock;
        uint128 maxFID;
        uint128 minFollowers;
        uint128 minPostsLastWeek;
        string permalink;
        string productImage;
        address receiptAddress;
        CampaignStatus status;
    }

    enum CampaignStatus {
        Active,
        Finished
    }

    event CreatedAffiliate(
        uint256 FID,
        address indexed affiliateAddress,
        string affiliateName,
        uint256 numberOfSales,
        uint256 totalEarned
    );
    event CreatedMerchant(
        uint256 id,
        address merchantAddress,
        string merchantName,
        uint256 numberOfSales,
        uint256 totalEarned
    );
    event CreatedCampaign(
        uint256 id,
        address merchantAddress,
        string productName,
        uint256 productId,
        uint256 price,
        uint16 comission,
        uint16 stock,
        uint128 maxFID,
        uint128 minFollowers,
        uint128 minPostsLastWeek,
        string permalink,
        string productImage,
        address receiptAddress
    );
    event CreatedOrder(
        uint256 id,
        uint256 indexed campaignId,
        address indexed buyer,
        uint256 indexed affiliateFID,
        uint256 price,
        uint256 comission
    );

    event RegisteredAffiliateInCampaign(
        uint256 indexed campaignId,
        address indexed affiliateFID,
        uint128 maxFID,
        uint128 minFollowers,
        uint128 minPostsLastWeek
    );

    event CampaignEnded(uint256 indexed campaignId);

    event PaymentMade(address indexed customer, uint256 amount);

    event TotalEarnedMerchant(
        address indexed merhcant,
        uint256 indexed totalEarned,
        uint256 indexed numberOfSales
    );

    event TotalEarnedAffiliate(
        address indexed affiliate,
        uint256 indexed totalEarned,
        uint256 indexed numberOfSales
    );
}
