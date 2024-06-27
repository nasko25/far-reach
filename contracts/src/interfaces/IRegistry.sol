// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IRegistry {
    struct Affiliate {
        uint256 id;
        address affiliateAddress;
        string affiliateName;
        uint256 numberOfSales;
        uint256 totalEarned;
        uint256 postsLastWeek;
        uint256 followers;
        uint256 FID;
    }

    struct Merchant {
        uint256 id;
        address merchantAddress;
        string merchantName;
        uint256 numberOfSales;
        uint256 totalEarned;
    }

    struct Order {
        uint256 id;
        address buyer;
        address affiliateAddress;
        uint256 productId;
        uint256 price;
        uint256 comission;
    }

    event CreatedAffiliate(
        uint256 id,
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
    event RegisteredProduct(
        uint256 id,
        address indexed merchantAddress,
        string productName,
        uint256 price,
        uint16 commission
    );
    event CreatedOrder(
        uint256 id,
        address indexed buyer,
        address indexed affiliateAddress,
        uint256 productId,
        uint256 price,
        uint256 comission
    );
}
